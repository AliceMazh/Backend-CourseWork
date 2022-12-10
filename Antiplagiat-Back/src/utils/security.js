import jwt from 'jsonwebtoken';
import {sendError} from './sendError.js';

export function tokenMiddleware(app) {
    const onUnauthorized = (response) => {
        sendError(response, 401, 'Unauthorized', 'Вы не авторизованы');
    };
    app.use((request, response, next) => {
        var _a;
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const url = request.url.split('?')[0].replace(/(^\/)/gmi, '').replace(/(\/$)/gmi, '');
        if (url === 'users/auth' || url === 'users/register' || url === "files/download") {
            next();
        } else {
            jwt.verify(token, "qweqwe", (err, decoded) => {
                if (err) {
                    onUnauthorized(response)
                } else {
                    const id = decoded?.id;
                    app.set('userId', id);
                    next()
                }
            });
        }
    });
}
