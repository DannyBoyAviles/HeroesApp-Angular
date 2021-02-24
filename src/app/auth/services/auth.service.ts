import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';//(of) sirve para crear observables en base al argumento que le ponemos
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth}
  }

  constructor(private http:HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{

    if (!localStorage.getItem('token')) {
      return of(false);
      // return false;
    }
    // return of(true);
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth => {
        // console.log('map', auth);
        this._auth = auth;
        return true;        
      }) //map transforma lo recibido a otro nuevo valor
    )

  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              tap(auth => this._auth = auth),
              tap(auth => localStorage.setItem('token', auth.id))
            )
  }

  logout(){
    this._auth = undefined;
  }
}
