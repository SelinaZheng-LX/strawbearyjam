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
});
