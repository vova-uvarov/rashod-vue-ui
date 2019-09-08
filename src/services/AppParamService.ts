import axios, {AxiosResponse} from 'axios';

export default class AppParamService {

    public static getAll(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/app/params')
            .then((response) => (response.data));
    }

    public static get(id: string) {
        return axios
            .get('http://localhost:8092/api/app/params/' + id)
            .then((response) => (response.data));
    }

    public static save(appParam: object): Promise<AxiosResponse<object>> {
        return axios
            .post('http://localhost:8092/api/app/params', appParam)
            .then((response) => (response.data));
    }

    public static getGroups() {
        return axios
            .get('http://localhost:8092/api/app/params/groups')
            .then((response) => (response.data));
    }

    public static getKeys() {
        return axios
            .get('http://localhost:8092/api/app/params/keys')
            .then((response) => (response.data));
    }

    public static delete(id: string) {
        return axios
            .delete('http://localhost:8092/api/app/params/' + id)
            .then((response) => (response));
    }
}
