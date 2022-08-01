import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RickandmortyapiService {

  baseUrl = environment.baseUrl;
  next = ''
  loading = false;

  constructor(private http: HttpClient) {
    console.log('Rick and morty api service ready!')
  }

  getCharacters(reset? : boolean) {
    this.next = reset ? '' : this.next;
    console.log('loading value in getCharacters:')
    console.log(this.loading)
    console.log('Next value in getCharacters:')
    console.log(this.next)
    if(this.loading || this.next === null){
      return;
    }
    this.loading = true;
    const url = `${this.baseUrl}/character`;
    return this.http.get(this.next === '' ? url : this.next).pipe(
      // this happens when this observable emits some result
      // in this case is only used to increment in 1 the page
      catchError(err => this.handleError(err)),
      tap( (data: any) => {
        this.loading = false;
        this.next = data.info.next;
      }),
    );
  }

  filterCharactersByName(name: string) {
    console.log('loading value in filterCharactersByName:')
    console.log(this.loading)
    this.next = '';
    if(this.loading){
      return;
    }
    this.loading = true;
    const url = `${this.baseUrl}/character/?name=${name}`;
    console.log('log url for get in filterCharactersByName:')
    console.log(this.next === '' ? url : this.next)
    return this.http.get(this.next === '' ? url : this.next).pipe(
      catchError(err => this.handleError(err)),
      tap( (data: any) => {
        this.loading = false;
        this.next = data.info.next;
        console.log('loading value in filterCharactersByName tap:')
        console.log(this.loading)
      }),
    );
  }

  handleError(error): Observable<Response> {
    console.log(error);
    if(error){
      alert(error.error.error)
    }
    console.log('loading value in handleError:')
    console.log(this.loading)
    return throwError(error);
  }
}
