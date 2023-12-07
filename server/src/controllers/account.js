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

export const createAccount = async (req, res) => {
    const { name, phone, password, email, address, idPermission, idState } = req.body;
    try {
        if (!name || !phone || !password || !email || !idPermission || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createAccountService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const updateAccountsByAdmin = async (req, res) => {
    const { idPermission, idState } = req.body;
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
    const { name, email, address } = req.body;
    try {
        if (!name || !email) return res.status(400).json({
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

export const updateAccountPassword = async (req, res) => {
    const { passwordold, passwordnew } = req.body;
    try {
        if (!passwordold || !passwordnew) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateAccountPasswordService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}