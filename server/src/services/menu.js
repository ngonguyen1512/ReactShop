import db from '../models';

export const getAllMenusService = (permis) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        if (permis) whereClause.idPermission = permis;
        const response = await db.Menu.findAll({
            include: [{ model: db.Permission, as: 'menu_permission' }],
            where: whereClause
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Get menu successful.' : 'Get menu failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const createMenusService = ({ url, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Menu.create({
            url,
            name,
            idPermission,
            include: [{ model: db.Permission, as: 'menu_permission' }],
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create menu successful.' : 'Create menu failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteMenusService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Menu.findOne({
            include: [{ model: db.Permission, as: 'menu_permission' }],
            where: whereClause
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Delete menu successful.' : 'Delete menu  failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const updateMenusService = ({ id, url, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const menu = await db.Menu.findByPk(id);
        const response = await menu.update({
            url, name, idPermission,
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update menu successful.' : 'Update menu failed.',
            response: response || null
        });
    } catch (error) { reject(error); }
})