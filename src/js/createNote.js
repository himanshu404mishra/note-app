import { notification } from "./notification"

const createNote = () => {
    const noteBody = document.getElementById("notebody")
    document.getElementById("backgrounds").addEventListener("click",(e)=>{
        
        if(e.target.id==="1"){
            noteBody.classList.remove("bg-transparent")
            noteBody.classList.remove("bg-pink-600")
            noteBody.classList.remove("bg-yellow-600")
            noteBody.classList.remove("bg-orange-600")
            noteBody.classList.remove("bg-indigo-600")
            noteBody.classList.add("bg-emerald-600", "text-white","placeholder:text-white")
        }else if(e.target.id==="2"){
            noteBody.classList.remove("bg-transparent")
            noteBody.classList.remove("bg-emerald-600")
            noteBody.classList.remove("bg-yellow-600")
            noteBody.classList.remove("bg-orange-600")
            noteBody.classList.remove("bg-indigo-600")
            noteBody.classList.add("bg-pink-600", "text-white","placeholder:text-white")
        }else if(e.target.id==="3"){
            noteBody.classList.remove("bg-transparent")
            noteBody.classList.remove("bg-pink-600")
            noteBody.classList.remove("bg-emerald-600")
            noteBody.classList.remove("bg-orange-600")
            noteBody.classList.remove("bg-indigo-600")
            noteBody.classList.add("bg-yellow-600", "text-white","placeholder:text-white")
        }else if(e.target.id==="4"){
            noteBody.classList.remove("bg-transparent")
            noteBody.classList.remove("bg-pink-600")
            noteBody.classList.remove("bg-yellow-600")
            noteBody.classList.remove("bg-emerald-600")
            noteBody.classList.remove("bg-indigo-600")
            noteBody.classList.add("bg-orange-600", "text-white","placeholder:text-white")
        }else if(e.target.id==="5"){
            noteBody.classList.remove("bg-transparent")
            noteBody.classList.remove("bg-pink-600")
            noteBody.classList.remove("bg-yellow-600")
            noteBody.classList.remove("bg-orange-600")
            noteBody.classList.remove("bg-emerald-600")
            noteBody.classList.add("bg-indigo-600", "text-white","placeholder:text-white")
        }
    })

    if(document.getElementById("note-box").classList.contains("hidden")){
        document.getElementById("screen-dim").style.display="block"
        document.getElementById("note-box").classList.remove("hide-note-box")
        document.getElementById("note-box").classList.remove("hidden")
        document.getElementById("note-box").classList.add("show-note-box")
    }else{
        document.getElementById("screen-dim").style.display="none"
        
        document.getElementById("note-box").classList.remove("show-note-box")
        setTimeout(() => {
            document.getElementById("note-box").classList.add("hidden")
        }, 600);
            document.getElementById("note-box").classList.add("hide-note-box")
            document.getElementById("notetitle").value=""
            document.getElementById("notebody").value=""
            document.getElementById("notebody").classList.add("bg-transparent")
        
    }
    document.getElementById("screen-dim").addEventListener("click",function(){
        document.getElementById("screen-dim").style.display="none"
        
        document.getElementById("note-box").classList.remove("show-note-box")
        document.getElementById("note-box").classList.add("hide-note-box")
        setTimeout(() => {
            document.getElementById("note-box").classList.add("hidden")
        }, 600);

             document.getElementById("notetitle").value=""
            document.getElementById("notebody").value=""
            document.getElementById("notebody").classList.add("bg-transparent")

    })
    document.getElementById("discard-note").addEventListener("click",function(){
        document.getElementById("screen-dim").style.display="none"
        
        document.getElementById("note-box").classList.remove("show-note-box")
        document.getElementById("note-box").classList.add("hide-note-box")
        setTimeout(() => {
            document.getElementById("note-box").classList.add("hidden")
        }, 600);

             document.getElementById("notetitle").value=""
            document.getElementById("notebody").value=""
            document.getElementById("notebody").classList.add("bg-transparent")

    })



    // creating new note
    document.getElementById("note-box").addEventListener("submit", function(e){
        e.preventDefault();
        let title = document.getElementById("notetitle").value
        let body = document.getElementById("notebody").value
        console.log(body);
        
        let noteColor = noteBodyColorChecker() || "bg-emerald-600"
        let label = "set label by clicking!"
        let labeltype = "no-label"
        if(!title || !body){
                        //   no use 
        }else{
            let noteObj = {
                title,
                body,
                noteColor,
                label,
                labeltype
            }
            if(localStorage.getItem("notes")=="" || localStorage.getItem("notes")==undefined || localStorage.getItem("notes")== null){
                let notesArr=[]
                notesArr.push(noteObj)
                
                localStorage.setItem("notes",JSON.stringify(notesArr))

                // hiding notebox
                document.getElementById("screen-dim").style.display="none"
        
                document.getElementById("note-box").classList.remove("show-note-box")
                setTimeout(() => {
                    document.getElementById("note-box").classList.add("hidden")
                }, 600);
                    document.getElementById("note-box").classList.add("hide-note-box")
                    document.getElementById("notetitle").value=""
                    document.getElementById("notebody").value=""
                    document.getElementById("notebody").classList.add("bg-transparent")
                notification("Success! You successfully saved a note", "success")
                
                showNotes()
            }else{
                let notesGot = JSON.parse(localStorage.getItem("notes"))
                noteObj.id=notesGot.length
                notesGot.push(noteObj)
                localStorage.setItem("notes", JSON.stringify(notesGot))


                // hiding notebox
                document.getElementById("screen-dim").style.display="none"
        
                document.getElementById("note-box").classList.remove("show-note-box")
                setTimeout(() => {
                    document.getElementById("note-box").classList.add("hidden")
                }, 600);
                    document.getElementById("note-box").classList.add("hide-note-box")
                    document.getElementById("notetitle").value=""
                    document.getElementById("notebody").value=""
                    document.getElementById("notebody").classList.add("bg-transparent")
                    notification("Success! You successfully saved a note", "success")
                
                showNotes()

            }
        }
    })




    

    function noteBodyColorChecker(){
        let noteBody = document.getElementById("notebody")
        let notecolor;
        if (noteBody.classList.contains("bg-emerald-600")) {
            notecolor="bg-emerald-600"
        }else if (noteBody.classList.contains("bg-indigo-600")) {
            notecolor="bg-indigo-600"
        }else if (noteBody.classList.contains("bg-pink-600")) {
            notecolor="bg-pink-600"
        }else if (noteBody.classList.contains("bg-orange-600")) {
            notecolor="bg-orange-600"
        }else if(noteBody.classList.contains("bg-yellow-600")) {
            notecolor="bg-yellow-600"
        }else{
            notecolor="bg-orange-600"
        }
        return notecolor
    }


    
    
}

