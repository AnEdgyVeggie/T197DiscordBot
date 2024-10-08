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
                    {name: 'Java Web App Development'.toUpperCase(), value: 'Java Web App Development'.toUpperCase()},
                    {name: 'Applied data science'.toUpperCase(), value: 'Applied data science'.toUpperCase()},
                    {name: 'mobile app development'.toUpperCase(), value: 'mobile app development'.toUpperCase()},
                    {name: 'full stack development I'.toUpperCase(), value: 'full stack development I'.toUpperCase()},
                    {name: 'devops'.toUpperCase(), value: 'devops'.toUpperCase()},
                    {name: 'capstone project I'.toUpperCase(), value: 'capstone project I'.toUpperCase()}
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
                .setRequired(true))
                .addStringOption(option =>
            option.setName('description')
                .setDescription('Enter description')
                .setRequired(false)),
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
        const desc = interaction.options.getString("description");

        console.log(`User entered Text 1: ${courseName}`);
        console.log(`User entered Text 2: ${courseType}`);
        console.log(`User entered Text 3: ${dueDate}`);
        console.log(`User entered Text 4: ${desc}`);

        const dueDateEntry = `\n${courseName}: ${courseType}\nDescription: ${desc || "No description provided"}\ndue on ${dueDate}\n`;

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