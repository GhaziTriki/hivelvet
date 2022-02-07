import axios from 'axios';

const API_URL = 'http://api.hivelvet.test';

class AuthService {
    install(data: object) {
      //  console.log(data);
      const config ={
         headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData"
         }
      }
        return axios.post(API_URL + '/install', {
            data,config
        });
    }

    register(username: string, email: string, password: string, confirmPassword: string) {
        return axios.post(API_URL + '/account/register', {
            username,
            email,
            password,
            confirmPassword,
        });
    }
    login(email: string, password: string) {
        return axios.post(API_URL + '/account/login', {
            email,
            password,
        });
    }
    logout() {
        localStorage.removeItem('user');
    }
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}

export default new AuthService();
