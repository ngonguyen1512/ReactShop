import * as services from '../services';

export const getAccounts = async (req, res) => {
    try {
        const response = await services.getAllAccountsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}

export const updateAccountsByAdmin = async (req, res) => {
    const { idPermission, idState  } = req.body;
    try {
        if (!idPermission || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateAccountsByAdminService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}

export const updateAccountOne = async (req, res) => {
    const { name, email, address, passwordold, passwordnew  } = req.body;
    try {
        if (!name || !email || !passwordold || !passwordnew) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateAccountOneService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}