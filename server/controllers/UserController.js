import { validationResult } from 'express-validator';
import config from 'config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { email, name, password: initialPassword } = req.body;
        const checkUser = await UserModel.findOne({ email });

        if (checkUser) {
            return res.status(400).json({
                message: 'Этот пользователь уже существует',
            });
        }

        const hash = await bcrypt.hash(initialPassword, 10);

        const doc = new UserModel({
            email,
            name,
            password: hash,
        });

        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.get('jwtSecret'),
            {
                expiresIn: '1d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password: initialPassword } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const validPassword = await bcrypt.compare(initialPassword, user._doc.password);

        if (!validPassword) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.get('jwtSecret'),
            {
                expiresIn: '1d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ошибка при входе',
        });
    }
};

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { password, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};
