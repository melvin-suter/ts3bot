import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library";
import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class HelpCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
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
        return '!help';
    }
}