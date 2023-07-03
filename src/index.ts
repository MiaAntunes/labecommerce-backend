import { createUser, searchProductsByName } from "./database";
import { getAllUsers } from "./database";
import { createProduct } from "./database";
import { getAllProduct } from "./database";

// const argumento1 = process.argv[2]
// const argumento2 = process.argv[3]
// const argumento3 = process.argv[4]

createUser("camila","camila@email.com", "kiki12345")
console.log("1° Usuario",getAllUsers())
createUser("Gui","guilherme@email.com","lili123")
console.log("2° Usuario",getAllUsers())
createUser("Mia","mia@email.com", "12345")
console.log("1° Usuario",getAllUsers())

createProduct("SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/c/mcr-blkx1-2401110.jpg")
createProduct("Monitor Ultrawide 29", 2000.99, "Em resolução Full HD (2560x1080) e oferece 33% mais espaço de tela comparado a monitores convencionais. Aproveite a tela para ver mais relatórios de uma vez durante a video-chamada.", "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/2/9/29wk600-w32120_1.jpg")

// console.log("Todos os Produtos",getAllProduct())

// console.log("Procurar o Produto", searchProductsByName("SSD gamer"))


