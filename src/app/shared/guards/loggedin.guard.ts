import { ActivatedRouteSnapshot, CanLoad, CanActivate, Route, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'app/shared/services/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate, CanLoad {
    
    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        
        if (!loggedIn)
            this.loginService.handleLogin(`/${path}`)

        return loggedIn
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) : boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}