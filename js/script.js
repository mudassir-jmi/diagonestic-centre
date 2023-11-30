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

// book test JS start here ###################

document.addEventListener("DOMContentLoaded", function () {
  var cartItems = [];

  function updateCartDisplay() {
    var cartCount = document.getElementById("cart-items");
    var cartList = document.getElementById("cartItemsList");
    var totalAmount = 0;

    cartCount.textContent = cartItems.length; // Update cart count in header

    // Clear existing items in the cart modal
    cartList.innerHTML = "";

    cartItems.forEach(function (item) {
      var listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.textContent = item.name + " - ₹" + item.price;

      var quantityDiv = document.createElement("div");
      quantityDiv.className = "input-group input-group-sm";
      quantityDiv.innerHTML = `
          <button class="btn btn-outline-secondary" type="button" onclick="decreaseQuantity('${item.name}')">-</button>
          <span class="input-group-text">${item.quantity}</span>
          <button class="btn btn-outline-secondary" type="button" onclick="increaseQuantity('${item.name}')">+</button>
          <button class="btn btn-danger" type="button" onclick="removeItem('${item.name}')">Remove</button>
        `;

      listItem.appendChild(quantityDiv);
      cartList.appendChild(listItem);

      totalAmount += item.price * item.quantity;
    });

    // Update total amount in the cart modal
    cartList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
          <strong>Total</strong>
          <span>₹${totalAmount}</span>
        </li>
      `;
  }

  function addToCart(itemName, itemPrice) {
    var existingItem = cartItems.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name: itemName,
        price: parseInt(itemPrice),
        quantity: 1,
      });
    }

    updateCartDisplay();
  }

  // Event listener for "Book Now" buttons
  var bookButtons = document.querySelectorAll(".add-to-cart");
  bookButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var itemName = event.target.getAttribute("data-name");
      var itemPrice = event.target.getAttribute("data-price");
      addToCart(itemName, itemPrice);
    });
  });

  // Functions for cart operations
  window.increaseQuantity = function (itemName) {
    var item = cartItems.find((item) => item.name === itemName);
    if (item) {
      item.quantity++;
      updateCartDisplay();
    }
  };

  window.decreaseQuantity = function (itemName) {
    var item = cartItems.find((item) => item.name === itemName);
    if (item && item.quantity > 1) {
      item.quantity--;
      updateCartDisplay();
    }
  };

  window.removeItem = function (itemName) {
    cartItems = cartItems.filter((item) => item.name !== itemName);
    updateCartDisplay();
  };

  // Event listener for cart icon
  var cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", function () {
    updateCartDisplay();
    var cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
  });
});
