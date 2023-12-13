import db from '../models';
const { Op } = require("sequelize");

export const getAllQuantitiesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Quantity.findAll({
            attributes: [
                'id', 'idProduct', 'idColor', 'idSize', 'quantity', 'idState'
            ],
            include: [
                { model: db.Size, as: 'quantity_size', attributes: ['code' ,'name'] },
                { model: db.State, as: 'quantity_state', attributes: ['name'] },
                { model: db.Color, as: 'quantity_color', attributes: ['code' ,'name'] },
                { model: db.Product, as: 'quantity_product', attributes: ['name'] },
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get quantity',
            response
        });
    } catch (error) { reject(error); }
});

export const createQuantitiesService = ({ idProduct, idColor, idSize, quantity, idState }) => new Promise(async (resolve, reject) => {
    try {
        const existingRecord = await db.Quantity.findOne({
            where: { idProduct, idColor, idSize }
        });
        if (existingRecord) {
            existingRecord.quantity += parseInt(quantity, 10);
            await existingRecord.save();
            return {
                err: 0,
                msg: 'Update quantity success.',
                response: existingRecord
            };
        } else {
            const newRecord = await db.Quantity.create({
                idProduct, idColor, idSize, quantity, idState
            });
            return {
                err: 0,
                msg: 'Create quantity success.',
                response: newRecord
            };
        }
    } catch (error) {
        return {
            err: 2,
            msg: 'Error creating/updating quantity.',
            response: null
        };
    }
})

export const updateQuantitiesService = ({ id, quantity, idState }) => new Promise(async (resolve, reject) => {
    try {
        const product = await db.Quantity.findByPk(id);
        const response = await product.update({
            quantity, idState
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update quantity success.' : 'Update quantity fail.',
            response: response || null
        });
    } catch (error) { reject(error) }
})