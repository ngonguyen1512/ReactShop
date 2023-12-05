import db from '../models';

export const getSamplesService = (idCategory) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (idCategory) {
            response = await db.Sample.findAll({
                attributes: [
                    'id', 'idCategory', 'name', 'idState'
                ],
                include: [
                    { model: db.Category, as: 'sample_category', attributes: ['name'] },
                    { model: db.State, as: 'sample_state', attributes: ['name'] }
                ],
                where: { idCategory: idCategory }
            });
        } else {
            resolve({
                err: 1,
                msg: 'You do not have idCategory.',
                response: [],
            });
            return;
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Sample',
            response
        });
    } catch (error) { reject(error) }
});

export const getAllSamplesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sample.findAll({
            attributes: [
                'id', 'idCategory', 'name', 'idState'
            ],
            include: [
                { model: db.Category, as: 'sample_category', attributes: ['name'] },
                { model: db.State, as: 'sample_state', attributes: ['name'] }
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Sample',
            response
        });
    } catch (error) { reject(error) }
});

export const createSamplesService = ({ name, idCategory, idState }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sample.create({
            name, idCategory, idState
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo mẫu sản phẩm thành công.' : 'Tạo mẫu sản phẩm không thành công',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateSamplesService = ({ id, name, idCategory, idState }) => new Promise(async (resolve, reject) => {
    try {
        const sample = await db.Sample.findByPk(id);
        const response = await sample.update({
            name, idCategory, idState
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật mẫu sản phẩm thành công.' : 'Cập nhật mẫu sản phẩm không thành công',
            response: response || null
        });
    } catch (error) { reject(error); }
})