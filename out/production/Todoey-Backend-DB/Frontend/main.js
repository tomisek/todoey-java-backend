let items = [];

getItems();

async function getItems() {
    let result = await fetch("/rest/items");
    items = await result.json();
    renderList();
}
  
function renderList() {
    let list = $("ul");
    list.empty();

    for (everyItem of items) {
        list.append(`<li class=isChecked${everyItem.finished}> ${everyItem.text}|ID:${everyItem.id }
        <button class= "updateTheText">Uppdate text</button>  
        <span class="deleteButton"> X </span> </li>`);
    }
    addDeleteFunctionality();
    addUpdateFunctionality();
    
}

function addItem() {
    let userInput = $("#myInput").val();

    if (userInput.length > 0) {
        let item = {
            text: userInput,
            finished: false
        }
        items.push(item);
        addItemToDB(item);
    
    } else {
        alert("Du måste fylla i något! :)");
    }
    $("#myInput").val("");
    renderList();
    location.reload();
}

function addDeleteFunctionality() {
    let allDeleteButtons = $(".deleteButton");
    allDeleteButtons.empty();

    for (let i = 0; i < allDeleteButtons.length; i++) {
        $(allDeleteButtons[i]).click(function() {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteItem(items[i]);
            items.splice(i, 1);
            
            location.reload();
        })
    }
}

function addUpdateFunctionality() {
    let allItems = $(".updateTheText");

    for (let i = 0; i < allItems.length; i++) {
        $(allItems[i]).click(function() {

            let updateText = prompt("What is your new text");
            
            items[i].text = updateText;
           
            updateItem(items[i]);
            location.reload();
            


            /* if (items[i].finished == true) {
                items[i].finished = false;
                $(allItems[i]).removeClass("isCheckedtrue").addClass("isCheckedfalse");


            } else if (items[i].finished == false) {
                items[i].finished = true;
                $(allItems[i]).removeClass("isCheckedfalse").addClass("isCheckedtrue");

            }
            console.log(items);
            updateMarkedItem(items[i]); */
        })
    }
}

async function addItemToDB(item) {
    let result = await fetch("/rest/items", {
        method: "POST",
        body: JSON.stringify(item)
    });    
}

async function deleteItem(item) {
    let itemToDelete = {
        id: item.id,
        text: item.text,
        finished: item.finished
    }

    let result = await fetch("/rest/items/id", {
        method: "DELETE",
        body: JSON.stringify(itemToDelete)
    });
    console.log(await result.text())
}

async function updateItem(item) {
    let itemToUpdate = {
        id: item.id,
        text: item.text,
        finished: item.finished
    }

    let result = await fetch("/rest/items/id", {
        method: "PUT",
        body: JSON.stringify(itemToUpdate)
    });
    console.log(await result.text())
}





