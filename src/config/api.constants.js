
const BASE_URL = window.location.host.includes('localhost') ? 'http://localhost:8001' : '';
export const config = {
    login: `${BASE_URL}/api/user/login`,
    forgotPassword: `${BASE_URL}/api/user/forget-password`,
    resetPassword: `${BASE_URL}/api/user/reset-password`,
    register: `${BASE_URL}/api/user`,
    getUser: `${BASE_URL}/api/user`
}