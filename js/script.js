let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.


/*---------------------EVENTOS------------------*/

addNote.addEventListener('click',
(evt)=>{
  evt.preventDefault();
  modal.style.display='block';
  notes.style.display='none';
  addNote.style.display='block';
});

btnCloseModal.addEventListener('click',
(evt) => {
  evt.preventDefault();
  listNotes();
  modal.style.display='none';
  notes.style.display='flex';
  addNote.style.display='block';
});

//Botão para salvar a nota
btnSaveNote.addEventListener('click',
(evt)=>{
    evt.preventDefault(); /*Não permite reiniciar a página*/
    let objNote = {
        id: document.querySelector("#input-id").value.trim(),
        title:document.querySelector("#input-title").value.trim(),
        content:document.querySelector("#input-content").value.trim()
      };
      console.log(objNote);
      saveNote(objNote);
  });

/*------------FUNÇÕES----------------- */
const saveNote = (note) => {
  console.log(note);
   let listNotes = loadNotes();
    
  if(note.id.length <1){
    console.log(1);
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id; 
    listNotes.push(note);
  } else{
    console.log(2);
      console.log(note.id);
      listNotes.forEach((item, i) => {
        if(item.id == note.id){
          listNotes[i] = note;
        }
      })
  }
    note.lastTime = new Date().getTime();
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes', listNotes);
};

const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
      console.log(listNotes);
      if(!listNotes){
        listNotes = [];
      } else{
          listNotes = JSON.parse(listNotes);
      }
      return listNotes;
};

const showNote = (note) => {
    document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = "<h3>"+note.content+"</h3>";
    document.querySelector('#content-note').innerHTML +=
    "<p>"+new Date(note.lastTime).toLocaleDateString()+"<p>"
    document.querySelector("#controls-note").innerHTML = "";
    let aDelete = document.createElement('a');
    let i = document.createElement('i');
    i.style.color = "#ff0000";
    i.className = "bi";
    i.className = "bi-trash";
    aDelete.appendChild(i);
    document.querySelector("#controls-note").appendChild(aDelete);
    modalView.style.display = 'block';
    notes.style.display = 'none';
    addNote.style.display = 'none';
    aDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      deleteNote(note.id);
    })
    const aEdit = document.createElement('a');
    const iEdit = document.createElement('i');
    iEdit.className = "bi bi-pencil";
    aEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(aEdit);

    aEdit.addEventListener('click', (evt) => {
        evt.preventDefault();
        editNote(note);
    });
};

const editNote = (note) => {
  modalView.style.display = 'none'; 
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'block';
  
  document.querySelector("#input-id").value = note.id;
  document.querySelector("#input-title").value = note.title;
  document.querySelector("#input-content").value = note.content;
}

const deleteNote = (id) => {
    let listNotes = loadNotes(); 
    listNotes = listNotes.filter(note => note.id != id); 
    localStorage.setItem('notes', JSON.stringify(listNotes)); 
    document.querySelector('#input-id').value = ''; 
    document.querySelector('#input-title').value = '';
    document.querySelector('#input-content').value = ''; 
    modal.style.display = 'block'; 
    notes.style.display = 'none'; 
    addNote.style.display = 'block'; 
    modalView.style.display = 'none';
    listNotes();
};



closeModalView.addEventListener("click", (evt) => {
  evt.preventDefault();
  modalView.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
})

const listNotes = () => {
  notes.innerHTML=" ";
  console.log(1);
  let listNotes = loadNotes();
  console.log(listNotes);
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    notes.appendChild(divCard);
    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-Body';
    divCard.appendChild(divCardBody);
    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    let plasTime = document.createElement('p');
    plasTime.innerText = new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(plasTime);
    divCard.addEventListener('click', (evt) =>{
        evt.preventDefault();
        showNote(item);
    })
  })
}
listNotes();
