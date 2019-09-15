import axios, {AxiosResponse} from 'axios';

export default class CategoryService {

    public static getAllCategories(): Promise<AxiosResponse<any>> {
        return axios
            .get('http://localhost:8092/api/categories?size=10000')
            .then((response) => (response.data.content));
    }

    public static delete(categoryId: string): Promise<AxiosResponse<any>> {
        return axios
            .delete('http://localhost:8092/api/categories/' + categoryId);
    }

    public static save(category: any): Promise<AxiosResponse<any>> {
        return axios
            .post('http://localhost:8092/api/categories/', category);
    }
}
