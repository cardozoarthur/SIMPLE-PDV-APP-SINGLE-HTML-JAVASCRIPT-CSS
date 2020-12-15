//const workerProduct = new product();
window.onload = () => {
    document.querySelectorAll('input').forEach(element => {
        element.value = null
    })
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'f':
            console.log('finalizar venda');
            finalizeSell();
            return;
        default:
            return;
    }
});

function createProduct() {
    try {
        let name = document.querySelector("input#name").value;
        let description = document.querySelector("input#description") ? document.querySelector("input#description").value : null;
        let code = document.querySelector("input#codeCreate").value;
        let unitValue = document.querySelector("input#value").value;
        console.log(name, description, code, unitValue)
        return (workerProduct.createProduct(name, description, code, unitValue));
    } catch (err) {
        alert(err)
    }
}

function listProducts() {
    let allProducts = JSON.parse(localStorage.getItem('products'));

    let section = document.querySelector("#listProduct");

    let falseTable = document.querySelector("#listProduct table");

    let table = document.createElement("table");

    let header = document.createElement("tr");
    let header1 = document.createElement("td");
    let header2 = document.createElement("td");
    let header3 = document.createElement("td");
    let header4 = document.createElement("td");

    let nameHeader = document.createTextNode("Nome");
    let codeHeader = document.createTextNode("Código");
    let valueHeader = document.createTextNode("Valor");
    let configHeader = document.createTextNode("Config.");

    header1.appendChild(nameHeader);
    header2.appendChild(codeHeader);
    header3.appendChild(valueHeader);
    header4.appendChild(configHeader);

    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);

    table.appendChild(header)


    if (falseTable) section.removeChild(falseTable);
    allProducts.map((item, index, array) => {
        let tableRow = document.createElement("tr");
        let tableName = document.createElement("td");
        let tableCode = document.createElement("td");
        let tableValue = document.createElement("td");
        let tableConfig = document.createElement("td");


        let name = document.createTextNode(item.name);
        let code = document.createTextNode(item.code);
        let value = document.createTextNode(Number(item.unitValue).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        tableName.appendChild(name);
        tableCode.appendChild(code);
        tableValue.appendChild(value);


        
        let updateButton = document.createElement("button");
        let updateText = document.createTextNode("Atualizar");
        updateButton.appendChild(updateText);
        updateButton.className = "updateButton";
        updateButton.id = `${item.id}`;
        updateButton.onclick = (e) => {
            updateButton.removeChild(updateText);
            updateText = document.createTextNode("Confirmar");
            updateButton.appendChild(updateText);

            let updateNameInput = document.createElement("input");
            updateNameInput.type = "text";
            updateNameInput.value = item.name;
            tableName.removeChild(name);
            tableName.appendChild(updateNameInput);
            let updateCodeInput = document.createElement("input");
            updateCodeInput.type = "text";
            updateCodeInput.value = item.code;
            tableCode.removeChild(code);
            tableCode.appendChild(updateCodeInput);
            let updateValueInput = document.createElement("input");
            updateValueInput.type = "text";
            updateValueInput.value = item.unitValue;
            tableValue.removeChild(value);
            tableValue.appendChild(updateValueInput);

            updateButton.onclick = (e) => {
                console.log('confirmou');
                let nameUpdated = updateNameInput.value;
                let codeUpdated = updateCodeInput.value;
                let valueUpdated = updateValueInput.value;
                workerProduct.updateProduct(e.target.id, {
                    name: nameUpdated,
                    code: codeUpdated,
                    unitValue: Number(valueUpdated)
                });
                tableName.removeChild(updateNameInput);
                tableName.appendChild(name);
                tableCode.removeChild(updateCodeInput);
                tableCode.appendChild(code);
                tableValue.removeChild(updateValueInput);
                tableValue.appendChild(value);
                listProducts();
            }
        };
        let deleteButton = document.createElement("button");
        let deleteText = document.createTextNode("Deletar");
        deleteButton.appendChild(deleteText);
        deleteButton.className = "deleteButton";
        deleteButton.id = `${item.id}`;
        deleteButton.onclick = (e) => {
            workerProduct.deleteProduct(e.target.id);
            listProducts();
        };
        let configDiv = document.createElement("div");
        configDiv.className = "configDiv";
        configDiv.appendChild(updateButton);
        configDiv.appendChild(deleteButton);



        tableConfig.appendChild(configDiv);
        tableRow.appendChild(tableName);
        tableRow.appendChild(tableCode);
        tableRow.appendChild(tableValue);
        tableRow.appendChild(tableConfig);
        table.appendChild(tableRow);
    });

    section.appendChild(table);
}
function listSells() {
    let allSells = JSON.parse(localStorage.getItem('sellHistory'));

    let section = document.querySelector("#listSell");

    let falseTable = document.querySelector("#listSell table");

    let table = document.createElement("table");

    let header = document.createElement("tr");
    let header1 = document.createElement("td");
    let header2 = document.createElement("td");

    let nameHeader = document.createTextNode("Criado em");
    let valueHeader = document.createTextNode("Valor total");

    header1.appendChild(nameHeader);
    header2.appendChild(valueHeader);

    header.appendChild(header1);
    header.appendChild(header2);

    table.appendChild(header)


    if (falseTable) section.removeChild(falseTable);
    allSells.map((item, index, array) => {
        let tableRow = document.createElement("tr");
        let tableCreatedAt = document.createElement("td");
        let tableTotalValue = document.createElement("td");
        let createdAt = document.createTextNode(item.createdAt);
        let totalValue = document.createTextNode(item.totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        tableCreatedAt.appendChild(createdAt);
        tableTotalValue.appendChild(totalValue);
        tableRow.appendChild(tableCreatedAt);
        tableRow.appendChild(tableTotalValue);
        table.appendChild(tableRow);
    });

    section.appendChild(table);
}

const finalizeSell = () => {
    let table = document.querySelector("#view table");
    workerCashier.createSell(...productsObj);
    alert('venda finalizada!');
    document.location.reload();
};