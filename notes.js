const fs = require('fs')
const chalk = require('chalk')

function getNotes(){
    return 'Your notes ...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold("New note added!"))
    }else{
        console.log(chalk.red.bold("Title taken!"))
    }
}

const removeNote = (title) => {
    let notes = loadNotes()
    let notesToKeep = notes.filter((note) => note.title !== title)
    saveNotes(notesToKeep)
    if(notesToKeep.length != notes.length){
        console.log(chalk.green.bold('Note removed!'))
    }else{
        console.log(chalk.red.bold('Failed to operate'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.bold("Notes Titles:"))
    notes.forEach((note) => {
        console.log(`- ${note.title}`)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if(note){
        console.log(chalk.green.bold(note.title) + '\n' + note.body)
    }else{
        console.log(chalk.red.bold("There is no such note!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}