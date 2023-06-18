$(document).ready(function() {
  var cart
  function pageData() {
    let userID = $('input[name=user]').val();
    $.get(`/api/cart/?ordering=${userID}`, function(data) {
      let rest = data.results;
        for(let api = 0; api <= data.count; api++){
          cart = {
            'id':rest[api].product_id,
            'user':rest[api].product_user,
            'title':rest[api].product_title,
            ''
          };
          console.log(cart);
        }

    });
  }

  // update cart button 
  $('.update_quantity').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_title = $('.product_title').val();
    let product_quantity = $('.quantity').val();
    let product_color_quantity = $('.product_color_quantity').val();
    let data = {
        'product_title': product_title,
        'quantity':product_quantity,
        'product_color_quantity': product_color_quantity,
        csrfmiddlewaretoken: token,
    };
    // Send request to server
    $.ajax({
      url: '/cart/update',
      type: 'POST',
      data: data,
      success: function(response) {
        if (response.success === false) {
          Swal.fire({
            icon: "error",
            title: response.status,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: response.status,
            showConfirmButton: false,
            timer: 2000,
          });
          location.reload(true)
        }
      },
      error: function(xhr, status, error) {
        console.log(status);
        Swal.fire({
          icon: "error",
          title: status,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  });
    // remove item
  $('.remove_from_cart').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_title = $('.product_title').val();
    let data = {
        'product_title': product_title,
        csrfmiddlewaretoken: token,
    };
    // Send request to server
    $.ajax({
      url: '/cart/remove',
      type: 'POST',
      data: data,
      success: function(response) {
        if (response.success === false) {
          Swal.fire({
            icon: "error",
            title: response.status,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: response.status,
            showConfirmButton: false,
            timer: 2000,
          });
          location.reload(true)
        }
      },
      error: function(xhr, status, error) {
        console.log(status);
        Swal.fire({
          icon: "error",
          title: status,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  });
    // apply discount
  $('.discount_code').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_title = $('.product_title').val();
    let product_collection = $('.product_collection').val();
    let product_price = $('.product_price').val();
    let data = {
        'product_title': product_title,
        'product_price': product_price,
        'product_collection': product_collection,
        csrfmiddlewaretoken: token,
    };
    // Send request to server
    $.ajax({
      url: '/cart/discount',
      type: 'POST',
      data: data,
      success: function(response) {
        if (response.success === false) {
          Swal.fire({
            icon: "error",
            title: response.status,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: response.status,
            showConfirmButton: false,
            timer: 2000,
          });
          location.reload(true)
        }
      },
      error: function(xhr, status, error) {
        console.log(status);
        Swal.fire({
          icon: "error",
          title: status,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  });
    // clear cart
  $('.clear_cart').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_id = $('.product_id').val();
    let data = {
        'product_id': product_id,
        csrfmiddlewaretoken: token,
    };
    // Send request to server
    $.ajax({
      url: '/cart/clear',
      type: 'POST',
      data: data,
      success: function(response) {
        if (response.success === false) {
          Swal.fire({
            icon: "error",
            title: response.status,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: response.status,
            showConfirmButton: false,
            timer: 2000,
          });
          location.reload(true)
        }
      },
      error: function(xhr, status, error) {
        console.log(status);
        Swal.fire({
          icon: "error",
          title: status,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  });
  pageData();
});