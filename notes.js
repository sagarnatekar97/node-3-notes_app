const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')


yargs.version('1.1.0')

// const getNotes = function () {

//     return 'Your notes...'
// }

const getNotes =()=> 'Your notes...'
// ..........................................................
const addNotes=(title,body)=>{

    const notes=loadNotes()
    const duplicateNotes=notes.filter((note)=>note.title===title)
    if(duplicateNotes==0){

    notes.push({

        title:title,
        body:body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('new notes added'));
    }
    else{
        console.log(chalk.red.inverse('note already taken'));
    }
        
  
}

// ..............................................................
const removeNotes=(title)=>{

    const notes=loadNotes()//to load exting notes
    const noteToKeep=notes.filter((note)=>{
        return note.title !== title//return only thes notes wich are not match with title
    })
    if(noteToKeep.length<notes.length){
        saveNotes(noteToKeep)
    console.log(chalk.green.inverse('notes remove successfully!'));

    }
    else {
        console.log(chalk.red.inverse('note not exist!'));
    }
   

}

// ...................................................................
const saveNotes=(notes)=>{

    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)


}
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
const loadNotes=function(){

   try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON)
   }
   catch(e){
     return []
   }

}
//...............................................................
//loading all notes and showing title of notes wich are available to 'us
const listNotes=()=>{

    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(chalk.blue.bold.underline(note.title));
        
    })

}

// ..............................................................

const readNotes=function(title){
debugger
    const notes=loadNotes()
    console.log("title",title);
    console.log('value for notes',notes);
    const note=notes.filter((note) => {
        // console.log('value of note.title',note.title);
        // console.log('value of title',note.body);
        
  
        return note.title ===title//return only thes notes wich are not match with title
    })


    // console.log(note);
    if(note){

        console.log(note);
        // console.log(note.body);
    }
    else{
        console.log(chalk.red.inverse("enter valid title to read notes"));
    }
   
   
}

// module.exports = getNotes//instede of passing one funtion we are going to pass multiple funtion to another file 
module.exports={

            getNotes:getNotes,
            addNotes:addNotes,
            removeNotes:removeNotes,
            listNotes:listNotes,
            readNotes:readNotes
}