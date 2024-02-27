import * as services from '../services';

export const getProducts = async (req, res) => {
    try {
        const response = await services.getAllProductsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error,
        })
    }
}

export const getProductsPromotion = async (req, res) => {
    try {
        const response = await services.getPromotionProductsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error,
        })
    }
}

export const getProductsLimit = async (req, res) => {
    const { page, min, max, sample, category, ...query } = req.query
    try {
        const response = await services.getProductsLimitService(page, category, query, { min, max, sample });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product limit controller' + error,
        })
    }
}

export const createProducts = async (req, res) => {
    const { idCategory, idSample, name, discount, price, information, idState } = req.body;
    try {
        if (!idCategory || !idSample || !name || !discount || !price || !information || !idState)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.createProductsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error
        })
    }
}

export const updateProducts = async (req, res) => {
    const { idCategory, idSample, name, discount, price, information, idState } = req.body;
    try {
        if (!idCategory || !idSample || !name || !discount || !price || !information || !idState)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.updateProductsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at product controller' + error,
        })
    }
}
