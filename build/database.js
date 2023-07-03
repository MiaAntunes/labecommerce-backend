"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProduct = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
let bancoDeDadosUsuarios = [];
let bancoDeDadosProdutos = [];
let i;
function createUser(name, email, password) {
    const newUser = {
        id: contadorUser,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    bancoDeDadosUsuarios.push(newUser);
    return bancoDeDadosUsuarios;
}
exports.createUser = createUser;
let contadorUser;
for (i = 0; i <= bancoDeDadosUsuarios.length; i++) {
    contadorUser = i;
}
function getAllUsers() {
    return bancoDeDadosUsuarios;
}
exports.getAllUsers = getAllUsers;
function createProduct(name, price, description, imageUrl) {
    const newProduct = {
        id: "000",
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    };
    bancoDeDadosProdutos.push(newProduct);
    return bancoDeDadosProdutos;
}
exports.createProduct = createProduct;
let contadorProduct;
for (i = 1; i <= bancoDeDadosProdutos.length; i++) {
    contadorProduct = i;
}
function getAllProduct() {
    return bancoDeDadosProdutos;
}
exports.getAllProduct = getAllProduct;
function searchProductsByName(name) {
    const findProduct = bancoDeDadosProdutos.find((product) => {
        if (product.name.toUpperCase() === name.toUpperCase()) {
            return product;
        }
    });
    return findProduct;
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map