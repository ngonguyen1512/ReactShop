import * as services from '../services';

export const getStates = async (req, res) => {
    try {
        const response = await services.getAllStatesService();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Tranfer controller' + error,
        })
    }
}

export const createStates = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createStatesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transfer controller' + error,
        })
    }
}

export const deleteStates = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteStatesService(id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Transfer controller' + error,
        })
    }
}

export const updateStates = async (req, res) => {
    const { id, name } = req.body;
    try {
        if (!name) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateStatesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at transfer controller' + error,
        })
    }
}