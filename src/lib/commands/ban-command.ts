import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";

export class BanCommand implements CommandHandler {

    private _aliases: string[];
    constructor(private _name: string, private _cost: number, private _duration: number, ...aliases: string[]) {
        this._aliases = aliases;
    }

    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
        const userData = await context.db.getUserData(client.uniqueIdentifier);

        if (context.args.length <= 1) {
            client.message(Language.get('help_text'));
            return;
        }

        if (userData.coin < this._cost) {
            client.message(Language.get('wallet_not_enough_money').format(this._cost));
        }

        const client2ban = await context.server.getClientByName(context.args[0]);
        if (!client2ban || context.config.excludeFromKickNickname.indexOf(client2ban.nickname) >= 0) {
            client.message('wallet_kick_not_found').format(context.args[0]);
            return;
        }

        let newUserData = userData;
        newUserData.coin -= this._cost;
        await context.db.setUserData(client.uniqueIdentifier, newUserData);

        client2ban.ban(context.args[1], this._duration);
    }

    get name(): string {
        return this._name;
    }

    get aliases(): string[] {
        return this._aliases;
    }
}