import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static incomeConsumptionByMonthLastYear(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/statistics/incomeConsumptionByMonthLastYear')
            .then((response) => (response.data));
    }

    public static incomeConsumptionByMonthLastPrevious(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/statistics/incomeConsumptionByMonthPrevious')
            .then((response) => (response.data));
    }



}
