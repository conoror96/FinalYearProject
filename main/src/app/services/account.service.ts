import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Account {
  id?: string,
  item: string,
  itemID: string,
  colour: string,
  price: number,
  image: String,
  stock: number
}
 
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accs: Observable<Account[]>;
  private accountCollection: AngularFirestoreCollection<Account>;
 
/* 
firestore.collection("users").doc(uid).set({
    name: "Sparky"
})
*/

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
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
    return this.accountCollection.doc(account.id).update({ item: account.item, itemID: account.itemID, colour: account.colour,
       price: account.price, image: account.image, stock: account.stock });
  }
 
  deleteAccount(id: string): Promise<void> {
    return this.accountCollection.doc(id).delete();
  }

  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<AccountService[]>;


  private imageCollection: AngularFirestoreCollection<AccountService>;
}