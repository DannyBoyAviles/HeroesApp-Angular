import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if (this.authService.auth.id) {
        return true
      }      
      console.log('Bolqueado por el AuthGuard -  canActivate');
      
      return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      // console.log('canLoad', false);
      // console.log(route);
      // console.log(segments);
    if (this.authService.auth.id) {
      return true
    }      
    console.log('Bolqueado por el AuthGuard - canLoad');
    
    return false;

  }
}
