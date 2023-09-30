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
                    {name: 'Database', value: 'Database'},
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