const RegisterForm = document.getElementById("RegisterForm");
const LoginForm = document.getElementById("LoginForm");
const LogOut = document.getElementById("LogOut");

auth.onAuthStateChanged((user) => {
  if (user) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var Position = {
          lat: position.coords.latitude, // GETS LATITUDE
          lng: position.coords.longitude, // GETS LONGITUDE
        };
        // UPDATES USUARIOS DATA
        db.collection("usuarios").doc(user.uid).update({coordenadas: {latitude: position.coords.latitude,longitude: position.coords.longitude,},});
      });
    }
    // GETS USUARIOS DATA
    db.collection("usuarios").onSnapshot((snapshot) => {
      LoadFriends(snapshot.docs); // LOADS FRIENDS DATA 
      ConfigurationMenu(user); }, // LOADS CONFIGURATION DATA 
      (Error) => {
        console.log(Error.message); // LOGS ALL ERROR
      }
    );
  } else {
    LoadFriends([]); // LOADS FRIENDS DATA 
    ConfigurationMenu(); // LOADS CONFIGURATION DATA 
  }
});



RegisterForm.addEventListener("submit", (Event) => {
  Event.preventDefault(); // STOPS PAGE FROM RELOADING
  const Email = RegisterForm["RegisterEmail"].value; // GETS THE CURRENT VALUE
  const Password = RegisterForm["RegisterPassword"].value; // GETS THE CURRENT VALUE
  auth
    .createUserWithEmailAndPassword(Email, Password)
    .then((Credentials) => {
      return db.collection("usuarios").doc(Credentials.user.uid).set({
        nombre: RegisterForm["RegisterName"].value, // GETS THE CURRENT VALUE
        telefono: RegisterForm["RegisterPhone"].value, // GETS THE CURRENT VALUE
        direccion: RegisterForm["RegisterAddress"].value, // GETS THE CURRENT VALUE
      });
    })
    .then(() => {
      $("#registratemodal").modal("hide");
      RegisterForm.reset(); // RESETS THE FORM
      RegisterForm.querySelector(".error").innerHTML = ""; // CLEARS THE CURRENT INFORMATION
    })
    .catch((Error) => {
      console.log(Error); // LOGS ALL ERRORS
      RegisterForm.querySelector(".error").innerHTML = mensajeError(Error.code);
    });
});

LogOut.addEventListener("click", (Event) => {
  Event.preventDefault(); // STOPS PAGE FROM RELOADING
  auth.signOut().then(() => {
    alert("El usuario ha salido del sistema");
  });
});

function mensajeError(MessageCode) {
  let ErrorMessage = "";

  switch (MessageCode) {
    case "auth/wrong-password":
      ErrorMessage = "Su contraseña no es correcta";
      break;
    case "auth/user-not-found":
      ErrorMessage = "El usuario no existe o el Email no esta registrado";
      break;
    case "auth/weak-password":
      ErrorMessage = "Contraseña débil debe tener al menos 6 caracteres";
      break;
    default:
      ErrorMessage = "Ocurrió un error al ingresar con este usuario";
  }
  return ErrorMessage;
}


LoginForm.addEventListener("submit", (Event) => {
  Event.preventDefault(); // STOPS PAGE FROM RELOADING
  let Email = LoginForm["Email"].value; // GETS THE CURRENT VALUE
  let Password = LoginForm["Password"].value; // GETS THE CURRENT VALUE

  auth
    .signInWithEmailAndPassword(Email, Password)
    .then((Credentials) => {
      $("#ingresarmodal").modal("hide");
      LoginForm.reset(); // RESETS THE FORM
      LoginForm.querySelector(".error").innerHTML = ""; // CLEARS THE CURRENT INFORMATION
    })
    .catch((Error) => {
      LoginForm.querySelector(".error").innerHTML = mensajeError(Error.code);
      console.log(Error); // LOGS ALL ERRORS
    });
});

GoogleAuthentification = () => {
  var Provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(Provider).then(function (result) {
      var user = result.user;
      const html = `
                <p>Nombre: ${user.displayName}</p>
                <p>Correo: ${user.email}</p>
                <img src="${user.photoURL}" width="50px">
            `;
            
      AccountData.innerHTML = html;
      $("#ingresarmodal").modal("hide");
      LoginForm.reset(); // RESETS THE FORM
      LoginForm.querySelector(".error").innerHTML = ""; // CLEARS THE CURRENT INFORMATION
    })
    .catch(function (error) {
      console.log(error); // LOGS ALL ERRORS
    });
};
