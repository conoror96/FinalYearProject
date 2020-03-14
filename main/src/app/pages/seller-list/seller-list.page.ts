import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.page.html',
  styleUrls: ['./seller-list.page.scss'],
})
export class SellerListPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  // sign out function
  signOut() {
    this.auth.signOut();
  }
}
