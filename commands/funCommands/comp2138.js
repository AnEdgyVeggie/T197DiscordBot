const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2138')
        .setDescription('Information about COMP2138.'),
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
                            if (lines[i].includes('Database')) {
                                databaseAssignmentLines.push('\n' + lines[i]);
                                resolve(databaseAssignmentLines);
                            }
                        }

                        // If array is empty, push a message confirming no due items.
                        if (databaseAssignmentLines.length == 0) {
                            databaseAssignmentLines.push("\nNone!");
                            resolve(databaseAssignmentLines);
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
                            if (lines[i].includes('Database')) {
                                databaseTestLines.push('\n' + lines[i]);
                                resolve(databaseTestLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (databaseTestLines.length == 0) {
                            databaseTestLines.push("\nNone!");
                            resolve(databaseTestLines);
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
                            if (lines[i].includes('Database')) {
                                databaseLabLines.push('\n' + lines[i]);
                                resolve(databaseLabLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (databaseLabLines.length == 0) {
                            databaseLabLines.push("\nNone!");
                            resolve(databaseLabLines);
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

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/131034/viewContent/7151823/View\n" +
                                "```" + `Professor: Harshvir Singh Gurm\n` + 
                                `Professor Contact: HarshvirSingh.Gurm@georgebrown.ca\n` +
                                `Class Times: Wednesday 12:00PM - 4:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}