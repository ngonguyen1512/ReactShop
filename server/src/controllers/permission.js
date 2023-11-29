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