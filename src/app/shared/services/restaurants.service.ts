import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from '../../restaurants/restaurant/restaurant.model';
import { MEAT_API } from '../../app.api'
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {
    
    constructor(private http: HttpClient) {

    }

    listRestaurants(search?: string): Observable<Array<Restaurant>> {
        let params: HttpParams = undefined

        if (search) {
            params = new HttpParams()
                .set('q', search)
        }

        return this.http.get<Array<Restaurant>>(`${MEAT_API}/restaurants`, { params: params})
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<Array<MenuItem>> {
        return this.http.get<Array<MenuItem>>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}