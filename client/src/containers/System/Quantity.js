import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Button, InputForm } from '../../components'
import icons from '../../utils/icons'

const { TiDeleteOutline } = icons;

const styletd = 'text-center px-4 py-2 '

const Quantity = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [shouldReload, setShouldReload] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const { quantities } = useSelector(state => state.quantity)

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredQuantity = [];
    // if (quantities && Array.isArray(quantities)) {
    //     filteredQuantity = quantities.filter((item) =>
    //         item.name.includes(searchValue)
    //     );
    // }

    useEffect(() => {
        if (shouldRefetch) {
            dispatch(actions.getQuantities())
            setShouldRefetch(false)
        } else {
            dispatch(actions.getQuantities())
        }
    }, [dispatch, shouldRefetch])

    const renderTableRow = (item) => {
        // const handleClickRow = () => { setPayload({ ...payload, id: item.id }) };
        // const handleDetail = () => {
        //     if (payload.id === item.id) {
        //         setPayload({ id: null });
        //         setIsShowDetail(false);
        //     } else {
        //         setPayload({ ...payload, id: item.id });
        //         setIsShowDetail(true);
        //     }
        // };
        return (
            <>
                <tr key={item.id} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={styletd}>{item.id}</td>
                    <td className={styletd}>{item.idProduct}</td>
                    <td className={styletd}>{item.idColor}</td>
                    <td className={styletd}>{item.idSize}</td>
                    <td className={styletd}>{(item.quantity)}</td>
                    <td className={styletd}>{item.idState}</td>
                    {/* <td className={`w-[4%] ${styletd}`}>
                        <Button fullWidth
                            IcAfter={BiDetail}
                            value={payload.id}
                            setValue={setPayload}
                            onClick={() => handleDetail()}
                        />
                    </td>
                    <td className={`w-[4%] ${styletd}`}>
                        <Button fullWidth
                            IcAfter={CiEdit} */}
                        {/* // value={payload.id}
                        // setValue={setPayload}
                        // onClick={() => handleDetail()}
                        /> */}
                    {/* </td> */}
                </tr>
                {/* {isShowDetail && payload.id === item.id && (
                    <tr className='bg-[#ddd]'>
                        <td colSpan={2} className={styletd}>{item.idCategory} - {item?.product_category.name}</td>
                        <td colSpan={6} className={styletd}>{item.information}</td>
                    </tr>
                )} */}
            </>
        );
    };


    return (
        <div className='quantity'>
            <div className='header-quantity between'>
                <span></span>
                <input
                    className='text-[#000] outline-none bg-[#e7e7e7] p-2 w-[40%] '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                // onChange={handleSearch}
                />
            </div>
            <div className='list-quantity list-table'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PRODUCT</th>
                            <th>COLOR</th>
                            <th>SIZE</th>
                            <th>QUANTITY</th>
                            <th>STATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredQuantity.length > 0 && filteredQuantity.map((item) => renderTableRow(item))}
                        {!shouldReload && Array.isArray(quantities) && quantities?.length > 0 && quantities.map((item) => renderTableRow(item))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Quantity