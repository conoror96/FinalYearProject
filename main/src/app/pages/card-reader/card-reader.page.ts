import { Component, OnInit } from '@angular/core';
import { CardIO, CardIOResponse } from '@ionic-native/card-io/ngx';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
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

constructor(
    private cardIO: CardIO,
    public afs: AngularFirestore
) { }

 ngOnInit() {
 }

 addCard() {
  this.cardIO.canScan()
      .then(
          (res: boolean) => {
              if (res) {
                  const options = {
                      requireExpiry: true,
                      requireCVV: true,
                      requirePostalCode: false,
                      requireCardholderName: true,
                      scanExpiry: true,
                      useCardIOLogo: false,
                      hideCardIOLogo: true,
                      keepApplicationTheme: true
                  };
                  
                  this.cardIO.scan(options).then((data: CardIOResponse) => {
                      alert(data.cardholderName + ' ' + data.cardNumber + ' ' + data.cardType + ' '
                          + data.expiryMonth + ' ' + data.expiryYear);

                      // Sends data to firebase
                      this.afs.collection('/UsersCardDetails').add({
                            CardholderName: data.cardholderName,
                            cardNumber: data.cardNumber,
                            cardType: data.cardType,
                            expiryMonth: data.expiryMonth,
                            expiryYear: data.expiryYear
                    })
                  });

                /*  this.afs.collection('/UsersCardDetails').add({
                    CardholderName: data.cardholderName,
                    cardNumber: data.cardNumber,
                    cardType: data.cardType,
                    expiryMonth: data.expiryMonth,
                    expiryYear: data.expiryYear
                  })*/
              }
          }
      );
    }
  
}
