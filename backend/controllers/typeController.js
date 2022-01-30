const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async createType(req, res, next) {
        const { name } = req.body;
        if (!name) {
            return next(ApiError.badRequest('Name is required parameter'));
        }
        const type = await Type.create({ name });
        return res.json(type);
    }

    async getAllTypes(req, res) {
        const types = await Type.findAll();

        return res.json(types);
    }
}

module.exports = new TypeController();
