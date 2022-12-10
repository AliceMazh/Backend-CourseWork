export function sendError(res, code, message, messageRu, data) {
    res.status(code).json({ message, message_ru: messageRu, data });
}
export function sendBlockedError(res, reason) {
    sendError(res, 403, 'Your account is blocked', 'Ваш аккаунт заблокирован', { reason });
}
export function send403Error(res) {
    sendError(res, 403, 'Forbidden', 'Доступ запрещен');
}