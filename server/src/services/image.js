import db from '../models';
const { Op } = require("sequelize");

export const getAllImagesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Image.findAll({
            attributes: [
                'id', 'idProduct', 'image1', 'image2', 'image3', 'image4', 'idColor'
            ],
            include: [
                { model: db.Color, as: 'image_color', attributes: ['name'] },
                { model: db.Product, as: 'image_product', attributes: ['name'] },

            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get image',
            response
        });
    } catch (error) { reject(error); }
});

export const createImagesService = ({ idProduct, image1, image2, image3, image4, idColor }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Image.create({
            idProduct, image1, image2, image3, image4, idColor
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create image success.' : 'Create image fail.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateImagesService = ({ id, idProduct, image1, image2, image3, image4, idColor }) => new Promise(async (resolve, reject) => {
    try {
        const image = await db.Image.findByPk(id);
        const response = await image.update({
            idProduct, image1, image2, image3, image4, idColor
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update image success.' : 'Update image fail.',
            response: response || null
        });
    } catch (error) { reject(error) }
})