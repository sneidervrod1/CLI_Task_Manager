
const yargs = require("yargs");

const options = yargs
.usage(usage)
.option("a", {alias:"add", describe: "Add a task", type: "string", demandOption: false })
.option("l", {alias:"list", describe: "List tasks", type: "string", demandOption: false })
.option("u", {alias:"update", describe: "Update a task", type: "int", demandOption: false })
.option("d", {alias:"delete", describe: "Delete  a task", type: "int", demandOption: false })
.help(true)
.argv;


const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
console.log(argv);

// if(argv.language == null && argv.l == null){
//     console.log(
//         chalk.yellow(   
//           figlet.textSync('MyCLI', { horizontalLayout: 'full' })
//         )
//       );
//     yargs.showHelp();
//     return;
// }
// if(argv.sentence == null && argv.s == null){
//     yargs.showHelp();
//     return;
// }
