$(document).ready(function() {
  // update cart button 
  $('#update_quantity').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let cart_id = $('input[name=cart_id]').val();
    let product_title = $('input[name=product_title]').val();
    let product_color_quantity = $('input[name=product_color_quantity]').val();
    let product_quantity = $('input[name=quantity]').val();
    let data = {
        'cart_id':cart_id,
        'product_title': product_title,
        'quantity':product_quantity,
        'product_color_quantity': product_color_quantity,
        csrfmiddlewaretoken: token,
    };
    console.log(product_quantity);
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
          location.reload(true);
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
  $('#remove_from_cart').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_title = $('input[name=product_title]').val();
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
          location.reload(true);
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
  $('#discount_code').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_title = $('input[name=product_title]').val();
    let product_collection = $('input[name=product_collection]').val();
    let product_price = $('input[name=product_price]').val();
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
          location.reload(true);
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
  $('#clear_cart').click(function(e) {
    e.preventDefault();
    let token = $('input[name=csrfmiddlewaretoken]').val();
    let product_id = $('input[name=product_id]').val();
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
});