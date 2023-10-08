abstract class RoutePaths {
    static DEFAULT: string = "/";
    static AUTH_LOGIN: string = "/login";
    static AUTH_REGISTER: string = "/register";
    static AUTH_PROFILE: string = "/profile";

    static GET_ADMINS: string = "/admins";
    static GET_ADMIN_BYID: string = "/admin/:id";
    static POST_ADMIN: string = "/admin";
    static PUT_ADMIN_BYID: string = "/admin/:id";
    static DELETE_ADMIN_BYID: string = "/admin/:id";

    static GET_USERS: string = "/users";
    static GET_USER_BYID: string = "/user/:id";
    static PUT_USER_BYID: string = "/user/:id";
    static DELETE_USER_BYID: string = "/user/:id";

}

export default RoutePaths;