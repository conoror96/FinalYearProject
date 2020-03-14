import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.page.html',
  styleUrls: ['./buyer-list.page.scss'],
})
export class BuyerListPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  // sign out function
  signOut() {
    this.auth.signOut();
  }

}