import { Request, Response, NextFunction } from 'express';
import { logging } from '../../config';
import { User } from '../../models';

const NAMESPACE = 'User';

const GetAllUser = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get all user');

    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default GetAllUser;
