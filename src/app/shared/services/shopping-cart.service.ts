import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model'
import { MenuItem } from '../../restaurant-detail/menu-item/menu-item.model';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class ShoppingCartService {
    items: Array<CartItem> = []

    constructor(private notificationService: NotificationService) {}

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        var foundedItem = this.items.find((menuItem) => menuItem.menuItem.id === item.id)

        if (foundedItem)
            this.increaseQuantity(foundedItem)
        else 
            this.items.push(new CartItem(item))

        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    increaseQuantity(item: CartItem) {
        item.quantity += 1
    }

    decreaseQuantity(item: CartItem) {
        item.quantity -= 1

        if (item.quantity === 0) this.removeItem(item)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((previous, current) => previous + current, 0);
    }
}