// deleteNote
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"))
    let newNotes =[]
    notes.forEach(element => {
        if(notes.indexOf(element) == index){
           
        }else{
            newNotes.push(element)
           
        }
    });
    
    localStorage.setItem("notes",JSON.stringify(newNotes))
    showNotes()
}

// show notes
function showNotes() {
        
    let notData = JSON.parse(localStorage.getItem("notes"))
    let noteContainer = document.getElementById("notes")
    noteContainer ? noteContainer.innerHTML="" : undefined


    if(!notData || !notData.length){
        noteContainer.innerHTML=`<h1 class="text-5xl text-[#a3a3a37e] select-none">No Notes Available</h1>`
    }else{
        notData?.forEach((eachNote,index) => {
            let colorArr = eachNote.noteColor.split("-")
            let titleColor = `bg-${colorArr[1]}-800`
            let hoverColor = `bg-${colorArr[1]}-500`
            let note = `
                 <div class="note ${eachNote.noteColor} hover:${hoverColor} duration-200 w-80 h-fit max-h-96 rounded-3xl p-3 space-y-4 cursor-pointer shadow-lg active:shadow-2xl">
          <p class="flex items-center justify-between w-full"><span class="font-bold">*Label:</span>  <span class="label ${eachNote.labeltype}">${eachNote.label}</span> <i data-index="${index}" class="ri-delete-bin-6-line bg-[#00000094] px-3 py-2 rounded-full hover:scale-105 duration-150 active:scale-95"></i></p>
          <h3 class="note-title w-full h-[15%] overflow-auto whitespace-nowrap ${titleColor} p-1.5 rounded-full flex items-center">${eachNote.title}</h3>
          <p class="note-body w-full overflow-auto break-words whitespace-pre-wrap bg-[#00000023] p-2 rounded-2xl h-fit max-h-52 min-h-40">${eachNote.body}</p>
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
    document.querySelectorAll(".label").forEach((label,index)=>{
        label.addEventListener("click",(e)=>changeLabel(e.target, index))
        
    })
    // handling label change
}


    
    



function changeLabel(target, index){
    const label = ["set label by clicking!","Important!","Done!","Finish Later!"]
    const labelType = ["no-label","important-label","done-label","finish-later-label"]
    const notes = JSON.parse(localStorage.getItem("notes"))
    let newNotes = [];

    let currentLabel = target.innerText;
    let newLabel;
    label.forEach((curr, index) => {
        if(curr == currentLabel){
            newLabel = label.length-1 === index ? label[0] : label[index+1]
        }
    })

    notes[index].label = newLabel;
    notes[index].labeltype = labelType[label.indexOf(newLabel)]
    newNotes = notes

    localStorage.setItem("notes", JSON.stringify(newNotes))
    showNotes()
}


export { showNotes }
export default createNote