import db from '../models';

export const getAllocationsService = (idTransfer) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (idTransfer) {
            response = await db.Allocation.findAll({
                include: [
                    { model: db.Transfer, as: 'allocation_transfer', attributes: ['id', 'name'] },
                ],
                where: { idTransfer: idTransfer }
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

export const getAllAllocationsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Allocation.findAll({
            include: [
                { model: db.Transfer, as: 'allocation_transfer', attributes: ['id', 'name'] },
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Allocation',
            response
        });
    } catch (error) { reject(error); }
});