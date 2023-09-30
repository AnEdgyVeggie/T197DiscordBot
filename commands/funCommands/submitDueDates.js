const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit_due_dates')
        .setDescription('Submit new due date')
        .addStringOption(option =>
            option.setName('course_name')
                .setDescription('Enter course name')
                .setRequired(true)
                .addChoices(
                    {name: 'Java', value: 'Java'},
                    {name: 'PHP', value: 'PHP'},
                    {name: 'OOP', value: 'OOP'},
                    {name: 'Systems Analysis', value: 'Systems Analysis'}
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
                .setDescription('Enter due date (e.g., YYYY-MM-DD)')
                .setRequired(true)),
    async execute(interaction) {
        ////////////////////////////////////Verification block///////////////////////////////////////////
        const user = interaction.user.username;
        const role = interaction.member.roles.cache
        let permission = false;
        // checks each of your roles to see if any of your toles match Botters or trust
        role.forEach(element => {
            if (element.name === "Botters" || element.name === "trust")
                permission = true
        })
        // if you had the necessary role, this will be enabled
        if (!permission) {
            // if you don't have permissions, go away
            await interaction.reply(`# Sorry ${user},\n you do not have bot permissions\n # PERMISSION DENIED`);
            return;
        }
        /////////////////////////////////////End of verification block///////////////////////////////////
        const courseName = interaction.options.getString('course_name');
        const courseType = interaction.options.getString('assignment_type');
        const dueDate = interaction.options.getString('due_date');
        console.log(`User entered Text 1: ${courseName}`);
        console.log(`User entered Text 2: ${courseType}`);
        console.log(`User entered Text 2: ${dueDate}`);

        // Inside the execute function, after getting the inputs
        const dueDateEntry = `${courseName}: ${courseType} due on ${dueDate}\n`;

        let path = './records/assignment.txt';
        if (courseType.toLowerCase() === 'test') {
            path = './records/test.txt';
        } else if (courseType.toLowerCase() === 'lab') {
            path = './records/lab.txt';
        }

        fs.appendFile(path, dueDateEntry, (err) => {
            if (err) {
                console.error('Error writing due date to file:', err);
            } else {
                console.log('Due date written to file successfully.');
            }
        });
        await interaction.reply(`Thanks for updating. Coursename: ${courseName}, Type: ${courseType}, Due: ${dueDate}`);
    }
}