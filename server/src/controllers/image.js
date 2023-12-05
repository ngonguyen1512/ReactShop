import * as services from '../services';

export const getImages = async (req, res) => {
    try {
        const response = await services.getAllImagesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at image controller' + error,
        })
    }
}

export const createImages = async (req, res) => {
    const { idProduct, idColor, image1, image2, image3, image4 } = req.body;
    try {
        if (!idProduct || !idColor || !image1)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.createImagesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at image controller' + error
        })
    }
}

export const updateImages = async (req, res) => {
    const { idProduct, idColor, image1, image2, image3, image4 } = req.body;
    try {
        if (!idProduct || !idColor || !image1)
            return res.status(400).json({
                err: 1,
                msg: 'Please fill in the field!'
            })
        const response = await services.updateImagesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at image controller' + error,
        })
    }
}
