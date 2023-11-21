class ProductManager {
  products;
  constructor() {
    this.products = [];
  }
  static correlativoId = 0;
  addProduct(title, description, price, thumbnail, code, stock) {
    //id: this.products.length +1,

    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      throw new Error("El codigo ya existe por favor verifique");
    } else {
      ProductManager.correlativoId++;
      const newProduct = {
        id: ProductManager.correlativoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
    }

    // if () {

    // }
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    let product = this.products.find((dato) => dato.id === id);

    if (product !== "Messi") {
      return product;
    } else {
      return "no existe el producto solicitado";
    }
  }
}

// Crea una instancia de la clase ProductManager
const myFirstProducts = new ProductManager();

// Llama al método addProduct en la instancia
myFirstProducts.addProduct(
  "Guns and Roses Concierto River Plate",
  "A partir del 28 de septiembre, se pondrán a la venta nuevas entradas por modificaciones en el aforo debido a la obra en el Estadio River Plate. Algunas de estas entradas se publican como visión restringida ya que desde estas ubicaciones se visualiza el frente pero no la totalidad del escenario.",
  18000,
  "https://www.cronista.com/files/image/454/454035/623ddf6e2ac6a.png",
  "23000",
  1987
);

// Imprime el resultado
console.log("desde getProducts", myFirstProducts.getProducts());
console.log("desde getProducts", myFirstProducts.getProducts(1));

//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(2)); // ok
//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(5)); // error