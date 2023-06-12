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
        let get_old_product_price = ``;
        let get_product_price = ``;
        let get_product_is_available = ``;
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
            slideimg += `<div class="carousel-item active"> <img src="${product.PRODUCT_SLIDE[k].image.url}" class="d-block w-100" alt="${product.PRODUCT_SLIDE[k].slide_title}"/> </div>`;
          }
        }
        // SET PRODUCT IF
        if(product.is_active && product.is_available){
          if(product.PRODUCT_OFFER.length > 0){
            //available And Offer
          }else{
            //available And no offer

          }
        }else{
          if(product.PRODUCT_OFFER.length > 0){
            //Not available And Offer

          }else{
            //Not available And NO Offer

          }
        }
      });
    });
  }

  //SOME LOADS
});