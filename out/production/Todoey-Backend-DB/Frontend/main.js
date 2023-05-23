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
        list.append
        
        (`<li onclick="addMarkedAsDoneFunctionality(${everyItem.finished}, 
        ${everyItem.id}, this)" class= "isChecked${everyItem.finished}">
        ${everyItem.text}|ID:${everyItem.id }
        <span class="deleteButton"> X </span> </li><button class= "updateTheText">Uppdate text</button><br><br>
        `);
        
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
    getItems();
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
            
            getItems();
        })
    }
}

function addUpdateFunctionality() {
    let allItems = $(".updateTheText");

    for (let i = 0; i < allItems.length; i++) {
        $(allItems[i]).click(function() {


            let updateText = prompt("What is your new text");
            
            items[i].text = updateText;
           
            updateItemsText(items[i]);
            getItems();
            
        })
    }
}

function addMarkedAsDoneFunctionality(maria, jack, tomas) {

    console.log(maria);
    console.log(jack);
    console.log(tomas);    
        
            if (maria == true) {
                
                $(tomas).removeClass("isCheckedtrue").addClass("isCheckedfalse");
                maria = false;  

            } else if (maria == false) {
                
                $(tomas).removeClass("isCheckedfalse").addClass("isCheckedtrue");
                maria = true;
                
            }
            console.log(maria);
            updateItemsStatus(jack, maria);
            console.log(jack, maria);
            
            getItems();

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

async function updateItemsText(item) {
    let itemToUpdateText = {
        id: item.id,
        text: item.text,
    }

    let result = await fetch("/rest/items/id", {
        method: "PUT",
        body: JSON.stringify(itemToUpdateText)
    });
    console.log(await result.text())
}

async function updateItemsStatus(jack, maria) {
    let itemToUpdate = {
        id: jack,
        finished: maria
    }

    let result = await fetch("/rest/items/id", {
        method: "POST",
        body: JSON.stringify(itemToUpdate)
    });
    console.log(await result.text())
}





