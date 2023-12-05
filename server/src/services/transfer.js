import db from '../models';

export const getAllTransfersService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Transfer.findAll({
            attributes: ['id', 'name']
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get transfer',
            response
        });
    } catch (error) { reject(error); }
});

export const createTransferService = ({ name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Transfer.create({ name });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo chuyển trang thành công.' : 'Tạo chuyển trang không thành công',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const deleteTransfersService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Transfer.findOne({
            where: whereClause
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Xoá chuyển trang thành công' : 'Xoá chuyển trang không thành công!',
            response
        });
    } catch (error) { reject(error) }
});

export const updateTransfersService = ({ id, name }) => new Promise(async (resolve, reject) => {
    try {
        const transfer = await db.Transfer.findByPk(id);
        const response = await transfer.update({ name });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật chuyển trang thành công.' : 'Cập nhật chuyển trang không thành công',
            response: response || null
        });
    } catch (error) { reject(error); }
})