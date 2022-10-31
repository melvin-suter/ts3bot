import { TextMessage } from "ts3-nodejs-library/lib/types/Events";

export interface CommandHandler {
    handle(ev : TextMessage, args: any) : Promise<void>;
    get aliases() : string[];
    get name(): string;
}