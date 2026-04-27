const addCart = document.querySelectorAll(".addCart");
const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCart");
const payBtn = document.getElementById("payBtn");
/** @type {HTMLSelectElement} */
const categoryFilter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product");

let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
}

function renderCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} рублей`;
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Удалить"
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        })

        total += item.price
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    })
    totalPrice.textContent = `Итого: ${total} рублей`;
    saveCart()
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

addCart.forEach((button) => {
    button.addEventListener("click", function() {
        const name = button.parentElement.dataset.name;
        const price = Number(button.parentElement.dataset.price);
        cart.push({
            name: name,
            price: price
        })
        renderCart();
        console.log(name +" стоимостью "+  price + " добавлен в корзину");
    });
});

clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
});

payBtn.addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Оплата прошла успешно!");
        cart = [];
        renderCart();
    }
    else {
        alert("Корзина пуста!");
    }
});

categoryFilter.addEventListener("change", () => {
    const selelectedCategory = categoryFilter.value;
    products.forEach((product) => {
        const productCategory = product.dataset.category;
        if (selelectedCategory == "all" || productCategory == selelectedCategory) {
            product.style.display = "block";
        }
        else {
            product.style.display = "none";
        }
    });
});