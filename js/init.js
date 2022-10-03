const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function clearUser() {
  localStorage.removeItem("user");
  window.location = "index.html"
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

if (!localStorage.getItem("user")){
  window.location = "login.html"
}


document.getElementById("navbarNav").innerHTML = `
<ul class="navbar-nav w-100 justify-content-between">
  <li class="nav-item">
    <a class="nav-link active" href="index.html">Inicio</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="categories.html">Categorías</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="sell.html">Vender</a>
  </li>
  <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${localStorage.getItem("user")}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
            <li onclick="clearUser()"><a class="dropdown-item" href="#">Cerrar sesion</a></li>
          </ul>
        </li>
</ul>`


/*document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clrBtn").addEventListener("click", () => {
    clearUser();
  })
})*/