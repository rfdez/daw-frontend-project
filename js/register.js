particlesJS(
  "particles-js",

  {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover"
    }
  }
);

const form = document.getElementById("registerForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

function validarParams(name, email, password) {
  ////////////////////////////////////////////////////////////////EXPRESIONES REGULARES///////////////////////////////////////////////////////////////////
  var rgName = /^[A-Za-z]+$/;
  var rgEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var rgPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

  if (!rgName.test(name)) {
    var alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <p class="lead">Introduce tu nombre, sin espacios.</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    document.getElementById("err").innerHTML += alert;
  }

  if (!rgEmail.test(email)) {
    var alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <p class="lead">El email debe ser válido.</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    document.getElementById("err").innerHTML += alert;
    //window.location.reload();
  }

  if (!rgPassword.test(password.trim())) {
    var alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <p class="lead">Mínimo una letra mayúscula, una minúscula y un número.</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    document.getElementById("err").innerHTML += alert;
  }

  if (
    rgName.test(name) &&
    rgPassword.test(password.trim()) &&
    rgEmail.test(email)
  ) {
    return true;
  }
}

function getUser(email) {
  var users = window.localStorage.getItem("users");
  var exist = false;
  JSON.parse(users).forEach(user => {
    if (user.email == email) {
      var alert = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <p class="lead">El usuario ya existe.</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
      document.getElementById("err").innerHTML += alert;
      exist = true;
    }
  });
  return exist;
}

function addUser(user) {
  var users = JSON.parse(window.localStorage.getItem("users"));
  users.push(user);
  window.localStorage.setItem("users", JSON.stringify(users));
  //Guardar variable de sesion
  window.sessionStorage.removeItem("cUser");
  window.sessionStorage.setItem("cUser", email.value);
}

form.addEventListener("submit", e => {
  document.getElementById("err").innerHTML = ``;

  if (validarParams(name.value, email.value, password.value) == true) {
    //Comprueba que no exista
    if (getUser(email.value) == false) {
      //Guardar el usuario en el local storage
      var user = {
        name: name.value,
        email: email.value,
        password: password.value,
        favorites: []
      };
      addUser(user);
      document.cookie = `date=${Date.now()}`;
      form.submit();
    }
  }

  e.preventDefault();
});

//////////////////////////////////////////////EVENTOS DE RATÓN//////////////////////////////////////////////////////////
document.getElementById("infoName").addEventListener("mouseover", e => {
  document.getElementById("txtInfoName").hidden = false;
  e.preventDefault();
});

document.getElementById("infoName").addEventListener("mouseleave", e => {
  document.getElementById("txtInfoName").hidden = true;
  e.preventDefault();
});

document.getElementById("infoPassword").addEventListener("mouseover", e => {
  document.getElementById("txtInfoPassword").hidden = false;
  e.preventDefault();
});

document.getElementById("infoPassword").addEventListener("mouseleave", e => {
  document.getElementById("txtInfoPassword").hidden = true;
  e.preventDefault();
});
