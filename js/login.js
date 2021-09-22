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

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

function getUser(email, password) {
  var users = window.localStorage.getItem("users");
  var exist = false;
  JSON.parse(users).forEach(user => {
    if (user.email == email.trim() && user.password == password.trim()) {
      exist = true;
    }
  });

  return exist;
}

form.addEventListener("submit", e => {
  document.getElementById("err").innerHTML = ``;

  if (email.value != "" && password.value != "") {
    if (getUser(email.value, password.value) == true) {
      window.sessionStorage.removeItem("cUser");
      window.sessionStorage.setItem("cUser", email.value);
      form.submit();
    } else {
      var alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <p class="lead">El usuario no existe.</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
      `;
      document.getElementById("err").innerHTML += alert;
    }
  } else {
    var alert = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <p class="lead">Rellena todos los campos.</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
    document.getElementById("err").innerHTML += alert;
  }

  e.preventDefault();
});

window.addEventListener("load", () => {
  var cUser = window.sessionStorage.getItem("cUser");
  if (cUser) {
    window.location.href = "./../index.html";
  }
});
