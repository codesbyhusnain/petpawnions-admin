class Auth {
  constructor() {
    this.authProtected = true;
  }

  login() {
    this.authProtected = false;
  }
  logout() {
    this.authProtected = true;
  }

  isAuthProtected() {
    return this.authProtected;
  }
}

export default new Auth();
