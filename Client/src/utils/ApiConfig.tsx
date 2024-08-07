
export class ApiConfig {
    static baseUrl = import.meta.env.VITE_SERVER_ORIGIN;
    static register = this.baseUrl + "/auth/register";
    static login = this.baseUrl + "/auth/login";
    static logout = this.baseUrl + "/auth/logout";
    static change = this.baseUrl + "/password/change";
    static reset = this.baseUrl + "/password/reset";
    static verifyotp = this.baseUrl + "/password/otp";
    static getotp = this.baseUrl + "/password/email";
}