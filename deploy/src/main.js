
(
  function(){
    const div = document.createElement("div");
    div.innerHTML=`
    <!-- loading screen -->
     <div class="absolute top-0 left-0 z-40 bg-[#3a3a3a] text-white font-[Gilroy] w-full h-full flex items-center justify-center">
      <h1 id="loadingText" class='text-4xl after:w-0 after:h-2 after:bg-amber-500 after:block after:rounded-full after:mt-3 after:duration-[2.5s]'>Loading your Local Notes...✨🎶</h1>

     </div>`
     setTimeout(() => {
      document.getElementById("loadingText").classList.remove("after:w-0")
      document.getElementById("loadingText").classList.add("after:w-full")
     }, 25);
     document.body.appendChild(div)
     setTimeout(() => {
      document.body.removeChild(div)
     }, 3000);
  }
)();

(showNotes)();
search(showNotes);
document.getElementById("create-note")?.addEventListener("click", createNote);


// for sidebar
document.addEventListener("DOMContentLoaded",
  function(){
    const sidebar = document.getElementById("sidebar");
    
    if(localStorage.getItem("expanded-sidebar")=="" || 
  localStorage.getItem("expanded-sidebar")==null ||localStorage.getItem("expanded-sidebar")== undefined){
    localStorage.setItem("expanded-sidebar","true")
    
  }
  else{
   
    if (localStorage.getItem("expanded-sidebar") == "false") {
      sidebar.style.width = "12%"    
      document.querySelectorAll(".sidebar-text").forEach(elem=>{
        elem.style.display="none"
      })
      sidebar.querySelectorAll("i").forEach(elem=>{
        elem.style.fontSize="25px"
      })
      sidebar.querySelector("p").style.display="none"
  
    } else{
      sidebar.style.width = "25%"    
      document.querySelectorAll(".sidebar-text").forEach(elem=>{
        elem.style.display="initial"
      })
      sidebar.querySelectorAll("i").forEach(elem=>{
        elem.style.fontSize="initial"
      })
      sidebar.querySelector("p").style.display="block"
  

    }
  }
  })



document.querySelector("#sync").addEventListener("click", function(){

  document.querySelector("#sync").setAttribute("disabled","true")
  document.querySelector("#sync").classList.add("hover:bg-[#ffa6005e]")
  document.querySelector(".ri-refresh-line").classList.add("rotate-animation")
  notification("I will add this feature in future if I get time! 😎😴", "")
  setTimeout(() => {
    document.querySelector("#sync").removeAttribute("disabled","true")
    document.querySelector("#sync").classList.remove("hover:bg-[#ffa6005e]")
    document.querySelector(".ri-refresh-line").classList.remove("rotate-animation")
  }, 6000);
})


// sidebar
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", ()=>setSiderbar())

function setSiderbar(){
  if (localStorage.getItem("expanded-sidebar") == "true") {
    sidebar.style.width = "12%"    
    document.querySelectorAll(".sidebar-text").forEach(elem=>{
      elem.style.display="none"
    })
    sidebar.querySelectorAll("i").forEach(elem=>{
      elem.style.fontSize="25px"
    })
    sidebar.querySelector("p").style.display="none"

    localStorage.setItem("expanded-sidebar","false")
  } else{
    sidebar.style.width = "25%"    
    document.querySelectorAll(".sidebar-text").forEach(elem=>{
      elem.style.display="initial"
    })
    sidebar.querySelectorAll("i").forEach(elem=>{
      elem.style.fontSize="initial"
    })
    sidebar.querySelector("p").style.display="block"

    localStorage.setItem("expanded-sidebar","true")

  }

}


// search.js
function throttleFunction  (func, delay){

    
    let prev = 0;
    return (...args) => {
       
        let now = new Date().getTime();

       
        if (now - prev > delay) {
            prev = now;

            
            return func(...args);
        }
    }
}

function search(){
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




function searchNote(searchterm) {
    let noteContainer = document.getElementById("notes")
    let notes = JSON.parse(localStorage.getItem("notes"))
    let newSearchArr =[]
    notes.forEach((element,index) => {
        
        
        if(element.title.toLowerCase().includes(searchterm.toLowerCase()) || element.body.toLowerCase().includes(searchterm.toLowerCase()) || element.label.toLowerCase().includes(searchterm.toLowerCase()) || element.noteColor.toLowerCase().includes(searchterm.toLowerCase()) || element.labeltype.toLowerCase().includes(searchterm.toLowerCase())){
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


// notification.js

const notification = (message, type = 'default', duration = 5000) => {

  const container = document.querySelector('.notification-container');
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Create message text
  const messageText = document.createElement('span');
  messageText.textContent = message;
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn';
  closeButton.innerHTML = '<i class="ri-close-line"></i>';
  closeButton.onclick = () => removeNotification(notification);
  
  // create loading effect
  const loading = document.createElement("div")
  loading.id="loading"
  loading.classList.add("absolute","bottom-0","left-0","w-full", "h-1","bg-blue-500")

  // Append elements
  notification.appendChild(messageText);
  notification.appendChild(closeButton);
  notification.appendChild(loading)
  container.appendChild(notification);
  
  // Set timeout for auto-removal
  setTimeout(() => removeNotification(notification), duration);
}


function removeNotification(notification) {
notification.classList.add('fade-out');
setTimeout(() => {
    if (notification.parentElement) {
        notification.parentElement.removeChild(notification);
    }
}, 500);
}


// creatnote.js


function createNote() {
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

