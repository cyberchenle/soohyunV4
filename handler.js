const { Client } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    if(!client) {
        throw new TypeError(`A client object was not provided, received: client - ${typeof(client)}`);
    }
    const baseCommandsPath = path.join(__dirname, '4-commands', '1-base');
    console.log(`BASE COMMANDS LOADED:`);
    fs.readdirSync(baseCommandsPath).forEach(dir => {
        let dirPath = path.join(baseCommandsPath, dir);
        const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith(`.js`));
        for (let file of commandFiles) {
            let filePath = path.join(dirPath, file);
            let pull = require(filePath);
            if(pull.data?.name && pull.execute) {
                client.baseCommands.set(pull.data.name, pull);
                console.log(`» ${pull.data.name}`);
            }
        }
    })

    const modCommandsPath = path.join(__dirname, '4-commands', '2-mod');
    console.log(`MOD COMMANDS LOADED:`);
    fs.readdirSync(modCommandsPath).forEach(dir => {
        let dirPath = path.join(modCommandsPath, dir);
        const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith(`.js`));
        for (let file of commandFiles) {
            let filePath = path.join(dirPath, file);
            let pull = require(filePath);
            if(pull.data?.name && pull.execute) {
                client.modCommands.set(pull.data.name, pull);
                console.log(`» ${pull.data.name}`);
            }
        }
    })

    console.log('EVENTS LOADED:');
    const eventsPath = path.join(__dirname, '3-events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (let file of eventFiles) {
        let filePath = path.join(eventsPath, file);
        let pull = require(filePath);
        if(pull.name && pull.execute) {
            client.events.set(pull.name, pull);
            console.log(`» ${pull.name}`);
        }
    }
}