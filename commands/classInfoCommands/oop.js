const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oop')
        .setDescription('Information about COMP2129: Advanced OOP.'),
    async execute(interaction) {

        // File paths for each due date file.
        const testPath = './records/test.txt';
        const assignmentPath = './records/assignment.txt';
        const labPath = './records/lab.txt';

        // Variables for retrieving due dates.
        let lines;
        let oopAssignmentLines = [];
        let oopTestLines = [];
        let oopLabLines = [];

        const splitLines = (oopLines, path) => {
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
                            oopLines.push('\n' + lines[i]);
                            resolve(oopLines);
                        }
                    }
        
                    // If array is empty, push message confirming no due items.
                    if (oopLines.length == 0) {
                        oopLines.push('\nNone!');
                        resolve(oopLines);
                    }
        
                })
            })
        }

        // Assign to variables to push in the command output.
        const [labData, testData, assignmentData] = await Promise.all([
            splitLines(oopLabLines, labPath),            
            splitLines(oopTestLines, testPath),
            splitLines(oopAssignmentLines, assignmentPath)
        ]);

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130935/viewContent/7639449/View\n" +
                                "```" + `Professor: Houman Haji\n` + 
                                `Professor Contact: Houman.Haji@georgebrown.ca\n` +
                                `Class Times: Thursday 11:00AM - 3:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}