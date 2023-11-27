import db from '../models';

//Get all categories
export const getAllFunctionsService = (permis) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (permis) {
            response = await db.Function.findAll({
                attributes: ['id', 'name', 'idPermission'],
                include: [
                    { model: db.Permission, as: 'function_permission', attributes: ['id', 'name'] },
                ],
                where: { idPermission: permis }
            });
        } else {
            resolve({
                err: 1,
                msg: 'You do not have access.',
                response: [],
            });
            return;
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get function',
            response
        });
    } catch (error) { reject(error); }
});

export const getAllsFunctionsService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Function.findAll({
            attributes: ['id', 'name', 'idPermission'],
            include: [
                { model: db.Permission, as: 'function_permission', attributes: ['id', 'name'] },
            ],
            order: [['updatedAt', 'DESC']],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get function',
            response
        });
    } catch (error) { reject(error) }
});

export const createFunctionService = ({ name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Function.create({
            name,
            idPermission,
            include: [
                { model: db.Permission, as: 'function_permission' },
            ],
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create function successful.' : 'Create function failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteFunctionService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Function.findOne({
            include: [
                { model: db.Permission, as: 'function_permission' },
            ],
            where: whereClause
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Delete function successful.' : 'Delete function failed.',
            response
        });
    } catch (error) { reject(error); }
});

export const updateFunctionsService = ({ id, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const functions = await db.Function.findByPk(id);
        if (!functions) {
            resolve({
                err: 1,
                msg: 'No function found.',
                response: null
            });
            return;
        }
        const response = await functions.update({ name, idPermission });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Function update successful.' : 'Function update failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})
