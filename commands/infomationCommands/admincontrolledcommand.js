// const { SlashCommandBuilder } = require('discord.js');
//
// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('am_i_admin')
//         .setDescription('Provides information about the user.'),
//     async execute(interaction) {
//         const user = interaction.user.username;
//         const role = interaction.member.roles.cache
//         let permission = false;
//
//         // checks each of your roles to see if any of your toles match Botters or trust
//         role.forEach(element => {
//             if (element.name === "Botters" || element.name === "trust")
//             permission = true
//         })
//
//         // if you had the necessary role, this will be enabled
//         if (!permission) {
//             // if you don't have permissions, go away
//             await interaction.reply(`# PERMISSION DENIED \nSorry ${user}, you do not have bot permissions\n`);
//             return;
//         }
//             // this line for testing to be less obnoxious on main
//             // await interaction.reply(`${user} is testing a function.. pls look away, its embarrassing...`);
//
//             await interaction.reply(`# PERMISSION GRANTED \n${user}, you have permission to write to bots\n`);
//     }
// }