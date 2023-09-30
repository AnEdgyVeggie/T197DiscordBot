// For navigating the filesystem / seperation of commands
const filesystem = require("node:fs");
const path = require("node:path");

const { Client, GatewayIntentBits, Collection  } = require('discord.js');
require('dotenv').config();

// Instantiates client               GUILDS ARE DISCORD SERVERS
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// creates a collection that will store all the commands
client.commands = new Collection();
// sets path to COMMANDS FOLDER
const foldersPath = path.join(__dirname, 'commands');
// adds the folders inside folders path (commands) into an array
const commandFolders = filesystem.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // sets path to COMMANDS
    const commandsPath = path.join(foldersPath, folder);
    // adds commands to an array
    const commandFiles = filesystem.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath)
        
        // sets a new item in the collection with the key
        // as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)

        } else {
            console.log(`[[WARNING]] --- the command at ${filePath} is missing 
            the required DATA or EXECUTE property that qualifies it as a command`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = filesystem.readdirSync(eventsPath)
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }  else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);