import express, { Request, Response } from 'express'
import cors from 'cors';
import { Product, User } from './types';
import { emit } from 'process';
import { db } from './database/knex';

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

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/product', async (req: Request, res: Response) => {
    try {

        const result = await db("product")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/product/:name', async (req: Request, res: Response) => {
    try {

        const nameProduct = req.params.name as string 
        console.log(nameProduct)

        const productExist = await db("product").whereLike("name",`%${nameProduct}%`)
        console.log(productExist)

        if(productExist.length === 0){
            res.statusCode = 400
            throw new Error("Esse produto não é existe.")
        }

        res.status(200).send(productExist)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const idSearchPurchase = req.params.id as string;

        const [purchaseExist] = await db("purchases").where({ id: idSearchPurchase });

        if (purchaseExist === undefined) {
            res.status(404).send("Compra não encontrada.");
            return;
        }

        const [resultPurchaseUser] = await db.select(
            "purchases.id AS purchaseId ",
            "purchases.buyer AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt"
        )
            .from("purchases")
            .innerJoin('users', "purchases.buyer", "=", "users.id")
            .where('purchases.id', '=', idSearchPurchase)

        const resultPurchaseProduct = await db
            .select(
                "purchase_products.product_id AS productsId",
                "purchase_products.quantity AS quantity"
            )
            .from("purchase_products")
            .innerJoin("product", "purchase_products.product_id", "=", "product.id")
            .where('purchase_products.purchase_id', '=', idSearchPurchase)

        const resultTotal = {
            ...resultPurchaseUser,
            products: resultPurchaseProduct
        };

        // for (let descricao of resultPurchaseUser) {
        //     const [descriptionThePurchase] = await db('purchases').where({ id: descricao.id });
        //     resultTotal.push(
        //         { purchaseDetails: descricao, productDetails: descriptionThePurchase },
        //         ...resultPurchaseProduct
        //     );
        // }
        console.log(resultPurchaseUser)
        console.log(resultPurchaseProduct)

        res.status(200).send(resultTotal);
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Criar  um novo produto
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        const userExist = await db.raw(`
           SELECT * FROM users
           WHERE id = '${id}';
       `)

        // Validação
        if (id && name && email && password) {

            //ID
            if (typeof id !== "string") { //OK
                res.statusCode = 400
                throw new Error("O id deve ser do tipo 'string'.")
            } if (id.length <= 2) { //OK
                res.statusCode = 400
                throw new Error("O id deve ter 3 digitos, exemplo: a000.")
            }
            if (userExist.id === id) { // OK
                res.statusCode = 400
                throw new Error("Esse email já está cadastrado, tente outro novamente.")
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


            if (userExist.email === email) { // OK
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

        if (!userExist) {
            res.status(400)
            throw new Error("Esse usuário já existe")
        }

        const newUser = {
            id,
            name,
            email,
            password,
            created_at: new Date().toISOString()
        }

        await db("users").insert(newUser)
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
app.post('/product', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        const productExist = await db.raw(`
           SELECT * FROM product
           WHERE id = '${id}';
        `)

        if (id && name && price && description && imageUrl) {

            //Id
            if (typeof id !== "string") { //OK
                res.statusCode = 400
                throw new Error("O id deve ser do tipo 'string'.")
            } if (id.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O id deve ter 4 digitos, exemplo: 000.")
            }
            if (productExist.id === id) { //OK
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
            if (productExist.name === name) { //OK
                res.statusCode = 400
                throw new Error("Esse id já está cadastrado, tente outro novamente.")
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

        if (!productExist) {
            res.status(400)
            throw new Error("Esse usuário já existe")
        }

        const newProduct = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        await db('product').insert(newProduct)

        res.status(201).send("Produto Cadastrado com Sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Criar  um novo pedido
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const buyer = req.body.buyer as string
        const products = req.body.products
        // const totalPrice = req.body.total_price as number
        console.log(products)

        const [purchaseExist] = await db("purchases").where({ id: id })

        if (purchaseExist) {
            res.status(400)
            throw new Error("O pedido já existe")
        }

        if (id && buyer) {

            //Id
            if (typeof id !== "string") { //OK
                res.statusCode = 400
                throw new Error("O id deve ser do tipo 'string'.")
            } if (id.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O id deve ter 4 digitos, exemplo: 000.")
            }

            //name
            if (typeof buyer !== "string") {//OK
                res.statusCode = 400
                throw new Error("O buyer deve ser do tipo 'string'.")
            } if (buyer.length < 2) { //OK
                res.statusCode = 400
                throw new Error("O buyer deve ter mais que 2 caracteres'.")
            }

        } else {
            res.statusCode = 400
            throw new Error("Para criar um novo deverá ter um id, name, price, description, imageUrl.")
        }

        // -------------
        const resultProducts = []
        let totalPrice = 0

        for (let prod of products) {
            console.log(prod)
            const [product] = await db('product').where({ id: prod.id })
            if (!product) {
                res.status(400)
                throw new Error(`${prod.id} não encontrado`)
            }

            resultProducts.push({
                ...product,
                price: product.price,
                quantity: prod.quantity
            })
        }

        for (let product of resultProducts) {
            totalPrice += product.price * product.quantity
        }

        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice,
            created_at: new Date().toISOString()
        }

        await db('purchases').insert(newPurchase)

        for (let product of products) {
            const newPurchaseProducts = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }
            console.log(product)
            await db('purchase_products').insert(newPurchaseProducts)
        }

        res.status(201).send("Pedido Feito com Sucesso!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//Delete the user
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const deleteUserById = req.params.id

        // Procurar se existe ou não 
        const [userExist] = await db.select("*").from('users').where({ id: deleteUserById })

        //SE não existir, mostre um erro
        if (!userExist) {
            res.statusCode = 400
            throw new Error("Esse produto não existe.")
        }

        await db.delete().from('users').where({ id: deleteUserById })

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
app.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const deleteProductById = req.params.id

        // Procurar se existe ou não 
        const [productExist] = await db.select("*").from('product').where({ id: deleteProductById })

        //SE não existir, mostre um erro
        if (!productExist) {
            res.statusCode = 400
            throw new Error("Esse produto não existe.")
        }

        await db.delete().from('product').where({ id: deleteProductById })
        res.status(200).send("O produto foi deletado!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

//Delete the purchase
app.delete('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const deletePurchaseById = req.params.id

        // Procurar se existe ou não 
        const [purchaseExist] = await db("purchases").where({ id: deletePurchaseById });
        console.log(purchaseExist)

        //SE não existir, mostre um erro
        if (!purchaseExist) {
            res.statusCode = 400
            throw new Error("Esse produto não existe.")
        }

        await db.delete().from("purchases").where({ id: deletePurchaseById })
        res.status(200).send("O pedido foi deletado!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// Edit the product
app.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const editProductById = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        const [productExist] = await db.select("*").from('product').where({ id: editProductById })

        //Validação
        if (productExist) {
            //NewId
            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    res.statusCode = 400
                    throw new Error(" O price deve ser do tipo 'number'.")
                }
                if (newId.length < 3) {
                    res.statusCode = 400
                    throw new Error("O price não pode ser negativo.")
                }
                if (productExist.id !== newId) {
                    res.statusCode = 400
                    throw new Error("Esse id já existe.")
                }
            }

            //NewName
            if (newName !== undefined) {
                if (typeof newName !== "string") {
                    res.statusCode = 400
                    throw new Error(" O price deve ser do tipo 'number'.")
                }
                if (newName.length < 2) {
                    res.statusCode = 400
                    throw new Error("O price não pode ser negativo.")
                }
            }

            //NewPrice
            if (newPrice !== undefined) {
                if (typeof newPrice !== "number") {
                    res.statusCode = 400
                    throw new Error(" O price deve ser do tipo 'number'.")
                }
                if (newPrice < 0) {
                    res.statusCode = 400
                    throw new Error("O price não pode ser negativo.")
                }
            }

            //NewDescription
            if (newDescription !== undefined) {
                if (typeof newDescription !== "string") {
                    res.statusCode = 400
                    throw new Error("O description deve ser do tipo 'string'.")
                }
                if (newDescription.length < 10) {
                    res.statusCode = 400
                    throw new Error("O description deve ter mais que 10 caracteres.")
                }
            }

            //NewImageURL
            if (newImageUrl !== undefined) {

                if (typeof newImageUrl !== "string") {
                    res.statusCode = 400
                    throw new Error("A imageUrl deve ser do tipo 'string'.")
                }

                const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                const isValidUrl = regexURL.test(newImageUrl)
                if (!isValidUrl) {
                    res.statusCode = 400
                    throw new Error("A imageUrl deve ter uma url, exemplo: 'https://br.pinterest.com/' .")
                }
            }
        } else {
            res.statusCode = 400
            throw new Error("Não existe esse produto.")
        }

        const updatedProduct = {
            id: newId || productExist.id,
            name: newName || productExist.name,
            price: isNaN(Number(newPrice)) ? productExist.price : newPrice as number,//Esse as number está forçando a tipagem ser do newPrice ser number
            description: newDescription || productExist.description,
            image_url: newImageUrl || productExist.image_url,
        }

        await db("product").update(updatedProduct).where({ id: editProductById })

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})






