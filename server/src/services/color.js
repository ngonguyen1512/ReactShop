import db from '../models';

export const getAllColorService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Color.findAll({
            attributes: [
                'id', 'code', 'name', 'idState'
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get color',
            response
        });
    } catch (error) { reject(error); }
});

export const createColorService = ({ code, name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Color.create({
            code, name, idState,
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create color successful.' : 'Create color failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateColorService = ({ id, code, name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const colors = await db.Color.findByPk(id);
        if (!colors) {
            resolve({
                err: 1,
                msg: 'No color found.',
                response: null
            });
            return;
        }
        const response = await colors.update({ code, name, idState });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update color successful.' : 'Update color failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})