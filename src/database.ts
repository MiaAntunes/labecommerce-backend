import { Product, User } from "./types";

export const userEcommerce:User[] = [
    {
        id:"001",
        name: "Camila Antunes",
        email: "camilaantunes@email.com",
        password: "yTM25Q$9U0Gh",
        createdAt: new Date().toISOString()
    },
    {
        id:"002",
        name: "aLis Silva",
        email: "lissilva@email.com",
        password: "yTM25Q$9U0Gh",
        createdAt: new Date().toISOString()
    },
    {
        id:"003",
        name: "Mika",
        email: "mika@email.com",
        password: "^2opXylyS6Y1",
        createdAt: new Date().toISOString()
    },
    {
        id:"004",
        name: "Olivia ",
        email: "olivia@email.com",
        password: "@3p#7XHj2^dy",
        createdAt: new Date().toISOString()
    },
    {
        id:"005",
        name: "Layla",
        email: "layla@email.com",
        password: "KIK3jdke!23",
        createdAt: new Date().toISOString()
    },
    {
        id:"006",
        name: "Hugo",
        email: "hugo@email.com",
        password: "MikPja3264!",
        createdAt: new Date().toISOString()
    }
]

export const productEcommerce:Product[] = [
    {
        id:"001",
        name:"Mouse sem fio Logitech MX Master 3S",
        price: 630,
        description:"Resolução máxima de 8000 DPI. Até 70 dias com uma carga completa. Bateria recarregável (500mAh). Conexão com até 3 dispositivos. 3 horas de uso com uma carga de 1 minuto. Tecnologia sem fio avançada de 2,4 GHz. Tracking em qualquer superficíe. Cliques Silenciosos. Rolagem MagSpeed. Design Ergonômico. Resolução máxima de 8000 DPI. Até 70 dias com uma carga completa. Bateria recarregável (500mAh). 3 horas de uso com uma carga de 1 minuto. Tecnologia sem fio avançada de 2,4 GHz. COMPATIBILIDADE Windows 10,11 ou superior macOS 10.15 ou superior iOS 13.4 ou superior iPadOS 14 ou superior Linux Chrome OSTM AndroidTM 5.0 ou superior BLUETOOTH® Tecnologia Bluetooth de baixa energia.",
        imageUrl:"https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg"
    },
    {
        id:"002",
        name:"Notebook Gamer Acer NITRO 5 Intel Core i5-12450H, 8GB RAM, GeForce RTX3050, 512GB SSD, 15.6 Full HD, Windows 11 Home, Preto",
        price: 4899.99,
        description:"A fase avançada do seu jogo chegou! Esteja preparado com o notebook gamer Acer Aspire Nitro 5. Com ele, não existe game difícil, existe game brutal! A super placa de vídeo NVIDIA® GeForce® RTX™ garante a performance que você precisa para surpreender seus adversários e jogar com alto nível de realismo. Gráficos realistas, imagens que fluem e muita emoção a cada jogada.",
        imageUrl:"https://images.kabum.com.br/produtos/fotos/459635/notebook-gamer-acer-nitro-5-intel-core-i5-12450h-8gb-ram-geforce-rtx3050-512gb-ssd-15-6-full-hd-windows-11-home-preto-an515-58-54uh_1686951969_p.jpg"
    },
    {
        id:"003",
        name:"Macbook 16 polegadas",
        price: 4899.99,
        description:"A fase avançada do seu jogo chegou! Esteja preparado com o notebook gamer Acer Aspire Nitro 5. Com ele, não existe game difícil, existe game brutal! A super placa de vídeo NVIDIA® GeForce® RTX™ garante a performance que você precisa para surpreender seus adversários e jogar com alto nível de realismo. Gráficos realistas, imagens que fluem e muita emoção a cada jogada.",
        imageUrl:"https://images.kabum.com.br/produtos/fotos/459635/notebook-gamer-acer-nitro-5-intel-core-i5-12450h-8gb-ram-geforce-rtx3050-512gb-ssd-15-6-full-hd-windows-11-home-preto-an515-58-54uh_1686951969_p.jpg"
    },
]