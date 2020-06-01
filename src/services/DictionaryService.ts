import axios, {AxiosResponse} from 'axios';

export default class DictionaryService {

    public static getStaticDictionaries(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/all')
            .then((response) => (response.data));
    }

    public static getTags(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/tags')
            .then((response) => (response.data));
    }

    public static getYears(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/dictionary/years')
            .then((response) => (response.data));
    }
}
