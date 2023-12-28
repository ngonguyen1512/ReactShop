import db from '../models';
const { Op } = require("sequelize")

export const getAllPermissionService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Permission.findAll();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get permission',
            response
        });
    } catch (error) { reject(error); }
});

export const createPermissionService = ({ name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Permission.create({ name, idState });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create permission successful.' : 'Create permission failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updatePermissionService = ({ id, name, idState }) => new Promise(async (resolve, reject) => {
    try {
        const permissions = await db.Permission.findByPk(id);
        if (!permissions) {
            resolve({
                err: 1,
                msg: 'No function found.',
                response: null
            });
            return;
        }
        const response = await permissions.update({ name, idState });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update permission successful.' : 'Update permission failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})