import axios, {AxiosResponse} from 'axios';

export interface Balance {
    accountId: number;
    accountName: string;
    balance: number;
}

export default class AccountService {

    public static equalization(accountId: number, actualBalance: number): Promise<AxiosResponse<any>> {
        return axios
            .patch('/api/accounts/' + accountId + '/equalization', {actualBalance})
            .then((response) => (response));
    }

    public static getAllAccounts(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/accounts?size=100')
            .then((response) => (response.data.content));
    }

    public static loadDebtBalances(status: string): Promise<AxiosResponse<Balance>> {
        return axios
            .get('/api/accounts/balances/debt/' + status)
            .then((response) => (response.data));
    }

    public static loadGoalBalances(): Promise<AxiosResponse<Balance>> {
        return axios
            .get('/api/accounts/balances/goal')
            .then((response) => (response.data));
    }

    public static loadBalances(): Promise<AxiosResponse<Balance>> {
        return axios
            .get('/api/accounts/balances')
            .then((response) => (response.data));
    }

    public static totalBalance(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/accounts/totalBalance')
            .then((response) => (response.data));
    }

    public static balancesByCurrency(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/accounts/balances/goal/byCurrency')
            .then((response) => (response.data));
    }

    public static get(accountId: string): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/accounts/' + accountId)
            .then((response) => {
                    return response.data;
                },
            );
    }

    public static create(account: any): Promise<AxiosResponse<any>> {
        return axios
            .post('/api/accounts', account)
            .then((response) => (response.data));
    }
}
