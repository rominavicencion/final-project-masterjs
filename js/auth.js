'use-strict'

class Auth {
    static #instance;
    #usernameAuthenticable = "masterjs";
    #passwordAuthenticable = "123123";
    #isLogged = false;
    constructor() {}
    static createInstance() {
        if (!this.#instance) {
            this.#instance = new Auth();
        }
        return this.#instance;
    }
    get userLogged() {
        return this.#usernameAuthenticable;
    }
    get isLogged() {
        return this.#isLogged;
    }
    login = (e, username, password) => {
        e.preventDefault();

        const errorText = document.getElementById('error-text');
        const payButton = document.getElementById('pay-button');
        const userInfo = document.getElementById('user-info');
        const usernameInfo = document.getElementById('username-info');
        const loginForm = document.getElementById('login-form');

        if ((username && password) && (username === this.#usernameAuthenticable) && (password == this.#passwordAuthenticable)) {
            this.#isLogged = true;
            errorText.style = 'display: none;';
            payButton.disabled = false;
            usernameInfo.innerHTML = `Bienvenidx ${username}`;
            userInfo.style = 'display: block;';
            loginForm.style = 'display: none';
        } else {
            // mensaje de error al autenticarse
            this.#isLogged = false;
            errorText.style = 'display: block;';
            payButton.disabled = true;
            userInfo.style = 'display: none;';
            loginForm.style = 'display: block';
        }
    }
}

const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');

const userAuth = Auth.createInstance();

loginBtn.addEventListener('click', (e) => userAuth.login(e, usernameInput.value, passwordInput.value));

if (userAuth.isLogged) userAuth.userLogged;
