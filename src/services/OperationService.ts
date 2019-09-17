import axios, {AxiosResponse} from 'axios';

export default class OperationService {

    public static search(requestParams: any): Promise<AxiosResponse<any>> {
        if (requestParams.categoryIds) {
            requestParams.categoryIds = requestParams.categoryIds.map((item: any) => (item.value));
        }
        if (requestParams.accountIds) {
            requestParams.accountIds = requestParams.accountIds.map((item: any) => (item.value));
        }

        if (requestParams.shoppingList) {
            requestParams.shoppingList = requestParams.shoppingList.map((item: any) => (item.name));
        }
        return axios.get('/api/operations/search', {params: requestParams})
            .then((response) => {
                return response.data;
            });
    }

    public static delete(operationId: string): Promise<AxiosResponse<any>> {
        return axios
            .delete('/api/operations/' + operationId);
    }

    public static create(operation: any,
                         countRepeat: number): Promise<AxiosResponse<any>> {
        delete operation.category.name;
        delete operation.account.name;
        const createRequest = {
            operation,
            countRepeat,
        };

        return axios
            .post('/api/operations', createRequest)
            .then((response) => (response.data));
    }

    public static get(operationId: string): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/operations/' + operationId)
            .then((response) => {
                    return response.data;
                },
            );
    }
}
