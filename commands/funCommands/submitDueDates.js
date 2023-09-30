const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('due_dates_submit')
        .setDescription('Submit new due date entry')
        .addStringOption(option =>
            option.setName('course_name')
                .setDescription('Enter course name')
                .setRequired(true)
                .addChoices(
                    {name: 'Java', value: 'Java'},
                    {name: 'PHP', value: 'PHP'},
                    {name: 'OOP', value: 'OOP'},
                    {name: 'Systems Analysis', value: 'Systems Analysis'},
                    {name: 'Database', value: 'Database'}
                ))
        .addStringOption(option =>
            option.setName('assignment_type')
                .setDescription('Choose which category the assignment belongs to')
                .setRequired(true)
                .addChoices(
                    { name: 'Test', value: 'test' },
                    { name: 'Assignment', value: 'assignment' },
                    { name: 'Lab', value: 'lab' }
                ))
        .addStringOption(option =>
            option.setName('due_date')
                .setDescription('Enter due date (e.g., Oct 5, 8pm')
                .setRequired(true)),
    async execute(interaction) {
        /////////////////////////////////////////Verification block/////////////////////////////////////////////
        const user = interaction.user.username;
        const memberRoles = interaction.member.roles.cache;
        const hasPermission = memberRoles.some(role => role.name === "Botters" || role.name === "trust");

        if (!hasPermission) {
            await interaction.reply(`Sorry ${user}, you do not have permission to use this command.`);
            return;
        }
        ///////////////////////////////////////////End verification block/////////////////////////////////////////
        const courseName = interaction.options.getString('course_name');
        const courseType = interaction.options.getString('assignment_type');
        const dueDate = interaction.options.getString('due_date');

        console.log(`User entered Text 1: ${courseName}`);
        console.log(`User entered Text 2: ${courseType}`);
        console.log(`User entered Text 3: ${dueDate}`);

        const dueDateEntry = `${courseName}: ${courseType} due on ${dueDate}\n`;

        const filePath = `./records/${courseType.toLowerCase()}.txt`;

        fs.appendFile(filePath, dueDateEntry, (err) => {
            if (err) {
                console.error('Error writing due date to file:', err);
                interaction.reply('An error occurred while updating due dates.');
            } else {
                console.log('Due date written to file successfully.');
                interaction.reply(`Thanks for updating. Course Name: ${courseName}, Type: ${courseType}, Due: ${dueDate}`);
            }
        });
    }
}