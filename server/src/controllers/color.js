import * as services from '../services';

export const getColors = async (req, res) => {
    try {
        const response = await services.getAllColorService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at color controller' + error,
        })
    }
}

export const createColors = async (req, res) => {
    const { code, name, idState } = req.body;
    try {
        if (!code || !name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createColorService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at color controller' + error,
        })
    }
}

export const updateColors = async (req, res) => {
    const { id, code, name, idState } = req.body;
    try {
        if (!code || !name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateColorService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at color controller' + error,
        })
    }
}