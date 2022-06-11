import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];

  // UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges.pipe(
      tap(() => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      }),
      switchMap((region) => this.paisesService.getPaisesByRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    // Cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((codigo) => this.paisesService.getPaisByCode(codigo)),
        switchMap(pais => this.paisesService.getPaisesByBorders(pais?.borders!))
      )
      .subscribe((paises) => {
        // console.log(paises)
        this.fronteras = paises
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
