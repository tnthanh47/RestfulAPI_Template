import { Request, Response, NextFunction } from 'express';
import { logging } from '../../config';

const NAMESPACE = 'User';

const ValidateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Token validated, user authorized`);

    return res.status(200).json({
        message: 'Authorized'
    });
};

export default ValidateToken;
