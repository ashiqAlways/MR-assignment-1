const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((category) => displayCategory(category));
};

const removeActive = () => {
  const categoriesButtons = document.querySelectorAll(".category-btn");
  // console.log(categoriesButtons);
  categoriesButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadCategoryProduct = (category) => {
  const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`btn-${category}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayCategoryProduct(data);
    });
};

const loadProductDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayProductDetail(details);
};

const displayProductDetail = (product) => {
  console.log(product);
  const descriptionBox = document.getElementById("description-container");
  descriptionBox.innerHTML = `
    <div>
      <h2 class="text-2xl font-bold">
        ${product.title}
      </h2>

      <p class="text-gray-600">
        ${product.description}
      </p>

      <div class="flex justify-between items-center">
        <p class="text-xl font-semibold text-indigo-600">
          $${product.price}
        </p>
        <p class="text-yellow-500 font-medium">
          <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}
        </p>
      </div>

      <div class="flex gap-3 pt-3 mt-5">
        <button class="flex-1 btn btn-primary">
          Buy Now
        </button>
      </div>
      </div>
    `;
  document.getElementById("product_modal").showModal();
};

const displayCategoryProduct = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    // console.log(product);
    const card = document.createElement("div");
    card.innerHTML = `
          <div
        class="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition">
        <div class="bg-gray-100 p-6 flex justify-center items-center">
          <img
            src="${product.image}"
            alt="Product"
            class="h-60 w-full object-contain"
          />
        </div>

        <!-- Card Body -->
        <div class="p-5 flex flex-col flex-1">
          <div class="flex items-center justify-between mb-3">
            <span
              class="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              ${product.category}
            </span>

            <div class="flex items-center text-sm text-gray-500">
              <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
              ${product.rating.rate} <span class="ml-1">(${product.rating.count})</span>
            </div>
          </div>
          <h3 class="font-semibold text-gray-800 text-lg truncate">
            ${product.title}
          </h3>
          <p class="text-xl font-bold mt-2 text-gray-900">$${product.price}</p>

          <!-- Buttons -->
          <div class="flex gap-3 mt-auto">
            <button onclick="loadProductDetail(${product.id})" class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              <i class="fa-regular fa-eye mr-2"></i>
              Details
            </button>

            <button
              class="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition cursor-pointer"
            >
              <i class="fa-solid fa-cart-shopping mr-2"></i>
              Add
            </button>
          </div>
        </div>
      </div>
        `;
    productContainer.append(card);
  });
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    const btn = document.createElement("button");

    btn.className = "btn btn-outline btn-primary rounded-3xl category-btn";
    btn.id = `btn-${category}`;

    btn.textContent = capitalize(category);

    btn.addEventListener("click", () => {
      loadCategoryProduct(category);
    });

    btnDiv.appendChild(btn);
    categoryContainer.appendChild(btnDiv);
  }
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

loadCategories();
