const listaloggedout = document.querySelectorAll('.logged-out');
const listaloggedin = document.querySelectorAll('.logged-in');
const DatosCuenta = document.querySelector('.DatosCuenta');
const ConfigurarMenu = (user) => {
    if(user){ // SI EL USUARIO ES NULL
       db.collection('usuarios').doc(user.uid).get().then( doc =>{
           const CodigoHTML = `
               <p>Nombre: ${ doc.data().nombre }</p>
               <p>Correo: ${ user.email}</p>
               <p>Telefono: ${ doc.data().telefono }</p>
               <p>Direccion: ${ doc.data().direccion }</p>
           `;
           DatosCuenta.innerHTML = CodigoHTML;
       }); // MOSTRAR LOS DATOS DEL USUARIO
       listaloggedin.forEach( item => item.style.display = 'block');
       listaloggedout.forEach( item => item.style.display = 'none');
    }
    else // EL USUARIO ES NULL
    {
       DatosCuenta.innerHTML = ''; // NO MOSTRAR NADA
       listaloggedin.forEach( item => item.style.display = 'none');
       listaloggedout.forEach( item => item.style.display = 'block');
    }
}





const ListaPlatillos = document.getElementById('ListaPlatillos');
const ObtenerPlatillos = (data) =>{
   if(data.length){   
       let CodigoHTML = '';
       data.forEach(doc => {
           const platillo = doc.data(); // OBTENER INFORMACION DE FIREBASE
           const columna = `
               <div class="col-12 col-md-4">
                   <img src="image/${platillo.Imagen}" alt="${platillo.Nombre}" style="width: 150px; height: 150px; transform: scale(1);">
                   <p>${platillo.Nombre}</p>
                   <p class="text-danger">$${platillo.Precio}.00 pesos</p>
                   <a href="https://www.paypal.me/grupohernandezalba/${platillo.Precio}">Pagar</a>
               </div>
           `;
           CodigoHTML += columna;
       }); // MOSTRAR PLATILLOS EN CASO DE LOGIN
       ListaPlatillos.innerHTML = CodigoHTML;
   }
   else{ // NO MOSTRAR LOS PLATILLOS EN CASO DE NO HACER LOGIN
       ListaPlatillos.innerHTML = '<p class="text-center">Ingrese con sus claves para ver los platillos.</p>';
   }
};