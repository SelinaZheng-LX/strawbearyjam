const menuDishes = [
    {
        dishName: "Strawbeary Jam",
        description:
            "A delightful jammy dessert made from fresh strawberries and a hint of mint.",
        price: 5.99,
        imageURL: "images/cake.png",
    },
    {
        dishName: "Strawbeary Delight",
        description:
            "A layered dessert with strawberries, cream, and fluffy cake.",
        price: 6.49,
        imageURL: "images/cakeslice.webp",
    },
    {
        dishName: "Strawbeary Combo",
        description:
            "Get three flavors of our signature cupcakes in one combo!",
        price: 24.99,
        imageURL: "images/threecake.png",
    },
    {
        dishName: "Strawbeary Sparkle",
        description:
            "A refreshing blend of strawberries and sparkling water. Hints of refreshing mint.",
        price: 12.99,
        imageURL: "images/drink.png",
    },
    {
        dishName: "Strawbeary Juice",
        description:
            "An aromatic juice made from fresh strawberries and a hint of mint.",
        price: 6.99,
        imageURL: "images/drink2.webp",
    },
    {
        dishName: "Strawbeary Latte",
        description:
            "A creamy latte made with fresh strawberries, milk, and a touch of honey.",
        price: 7.49,
        imageURL: "images/latte.webp",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    // Dynamically create a table listing each menu dish
    const tableContainer = document.getElementById("menu-table-container");
    const table = document.createElement("table");
    table.className = "menu-table";

    // Create table header
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr><th>Image</th>
            <th>Dish Name</th>
            <th class="web">Description</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    menuDishes.forEach((dish) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td><img src="${dish.imageURL}" alt="${
            dish.dishName
        }" style="height:13rem;"></td>
            <td>${dish.dishName}</td>
            <td class="web">${dish.description}</td>
            <td>$${dish.price.toFixed(2)}</td>
            <td><button class="button add-to-cart" data-name="${
                dish.dishName
            }">Add to Cart</button></td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append table to container
    if (tableContainer) {
        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);
    }

    // Dynamically create slides for each menu dish
    const slider = document.getElementById("slider");
    slider.innerHTML = "";

    menuDishes.forEach((dish) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.innerHTML = `
            <img src="${dish.imageURL}" alt="${dish.dishName}">
        `;
        slider.appendChild(slide);
    });

    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    let prevBtn = document.querySelector(".slide-btn.left");
    let nextBtn = document.querySelector(".slide-btn.right");

    let currentIndex = 0;
    console.log(totalSlides);
    function showSlide(index) {
        if (slider) {
            slider.style.transform = `translateX(-${index * 37}rem)`;
        }
    }
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
        console.log(currentIndex);
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
        console.log(currentIndex);
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", goToPrev);
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", goToNext);
    }
    showSlide(currentIndex);

    // CART LOGIC
    const CART_KEY = "strawbeary_cart";
    const findDishByName = (name) =>
        menuDishes.find((d) => d.dishName === name);
    const loadCart = () => {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (_) {
            return [];
        }
    };
    const saveCart = (cart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    };
    const getCartTotal = (cart) => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };
    const renderCart = () => {
        const cartListEl = document.getElementById("cart-list");
        const cartSummaryEl = document.getElementById("cart-summary");
        if (!cartListEl) return;
        const cart = loadCart();
        if (cart.length === 0) {
            cartListEl.innerHTML = `<p class="font-primary">Your cart is empty.</p>`;
        } else {
            const rows = cart
                .map(
                    (item) => `
                <tr>
                    <td>${item.dishName}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <div class="qty-control">
                            <button class="qty-btn dec" data-name="${
                                item.dishName
                            }">-</button>
                            <input class="qty-input" type="number" min="1" value="${
                                item.quantity
                            }" data-name="${item.dishName}" />
                            <button class="qty-btn inc" data-name="${
                                item.dishName
                            }">+</button>
                        </div>
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button class="remove-btn" data-name="${
                        item.dishName
                    }">Remove</button></td>
                </tr>`
                )
                .join("");
            cartListEl.innerHTML = `
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            `;
        }
        if (cartSummaryEl) {
            cartSummaryEl.textContent = `Total: $${getCartTotal(
                loadCart()
            ).toFixed(2)}`;
        }
        // keep cart button count in sync
        updateCartButtonCount();
    };

    const addToCart = (name) => {
        const dish = findDishByName(name);
        if (!dish) return;
        const cart = loadCart();
        const existing = cart.find((c) => c.dishName === name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                dishName: dish.dishName,
                price: dish.price,
                quantity: 1,
            });
        }
        saveCart(cart);
        renderCart();
    };

    const removeFromCart = (name) => {
        const cart = loadCart().filter((c) => c.dishName !== name);
        saveCart(cart);
        renderCart();
    };

    const setQuantity = (name, quantity) => {
        const qty = Math.max(1, Number(quantity) || 1);
        const cart = loadCart();
        const item = cart.find((c) => c.dishName === name);
        if (!item) return;
        item.quantity = qty;
        saveCart(cart);
        renderCart();
    };

    const clearCartBtn = document.getElementById("clear-cart");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            saveCart([]);
            renderCart();
        });
    }

    // Modal open/close
    const modal = document.getElementById("cart-modal");
    const openCartBtn = document.getElementById("open-cart");
    const closeCartBtn = document.getElementById("close-cart");
    const backdrop = document.querySelector("#cart-modal .modal-backdrop");

    const getCartCount = () => loadCart().reduce((n, i) => n + i.quantity, 0);
    const updateCartButtonCount = () => {
        if (openCartBtn) {
            openCartBtn.textContent = `Cart (${getCartCount()})`;
        }
    };

    const openModal = () => {
        if (modal) modal.classList.remove("hidden");
    };
    const closeModal = () => {
        if (modal) modal.classList.add("hidden");
    };

    if (openCartBtn) openCartBtn.addEventListener("click", openModal);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    // Delegated events
    tableContainer.addEventListener("click", (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains("add-to-cart")) {
            const name = t.getAttribute("data-name");
            addToCart(name);
        }
    });

    document.addEventListener("click", (e) => {
        const t = e.target;
        if (!t || !t.classList) return;
        if (t.classList.contains("remove-btn")) {
            const name = t.getAttribute("data-name");
            removeFromCart(name);
        }
        if (t.classList.contains("inc")) {
            const name = t.getAttribute("data-name");
            const cart = loadCart();
            const item = cart.find((c) => c.dishName === name);
            if (item) setQuantity(name, item.quantity + 1);
        }
        if (t.classList.contains("dec")) {
            const name = t.getAttribute("data-name");
            const cart = loadCart();
            const item = cart.find((c) => c.dishName === name);
            if (item) setQuantity(name, Math.max(1, item.quantity - 1));
        }
    });

    document.addEventListener("change", (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains("qty-input")) {
            const name = t.getAttribute("data-name");
            setQuantity(name, t.value);
        }
    });

    // Initial render
    renderCart();
});
