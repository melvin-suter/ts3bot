import { QueryProtocol, TeamSpeak } from "ts3-nodejs-library";
import 'quoted-string-space-split';
import 'eventemitter3';
import { splitSpacesExcludeQuotes } from "quoted-string-space-split";
import { EventEmitter } from "eventemitter3";
import { TextMessage } from "ts3-nodejs-library/lib/types/Events";

export interface TS3Params {
    host:string,
    protocol?:TeamSpeak.QueryProtocol,  
    queryport?:number,
    serverport?:number,
    username:string,
    password:string,
    nickname:string
}

export class TS3Bot extends EventEmitter {
    public teamspeak?:TeamSpeak;

    private defaultParams:{protocol:TeamSpeak.QueryProtocol,queryport:number,serverport:number} = {
        protocol: QueryProtocol.RAW,
        queryport: 10011,
        serverport: 9987
    };


    constructor(){
        super();
    }

    public async startUp(params:TS3Params){
        let usableParams = {...this.defaultParams,...params};

        await TeamSpeak.connect(usableParams).then(async teamspeak => {
            this.teamspeak = teamspeak;
        });
        

        setInterval(() => {
            this.teamspeak!.complainList().then( data => {
                data.forEach(complain => {
                    this.emit('complainadd',complain);
                    this.teamspeak!.complainDel(complain.tcldbid,complain.fcldbid);
                });
            }).catch(err => {
                // do nothing
            });
        }, 2000);

        this.teamspeak?.setMaxListeners(100);
    }


    public sendMessageToAll(message:string){
        this.teamspeak!.clientList().then( clients => {
            clients.forEach( client => {
                client.message(message);
            });
        });
    }

    public async registerCommand(commands:string[], handler:Function){
        this.teamspeak!.on("textmessage", (ev:TextMessage) => {
            let command = ev.msg.trim().split(" ")[0].toLowerCase();
            let args = splitSpacesExcludeQuotes( ev.msg.trimRight().split(" ").slice(1).join(" ") );

            if( commands.indexOf(command) >= 0){
                handler(ev,args);
            }
        });
    }

}
