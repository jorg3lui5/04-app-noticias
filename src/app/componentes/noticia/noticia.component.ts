import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  
  constructor(
    private iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
    //abre correctamenrte dentro de la app como debe de ser. Si quiero que aparezca la barra de navegacion, cambiar location:yes
    //this.iab.create(this.noticia.url,'_blank',{location: 'no'});
  }
  async lanzarMenu(){
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          ).then(function() {
            //despues de compartir:
            console.log('Successful share'); // Aquí puedes cerrar el modal. 
            //aqui se puede realizar acciones
           
          }).catch((err) => {
            //en caso de aLGUN ERROR AL COMPARTIR
          });
        }
      }, {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('favorito');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
