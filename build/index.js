"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
(0, database_1.createUser)("camila", "camila@email.com", "kiki12345");
console.log("1° Usuario", (0, database_2.getAllUsers)());
(0, database_1.createUser)("Gui", "guilherme@email.com", "lili123");
console.log("2° Usuario", (0, database_2.getAllUsers)());
(0, database_1.createUser)("Mia", "mia@email.com", "12345");
console.log("1° Usuario", (0, database_2.getAllUsers)());
(0, database_3.createProduct)("SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/c/mcr-blkx1-2401110.jpg");
(0, database_3.createProduct)("Monitor Ultrawide 29", 2000.99, "Em resolução Full HD (2560x1080) e oferece 33% mais espaço de tela comparado a monitores convencionais. Aproveite a tela para ver mais relatórios de uma vez durante a video-chamada.", "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/2/9/29wk600-w32120_1.jpg");
//# sourceMappingURL=index.js.map