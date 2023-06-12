$(document).ready(function() {
  function loadPages() {
    var currentPath = window.location.pathname;
    var slug = currentPath.split('/').filter(Boolean).pop();
    $.getJSON(`/UNIQUEAPI174/pages/?slug=${slug}`, function(data) {
      var productPages = data.items[0];
      $.getJSON(`/UNIQUEAPI174/pages/${productPages.id}`, function(Data) {
        let product = Data;
        document.title = product.title;
        // Define variables
        let get_product_title = `<h1 class="blogh1 white-color">${product.title}</h1>`;
        let get_product_head = `<li>
        <a href="#" class="text-light-emphasis">2020black.com</a>
      </li>
      <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
      <li>
        <a href="#" class="text-light-emphasis">${product.product_title}</a>
      </li>`;
        let get_btn_slide_one = `<button
        id="btn_slide_one"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="${product.image.alt}"
      ></button>`;
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
        let slideBTN='';
        let slideimg='';
        let colorOptions = '';
        let get_product_price_by_offer = '';
        if(product.PRODUCT_OFFER.length > 0){
          get_product_price_by_offer += `<span id="product_price" class="h1">${product.PRODUCT_OFFER[0].value} تومان</span>`;
        }
        if (product.PRODUCT_COLORS.length > 0) {
          for (var j = 0; j < product.PRODUCT_COLORS.length; j++) {
            colorOptions += `<option value="${product.PRODUCT_COLORS[j].color}">${product.PRODUCT_COLORS[j].color_title}</option>`;
          }
        }
        let colorSelect = `
          <select id="color-select" class="color-select">
            <option value="">انتخاب رنگ</option>
            ${colorOptions}
          </select>
        `;
        if (product.PRODUCT_SLIDE.length > 0) {
          for (var k = 0; k < product.PRODUCT_SLIDE.length; k++) {
            slideBTN += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${product.PRODUCT_SLIDE[k].id}" aria-label="${product.PRODUCT_SLIDE[k].slide_title}"></button>`;
            slideimg += `<div class="carousel-item active"> <img src="${product.PRODUCT_SLIDE[k].image.meta.download_url}" class="d-block w-100" alt="${product.PRODUCT_SLIDE[k].slide_title}"/> </div>`;
          }
        }
        // Start send context to html page
        if(product.is_active && product.is_available){
          if(product.PRODUCT_OFFER.length > 0){
            //available And Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#btn_slide_one').html(get_btn_slide_one);
            $('#slide_btn').append(slideBTN);
            $('#slide_image').append(slideimg);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_desc);
            $('#old_product_price').html(get_old_product_price);
            $('#product_price').html(get_product_price_by_offer);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_short_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`);
          }else{
            //available And no offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#btn_slide_one').html(get_btn_slide_one);
            $('#slide_btn').append(slideBTN);
            $('#slide_image').append(slideimg);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_desc);
            $('#old_product_price').html(``);
            $('#product_price').html(get_product_price);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_short_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`);
          }
        }else{
          if(product.PRODUCT_OFFER.length > 0){
            //Not available And Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#btn_slide_one').html(get_btn_slide_one);
            $('#slide_btn').append(slideBTN);
            $('#slide_image').append(slideimg);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_desc);
            $('#old_product_price').html(get_old_product_price);
            $('#product_price').html(get_product_price_by_offer);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_short_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`);
          }else{
            //Not available And NO Offer
            $('#product_title').html(get_product_title);
            $('#product_head').append(get_product_head);
            $('#btn_slide_one').html(get_btn_slide_one);
            $('#slide_btn').append(slideBTN);
            $('#slide_image').append(slideimg);
            $('#product_model_title').html(get_product_model_title);
            $('#product_model_cat').html(get_product_model_cat);
            $('#product_short_desc').html(get_product_desc);
            $('#old_product_price').html(``);
            $('#product_price').html(get_product_price);
            $('#color-select').html(colorSelect);
            $('#product_desc').html(get_product_short_desc);
            $('#product_table').html(get_product_table);
            $('#product_is_available').html(`<h4 id="product_is_available" class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`);
          }
        }
      });
    });
  }

  //SOME LOADS
  loadPages();
});