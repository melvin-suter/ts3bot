import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class DiceCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const maxNumber = context.args.length > 0 ? Number(context.args[0]) : 6;
        const rollNumber = Math.round(Math.random() * (maxNumber - 1)) + 1;
        context.sendMessageToAll(Language.get('dice_placeholder').format(rollNumber));
    }

    get name(): string {
        return '!dice';
    }

    get aliases(): string[] {
        return [];
    }
}