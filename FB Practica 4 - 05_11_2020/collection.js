const LoggedOutList = document.querySelectorAll(".logged-out");
const LoggedInList = document.querySelectorAll(".logged-in");
const AccountData = document.querySelector(".AccountData");

const ConfigurationMenu = (user) => {
  if (user) {
    db.collection("usuarios")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
                <p>Nombre: ${doc.data().nombre}</p>
                <p>Correo: ${user.email}</p>
                <p>Teléfono: ${doc.data().telefono}</p>
                <p>Dirección: ${doc.data().direccion}</p>
                <p>Coordenadas: ${doc.data().coordenadas.latitude}, ${
          doc.data().coordenadas.longitude
        }</p>
            `;
        AccountData.innerHTML = html;
      });

    LoggedInList.forEach((item) => (item.style.display = "block")); // DISPLAYS THE LOGGED IN LIST
    LoggedOutList.forEach((item) => (item.style.display = "none")); // HIDES THE LOGGED OUT
  } else {
    AccountData.innerHTML = "";
    LoggedInList.forEach((item) => (item.style.display = "none")); // HIDES THE LOGGED IN LIST
    LoggedOutList.forEach((item) => (item.style.display = "block")); // DISPLAYS THE LOGGED OUT LIST
  }
};

const LoadFriends = (data) => {
  var propiedades = {
    center: {
      lat: 21.152639,
      lng: -101.711598,
    },
    mapTypeControlOptions: {
      mapTypeIds: [
        "roadmap",
        "satellite",
        "hybrid",
        "terrain",
        "style_map",
      ],
    },
    zoom: 13,
  };
  var GoogleStyledMap = new google.maps.StyledMapType(
    [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "labels.text",
        stylers: [
          {
            color: "#ffff00",
          },
          {
            weight: 0.5,
          },
        ],
      },
      {
        featureType: "poi.medical",
        stylers: [
          {
            color: "#0080ff",
          },
          {
            weight: 1.5,
          },
        ],
      },
      {
        featureType: "poi.medical",
        elementType: "labels.text",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "poi.park",
        stylers: [
          {
            color: "#00ff00",
          },
          {
            lightness: 50,
          },
          {
            visibility: "on",
          },
          {
            weight: 1,
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#008000",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            weight: 1,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ff0080",
          },
          {
            weight: 1.5,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
    ],
    { name: "Vista Oscura" }
  );
  var Map = document.getElementById("GoogleMap");
  var GoogleMap = new google.maps.Map(Map, propiedades);
  GoogleMap.mapTypes.set("style_map", GoogleStyledMap);
  GoogleMap.setMapTypeId("style_map"); // GETS THE CURRENT STYLED MAP ID

  data.forEach((doc) => {
    Information = new google.maps.InfoWindow();
    var Position = {
      lat: doc.data().coordenadas.latitude, // GETS LATITUDE
      lng: doc.data().coordenadas.longitude, // GETS LONGITUDE
    };
    Information.setPosition(Position); // SETS POSITION
    Information.setContent(doc.data().nombre);
    Information.open(GoogleMap);
  });
};
