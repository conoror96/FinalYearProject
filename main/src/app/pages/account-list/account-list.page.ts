import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from 'src/app/services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {

  private accs: Observable<Account[]>;
 
  constructor(private accountService: AccountService) { }
 
  ngOnInit() {
    this.accs = this.accountService.getAccounts();
  }
} 