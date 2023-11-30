import * as services from '../services';

export const getAllocations = async (req, res) => {
    const { idTransfer } = req.query
    try {
        const response = await services.getAllocationsService(idTransfer);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
        })
    }
}

export const getAllAllocations = async (req, res) => {
    try {
        const response = await services.getAllAllocationsService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
        })
    }
}

export const createAllocations = async (req, res) => {
    const { idTransfer, name } = req.body;
    try {
        if (!name || !idTransfer) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createAllocationsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
        })
    }
}

export const deleteAllocations = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteAllocationsService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
        })
    }
}

export const updateAllocations = async (req, res) => {
    const { id, idTransfer, name } = req.body;
    try {
        if (!name || !idTransfer) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateAllocationsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
        })
    }
}