import { TeamSpeakClient } from "ts3-nodejs-library"
import 'string-format-ts';
import { TS3Bot } from "./lib/bot";
import { Helper } from "./lib/helper";
import { ComplainEntry } from "ts3-nodejs-library/lib/types/ResponseTypes";
import { DB } from "./lib/db";
import { TextMessage } from "ts3-nodejs-library/lib/types/Events";
import { CH as Language } from "./lang/CH";
import { UserData } from "./models/user-data";
import { Timestamp } from "firebase/firestore/lite";


(async() => {

    let excludeFromKickNickname = [
        'Supo Musig'
    ];
    
    let dailyCoins = 5;
    let bot = new TS3Bot();
    let db = new DB(
        {
            apiKey: process.env.DB_API_KEY,
            authDomain: process.env.DB_AUTH_DOMAIN,
            projectId: process.env.DB_PROJECT_ID,
            storageBucket: process.env.DB_STORAGE_BUCKET,
            messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
            appId: process.env.DB_APP_ID
        }
    );
    
    await bot.startUp({
        host: <string>process.env.TS_HOST,
        queryport: Number(process.env.TS_QUERYPORT),
        serverport: Number(process.env.TS_SERVERPORT),
        username: <string>process.env.TS_USERNAME,
        password: <string>process.env.TS_PASSWORD,
        nickname: <string>process.env.TS_NICKNAME
    });

    bot.registerCommand(["!help","!helpme","!?","'!hä"], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;

        client.message(Language.get('help_text'));
    });

    bot.registerCommand(["!russianroulette","!roulette"], async (ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
       
        if(userData.coin >= 10) {
            let client2kick = await bot.teamspeak!.getClientByName(args[0]);
            if(client2kick != undefined && excludeFromKickNickname.indexOf(client2kick.nickname) >= 0){
                let newUserDate = userData;
                newUserDate.coin -= 10;
                db.setUserData(client.uniqueIdentifier, newUserDate);

                
                bot.sendMessageToAll( Language.get('russianroulette_step1') );
                await Helper.delay(1000);
                bot.sendMessageToAll( Language.get('russianroulette_step2') );
                await Helper.delay(Math.random() * 10000);
                bot.sendMessageToAll( Language.get('russianroulette_step3') );

                bot.teamspeak!.clientList().then( clients => {
                    let excludedClients:TeamSpeakClient[] = [];
                    clients.forEach(cl => {
                        if(!excludeFromKickNickname.includes(cl.nickname)){
                            excludedClients.push(cl);
                        }
                    });
                    let clientToKick = Helper.randomItem(excludedClients);
                    clientToKick.kickFromServer(  Language.get('russianroulette_step4')  );
                });
            }
        } else {
            client.message(Language.get('wallet_not_enough_money').format(10));
        }
    });

    bot.registerCommand(["!dice"], async (ev:any, args:any[]) => {
        let maxNumber:number = args.length > 0 ? args[0] : 6;
        let diceNumber:number = Math.round(Math.random() * (maxNumber -1)) + 1;
        bot.sendMessageToAll( Language.get('dice_placeholder').format(diceNumber));
    });

    bot.registerCommand(["!coin","!toss-coin", "!toss_coin", "!tosscoin"], async () => {
        bot.sendMessageToAll( Language.get('coin_placeholder').format((Math.random() > 0.5 ? Language.get('coin_tails') : Language.get('coin_heads'))));
    });

    bot.registerCommand(["!coins", "!wallet"], async(ev:TextMessage,q:any) => {
        let client = ev.invoker;
        let userData = await db.getUserData(client.uniqueIdentifier);
        client.message( Language.get('wallet_current_amount') .format(userData!.coin))
    });

    bot.registerCommand(['!daily','!dailycoins'], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
        let today:number = new Date().setHours(0, 0, 0, 0);

        if(userData.lastDailyCoin.seconds < today / 1000){
            let newUserData = userData;
            newUserData.coin += dailyCoins;
            newUserData.lastDailyCoin = new Timestamp((new Date()).getTime() / 1000, 0);
            db.setUserData(client.uniqueIdentifier, newUserData);
            client.message( Language.get('wallet_daily_success').format(dailyCoins,newUserData.coin) );
        } else {
            client.message( Language.get('wallet_daily_fail') );
            
        }
    });

    bot.registerCommand(['!kick'], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
        
        if(args.length <= 0) { 
            client.message( Language.get('help_text') );
            return;
        }

        if(userData.coin >= 30) {
            let client2kick = await bot.teamspeak!.getClientByName(args[0]);
            if(client2kick != undefined && excludeFromKickNickname.indexOf(client2kick.nickname) >= 0){
                let newUserDate = userData;
                newUserDate.coin -= 30;
                db.setUserData(client.uniqueIdentifier, newUserDate);
                client2kick.kickFromServer( Language.get('wallet_kick').format(client.nickname) );
            } else {
                client.message(Language.get('wallet_kick_not_found').format(args[0]));
            }
        } else {
            client.message(Language.get('wallet_not_enough_money').format(30));
        }

    });

    bot.registerCommand(['!ban1'], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
        
        if(args.length <= 1) { 
            client.message( Language.get('help_text') );
            return;
        }

        if(userData.coin >= 60) {
            let client2kick = await bot.teamspeak!.getClientByName(args[0]);
            if(client2kick != undefined && excludeFromKickNickname.indexOf(client2kick.nickname) >= 0){
                let newUserDate = userData;
                newUserDate.coin -= 60;
                db.setUserData(client.uniqueIdentifier, newUserDate);

                client2kick.ban(args[1], 60);
            }
        } else {
            client.message(Language.get('wallet_not_enough_money').format(60));
        }

    });

    bot.registerCommand(['!ban5'], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
        
        if(args.length <= 1) { 
            client.message( Language.get('help_text') );
            return;
        }

        if(userData.coin >= 150) {
            let client2kick = await bot.teamspeak!.getClientByName(args[0]);
            if(client2kick != undefined && excludeFromKickNickname.indexOf(client2kick.nickname) >= 0){
                let newUserDate = userData;
                newUserDate.coin -= 150;
                db.setUserData(client.uniqueIdentifier, newUserDate);

                client2kick.ban(args[1], 300);
            }
        } else {
            client.message(Language.get('wallet_not_enough_money').format(150));
        }

    });

    bot.registerCommand(['!ban30'], async(ev:TextMessage, args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);
        
        if(args.length <= 1) { 
            client.message( Language.get('help_text') );
            return;
        }

        if(userData.coin >= 400) {
            let client2kick = await bot.teamspeak!.getClientByName(args[0]);
            if(client2kick != undefined && excludeFromKickNickname.indexOf(client2kick.nickname) >= 0){
                let newUserDate = userData;
                newUserDate.coin -= 400;
                db.setUserData(client.uniqueIdentifier, newUserDate);

                client2kick.ban(args[1], 1800);
            }
        } else {
            client.message(Language.get('wallet_not_enough_money').format(400));
        }

    });

    bot.registerCommand(["!slot", "!slotmachine", "!slots"], async(ev:TextMessage,args:any) => {
        let client = ev.invoker;
        let userData:UserData = await db.getUserData(client.uniqueIdentifier);

        if(args.length <= 0) { 
            client.message( Language.get('help_text') );
            return;
        }

        let setCoins:number = Math.floor(args[0]);

        if(userData.coin >= setCoins && setCoins > 0) {
            let slots = [ Language.get('wallet_slots_options'), Language.get('wallet_slots_options'), Language.get('wallet_slots_options') ];
            let winings:number = 0;

            let newUserData = userData;

            client.message( Language.get('wallet_slots_start').format(setCoins));
            newUserData.coin -= setCoins;
            db.setUserData(client.uniqueIdentifier, newUserData);

            if(slots[0] == "7" || slots[1] == "7" || slots[2] == "7"){
                winings = setCoins;
            }
            
            if(slots[0] == slots[1] || slots[0] == slots[2] || slots[1] == slots[2]) { // * *
                winings = 2 * setCoins;
            }
            
            if(  ((slots[0] == slots[1] || slots[0] == slots[2]) && slots[0] == "7" )    ||   (slots[1] == slots[2] && slots[1] == "7")   ) { // 7 7
                winings = 3 * setCoins;
            }
            
            if(slots[0] == slots[1] && slots[0] == slots[2]) { // * * *
                winings = 3 * setCoins;
            }
            
            if(slots[0] == slots[1] && slots[0] == slots[2] && slots[0] == "7") { // 7 7 7
                winings = 5 * setCoins;
            }
            
            await Helper.delay(Math.max(Math.random() * 500, 2000));
            client.message(slots[0]);
            await Helper.delay(Math.max(Math.random() * 500, 2000));
            client.message(slots[1]);
            await Helper.delay(Math.max(Math.random() * 500, 2000));
            client.message(slots[2]);
            if(winings > 0){
                client.message( Language.get('wallet_sots_win').format(winings));
            } else {
                client.message( Language.get('wallet_slots_fail').format(setCoins));
            }

            newUserData.coin += winings;
            db.setUserData(client.uniqueIdentifier, newUserData);
        } else {
            client.message( Language.get('wallet_slots_notenough') )
        }
    });


    
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



