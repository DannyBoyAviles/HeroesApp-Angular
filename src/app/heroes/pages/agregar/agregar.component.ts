import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width:100%;
    border-radius:5px;
  }
  `]
})
export class AgregarComponent implements OnInit {

  publushers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe :Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {

    //validando con la ruta
    console.log(this.router.url.includes('editar') );
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId(id) )
    )
    .subscribe( heroe =>  this.heroe = heroe ); //heroe es el retorno del observable

  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => console.log('Actualizando Heroe', heroe)
      )
    }else{
      //guardar
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        // console.log('Respuesta', resp);  
        this.router.navigate(['/heroes/editar', heroe.id])
      } )
    }


  }

}
