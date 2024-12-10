import { showNotes } from "./createNote";

export default function search(){
    const searchBar = document.getElementById("serch")
    const searchtermarea = document.getElementById("searchtermarea");
    const searchterm=document.getElementById("searchterm")
    
    searchBar.addEventListener("keypress",throttleFunction((e) => {
        if(JSON.parse(localStorage.getItem("notes")).length == 0){
            searchtermarea.innerText="Oopss!...No notes to search in...🕵🏻‍♀️"
        }
        searchtermarea.classList.remove("hidden")
        searchterm.innerHTML=e.target.value
        if(e.target.value===""){
        searchtermarea.classList.add("hidden")
        }
        searchNote(e.target.value)
    }, 100))
    searchBar.addEventListener("focusout",function (e) {
        if(e.target.value===""){
            searchtermarea.classList.add("hidden")
            showNotes()
            }
    })
}


const throttleFunction = (func, delay) => {

    
    let prev = 0;
    return (...args) => {
       
        let now = new Date().getTime();

       
        if (now - prev > delay) {
            prev = now;

            
            return func(...args);
        }
    }
}


function searchNote(searchterm) {
    let noteContainer = document.getElementById("notes")
    let notes = JSON.parse(localStorage.getItem("notes"))
    let newSearchArr =[]
    notes.forEach((element,index) => {
        if(element.title.includes(searchterm) || element.body.includes(searchterm) || element.label.includes(searchterm) || element.noteColor.includes(searchterm) || element.labeltype.includes(searchterm)){
            newSearchArr.push(notes[index])
        }
    });
    noteContainer ? noteContainer.innerHTML="" : undefined
    newSearchArr?.forEach((eachNote,index) => {
        let colorArr = eachNote.noteColor.split("-")
        let titleColor = `bg-${colorArr[1]}-800`
        let hoverColor = `bg-${colorArr[1]}-500`
        
        let note = `
             <div class="note ${eachNote.noteColor} hover:${hoverColor} duration-200 w-80 h-72 rounded-3xl p-3 space-y-4 cursor-pointer shadow-lg">
      <p class="flex items-center justify-between w-full"><span class="font-bold">*Label:</span>  <span class="label ${eachNote.labeltype}">${eachNote.label}</span> <i data-index="${index}" class="ri-delete-bin-6-line bg-[#00000094] px-3 py-2 rounded-full hover:scale-105 duration-150 active:scale-95"></i></p>
      <h3 class="note-title w-full h-[15%] truncate ${titleColor} p-1.5 rounded-full flex items-center">${eachNote.title}</h3>
      <p class="note-body w-full overflow-hidden text-ellipsis line-clamp-2 h-[60%]">${eachNote.body}</p>
    </div>
        `
        
        const div = document.createElement("div")
        div.innerHTML=note
        noteContainer.appendChild(div)
        
    });
    document.querySelectorAll(".ri-delete-bin-6-line").forEach(elem=>{
        elem.addEventListener("click", (e)=>{
            deleteNote(e.target.dataset.index)
            
        })
    })
}