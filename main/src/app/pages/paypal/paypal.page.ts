import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


declare var window: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {

  

  ngOnInit() {
  }



  paymentAmount: string = '1.50';
  currency: string = 'USD';
  currencyIcon: string = '$';
  constructor() {
    this.renderButton();
  }

  renderButton() {
    window.paypal.Button.render({

      env: 'sandbox', // sandbox | production
      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
          sandbox: 'Aa-5mEWGb3ZR-tyQ_fNNa8J3aBTO1p-7SprFzNFRoStAOAJD3bPWnfV32jwdYQF3GbIH51xYEGPLhEGo',
          // production: '<insert production client id>'
      },
      style: {
        size: 'large',
        color: 'gold',
        shape: 'rect',
       },
      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,
      // payment() is called when the button is clicked
      payment: function(data, actions) {
        // Make a call to the REST api to create the payment
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '155', currency: 'USD' }
                    }
                ]
            }
        });

      },
    
      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {
          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function(details) {
            console.log(details)
              window.alert('Payment Complete!');
          });
      }

  }, '#paypal');

  }
}