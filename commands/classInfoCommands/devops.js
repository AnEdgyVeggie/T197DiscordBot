const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('devops')
        .setDescription('Information about COMP3104: Devops.'),
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

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/290497/viewContent/8959005/View\n" +
                                "```" + `Professor: Pritesh Patel\n` + 
                                `Professor Contact: pritesh.patel2@georgebrown.ca\n` +
                                `CRN: 18342\n` +  
                                `Class Times:\n` +  
                                `Wednesday: 6:00 - 9:00\n` + "```" +
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}