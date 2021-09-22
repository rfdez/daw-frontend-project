const url = `https://api.punkapi.com/v2/`;
const translationApiKey = "KEY";

function getUser(email) {
  var users = window.localStorage.getItem("users");
  var cUser;
  JSON.parse(users).forEach(user => {
    if (user.email == email) {
      cUser = user;
    }
  });
  return cUser;
}

const getBeers = () => {
  return fetch(`${url}beers?per_page=24`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const saveBeer = beer => {
  let cUser = window.sessionStorage.getItem("cUser");
  let users = JSON.parse(window.localStorage.getItem("users"));
  let user = getUser(cUser);
  document.getElementById(`${beer.id}`).innerHTML = `Añadido`;
  document
    .getElementById(`${beer.id}`)
    .setAttribute("class", "btn btn-success");
  document.getElementById(`${beer.id}`).setAttribute("disabled", "true");
  //Guardar cerveza
  user.favorites.push(beer);

  users.forEach((u, i) => {
    if (u.email == user.email) {
      users.splice(i, 1, user);
    }
  });

  window.localStorage.setItem("users", JSON.stringify(users));
};

const printBeer = beer => {
  var amargor = "";
  if (beer.ibu > 50) {
    amargor = "warning";
  } else {
    amargor = "success";
  }
  var vol = "";
  if (beer.abv > 4.5) {
    vol = "warning";
  } else {
    vol = "success";
  }
  var color = "";
  if (beer.ebc > 33 || beer.srm > 17) {
    color = "Tostada";
  } else {
    color = "Rubia";
  }
  document.getElementById("beerCards").innerHTML += `
    <div class="card mb-3 border-dark mx-auto" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4 text-center">
          <img src="${beer.image_url}" class="card-img my-2 imgCard" alt="">
        </div>
        <div class="col-md-8">
          <div class="card-body text-dark">
            <h5 class="card-title text-dark">${beer.name}</h5>
            <p class="card-text text-justify" id="bDesc${beer.id}">${beer.description}</p>
            <p class="card-text">VOL: <span class="badge badge-${vol}">${beer.abv} %</span> IBU (amargor): <span class="badge badge-${amargor}">${beer.ibu}</span> Tipo: ${color}</p>
            <p class="card-text">Primera unidad: ${beer.first_brewed}</p>
            <p class="card-text"><small class="text-muted" id="bTagline${beer.id}">${beer.tagline}</small></p>
            <button type="button" name="beer123" class="btn btn-primary" id="${beer.id}">Añadir</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const getTraslation = arr => {
  var content = {
    q: arr,
    target: "es"
  };
  return fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${translationApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    }
  );
};

function genderize(cUser) {
  return fetch(`https://api.genderize.io?name=${cUser}`);
}

function printGender(gender) {
  document.getElementById("gender").innerHTML = " ";
  var probability = parseFloat(gender.probability) * 100;
  if (gender.gender == "male") {
    document.getElementById("gender").innerHTML += `Hombre`;
    if (probability > 50) {
      document.getElementById("gender").innerHTML += `
          <span class="badge badge-pill badge-success">${probability.toFixed(
            1
          )}%</span>
        `;
    } else {
      document.getElementById("gender").innerHTML += `
        <span class="badge badge-pill badge-warning">${probability.toFixed(
          1
        )}%</span>
      `;
    }
  } else {
    document.getElementById("gender").innerHTML += `Mujer`;
    if (probability > 50) {
      document.getElementById("gender").innerHTML += `
          <span class="badge badge-pill badge-success">${probability.toFixed(
            1
          )}%</span>
        `;
    } else {
      document.getElementById("gender").innerHTML += `
        <span class="badge badge-pill badge-warning">${probability.toFixed(
          1
        )}%</span>
      `;
    }
  }
}

function nationalize(cUser) {
  return fetch(`https://api.nationalize.io?name=${cUser}`);
}

function printNation(nations) {
  document.getElementById("nations").innerHTML = " ";
  if (nations.length == 0) {
    document.getElementById("nations").innerHTML = "No coinciden países.";
  } else {
    nations.forEach(nation => {
      var probability = parseFloat(nation.probability) * 100;
      document.getElementById("nations").innerHTML += `${nation.country_id}`;
      if (probability > 50) {
        document.getElementById("nations").innerHTML += `
            <span class="badge badge-pill badge-success">${probability.toFixed(
              0
            )}%</span>
          `;
      } else {
        document.getElementById("nations").innerHTML += `
            <span class="badge badge-pill badge-warning">${probability.toFixed(
              0
            )}%</span>
          `;
      }
    });
  }
}

function agify(cUser) {
  return fetch(`https://api.agify.io?name=${cUser}`);
}

const getBeersByVol = (min, max) => {
  document.getElementById("beerCards").innerHTML = "";
  fetch(`${url}beers?abv_gt=${min}&abv_lt=${max}&per_page=24`)
    .then(res => res.json())
    .then(beers => {
      beers.forEach(beer => {
        printBeer(beer);
        var arr = [beer.tagline, beer.description];
        getTraslation(arr)
          .then(data => data.json())
          .then(trad => {
            //console.log(trad);
            document.getElementById(
              `bDesc${beer.id}`
            ).innerHTML = `${trad.data.translations[1].translatedText}`;
            document.getElementById(
              `bTagline${beer.id}`
            ).innerHTML = `${trad.data.translations[0].translatedText}`;
          });
      });
      return beers;
    })
    .then(beers => {
      botones = document.getElementsByName("beer123");
      botones.forEach(b => {
        b.addEventListener("click", e => {
          beers.forEach(beer => {
            if (b.id == beer.id) {
              //Guardar cerveza en favs
              saveBeer(beer);
            }
          });
          e.preventDefault();
        });
      });
    })
    .catch(e => console.log(e));
};

const getBeersByAmarg = (min, max) => {
  document.getElementById("beerCards").innerHTML = "";
  fetch(`${url}beers?ibu_gt=${min}&ibu_lt=${max}&per_page=24`)
    .then(res => res.json())
    .then(beers => {
      beers.forEach(beer => {
        printBeer(beer);
        var arr = [beer.tagline, beer.description];
        getTraslation(arr)
          .then(data => data.json())
          .then(trad => {
            //console.log(trad);
            document.getElementById(
              `bDesc${beer.id}`
            ).innerHTML = `${trad.data.translations[1].translatedText}`;
            document.getElementById(
              `bTagline${beer.id}`
            ).innerHTML = `${trad.data.translations[0].translatedText}`;
          });
      });
      return beers;
    })
    .then(beers => {
      botones = document.getElementsByName("beer123");
      botones.forEach(b => {
        b.addEventListener("click", e => {
          beers.forEach(beer => {
            if (b.id == beer.id) {
              //Guardar cerveza en favs
              saveBeer(beer);
            }
          });
          e.preventDefault();
        });
      });
    })
    .catch(e => console.log(e));
};

const getBeersByColor = (min, max) => {
  document.getElementById("beerCards").innerHTML = "";
  fetch(`${url}beers?ebc_gt=${min}&ebc_lt=${max}&per_page=24`)
    .then(res => res.json())
    .then(beers => {
      beers.forEach(beer => {
        printBeer(beer);
        var arr = [beer.tagline, beer.description];
        getTraslation(arr)
          .then(data => data.json())
          .then(trad => {
            //console.log(trad);
            document.getElementById(
              `bDesc${beer.id}`
            ).innerHTML = `${trad.data.translations[1].translatedText}`;
            document.getElementById(
              `bTagline${beer.id}`
            ).innerHTML = `${trad.data.translations[0].translatedText}`;
          });
      });
      return beers;
    })
    .then(beers => {
      botones = document.getElementsByName("beer123");
      botones.forEach(b => {
        b.addEventListener("click", e => {
          beers.forEach(beer => {
            if (b.id == beer.id) {
              //Guardar cerveza en favs
              saveBeer(beer);
            }
          });
          e.preventDefault();
        });
      });
    })
    .catch(e => console.log(e));
};

const getRandomBeer = () => {
  return fetch(`${url}beers/random`);
};

window.addEventListener("load", () => {
  var users = window.localStorage.getItem("users");
  //Usuarios por defecto
  var newUsers = [
    {
      name: "admin",
      email: "admin@admin.com",
      password: "admin123",
      favorites: []
    },
    {
      name: "Raul",
      email: "email@email.com",
      password: "123abC",
      favorites: []
    }
  ];

  if (!users) {
    window.localStorage.setItem("users", JSON.stringify(newUsers));
  }

  //Si no hay una variable de sesion se redirecciona al login
  var cUser = window.sessionStorage.getItem("cUser");
  if (cUser) {
    cUser = getUser(cUser);
    document.getElementById("cUser").innerText = cUser.name;

    //Obtener Cervezas
    getBeers()
      .then(res => res.json())
      .then(beers => {
        beers.forEach(b => {
          //print beers
          printBeer(b);
          //Obtiene traducciones
          var arr = [b.tagline, b.description];
          getTraslation(arr)
            .then(data => data.json())
            .then(trad => {
              //console.log(trad);
              document.getElementById(
                `bDesc${b.id}`
              ).innerHTML = `${trad.data.translations[1].translatedText}`;
              document.getElementById(
                `bTagline${b.id}`
              ).innerHTML = `${trad.data.translations[0].translatedText}`;
            });
        });
        return beers;
      })
      .then(beers => {
        botones = document.getElementsByName("beer123");
        botones.forEach(b => {
          b.addEventListener("click", e => {
            beers.forEach(beer => {
              if (b.id == beer.id) {
                //Guardar cerveza en favs
                saveBeer(beer);
              }
            });
            e.preventDefault();
          });
        });
      })
      .catch(e => console.log(e));

    //Informacion del usuario
    document.getElementById("cUser").addEventListener("mouseover", e => {
      document.getElementById("cardInfo").hidden = false;
      genderize(cUser.name)
        .then(data => data.json())
        .then(gender => {
          //print gender
          printGender(gender);
          //return other promise
          return nationalize(cUser.name);
        })
        .then(data => data.json())
        .then(nations => {
          //print nations
          printNation(nations.country);
          //return other promise
          return agify(cUser.name);
        })
        .then(data => data.json())
        .then(age => {
          //print age
          document.getElementById("age").innerHTML = " ";
          document.getElementById("age").innerHTML += `${age.age} años`;
          document
            .getElementById("bntCerrarInfo")
            .addEventListener("click", e => {
              document.getElementById("cardInfo").hidden = true;
              e.preventDefault();
            });
        });
      e.preventDefault();
    });

    //Filtrar cervezas
    document.getElementsByName("btnVol").forEach(el => {
      el.addEventListener("click", e => {
        if (el.title == 0) {
          getBeersByVol(0, 4);
        }
        if (el.title == 4) {
          getBeersByVol(4, 6);
        }
        if (el.title == 6) {
          getBeersByVol(6, 100);
        }
        e.preventDefault();
      });
    });

    document.getElementsByName("btnAmarg").forEach(el => {
      el.addEventListener("click", e => {
        if (el.title == 50) {
          getBeersByAmarg(0, 50);
        }
        if (el.title == 100) {
          getBeersByAmarg(50, 100);
        }
        e.preventDefault();
      });
    });

    document.getElementsByName("btnColor").forEach(el => {
      el.addEventListener("click", e => {
        if (el.title == 4) {
          getBeersByColor(4, 33);
        }
        if (el.title == 33) {
          getBeersByColor(33, 138);
        }
        e.preventDefault();
      });
    });

    document.getElementById("randomBeer").addEventListener("click", e => {
      getRandomBeer()
        .then(res => res.json())
        .then(beer => {
          document.getElementById("beerCards").innerHTML = "";
          beer = beer[0];
          printBeer(beer);
          var arr = [beer.tagline, beer.description];
          getTraslation(arr)
            .then(data => data.json())
            .then(trad => {
              console.log(trad);
              document.getElementById(
                `bDesc${beer.id}`
              ).innerHTML = `${trad.data.translations[1].translatedText}`;
              document.getElementById(
                `bTagline${beer.id}`
              ).innerHTML = `${trad.data.translations[0].translatedText}`;
            });
          return beer;
        })
        .then(beer => {
          document
            .getElementsByName("beer123")
            .item(0)
            .addEventListener("click", ebc => {
              saveBeer(beer);
              e.preventDefault();
            });
        })
        .catch(e => console.log(e));
      e.preventDefault();
    });
  } else {
    window.location.href = "./login.html";
  }
});
