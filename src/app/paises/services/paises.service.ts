import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesByRegion(region: string): Observable<PaisSmall[]> {
    const url = `${this.apiUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisByCode(codigo: string): Observable<PaisSmall | null> {
    if(!codigo) return of(null);
    
    const url = `${this.apiUrl}/alpha/${codigo}?fields=cca3,name,borders`;
    return this.http.get<PaisSmall>(url);
  }

  

  getPaisByCode2(codigo: string): Observable<PaisSmall> {    
    const url = `${this.apiUrl}/alpha/${codigo}?fields=cca3,name,borders`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesByBorders(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) return of([]);

    const peticiones: Observable<PaisSmall>[] = []

    borders.forEach((border) => {
      const peticion = this.getPaisByCode2(border);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }
}
