-- Criar tabela

-- TABELA DE USERS --------
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- DATETIME('now''localtime')
INSERT INTO users (id,name,email,password,created_at)
VALUES 
   ("001", "Sheldon", "sheldon@gmail.com","euSOUumGENIO0101!", DATETIME('now')),
   ("002", "Penny", "penny@gmail.com","euSOUumaATRIZ123!", DATETIME('now')),
   ("003", "Leonard", "leonard@gmail.com","IamyourFATHER!12", DATETIME('now'));

SELECT * FROM users;

-- TABELA DE PRODUTOS --------------------
CREATE TABLE product (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO product (id,name,price,description,image_url)
VALUES
     ("001","Mouse sem fio Logitech MX Master 3S",630, "Resolução máxima de 8000 DPI. Até 70 dias com uma carga completa. Bateria recarregável (500mAh). Conexão com até 3 dispositivos. 3 horas de uso com uma carga de 1 minuto. Tecnologia sem fio avançada de 2,4 GHz. Tracking em qualquer superficíe. Cliques Silenciosos. Rolagem MagSpeed. Design Ergonômico. Resolução máxima de 8000 DPI. Até 70 dias com uma carga completa. Bateria recarregável (500mAh). 3 horas de uso com uma carga de 1 minuto. Tecnologia sem fio avançada de 2,4 GHz. COMPATIBILIDADE Windows 10,11 ou superior macOS 10.15 ou superior iOS 13.4 ou superior iPadOS 14 ou superior Linux Chrome OSTM AndroidTM 5.0 ou superior BLUETOOTH® Tecnologia Bluetooth de baixa energia.", "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg"),
     ("002","Notebook Gamer Acer NITRO 5 Intel Core i5-12450H, 8GB RAM, GeForce RTX3050, 512GB SSD, 15.6 Full HD, Windows 11 Home, Preto",4899.99,"A fase avançada do seu jogo chegou! Esteja preparado com o notebook gamer Acer Aspire Nitro 5. Com ele, não existe game difícil, existe game brutal! A super placa de vídeo NVIDIA® GeForce® RTX™ garante a performance que você precisa para surpreender seus adversários e jogar com alto nível de realismo. Gráficos realistas, imagens que fluem e muita emoção a cada jogada.","https://images.kabum.com.br/produtos/fotos/459635/notebook-gamer-acer-nitro-5-intel-core-i5-12450h-8gb-ram-geforce-rtx3050-512gb-ssd-15-6-full-hd-windows-11-home-preto-an515-58-54uh_1686951969_p.jpg"),
     ("003","Notebook Apple MacBook Air, M2 da Apple, com 8 GPU, 8GB RAM, 256GB SSD, Cinza Espacial - MLXW3BZ/A",8899.99,"O MacBook Air foi desenvolvido especificamente para o novo chip M2, que combina velocidade excepcional com consumo inteligente de energia. É um laptop cheio de possibilidades, com uma estrutura de alumínio resistente, leve e ultrafina. Perfeito para trabalhar, jogar ou criar qualquer coisa que você queira em movimento.","https://images.kabum.com.br/produtos/fotos/463167/notebook-apple-macbook-air-m2-da-apple-com-8-gpu-8gb-ram-256gb-ssd-cinza-espacial-mlxw3bz-a_1685021780_p.jpg");


INSERT INTO product (id,name,price,description,image_url)
VALUES
  ("004","Cadeira Gamer Mymax MX5, Até 150kg, Com Almofadas, Reclinável, Descanso de Braço 2D, Preto e Branco - MGCH-MX5/WH",679.79,"A nova linha de Cadeira Gamer Mymax, são as mais iradas do mercado, a MX5 possui design ergonômico e revestimento em tecido sintético PU.Projetada para proporcionar conforto mesmo após horas jogando. Esse conforto foi obtido através do uso de espuma injetada de alta densidade no encosto e assento, aliado a possibilidade de inclinar o encosto em até 180° e da função balanço.","https://images.kabum.com.br/produtos/fotos/471639/cadeira-gamer-mymax-mx5-ate-150kg-com-almofadas-reclinavel-descanso-de-braco-2d-preto-e-branco-mgch-mx5-wh_1688410563_p.jpg"),
  ("005","Console Sony PS5 + God of War Ragnarök, Branco",3779,"Para você que é fanático por games, jogar não tem limites! A Sony apresenta o PlayStation 5 2022 na cor branca. Ele tem SSD com 825GB de armazenamento, 1 controle Dualsense e o jogo God of War Ragnarok instalado. O PlayStation 5 oferece novas possibilidades de jogabilidade que você nunca imaginou. Reproduza jogos para PS5 e PS4 em Blu-ray Disc. Além disso, você também pode baixar jogos digitais para PS5 e PS4 pela PlayStation Store. Experimente o carregamento extremamente rápido do SSD de ultra-velocidade, uma imersão mais profunda com suporte à resposta tátil, gatilhos adaptáveis e áudio 3D. Além de uma geração totalmente nova de jogos incríveis PlayStation. Na velocidade da luz: Domine o poder das CPU e GPU personalizadas e do SSD com E/S integradas que redefinem as regras do que o console PlayStation pode fazer. Jogos deslumbrantes: Maravilhe-se com os gráficos incríveis e experimente os recursos do novo PS5. Imersão de tirar o fôlego: Descubra uma experiência de jogos ainda mais profunda com a ajuda da resposta tátil, dos gatilhos adaptáveis e da tecnologia de áudio 3D.","https://images.kabum.com.br/produtos/fotos/magalu/459232/PlayStation-5-2022-825GB-1-Controle-Branco-Sony_1682705705_p.jpg");


SELECT * FROM product;

-- SEARCH PRODUCT
SELECT * FROM product
WHERE name LIKE '%gamer%';

-- Create User
INSERT INTO users (id,name,email,password,created_at)
VALUES 
   ("004", "Howard Wolowitz", "howard@gmail.com","euSOUumGostoso0101!", DATETIME('now'));


  --Criação da tabela de pedidos--------
  CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
  );

SELECT * FROM purchases;

SELECT 
  purchases.id,
  buyer,
  users.name,
  users.email,
  purchases.total_price,
  purchases.created_at
  purchase_products
FROM users
INNER JOIN purchases
ON purchases.buyer = users.id;
   

-- RELAÇÕES SQL

CREATE TABLE purchase_products(
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id)
    ON UPDATE CASCADE
	  ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product (id)
    ON UPDATE CASCADE
	  ON DELETE CASCADE
);


SELECT * FROM purchase_products;

SELECT * FROM purchase_products
LEFT JOIN purchases
ON purchases.id = purchase_products.purchase_id
INNER JOIN product 
ON product.id = purchase_products.product_id;

SELECT 
  purchases.id AS purchaseId,
  purchases.buyer AS buyerId,
  users.name AS buyerName,
  users.email AS buyerEmail,
  purchases.total_price AS totalPrice,
  purchases.created_at AS createdAt,
  purchase_products.product_id AS productsId,
  purchase_products.quantity AS quantitity
FROM purchase_products AS pur_por
INNER JOIN purchases AS pur
ON pur_por.purchase_id = pur.id
INNER JOIN product AS por
ON pur_por.product_id = por.id
INNER JOIN users AS u
ON pur.buyer = u.id;