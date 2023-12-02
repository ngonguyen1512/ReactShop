import db from '../models';
const { Op } = require("sequelize");

export const getAllProductsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            include: [
                { model: db.Category, as: 'product_category', attributes: ['id', 'name'] },
                { model: db.State, as: 'product_state', attributes: ['id', 'name'] },
                { model: db.Sample, as: 'product_sample', attributes: ['id', 'idCategory', 'name'], where: { idState: '2' } },
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

// export const getNewProductsService = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.Product.findAll({
//             raw: true,
//             nest: true,
//             offset: 0,
//             order: [['createdAt', 'DESC']],
//             limit: +process.env.LIMIT_NEW,
//             include: [
//                 { model: db.Category, as: 'categories', attributes: ['name'] },
//                 { model: db.Provider, as: 'providers', attributes: ['name'] },
//                 { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
//                 { model: db.Sample, as: 'samples', attributes: ['id', 'idCategory', 'name'], where: { state: '1' } },
//             ],
//             attributes: [
//                 'id', 'idCategory', 'image', 'name', 'address', 'price', 'discount',
//                 'code', 'promotion', 'information', 'idProvider'
//             ],
//             where: { state: '1' },
//         });
//         resolve({
//             err: response ? 0 : 1,
//             msg: response ? 'OK' : 'Failed to get product',
//             response
//         });
//     } catch (error) { reject(error); }
// })

// export const getProductsLimitService = (page, category, query, { code, sample }) => new Promise(async (resolve, reject) => {
//     try {
//         let offset = (!page || +page <= 1) ? 0 : (+page - 1)
//         const queries = { ...query }
//         const whereClause = {};
//         if (code) whereClause.code = code;
//         if (sample) whereClause.idSample = sample;
//         if (category) whereClause.idCategory = category;

//         const response = await db.Product.findAndCountAll({
//             where: queries,
//             offset: offset * +process.env.LIMIT,
//             limit: +process.env.LIMIT,
//             raw: true,
//             nest: true,
//             include: [
//                 { model: db.Category, as: 'categories', attributes: ['id', 'name'] },
//                 { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
//             ],
//             where: whereClause,
//         });
//         resolve({
//             err: response ? 0 : 1,
//             msg: response ? 'OK' : 'Failed to get product',
//             response
//         });
//     } catch (error) { reject(error); }
// });

export const createProductsService = ({ idCategory, idSample, name, discount, price, information, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.create({
            idCategory, idSample, name, discount, price, information, idState,
            include: [
                { model: db.Category, as: 'product_category', attributes: ['id', 'name'] },
                { model: db.State, as: 'product_state', attributes: ['id', 'name'] },
                { model: db.Sample, as: 'product_sample', attributes: ['id', 'idCategory', 'name'] },
            ],
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
