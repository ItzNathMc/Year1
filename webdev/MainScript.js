let dataset;
let id;
let tags = []
//evans work
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    dataset = data;
    id = dataset.goal.targets.length;
    dataset.goal.targets.forEach(target => {
      target.fav = Math.random() < 0.5 ? "yes" : "no";
      target.examples.forEach(example => {
      example.rating = Math.floor(Math.random() * 6);
      });
    });
    displayDataset();
    loadTags();
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });
//evans work
let idToDelete = null;
function askDelete(id) {

  idToDelete = id;
  document.getElementById("delete-modal").classList.add("active");;
}
//evans work
function closeDeleteModal() {
  document.getElementById("delete-modal").classList.remove("active");;
  idToDelete = null;
}
//evans work
function confirmDelete() {
  dataset.goal.targets = dataset.goal.targets.filter(target => target.id !== idToDelete);
  displayDataset();
  closeDeleteModal();
}

//nathan work
function validation()
{
  event.preventDefault();
  let errorMessage = "";
  let errorMessageDes = "";

  if (document.getElementById("addNumber").value.length===0)
    {
      errorMessage += "Please enter a number !";
    }
  else if (document.getElementById("addDescription").value.length ===0)
    {
      errorMessageDes += "Please enter a description !";
    }
  else if (document.getElementById("addNumber").value.length===0 && document.getElementById("addDescription").value.length ===0)
  {
    errorMessage += "Please enter a number !";
    errorMessageDes += "Please enter a description !";
  }
  else{
    addData((document.getElementById('addNumber').value),(document.getElementById('addDescription').value));
  }
  document.getElementById("numberErrorMessage").innerHTML = errorMessage;
  document.getElementById("descriptionErrorMessage").innerHTML = errorMessageDes;
  

}
 //nathan work
function validationExamples()
{
  event.preventDefault();
  let errorMessageTitle = "";
  let errorMessageDescription = "";
  let errorMessageImage = ""; 
  if (document.getElementById("exampleTitle").value.length === 0){
    errorMessageTitle = "Please enter a title !";
  }
  
  else if (document.getElementById("exampleDescription").value.length===0){
    errorMessageDescription = "Please enter a description !";
  }
  else if (document.getElementById("exampleImage").value.length===0){
    errorMessageImage = "Please input an image !";
  }
  else if(document.getElementById("exampleTitle").value.length === 0 && 
document.getElementById("exampleDescription").value.length===0 &&
document.getElementById("exampleImage").value.length===0){
  errorMessageTitle = "Please enter a title !";
errorMessageDescription = "Please enter a description !";
errorMessageImage = "Please input an image !";
}
  else{
    addExamples((document.getElementById('idExample').value),
    (document.getElementById('exampleTitle').value),
    (document.getElementById('exampleDescription').value),
    (document.getElementById('exampleImage').value),
    (document.getElementById('exampleTags').value))

  }
  document.getElementById("titleErrorMessage").innerHTML = errorMessageTitle;
  document.getElementById("descriptionErrorMessageEx").innerHTML = errorMessageDescription;
  document.getElementById("imageErrorMessage").innerHTML = errorMessageImage;
}
//nathan work
function validationSearch()
{
  event.preventDefault();
  let tempMessage = "";

  if (document.getElementById("idSearch").value.length===0){
    tempMessage = "Please enter an ID !"
  }
  else{
    searchid(document.getElementById("idSearch").value)
    document.getElementById("idSearch").value = "";
    tempMessage = "";
  }
  document.getElementById("searchIDError").innerHTML = tempMessage;

}
//nathan work
function validationSearchTags(){
  event.preventDefault();
  let tempMessageTags = "";
  if (document.getElementById("idSearchTags").value.length===0){
    tempMessageTags = "Please enter a tag !"
  }
  else{
  searchtag(document.getElementById("idSearchTags").value)
    document.getElementById("idSearchTags").value = "";
    tempMessageTags = "";
  }
  document.getElementById("searchTagsError").innerHTML = tempMessageTags;  
}

//nathan work
function modalAdd() {
  document.getElementById("modalAdd").showModal();
}
//nathan work
function searchModal(){
  document.getElementById("searchModal").showModal();

}
//nathan work
function tagSearchModal(){
  document.getElementById("searchModalTags").showModal();
}
//nathan work
function modalExamples(id) {
  document.getElementById("modalExamples").showModal();
  document.getElementById("idExample").value = id;
}
//nathan work
document.querySelectorAll(".modal-close").forEach(closebutton => 
  {
    closebutton.addEventListener("click", function (){
      document.getElementById("modal").close();
      document.getElementById("modalAdd").close();
      document.getElementById("modalExamples").close();
      document.getElementById("searchModal").close();
      document.getElementById("modalBrush").close();
      document.getElementById("searchModalTags").close();
    })
  });


