import { Request, Response, NextFunction } from 'express';
import { logging } from '../../config';
import bcryptjs from 'bcryptjs';
import { User, UserType } from '../../models';
import Joi from '@hapi/joi';

const NAMESPACE = 'User';

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    user_type: Joi.string(),
    fullname: Joi.string(),
    address: Joi.string(),
    phone: Joi.number()
});

const Register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    logging.info(NAMESPACE, `register`);

    let { username, password, user_type, fullname, phone, email, address } = req.body;

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    await User.find({ username })
        .exec()
        .then((users) => {
            if (users.length >= 1) {
                return res.status(400).json({ message: 'Username already in use' });
            } else {
                bcryptjs.hash(password, 10, async (hashError, hash) => {
                    if (hashError) {
                        res.status(400).json({
                            message: hashError.message,
                            error: hashError
                        });
                    }

                    try {
                        let userTypeId;

                        if (user_type) {
                            userTypeId = await UserType.findOne({ name: user_type });
                            if (userTypeId) userTypeId = userTypeId._id;
                        } else {
                            userTypeId = await UserType.findOne({ name: 'customer' });
                            if (userTypeId) userTypeId = userTypeId._id;
                        }

                        const _user = new User({
                            username,
                            password: hash,
                            user_type: userTypeId,
                            fullname,
                            phone,
                            email,
                            address
                        });

                        return _user
                            .save()
                            .then((user) => {
                                return res.status(200).json({
                                    user
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                return res.status(500).json({
                                    message: err.message,
                                    err
                                });
                            });
                    } catch (error) {
                        res.status(400).json({ message: error.message, error });
                    }
                });
            }
        });
};

export default Register;
