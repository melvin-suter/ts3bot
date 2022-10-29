import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { UserData } from '../models/user-data';


export class DB {
    private app:FirebaseApp;
    private db:Firestore;

    constructor(params:any){
        this.app = initializeApp(params);
        this.db = getFirestore(this.app);
    }    

    async getUserData(clientID:string):Promise<UserData> {
        let userDocument:UserData = <UserData>(await getDoc(doc(this.db,'users', clientID))).data();
        if(userDocument == undefined){
            userDocument = {coin: 0, lastDailyCoin: (new Timestamp(0,0))};
            this.setUserData(clientID, userDocument)
        }
        return userDocument;
    }

    async setUserData(clientID:string, data:UserData){
        setDoc(doc(this.db,'users', clientID),data);
    }

}