import Api from './Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '51abdc4f-c003-453c-ad8b-9bec4939e4b8',
    'Content-Type': 'application/json',
  },
});

export default api;
