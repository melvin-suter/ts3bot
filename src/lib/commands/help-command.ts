import { TextMessageEvent } from "ts3-nodejs-library";
import { Language } from "../../lang/Language";
import { CommandHandler } from "../command-handler";

export class HelpCommand implements CommandHandler {
    async handle(ev: TextMessageEvent, args: any): Promise<void> {
        const client = ev.invoker;
        client.message(Language.get('help_text'));
    }

    get aliases(): string[] {
        return [
            '!help',
            '!helpme',
            '!?',
            '!hä'
        ];
    }

    get name(): string {
        return 'help';
    }
}