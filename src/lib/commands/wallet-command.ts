import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class WalletCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
        const userData = await context.db.getUserData(client.uniqueIdentifier);
        client.message(Language.get('wallet_current_amount').format(userData.coin));
    }

    get name(): string {
        return '!wallet';
    }

    get aliases(): string[] {
        return ['!coins'];
    }
}