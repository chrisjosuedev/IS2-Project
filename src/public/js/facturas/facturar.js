$(function () {
  const noFound = $("#alert");
  const tableVenta = $("tbody");
  const btnAgregar = $("#btn-agregar");
  const ventasForm = $("#facturar_form");

  // Evitar Submit Post ---
  $(".factura_input").keypress(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      e.preventDefault();
    }
  });

  // Buscar ENTER KEY Cliente
  $("#id_cliente").keypress(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      var id = $(this).val();
      startCliente(id);
    }
  });

  // Buscar Click Cliente
  $("#btn_buscar_cliente").click(function () {
    var id = $("#id_cliente").val();
    startCliente(id);
  });

  // Buscar ENTER KEY Articulo
  $("#id_producto").keypress(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      var cod = $(this).val();
      startArticulo(cod);
    }
  });

  // Buscar Click Articulo
  $("#btn_buscar_producto").click(function () {
    var cod = $("#id_producto").val();
    startArticulo(cod);
  });

  // ENTER PRECIO COMPRA
  $("#cantidad_compra").keypress(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      agregarTabla();
    }
  });

  // Cambio
  $("#txtefectivo").keyup(function (e) {

      var current = parseFloat($(this).val());
      var totalFact = parseFloat($('#total_fact').val());
      
      
      if (current < totalFact) {
        $("#cambio_efectivo").text("Por favor, ingrese una cantidad correcta.");
      } 
      else if ($(this).val() === ''){
        $("#cambio_efectivo").text("El cambio es: L. 0.00")
      }
      else {
        var cambio = (current - totalFact).toFixed(2);
        $("#cambio_efectivo").text("El cambio es: L. " + cambio);
      }
      
  });

  // Combo Box Efectivo
  $('#modo_pago').on('change', function () {
    if (this.value === '2') {
      $("#txtefectivo").val('0.00')
      $("#cambio_efectivo").text("El cambio es: L. 0.00")
      $('#txtefectivo').prop('disabled', true);
    }
    else {
      $('#txtefectivo').prop('disabled', false);
      $('#txtefectivo').val('');
    }  
})

  // Boton agregar
  btnAgregar.click(function () {
    agregarTabla();
  });

  // ------------ Funciones

  // Agregar a Tabla
  function agregarTabla() {
    let cantidad = $("#cantidad_compra").val();
    let precioUnit = $("#precio_unit").val();
    let cliente = $("#id_cliente").val();

    if (cantidad === "" || precioUnit === "" || cliente === "") {
      alertFound("Por favor, ingrese todos los datos solicitados.");
    } else {
      var artId = $("#id_producto").val();
      if (!verificarStock(artId, cantidad)) {
        alertFound("No hay suficiente cantidad en stock, revise nuevamente.");
        $("#cantidad_compra").focus();
      } else {
        let stItem = parseInt(cantidad) * parseFloat(precioUnit);

        tableVenta.append(`
              <tr class="isRow">
                  <td> ${$("#id_producto").val()} 
                      <input type="number" name="id_articulo" value="${$(
                        "#id_producto"
                      ).val()}" hidden/> 
                  </td>
                  <td> ${$("#descripcion").val()} </td>
                  <td> ${cantidad} 
                      <input type="number" name="cantidad" value="${cantidad}" hidden/>
                  </td>
                  <td> ${precioUnit} 
                      <input type="number" name="precio_unit" value="${precioUnit}" hidden/>
                  </td>
                  <td> L. ${stItem.toFixed(2)} </td>
                  <td>
                      <button class="btn btn-danger btnDeleteItem">
                          <i class="fa fa-trash"></i>
                      </button>
                  </td>
              </tr>
        `);

        cleanFields();

        $(".btnDeleteItem").click(function () {
          $(this).closest("tr").remove();
          sumarDatos();
        });
      }

      sumarDatos();
    }
  }

  // Verificar si hay suficiente en STOCK
  function verificarStock(art, cant) {
    var stock = true;
    $.ajax({
      url: "/articulos/general/" + art,
      async: false,
      success: function (res) {
        if (res[0].STOCK >= parseInt(cant)) {
          stock = true;
        } else {
          stock = false;
        }
      },
    });
    return stock;
  }

  // Calculo de Subtotal
  function sumarDatos() {
    var st = 0;
    var isv = 0;
    var total = 0;

    $("#table-venta tbody tr").each(function () {
      var stColumn = $(this).find("td").eq(4).html();
      var newStColumn = stColumn.substring(4, stColumn.length - 1);
      st += parseFloat(newStColumn);
    });

    isv = st * 0.15;
    total = st + isv;

    $("#st-venta").val("L. " + st.toFixed(2));
    $("#isv").val("L. " + isv.toFixed(2));
    $("#total").val("L. " + total.toFixed(2));

    $("#total_fact").val(total.toFixed(2));

    // Contador de Filas
    $("#contadorFilas").val(contarFilas());
  }

  function cleanFields() {
    $("#id_producto").val("");
    $("#descripcion").val("");
    $("#cantidad_compra").val("");
    $("#precio_unit").val("");
    $("#id_producto").focus();
  }

  function startCliente(idCliente) {
    if (idCliente === "") {
      alertFound("Ingrese código del Cliente");
    } else {
      foundCliente(idCliente);
    }
  }

  function foundCliente(id) {
    $.ajax({
      url: "/persona/clientes/" + id,
      success: function (res) {
        if (res.length === 0) {
          alertFound("Cliente no existe, revise el código ingresado");
        } else {
          $("#name-cli").val(
            res[0].NOMBRE_PERSONA + " " + res[0].APELLIDO_PERSONA
          );
          $("#cel-cli").val(res[0].CELULAR);
          $("#modo_pago").focus();
        }
      },
    });
  }

  function startArticulo(idArticulo) {
    if (idArticulo === "") {
      alertFound("Ingrese código del Artículo");
    } else {
      foundArticulo(idArticulo);
    }
  }

  function foundArticulo(codigo) {
    $.ajax({
      url: "/articulos/general/" + codigo,
      success: function (res) {
        if (res.length === 0) {
          alertFound("Artículo no existe, revise el código ingresado");
        } else {
          $("#descripcion").val(res[0].DESCRIPCION);
          $("#precio_unit").val(res[0].PRECIO_UNIT);
          $("#cantidad_compra").val(" ");
          $("#cantidad_compra").focus();
        }
      },
    });
  }

  function alertFound(msg) {
    noFound.text(msg);
    noFound.removeClass("d-none");

    setTimeout(function () {
      noFound.addClass("d-none");
    }, 5000);
  }

  // Contar Filas

  function contarFilas() {
    var numFilas = 0;
    $(".isRow").each(function () {
      numFilas++;
    });
    return numFilas;
  }

  // ---------- Validaciones

  // Validar que no ha modificado el cliente
  function verificarCliente(id) {
    var flag = true;
    $.ajax({
      url: "/persona/clientes/" + id,
      async: false,
      success: function (res) {
        if (res.length === 0) {
          alertFound("Cliente no existe, revise el código ingresado");
          $("#id_cliente").focus();
          flag = false;
        } else {
          flag = true;
        }
      },
    });
    return flag;
  }

  ventasForm.submit(function (event) {
    var id = $("#id_cliente").val();

    if (verificarCliente(id) && contarFilas() > 0) {
      return;
    }

    alertFound("Por favor, ingrese los datos correctamente.");
    event.preventDefault();
  });
});
