import axios, {AxiosResponse} from 'axios';

export default class DictionaryService {

    public static getOperationTypes(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/operationTypes')
            .then((response) => (response.data));
    }

    public static getAccountTypes(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/accountTypes')
            .then((response) => (response.data));
    }

    public static getCurrencies(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/currencies')
            .then((response) => (response.data));
    }

    public static getAccountStatuses(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/accountStatuses')
            .then((response) => (response.data));
    }

    public static getYears(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/dictionary/years')
            .then((response) => (response.data));
    }
}
