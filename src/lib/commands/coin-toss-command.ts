import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class CoinTossCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const result = Math.random() > 0.5 ? Language.get('coin_tails') : Language.get('coin_heads');
        context.sendMessageToAll(Language.get('coin_placeholder').format(result));
    }

    get name(): string {
        return '!coin';
    }

    get aliases(): string[] {
        return [
            '!coin-toss',
            '!coin_toss',
            '!cointoss',
            '!toss-coin',
            '!toss_coin',
            '!tosscoin',
        ];
    }
}