//nathan work
let symbol = "";
let sortAscendingOrder = true;
let lastColumnSorted = "fav";



function displayDataset(targets = dataset.goal.targets) {

  tags = [];
  document.getElementById('exampleTags').innerHTML = "";
  let dup = [];

//nathan work
  targets.forEach(target =>{
    target.examples.forEach(example => {
      example.tags.forEach(tag => {
        if (!dup.includes(tag)){
          document.getElementById('exampleTags').innerHTML += `<option value="${tag}">${tag}</option>`;
          dup.push(tag);
          tags.push(tag);
        }
      });
    });
  });



  let cardHTML = "";
  //nathan work
  cardHTML += `<form>
<div class="sortMobileClass">
<label for="sortMobile">Sort by: </label>

<select name="sortMobile" id="sortMobile">
<option value="fav">Fav</option>
<option value="id">Id</option>
<option value="number">Number</option>
<option value="description">Description</option>
</select>

<input type="button" value="Submit" onclick="sort(document.getElementById('sortMobile').value)">

</div>
</form>`;

//abdul
  targets.forEach(target => {

    let examplesHTML = "";

    target.examples.forEach(example => {
      examplesHTML += `<button onclick="openExample(${target.id}, '${example.title}')">${example.title}</button><br>`;
    });

    cardHTML += `
      <div class="card">
        <h3>${target.number}</h3>
        <p>${target.description}</p>
        <div>${examplesHTML}</div>
        <div>
          Favourite:<input type="checkbox" ${target.fav === "yes" ? "checked" : ""}>
        </div>
        <div>
          <span class="brush" onclick="modifyData(${target.id})">🖌️</span>
          <span class="bin" onclick="askDelete(${target.id})">🗑️</span>
        </div>
      </div>
    `;
  });

  document.getElementById("cards").innerHTML = cardHTML;
  document.getElementById('sortMobile').value = lastColumnSorted;

//nathan work
  let htmlString = ``
  document.querySelector(".heroText").innerHTML = `<h1>${dataset.goal.title}</h1>`
  document.querySelector(".heroText").innerHTML += `<h3>${dataset.goal.description}</h3>`
  htmlString += `<table border=1>`

  if (targets.length > 0) {
    let columns = ["fav","id","number","description"];
      columns.forEach(heading => {

      if (heading === lastColumnSorted)
      {
      htmlString += `<th onclick="sort('${heading}')">${heading.toUpperCase()}${symbol}</th>`
      }
      else{
      htmlString += `<th onclick="sort('${heading}')">${heading.toUpperCase()}</th>`
      }
    })
    htmlString += `<th>EXAMPLES</th>`
  }
//nathan work
  targets.forEach(target => {
    htmlString += `<tr>`

    if (target.fav === "yes") {
      htmlString += `<td class = "fav"><span> ★ </span></td>`
    }
    else {
      htmlString += `<td class = "non-fav"><span> ☆ </span></td>`
    }

    htmlString += `
          <td align="center">${target["id"]}</td>
          <td align="center">${target["number"]}</td>
          <td>${target["description"]}</td>`

    htmlString += `<td>`
    target.examples.forEach(example => {
      htmlString += `<button onclick="openExample(${target.id}, '${example.title}')">${example.title}</button><br>`
    })
    htmlString += `<button onclick="modalExamples(${target["id"]})"><strong>Add Example</strong></button><br>`
    htmlString += `</td>`
    htmlString += `<td align="center">
          <span class="brush" onclick = "modifyData(${target.id})">🖌️</span><br>
          <span class = "bin" onclick = "askDelete(${target.id})"> 🗑️ </span></td>`

    htmlString += `</tr>`
  })

  htmlString += `</table>`


  document.getElementById("div").innerHTML = htmlString

}
//nathan work
function searchid(id) {
  
  const selected = dataset.goal.targets.filter(target => target.id == id);
  
  displayDataset(selected);
}
//nathan work
function searchtag(tag) {
  let selected = [];
  dataset.goal.targets.forEach(target => {
    target.examples.forEach(example => {
      
      if (example.tags.includes(tag)) {
        if (!selected.includes(target)) 
          { 
            selected.push(target) 
          }
      }
    })
  })
  
  displayDataset(selected)
}


