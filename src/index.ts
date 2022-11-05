import 'string-format-ts';
import { TS3Bot } from "./lib/bot";
import { ComplainEntry } from "ts3-nodejs-library/lib/types/ResponseTypes";
import { DB } from "./lib/db";
import { CH as Language } from "./lang/CH";
import { Config } from "./models/config";
import * as commands from './lib/commands';

(async() => {

    let config = new Config();
    config.excludeFromKickNickname = [
        'Supo Musig'
    ];
    
    let db = new DB(config.db);
    let bot = new TS3Bot(config, db);
    
    await bot.startUp(config.ts);

    bot.registerCommands(
        new commands.HelpCommand(),
        new commands.RussianRouletteCommand(),
        new commands.DiceCommand(),
        new commands.CoinTossCommand(),
        new commands.DailyCoinsCommand(),
        new commands.KickCommand(),
        new commands.SlotMachineCommand(),
        new commands.BanCommand('!ban1', 60, 60),
        new commands.BanCommand('!ban5', 150, 300),
        new commands.BanCommand('!ban30', 400, 1800),
    );

    bot.on('complainadd',(complain:ComplainEntry) => {
        bot.teamspeak!.getClientByDbid(complain.fcldbid).then( fromClient => {
            fromClient?.message(Language.get('complain_sender').format(complain.tname))
        });
        bot.teamspeak!.getClientByDbid(complain.fcldbid).then( toClient => {
            toClient?.message( Language.get('complain_receiver').format(complain.fname , complain.message, (new Date().getFullYear())));
        });
    });

    
    // TODO: Add coin system with rob, bank?, pay......

})();



