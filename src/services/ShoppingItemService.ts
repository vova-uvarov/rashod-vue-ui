import axios, {AxiosResponse} from 'axios';

export interface Balance {
    accountId: number;
    accountName: string;
    balance: number;
}

export default class ShoppingItemService {

    public static getAllNames(): Promise<AxiosResponse<string[]>> {
        return axios
            .get('/api/shoppingItems/names')
            .then((response) => (response.data));
    }


}
