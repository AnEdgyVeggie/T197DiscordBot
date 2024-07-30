const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('data_science')
        .setDescription('Information about COMP3122: Applied Data Science.'),
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
                        if (lines[i].includes('Open')) {
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


        await interaction.reply("CSI: COMING WHEN AVAILABLE\n" +
                                "LECTURE VIDEOS: https://www.youtube.com/playlist?list=PL5CXJP7BfMXSkvKdoXGUMn_wBTeyd42wN\n" + 
                                "```" + `Professor: Reza Dibaj\n` + 
                                `Professor Contact: Reza.Dibaj@georgebrown.ca\n` +
                                `CRN: 18345\n` +  
                                `Class Times:\n` +  
                                `Monday: 4:00 - 5:00\n` + 
                                `Wednesday: 10:00 - 1:00\n` + "```" +
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}