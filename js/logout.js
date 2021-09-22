var logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  //Borrar el usuario del session storage
  window.sessionStorage.removeItem("cUser");
  logout.href = "./login.html";
});
