import axios, {AxiosResponse} from 'axios';

export default class OperationService {

    public static search(requestParams: object): Promise<AxiosResponse<object>> {
        return axios.get('http://localhost:8092/api/operations/search', {params: requestParams})
            .then((response) => {
                return response.data;
            });
    }

    public static delete(operationId: string): Promise<AxiosResponse<object>> {
        return axios
            .delete('http://localhost:8092/api/operations/' + operationId);
    }

    public static create(operation: object,
                         countRepeat: number): Promise<AxiosResponse<object>> {
        const createRequest = {
            operation,
            countRepeat,
        };

        return axios
            .post('http://localhost:8092/api/operations', createRequest)
            .then((response) => (response));
    }

    public static get(operationId: string): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/operations/' + operationId)
            .then((response) => {
                    return response.data;
                },
            );
    }
}
