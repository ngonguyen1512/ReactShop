import * as services from '../services';

export const getDimensions = async (req, res) => {
    try {
        const response = await services.getAllDimensionService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at dimension controller' + error,
        })
    }
}

export const createDimensions = async (req, res) => {
    const { code, name, idState } = req.body;
    try {
        if (!code ||!name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createDimensionService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at dimension controller' + error,
        })
    }
}

export const updateDimensions = async (req, res) => {
    const { id, code, name, idState } = req.body;
    try {
        if (!code ||!name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateDimensionService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at dimension controller' + error,
        })
    }
}