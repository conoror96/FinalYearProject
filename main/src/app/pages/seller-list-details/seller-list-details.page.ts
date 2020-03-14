import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-seller-list-details',
  templateUrl: './seller-list-details.page.html',
  styleUrls: ['./seller-list-details.page.scss'],
})
export class SellerListDetailsPage implements OnInit {

  productForm: FormGroup;
  productImageBase64 = null;

  constructor(private fb: FormBuilder, private productService: ProductService, private navCtrl: NavController,
    private camera: Camera) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required],
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

}


