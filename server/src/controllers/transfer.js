import * as services from '../services';

export const getTransfers = async (req, res) => {
    try {
        const response = await services.getAllTransfersService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Tranfer controller' + error,
        })
    }
}

export const createTransfers = async (req, res) => {
    const { name, idPermission } = req.body;
    try {
        if (!name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createTransferService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transfer controller' + error,
        })
    }
}

export const deleteTransfers = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteTransfersService(id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transfer controller' + error,
        })
    }
}

export const updateTransfers = async (req, res) => {
    const { id, name, idPermission } = req.body;
    try {
        if (!name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateTransfersService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at transfer controller' + error,
        })
    }
}