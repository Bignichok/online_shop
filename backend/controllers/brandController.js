const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async createBrand(req, res) {
        const { name } = req.body;
        if (!name) {
            return next(ApiError.badRequest('Name is required parameter'));
        }
        const type = await Brand.create({ name });
        return res.json(type);
    }

    async getAllBrands(req, res) {
        const brands = await Brand.findAll();

        return res.json(brands);
    }
}

module.exports = new BrandController();
