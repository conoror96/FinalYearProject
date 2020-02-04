import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // for displaying logged in users email
  userEmail: string;

  constructor(private navCtrl: NavController,
    private authService: AuthenticateService) { }

  ngOnInit() {
  }

  

 
}
