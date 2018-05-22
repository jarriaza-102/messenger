import axios from 'axios';
import {API_URL} from '../utils/utils'

const url = 'users';

class UserApi {

    static async getAllUsers() {
        return axios.get(API_URL + url);
    }

    static async login(user) {
        return await axios.post(API_URL + url + '/login', user);
    }
}

export default UserApi;