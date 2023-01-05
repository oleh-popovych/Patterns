// @ts-ignore
import admin from 'firebase-admin';

class Firestore {
    private static instance;

    public static getInstance() {
        if (!Firestore.instance) Firestore.instance =  admin.initializeApp().firestore();

        return Firestore.instance;
    }
}

async function someLogic () {
    const firestore = Firestore.getInstance();

    const posts = await firestore.collection('post').get()

    //code
}
