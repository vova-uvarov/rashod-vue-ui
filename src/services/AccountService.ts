import axios, {AxiosResponse} from 'axios';

export interface Balance {
    accountId: number;
    accountName: string;
    balance: number;
}

export default class AccountService {

    public static loadBalances(): Promise<AxiosResponse<Balance>> {
        return axios
            .get('http://localhost:8092/api/accounts/balances')
            .then((response) => { // todo этот код повторяется тут 3 раза
                return response.data;
            });
    }

    public static totalBalance(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/accounts/totalBalance')
            .then((response) => {
                return response.data;
            });
    }

    public static balancesByCurrency(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/accounts/balances/goal/byCurrency')
            .then((response) => {
                return response.data;
            });
    }

}
