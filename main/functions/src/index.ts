import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
 
admin.initializeApp();
 
const secret = functions.config().stripe.testkey;
const stripe = new Stripe(secret, {
  apiVersion: '2020-03-02',
  typescript: true
});
 
export const createStripeCustomer = functions.auth.user().onCreate(async (snap, context) => {
  console.log('snap: ', snap);
  const customer = await stripe.customers.create({
    email: snap.email
  });
 
  const batch = admin.firestore().batch();
 
  const userRef = admin.firestore().collection('users').doc(snap.uid);
  const cusRef = admin.firestore().collection('customers').doc(customer.id);
 
  batch.update(userRef, { customerId: customer.id });
  batch.set(cusRef, { user: snap.uid });
 
  return batch.commit();
}); 

export const startPaymentIntent = functions.https.onCall(
  async(data, context) => {
    console.log('called: ', data);
    const user = await admin.firestore().collection('users').doc(data.userId).get();
    const userData = user.data();
    console.log('the user: ', userData);
    
    if (userData) {
      const intent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: 'USD',
        customer: userData.customerId
      });

      await admin.firestore().collection('orders').doc(intent.id).set({
        items: data.items,
        status: 'Waiting for payment',
        amount: data.amount / 100,
        customerId: userData.customerId,
        userId: data.userId
      });

      return intent;
    } else {
      return false;
    }
  }
);