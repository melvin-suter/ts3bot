import { TeamSpeak, TextMessageEvent } from "ts3-nodejs-library";
import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";
import { DB } from "../db";
import { Helper } from "../helper";

export class RussianRouletteCommand implements CommandHandler {

    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;

        const userData = await context.db.getUserData(client.uniqueIdentifier);

        if (userData.coin < 10) {
            client.message(Language.get('wallet_not_enough_money').format(10));
            return;
        }

        const otherPlayer = await context.server.getClientByName(context.args[0]);
        if (!otherPlayer || context.config.excludeFromKickNickname.indexOf(otherPlayer.nickname) >= 0) {
            return;
        }

        let newUserData = userData;
        newUserData.coin -= 10;
        context.db.setUserData(client.uniqueIdentifier, newUserData);

        context.sendMessageToAll(Language.get('russianroulette_step1'));
        await Helper.delay(1000);
        context.sendMessageToAll(Language.get('russianroulette_step2'));
        await Helper.delay(Math.random() * 10000);
        context.sendMessageToAll(Language.get('russianroulette_step3'));

        context.server.clientList().then(clients => {
            const validClients = clients.filter(client => !context.config.excludeFromKickNickname.includes(client.nickname));
            const clientToKick = Helper.randomItem(validClients);
            clientToKick.kickFromServer(Language.get('russianroulette_step4'));
        });
    }

    get aliases(): string[] {
        return [
            '!russianroulette',
            '!roulette'
        ];
    };

    get name(): string {
        return '!russianroulette';
    }
}