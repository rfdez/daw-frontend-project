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

const getBeer = beers => {
  document.getElementById("favBeers").innerHTML = "";
  beers.forEach(beer => {
    printBeer(beer);
  });
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
  document.getElementById("favBeers").innerHTML += `
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
            <button type="button" name="beer123" class="btn btn-danger" id="${beer.id}">Borrar</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const beerDelete = beer => {
  let cUser = window.sessionStorage.getItem("cUser");
  let users = JSON.parse(window.localStorage.getItem("users"));
  let user = getUser(cUser);

  user.favorites.forEach((b, i) => {
    if (b.id == beer.id) {
      user.favorites.splice(i, 1);
    }
  });

  users.forEach((u, i) => {
    if (u.email == user.email) {
      users.splice(i, 1, user);
    }
  });

  window.localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
};

window.addEventListener("load", () => {
  var cUser = window.sessionStorage.getItem("cUser");
  if (cUser) {
    var user = getUser(cUser);

    if (user.favorites.length == 0) {
      document.getElementById("noBeers").hidden = false;
    } else {
      document.getElementById("noBeers").hidden = true;
      getBeer(user.favorites);
      document.getElementsByName("beer123").forEach(b => {
        b.addEventListener("click", e => {
          user.favorites.forEach(beer => {
            if (beer.id == b.id) {
              //Borra la cerveza
              beerDelete(beer);
            }
          });
          e.preventDefault();
        });
      });
    }
  } else {
    window.location.href = "./../index.html";
  }
});
