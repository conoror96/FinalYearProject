import { Component, OnInit } from '@angular/core';
import { CardIO } from '@ionic-native/card-io/ngx';
/*
https://ionicframework.com/docs/native/card-io
https://github.com/card-io/card.io-Cordova-Plugin
*/
@Component({
  selector: 'app-card-reader',
  templateUrl: './card-reader.page.html',
  styleUrls: ['./card-reader.page.scss'],
})
export class CardReaderPage implements OnInit {

 /* constructor(private cardIO: CardIO) { 
    
    /*this.cardIO.canScan()
    .then(
      (res: boolean) => {
        if(res){
          let options = {
            requireExpiry: true,
            requireCVV: false,
            requirePostalCode: false
          };
          this.cardIO.scan(options);
        }
      }
    );}

  

  ngOnInit() {
  }
  
  */

 constructor() { }

 ngOnInit() {
 }


  
}
