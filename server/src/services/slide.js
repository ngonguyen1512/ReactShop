import db from '../models';

export const getAllSlideService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Slide.findAll();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get slide',
            response
        });
    } catch (error) { reject(error); }
});

export const createSlideService = ({ name, image, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Slide.create({ name, image, idState });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful create.' : 'Create failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteSlideService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Slide.findOne({ where: whereClause, });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Successful delete.' : 'Delete failed.',
            response
        });
    } catch (error) { reject(error); }
});

export const updateSlideService = ({ id, name, image, idState }) => new Promise(async (resolve, reject) => {
    try {
        const slide = await db.Slide.findByPk(id);
        const response = await slide.update({ name, image, idState });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful update.' : 'Update failed.',
            response: response || null
        });
    } catch (error) { reject(error); }
})