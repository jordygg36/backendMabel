const express = require('express');

class Router{
    #router;
    #usuarioControllers;
    constructor() {
        this.#router=express.Router();
        Object.preventExtensions(this);
    }

    attachControllers = async(ousuariosControllers)=>{
        this.#usuarioControllers = ousuariosControllers;
    }

    prepareRouting =async()=>{
        this.#router.get('/usuarios',this.#usuarioControllers.fetchUser);
        this.#router.get('/get',this.#usuarioControllers.CreateUser );
        this.#router.post('/update',this.#usuarioControllers.UpdateUser );
        this.#router.post('/post',this.#usuarioControllers.deleteUser );
    }

    getRouter = () =>{
        return this.#router;
    }




}
module.exports = Router;