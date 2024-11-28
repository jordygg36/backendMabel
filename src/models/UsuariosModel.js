class UsuariosModel{
    #OrienDB;

    constructor(){
        Object.preventExtensions(this);
    
        }
    
        defineModel = async(OrientDB)=>{
            this.#OrienDB = await OrientDB;
        }

        fetchUserAll = async()=>{
         let session= await this.#OrienDB.pool.acquire();
         let [data,Publicacion] = await Promise.all([
            session.select().from('Usuario').all(),
            session.select().from('Publicacion').all(),
         ]);
            
             console.log(data);
             console.log(Publicacion);

        //session.close();
        //return data;

        }
    
        CreateUser = async()=>{
           
        }
    
        UpdtaeUser = async()=>{
    
        }
    
        deleteUser = async()=>{
    
        }
    
    
    }
    
    module.exports = UsuariosModel = new UsuariosModel();