const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('systems_analysis')
        .setDescription('Information about COMP2147: Systems Analysis.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let systemsAssignmentLines = [];
        let systemsTestLines = [];
        let systemsLabLines = [];

        const splitLines = (systemsLines, path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                    }
        
                    // Push lines for specific class into own array.
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes('Systems')) {
                            systemsLines.push('\n' + lines[i]);
                            resolve(systemsLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (systemsLines.length == 0) {
                        systemsLines.push('\nNone!');
                        resolve(systemsLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(systemsLabLines, labPath),            
            splitLines(systemsTestLines, testPath),
            splitLines(systemsAssignmentLines, assignmentPath)
        ]);

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/118782/viewContent/7646266/View\n" +
                                "```" + `Professor: Rashmi Shikhariya\n` + 
                                `Professor Contact: Rashmi.Shikhariya@georgebrown.ca\n` +
                                `Class Times: Friday 12:00PM - 4:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}