import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { RestaurantsService } from './services/restaurants.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './services/notification.service';
import { LoginService } from './services/login.service';
import { LoggedInGuard } from 'app/shared/guards/loggedin.guard';
import { LeaveOrderGuard } from 'app/shared/guards/leave-order.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LeaveOrderGuard,
                LoggedInGuard,
                LoginService,
                NotificationService,
                OrderService,
                RestaurantsService,
                ShoppingCartService,
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ]
        }
    }
}