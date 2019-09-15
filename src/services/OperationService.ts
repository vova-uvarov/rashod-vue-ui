import axios, {AxiosResponse} from 'axios';

export default class OperationService {

    public static search(requestParams: any): Promise<AxiosResponse<any>> {
        // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
        if (requestParams.categoryIds) {
            requestParams.categoryIds = requestParams.categoryIds.map((item: any) => (item.value)).join(',');
        }
// todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
        if (requestParams.accountIds) {
            requestParams.accountIds = requestParams.accountIds.map((item: any) => (item.value)).join(',');
        }
// todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
        if (requestParams.operationTypes) {
            requestParams.operationTypes = requestParams.operationTypes.join(',');
        }
// todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
        if (requestParams.shoppingList) {
            requestParams.shoppingList = requestParams.shoppingList.map((item: any) => (item.name)).join(',');
        }
        return axios.get('http://localhost:8092/api/operations/search', {params: requestParams})
            .then((response) => {
                return response.data;
            });
    }

    public static delete(operationId: string): Promise<AxiosResponse<any>> {
        return axios
            .delete('http://localhost:8092/api/operations/' + operationId);
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
            .post('http://localhost:8092/api/operations', createRequest)
            .then((response) => (response.data));
    }

    public static get(operationId: string): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/operations/' + operationId)
            .then((response) => {
                    return response.data;
                },
            );
    }
}
