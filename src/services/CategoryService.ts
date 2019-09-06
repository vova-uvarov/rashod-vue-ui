import axios, {AxiosResponse} from 'axios';

export default class CategoryService {

    public static getAllCategories(): Promise<AxiosResponse<Object>> {
        return axios
            .get('http://localhost:8092/api/categories?size=10000')
            .then((response) => (response.data.content));
    }
}
