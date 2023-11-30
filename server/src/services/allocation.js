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

export const createAllocationsService = ({ idTransfer, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Allocation.create({
            idTransfer,
            name,
            include: [
                { model: db.Transfer, as: 'allocation_transfer', attributes: ['id', 'name'] },
            ],
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create Allocation successful.' : 'Create Allocation failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteAllocationsService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Allocation.findOne({where: whereClause});
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Delete Allocation successful.' : 'Delete Allocation failed.',
            response
        });
    } catch (error) { reject(error) }
});

export const updateAllocationsService = ({ id, idTransfer, name }) => new Promise(async (resolve, reject) => {
    try {
        const transmission = await db.Allocation.findByPk(id);
        const response = await transmission.update({
            idTransfer, name,
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Update Allocation successful.' : 'Update Allocation failed.',
            response: response || null
        });
    } catch (error) { reject(error); }
})