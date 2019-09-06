import axios, {AxiosResponse} from 'axios';

export default class DictionaryService {

    public static getOperationTypes(): Promise<AxiosResponse<Object>> {
        return axios
            .get('http://localhost:8092/api/dictionary/operationTypes')
            .then((response) => (response.data));
    }
}
