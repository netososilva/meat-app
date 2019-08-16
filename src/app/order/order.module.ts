import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component'
import { OrderComponent } from './order.component'
import { OrderItensComponent } from './order-itens/order-itens.component'
import { SharedModule } from '../shared/shared.module';
import { LeaveOrderGuard } from '../shared/guards/leave-order.guard';

const ROUTES: Routes = [
    {path:'', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    declarations: [
        OrderComponent,
        OrderItensComponent,
        DeliveryCostsComponent
    ],
    imports: [  
        RouterModule.forChild(ROUTES),
        SharedModule
    ]
})
export class OrderModule {}