const yargs = require("yargs");
const json = require("./tasks.json");
const fs = require('fs');
const Yargs = require("yargs/yargs");

const filePath = './tasks.json';

const options = yargs
.option("a", {
    alias:"add",
    describe: "Add a task", 
    type: "string", 
    demandOption: false 
})
.option("l", {
    alias:"list",
    describe: "List tasks", 
    demandOption: false 
})
.option("d", {
    alias:"delete", 
    describe: "Delete  a task", 
    type: "number", 
    demandOption: false 
})
.help(true)
.argv;

yargs.command('update', 'Add a task', (yargs) => {
    yargs.option("u", {
        alias:"update", 
        describe: "Update a task", 
        type: "number", 
        demandOption: true 
    })
    .option("t", {
        alias: "title",
        describe: "New title for the task (used with -u)",
        type: "string",
        demandOption: true,
    })
}).help().argv

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
 
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    // Convertir el contenido JSON en un objeto JavaScript
    let tareas;
    try {
        tareas = JSON.parse(data);
        if (!Array.isArray(tareas)) {
            tareas = [];
        }
    } catch (e) {
        tareas = [];
    }
    
    if (yargs.argv.add || yargs.argv.a) {
        const tarea =  argv.a  || argv.add
        var nuevaTarea = {
            id: tareas.length === 0 ? 1 : Math.max(...json.map(tarea => tarea.id)) + 1,
            tarea: tarea
        };
        tareas.push(nuevaTarea);
        console.log(`Nueva tarea añadida: ${nuevaTarea.tarea}`);    
    }
    
    if (yargs.argv.list || yargs.argv.l) {
        console.log(`LISTADO DE TAREAS:`);
        tareas.map(element => {
            
            console.log(`#${element.id}:  ${element.tarea}`)
        });
    }

    if (yargs.argv.d || yargs.argv.delete) {
        
        const idBorrar = argv.d || argv.delete
        const tareasLess = tareas.filter(task => task.id !== idBorrar);
        tareas = tareasLess;
    }

    if ((yargs.argv.u || yargs.argv.update) && (yargs.argv.t || yargs.argv.title)) {
        
        const idTarea = argv.u || argv.update
        const nuevaTarea = argv.t || argv.title
        if (nuevaTarea === undefined || nuevaTarea === true) {
            console.log("No se ha podido una nueva tarea");
            return;
        }
        const tareasActualizadas = tareas.map(tarea => {
        if (tarea.id === idTarea) {
            tarea.tarea = nuevaTarea;
        }
            return tarea; // Deja los demás objetos igual
        });
        tareas = tareasActualizadas;
    }    

    if (yargs.argv.add || yargs.argv.a || yargs.argv.u || yargs.argv.update || yargs.argv.d || yargs.argv.delete) {
    // Convertir el objeto JavaScript de vuelta a JSON
        const jsonActualizado = JSON.stringify(tareas, null, 2);
        // Sobrescribir el archivo JSON
        fs.writeFile(filePath, jsonActualizado, 'utf8', (err) => {
        if (err) {
            console.error("Error al escribir en el archivo:", err);
            return;
        }
        console.log("-----------------------------------");
        });
    }
  });

