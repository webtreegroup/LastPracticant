import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import { Response, Request, NextFunction } from 'express';

const nonce = Buffer.from(uuidv4()).toString('base64');

export const generateNonce = (req: Request, res: Response, next: NextFunction) => {
    res.locals.styleNonce = nonce;

    next();
};

export const addCSP = helmet.contentSecurityPolicy({
    directives: {
        'default-src': ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', `'nonce-${nonce}'`],
    },
});
