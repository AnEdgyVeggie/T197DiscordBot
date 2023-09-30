const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comp1230')
        .setDescription('Information about COMP1230'),
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
                            if (lines[i].includes('PHP')) {
                                phpAssignmentLines.push('\n' + lines[i]);
                                resolve(phpAssignmentLines);
                            }
                        }

                        // If array is empty, push a message confirming no due items.
                        if (phpAssignmentLines.length == 0) {
                            phpAssignmentLines.push('\nNone!');
                            resolve(phpAssignmentLines);
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
                            if (lines[i].includes('PHP')) {
                                phpTestLines.push('\n' + lines[i]);
                                resolve(phpTestLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (phpTestLines.length == 0) {
                            phpTestLines.push("\nNone!");
                            resolve(phpTestLines);
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
                            if (lines[i].includes('PHP')) {
                                phpLabLines.push('\n' + lines[i]);
                                resolve(phpLabLines);
                            }
                        }
                        
                        // If array is empty, push a message confirming no due items.
                        if (phpLabLines.length == 0) {
                            phpLabLines.push("\nNone!");
                            resolve(phpLabLines);
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

        await interaction.reply("CSI: https://learn.georgebrown.ca/d2l/le/content/130932/viewContent/7614628/View\n" +
                                "```" + `Professor: Maziar Masoudi\n` + 
                                `Professor Contact: mmasoudi@georgebrown.ca\n` +
                                `Lab Professor: Maziar Sojoudian\n` +
                                `Lab Professor Contact: Maziar.Sojoudian@georgebrown.ca\n` +
                                `Class Times:\n` + 
                                `[Wednesday 8:00AM - 10:00AM] [Thursday 8:00AM - 10:00AM]\n` + "```" + 
                                "```" + `Upcoming Assignments: ${assignmentData}\n` + "```" + 
                                "```" + `Upcoming Tests: ${testData}\n` + "```" +
                                "```" + `Upcoming Labs: ${labData}` + "```");

    }
}