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
    if(this.loading || this.next === null){
      return;
    }
    this.loading = true;
    const url = `${this.baseUrl}/character`;
    this.next = reset ? '' : this.next;
    return this.http.get(this.next === '' ? url : this.next).pipe(
      // this happens when this observable emits some result
      // in this case is only used to increment in 1 the page
      catchError(err => this.handleError(err)),
      tap( (data: any) => {
        this.loading = false;
        this.next = data.info.next;
      })
    );
  }

  filterCharactersByName(name: string) {
    this.next = '';
    if(this.loading){
      return;
    }
    this.loading = true;
    const url = `${this.baseUrl}/character/?name=${name}`;
    return this.http.get(this.next === '' ? url : this.next).pipe(
      catchError(err => this.handleError(err)),
      tap( (data: any) => {
        this.loading = false;
        this.next = data.info.next;
      })
    );
  }

  handleError(error): Observable<Response> {
    console.log(error);
    if(error){
      alert(error.error.error)
    }
    return throwError(error);
  }
}
