const products = [
  {
    id: "001",
    name: "Premium Poster",
    price: "1000 RS",
    rating: "4.5 ⭐",
    image: "IMAGE/ANIME.png",
    keywords: ["poster", "anime", "premium", "wall"]
  },

  {
    id: "002",
    name: "School Banner",
    price: "500 RS",
    rating: "4.0 ⭐",
    image: "IMAGE/BANNER.png",
    keywords: ["banner", "school", "flex", "print"]
  }
];



function initProduct() {
  const container = document.getElementById("product-container");
  const targetId = container.getAttribute("data-product-id");

  const item = products.find(p => p.id === targetId);

      if (item) {
           document.getElementById("p-name").innerText = item.name;
          document.getElementById("p-price").innerText = item.price;
          document.getElementById("p-rating").innerText = item.rating;
          document.getElementById("p-img").src = item.image;
    } else {
           console.error("No Product ID");
    }}
    window.onload = initProduct;



    
  const slider =
  document.querySelector('.offer-3920');
  let index = 0;
  const totalImages =
  slider.querySelectorAll('a').length;
  
  const slidesWidth =  1700;

  function startSlider() {
    index++;

    if (index >= totalImages) {
      index = 0;
    }

    slider.scrollTo({
      left: index * slidesWidth,
      behavior: 'smooth'
    });
  }
let autoPlay = setInterval(startSlider, 4000);

  slider.addEventListener('touchStart', () =>{
    clearInterval(autoPlay);

  });
  slider.addEventListener('touchend', () =>
  {
    index = 
    Math.round(slider.scrollLeft / slidesWidth);
    autoPlay = setInterval(startSlider, 4000);
    });
  

  const searchInput = document.getElementById("searching-product-12923");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();

  filterProducts(query);
});
function filterProducts(query) {

  const filtered = products.filter(product => {

    // ID match
    if (product.id.includes(query)) return true;

    // Name match
    if (product.name.toLowerCase().includes(query)) return true;

    // Keyword match
    if (product.keywords.some(k => k.includes(query))) return true;

    return false;
  });

  displayProducts(filtered);
}
function displayProducts(productList) {

  const container = document.querySelector(".all-product-001");

  container.innerHTML = ""; // clear old

  if (productList.length === 0) {
    container.innerHTML = "<h2>No Product Found</h2>";
    return;
  }

  productList.forEach(product => {

    const div = document.createElement("div");
    div.className = "product-look";

    div.innerHTML = `
      <div class="product-img">
        <img src="${product.image}">
      </div>

      <div class="product-name">
        <h1>${product.name}</h1>
      </div>

      <div class="product-name">
        <h1>${product.price}</h1>
      </div>

      <div class="product-rating">
        <h3>${product.rating}</h3>
      </div>

      <button class="add-to-cart">Add To Cart</button>
      <button class="buy-now">Buy Now</button>
    `;

    container.appendChild(div);
  });
}
window.addEventListener("load", () => {
  displayProducts(products);
});
