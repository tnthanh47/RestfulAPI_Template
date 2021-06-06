import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import { logging } from '../../config';
import { User } from '../../models';
import SignJWT from '../../functions/SignJWT';

const NAMESPACE = 'User';

const Login = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'login');

    let { username, password } = req.body;

    await User.findOne({ username })
        .exec()
        .then((user) => {
            if (user) {
                bcryptjs.compare(password, user.password, (error, result) => {
                    if (error) {
                        logging.error(NAMESPACE, error.message, error);

                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    } else if (result) {
                        SignJWT(user, (_error, token) => {
                            if (_error) {
                                return res.status(401).json({
                                    message: 'Unauthorized',
                                    error: _error
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    message: 'Authorize success',
                                    token,
                                    user
                                });
                            }
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                message: err.message,
                err
            });
        });
};

export default Login;
