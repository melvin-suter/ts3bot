import { Language } from "./Language";

export class CH extends Language {
    static data:any = {

        'help_text': [
`
\`\`\`
HEEEELP

Allgemäins:

    !dice [<MAX>]               Würflet en 6-fach würfäl, oder en X-fach wenns max agibsch
    !tosscoin                   Chopf oder Zahl?

Gäld ond zügs:

    !daily                      Bechonsch dis tägliche gäld

    !slots <ISATZ>              Chasch amänä eiarmigä bandit spiele
    !slotmachine <ISATZ>        7                 1x ISATZ
                                x x               2x ISATZ
                                7 7 oder x x x    3x ISATZ
                                7 7 7             5x ISATZ

    !coins                      Zeigt wieviel no ofem konto hesch
    !wallet

    !russianroulette            Chostet: 10 / chasch russischs roulette spile
    !roulette

    !kick <NICKNAME>            Chostet: 30 / Kick e siäch
    !ban1 <NICKNAME> <GRUND>    Chostet: 60 / Ban de arsch für 1 minute ond sägem wieso
    !ban5 <NICKNAME> <GRUND>    Chostet: 150 / Ban de wixxer für 5 minute ond sägem wieso
    !ban30 <NICKNAME> <GRUND>   Chostet: 400 / Ban de hueresohn für 30 minute ond sägem wieso

\`\`\`
`
        ],

        /*********
         * Mini "Games"
        *********/
        "dice_placeholder": [
            "Du würflisch: {0}",
            "Du hesch {0} gwürflät",
            "ooooooond {0}"
        ],



        "coin_placeholder": [
            "Es isch {0}",
            "Du hesch {0}",
            "ooooooond {0}"
        ],
        "coin_heads": [
            "chopf",
            "kopf",
            "gürbse",
            "grind"
        ],

        "coin_tails": [
            'zahl',
            'zau',
            'numärä',
            'mathe-zügs'
        ],


        /*********
         * WALLET
        *********/
        "wallet_current_amount": [
            "Du hesch: {0}$",
            "i han {0} gäld",
            'money money money {0}'
        ],

        'wallet_daily_success':[
            'GEEEELD',
            'lohn, wuhu',
            'schoweder de 25.',
            'money money moeny',
            'jetzt chasch der weder es zmettag leiste',
            'gibs gäld ned für unnützes us'
        ],

        'wallet_daily_fail':[
            'nope',
            'lass mi in rueh',
            'get nüt gratis',
            'wa wotsch?!',
            'morn wider',
            'gäld wachst nid uf böim'
        ],

        'wallet_not_enough_money': [
            'hesch zwenig gäld',
            'du armsche schlucker, längt ned',
            'nööööö',
            'ha ke lust'
        ],

        'wallet_kick_not_found': [
            '{0} gits nöd',
            'de {0} hani nöd gfundä'
        ],

        'wallet_kick':[
            '{0} säit tschüss',
            'bye bye',
            'de {0} het di ned gärn'
        ],

        'wallet_slots_notenough':[
            'du häsch ned gnuä gäld',
            'tjaaa, ke geld'
        ],

        'wallet_slots_options': [
            '*',
            '7',
            '#',
            '%',
            '-',
            '|'
        ],

        'wallet_slots_start': [
            '{0} gäld, letse go',
            'de isatz esch {0}',
            'wuhuuuu'
        ],

        'wallet_slots_fail':[
            'ua ua uaaaaaa',
            'nope',
            'päch',
            'tja',
            'ond {0} gönd de bach durab'
        ],

        'wallet_sots_win': [
            'gunä, es git {0} gäld',
            'money money money +{0}',
            'oha, ganzi {0}',
            'BAM, {0} meh'
        ],

        /*********
         * RUSSIAN ROULETTE
        *********/
        'russianroulette_step1': [
            "Chuglä gladä",
            "Achtung",
        ],
        'russianroulette_step2': [
            'Zylinder dreiht',
            'Bereit'
        ],
        'russianroulette_step3': [
            'bum',
            'bang',
            'peng'
        ],
        'russianroulette_step4': [
            'treffer, versenkt',
            'bye bye'
        ],

        /*********
         * Complain
        *********/
        'complain_sender': [
            'was nervsch de {0}?',
            'was cha de {0} deför dass er behindert esch?!',
            '{0}, heul leise',
            '{0} segemol, spinsch en aot?!',
            'aha',
            'OMG, WHO THE HELL CAAAAAARRES',
            'ähä',
            'ond jetzt? was glaubsch passiert?'
        ],
        'complain_receiver': [
            'was nervsch de {0} met {1}?',
            'de {0} het es problem mit dir',
            'psssst. {0} seit: {1}',
            'wotsch en witz ghöre? {1}',
            'öper het di nid gern. säg der aber ned wer.',
            '{0} will der en link schicke: https://hurensohn.ch/',
            '{1} - {3} {0}'
        ]
    }
}