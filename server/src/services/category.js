import db from '../models';

//Get all categories
export const getAllCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({ raw: true });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Get category successful' : 'Get category failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const createCategoriesService = ({ name, image }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.create({ name, image });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create category successful.' : 'Create category failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateCategoriesService = ({ id, name, image }) => new Promise(async (resolve, reject) => {
    try {
        const category = await db.Category.findByPk(id);
        const response = await category.update({ name, image });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update category successful.' : 'Update category failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})