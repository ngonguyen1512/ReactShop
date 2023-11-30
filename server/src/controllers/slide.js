import * as services from '../services';

export const getSlide = async(req, res) => {
    try {
        const response = await services.getAllSlideService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slide controller' + error,
        })
    }
}

export const createSlides = async (req, res) => {
    const { name, image, idState } = req.body;
    try {
        if (!name || !image || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.createSlideService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slide controller' + error,
        })
    }
}

export const deleteSlides = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteSlideService(id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slide controller' + error,
        })
    }
}

export const updateSlides = async (req, res) => {
    const { id, name, image, idState } = req.body;
    try {
        if (!name || !image || !idState) return res.status(400).json({
            err: 1,
            msg: 'Please fill in the field!'
        })
        const response = await services.updateSlideService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slide controller' + error,
        })
    }
}