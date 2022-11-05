import { splitSpacesExcludeQuotes } from "quoted-string-space-split";
import { TeamSpeak, TeamSpeakChannel } from "ts3-nodejs-library";
import { TextMessage } from "ts3-nodejs-library/lib/types/Events";
import { Config } from "../models/config";
import { CommandContext } from "./command-context";
import { CommandHandler } from "./command-handler";
import { DB } from "./db";

export class CommandRouter {
    
    private _handlers = new Map<string, CommandHandler>();
    private _aliases = new Map<string, string>();
    
    constructor(private config: Config, private db: DB, private teamspeak: TeamSpeak, ...handlers: CommandHandler[]) {
        this.register(...handlers);
    }

    register(...handlers: CommandHandler[]) : void {
        handlers.forEach(handler => {
            const name = handler.name;
            const aliases = handler.aliases;

            if (this._handlers.has(name)){
                throw new Error('Duplicate command ' + name);
            }

            aliases.forEach(alias => {
                if (this._aliases.has(alias)) {
                    throw new Error('Duplicate alias ' + name);
                }
            });

            this._handlers = this._handlers.set(name.toLowerCase(), handler);
            aliases.forEach(alias => this._aliases = this._aliases.set(alias.toLowerCase(), name));
        });
    }

    async handle(event: TextMessage) {
        const parts = event.msg.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = splitSpacesExcludeQuotes(parts.slice(1).join(' '));

        let handler = this._handlers.get(command);
        if (!handler) { 
            let actualCommand = this._aliases.get(command);
            if (!actualCommand) {
                event.invoker.message('Unknown command: ' + command);
                return;
            }
            handler = this._handlers.get(actualCommand!)!;
        }

        const context = new CommandContext(
            event,
            this.teamspeak,
            args,
            this.config,
            this.db
        );

        await handler.handle(context);
    }

}