//nathan work
function reset() {
  
  displayDataset()
}

//nathan work
function addData(number, description) {
  id++;
  let tempData = { id: id, number: number, description: description, examples: [] }
  dataset.goal.targets.push(tempData)

  displayDataset();
}


//nathan work
function addExamples(id, title, description, image, tags) {
  let tempExample = {
    title: title,
    description: description,
    images: [image],
    tags: [tags],
    rating: Math.floor(Math.random()*6)
  }
  dataset.goal.targets.forEach(target => {
    if (target.id == id) {
      target.examples.push(tempExample)
    }
  })
  document.getElementById('exampleTitle').value = ""
  document.getElementById('exampleDescription').value = ""
  document.getElementById('exampleImage').value = ""
  displayDataset();
}


//evans work
function openExample(targetId, exampleTitle) {
  // find de correct target
  const target = dataset.goal.targets.find(t => t.id == targetId);

  // find de correct example
  const example = target.examples.find(e => e.title === exampleTitle);

  if (example) {
    // put de data into de modal
    document.querySelector(".modal-title").textContent = example.title;
    document.querySelector(".modal-description").textContent = example.description;

        // displaying de linked  images
        let imgContainer = document.querySelector(".modal-images");
        imgContainer.innerHTML = "";
        
        example.images.forEach(img => {
            imgContainer.innerHTML += `<img src="${img}"><br>`;
        });
        document.querySelector(".modal-tags").innerHTML = "<strong>TAGS: </strong>";
        if(example.tags){
        example.tags.forEach(tag => {
            document.querySelector(".modal-tags").innerHTML += `${tag};  `
        })
        
        }
        document.querySelector(".modal-rating").innerHTML = "<strong>RATING: </strong>"+ example.rating + "/5";
    }
    
    document.getElementById("modal").showModal();
    
    }


function addTag()
{
    let newTag = document.getElementById("newTag").value;
    if (newTag === "")
        return;
    if (tags.includes(newTag))
        return;
    tags.push(newTag);
    updateTagUI();
    document.getElementById("newTag").value = "";
}


function deleteTag()
{
    let list = document.getElementById("tagList");
    let selected = list.value;
    tags = tags.filter(tag => tag !== selected);
    dataset.goal.targets.forEach(target => {
        target.examples.forEach(example => {
            example.tags = example.tags.filter(tag => tag !== selected);
        });
    });
    updateTagUI();
    displayDataset();
     if (currentTargetId !== null) {
        renderBrushBody(dataset.goal.targets.find(t => t.id === currentTargetId));
    }

}
function modifyTag()
{
    let list = document.getElementById("tagList");
    let selected = list.value;
    let newTag = document.getElementById("editTag").value;
    if (newTag === "")
        return;
    tags = tags.map(tag => tag === selected ? newTag : tag);
    dataset.goal.targets.forEach(target => {
        target.examples.forEach(example => {
            example.tags = example.tags.map(tag =>
                tag === selected ? newTag : tag
            );
        });
    });
    updateTagUI();
    displayDataset();
      if (currentTargetId !== null) {
        renderBrushBody(dataset.goal.targets.find(t => t.id === currentTargetId));
    }
}
function updateTagUI()
{
    let list = document.getElementById("tagList");
    let dropdown = document.getElementById("exampleTags");
    list.innerHTML = "";
    dropdown.innerHTML = "";
    tags.forEach(tag => {
        list.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
        dropdown.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
    });
}

//nathan work
function sort(header)
{
  
  if (lastColumnSorted === header)
    {
      sortAscendingOrder = !sortAscendingOrder
    }
  else
    { 
      lastColumnSorted = header;
      sortAscendingOrder = true;
    }
  if (sortAscendingOrder)
    {
      dataset.goal.targets.sort((a,b)=> a[header] < b[header]?-1:1);
    }
  else
    {
      dataset.goal.targets.sort((a,b)=> a[header] < b[header]?1:-1);
    }
  if (sortAscendingOrder)
    {
      symbol = "↑";
    }
  else
    {
      symbol = "↓";
    }

    displayDataset();

}
function toggleMenu()
{
    document.getElementById("menu").classList.toggle("show");
}
function loadTags() {
    tags = [];
    dataset.goal.targets.forEach(target => {
        target.examples.forEach(example => {
            example.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });
    });
    let dropdown = document.getElementById("exampleTags");
    dropdown.innerHTML = "";
    tags.forEach(tag => {
        dropdown.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
    });
}
let currentTargetId = null;
function modifyData(targetId) {
    currentTargetId = targetId;
    let target = dataset.goal.targets.find(t => t.id === targetId);
    document.getElementById("brushLabel").textContent = `${target.number}: ${target.description}`;
    renderBrushBody(target);
    updateTagUI();
    document.getElementById("modalBrush").showModal();
}

