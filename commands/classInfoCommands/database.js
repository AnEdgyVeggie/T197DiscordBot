const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Information about COMP2138: Database Management.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let databaseAssignmentLines = [];
        let databaseTestLines = [];
        let databaseLabLines = [];

        const splitLines = (databaseLines, path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                    }
        
                    // Push lines for specific class into own array.
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes('OOP')) {
                            databaseLines.push('\n' + lines[i]);
                            resolve(databaseLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (databaseLines.length == 0) {
                        databaseLines.push('\nNone!');
                        resolve(databaseLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(databaseLabLines, labPath),            
            splitLines(databaseTestLines, testPath),
            splitLines(databaseAssignmentLines, assignmentPath)
        ]);

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/131034/viewContent/7151823/View\n" +
                                "```" + `Professor: Harshvir Singh Gurm\n` + 
                                `Professor Contact: HarshvirSingh.Gurm@georgebrown.ca\n` +
                                `Class Times: Wednesday 12:00PM - 4:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}