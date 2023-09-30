const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('java')
        .setDescription('Information about COMP2130: Java.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let javaAssignmentLines = [];
        let javaTestLines = [];
        let javaLabLines = [];

        const splitLines = (javaLines, path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                    }
        
                    // Push lines for specific class into own array.
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes('Java')) {
                            javaLines.push('\n' + lines[i]);
                            resolve(javaLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (javaLines.length == 0) {
                        javaLines.push('\nNone!');
                        resolve(javaLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(javaLabLines, labPath),            
            splitLines(javaTestLines, testPath),
            splitLines(javaAssignmentLines, assignmentPath)
        ]);

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130990/viewContent/7523940/View\n" +
                                "```" + `Professor: Mohammad Kiani\n` + 
                                `Professor Contact: Mohammad.Kiani@georgebrown.ca\n` +
                                `Class Times: Tuesday 6:00PM - 10:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}