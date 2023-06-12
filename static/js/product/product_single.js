$(document).ready(function() {
  function loadPages() {
    var currentPath = window.location.pathname;
    var slug = currentPath.split('/').filter(Boolean).pop();
    $.getJSON(`/UNIQUEAPI174/pages/?slug=${slug}`, function(data) {
      var productPages = data.items[0];
      $.getJSON(`/UNIQUEAPI174/pages/${productPages.id}`, function(Data) {
        var product = Data;
        document.title = product.title;
        var colorOptions = '';
        if (product.PRODUCT_COLORS.length > 0) {
          for (var j = 0; j < product.PRODUCT_COLORS.length; j++) {
            colorOptions += `<option value="${product.PRODUCT_COLORS[j].color}">${product.PRODUCT_COLORS[j].color_title}</option>`;
          }
        }
        var colorSelect = `
          <select id="color-select" class="color-select">
            <option value="">انتخاب رنگ</option>
            ${colorOptions}
          </select>
        `;

        if (product.is_active && product.is_active) {
            if (product.PRODUCT_OFFER.length > 0) {
                var getProductName = `<h1 class="blogh1 white-color">${product.title}</h1>`
                var getProductHeader = `<li>
                <a href="#" class="text-light-emphasis">2020black.com</a>
              </li>
              <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
              <li>
                <a href="#" class="text-light-emphasis">${product.product_title}</a>
              </li>`
                var getProductDesc = `<h1 class="blog-post-title h2">${product.product_title}</h1>
                <div class="blog-post-meta">
                  <span class="bi bi-folder2-open"
                    ><a href="">${product.collection.title}</a></span
                  >
                </div>
                <p>${product.short_description}</p>
                <div class="container text-center">
                  <div class="row text-start">
                    <div class="col">
                      <span class="bi bi-truck navliststyle">
                        ارسال به سراسر کشور</span
                      ><br />
                      <span class="bi bi-award navliststyle"
                        >ضمانت بازگشت وجه</span
                      >
                    </div>
                    <div class="col">
                      <li class="bi bi-alarm navliststyle">ارسال 2 روزه</li>
        
                      <br />
                      <span class="bi bi-bag-check navliststyle">
                        خرید به صورت قسطی
                      </span>
                    </div>
                  </div>
                  <div class="mt-3 proasidecatrec">
                    <h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                    <div class="text-center">
                      <span class="h4 text-decoration-line-through icon2"
                        >${product.price}</span
                      ><br />
                      <span class="h1">${product.PRODUCT_OFFER[0].value}</span><br />
                      <span
                        class="decrement cursor bi bi-dash-square-fill red-color"
                      ></span>
                      <span class="count">1</span>
                      <span
                        class="increment cursor bi bi-plus-square-fill red-color"
                      ></span>
                      <div class="color-picker">
                        <div class="row"></div>
                        ${colorSelect}
                        <div class="selected-color"></div>
                      </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                    </div>
                    <button
                      type="submit"
                      class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                    >
                      مقایسه محصول
                    </button>
                    <button
                      type="submit"
                      class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                    >
                      علاقه مندی
                    </button>
                    <h4 class="h4 mt-2 text-center">
                      محصول در انبار موجود میباشد
                    </h4>
                  </div>
                </div>`
                var getProductMore = `<h4 class="cursor">توضیحات بیشتر</h4>
                <p>${product.short_description}</p>
                <h4 class="cursor">جدول مشخصات</h4>
                <table class="Specificationslist">
                  <tr>
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
                  </tr>
                </table>`
                var getProductPay = `<h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                <div class="text-center">
                  <span class="h4 text-decoration-line-through icon2"
                    >${product.price} تومان</span
                  ><br />
                  <span class="h1">${product.PRODUCT_OFFER[0].value} تومان</span><br />
                  <span
                    class="decrement cursor bi bi-dash-square-fill red-color"
                  ></span>
                  <span class="count">1</span>
                  <span
                    class="increment cursor bi bi-plus-square-fill red-color"
                  ></span>
                  <div class="color-picker">
                    <div class="row"></div>
                    ${colorSelect}
                    <div class="selected-color" s></div>
                  </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                </div>
                <button
                  type="submit"
                  class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                >
                  مقایسه محصول
                </button>
                <button
                  type="submit"
                  class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                >
                  علاقه مندی
                </button>
                <h4 class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`
        
                $('#product_name').append(getProductName);
                $('#product_header').append(getProductHeader);
                $('#product_desc').append(getProductDesc);
                $('#product_more').append(getProductMore);
                $('#product_pay').append(getProductPay);
              
            }else{
                var getProductName = `<h1 class="blogh1 white-color">${product.title}</h1>`
                var getProductHeader = `<li>
                <a href="#" class="text-light-emphasis">2020black.com</a>
              </li>
              <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
              <li>
                <a href="#" class="text-light-emphasis">${product.product_title}</a>
              </li>`
                var getProductDesc = `<h1 class="blog-post-title h2">${product.product_title}</h1>
                <div class="blog-post-meta">
                  <span class="bi bi-folder2-open"
                    ><a href="">${product.collection.title}</a></span
                  >
                </div>
                <p>${product.short_description}</p>
                <div class="container text-center">
                  <div class="row text-start">
                    <div class="col">
                      <span class="bi bi-truck navliststyle">
                        ارسال به سراسر کشور</span
                      ><br />
                      <span class="bi bi-award navliststyle"
                        >ضمانت بازگشت وجه</span
                      >
                    </div>
                    <div class="col">
                      <li class="bi bi-alarm navliststyle">ارسال 2 روزه</li>
        
                      <br />
                      <span class="bi bi-bag-check navliststyle">
                        خرید به صورت قسطی
                      </span>
                    </div>
                  </div>
                  <div class="mt-3 proasidecatrec">
                    <h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                    <div class="text-center">
                      <span class="h1">${product.price}</span><br />
                      <span
                        class="decrement cursor bi bi-dash-square-fill red-color"
                      ></span>
                      <span class="count">1</span>
                      <span
                        class="increment cursor bi bi-plus-square-fill red-color"
                      ></span>
                      <div class="color-picker">
                        <div class="row"></div>
                        ${colorSelect}
                        <div class="selected-color"></div>
                      </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                    </div>
                    <button
                      type="submit"
                      class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                    >
                      مقایسه محصول
                    </button>
                    <button
                      type="submit"
                      class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                    >
                      علاقه مندی
                    </button>
                    <h4 class="h4 mt-2 text-center">
                      محصول در انبار موجود میباشد
                    </h4>
                  </div>
                </div>`
                var getProductMore = `<h4 class="cursor">توضیحات بیشتر</h4>
                <p>${product.short_description}</p>
                <h4 class="cursor">جدول مشخصات</h4>
                <table class="Specificationslist">
                  <tr>
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
                  </tr>
                </table>`
                var getProductPay = `<h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                <div class="text-center">
                  <span class="h1">${product.price} تومان</span><br />
                  <span
                    class="decrement cursor bi bi-dash-square-fill red-color"
                  ></span>
                  <span class="count">1</span>
                  <span
                    class="increment cursor bi bi-plus-square-fill red-color"
                  ></span>
                  <div class="color-picker">
                    <div class="row"></div>
                    ${colorSelect}
                    <div class="selected-color" s></div>
                  </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                </div>
                <button
                  type="submit"
                  class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                >
                  مقایسه محصول
                </button>
                <button
                  type="submit"
                  class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                >
                  علاقه مندی
                </button>
                <h4 class="h4 mt-2 text-center">محصول در انبار موجود میباشد</h4>`
        
                $('#product_name').append(getProductName);
                $('#product_header').append(getProductHeader);
                $('#product_desc').append(getProductDesc);
                $('#product_more').append(getProductMore);
                $('#product_pay').append(getProductPay);
              
            }
        }else{
            if (product.PRODUCT_OFFER.length > 0) {
                var getProductName = `<h1 class="blogh1 white-color">${product.title}</h1>`
                var getProductHeader = `<li>
                <a href="#" class="text-light-emphasis">2020black.com</a>
              </li>
              <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
              <li>
                <a href="#" class="text-light-emphasis">${product.product_title}</a>
              </li>`
                var getProductDesc = `<h1 class="blog-post-title h2">${product.product_title}</h1>
                <div class="blog-post-meta">
                  <span class="bi bi-folder2-open"
                    ><a href="">${product.collection.title}</a></span
                  >
                </div>
                <p>${product.short_description}</p>
                <div class="container text-center">
                  <div class="row text-start">
                    <div class="col">
                      <span class="bi bi-truck navliststyle">
                        ارسال به سراسر کشور</span
                      ><br />
                      <span class="bi bi-award navliststyle"
                        >ضمانت بازگشت وجه</span
                      >
                    </div>
                    <div class="col">
                      <li class="bi bi-alarm navliststyle">ارسال 2 روزه</li>
        
                      <br />
                      <span class="bi bi-bag-check navliststyle">
                        خرید به صورت قسطی
                      </span>
                    </div>
                  </div>
                  <div class="mt-3 proasidecatrec">
                    <h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                    <div class="text-center">
                      <span class="h4 text-decoration-line-through icon2"
                        >${product.price}</span
                      ><br />
                      <span class="h1">${product.PRODUCT_OFFER[0].value}</span><br />
                      <span
                        class="decrement cursor bi bi-dash-square-fill red-color"
                      ></span>
                      <span class="count">1</span>
                      <span
                        class="increment cursor bi bi-plus-square-fill red-color"
                      ></span>
                      <div class="color-picker">
                        <div class="row"></div>
                        ${colorSelect}
                        <div class="selected-color"></div>
                      </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                    </div>
                    <button
                      type="submit"
                      class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                    >
                      مقایسه محصول
                    </button>
                    <button
                      type="submit"
                      class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                    >
                      علاقه مندی
                    </button>
                    <h4 class="h4 mt-2 text-center">
                      محصول در انبار موجود نیست
                    </h4>
                  </div>
                </div>`
                var getProductMore = `<h4 class="cursor">توضیحات بیشتر</h4>
                <p>${product.short_description}</p>
                <h4 class="cursor">جدول مشخصات</h4>
                <table class="Specificationslist">
                  <tr>
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
                  </tr>
                </table>`
                var getProductPay = `<h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                <div class="text-center">
                  <span class="h4 text-decoration-line-through icon2"
                    >${product.price} تومان</span
                  ><br />
                  <span class="h1">${product.PRODUCT_OFFER[0].value} تومان</span><br />
                  <span
                    class="decrement cursor bi bi-dash-square-fill red-color"
                  ></span>
                  <span class="count">1</span>
                  <span
                    class="increment cursor bi bi-plus-square-fill red-color"
                  ></span>
                  <div class="color-picker">
                    <div class="row"></div>
                    ${colorSelect}
                    <div class="selected-color" s></div>
                  </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                </div>
                <button
                  type="submit"
                  class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                >
                  مقایسه محصول
                </button>
                <button
                  type="submit"
                  class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                >
                  علاقه مندی
                </button>
                <h4 class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`
        
                $('#product_name').append(getProductName);
                $('#product_header').append(getProductHeader);
                $('#product_desc').append(getProductDesc);
                $('#product_more').append(getProductMore);
                $('#product_pay').append(getProductPay);
              
            }else{
                var getProductName = `<h1 class="blogh1 white-color">${product.title}</h1>`
                var getProductHeader = `<li>
                <a href="#" class="text-light-emphasis">2020black.com</a>
              </li>
              <li><a href="#" class="text-light-emphasis">${product.collection.title}</a></li>
              <li>
                <a href="#" class="text-light-emphasis">${product.product_title}</a>
              </li>`
                var getProductDesc = `<h1 class="blog-post-title h2">${product.product_title}</h1>
                <div class="blog-post-meta">
                  <span class="bi bi-folder2-open"
                    ><a href="">${product.collection.title}</a></span
                  >
                </div>
                <p>${product.short_description}</p>
                <div class="container text-center">
                  <div class="row text-start">
                    <div class="col">
                      <span class="bi bi-truck navliststyle">
                        ارسال به سراسر کشور</span
                      ><br />
                      <span class="bi bi-award navliststyle"
                        >ضمانت بازگشت وجه</span
                      >
                    </div>
                    <div class="col">
                      <li class="bi bi-alarm navliststyle">ارسال 2 روزه</li>
        
                      <br />
                      <span class="bi bi-bag-check navliststyle">
                        خرید به صورت قسطی
                      </span>
                    </div>
                  </div>
                  <div class="mt-3 proasidecatrec">
                    <h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                    <div class="text-center">
                      <span class="h1">${product.price}</span><br />
                      <span
                        class="decrement cursor bi bi-dash-square-fill red-color"
                      ></span>
                      <span class="count">1</span>
                      <span
                        class="increment cursor bi bi-plus-square-fill red-color"
                      ></span>
                      <div class="color-picker">
                        <div class="row"></div>
                        ${colorSelect}
                        <div class="selected-color"></div>
                      </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                    </div>
                    <button
                      type="submit"
                      class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                    >
                      مقایسه محصول
                    </button>
                    <button
                      type="submit"
                      class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                    >
                      علاقه مندی
                    </button>
                    <h4 class="h4 mt-2 text-center">
                      محصول در انبار موجود نیست
                    </h4>
                  </div>
                </div>`
                var getProductMore = `<h4 class="cursor">توضیحات بیشتر</h4>
                <p>${product.short_description}</p>
                <h4 class="cursor">جدول مشخصات</h4>
                <table class="Specificationslist">
                  <tr>
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
                  </tr>
                </table>`
                var getProductPay = `<h4 class="h3 bchs">خرید و پرداخت آنلاین</h4>
                <div class="text-center">
                  <span class="h1">${product.price} تومان</span><br />
                  <span
                    class="decrement cursor bi bi-dash-square-fill red-color"
                  ></span>
                  <span class="count">1</span>
                  <span
                    class="increment cursor bi bi-plus-square-fill red-color"
                  ></span>
                  <div class="color-picker">
                    <div class="row"></div>
                    ${colorSelect}
                    <div class="selected-color" s></div>
                  </div>
                      <input type="hidden" name="product_id" value="${product.id}">
                      <input type="hidden" class="color-input" name="selected_color" value="">
                      <input type="number" name="quantity" value="1" min="1">
                      <button class="w-100 btn btn-danger addtocard" type="submit">افزودن به سبد خرید</button>
                </div>
                <button
                  type="submit"
                  class="w-100 bi bi-arrow-left-right mt-2 btn btn-outline-danger"
                >
                  مقایسه محصول
                </button>
                <button
                  type="submit"
                  class="bi bi-heart w-100 mt-2 btn btn-outline-danger"
                >
                  علاقه مندی
                </button>
                <h4 class="h4 mt-2 text-center">محصول در انبار موجود نیست</h4>`
        
                $('#product_name').append(getProductName);
                $('#product_header').append(getProductHeader);
                $('#product_desc').append(getProductDesc);
                $('#product_more').append(getProductMore);
                $('#product_pay').append(getProductPay);
              
            }
        }

    });
  }
)};

loadPages();
});
loadPages();