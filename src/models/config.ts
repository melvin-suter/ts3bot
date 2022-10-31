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

        this.db.apiKey = <string>process.env.DB_API_KEY;
        this.db.authDomain = <string>process.env.DB_AUTH_DOMAIN;
        this.db.projectId = <string>process.env.DB_PROJECT_ID;
        this.db.storageBucket = <string>process.env.DB_STORAGE_BUCKET;
        this.db.messagingSenderId = <string>process.env.DB_MESSAGING_SENDER_ID;
        this.db.appId = <string>process.env.DB_APP_ID;

        this.ts.host = <string>process.env.TS_HOST;
        this.ts.queryport = Number(process.env.TS_QUERYPORT);
        this.ts.serverport = Number(process.env.TS_SERVERPORT);
        this.ts.username = <string>process.env.TS_USERNAME;
        this.ts.password = <string>process.env.TS_PASSWORD;
        this.ts.nickname = <string>process.env.TS_NICKNAME;
    }
}