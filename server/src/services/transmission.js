import db from '../models';

export const getTransmissionsService = (permis) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (permis) {
            response = await db.Transmission.findAll({
                include: [
                    { model: db.Transfer, as: 'transmission_transfer', attributes: ['id', 'name'] },
                    { model: db.Permission, as: 'transmission_permission', attributes: ['id', 'name'] },
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
        const response = await db.Transmission.findAll();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Transmission',
            response
        });
    } catch (error) { reject(error); }
});