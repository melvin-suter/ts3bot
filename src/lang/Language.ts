import { Helper } from "../lib/helper";

export class Language {
    static data: any = {};

    public static get(key: string): string {
        return this.data[key] ? Helper.randomItem(this.data[key]) : key;
    }

}