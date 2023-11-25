import * as authService from '../services';

export const register = async (req, res) => {
    const { name, phone, password, email, address, idPermission, idState } = req.body;
    try {
        if (!name || !phone || !password || !email || !idPermission || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await authService.registerService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        if (!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await authService.loginService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth server controller: ' + error
        })
    }
}

export const forgotPassword = async (req, res) => {
    const { phone, email } = req.body;
    try {
        if (!phone || !email) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await authService.forgotPassword(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth server controller: ' + error
        })
    }
}