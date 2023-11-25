import * as services from '../services';

export const getCurrent = async(req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOneService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at User controller' + error,
        })
    }
}