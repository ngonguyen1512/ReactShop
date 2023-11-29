import * as services from '../services';

export const getTransmissions = async (req, res) => {
    const { permis } = req.query
    try {
        const response = await services.getTransmissionsService(permis);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Allocation controller' + error,
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