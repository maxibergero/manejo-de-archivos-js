import {promises as fs} from 'fs'

class ProductManager{

    constructor(){
        this.path = './productos.json'
    }

    async buscarIdMayor() {
        let mayor = 0;
      
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      
        products.forEach((producto) => {
          const { id } = producto;
          if (id > mayor) {
            mayor = id;
          }
        });
      
        return mayor;
      }

      async addProduct (product) {
        try {
          const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
          const producto = prods.find((prod) => prod.id === product.id);
      
          if (producto) {
            console.log('El producto ya existe');
          } else {
            product.id = await this.buscarIdMayor() + 1;
            prods.push(product);
            await fs.writeFile(this.path, JSON.stringify(prods));
            console.log('Producto agregado correctamente.');
          }
        } catch (error) {
          console.error('Error al agregar producto:', error);
        }
      };

      async getProducts() {
        const prods = JSON.parse( await fs.readFile(this.path, 'utf-8'));
        console.log(prods)
    }
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path,'utf-8'))
        const producto = prods.find(prod => prod.id === id)
    
        if(producto){
            console.log(producto)
        }
        else{
            console.log('El producto no existe')
        }
    }
    async updateProduct(id, product){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const indice = prods.findIndex((prod) => prod.id === id);
    
        if(indice != -1){
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price = product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].code = product.code
            prods[indice].stock = product.stock
            
            await fs.writeFile(this.path, JSON.stringify(prods));
        }else{
            console.log('Producto no encontrado!!')
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const producto = prods.find((prod) => prod.id === id);
    
        if(producto){
            await fs.writeFile(this.path, JSON.stringify(prods.filter((prod) => prod.id != id)))
    
        }else{
            console.log('Producto no encontrado')
        }
    }



}

class Producto{

    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const prod2 = new Producto("Arroz", "Arroz fino", 99, "sin", "AA100", 900)

const productManager = new ProductManager();

productManager.deleteProduct(2)



