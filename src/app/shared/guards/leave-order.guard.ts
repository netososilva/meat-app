import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router'

import { OrderComponent } from '../../order/order.component'

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    canDeactivate(orderComponent: OrderComponent, 
                  activatedRoute: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot) : boolean {
        if (orderComponent.isOrderCompleted()) return true

        return window.confirm('Deseja desistir da compra?')
    }
}