import * as services from '../services';

export const getSamples = async(req, res) => {
    const { idCategory } = req.query
    try {
        const response = await services.getSamplesService(idCategory);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const getAllSamples = async(req, res) => {
    try {
        const response = await services.getAllSamplesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const createSamples = async (req, res) => {
    const { name, idCategory, idState } = req.body;
    try {
        if (!name || !idCategory || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createSamplesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const updateSamples = async (req, res) => {
    const { id, name, idCategory, idState } = req.body;
    try {
        if (!name || !idCategory || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateSamplesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}