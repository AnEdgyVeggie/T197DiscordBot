const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder ()
        .setName('bot_help')
        .setDescription('A list of all available commands.'),
    async execute(interaction) {
        await interaction.reply(
            "```" + `/atklass_submit     ‣ Submit an Atklass code for future viewing.\n` + "```" +
            "```" + `/atklass            ‣ View current Atklass code.\n` + "```" + 
            "```" + `/atklass_history    ‣ View past Atklass codes.\n` + "```" + 
            "```" + `/due_dates_submit   ‣ Submit a due date for any available class.\n` + "```" + 
            "```" + `/due_dates          ‣ View upcoming due dates.\n` + "```" +
            "```" + `/due_dates_delete   ‣ Delete a due date from the bot records.\n` + "```" +
            "```" + `/agile              ‣ View course information for Agile Software Development.\n` + "```" +
            "```" + `/data_structs       ‣ View course information for Data Structures and Algorithms.\n` + "```" +
            "```" + `/open_source        ‣ View course information for Open Source Development.\n` + "```" +
            "```" + `/webdev             ‣ View course information for Web Application Development.\n` + "```" +
            "```" + `/workplace_comp     ‣ View course information for Professional Workplace Compentencies.\n` + "```"
         )
    }
}