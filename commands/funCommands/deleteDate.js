const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('due_dates_delete')
        .setDescription('Delete due date by course name and type')
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
                )),
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

        const filePath = `./records/${courseType.toLowerCase()}.txt`;

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading due dates file:', err);
                interaction.reply('An error occurred while reading due dates.');
                return;
            }

            // Parse the existing due dates
            const dueDates = data.split('\n');

            // Filter out the due dates that match the course name and type
            const filteredDueDates = dueDates.filter(dueDate => {
                const parts = dueDate.split(':');
                const entryCourseName = parts[0].trim();
                const entryCourseType = parts[1] ? parts[1].split('due on')[0].trim() : '';

                return !(entryCourseName === courseName && entryCourseType === courseType);
            });

            // Join the filtered due dates back into a string
            const updatedDueDates = filteredDueDates.join('\n');

            // Write the updated due dates back to the file
            fs.writeFile(filePath, updatedDueDates, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing due dates file:', err);
                    interaction.reply('An error occurred while deleting due dates.');
                    return;
                }
                console.log('Due dates deleted successfully.');
                interaction.reply(`Due dates for Course Name: ${courseName}, Type: ${courseType} have been deleted.`);
            });
        });
    }
}