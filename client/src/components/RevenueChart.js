import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import * as actions from '../store/actions';

const RevenueChart = () => {
    const dispatch = useDispatch();
    const { invoices } = useSelector((state) => state.invoice);

    useEffect(() => {
        const chartData = invoices.reduce((acc, item) => {
            if (item.idState === 5) {
                const day = item.updatedAt?.slice(0, 10); // Lấy ngày từ updatedAt của invoice
                const total = item.total; // Lấy tổng total từ invoice và chia cho 100 để định dạng theo hàng trăm hàng nghìn
                const count = 1; // Số lượng đơn hàng trong ngày hôm đó (mỗi invoice được tính là 1 đơn hàng)
                if (day) {
                    if (acc[day]) {
                        // Nếu ngày đã tồn tại trong chartData, cộng tổng total và số lượng đơn hàng vào ngày đó
                        acc[day].revenue += total;
                        acc[day].count += count;
                    } else {
                        // Nếu ngày chưa tồn tại trong chartData, tạo key mới và gán tổng total, số lượng đơn hàng
                        acc[day] = { day, revenue: total, count };
                    }
                }
            }
            return acc;
        }, {});
        // Chuyển đổi Object chartData thành mảng để sử dụng trong LineChart
        const transformedData = Object.values(chartData).sort((a, b) => {
            return new Date(a.day) - new Date(b.day);
        });
        setData(transformedData);
    }, [invoices]);

    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(actions.getCountInvoices())
    }, [dispatch]);

    const formatRevenue = (value) => `${value / 1000000}tr`; // Định dạng chuỗi tiền tệ hàng trăm hàng nghìn
    const formatCount = (value) => `${value}`; // Định dạng số đơn hàng

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length)
            return (
                <div className="custom-tooltip">
                    <div className="label">{label}</div>
                    <div className="quantity">Quantity: {payload[0].payload.count}</div>
                    <div className="total">Total: {(payload[0].payload.revenue).toLocaleString()} VND</div>
                </div>
            );
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" tickFormatter={formatRevenue} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatCount} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" yAxisId="left" name="Total" stroke="#8884d8" />
                <Line type="monotone" dataKey="count" yAxisId="right" name="Quantity" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;
