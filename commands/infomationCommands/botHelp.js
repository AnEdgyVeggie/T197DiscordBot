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
            "```" + `/data_science       ‣ View course information for Applied Data Science.\n` + "```" +
            "```" + `/capstone           ‣ View course information for Capstone Project I.\n` + "```" +
            "```" + `/devops             ‣ View course information for Devops.\n` + "```" +
            "```" + `/web_app_dev        ‣ View course information for Web Application Development using Java.\n` + "```" +
            "```" + `/fullstack          ‣ View course information for Fullstack Development.\n` + "```" + 
            "```" + `/mobile_app_dev     ‣ View course information for Mobile Application Development.\n` + "```"
         )
    }
}