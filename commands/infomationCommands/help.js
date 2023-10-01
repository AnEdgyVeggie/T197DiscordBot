const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder ()
        .setName('help')
        .setDescription('A list of all available commands.'),
    async execute(interaction) {
        await interaction.reply(
            "```" + `/atklass_submit     ‣ Submit an Atklass code for future viewing.\n` + "```" +
            "```" + `/atklass            ‣ View current Atklass code.\n` + "```" + 
            "```" + `/atklass_history    ‣ View past Atklass codes.\n` + "```" + 
            "```" + `/due_dates_submit   ‣ Submit a due date for any available class.\n` + "```" + 
            "```" + `/due_dates          ‣ View upcoming due dates.\n` + "```" +
            "```" + `/due_dates_delete   ‣ Delete a due date from the bot records.\n` + "```"  +
            "```" + `/java               ‣ View course information for Application Development Using Java.\n` + "```" +
            "```" + `/webdev             ‣ View course information for Advanced Web Development.\n` + "```" +
            "```" + `/database           ‣ View course information for Advanced Database Development.\n` + "```" +
            "```" + `/oop                ‣ View course information for Advanced Object Oriented Programming.\n` + "```" +
            "```" + `/systems-analysis   ‣ View course information for Systems Analysis and Design.\n` + "```"
         )
    }
}