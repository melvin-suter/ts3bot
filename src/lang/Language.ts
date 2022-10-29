import { Helper } from "../lib/helper";

export class Language {
    static data:any = {};

    public static get(key:string):string{
        return this.data[key] != undefined ? Helper.randomItem(this.data[key]) : key;
    }

}