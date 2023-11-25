import * as services from '../services';

export const getMenus = async(req, res) => {
    const {permis} = req.query
    try {
        const response = await services.getAllMenusService(permis);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Menu controller' + error,
        })
    }
}

export const createMenus = async (req, res) => {
    const { url, name, idPermission } = req.body;
    try {
        if (!url || !name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createMenusService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Menu controller' + error,
        })
    }
}

export const deleteMenus = async(req, res) => {
    const {id} = req.body
    try {
        const response = await services.deleteMenusService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Menu controller' + error,
        })
    }
}

export const updateMenus = async(req, res) => {
    const {id, url, name, idPermission} = req.body;
    try {
        if (!url || !name || !idPermission) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateMenusService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Menu controller' + error,
        })
    }
}