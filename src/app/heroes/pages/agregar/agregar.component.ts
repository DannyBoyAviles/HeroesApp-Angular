import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
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
      .subscribe( heroe => {
        console.log('Actualizando Heroe', heroe)
        this.mostrarSnakbar('Registro Actualizado');
      })
    }else{
      //guardar
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        // console.log('Respuesta', resp);  
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnakbar('Registro creado');
      } )
    }


  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width:'300px',
      data: this.heroe //envio el data
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( heroe => {
              this.router.navigate(['/heroes']);
          });   
        }        
      }
    )     
  }

  mostrarSnakbar(mensaje:string){
    this.snackBar.open(mensaje, 'oK!',{
      duration:2500
    })
  }

}
