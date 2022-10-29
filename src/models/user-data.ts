import { Timestamp } from "firebase/firestore/lite";

export interface UserData {
    coin:number;
    lastDailyCoin:Timestamp;
}