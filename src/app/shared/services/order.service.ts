import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { ShoppingCartService } from './shopping-cart.service'
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../order/order.model';
import { MEAT_API } from '../../app.api'; 

@Injectable()
export class OrderService {
    constructor(private shoppingCartService: ShoppingCartService,
                private http: HttpClient) {}

    itemsValue(): number {
        return this.shoppingCartService.total()
    }

    cartItems(): Array<CartItem> {
        return this.shoppingCartService.items
    }

    clear() {
        this.shoppingCartService.clear()
    }

    increaseQuantity(item: CartItem) {
        this.shoppingCartService.increaseQuantity(item)
    }

    decreaseQuantity(item: CartItem) {
        this.shoppingCartService.decreaseQuantity(item)
    }

    remove(item: CartItem) {
        this.shoppingCartService.removeItem(item)
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                        .map((order) => order.id)
    }
}