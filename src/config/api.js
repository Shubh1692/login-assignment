import { toast } from 'react-toastify';
class API {
    cookies
    constructor(cookies) {
        this.cookies = cookies;
    }
    /**
     * This method user for create a wrapper to get api call to add Authorization header for logged in user
     * @param url get api url
     */
    async get(url) {
        try {
            const headers = new Headers({});
            const token = await this.getToken();
            headers.set('Authorization', token);
            const request = await fetch(url, {
                method: 'GET',
                headers,
            });
            if (request.status === 401) {
                this.cookies.remove('token');
                return null;
            }
            const response = await request.json();
            console.log(response)
            if (response.status === 200 && response.success) {
                return response;
            } else if (!response.success || !response) {
                toast.error(response.message);
            }
            return null;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    /**
     * This method user for create a wrapper to post api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async post(url, body) {
        const token = await this.getToken()
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Authorization', token);
            const request = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            if (request.status === 401) {
                this.cookies.remove('token');
                return null;
            }
            const response = await request.json();
            if (response.status === 200 && response.success) {
                return response;
            } else if (!response.success || !response) {
                toast.error(response.message);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to put api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async put(url, body) {
        const token = await this.getToken()
        body.token = token
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', token);
            const request = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });
            if (request.status === 401) {
                this.cookies.remove('token');
                return null;
            }
            const response = await request.json();
            if (response.status === 200 && response.success) {
                return response;
            } else if (!response.success || !response) {
                toast.error(response.message);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for get token using cookies
     */
    async getToken() {
        const token = await  this.cookies.get('token') || '';
        return token ? `Bearer ${token}` : '';
    }

}

export default API;