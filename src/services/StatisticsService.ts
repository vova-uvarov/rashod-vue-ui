import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static averageByYearTrend(categoryIds): Promise<AxiosResponse<object>> {
        if (categoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            categoryIds = categoryIds.map((item) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/averageByYearTrend', {
                params: {
                    includeCategoryIds: categoryIds,
                }
            })
            .then((response) => (response.data));
    }
    public static categoryTrend(dateFrom, dateTo, categoryIds): Promise<AxiosResponse<object>> {
        if (categoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            categoryIds = categoryIds.map((item) => (item.value)).join(',');
        }

        return axios
            .get('http://localhost:8092/api/statistics/categoryTrend', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    includeCategoryIds: categoryIds,
                }
            })
            .then((response) => (response.data));
    }

    public static sumsGroupByCategory(requestParams: object): Promise<AxiosResponse<object>> {
        if (requestParams.operationTypes) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.operationTypes = requestParams.operationTypes.map((item) => (item)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/sumsByCategory',{params: requestParams})
            .then((response) => (response.data));
    }

    public static averageByDayInCurrMonth(excludeCategoryIds): Promise<AxiosResponse<object>> {
        if (excludeCategoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            excludeCategoryIds = excludeCategoryIds.map((item) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/averageByDayInCurrMonth', {
                params: {
                    excludeCategoryIds: excludeCategoryIds,
                },
            })
            .then((response) => (response.data));
    }

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
