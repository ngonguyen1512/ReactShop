import * as services from '../services';

export const getLikes = async (req, res) => {
    try {
        const response = await services.getAllLikesService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Like controller' + error,
        })
    }
}

export const createLikes = async (req, res) => {
    const { idAccount, idProduct } = req.body;
    try {
        if (!idAccount || !idProduct) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createLikesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Like controller' + error,
        })
    }
}

export const deleteLikes = async (req, res) => {
    try {
        const response = await services.deleteLikesService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Like controller' + error,
        })
    }
}