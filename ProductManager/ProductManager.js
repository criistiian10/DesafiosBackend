const fs = require('fs')

class ProductManager {

    constructor(ruta) {
        //En lugar de utilizar this.path utilizo ruta
        this.ruta = ruta
    }

    async ObtenerPoductos() {
        if (fs.existsSync(this.ruta)) { //Si el archivo existe
            const ProductosGuardados = await fs.promises.readFile(this.ruta,'utf-8') //Leo el archivo
            return JSON.parse(ProductosGuardados) //Parseo la lectura a string JS
        } else {
            return [] 
        }
    }

    async AgregarProducto(producto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        let id
        if (!ProductosGuardados.length) {
            id = 1
        } else {
            id = ProductosGuardados[ProductosGuardados.length-1].id+1
        }
        ProductosGuardados.push({id,...producto})
        await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        console.log('Cargando Producto...')
    }

    async EditarProducto(IDProducto,CampoAActualizar,NuevoDato){
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductoAActualizar = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProductoAActualizar) {
            ProductoAActualizar[CampoAActualizar] = NuevoDato
            await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        } else {
          return 'Producto no encontrado'  
        }
    }

    async BorrarProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductosGuardadosAux = ProductosGuardados.filter(u=>u.id !== IDProducto)
        await fs.promises.writeFile(this.ruta, JSON.stringify(ProductosGuardadosAux))
    }

    async ObtenerProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProdAux = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProdAux) {
            return ProdAux
        } else {
            return 'Producto no encontrado'
        }
    }

    async BorrarArchivo(){
        await fs.promises.unlink(this.ruta)
    }
}

//Productos
const Producto1 = {
    titulo: "Zapatillas",
    descripcion: "Zapatillas marca Nike",
    precio: 15000,
    imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/986/786/products/7b6c651a-3acb-465b-8a2e-4d9582a9d463-3d064d72af8ea9a67816610214271566-640-0.jpeg",
    codigo: "AAA001",
    stock: 33
}
const Producto2 = {
    titulo: "Campera",
    descripcion: "Campera marca bross",
    precio: 13000,
    imagen: "https://acdn.mitiendanube.com/stores/001/343/531/products/negra0-1556d049320c2c348116825165856513-640-0.jpg",
    codigo: "AAA002",
    stock: 11
}
const Producto3 = {
    titulo: "Jean",
    descripcion: "Jean color negro",
    precio: 10000,
    imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/160/193/products/jean-chupin-mujer-elastizado-wupper-modeloblack1-680d9f43d57009c39616892523378998-640-0.jpg",
    codigo: "AAA003",
    stock: 7
}
const Producto4 = {
    titulo: "Short de Boca",
    descripcion: "Short del club atletico boca juniors profesional",
    precio: 12000,
    imagen: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/150/754/products/img-20230927-wa00081-c6c0b28aeca6beeec116958234927300-1024-1024.jpg",
    codigo: "AAA004",
    stock: 3
}

const ruta = './productos.json'
async function test(){
    const PM = new ProductManager(ruta)
    await PM.AgregarProducto(Producto1)
    await PM.AgregarProducto(Producto2)
    await PM.AgregarProducto(Producto3)
    await PM.AgregarProducto(Producto4)
    console.log('---------- Obtener productos ----------')
    const aux1 = await PM.ObtenerPoductos()
    console.log(aux1);
    console.log('---------- Obtener producto por ID, el 3 ----------')
    const aux2 = await PM.ObtenerProductoPorID(3)
    console.log(aux2);
    console.log('---------- Borrar un producto, el 2 ----------')
    await PM.BorrarProductoPorID(2)
    const aux3 = await PM.ObtenerPoductos()
    console.log(aux3);
    console.log('---------- Editar un producto, el 4 ----------')
    await PM.EditarProducto(4,'codigo','pppppp')
    const aux4 = await PM.ObtenerPoductos()
    console.log(aux4);
    console.log('---------- Borro archivo ----------')
    await PM.BorrarArchivo()
}
test()