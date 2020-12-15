const workerProduct = new product();
const workerCashier = new sell();
const findProduct = workerProduct.findProductByCode;
let productsObj = [];
let totalValue = 0;
let totalQuantity = 0;

const showCashier = (...productsIds) => {
    let view = document.querySelector('.view');

    let products = productsIds.map(value => {
        return findProduct(value).data;
    });

    productsObj = {};

    products.map((product) => {
        if (productsObj[product.code]) {
            productsObj[product.code].quantity ++;
        } else {
            productsObj[product.code] = {
                id: product.id,
                name: product.name,
                code: product.code,
                value: Number(product.unitValue),
                quantity: 1
            }
        };
    });

    productsObj = products.map(value => {
        if (productsObj[value.code]) {
            return productsObj[value.code];
        }
    }).filter(function(value, i, arr) {
        return arr.indexOf(value) === i;
    });

    totalQuantity = 0;
    totalValue = 0;

    productsObj.map((item) => {
        totalValue += (item.value*item.quantity)
        totalQuantity += item.quantity
    })

    let valueInput = document.querySelector('#value');
    let quantityInput = document.querySelector('#quantity');

    valueInput.value = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    quantityInput.value = totalQuantity;

    let section = document.querySelector("#view");

    let falseTable = document.querySelector("#view table");
    
    let table = document.createElement("table");

    let header = document.createElement("tr");
    let header1 = document.createElement("th");
    let header2 = document.createElement("th");
    let header3 = document.createElement("th");
    let header4 = document.createElement("th");

    let nameHeader = document.createTextNode("Nome");
    let codeHeader = document.createTextNode("Código");
    let quantityHeader = document.createTextNode("Quantidade");
    let valueHeader = document.createTextNode("Valor");

    header1.appendChild(nameHeader);
    header2.appendChild(codeHeader);
    header3.appendChild(quantityHeader);
    header4.appendChild(valueHeader);

    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);

    table.appendChild(header);


    if (falseTable) section.removeChild(falseTable);
    productsObj.map((item, index, array) => {
        let tableRow = document.createElement("tr");
        let tableName = document.createElement("td");
        let tableCode = document.createElement("td");
        let tableQuantity = document.createElement("td");
        let tableValue = document.createElement("td");
        let name = document.createTextNode(item.name);
        let code = document.createTextNode(item.code);
        let quantity = document.createTextNode(item.quantity + 'x');
        let value = document.createTextNode(Number(item.value*item.quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        tableName.appendChild(name);
        tableCode.appendChild(code);
        tableQuantity.appendChild(quantity);
        tableValue.appendChild(value);
        tableRow.appendChild(tableName);
        tableRow.appendChild(tableCode);
        tableRow.appendChild(tableQuantity);
        tableRow.appendChild(tableValue);
        table.appendChild(tableRow);
    });

    section.appendChild(table);

    return productsIds;
};

let before = [];

const addProduct = () => {
    let product = document.querySelector('#code #code').value.split(/[\D]/g).join('');
    if (!product || product === "") return;
    before = showCashier(...before, product);
    document.querySelector('#code #code').value = "";
};