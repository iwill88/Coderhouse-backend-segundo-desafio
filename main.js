const fs=require('fs');

//fs.writeFileSync('./productos.txt',"")

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre
        this.id = 1
        this.contenido=""
    }

    

    async save(object)  {
      
        object["id"]=this.id
        this.id++
        console.log(object)
        let objectJSON= (this.id==2)?"["+JSON.stringify(object)+ ",":JSON.stringify(object)+ ","
        await fs.appendFile(this.nombre,objectJSON,
        err=>{
            if (err) {
                console.log("Hubo un error no se agrego el nuevo objeto",err)
            } else {
                console.log("Se guardo correctamente ",this.id)
            }
        })
}
    
    async getById(id){ 
        await fs.readFile(this.nombre,"utf-8",
        (err, contenido)=>{
            if (err) {
                console.log("Hubo un error no se leyo nada",err)
            } else {
                let ultimoCaracter = contenido.length-1
                if (contenido[ultimoCaracter]==","){
                    contenido=contenido.slice(0,ultimoCaracter)
                    contenido=contenido+"]"
                }
    
                contenido=JSON.parse(contenido)
                let seleccion=contenido.filter(e=>e.id==id)
                console.log("Se leyo correctamente el id: " +id +"\n",seleccion)

            }
        }
        )
    }
    
    async getAll(){
        await fs.readFile(this.nombre,"utf-8",
        (err, contenido)=>{
            if (err) {
                console.log("Hubo un error no se leyo nada",err)
            } else {
                let ultimoCaracter = contenido.length-1
                if (contenido[ultimoCaracter]==","){
                    contenido=contenido.slice(0,ultimoCaracter)
                    contenido=contenido+"]" 
                    contenido=JSON.parse(contenido)
                    console.log("Se leyo correctamente todo el archivo " +"\n",contenido)
                } else {
                    contenido=JSON.parse(contenido)
                    console.log("Se leyo correctamente todo el archivo " +"\n",contenido)
                }
            }
        }
        )
    }
    async deleteById(id){
        await fs.readFile(this.nombre,"utf-8",
        (err, contenido)=>{
            if (err) {
                console.log("Hubo un error no se leyo nada",err)
            } else {
                let ultimoCaracter = contenido.length-1
                if (contenido[ultimoCaracter]==","){
                    contenido=contenido.slice(0,ultimoCaracter)
                    contenido=contenido+"]"
                }
                
                contenido=JSON.parse(contenido)
                let seleccion=contenido.filter(e=>e.id!=id)
                fs.writeFile(this.nombre,JSON.stringify(seleccion),
                err=>{
                    if (err) {
                        console.log("Hubo un error no se borro el documento",err)
                    } else {
                        console.log("Se borro correctamente ",id)
                    }
                }
                )
                

            }
        }
        )
    }
    async deleteAll(){
        await fs.writeFile(this.nombre,"",
        err=>{
            if (err) {
                console.log("Hubo un error no se borro nada",err)
            } else {
                console.log("Se borro todo el contenido correctamente ")
            }
        })
    }
}

const nuevoContenedor =new Contenedor ('./productos.txt')



/*nuevoContenedor.save(
    {
    title: "Escuadra",
    price: 123.45,
    thumbnail:  'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
})

nuevoContenedor.save(
    {
    title: "Calculadora",
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
})

nuevoContenedor.save(
    {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
})*/


//nuevoContenedor.getById(3)
//nuevoContenedor.deleteById(1)
//nuevoContenedor.getAll()
nuevoContenedor.deleteAll()

