const UsuariosModel =require("../models/UsuariosModel")

class usuariosControllers{

constructor(){
    Object.preventExtensions(this);

    }

    fetchUser = async(req,resp)=>{
        await UsuariosModel.fetchUserAll();
     //  resp.status(200).json({msg: ' holis '});
    }

    CreateUser = async(req,resp)=>{
        console.log(req.body);
        resp.status(200).json({msg: 'holis post '});
    }

    UpdateUser = async(req,body)=>{
        console.log(req.body);
        
     
    }

    deleteUser = async(req,resp)=>{
        console.log(req.body);
        resp.status(200).json({
            msg:req.body.msg
        });
    }


}

module.exports = usuariosControllers;