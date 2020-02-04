import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, Account } from 'src/app/services/account.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {

  idea: Account = {
    name: '',
    accId: '',
    accNo: 0,
    accBal: 0,
  };
  
  constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService,
    private toastCtrl: ToastController, private router: Router) { }
 
  ngOnInit() { }
 
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.accountService.getAccount(id).subscribe(idea => {
        this.idea = idea;
      });
    }
  }
 
  addAccount() {
    this.accountService.addAccount(this.idea).then(() => {
      this.router.navigateByUrl('/account-list');
      this.showToast('Idea added');
    }, err => {
      this.showToast('Access denied');
    });
  }
 
  deleteAccount() {
    this.accountService.deleteAccount(this.idea.id).then(() => {
      this.router.navigateByUrl('/account-list');
      this.showToast('Idea deleted');
    }, err => {
      this.showToast('Access denied');
    });
  }
 
  updateAccount() {
    this.accountService.updateAccount(this.idea).then(() => {
      this.router.navigateByUrl('/account-list');
      this.showToast('Idea updated');
    }, err => {
      this.showToast('Access denied');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}