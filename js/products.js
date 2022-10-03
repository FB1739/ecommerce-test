var productsArray = [];
const ORDER_ASC_BY_PRICE = "Asc.";
const ORDER_DESC_BY_PRICE = "Desc.";
const ORDER_BY_PROD_SOLD = "Sold";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function myFunction() {
    // Declare variables
    var input, filter, ul, h4, a, i;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("cat-list-container");
    row = ul.getElementsByClassName("list-group-item list-group-item-action")
    h4 = ul.getElementsByTagName('h4');
    p = ul.getElementsByTagName('p');


  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < h4.length; i++) {
      a = h4[i].innerText;
      b = p[i].innerText;

      /*txtValue = a.textContent || a.innerText;*/
      if (a.toUpperCase().indexOf(filter) > -1 || b.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}


//Modifico el codigo de esta funcion para que sea un poco más eficiente
function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {// se puede hacer tambien un for (let category of array),
        let category = productsArray[i];            //  pero me gusta mas parecido a c++

        //console.log(category)
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div onclick="setProdID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                                <small class="text-muted">${category.soldCount} vendidos</small>
                            </div>
                            <p>${category.description}</p>
                        </div>
                    </div>
                </div>
                `
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
}





function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        productsArray = categoriesArray;
    }

    productsArray = sortCategories(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

// se cambio el entrada del link en getJSONData para que sea con PRODUCTS_URL con el catID en el localStorage
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json").then(function (resultObj) {//PRODUCTS_URL en init.js
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showCategoriesList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByPrice").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;


        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("search").addEventListener("keyup", function () {
        myFunction();
    });
});


