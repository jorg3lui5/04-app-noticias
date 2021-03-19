import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  noticias: Article[]= [];

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias: string[] = ['business','entertainment','general','health','science','sports','technology'];
  constructor(private _noticiasService: NoticiasService)
  {
    
  }

  ngOnInit(){
    this.segment.value=this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    console.log(event.detail.value)
    this.noticias=[];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string){
    this._noticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp=>{
      console.log('noticias', resp);
      this.noticias.push(...resp.articles);
    });
  }
}
