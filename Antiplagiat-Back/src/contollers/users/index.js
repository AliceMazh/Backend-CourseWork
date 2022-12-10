import authRoute from "./authRoute.js";
import registerRoute from "./register.js";
import getUser from "./getUser.js";

export default function usersRoute(app) {
    const path = "/users"
    authRoute(app, path)
    registerRoute(app, path)
    getUser(app, path)
}