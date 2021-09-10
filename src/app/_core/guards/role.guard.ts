import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import { ERoles } from '../models/Enum/E-roles';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.tokenService.getInfos().userRole !== ERoles.Admin){
       this.router.navigateByUrl('/application/dashboard');
      
    }
      return true
    }
}
