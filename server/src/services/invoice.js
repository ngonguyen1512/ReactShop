import db from '../models'
import nodemailer from 'nodemailer'

export const getCountInvoiceService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Invoice.findAndCountAll({
            include: [
                { model: db.Account, as: 'invoice_account' },
                { model: db.State, as: 'invoice_state', attributes: ['name'] },
            ],
            order: [['updatedAt', 'DESC']],
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Invoice',
            response
        });
    } catch (error) { reject(error) }
})

const sendEmail = async (email, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ngonguyenkey1512@gmail.com',
            pass: 'oyce hied uxkl szlq',
        },
    });

    const mailOptions = {
        from: 'ngonguyenkey1512@gmail.com',
        to: email,
        subject: subject,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

export const createInvoices = async ({ idAccount, email, phone, address, ship, total, idState, invoiceDetails }) => {
    try {
        const invoice = await db.Invoice.create({
            idAccount,
            phone,
            address,
            ship,
            total,
            idState
        });

        if (invoice) {
            const invoiceDetailPromises = [];
            for (let i = 0; i < invoiceDetails.length; i++) {
                const { idProduct, name, idColor, idSize, quantity, price, discount, amount } = invoiceDetails[i];
                const invoiceDetail = await db.InvoiceDetail.create({
                    idInvoice: invoice.id,
                    idProduct,
                    name,
                    idColor,
                    idSize,
                    quantity,
                    price,
                    discount,
                    amount,
                    include: [
                        { model: db.Invoice, as: 'detail_invoice' },
                        { model: db.Product, as: 'product_invoicedetail' },
                    ],
                });
                invoiceDetailPromises.push(invoiceDetail);
            }
            const createdInvoiceDetails = await Promise.all(invoiceDetailPromises);
            const invoiceDetailsHtml = createdInvoiceDetails.map(detail => `
                <tr>
                    <td class="text-center">${detail.idProduct}</td>
                    <td class="text-center">${detail.idSize}</td>
                    <td class="text-center">${detail.idColor}</td>
                    <td class="text-center">${detail.price}</td>
                    <td class="text-center">${detail.quantity}</td>
                    <td class="text-center">${detail.discount}</td>
                    <td class="text-center">${detail.amount}</td>
                </tr>
            `).join('');

            await sendEmail(email, 'REACT FASHION', `
                <div>
                    <p>Dear,</p>
                    <p>Invoice code: ${invoice.id}</p>
                    <p>Your order is pending approval and ready for delivery.</p>
                    <div>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>SIZE</th>
                                <th>COLOR</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>DISCOUNT</th>
                                <th>AMOUNT</th>
                            </tr>
                            ${invoiceDetailsHtml}
                            <tr>
                                <td class="text-center" colSpan="6">Temporary</td>
                                <td class="text-center">${invoice.ship}</td>
                            </tr>
                            <tr>
                                <td class="text-center" colSpan="6"><b>TOTAL</b></td>
                                <td class="text-center"><b>${invoice.total}</b></td>
                            </tr>
                        </table>
                    </div>
                    <p>If you have any questions or need further assistance, feel free to contact us.</p>
                    <p>Best regards,</p>
                    <p>FASHION</p>
                </div>
            `);
            return {
                err: 0,
                msg: 'Create a successful invoice.',
                invoice,
                invoiceDetails: createdInvoiceDetails,
            };
        } else {
            return {
                err: 2,
                msg: 'Invoice creation failed.',
                invoice: null,
                invoiceDetails: null,
            };
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

export const getInvoiceService = () => new Promise(async (resolve, reject) => {
    try {
        const invoices = await db.Invoice.findAll({
            order: [['updatedAt', 'DESC']]
        });

        if (invoices.length > 0) {
            const invoiceIds = invoices.map(invoice => invoice.id);
            const response = await db.InvoiceDetail.findAll({
                where: { idInvoice: invoiceIds },
                include: [
                    {
                        model: db.Invoice, as: 'detail_invoice',
                        include: [
                            { model: db.Account, as: 'invoice_account' },
                            { model: db.State, as: 'invoice_state', attributes: ['name'] }
                        ]
                    },
                    { model: db.Product, as: 'product_invoicedetail' },
                ],
                order: [['updatedAt', 'DESC']],
            });
            resolve({
                err: 0,
                msg: 'Get the invoice successfully.',
                response
            });
        } else
            resolve({
                err: 2,
                msg: 'No invoice!',
                response: null
            })
    } catch (error) { reject(error); }
});

export const updateInvoicesService = async ({ id, idAccept, idShip, idState }) => {
    try {
        const invoice = await db.Invoice.findByPk(id);
        const response = await invoice.update({ idAccept, idShip, idState });

        const [account, detailInvoice] = await Promise.all([
            db.Account.findByPk(invoice.idAccount),
            db.InvoiceDetail.findAll({ where: { idInvoice: id } })
        ]);

        const invoiceDetailsHtml = detailInvoice.map(detail => `
            <tr>
                <td class="text-center">${detail.idProduct}</td>
                <td class="text-center">${detail.idSize}</td>
                <td class="text-center">${detail.idColor}</td>
                <td class="text-center">${detail.price}</td>
                <td class="text-center">${detail.quantity}</td>
                <td class="text-center">${detail.discount}</td>
                <td class="text-center">${detail.amount}</td>
            </tr>
        `).join('');

        const email = account.email;
        if (idState === 6) {
            await sendEmail(email, 'REACT FASHION', `
            <div>
                <p>Dear  ${account.name},</p>
                <p>Invoice code: ${invoice.id}</p>
                <p>Your order has been cancelled.</p>
                <div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>SIZE</th>
                            <th>COLOR</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>DISCOUNT</th>
                            <th>AMOUNT</th>
                        </tr>
                        ${invoiceDetailsHtml}
                        <tr>
                            <td class="text-center" colSpan="6">Temporary</td>
                            <td class="text-center">${invoice.ship}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colSpan="6"><b>TOTAL</b></td>
                            <td class="text-center"><b>${invoice.total}</b></td>
                        </tr>
                    </table>
                </div>
                <p>If you have any questions or need further assistance, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>FASHION</p>
            </div>`);
        } else {
            await sendEmail(email, 'REACT FASHION', `
            <div>
                <p>Dear  ${account.name},</p>
                <p>Invoice code: ${invoice.id}</p>
                <p>Your order is pending approval and ready for delivery.</p>
                <div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>SIZE</th>
                            <th>COLOR</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>DISCOUNT</th>
                            <th>AMOUNT</th>
                        </tr>
                        ${invoiceDetailsHtml}
                        <tr>
                            <td class="text-center" colSpan="6">Temporary</td>
                            <td class="text-center">${invoice.ship}</td>
                        </tr>
                        <tr>
                            <td class="text-center" colSpan="6"><b>TOTAL</b></td>
                            <td class="text-center"><b>${invoice.total}</b></td>
                        </tr>
                    </table>
                </div>
                <p>If you have any questions or need further assistance, feel free to contact us.</p>
                <p>Best regards,</p>
                <p>FASHION</p>
            </div>`);
        }

        return {
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật invoice thành công.' : 'Cập nhật invoice không thành công',
            response: response || null
        };
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
};

export const completeInvoicesService = ({ id, idState }) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findByPk(id);
        const response = await invoice.update({
            idState
        });

        if (idState === 5) {
            const invoiceDetails = await db.InvoiceDetail.findAll({ where: { idInvoice: id } });
            for (const invoiceDetail of invoiceDetails) {
                const quantities = await db.Quantity.findAll({
                    where: {
                        idProduct: invoiceDetail.idProduct,
                        idColor: invoiceDetail.idColor,
                        idSize: invoiceDetail.idSize
                    }
                });
                for (const quantity of quantities) {
                    const updatedQuantity = quantity.quantity - invoiceDetail.quantity;
                    await quantity.update({
                        quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
                    });
                }
            }

        }
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật invoice thành công.' : 'Cập nhật invoice không thành công',
            response: response || null
        })
    } catch (error) { reject(error); }
});

