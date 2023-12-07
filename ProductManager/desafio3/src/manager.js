import { ProductManager } from "./ProductManager.js";

let miPrimeraTienda = new ProductManager("./products.json");

//title, description, price, thumbnail, code, stock
miPrimeraTienda.addProduct(
  "Cereales",
  "Cereales Nesquik",
  1200,
  "https://saborlatinostore.com/wp-content/uploads/2022/11/ALMNES1364.jpg",
  "005",
  18
);
miPrimeraTienda.addProduct(
  "Avena",
  "Avena Arrollada",
  2000,
  "https://http2.mlstatic.com/D_NQ_NP_768427-MLA48685247018_122021-O.webp",
  "002",
  10
);
miPrimeraTienda.addProduct(
  "Proteina",
  "Proteina en polvo",
  12200,
  "https://farmacityar.vtexassets.com/arquivos/ids/243162/143033_suplemento-dietario-whey-protein-sabor-vainilla-en-polvo-x-1000-g__imagen-1.jpg?v=638211443455570000",
  "003",
  10
);