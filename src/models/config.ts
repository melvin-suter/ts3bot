import * as dotenv from 'dotenv';

export class Config {
    public db:{
      apiKey:string,
      authDomain:string,
      projectId:string,
      storageBucket:string,
      messagingSenderId:string,
      appId:string,
    };

    public ts:{
      host:string,
      queryport:number,
      serverport:number,
      username:string,
      password:string,
      nickname:string,
    };

    public wallet_dailyCoins = 5;

    public excludeFromKickNickname:string[] = []

    constructor () {
        dotenv.config();

        this.db = {
            apiKey: <string>process.env.DB_API_KEY,
            authDomain: <string>process.env.DB_AUTH_DOMAIN,
            projectId: <string>process.env.DB_PROJECT_ID,
            storageBucket: <string>process.env.DB_STORAGE_BUCKET,
            messagingSenderId: <string>process.env.DB_MESSAGING_SENDER_ID,
            appId: <string>process.env.DB_APP_ID
        };

        this.ts = {
            host: <string>process.env.TS_HOST,
            queryport: Number(process.env.TS_QUERYPORT),
            serverport: Number(process.env.TS_SERVERPORT),
            username: <string>process.env.TS_USERNAME,
            password: <string>process.env.TS_PASSWORD,
            nickname: <string>process.env.TS_NICKNAME
        };
    }
}