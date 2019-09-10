import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static incomeConsumptionByMonth(dateFrom, dateTo, excludeCategoryIds): Promise<AxiosResponse<object>> {
        if (excludeCategoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            excludeCategoryIds = excludeCategoryIds.map((item) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/incomeConsumptionByMonth', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    excludeCategoryIds: excludeCategoryIds
                }
            })
            .then((response) => (response.data));
    }


}
