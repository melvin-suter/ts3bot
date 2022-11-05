import { Language } from "../../lang/Language";
import { CommandContext } from "../command-context";
import { CommandHandler } from "../command-handler";
import { Helper } from "../helper";

export class SlotMachineCommand implements CommandHandler {

    private readonly _slotItems = [
        '*',
        '7',
        '#',
        '%',
        '-',
        '|',
    ];

    async handle(context: CommandContext): Promise<void> {
        const client = context.event.invoker;
        const userData = await context.db.getUserData(client.uniqueIdentifier);

        if (context.args.length <= 0){
            client.message(Language.get('help_text'));
            return;
        }

        const betCoins = Math.floor(Number(context.args[0]));

        if (betCoins <= 0) {
            client.message('nice try...');
            return;
        }

        if (userData.coin < betCoins) {
            client.message(Language.get('wallet_slots_notenough'));
            return;
        }

        const slots: string[] = [
            Helper.randomItem(this._slotItems),
            Helper.randomItem(this._slotItems),
            Helper.randomItem(this._slotItems)
        ];

        const multiplier = this.calcWinMultiplier(slots);

        let winnings = 0;
        if (multiplier === 0) {
            client.message(Language.get('wallet_slots_fail').format(betCoins));
            winnings = -betCoins;
        } else {
            client.message(Language.get('wallet_slots_win').format(winnings));
            winnings = betCoins * multiplier;
        }

        let newUserData = userData;
        newUserData.coin+= winnings;
        await context.db.setUserData(client.uniqueIdentifier, newUserData);
    }

    private calcWinMultiplier(slots: string[]) : number {
        //Count all occurnces of 7
        let sevenCount = 0;
        for (let i = 0; i < 3; i++){
            if (slots[i] === '7') {
                sevenCount++;
            }
        }
        switch (sevenCount) {
            case 3:
                return 5;
            case 2:
                return 3;
            default: {
                //Check if all slots are the same
                if (slots[0] === slots[1] && slots[0] === slots[2]) {
                    return 3;
                }

                //Check if 2 of the slots are the same 
                if (slots[0] === slots[1] || slots[0] === slots[2] || slots[1] === slots[2]) {
                    return 2;
                }

                //Check if at least 1 seven occurs
                if (sevenCount > 0) {
                    return 1;
                }

                //Otherwise bad luck
                return 0;
            }
        }
    }

    get name(): string {
        return '!slot-machine';
    }

    get aliases(): string[] {
        return [
            '!slotmachine',
            '!slots',
            '!slot'
        ];
    }
}