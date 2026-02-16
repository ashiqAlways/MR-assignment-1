const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(category => displayCategory(category));
};

const loadCategoryProduct = (id) => {
    console.log(id);
    
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    for (let category of categories){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadCategoryProduct('${category}')" class="btn btn-outline btn-primary rounded-3xl">${capitalize(category)}</button>
        `;
        categoryContainer.append(btnDiv);
    }  
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

loadCategories();


