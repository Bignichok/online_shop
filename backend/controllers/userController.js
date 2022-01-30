const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { User, Cart } = require('../models/models');

const generateJwt = (id, email, role) =>
    jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('invalid email or password'));
            }

            const existedUser = await User.findOne({ where: { email } });

            if (existedUser) {
                return next(
                    ApiError.badRequest('user with this email already exist')
                );
            }

            const hashedPassword = await bcrypt.hash(password, 5);
            const newUser = await User.create({
                email,
                role,
                password: hashedPassword,
            });

            await Cart.create({ userId: newUser.id });
            const token = generateJwt(newUser.id, newUser.email, newUser.role);

            return res.json({ token });
        } catch (e) {
            return next(ApiError.internalError(e.message));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('invalid email or password'));
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.badRequest('invalid email or password'));
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return next(ApiError.badRequest('invalid email or password'));
        }

        const token = generateJwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async renewToken(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
