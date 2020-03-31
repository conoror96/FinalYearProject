import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Ndef, NFC} from '@ionic-native/nfc/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-seller-list-details',
  templateUrl: './seller-list-details.page.html',
  styleUrls: ['./seller-list-details.page.scss'],
})
export class SellerListDetailsPage implements OnInit {

  productForm: FormGroup;
  productImageBase64 = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private navCtrl: NavController,
    private camera: Camera,
    private nfc: NFC, private ndef: Ndef, private alertController: AlertController) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required],
      category: ['', Validators.required],
      tagid: ['', Validators.required],
      img: ''
    })
  }

  

  createProduct() {
    this.productService.addProduct(this.productForm.value).then(res => {
      this.navCtrl.pop();
    });
  }

  selectImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: 0,
      mediaType: 0,
      sourceType: 1,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(data => {
      console.log(data);
      this.productImageBase64 = 'data:image/jpeg;base64,' + data;
      this.productForm.patchValue({ img: data })
    });
  }

  // Read tag
  readNFC() {
    this.nfc.addNdefListener(() => {
      this.presentAlert('ok');
    }, (err) => {
      this.presentAlert('ko' + err);
    }).subscribe((event) => {
      console.log(event);
      console.log(JSON.stringify(event));

      //this.presentAlert(this.nfc.bytesToHexString(event.tag.id));
      this.productForm.patchValue({ tagid: this.nfc.bytesToHexString(event.tag.id)});
    });
  }

  // alert message for tag
  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'attenzione',
      message: mess,
      buttons: ['OK']
    });

    await alert.present();
  }

}


