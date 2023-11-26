// Gallery Page JS
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("gallery-item")) {
    const src = e.target.getAttribute("src");
    document.querySelector(".modal-img").src = src;
    const myModal = new bootstrap.Modal(
      document.getElementById("gallery-modal")
    );
    myModal.show();
  }
});

// ****************** form validation *********************

// document
//   .getElementById("exampleModal")
//   .addEventListener("submit", validateForm);
// function validateForm(event) {
//   removeErrorMessages();
//   if (validateFirstName() && validateLastName() && validatePhoneNumber()) {
//     return true;
//   } else {
//     event.preventDefault();
//     return false;
//   }
// }

function showError(element_id, message) {
  var element = document.getElementById(element_id);
  var error_div = document.createElement("div");
  error_div.id = element_id + "_error";
  error_div.className = "error";
  error_div.innerHTML = message;
  element.parentNode.insertBefore(error_div, element.nextSibling);
}
function removeElementsByClass(rootElement, className) {
  var elements = rootElement.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
function removeErrorMessages() {
  removeElementsByClass(document.getElementById("myform"), "error");
}

function validatePhoneNumber() {
  var phone = document.getElementById("myform_phone").value;
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!phone || !re.test(phone)) {
    showError("myform_phone", "Please enter a valid phone number");
    return false;
  }
  return true;
}

function validateFirstName() {
  var first_name = document.getElementById("myform_firstname").value;
  if (!first_name || first_name.length < 2) {
    showError("myform_firstname", "Please enter your FirstName");
    return false;
  }
  return true;
}

function validateLastName() {
  var last_name = document.getElementById("myform_lastname").value;
  if (!last_name || last_name.length < 2) {
    showError("myform_lastname", "Please enter your LastName");
    return false;
  }
  return true;
}

// book test js start here ###################

var shoppingCart = (function () {
  cart = [];

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
})();

// Add item
$(".default-btn").click(function (event) {
  // alert('working');
  event.preventDefault();
  var name = $(this).data("name");
  var price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$(".clear-cart").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output +=
      "<tr>" +
      "<td>" +
      cartArray[i].name +
      "</td>" +
      "<td>(" +
      cartArray[i].price +
      ")</td>" +
      "<td><div class='input-group'>" +
      "<input type='number' class='item-count form-control' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "</div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cartArray[i].name +
      ">X</button></td>" +
      " = " +
      "<td>" +
      cartArray[i].total +
      "</td>" +
      "</tr>";
  }
  $(".show-cart").html(output);
  $(".total-cart").html(shoppingCart.totalCart());
  $(".total-count").html(shoppingCart.totalCount());
}

// Delete item button

$(".show-cart").on("click", ".delete-item", function (event) {
  var name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// Item count input
$(".show-cart").on("change", ".item-count", function (event) {
  var name = $(this).data("name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});
displayCart();

//////// ui script start /////////
// Tabs Single Page
$(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current");
$(".tab ul.tabs li a").on("click", function (g) {
  var tab = $(this).closest(".tab"),
    index = $(this).closest("li").index();
  tab.find("ul.tabs > li").removeClass("current");
  $(this).closest("li").addClass("current");
  tab
    .find(".tab_content")
    .find("div.tabs_item")
    .not("div.tabs_item:eq(" + index + ")")
    .slideUp();
  tab
    .find(".tab_content")
    .find("div.tabs_item:eq(" + index + ")")
    .slideDown();
  g.preventDefault();
});

// search function
$("#search_field").on("keyup", function () {
  var value = $(this).val();
  var patt = new RegExp(value, "i");

  $(".tab_content")
    .find(".col-lg-3")
    .each(function () {
      var $table = $(this);

      if (!($table.find(".featured-item").text().search(patt) >= 0)) {
        $table.not(".featured-item").hide();
      }
      if ($table.find(".col-lg-3").text().search(patt) >= 0) {
        $(this).show();
        document.getElementById("not_found").style.display = "none";
      } else {
        document.getElementById("not_found").innerHTML = " Product not found..";
        document.getElementById("not_found").style.display = "block";
      }
    });
});
// book test js end

// Define a function to handle the "Add to Cart" action
function addToCart() {
  // You can store the item details in an object, such as name, price, etc.
  const item = {
    name: "Product Name",
    price: 1000, // The price can be retrieved dynamically from the page
    // Add other details as needed
  };

  // Check if the cart already exists in local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the item to the cart
  cart.push(item);

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Provide feedback to the user (you can customize this)
  alert("Item added to cart!");
}

// Attach the addToCart function to the "Book Now" button
const addToCartButton = document.getElementById("addToCartButton");
addToCartButton.addEventListener("click", addToCart);
