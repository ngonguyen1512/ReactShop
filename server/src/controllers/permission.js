import * as services from '../services';

export const getPermissions = async(req, res) => {
    try {
        const response = await services.getAllPermissionService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Permission controller' + error,
        })
    }
}

export const createPermissions = async (req, res) => {
    const { name, idState } = req.body;
    try {
        if (!name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createPermissionService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Permission controller' + error,
        })
    }
}

export const updatePermissions = async (req, res) => {
    const { id, name, idState } = req.body;
    try {
        if (!name || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updatePermissionService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Permission controller' + error,
        })
    }
}