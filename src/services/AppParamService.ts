import axios, {AxiosResponse} from 'axios';

export default class AppParamService {

    public static getAll(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/app/params')
            .then((response) => (response.data));
    }

    public static get(id: string) {
        return axios
            .get('/api/app/params/' + id)
            .then((response) => (response.data));
    }

    public static save(appParam: any): Promise<AxiosResponse<any>> {
        return axios
            .post('/api/app/params', appParam)
            .then((response) => (response.data));
    }

    public static getGroups() {
        return axios
            .get('/api/app/params/groups')
            .then((response) => (response.data));
    }

    public static getKeys() {
        return axios
            .get('/api/app/params/keys')
            .then((response) => (response.data));
    }

    public static delete(id: string) {
        return axios
            .delete('/api/app/params/' + id)
            .then((response) => (response));
    }
}
