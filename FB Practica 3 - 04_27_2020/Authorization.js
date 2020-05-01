auth.onAuthStateChanged( user =>{ // ESPERA A CAMBIOS EN EL ESTADO DE LOG DEL USUARIO
    if(user){
        db.collection('Platillos').onSnapshot(snapshot =>{
            ObtenerPlatillos(snapshot.docs); // OBTIENE CAMBIOS HECHOS EN LA BASE DE DATOS
            ConfigurarMenu(user);
        }, err => { // LOGEA CUALQUIER ERROR QUE PUEDA OCURRIR
            console.log(err.message);
        });
    }
    else{
        ObtenerPlatillos([]);
        ConfigurarMenu();
    }
});





const IdFormRegistrar = document.getElementById('IdFormRegistrar');
IdFormRegistrar.addEventListener('submit',(Evento)=>{
    Evento.preventDefault(); // EVITAR QUE SE RECARGUE LA PAGINA
    const IdFormIngresarCorreo = IdFormRegistrar['IdFormRegistroCorreo'].value; // OBTENER LOS VALORES DEL FORM
    const IdFormIngresarContrasena = IdFormRegistrar['IdFormRegistroContrasena'].value;
    auth.createUserWithEmailAndPassword(IdFormIngresarCorreo,IdFormIngresarContrasena).then( cred =>{ // CREAR USUARIO CON LAS CREDENCIALES
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: IdFormRegistrar['IdFormRegistroNombre'].value,
            telefono: IdFormRegistrar['IdFormRegistroTelefono'].value,
            direccion: IdFormRegistrar['IdFormRegistroDireccion'].value
        });
    }).then( ()=>{
        $('#IdModalRegistrar').modal('hide');
        IdFormRegistrar.reset(); // RESETEAR EL FORM
        IdFormRegistrar.querySelector('.error').innerHTML = '';
    }).catch( err => { // LOGEAR CUALQUIER ERROR QUE PUEDA OCURRIR
        IdFormRegistrar.querySelector('.error').innerHTML = mensajeError(err.code);
    });
});






const IdSalir = document.getElementById('IdSalir');
IdSalir.addEventListener('click', (Evento)=>{
    Evento.preventDefault(); // EVITAR QUE SE RECARGUE LA PAGINA
    auth.signOut().then(()=>{ // LOGOUT DE LA CUENTA
        alert("El usuario ha salido del sistema");
    });
});





function mensajeError(codigo) { // CREAR MENSAJE DE ERROR
    let mensaje = '';
    switch(codigo) {
        case 'auth/wrong-password': // EL USUARIO TIENE LA CONTRASEÑA MAL
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found': // EL USUARIO NO HA SIDO ENCONTRADO
            mensaje = 'El usuario no existe o el IdFormIngresarCorreo no esta registrado';
            break;
        case 'auth/weak-password': // EL USUARIO TIENE UNA CONTRASEÑA MUY DEBIL
            mensaje = 'Contraseña dÃ©bil debe tener al menos 6 caracteres';
            break;
        default: // MENSAJE POR DEFAULT
            mensaje = 'Ocurrio un error al ingresar con este usuario';
      }
    return mensaje;
}





const IdFormIngresar =  document.getElementById('IdFormIngresar');
IdFormIngresar.addEventListener('submit',(Evento)=>{ // FORM PARA INGRESAR A AL SISTEMA
    Evento.preventDefault();
    let IdFormIngresarCorreo = IdFormIngresar['IdFormIngresarCorreo'].value; // OBTENER VALORES DEL FORM
    let IdFormIngresarContrasena = IdFormIngresar['IdFormIngresarContrasena'].value;
    auth.signInWithEmailAndPassword(IdFormIngresarCorreo,IdFormIngresarContrasena).then( cred =>{
        $('#IdModalIngresar').modal('hide');
        IdFormIngresar.reset(); // RESETEAR EL FORM
        IdFormIngresar.querySelector('.error').innerHTML = '';
    }).catch( err => { // LOGEAR CUALQUIER ERROR QUE PUEDA OCURRIR
        IdFormIngresar.querySelector('.error').innerHTML = mensajeError(err.code);
        console.log(err);
    });
});


IngresarConGoogle = () => { // UTILIZAR GOOGLE PARA REALIZAR UN LOGIN
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user; // OBITNE LOS DATOS DEL USUARIO
            const CodigoHTML = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = CodigoHTML;
            $('#IdModalIngresar').modal('hide');
            IdFormIngresar.reset(); // RESETEA EL FORM
            IdFormIngresar.querySelector('.error').innerHTML = '';
        }).catch(function(error) { // LOGEAR CUALQUIER ERROR QUE PUEDA OCURRIR
            console.log(error);
    });
}