export const unsuccessfulInvoicesService = ({ id, idState }) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findByPk(id);
        const response = await invoice.update({idState});
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật invoice thành công.' : 'Cập nhật invoice không thành công',
            response: response || null
        })
    } catch (error) { reject(error); }
});

export const getSellerProducts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.InvoiceDetail.findAll({
            attributes: ['idProduct', 'idSize', 'idColor', 'createdAt', [db.sequelize.fn('SUM', db.sequelize.col('InvoiceDetail.quantity')), 'totalSold']],
            include: [
                { model: db.Product, as: 'product_invoicedetail' },
                { model: db.Invoice, as: 'detail_invoice' },
            ],
            group: ['idProduct'],
            where: {
                '$detail_invoice.idState$': 5
            },
            order: [[db.sequelize.literal('totalSold'), 'DESC']],
            limit: 3,
        });
        if (response.length > 0)
            resolve({
                err: 0,
                msg: 'OK.',
                response
            });
        else
            resolve({
                err: 2,
                msg: 'Không có sản phẩm nào có số lượng bán cao!',
                response: null
            });
    } catch (error) { reject(error) }
});

export const getSellerAccount = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Invoice.findAll({
            attributes: [
                'id', 'idAccount', 'total', 'createdAt', 
                [db.sequelize.fn('COUNT', db.sequelize.col('Invoice.id')), 'totalInvoices'],
                [db.sequelize.fn('SUM', db.sequelize.col('Invoice.total')), 'totalAmount']],
            include: [
                { model: db.Account, as: 'invoice_account', attributes: ['id', 'name'] },
            ],
            group: ['idAccount'],
            where: {idState: 5},
            order: [[db.sequelize.literal('totalAmount'), 'DESC']],
            limit: 5,
        });
        if (response.length > 0)
            resolve({
                err: 0,
                msg: 'OK.',
                response
            });
        else
            resolve({
                err: 2,
                msg: 'Không có account nào có số lượng bán cao!',
                response: null
            });
    } catch (error) { reject(error) }
});