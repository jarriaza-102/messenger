import {axiosHelper} from '../utils/axiosHelper'

const resource = 'users';

class UserApi {

    static async login(user) {
        return await axiosHelper.postRequest( resource + '/login', user);
    }

    static async search(user) {
        return await axiosHelper.postRequest( resource + '/search', user);
    }
}

export default UserApi;