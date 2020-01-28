import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Account {
  id?: string,
  name: string,
  accId: string,
  accNo: number,
  accBal: number
}
 
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accs: Observable<Account[]>;
  private accountCollection: AngularFirestoreCollection<Account>;
 
  constructor(private afs: AngularFirestore) {
    this.accountCollection = this.afs.collection<Account>('accs');
    this.accs = this.accountCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getAccounts(): Observable<Account[]> {
    return this.accs;
  }
 
  getAccount(id: string): Observable<Account> {
    return this.accountCollection.doc<Account>(id).valueChanges().pipe(
      take(1),
      map(account => {
        account.id = id;
        return account
      })
    );
  }
 
  addAccount(account: Account): Promise<DocumentReference> {
    return this.accountCollection.add(account);
  }
 
  updateAccount(account: Account): Promise<void> {
    return this.accountCollection.doc(account.id).update({ name: account.name, accId: account.accId, accNo: account.accNo, accBal: account.accBal });
  }
 
  deleteAccount(id: string): Promise<void> {
    return this.accountCollection.doc(id).delete();
  }
}