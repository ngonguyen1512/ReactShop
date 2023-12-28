import db from '../models';

export const getTransmissionsService = (permis) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (permis) {
            response = await db.Transmission.findAll({
                include: [
                    { model: db.Transfer, as: 'transmission_transfer', attributes: ['name'] },
                    { model: db.Permission, as: 'transmission_permission', attributes: ['name'] },
                ],
                where: { idPermission: permis }
            });
        } else {
            resolve({
                err: 1,
                msg: 'You do not have.',
                response: [],
            });
            return;
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Allocation',
            response
        });
    } catch (error) { reject(error); }
});

export const getAllTransmissionsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Transmission.findAll({
            include: [
                { model: db.Transfer, as: 'transmission_transfer', attributes: ['name'] },
                { model: db.Permission, as: 'transmission_permission', attributes: ['name'] },
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Transmission',
            response
        });
    } catch (error) { reject(error); }
});

export const createTransmissionsService = ({ idTransfer, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Transmission.create({
            idTransfer, idPermission
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create transmission successful.' : 'Create transmission failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteTransmissionsService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Transmission.findOne({
            where: whereClause
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Delete transmission successful.' : 'Delete transmission failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const updateTransmissionsService = ({ id, idTransfer, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const transmission = await db.Transmission.findByPk(id);
        const response = await transmission.update({
            idTransfer, idPermission,
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update transmission successful.' : 'Update transmission failed.',
            response: response || null
        });
    } catch (error) { reject(error); }
})