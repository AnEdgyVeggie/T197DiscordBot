const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('due_dates')
        .setDescription('See upcoming due dates'),
    async execute(interaction) {
        // File paths for the three files
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Read the contents of the three files
        const readTestFile = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(testPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        const readAssignmentFile = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(assignmentPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        const readLabFile = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(labPath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // Use Promise.all to read all three files concurrently
        try {
            const [testData, assignmentData, labData] = await Promise.all([
                readTestFile(),
                readAssignmentFile(),
                readLabFile(),
            ]);

            // Combine the contents of the three files
            const combinedData = `\`\`\`${testData}\`\`\`\n\`\`\`${assignmentData}\`\`\`\n\`\`\`${labData}\`\`\``;

            // Send the combined data as a reply
            console.log('combinedData sent')
            interaction.reply(`${combinedData}`);
        } catch (error) {
            console.error('Error reading files:', error);
            interaction.reply('An error occurred while reading the files.');
        }
    }
};