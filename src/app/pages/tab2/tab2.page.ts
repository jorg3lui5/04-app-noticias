import { Component, ViewChild, OnInit } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSegment } from '@ionic/angular';
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
  @ViewChild(IonInfiniteScroll, { static: false }) infinitiScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;


  categorias: string[] = ['business','entertainment','general','health','science','sports','technology'];
  constructor(private _noticiasService: NoticiasService)
  {
    
  }

  ngOnInit(){
    this.segment.value=this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event){
    this.infinitiScroll.disabled=false;
    console.log(event.detail.value)
    this.noticias=[];
    this.cargarNoticias(event.detail.value);
    this.content.scrollToTop();
  }

  cargarNoticias(categoria: string, event?){
    this._noticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp=>{
      console.log('noticias', resp);

      if(event && resp.articles.length===0){
        event.target.disabled=true;
        event.target.complete();
        return;
      }

      this.noticias.push(...resp.articles);

      if(event) {
        event.target.complete();
        return;
      }
    });
  }

  loadData(event){
    console.log(event);
    this.cargarNoticias(this.segment.value,event);
  }
}
