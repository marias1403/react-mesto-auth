class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }

  getUserInfo() {
    return this._request(this._baseUrl + 'users/me', { headers: this._header })
  }

  editProfile({ name, about}) {
    return this._request(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { name, about }),
    })
  }

  changeAvatar({ avatar }) {
    return this._request(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify( { avatar }),
    })
  }

  getInitialsCards() {
    return this._request(this._baseUrl + 'cards', { headers: this._header })
  }

  addCard({ name, link }) {
    return this._request(this._baseUrl + 'cards', {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify( { name, link }),
    })
  }

  changeLikeCardStatus(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._header,
    })
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + 'cards/' + cardId, {
      method: 'DELETE',
      headers: this._header,
    })
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'ae672644-5499-4af4-bef5-295b969af30e',
    'Content-Type': 'application/json',
  }
});

export default api;

