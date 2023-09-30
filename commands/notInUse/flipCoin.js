// const { SlashCommandBuilder } = require('discord.js');
//
// module.exports = {
//
//     data: new SlashCommandBuilder()
//         .setName('flip_coin')
//         .setDescription('replies With Pong'),
//     async execute(interaction) {
//     let val = Math.floor(Math.random()*2)
//     let result;
//     if(val === 0)
//         result = 'Heads'
//     else
//         result = 'Tails'
//     interaction.reply(result);
//     }
//
// }