import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../common/common.service';
import { ACCOUNT } from '../../constant/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private commonService:CommonService,private _route:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.commonService.getUserData.id,"Guardssss!");

      if(this.commonService.getUserData.id){
      console.log(this.commonService.getUserData.id,"true");
        return true;
      }
      return this._route.navigate([ACCOUNT.fullUrl]);
  }

}
