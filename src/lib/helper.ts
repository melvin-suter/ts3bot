
export class Helper {

    public static randomItem(array: any) : any {
        return array[Math.floor(Math.random() * array.length)];
    }

    public static delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}