import axios, {AxiosResponse} from 'axios';

export default class PlaceService {

    public static getPlaces(): Promise<AxiosResponse<any>> {
        return axios
            .get('/api/places')
            .then((response) => (response.data));
    }


}
