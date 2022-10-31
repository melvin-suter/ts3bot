import { CommandHandler } from "./command-handler";

export class CommandRouter {
    
    private _handlers = new Map<string, CommandHandler>();
    private _aliases = new Map<string, string>();
    

    constructor(...handlers: CommandHandler[]) {
        this.register(...handlers);
    }

    register(...handlers: CommandHandler[]) : void {
        handlers.forEach(handler => {
            const name = handler.name;
            const aliases = handler.aliases;

            if (this._handlers.has(name)){
                throw new Error('Duplicate command ' + name);
            }

        })
    }

    async route() {

    }

}