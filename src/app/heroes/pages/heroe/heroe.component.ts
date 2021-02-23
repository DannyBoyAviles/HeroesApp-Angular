import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';//importar para usar propiedades del router
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from "rxjs/operators"; //operador que permite recivir un observable y regresar otro observable

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(
    private activatedRouter:  ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      // switchMap( (param) => this.heroesService.getHeroePorId(param.id)),
      switchMap( ({id}) => this.heroesService.getHeroePorId(id)),
      tap(console.log) //el tap importado solo imprime el observable recibido
     )
    .subscribe(
      heroe=>this.heroe = heroe //el heroe que recibo como argumento
      // ({id}) =>
      // console.log(id)
      // this.heroe = 
    )
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
