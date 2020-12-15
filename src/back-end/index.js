class product {
    constructor() {}
    productId() { //pronto
        localStorage.setItem('productId', localStorage.getItem('productId')?Number(localStorage.getItem('productId'))+1:0);
        return Number(localStorage.getItem('productId'));
    };
    allProducts() { //pronto
        if (localStorage.getItem('products')) {
            return JSON.parse(localStorage.getItem('products'));
        } else {
            console.log('products null');
            return { error: 'products null' };
        };
    };
    findProductById(id) { //pronto
        id = Number(id);
        if (localStorage.getItem('products')) {
            let value;
            JSON.parse(localStorage.getItem('products')).forEach((item, index) => {
                if (item.id === id) {
                    value = {data: item, index};
                };
            });
            return value;
        } else {
            console.log('products null');
            return { error: 'products null' };
        };
    };
    findProductByCode(code) { //pronto
        if (localStorage.getItem('products')) {
            let value;
            JSON.parse(localStorage.getItem('products')).forEach((item, index) => {
                if (item.code === code) {
                    value = {data: item, index};
                };
            });
            return value;
        } else {
            return { error: 'products null' };
        };
    };
    createProduct(name, description, code, unitValue) { //pronto
        try {
            const productId = this.productId();
            const product = {id: productId, name, description, code, unitValue: Number(unitValue), createdAt: new Date().toLocaleString("pt-BR"), updatedAt: null};
            let findProduct = this.findProductByCode(code)
            if (findProduct && findProduct.data && !findProduct.error) {
                localStorage.setItem('productId', localStorage.getItem('productId')?Number(localStorage.getItem('productId'))-1:0);
                return {data: this.findProductByCode(code).data, error: 'product already created'}
            };
            if (localStorage.getItem('products')) {
                let products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));
            } else {
                localStorage.setItem('products', JSON.stringify([product]));
            };
            return localStorage.getItem('products');
        } catch (e) {
            localStorage.setItem('productId', localStorage.getItem('productId')?Number(localStorage.getItem('productId'))-1:0);
            console.log('error:' + e);
            return { error: e };
        };
    };
    updateProduct(id, data) { //pronto
        try {
            const product = this.findProductById(id);
            if (product.data) {
                if (data.name) product.data.name = data.name;
                if (data.description) product.data.description = data.description;
                if (data.code) product.data.code = data.code;
                if (data.unitValue) product.data.unitValue = Number(data.unitValue);
                product.data.updatedAt = new Date().toLocaleString("pt-BR");
                let products = JSON.parse(localStorage.getItem('products'));
                products.splice(product.index, 1, product.data);
                localStorage.setItem('products', JSON.stringify(products));
            }
        } catch (e) {
            //localStorage.setItem('productId', localStorage.getItem('productId')?Number(localStorage.getItem('productId'))-1:0);
            console.log('error:' + e);
            return { error: e };
        };
    };
    deleteProduct(id) {
        try {
            const product = this.findProductById(id);
            var products = JSON.parse(localStorage.getItem('products'))
            products.splice(product.index, 1);
            localStorage.setItem('products', JSON.stringify(products));
        } catch (e) {
            // localStorage.setItem('productId', localStorage.getItem('productId')?Number(localStorage.getItem('productId'))-1:0);
            console.log('error: ' + e);
            return { error: e };
        }
    }
};

class sell {
    constructor() {};
    sellId() { //pronto
        localStorage.setItem('sellId', localStorage.getItem('sellId')?Number(localStorage.getItem('sellId'))+1:0);
        return Number(localStorage.getItem('sellId'));
    };
    allSells() { //pronto
        if (localStorage.getItem('sellHistory')) {
            return JSON.parse(localStorage.getItem('sellHistory'));
        } else {
            console.log('sells null');
            return { error: 'sells null' };
        };
    };
    findSellById(id) { //pronto
        if (localStorage.getItem('sellHistory')) {
            let value;
            JSON.parse(localStorage.getItem('sellHistory')).forEach((item, index) => {
                if (Number(item.id) === Number(id)) {
                    value = {data: item, index};
                };
            });
            return value;
        } else {
            console.log('sell null');
            return { error: 'sell null' };
        };
    };
    createSell(...args) { //pronto
        try {
            let totalValue = 0;
            args = args.map((item) => {
                item.totalValue = item.value * item.quantity;
                totalValue += item.totalValue;
                return item;
            });

            // const today = `${dateT[0]}-${month+1}-${dateT[1]}`;
            const sell = {id: this.sellId(), products: args, totalValue, createdAt: new Date().toLocaleString("pt-BR"), updatedAt: null}
            if (!localStorage.getItem('sellHistory')) {
                localStorage.setItem('sellHistory', JSON.stringify([sell]));
            } else {
                const sellHistory = JSON.parse(localStorage.getItem('sellHistory'));
                sellHistory.push(sell);
                localStorage.setItem('sellHistory', JSON.stringify(sellHistory));
            };
            return JSON.parse(localStorage.getItem('sellHistory'));
        } catch (e) {
            console.log('error:' + e);
            return { error: e };
        };
    };
};