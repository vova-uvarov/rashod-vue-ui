import axios, {AxiosResponse} from 'axios';

export default class AccountService {

    public static getPlaces(): Promise<AxiosResponse<Object>> {
        return axios
            .get('http://localhost:8092/api/places')
            .then((response) => (response.data));
    }



}
