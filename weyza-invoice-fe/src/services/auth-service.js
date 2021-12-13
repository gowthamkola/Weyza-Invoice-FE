class AuthService {
    login(username, password) {
      return axios
        .post(API_URL + "signin", { username, password })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, username, email, password, phone) {
        return axios.post(API_URL + "signup", {
        name,
        username,
        email,
        password,
        phone
        });
      }
    }

export default new AuthService();