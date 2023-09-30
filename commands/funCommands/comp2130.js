const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2130')
        .setDescription('Information about COMP2130.'),
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

        // Splitting assignment lines by specific class.
        const splitAssignmentLines = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(assignmentPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');

                        // Push lines for this specific class into its own array.
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes('Java')) {
                                javaAssignmentLines.push('\n' + lines[i]);
                                resolve(javaAssignmentLines);
                            }
                        }

                        // If array is empty, push a message confirming no due items.
                        if (javaAssignmentLines.length == 0) {
                            javaAssignmentLines.push("\nNone!");
                            resolve(javaAssignmentLines);
                        }

                    }
                });
            });
        }

        // Splitting test lines by specific class.
        const splitTestLines = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(testPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                        
                        // Push lines for this specific class into its own array.
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes('Java')) {
                                javaTestLines.push('\n' + lines[i]);
                                resolve(javaTestLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (javaTestLines.length == 0) {
                            javaTestLines.push("\nNone!");
                            resolve(javaTestLines);
                        }
                    }
                });
            });
        }

        // Splitting lab lines by specific class.
        const splitLabLines = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(labPath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        lines = data.split('\n');
                        
                        // Push lines for this specific class into its own array.
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes('Java')) {
                                javaLabLines.push('\n' + lines[i]);
                                resolve(javaLabLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (javaLabLines.length == 0) {
                            javaLabLines.push("\nNone!");
                            resolve(javaLabLines);
                        }
                    }
                });
            });
        }

        // Reads all three files.
        
            const [assignmentData, testData, labData] = await Promise.all([
                splitAssignmentLines(),
                splitTestLines(),
                splitLabLines()
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