function renderBrushBody(target) {
    let body = document.getElementById("brushBody");
    body.innerHTML = "";

    target.examples.forEach(example => {

        let currentTagOptions = "";
        example.tags.forEach(tag => {
            currentTagOptions += `<option value="${tag}">${tag}</option>`;
        });

        let availableTagOptions = "";
        tags.forEach(tag => {
            if (!example.tags.includes(tag)) {
                availableTagOptions += `<option value="${tag}">${tag}</option>`;
            }
        });

        let imagesHTML = "";
        example.images.forEach((img, index) => {
            imagesHTML += `
                <div>
                    <img src="${img}" width="70"><br>
                    <input type="text" value="${img}" id="img-${example.title.replace(/\s/g,'_')}-${index}">
                    <button onclick="updateImage(${target.id}, '${example.title}', ${index})">Update</button>
                    <button onclick="deleteImage(${target.id}, '${example.title}', ${index})">Delete</button>
                </div>`;
        });

        body.innerHTML += `
            <div style="border-bottom:1px solid #ccc; padding:8px 0;">
                <strong>${example.title}</strong>

                <p><u>Current Tags:</u></p>
                <select id="currentTags-${example.title.replace(/\s/g,'_')}" size="3">
                    ${currentTagOptions}
                </select><br>
                <button onclick="removeTag(${target.id}, '${example.title}')">Remove Selected Tag</button>

                <p><u>Add Tag from list:</u></p>
                <select id="availableTags-${example.title.replace(/\s/g,'_')}">
                    ${availableTagOptions}
                </select>
                <button onclick="addTagToExample(${target.id}, '${example.title}')">Add Tag</button>

                <p><u>Images:</u></p>
                ${imagesHTML}
                <input type="text" id="newImg-${example.title.replace(/\s/g,'_')}" placeholder="New image URL">
                <button onclick="addImage(${target.id}, '${example.title}')">Add Image</button>
            </div>`;
    });
}

function removeTag(targetId, exampleTitle) {
    let target = dataset.goal.targets.find(t => t.id === targetId);
    let example = target.examples.find(e => e.title === exampleTitle);
    let selected = document.getElementById(`currentTags-${exampleTitle.replace(/\s/g,'_')}`).value;
    if (selected === "") return;
    example.tags = example.tags.filter(t => t !== selected);
    renderBrushBody(target);
    displayDataset();
}

function addTagToExample(targetId, exampleTitle) {
    let target = dataset.goal.targets.find(t => t.id === targetId);
    let example = target.examples.find(e => e.title === exampleTitle);
    let selected = document.getElementById(`availableTags-${exampleTitle.replace(/\s/g,'_')}`).value;
    if (selected === "") return;
    if (example.tags.includes(selected)) return;
    example.tags.push(selected);
    renderBrushBody(target);
    displayDataset();
}

function updateImage(targetId, exampleTitle, index) {
    let target = dataset.goal.targets.find(t => t.id === targetId);
    let example = target.examples.find(e => e.title === exampleTitle);
    let newUrl = document.getElementById(`img-${exampleTitle.replace(/\s/g,'_')}-${index}`).value.trim();
    if (newUrl === "") return;
    example.images[index] = newUrl;
    renderBrushBody(target);
    displayDataset();
}

function deleteImage(targetId, exampleTitle, index) {
    let target = dataset.goal.targets.find(t => t.id === targetId);
    let example = target.examples.find(e => e.title === exampleTitle);
    example.images.splice(index, 1);
    renderBrushBody(target);
    displayDataset();
}

function addImage(targetId, exampleTitle) {
    let target = dataset.goal.targets.find(t => t.id === targetId);
    let example = target.examples.find(e => e.title === exampleTitle);
    let val = document.getElementById(`newImg-${exampleTitle.replace(/\s/g,'_')}`).value.trim();
    if (val === "") return;
    example.images.push(val);
    renderBrushBody(target);
    displayDataset();
}

