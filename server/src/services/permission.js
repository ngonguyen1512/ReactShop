import db from '../models';
const { Op } = require("sequelize")

export const getAllPermissionService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Permission.findAll({
            // order: [['updatedAt', 'DESC']]
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get permission',
            response
        });
    } catch (error) { reject(error); }
});