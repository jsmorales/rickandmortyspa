import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RickandmortyapiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    console.log('Rick and morty api service ready!')
  }

  getCharacters() {
    const url = `${this.baseUrl}/character`;
    return this.http.get(url);
  }
}
