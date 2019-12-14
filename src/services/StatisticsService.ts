import axios, {AxiosResponse} from 'axios';

export default class StatisticsService {

    public static averageByYearTrend(categoryIds: any): Promise<AxiosResponse<any>> {
        if (categoryIds) {
            categoryIds = categoryIds.map((item: any) => (item.value));
        }
        return axios
            .get('/api/statistics/averageByYearTrend', {
                params: {
                    includeCategoryIds: categoryIds,
                    operationTypes: 'CONSUMPTION',
                },
            })
            .then((response) => (response.data));
    }

    public static categoryTrend(dateFrom: any, dateTo: any, categoryIds: any): Promise<AxiosResponse<any>> {
        if (categoryIds) {
            categoryIds = categoryIds.map((item: any) => (item.value));
        }

        return axios
            .get('/api/statistics/categoryTrend', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    includeCategoryIds: categoryIds,
                },
            })
            .then((response) => (response.data));
    }

    public static sumsGroupByCategory(requestParams: any): Promise<AxiosResponse<any>> {
        if (requestParams.operationTypes) {
            requestParams.operationTypes = requestParams.operationTypes.map((item: any) => (item)); // todo как буд-то бы это и не нужно
        }
        return axios
            .get('/api/statistics/sumsByCategory', {params: requestParams})
            .then((response) => (response.data));
    }

    public static averageByDayInCurrMonth(excludeCategoryIds: any): Promise<AxiosResponse<any>> {
        if (excludeCategoryIds) {
            excludeCategoryIds = excludeCategoryIds.map((item: any) => (item.value));
        }
        return axios
            .get('/api/statistics/averageByDayInCurrMonth', {
                params: {
                    excludeCategoryIds,
                },
            })
            .then((response) => (response.data));
    }

    public static monthPlan(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/statistics/plan/month')
            .then((response) => (response.data));
    }

    public static incomeConsumptionByGroup(dateFrom: any,
                                           dateTo: any,
                                           excludeCategoryIds: any,
                                           groupBy: any): Promise<AxiosResponse<any>> {
        if (excludeCategoryIds) {
            excludeCategoryIds = excludeCategoryIds.map((item: any) => (item.value));
        }
        return axios
            .get('/api/statistics/incomeConsumptionByGroup', {
                params: {
                    from: dateFrom,
                    to: dateTo,
                    excludeCategoryIds,
                    groupBy,
                },
            })
            .then((response) => (response.data));
    }
}
