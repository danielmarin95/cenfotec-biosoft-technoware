const path = require('path');
const options = {
    root: path.join(__dirname, '../views')
};

const User = require('../models/usuario');

exports.getLogin = (req, res) => {

    const fileName = 'formularioLogin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.postLogin = async (req, res) => {
    const cedula = req.body.loginName;
    const password = req.body.password;

    try{
        const user = await User.findOne({ 
            cedula: cedula,
            password: password,
            estado: 'activo'
        });
        if(!user){
            res.status(401).send({message: 'Usuario no encontrado'});
            return;
        }
        res.status(200).send({
            message: 'Usuario encontrado',
            id: user.id,
            cedula: user.cedula,
            nombre: user.nombre,
            apellido: user.apellidos,
            email: user.email,
            telefono: user.telefono,
            tipoUsuario: user.tipoUsuario,
            foto: user.foto
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({message: 'Error en el servidor'});
    }
};


/**
 * Retrieve the administrator´s profile
 * 
 * @param {*} req 
 * @param {*} res view of the administrator´s profile
 */
exports.getAdminProfile = (req, res) => {
    const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
};

/**
 * Retrieve the vendor´s profile
 * 
 * @param {*} req 
 * @param {*} res view of the venfor´s profile
 */
exports.getVendorProfile = (req, res) => {
  const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


exports.getReportUserAdmin = (req, res) => {

    const fileName = 'reporteProductosAdmin.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

/**
 * Retrieve the client's profile
 * 
 * @param {*} req 
 * @param {*} res view of the client's profile
 */
exports.getClientProfile = (req, res) => {
    const fileName = 'UserProfile.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });

};

/**
 * Retrieve the user´s info.
 * According to the id obtained from <code>localstore.getitem(idUsuario)</code> the info for the user is retrieved.
 * 
 * @param {*} req 
 * @param {*} res 
 * @see postLogin
 * @see routes/admin.js
 * @see public/js/formularioLogin.js
 */
exports.getUserData = async (req, res) =>{
    let user = null
    try {
        const id = req.params.id;
        user = await User.findById(id).populate(`tramo`);

        if(!user.foto){
            user.foto = "../resources/images/home/lupa.png";
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        console.log("Usuario no encontrado");
    }
};

/**
 * Update the user's info.
 * First validate the body and confirm it includes data to be udpated <code>if(!req.body)</code>. Then it takes the id and tramoID from the body. For all users it updates the common fields in <code>User.findByIdAndUpdate</code>. If the user is a vendor it updates the fields for vendor in <code>if(tramoID)</code> 
 * @param {*} req 
 * @param {*} res 
 * @returns
 * @see public/js/UserProfile.js 
 */
exports.putUserData = async(req, res) =>{

    if(!req.body){
        console.log("No se envió el cuerpo del correo");
        res.status(400).send("Falta el cuerpo de la solicitud");
      }
      
    try {
        const {id, tramoID} = req.body;
        let userUpdated = null; 

        userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true}).populate("tramo");

        if(!userUpdated){
            console.log("Usuario no encontrado");
            return res.status(400).send("Usuario no encontrado")
        };

        if(tramoID){
            userUpdated.tramo.nombre = req.body.tramoNombre;
            userUpdated.tramo.direccion = req.body.tramoDireccion;
    
            userUpdated = await userUpdated.tramo.save();
        }

        console.log(`Usuario ${userUpdated.id} actualizado.`);
        res.status(200).send(userUpdated);
    } catch (error) {
        console.error(error);
        res.status(501).send("Hubo un error. No se pueden actualizar los datos");
    }
};

exports.getRestaurarContrasena = (req, res) => {
    const fileName = 'contrasenarest.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getRegistroCliente = (req, res) => {
    const fileName = 'RegistroCliente.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}


//Registro Vendedor
exports.getRegistroVendedor = (req, res) => {
    const fileName = 'RegistroVendedor.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}

exports.getResetPassword = (req, res) => {
    const fileName = 'restablecercont.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}