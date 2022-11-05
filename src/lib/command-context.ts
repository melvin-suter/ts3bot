import { TeamSpeak } from "ts3-nodejs-library";
import { TextMessage } from "ts3-nodejs-library/lib/types/Events";
import { Config } from "../models/config";
import { DB } from "./db";

export class CommandContext {
    constructor(public event: TextMessage, 
                public server: TeamSpeak, 
                public args: string[], 
                public config: Config, 
                public db: DB) {}

    sendMessageToAll(message: string) {
        this.server.clientList().then(clients => clients.forEach(client => client.message(message)));
    }
}