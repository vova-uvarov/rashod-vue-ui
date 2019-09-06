import axios, {AxiosResponse} from 'axios';

export default class OperationService {

    public static search(requestParams: object): Promise<AxiosResponse<Object>> {
        return axios.get('http://localhost:8092/api/operations/search', {params: requestParams})
            .then((response) => {
                return response.data
            });
    }

    public static delete(operationId: string): Promise<AxiosResponse<Object>> {
        return axios
            .delete("http://localhost:8092/api/operations/" + operationId)
    }

    public static create(operation: object): Promise<AxiosResponse<Object>> {
        return axios
            .post("http://localhost:8092/api/operations", operation)
            .then((response) => (response))
    }

    public static get(operationId: string): Promise<AxiosResponse<Object>> {
        return axios
            .get("http://localhost:8092/api/operations/" + operationId)
            .then((response) => {
                    return response.data;
                }
            )
    }
}
