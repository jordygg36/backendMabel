//dependencias
const express =require('express')
const bodyParser =require('body-parser')
const morgan = require('morgan');
const cors= require('cors');

// importaciones de los archivos
const conf = require('../config/configbd.json'); //configuracion BD
const DBManager = require('./DBManager');// Administrador de BD

//Rutas
const Router = require('../routes/router');

//Estos son mis Modelos
const UsuariosModel =require("../models/UsuariosModel");


// Estos son mis Controladores
const usuariosControllers = require('../controllers/usuariosControllers');

class AppManager{
    #appExpress;
    #runningConfType;

    constructor(){
        this.#init();
        Object.preventExtensions(this);
    }

    #init = async () =>{
      
        this.#runningConfType = conf.DevConfig;
        this.#appExpress = express();
    }

    prepareService = async() =>{
       this.#appExpress.use(cors('origin:http://localhost:4200/'));
       this.#appExpress.use(express.json());
       this.#appExpress.use(bodyParser.json());
       this.#appExpress.use(bodyParser.urlencoded({ extended: true }));
       this.#appExpress.use(morgan('dev'));
        await this.#prepareDataBase(this.#runningConfType.db);     
        await this.#prepareRouting();
    }
    #prepareDataBase = async (dbConfig) =>{
        const oDBMan = new DBManager()
        await oDBMan.prepareDataBase(dbConfig);
        await UsuariosModel.defineModel(oDBMan.getConnection());
        
    }
   
   #prepareRouting = async () =>{
    const oRouter = new Router();
    const  ousuariosControllers  = new  usuariosControllers ();
    oRouter.attachControllers(ousuariosControllers);
       
        oRouter.prepareRouting();
        this.#appExpress.use('/api', oRouter.getRouter());

   }

    runService = async () =>{
        const thisServicePort = this.#runningConfType.service.port;
        await this.#appExpress.listen(thisServicePort, ()=>{
            console.log(`AppManager si jalo jefe en el puerto ${thisServicePort}`);
        });
    }

}

module.exports = AppManager;