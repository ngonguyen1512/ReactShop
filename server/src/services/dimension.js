import db from '../models';

export const getAllDimensionService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Size.findAll({
            attributes: [
                'id', 'code', 'name', 'idState'
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get size',
            response
        });
    } catch (error) { reject(error); }
});

export const createDimensionService = ({ code, name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Size.create({
            code, name, idState
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create size successful.' : 'Create size failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateDimensionService = ({ id, code, name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const sizes = await db.Size.findByPk(id);
        if (!sizes) {
            resolve({
                err: 1,
                msg: 'No color found.',
                response: null
            });
            return;
        }
        const response = await sizes.update({ code, name, idState });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update size successful.' : 'Update size failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})