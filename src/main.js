import { notification } from './js/notification.js'
import createNote from './js/createNote.js';
import { showNotes } from './js/createNote.js';
import search from './js/search.js';
import './style.css';


// (
//   function(){
//     const div = document.createElement("div");
//     div.innerHTML=`
//     <!-- loading screen -->
//      <div class="absolute top-0 left-0 z-40 bg-[#3a3a3a] text-white font-[Gilroy] w-full h-full flex items-center justify-center">
//       <h1 id="loadingText" class='text-4xl after:w-0 after:h-2 after:bg-amber-500 after:block after:rounded-full after:mt-3 after:duration-[2.5s]'>Loading your Local Notes...✨🎶</h1>

//      </div>`
//      setTimeout(() => {
//       document.getElementById("loadingText").classList.remove("after:w-0")
//       document.getElementById("loadingText").classList.add("after:w-full")
//      }, 25);
//      document.body.appendChild(div)
//      setTimeout(() => {
//       document.body.removeChild(div)
//      }, 3000);
//   }
// )();

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