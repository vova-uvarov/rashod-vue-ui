import axios, {AxiosResponse} from 'axios';

export default class OperationService {

    public static search(requestParams: object): Promise<AxiosResponse<object>> {
        if (requestParams.categoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.categoryIds = requestParams.categoryIds.join(',');
        }

        if (requestParams.accountIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.accountIds = requestParams.accountIds.join(',');
        }

        if (requestParams.operationTypes) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.operationTypes = requestParams.operationTypes.join(',');
        }

        if (requestParams.shoppingList) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.shoppingList = requestParams.shoppingList.map((item) => (item.name)).join(',');
        }
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
            .then((response) => (response.data));
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
