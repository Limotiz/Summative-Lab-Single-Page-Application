const input = document.getElementById("input");
const search_btn = document.getElementById("search_btn");
const not_found = document.querySelector(".not_found");
const defination_container = document.querySelector(".def");
const audio = document.getElementById("audio");
const saveBtn = document.getElementById("saveBtn");


search_btn.addEventListener("click", e => {
    e.preventDefault();

    const word = input.value;
    
    if (word === ""){
        alert("please type a word");
        return;
    }
    fetchWord(word);
});
// fetching the word from AIP

async function fetchWord(word) {
    not_found.innerText = ""; // clear previous message

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);


    // if array exist but empty
    if(data.length === 0){
        not_found.innerText = "No word found";
        return;
    }
    
    if (!Array.isArray(data)) {
  let heading = document.createElement("h3");
  heading.innerText = "Did you mean?";
  not_found.appendChild(heading);
  
  data.forEach(word => {
    const suggestion = document.createElement("span");
    suggestion.classList.add("suggested");
    suggestion.innerText = word;
    not_found.appendChild(suggestion);
});


return;
    }
//defination

let definitionText =
  data[0].meanings[0].definitions[0].definition;

defination_container.innerText = definitionText;

//audio
 const audioSrc = data.phonetics.find(p => p.audio)?.audio;
  if (audioSrc) {
    audio.src = audioSrc;
    audio.hidden = false;
  } else {
    audio.hidden = true;
}

// saving favorite words button
saveBtn.addEventListener("click", () => {
  localStorage.setItem("savedWord", currentWord);
  results.classList.add("saved");
});

}
