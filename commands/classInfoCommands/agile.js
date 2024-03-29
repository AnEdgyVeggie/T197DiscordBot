const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agile')
        .setDescription('Information about COMP2151: Agile Software Development.'),
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
                        if (lines[i].includes('Agile')) {
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


        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/214352/viewContent/8219216/View\n" +
                                "```" + `Professor: Abid Rana\n` + 
                                `Professor Contact: Abid.Rana@georgebrown.ca\n` +
                                `Professor: Bernie Cablin\n` + 
                                `Professor Contact: Bernie.Cablin@georgebrown.ca\n` +
                                `Class Times:\n` +  
                                `Wednesday: 12:00 - 2:00\n` + 
                                `Wednesday: 8:00 - 10:00\n` + "```" +
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}