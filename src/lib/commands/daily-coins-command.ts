import { Timestamp } from "firebase/firestore/lite";
import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class DailyCoinsCommand implements CommandHandler {
    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
        const userData = await context.db.getUserData(client.uniqueIdentifier);
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        
        if (userData.lastDailyCoin.toDate() >= today) {
            client.message(Language.get('wallet_daily_fail'));
            return;
        }

        let newUserData = userData;
        newUserData.coin += context.config.wallet_dailyCoins;
        newUserData.lastDailyCoin = new Timestamp((new Date()).getTime() / 1000, 0);
        await context.db.setUserData(client.uniqueIdentifier, newUserData);
        client.message(Language.get('wallet_daily_success').format(context.config.wallet_dailyCoins, newUserData.coin));
    }

    get name(): string {
        return '!daily-coins'
    }

    get aliases(): string[] {
        return [
            '!dailycoins',
            '!daily'
        ];
    }
}