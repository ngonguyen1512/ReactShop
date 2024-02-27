import db from '../models';
const { Op } = require("sequelize");

export const getAllProductsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAndCountAll({
            attributes: [
                'id', 'idCategory', 'idSample', 'name', 'discount', 'price',
                'information', 'idState'
            ],
            include: [
                { model: db.Category, as: 'product_category', attributes: ['name'] },
                { model: db.State, as: 'product_state', attributes: ['name'] },
                { model: db.Sample, as: 'product_sample', attributes: ['idCategory', 'name'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

export const getPromotionProductsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            attributes: [
                'id', 'idCategory', 'idSample', 'name', 'discount', 'price',
                'information', 'idState'
            ],
            where: { discount: { [db.Sequelize.Op.gt]: 0 } },
            include: [
                { model: db.Category, as: 'product_category', attributes: ['name'] },
                { model: db.State, as: 'product_state', attributes: ['name'] },
                { model: db.Sample, as: 'product_sample', attributes: ['idCategory', 'name'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

export const getProductsLimitService = (page, category, query, { min, max, sample }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        const whereClause = {};
        if (min) {
            whereClause.price = {
                [db.Sequelize.Op.gt]: min // Greater than min
            };
        }
        if (max) {
            whereClause.price = {
                ...(whereClause.price || {}),
                [db.Sequelize.Op.lt]: max
            };
        }
        if (sample) whereClause.idSample = sample;
        if (category) whereClause.idCategory = category;

        const response = await db.Product.findAndCountAll({
            where: queries,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            include: [
                { model: db.State, as: 'product_state', attributes: ['name'] },
                { model: db.Category, as: 'product_category', attributes: ['name'] },
                { model: db.Sample, as: 'product_sample', attributes: ['idCategory', 'name'] },
            ],
            where: whereClause,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

export const createProductsService = ({ idCategory, idSample, name, discount, price, information, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.create({
            idCategory, idSample, name, discount, price, information, idState
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create product success.' : 'Create product fail.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateProductsService = ({ id, idCategory, idSample, name, discount, price, information, idState }) => new Promise(async (resolve, reject) => {
    try {
        const product = await db.Product.findByPk(id);
        const response = await product.update({
            idCategory, idSample, name, discount, price, information, idState
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update product success.' : 'Update product fail.',
            response: response || null
        });
    } catch (error) { reject(error) }
})   
