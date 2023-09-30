const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atklass')
        .setDescription('See atklass codes'),
    async execute(interaction) {
        // File paths
        let path = './records/atklass.txt';

        // Read the contents of the three files
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            // Send the contents of the file
            interaction.reply({ content: data });
        });
    }
};