import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient,
    
  )
  {

  }

  getTopHeadLines(){
    return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/everything?q=ecuador&apiKey=59385855f0304deeae76500d7764e5bd`);
  }
}
