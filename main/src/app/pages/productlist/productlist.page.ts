import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from 'src/app/services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  private accs: Observable<Account[]>;
 
  constructor(private accountService: AccountService) { }
 
  ngOnInit() {
    this.accs = this.accountService.getAccounts();
  }

}
 