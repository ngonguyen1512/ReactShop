import * as services from '../services';

export const getCountInvoices = async (req, res) => {
    try {
        const response = await services.getCountInvoiceService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}

export const createInvoices = async (req, res) => {
    try {
        const response = await services.createInvoices(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}

export const getInvoices = async (req, res) => {
    try {
        const response = await services.getInvoiceService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}

export const updateInvoices = async (req, res) => {
    try {
        const response = await services.updateInvoicesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at invoice controller' + error,
        })
    }
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const response = await services.getTopSellingProducts();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}