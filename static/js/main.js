const addToCartBtn = document.querySelector(".add-to-cart");
window.addEventListener("DOMContentLoaded", (event) => {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const color = option.style.backgroundColor;
      document.body.style.backgroundColor = color;
    });
  });
});