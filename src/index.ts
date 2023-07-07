import express, { Request, Response } from 'express'
import cors from 'cors';
import { productEcommerce, userEcommerce } from './database';
import { Product, User } from './types';
import { emit } from 'process';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(userEcommerce)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


app.get('/product', (req: Request, res: Response) => {
    try {
        res.status(200).send(productEcommerce)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


app.get('/product/search', (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        const result = productEcommerce.filter(
            (product) => product.name.toLowerCase().includes(name.toLowerCase())
        )

        if (result === undefined) {
            res.statusCode = 400
            throw new Error("Não há esse problema.")
        } 

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Criar  um novo usuário
app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        // Validação
        if (id && name && email && password) {

            //ID
            if (typeof id !== "string") { //OK
                res.statusCode = 400
                throw new Error("O id deve ser do tipo 'string'.")
            } if (id.length < 4) { //OK
                res.statusCode = 400
                throw new Error("O id deve ter 4 digitos, exemplo: a000.")
            }
            const findUserId = userEcommerce.find((user) => user.id === id)

            if (findUserId) { //OK
                res.statusCode = 400
                throw new Error("Esse id já está cadastrado, tente outro novamente.")
            }

            // Name
            if (typeof name !== "string") {//OK
                res.statusCode = 400
                throw new Error("O name deve ser do tipo 'string'.")
            } if (name.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O name deve ser mais que 2 caractere'.")
            }


            // Email
            if (typeof email !== "string") { //OK
                res.statusCode = 400
                throw new Error(" O email deve ser do tipo 'string'.")
            }

            const findUserEmail = userEcommerce.find((user) => user.email === email)
            if (findUserEmail) { // OK
                res.statusCode = 400
                throw new Error("Esse email já está cadastrado, tente outro novamente.")
            }

            const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            const isValidEmail = regexEmail.test(email);// testando regex
            if (!isValidEmail) { // ! 
                res.statusCode = 400
                throw new Error("O email está incompleto, exemplo: 'usuario@email.com' .")
            }


            //Password 
            if (typeof password !== "string") {  // OK
                res.statusCode = 400
                throw new Error(" O password deve ser do tipo 'string'.")
            }

            const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            const isValidPassword = regexPassword.test(password)
            if (!isValidPassword) {// OK
                res.statusCode = 400
                throw new Error(" O password deve ter no mínimo 8 caractere, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e pelo menos um caractere especial.")
            }

        } else {
            res.statusCode = 400
            throw new Error("Para criar um novo deverá ter um id, name, email, password.")
        }

        const newUser: User = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }

        userEcommerce.push(newUser)

        res.status(201).send("Usuário Cadastrado com Sucesso!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Criar  um novo produto
app.post('/product', (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if (id && name && price && description && imageUrl) {

            //Id
            if (typeof id !== "string") { //OK
                res.statusCode = 400
                throw new Error("O id deve ser do tipo 'string'.")
            } if (id.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O id deve ter 4 digitos, exemplo: 000.")
            }
            const findProductId = productEcommerce.find((product) => product.id === id)
            if (findProductId) { //OK
                res.statusCode = 400
                throw new Error("Esse id já está cadastrado, tente outro novamente.")
            }

            //name
            if (typeof name !== "string") {//OK
                res.statusCode = 400
                throw new Error("O name deve ser do tipo 'string'.")
            } if (name.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O name deve ter mais que 2 caracteres'.")
            }
            const findProductName = productEcommerce.find((product) => product.name === name)
            if (findProductName) {
                res.statusCode = 400
                throw new Error(" O name já está cadastrado, tente outro novamente.")
            }

            //price
            if (typeof price !== "number") {
                res.statusCode = 400
                throw new Error("O price deve ser do tipo 'number'.")
            } if (price < 0) {
                res.statusCode = 400
                throw new Error("O price não pode ser negativo.")
            }

            //description 
            if (typeof description !== "string") {
                res.statusCode = 400
                throw new Error("O description deve ser do tipo 'string'.")
            } if (description.length < 10) {
                res.statusCode = 400
                throw new Error("O description deve ter mais que 10 caracteres.")
            }

            //imageURL
            if (typeof imageUrl !== "string") {
                res.statusCode = 400
                throw new Error("A imageUrl deve ser do tipo 'string'.")
            }

            const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
            const isValidUrl = regexURL.test(imageUrl)
            if (!isValidUrl) {
                res.statusCode = 400
                throw new Error("A imageUrl deve ter uma url, exemplo: 'https://br.pinterest.com/' .")
            }



        } else {
            res.statusCode = 400
            throw new Error("Para criar um novo deverá ter um id, name, price, description, imageUrl.")
        }

        const newProduct: Product = {
            id,
            name,
            price,
            description,
            imageUrl
        }

        productEcommerce.push(newProduct)

        res.status(201).send("Produto Cadastrado com Sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//Delete the user
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const deleteUserById = req.params.id

        const userIndex = userEcommerce.findIndex((user) => user.id === deleteUserById)

        if (userIndex >= 0) {
            userEcommerce.splice(userIndex, 1)
        } else {
            res.statusCode = 400
            throw new Error("Esse usuário não existe.")
        }

        res.status(200).send("O usuário foi deletado!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//Delete the product
app.delete('/product/:id', (req: Request, res: Response) => {
    try {
        const deleteProductById = req.params.id

        const productIndex = productEcommerce.findIndex((product) => product.id === deleteProductById)

        if (productIndex >= 0) {
            productEcommerce.splice(productIndex, 1)
        }else {
            res.statusCode = 400
            throw new Error("Esse produto não existe.")
        }

        res.status(200).send("O produto foi deletado!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Edit the product
app.put('/product/:id', (req: Request, res: Response) => {
    try {
        const editProductById = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        const product = productEcommerce.find((product) => product.id === editProductById)

        //Validação
        if (product) {

            if (newId || newName || newPrice || newDescription || newImageUrl) {
                //NewId
                if (newId !== undefined && typeof newId !== "string") {
                    res.statusCode = 400
                    throw new Error("O id deve ser do tipo 'string'.")
                }
                if (newId !== undefined && newId.length < 3) {
                    res.statusCode = 400
                    throw new Error("O id deve ter no mínimo 3 caracteres.")
                }

                const findProductId = productEcommerce.find((product) => product.id === newId)
                if (newId !== undefined && findProductId) {
                    res.statusCode = 400
                    throw new Error("Esse id já existe.")
                }


                //NewName
                if (newName !== undefined && typeof newName !== "string") {
                    res.statusCode = 400
                    throw new Error("O name deve ser do tipo 'string'.")
                }
                if (newName !== undefined && newName.length < 2) {
                    res.statusCode = 400
                    throw new Error("O name deve ter no mais que 2 caracteres.")
                }

                const findProductName = productEcommerce.find((product) => product.name === newName)
                if (newName !== undefined && findProductName) {
                    res.statusCode = 400
                    throw new Error("Esse name já existe.")
                }


                //NewPrice
                if (newPrice !== undefined && typeof newPrice !== "number") {
                    res.statusCode = 400
                    throw new Error(" O price deve ser do tipo 'number'.")
                } if (newPrice !== undefined && newPrice < 0) {
                    res.statusCode = 400
                    throw new Error("O price não pode ser negativo.")
                }


                //NewDescription
                if (newDescription !== undefined && typeof newDescription !== "string") {
                    res.statusCode = 400
                    throw new Error("O description deve ser do tipo 'string'.")
                } if (newDescription !== undefined && newDescription.length < 10) {
                    res.statusCode = 400
                    throw new Error("O description deve ter mais que 10 caracteres.")
                }


                //NewImageURL
                if (newImageUrl !== undefined && typeof newImageUrl !== "string") {
                    res.statusCode = 400
                    throw new Error("A imageUrl deve ser do tipo 'string'.")
                }

                if (newImageUrl !== undefined) {
                    const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                    const isValidUrl = regexURL.test(newImageUrl)
                    if (!isValidUrl) {
                        res.statusCode = 400
                        throw new Error("A imageUrl deve ter uma url, exemplo: 'https://br.pinterest.com/' .")
                    }
                }
            }

        } else {
            res.statusCode = 400
            throw new Error("Não existe esse produto.")
        }



        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number //Esse as number está forçando a tipagem ser do newPrice ser number
            product.description = newDescription || product.description
            product.imageUrl = newImageUrl || product.imageUrl
        }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})






