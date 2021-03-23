import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  //noticias: Article[]= [];
  noticias: Article[]= [{
    source: {id: 'id',name: 'nom'},
    author: 'AAA',
    title: 'NUEVO',
    description: 'ABC',
    url: 'https://www.typescriptlang.org/docs/handbook/interfaces.html',
    urlToImage: null,
    publishedAt: 'AAAA',
    content: 'dbdbdbd',
  }];
  constructor(
    private _noticiasService: NoticiasService
  )
  {

  }

  ngOnInit(){
    //this.cargarNoticias();
  }

  loadData(event){
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this._noticiasService.getTopHeadLines()
    .subscribe(resp=>{
      console.log('noticias', resp);
      if(event && resp.articles.length===0){
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      //this.noticias=resp.articles;
      //se hace push para que no reemplace las noticias existentes
      this.noticias.push(...resp.articles);
      if(event) {
        event.target.complete();
      }
    });
  }
}
