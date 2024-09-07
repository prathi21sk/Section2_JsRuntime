((globalThis) => {
    const core = Deno.core;

    function argsToMessage(...args) {
        return args.map((arg) => JSON.stringify(arg)).join(" ");
    }

    const sarcasticPhrases = [
        "Oh,brilliant idea!","Wow never heard that one before...","Oh, how original...",
        "Congratulations,you broke the code!","Great job, you found a bug!","Keep up the good work, genius!",
        "Oh the brilliance is blinding...","I'm in awe of your coding skills...",
        "You must be a real expert...","Such a groundbreaking contribution...",
        "You should be a comedian...","Sarcasm level: expert...",
    ];

    function getCurrenttime() {
        const now = new Date();
        const  hours = now.getHours().toString().padStart(2,"0");
        const minutes = now.getMinutes().toString().padStart(2,"0");
        const seconds =now .getSeconds().toString().padStart(2,"0");
        return `${hours}:${minutes}:${seconds}`;

    }


    globalThis.console = {
        log: (...args) => {
            core.print(`[out]: ${argsToMessage(...args)}\n`,false);
        },
        sarcasm: (...args) => {
            const message1 = argsToMessage(...args) + " " + "wohoo! You did it princess!"
            const logMessage1 = `[message]: ${message1}`;
            core.print(`${logMessage1}\n`, true);      
          },

        sarcastic: (...args) => {
            const time=getCurrenttime();
            const sarcasticMessage = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)]
            const message = argsToMessage(...args) + `\n\x1b[1m${sarcasticMessage}\x1b[0m`;
            const logMessage = `\x1b[1;35m[${time}] [message]:\x1b[0m ${message}`;
            core.print(`${logMessage}\n`,true);
        },

        timestamp: (...args) =>
            {
            const time_stamp= new Date().toISOString();
            const formatted_msg = `[${time_stamp}] ${argsToMessage(...args)}`;
            core.print(`${formatted_msg}\n`,false);

        }    };
}

)(globalThis);