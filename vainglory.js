const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
    string: ["mode", "partysize", 'hero'],
    alias: {
        m: 'mode',
        p: 'partysize',
        h: 'hero'
    },
    default: {
        mode: 'menu',
        partysize: '1',
        hero: 'menu'
    }
});

const options = {};

const tf2 = '473680755944456192';

const client = require("discord-rich-presence")(tf2);

if (args.mode === 'menu') {
    options.state = 'Main Menu'
} else if (args.mode === '3v3 casual') {
    options.state = '3v3 Casual Match'
    options.smallImageKey = 'casual'
    options.smallImageText = 'Casual'
} else if (args.mode === '3v3 ranked') {
    options.state = '3v3 Ranked Match'
    options.smallImageKey = 'ranked'
    options.smallImageText = 'Ranked'
} else if (args.mode === '5v5 casual') {
    options.state = '5v5 Casual Match'
    options.smallImageKey = 'casual'
    options.smallImageText = 'Casual'
} else if (args.mode === '5v5 ranked') {
    options.state = '5v5 Ranked Match'
    options.smallImageKey = 'ranked'
    options.smallImageText = 'Ranked'
} else if (args.mode === 'battle royale') {
    options.state = 'Battle Royale'
    options.smallImageKey = 'battle_royale'
    options.smallImageText = 'Battle Royale'
} else if (args.mode === 'blitz') {
    options.state = 'Blitz Match'
    options.smallImageKey = 'blitz'
    options.smallImageText = 'Blitz'
} else {
    options.state = args.mode;
};

options.largeImageKey = args.hero;

options.largeImageText = args.hero !== 'menu' ? args.hero[0].toUpperCase() + args.hero.split("").slice(1).join("") : 'Main Menu';

options.partySize = parseInt(args.partysize);

options.partyMax = 3

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const recursiveAsyncReadLine = function () {
    rl.question('> ', function (type) {
        if (type === 'exit') {
            process.exit(0);
        };
        const value = type.split(" ").slice(1).join(" ");
        if (type.startsWith('mode')) {
            if (value === 'menu') {
                options.state = 'Main Menu'
            } else if (value === '3v3 casual') {
                options.state = '3v3 Casual'
                options.smallImageKey = 'casual'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 3;
            } else if (value === '3v3 ranked') {
                options.state = '3v3 Ranked'
                options.smallImageKey = 'ranked'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 3;
            } else if (value === '5v5 casual') {
                options.state = '5v5 Casual'
                options.smallImageKey = 'casual'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 5;
            } else if (value === '5v5 ranked') {
                options.state = '5v5 Ranked'
                options.smallImageKey = 'ranked'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 5;
            } else if (value === 'battle royale') {
                options.state = 'Battle Royale'
                options.smallImageKey = 'battle_royale'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 3;
            } else if (value === 'blitz') {
                options.state = 'Blitz Match'
                options.smallImageKey = 'blitz'
                options.smallImageText = value.split("")[0].toUpperCase() + value.split("").slice(1).join("");
                options.partyMax = 3;
            } else {
                options.state = value;
                options.smallImageKey = undefined;
                options.smallImageText = undefined;
            };
            options.startTimestamp = new Date();
            client.updatePresence(options);
            console.log("Updated presence.");
        } else if (type.startsWith('hero')) {
            options.largeImageKey = value;
            options.largeImageText = value !== 'menu' ? value[0].toUpperCase() + value.split("").slice(1).join("") : 'Main Menu';
            options.details = value !== 'menu' ? 'As ' + value[0].toUpperCase() + value.split("").slice(1).join("") : undefined
            options.startTimestamp = new Date();
            client.updatePresence(options);
            console.log("Updated presence.");
        } else if (type.startsWith('party')) {
            options.partySize = parseInt(value);
            options.startTimestamp = new Date();
            client.updatePresence(options);
            console.log("Updated presence.")
        } else if (type.startsWith('update')) {
            options.startTimestamp = new Date();
            client.updatePresence(options);
            console.log("Updated presence.");
        }
        recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
};

recursiveAsyncReadLine();
