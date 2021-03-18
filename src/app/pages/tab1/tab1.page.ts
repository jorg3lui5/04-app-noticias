import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[]= [];

  constructor(
    private _noticiasService: NoticiasService
  )
  {

  }

  ngOnInit(){
    this._noticiasService.getTopHeadLines()
    .subscribe(resp=>{
      console.log('noticias', resp.articles);
      //this.noticias=resp.articles;
      //se hace push para que no reemplace las noticias existentes
      this.noticias.push(...resp.articles);
    });
  }

}
