import { User } from "./types";
import { Product } from "./types";

let bancoDeDadosUsuarios: Array<User> = []
let bancoDeDadosProdutos: Product[] = []
let i: number

export function createUser(name: string, email: string, password: string) {   
    const newUser: User = {
        id: contadorUser,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    }

    bancoDeDadosUsuarios.push(newUser)

    return bancoDeDadosUsuarios
}

// Acho que seria a lógica para o id??
let contadorUser:number
for (i = 0; i <= bancoDeDadosUsuarios.length; i++) {
    contadorUser = i
}

export function getAllUsers() {
    return bancoDeDadosUsuarios
}

export function createProduct(name: string, price: number, description: string, imageUrl: string) {
    const newProduct: Product = {
        id: contadorProduct,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }

    bancoDeDadosProdutos.push(newProduct)
    return bancoDeDadosProdutos
}

let contadorProduct:number
for (i = 0; i <= bancoDeDadosProdutos.length; i++) {
    contadorProduct = i
}

export function getAllProduct() {
    return bancoDeDadosProdutos
}

export function searchProductsByName(name: string) {
    const findProduct = bancoDeDadosProdutos.find((product) => {
        if (product.name.toUpperCase() === name.toUpperCase()) {
            return product
        }
    })
    return findProduct
}
