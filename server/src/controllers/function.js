import * as services from '../services';

export const getFunctions = async (req, res) => {
    const { permis } = req.query
    try {
        const response = await services.getAllFunctionsService(permis);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Function controller' + error,
        })
    }
}

export const getAllsFunctions = async (req, res) => {
    try {
        const response = await services.getAllsFunctionsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Function controller' + error,
        })
    }
}

export const createFunctions = async (req, res) => {
    const { name, idPermission } = req.body;
    try {
        if (!name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createFunctionService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Function controller' + error,
        })
    }
}

export const deleteFunctions = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteFunctionService(id);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Function controller' + error,
        })
    }
}

export const updateFunctions = async (req, res) => {
    const { id, name, idPermission } = req.body;
    try {
        if (!name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateFunctionsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Function controller' + error,
        })
    }
}