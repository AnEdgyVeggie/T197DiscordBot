// const { SlashCommandBuilder } = require('discord.js');
//
// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('not_in_use')
//         .setDescription('See upcoming due dates'),
//     async execute(interaction) {
//         fetch('https://codeshare.io/AdwlMN')
//             .then(res => res.text())
//             .then(text => {
//                 interaction.reply(text);
//             })
//             .catch(err => {
//                 console.error(err);
//                 interaction.reply('Error fetching text');
//             });
//     }
// }