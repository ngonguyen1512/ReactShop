import * as services from '../services';

export const getTransmissions = async (req, res) => {
    const { permis } = req.query
    try {
        const response = await services.getTransmissionsService(permis);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transmission controller' + error,
        })
    }
}

export const getAllTransmissions = async (req, res) => {
    try {
        const response = await services.getAllTransmissionsService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transmission controller' + error,
        })
    }
}

export const createTransmissions = async (req, res) => {
    const { idTransfer, idPermission } = req.body;
    try {
        if (!idPermission || !idTransfer) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createTransmissionsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transmission controller' + error,
        })
    }
}

export const deleteTransmissions = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteTransmissionsService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transmission controller' + error,
        })
    }
}

export const updateTransmissions = async (req, res) => {
    const { id, idTransfer, idPermission } = req.body;
    try {
        if (!idPermission || !idTransfer) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateTransmissionsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transmission controller' + error,
        })
    }
}