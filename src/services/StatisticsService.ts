import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static monthPlan(): Promise<AxiosResponse<object>> {
        return axios
            .get('http://localhost:8092/api/statistics/plan/month')
            .then((response) => (response.data));
    }

    public static incomeConsumptionByGroup(dateFrom, dateTo, excludeCategoryIds, groupBy): Promise<AxiosResponse<object>> {
        if (excludeCategoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            excludeCategoryIds = excludeCategoryIds.map((item) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/incomeConsumptionByGroup', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    excludeCategoryIds: excludeCategoryIds,
                    groupBy: groupBy,
                }
            })
            .then((response) => (response.data));
    }


}
