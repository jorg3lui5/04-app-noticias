import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient,
    
  )
  {

  }

  private ejecutarQuery<T>(query: string){
    query=apiUrl+query;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadLines(){
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=ecuador&apiKey=59385855f0304deeae76500d7764e5bd`);

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx`);
  }

  getTopHeadLinesCategoria(categoria:string){
    //return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=ecuador&category=business&apiKey=59385855f0304deeae76500d7764e5bd`);

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}`);

  }

}
