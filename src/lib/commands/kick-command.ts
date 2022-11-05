import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class KickCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
        const userData = await context.db.getUserData(client.uniqueIdentifier);

        if (context.args.length <= 1) {
            client.message(Language.get('help_text'));
            return;
        }

        if (userData.coin < 30) {
            client.message(Language.get('wallet_not_enough_money').format(30));
            return;
        }

        const client2kick = await context.server.getClientByName(context.args[0]);
        if (!client2kick || context.config.excludeFromKickNickname.indexOf(client2kick.nickname) >= 0) {
            client.message(Language.get('wallet_kick_not_found').format(context.args[0]));
            return;
        }

        let newUserData = userData;
        newUserData.coin -= 30;
        await context.db.setUserData(client.uniqueIdentifier, newUserData);
        client2kick.kickFromServer(Language.get('wallet_kick').format(client.nickname));
    }

    get name(): string {
        return '!kick';
    }

    get aliases(): string[] {
        return [];
    }
}