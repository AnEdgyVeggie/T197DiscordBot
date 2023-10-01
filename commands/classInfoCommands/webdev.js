const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('webdev')
        .setDescription('Information about COMP1230: Advanced Web Development.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let phpAssignmentLines = [],
            phpTestLines = [],
            phpLabLines = [];

        const splitLines = (phpLines, path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                    }
        
                    // Push lines for specific class into own array.
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes('PHP')) {
                            phpLines.push('\n' + lines[i]);
                            resolve(phpLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (phpLines.length == 0) {
                        phpLines.push('\nNone!');
                        resolve(phpLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(phpLabLines, labPath),            
            splitLines(phpTestLines, testPath),
            splitLines(phpAssignmentLines, assignmentPath)
        ]);


        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130932/viewContent/7614628/View\n" +
                                "```" + `Professor: Maziar Masoudi\n` + 
                                `Professor Contact: mmasoudi@georgebrown.ca\n` +
                                `Lab Professor: Maziar Sojoudian\n` +
                                `Lab Professor Contact: Maziar.Sojoudian@georgebrown.ca\n` +
                                `Class Times:\n` + 
                                `[Wednesday 8:00AM - 10:00AM] [Thursday 8:00AM - 10:00AM]\n` + "```" + 
                                "```" + `Upcoming Assignments: ${phpAssignmentLines}\n` + "```" + 
                                "```" + `Upcoming Tests: ${phpTestLines}\n` + "```" +
                                "```" + `Upcoming Labs: ${phpLabLines}` + "```");

    }
}