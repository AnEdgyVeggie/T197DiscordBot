const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atklass_submit')
        .setDescription('Submit current atklass code')
        .addStringOption(option =>
            option.setName('atklass_code')
                .setDescription('Enter the current code')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('choose_class')
                .setDescription('Choose which class you want to submit the code to')
                .setRequired(true)
                .addChoices(
                    { name: 'ADV OBJECT-ORIENT.PROGRAMMING', value: 'ADV OBJECT-ORIENT.PROGRAMMING' },
                    { name: 'SYS ANALYSIS, DESN AND TESTING', value: 'SYS ANALYSIS, DESN AND TESTING' },
                    { name: 'ADVANCED WEB PROGRAMMING', value: 'ADVANCED WEB PROGRAMMING' }
                )),
    async execute(interaction) {
        const atklassCode = interaction.options.getString('atklass_code').toUpperCase();
        const chooseClass = interaction.options.getString('choose_class');
        // Get user information
        const username = interaction.member.nickname;
        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleString(); // Format as a readable string
        const historyCode = `**${atklassCode}**\n${chooseClass}. Submitted by: ${username} on ${currentTime}\n`;
        const currentCode = `**${atklassCode}**\n${chooseClass}.\nLast updated: ${currentTime}\nSubmitted by: ${username}\n`;
        let path = './records/atklass.txt';
        let pathHistory = './records/atklassHistory.txt';

        // Use fs.writeFile to replace the file content with the new message
        fs.writeFile(path, currentCode, (err) => {
            if (err) {
                console.error('Error writing due date to file:', err);
            } else {
                console.log('Atklass written to file successfully.');
            }
        });

        fs.appendFile(pathHistory, historyCode, (err) => {
            if (err) {
                console.error('Error writing due date to file:', err);
            } else {
                console.log('Atklass written to file successfully.');
            }
        });
        await interaction.reply(`**${atklassCode}**\n${chooseClass}.\nLast updated: ${currentTime}\nSubmitted by: ${username}\n`);
    }
}