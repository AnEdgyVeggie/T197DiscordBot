const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('workplace_comp')
        .setDescription('Information about COMP2148: Professional Workplace Compentencies.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let assignmentLines = [];
        let testLines = [];
        let labLines = [];

        const splitLines = (dataLines, path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                    }
        
                    // Push lines for specific class into own array.
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes('Workplace')) {
                            dataLines.push('\n' + lines[i]);
                            resolve(dataLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (dataLines.length == 0) {
                        dataLines.push('\nNone!');
                        resolve(dataLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(labLines, labPath),            
            splitLines(testLines, testPath),
            splitLines(assignmentLines, assignmentPath)
        ]);

        await interaction.reply("CSI: N/A yet\n" +
                                "```" + `Professor: Jeffrey Bulmer\n` + 
                                `Professor Contact: Jeffrey.Bulmer@georgebrown.ca\n` +
                                `Class Times:\n` +  
                                `              Tuesday: 3:00 - 6:00\n` + "```" +
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}