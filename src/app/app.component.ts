import { Component, OnInit } from '@angular/core';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent{

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navigationBar: NavigationBar,

  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(()=>{
      this.statusBar.styleLightContent();
      //cambia el color de la barra donde aparece la hora y el icono de bateria del celu
      this.statusBar.backgroundColorByHexString('#000000');
      //this.splashScreen.hide();

      //Ocultar barra de navegacion de abajo del dispositivo, donde se hace clic en regresar o mostrar las app abiertas
      // let autoHide: boolean = true;
      // this.navigationBar.setUp(autoHide);
    });
  }
}
