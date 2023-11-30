import db from '../models';

export const getAllStatesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.State.findAll({raw: true});
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Get states successful.' : 'Get states failed.',
            response
        });
    } catch (error) { reject(error); }
});

export const createStatesService = ({ name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.State.create({ name});
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create states successful.' : 'Create state failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateStatesService = ({ id, name }) => new Promise(async (resolve, reject) => {
    try {
        const transfer = await db.State.findByPk(id);
        const response = await transfer.update({ name });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update state successful.' : 'Update state failed.',
            response: response || null
        });
    } catch (error) { reject(error); }
})