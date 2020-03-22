import axios, {AxiosResponse} from 'axios';

export default class LoginService {

    public static login(userName: string, password: string): Promise<AxiosResponse<any>> {
        // todo
        const headers = {
            Authorization: process.env.VUE_APP_AUTH_CLIENT_HEADER,
        };

        return axios
            // todo
            .post(process.env.VUE_APP_AUTH_API_URL + '?username=' + userName + '&password=' + password + '&grant_type=password', {}, {
                headers,
            })
            .then((response) => (response.data));
    }

}
