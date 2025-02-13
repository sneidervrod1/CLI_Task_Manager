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
.option("u", {
    alias:"update", 
    describe: "Update a task", 
    type: "number", 
    demandOption: false 
})
.option("t", {
    alias: "title",
    describe: "New title for the task (used with -u)",
    type: "string",
    demandOption: false,
})
.option("d", {
    alias:"delete", 
    describe: "Delete  a task", 
    type: "number", 
    demandOption: false 
})
.help(true)
.argv;


const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
// console.log(json);
// console.log('Bienvenido a VAKIS La APP Para gestionar tus tareas');
// console.log('---------------------------------------------------');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    let tareas = JSON.parse(data || []); // Convertir el contenido JSON en un objeto JavaScript
    
    if (yargs.argv.add || yargs.argv.a) {
        const tarea =  argv.a  || argv.add
        var nuevaTarea = {
            id: Math.max(...json.map(tarea => tarea.id)) + 1,
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

        const tareasActualizadas = tareas.map(tarea => {
        if (tarea.id === idTarea) {
            return { ...tarea, ...nuevaTarea }; // Actualiza los datos del objeto
        }
            return tarea; // Deja los demás objetos igual
        });
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

