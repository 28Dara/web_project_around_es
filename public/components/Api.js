export class Api {
    baseUrl;
    headers;
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }
    async handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async sendRequest(endpoint, options = {}) {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
    async getUserInfo() {
        return this.sendRequest('/users/me');
    }
    async getInitialCards() {
        return this.sendRequest('/cards/');
    }
    async editUserInfo(data) {
        return this.sendRequest('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
    async addCard(data) {
        return this.sendRequest('/cards/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
    }
    async changeLikeCardStatus(cardId, isCurrentlyLiked) {
        return this.sendRequest(`/cards/${cardId}/likes`, {
            method: isCurrentlyLiked ? 'DELETE' : 'PUT',
        });
    }
    async updateAvatar(data) {
        return this.sendRequest('/users/me/avatar', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
}
