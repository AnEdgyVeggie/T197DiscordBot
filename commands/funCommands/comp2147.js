const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2147')
        .setDescription('Information about COMP2147.'),
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
                            if (lines[i].includes('Systems Analysis')) {
                                systemsAssignmentLines.push('\n' + lines[i]);
                                resolve(systemsAssignmentLines);
                            }
                        }

                        // If array is empty, push a message confirming no due items.
                        if (systemsAssignmentLines.length == 0) {
                            systemsAssignmentLines.push("\nNone!");
                            resolve(systemsAssignmentLines);
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
                            if (lines[i].includes('Systems Analysis')) {
                                systemsTestLines.push('\n' + lines[i]);
                                resolve(systemsTestLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (systemsTestLines.length == 0) {
                            systemsTestLines.push("\nNone!");
                            resolve(systemsTestLines);
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
                            if (lines[i].includes('Systems Analysis')) {
                                systemsLabLines.push('\n' + lines[i]);
                                resolve(systemsLabLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (systemsLabLines.length == 0) {
                            systemsLabLines.push("\nNone!");
                            resolve(systemsLabLines);
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

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/118782/viewContent/7646266/View\n" +
                                "```" + `Professor: Rashmi Shikhariya\n` + 
                                `Professor Contact: Rashmi.Shikhariya@georgebrown.ca\n` +
                                `Class Times: Friday 12:00PM - 4:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}