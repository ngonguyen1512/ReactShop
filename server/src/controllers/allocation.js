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