export class Http {
    static HEADERS = { 'Content-Type': 'application/json' };
    static async get(url) {
        try {
            return await request(url, 'GET');
        } catch (e) {
            throw e;
            console.log(e);
        }
    }
    static async post(url, data = {}) {
        try {
            return await request(url, 'POST', data);
        } catch (e) {
            throw e;
            console.log(e);
        }
    }
    static async patch(url, data = {}) {
        try {
            return await request(url, 'PATCH', data);
        } catch (e) {
            throw e;
            console.log(e);
        }
    }
    static async delete(url) {
        try {
            return await request(url, 'DELETE');
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

async function request(url, method = 'GET', body) {
    const config = {
        headers: Http.HEADERS,
        method,
    };

    if (method === 'POST' || method === 'PATCH') {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    return await response.json();
}
