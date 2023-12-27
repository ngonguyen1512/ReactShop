import * as services from '../services';

export const getQuantities = async (req, res) => {
    try {
        const response = await services.getAllQuantitiesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at quantity controller' + error,
        })
    }
}

export const createQuantities = async (req, res) => {
    const { idProduct, idColor, idSize, quantity, idState } = req.body;
    try {
        if (!idProduct || !idColor || !quantity || !idState)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.createQuantitiesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at quantity controller' + error
        })
    }
}

export const updateQuantities = async (req, res) => {
    const { quantity, idState } = req.body;
    try {
        if (!quantity || !idState)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.updateQuantitiesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at quantity controller' + error,
        })
    }
}
