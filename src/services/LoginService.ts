import axios, {AxiosResponse} from 'axios';

export default class LoginService {

    public static login(userName: string, password: string): Promise<AxiosResponse<any>> {
        // todo
        const headers = {
            'Authorization': 'Basic dWk6dWlfc2VjcmV0'
        }

        return axios
            // todo
            .post('http://localhost:9999/oauth/token?username=' + userName + '&password=' + password + '&grant_type=password',{}, {
                headers: headers
            })
            .then((response) => (response.data));
    }

}
