import { QueryProtocol, TeamSpeak } from "ts3-nodejs-library";
import { EventEmitter } from "eventemitter3";
import { TextMessage } from "ts3-nodejs-library/lib/types/Events";
import { CommandHandler } from "./command-handler";
import { CommandRouter } from "./command-router";
import { Config } from "../models/config";
import { DB } from "./db";

export interface TS3Params {
    host: string,
    protocol?: TeamSpeak.QueryProtocol,  
    queryport?: number,
    serverport?: number,
    username: string,
    password: string,
    nickname: string
}

export class TS3Bot extends EventEmitter {

    public teamspeak!: TeamSpeak;

    private defaultParams = {
        protocol: QueryProtocol.RAW,
        queryport: 10011,
        serverport: 9987
    };

    private commandRouter!: CommandRouter;

    constructor(private config: Config, private db: DB) {
        super();
    }

    public async startUp(params: TS3Params) {
        let usableParams = {...this.defaultParams,...params};

        this.teamspeak = await TeamSpeak.connect(usableParams);
        
        setInterval(() => {
            this.teamspeak.complainList().then( data => {
                data.forEach(complain => {
                    this.emit('complainadd', complain);
                    this.teamspeak!.complainDel(complain.tcldbid,complain.fcldbid);
                });
            }).catch(err => {
                // do nothing
            });
        }, 2000);

        this.teamspeak.setMaxListeners(100);

        this.commandRouter = new CommandRouter(this.config, this.db, this.teamspeak);
        this.teamspeak.on('textmessage', (ev: TextMessage) => this.commandRouter.handle(ev));
    }

    public sendMessageToAll(message: string) {
        this.teamspeak!.clientList().then(clients => clients.forEach(client => client.message(message)));
    }

    registerCommands(...handlers: CommandHandler[]) {
        this.commandRouter.register(...handlers);
    }
}
