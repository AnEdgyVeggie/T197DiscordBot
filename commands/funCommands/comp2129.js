const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp2129')
        .setDescription('Information about COMP2129.'),
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
                            if (lines[i].includes('OOP')) {
                                oopAssignmentLines.push('\n' + lines[i]);
                                resolve(oopAssignmentLines);
                            }
                        }

                        // If array is empty, push a message confirming no due items.
                        if (oopAssignmentLines.length == 0) {
                            oopAssignmentLines.push("\nNone!");
                            resolve(oopAssignmentLines);
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
                            if (lines[i].includes('OOP')) {
                                oopTestLines.push('\n' + lines[i]);
                                resolve(oopTestLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (oopTestLines.length == 0) {
                            oopTestLines.push("\nNone!");
                            resolve(oopTestLines);
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
                            if (lines[i].includes('OOP')) {
                                oopLabLines.push('\n' + lines[i]);
                                resolve(oopLabLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (oopLabLines.length == 0) {
                            oopLabLines.push("\nNone!");
                            resolve(oopLabLines);
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

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130935/viewContent/7639449/View\n" +
                                "```" + `Professor: Houman Haji\n` + 
                                `Professor Contact: Houman.Haji@georgebrown.ca\n` +
                                `Class Times: Thursday 11:00AM - 3:00PM\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    } 
}