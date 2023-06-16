$(document).ready(function() {
  // set var
  let count = 1;
  let color_quantity_dict = {};
  let countSpan = document.querySelector(".count");
  let decrementBtn = document.querySelector(".decrement");
  let incrementBtn = document.querySelector(".increment");
  $(".pcontent").magicTabs({
    headingTag: "h4",
  });
  // load page
  function loadPages() {
    var currentPath = window.location.pathname;
    var slug = currentPath.split('/').filter(Boolean).pop();
    $.getJSON(`/UNIQUEAPI174/pages/?slug=${slug}`, function(data) {
      var productPages = data.items[0];
        // set product id
      let get_add_product_id = `<input id="add_to_cart_product" type="hidden" name="product_id" value="${productPages.id}"></input>`;
      $('#add_to_cart_product').html(get_add_product_id);
      $.getJSON(`/UNIQUEAPI174/pages/${productPages.id}`, function(Data) {
        let product = Data;
        document.title = product.title;
        // set cart image
        let get_add_cart_image = `<input id="add_to_cart_image" type="hidden" class="color-input" name="product_image_url" value="${product.image.full_url}">`;
        $('#add_to_cart_image').html(get_add_cart_image);
        // Define variables
        let get_product_title = `<h1 class="blogh1 white-color">${product.title}</h1>`;
        let get_product_head = `<li>
        <a href="#" class="text-light-emphasis">2020black.com</a>
      </li>
      <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
      <li>
        <a href="#" class="text-light-emphasis">${product.product_title}</a>
      </li>`;
        let get_product_model_title = `<h1 id="product_model_title" class="blog-post-title h2">${product.product_title}</h1>`;
        let get_product_model_cat = `<a id="product_model_cat" href="">${product.collection.title}</a>`;
        let get_old_product_price = `<span id="old_product_price" class="h4 text-decoration-line-through icon2">${product.price} تومان</span>`;
        let get_product_price = `<span id="product_price" class="h1">${product.price} تومان</span>`;
        let get_product_short_desc = `<p id="product_short_desc">${product.short_description}</p>`;
        let get_product_desc = `<p id="product_short_desc">${product.description}</p>`;
        let get_product_table = `<tr>
        <td>نوع محصول:</td>
        <td>${product.product_type}</td>
      </tr>
      <tr class="trtd-a">
        <td>جنس محصول:</td>
        <td>${product.product_jense}</td>
      </tr>
      <tr>
        <td>وزن محصول:</td>
        <td>${product.product_wight}</td>
      </tr>
      <tr class="trtd-a">
        <td>ابعاد خارجی محصول:</td>
        <td>${product.product_abad}</td>
      </tr>
      <tr>
        <td>سایز محصول:</td>
        <td>${product.product_size}</td>
      </tr>
      <tr class="trtd-a">
        <td>گارانتی محصول:</td>
        <td>${product.product_garr}</td>
      </tr>`;
        let slideimg=[
          product.image.url,
        ];
        let colorOptions = '';
        let get_product_price_by_offer = '';
        if(product.PRODUCT_OFFER.length > 0){
          get_product_price_by_offer += `<span id="product_price" class="h1">${product.PRODUCT_OFFER[0].value} تومان</span>`;
        }
        if (product.PRODUCT_COLORS.length > 0) {
          for (let j = 0; j < product.PRODUCT_COLORS.length; j++) {
            colorOptions += `<option value="${product.PRODUCT_COLORS[j].color}" selected>${product.PRODUCT_COLORS[j].color_title}</option>`;
            color_quantity_dict[product.PRODUCT_COLORS[j].color_title] = product.PRODUCT_COLORS[j].pquantity;
          }
        }
        let colorSelect = `
          <select id="color-select" class="color-select">
            ${colorOptions}
          </select>
        `;
        if (product.PRODUCT_SLIDE.length > 0) {
          for (var k = 0; k < product.PRODUCT_SLIDE.length; k++) {
            slideimg.push(product.PRODUCT_SLIDE[k].image.url);
          }}
        $("#gpro").zoomy(slideimg, {
          height: 368,
        });
        // Start send context to html page
        if(product.is_active && product.is_available){
          if(product.PRODUCT_OFFER.length > 0){
            //available And Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_short_desc);
            $('#old_product_price').html(get_old_product_price);
            $('#product_price').html(get_product_price_by_offer);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`);
            // send cart date
            $('#add_to_cart_date').html(`<input id="add_to_cart_date" type="hidden" class="color-input" name="add_cart_date" value="${product.PRODUCT_OFFER[0].value}">`);
          }else{
            //available And no offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_short_desc);
            $('#old_product_price').html(``);
            $('#product_price').html(get_product_price);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`);
            // send cart date
            $('#add_to_cart_date').html(`<input id="add_to_cart_date" type="hidden" class="color-input" name="add_cart_date" value="0">`);
          }
        }else{
          if(product.PRODUCT_OFFER.length > 0){
            //Not available And Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_short_desc);
            $('#old_product_price').html(get_old_product_price);
            $('#product_price').html(get_product_price_by_offer);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`);
            // send cart date
            $('#add_to_cart_date').html(`<input id="add_to_cart_date" type="hidden" class="color-input" name="add_cart_date" value="${product.PRODUCT_OFFER[0].value}">`);
          }else{
            //Not available And NO Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_short_desc);
            $('#old_product_price').html(``);
            $('#product_price').html(get_product_price);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`);
            // send cart date
            $('#add_to_cart_date').html(`<input id="add_to_cart_date" type="hidden" class="color-input" name="add_cart_date" value="0">`);
          }
        }
      });
    });
  }

  // Color Select
  let selectElement = document.getElementById('color-select');
  let selectedColorDiv = document.querySelector('.selected-color');
  selectElement.addEventListener('change', (event) => {
    let selectedValue = event.target.value;
    let colorSelect = document.getElementById('color-select');
    let selectedOption = colorSelect.options[colorSelect.selectedIndex];
    let optionText = selectedOption.innerText;
    let color_quantity = color_quantity_dict[optionText];
    let get_add_to_cart_color_text = `<input id="add_to_cart_color_text" type="hidden" class="color-input" name="selected_color_text" value="${optionText}"></input>`;
    let get_add_to_cart_color_quantity = `<input id="add_to_cart_color_quantity" type="hidden" class="color-input" name="product_color_quantity" value="${color_quantity}">`;
    $('#add_to_cart_color_text').html(get_add_to_cart_color_text);
    $('#add_to_cart_color_quantity').html(get_add_to_cart_color_quantity);
    selectedColorDiv.style.backgroundColor = selectedValue;
  });
  
  // Count Select
  decrementBtn.addEventListener("click", () => {
    if (count > 1) {
      count--;
      console.log(count);
      countSpan.textContent = count;
      let get_add_to_cart_quantity = `<input id="add_to_cart_quantity" type="hidden" name="quantity" value="${count}" min="1"></input>`;
      $('#add_to_cart_quantity').html(get_add_to_cart_quantity);
    }
  });
  incrementBtn.addEventListener("click", () => {
    count++;
    console.log(count);
    countSpan.textContent = count;
    let get_add_to_cart_quantity = `<input id="add_to_cart_quantity" type="hidden" name="quantity" value="${count}" min="1"></input>`;
    $('#add_to_cart_quantity').html(get_add_to_cart_quantity);
  });


  //SOME LOADS
  loadPages();
});