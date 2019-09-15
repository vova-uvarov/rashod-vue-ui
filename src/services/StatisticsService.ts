import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static averageByYearTrend(categoryIds: any): Promise<AxiosResponse<any>> {
        if (categoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            categoryIds = categoryIds.map((item: any) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/averageByYearTrend', {
                params: {
                    includeCategoryIds: categoryIds,
                    operationTypes: 'CONSUMPTION',
                },
            })
            .then((response) => (response.data));
    }

    public static categoryTrend(dateFrom: any, dateTo: any, categoryIds: any): Promise<AxiosResponse<any>> {
        if (categoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            categoryIds = categoryIds.map((item: any) => (item.value)).join(',');
        }

        return axios
            .get('http://localhost:8092/api/statistics/categoryTrend', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    includeCategoryIds: categoryIds,
                },
            })
            .then((response) => (response.data));
    }

    public static sumsGroupByCategory(requestParams: any): Promise<AxiosResponse<any>> {
        if (requestParams.operationTypes) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            requestParams.operationTypes = requestParams.operationTypes.map((item: any) => (item)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/sumsByCategory', {params: requestParams})
            .then((response) => (response.data));
    }

    public static averageByDayInCurrMonth(excludeCategoryIds: any): Promise<AxiosResponse<any>> {
        if (excludeCategoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            excludeCategoryIds = excludeCategoryIds.map((item: any) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/averageByDayInCurrMonth', {
                params: {
                    excludeCategoryIds,
                },
            })
            .then((response) => (response.data));
    }

    public static monthPlan(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/statistics/plan/month')
            .then((response) => (response.data));
    }

    public static incomeConsumptionByGroup(dateFrom: any, dateTo: any, excludeCategoryIds: any, groupBy: any): Promise<AxiosResponse<any>> {
        if (excludeCategoryIds) { // todo это из за того что axios массивы передает как nam[]=1,2,3 при этом spring так не ждем
            excludeCategoryIds = excludeCategoryIds.map((item: any) => (item.value)).join(',');
        }
        return axios
            .get('http://localhost:8092/api/statistics/incomeConsumptionByGroup', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    excludeCategoryIds: excludeCategoryIds,
                    groupBy: groupBy,
                },
            })
            .then((response) => (response.data));
    }
}
