const { BaseInteraction } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {BaseInteraction} interaction 
     */
    async execute(interaction) {
        if(interaction.isChatInputCommand() || interaction.isAutocomplete()) {
            const { commandName, client } = interaction;

            let command = client.baseCommands.get(commandName);
            if (!command) {
                command = client.modCommands.get(commandName);
                if(!command) return;
                //add per guild basis check
                if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('sorry this is a royal command :p');
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'there was an error while executing this command!' });
            }
        }
    }
}