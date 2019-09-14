import axios, {AxiosResponse} from 'axios';

export interface Balance {
    accountId: number;
    accountName: string;
    balance: number;
}

export default class AccountService {

    public static equalization(accountId: number, actualBalance: number): Promise<AxiosResponse<object>> {
        return axios
            .patch('http://localhost:8092/api/accounts/' + accountId + '/equalization', {actualBalance})
            .then((response) => (response));
    }

    public static getAllAccounts(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/accounts?size=100')
            .then((response) => (response.data.content));
    }

    public static loadGoalBalances(): Promise<AxiosResponse<Balance>> {
        return axios
            .get('http://localhost:8092/api/accounts/balances/goal')
            .then((response) => (response.data));
    }

    public static loadBalances(): Promise<AxiosResponse<Balance>> {
        return axios
            .get('http://localhost:8092/api/accounts/balances')
            .then((response) => (response.data));
    }

    public static totalBalance(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/accounts/totalBalance')
            .then((response) => (response.data));
    }

    public static balancesByCurrency(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/accounts/balances/goal/byCurrency')
            .then((response) => (response.data));
    }

    public static get(accountId: string): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/accounts/' + accountId)
            .then((response) => {
                    return response.data;
                },
            );
    }

    public static create(account: object): Promise<AxiosResponse<object>> {
        return axios
            .post('http://localhost:8092/api/accounts', account)
            .then((response) => (response.data));
    }
}
