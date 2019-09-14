import axios, {AxiosResponse} from 'axios';

export default class DictionaryService {

    public static getOperationTypes(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/dictionary/operationTypes')
            .then((response) => (response.data));
    }

    public static getAccountTypes(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/dictionary/accountTypes')
            .then((response) => (response.data));
    }

    public static getCurrencies(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/dictionary/currencies')
            .then((response) => (response.data));
    }

    public static getAccountStatuses(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/dictionary/accountStatuses')
            .then((response) => (response.data));
    }
}
