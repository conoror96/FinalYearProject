import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map, flatMap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})


export class ProductService {
 

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, private storage: AngularFireStorage,
    private functions: AngularFireFunctions) { }

   


  getAllProducts() {
    return this.db.collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getTagID(){
   
    
    this.db.firestore.collection('products')
    .where('tagid','==', "049a1092285e80")
    .get()
    .then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
              const id = doc.id;
             
                  console.log("debug 1  ",doc.id); // id of doc
                  console.log("debug 2  ", doc.data()); // data of doc

                  console.log("hello", id);
                  return {id};
                 
            })
     });
  }

  
  
  
  

  getOneProduct(id) {
    return this.db.doc(`products/${id}`).valueChanges();
    
  }
  
  
  addProduct(product) {
    product.creator = this.afAuth.auth.currentUser.uid;
    const imageData = product.img;
    delete product.image;
    

    let documentId = null;
    let storageRef: AngularFireStorageReference = null;

    return this.db.collection('products').add(product).then(ref => {
      console.log('ref: ', ref);
      documentId = ref.id;
      storageRef = this.storage.ref(`products/${documentId}`);
      const uploadTask = storageRef.putString(imageData, 'base64', { contentType: 'image/png'});
      return uploadTask;
    }).then(task => {
      console.log('task: ', task);
      return storageRef.getDownloadURL().toPromise();
    }).then(imageUrl => {
      console.log('got url: ', imageUrl);
      return this.db.doc(`products/${documentId}`).update({ img: imageUrl });
    });
  }

  getSellerProducts() {
    const id = this.afAuth.auth.currentUser.uid;

    return this.db.collection('products', ref => ref.where('creator', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  deleteProduct(id) {
    const teststore = this.db.collection('products', ref => ref.where('tagid', '==', "049a1092285e80"));
    console.log("test",teststore);
    this.db.doc(`products/${id}`).delete();
    this.storage.ref(`products/${id}`).delete().subscribe(res => {});
  }

  // payment intent
  startPaymentIntent(amount, items) {
    const callable = this.functions.httpsCallable('startPaymentIntent');
    const obs = callable({ userId: this.afAuth.auth.currentUser.uid, amount, items});
    return obs;
  }

  getCustomerOrders() {
    const callable = this.functions.httpsCallable('getCustomerOrders');
    const obs = callable({ userId: this.afAuth.auth.currentUser.uid });
    return obs;
  }

  getOrderData(paymentIntentId) {
    return this.db.doc(`orders/${paymentIntentId}`).valueChanges();
  }

}
