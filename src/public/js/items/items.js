$(function () {

  const tipoArticulo = $("#tipo_articulo")
  const detalleArticulo = $("#detalle_articulo")

  const formNewArticulo = $("#form-newArticulo")


  const msgTipo = $('#msg-tipo')
  const msgDetalle = $('#msg-detalle')

  function urlTipoArticulo (urlGet) { 
    if (urlGet != 'none') {
      $.ajax({
        url: urlGet,
        success: function (res) {
          detalleArticulo.empty()
          if (urlGet === '/articulos/tipos/ropa-list') {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOSROPA}'> ${res.DESC_TIPOSROPA} </option>
              `)
            })
            formNewArticulo.prop('action', '/articulos/newRopa')
          }
          else if (urlGet === '/articulos/tipos/calzado-list') {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOCALZADO}'> ${res.DESC_TIPOCALZADO} </option>
              `)
            })
            formNewArticulo.prop('action', '/articulos/newCalzado')
          }
          else {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOACCESORIO}'> ${res.DESC_TIPOACCESORIO} </option>
              `)
            })
            formNewArticulo.prop('action', '/articulos/newAccesorio')
          }
        }
      })
    }
  }

  tipoArticulo.on('change', function () {
    if (this.value === '1') {
      var url = '/articulos/tipos/ropa-list'
      detalleArticulo.prop('name', 'id_tiposropa')
    }
    else if (this.value === '2') {
      var url = '/articulos/tipos/calzado-list'
      detalleArticulo.prop('name', 'id_tipocalzado')
    }
    else if (this.value === '3') {
      var url = '/articulos/tipos/accesorios-list'
      detalleArticulo.prop('name', 'id_tipoaccesorio')
    }
    else {
      var url = 'none'
      detalleArticulo.empty()
      detalleArticulo.append(`<option value='0' selected>  - Seleccione Detalle - </option>`)
      detalleArticulo.prop('name', 'temp')
      formNewArticulo.prop('action', '')
    }

    urlTipoArticulo(url)  
  });

  // ----------------- Validaciones ------------------
  function verificarSelects() {
      if ($('#detalle_articulo').val() === '0' || $('#tipo_articulo').val() === '0') {
        $('#detalle_articulo').addClass('is-invalid')
        $('#detalle_articulo').removeClass('is-valid')
        msgDetalle.addClass('invalid-feedback')
        msgDetalle.text("Seleccione un árticulo detalle válido")
        msgDetalle.removeClass('valid-feedback')

        $('#tipo_articulo').addClass('is-invalid')
        $('#tipo_articulo').removeClass('is-valid')
        msgTipo.addClass('invalid-feedback')
        msgTipo.text("Seleccione un Tipo de artículo Válido")
        msgTipo.removeClass('valid-feedback')

        return false

    }
    else {
        $('#detalle_articulo').removeClass('is-invalid')
        msgDetalle.addClass('valid-feedback')
        msgDetalle.text("Seleccione un árticulo detalle válido")
        $('#detalle_articulo').addClass('is-valid')
        msgDetalle.removeClass('invalid-feedback')

        $('#tipo_articulo').removeClass('is-invalid')
        msgTipo.addClass('valid-feedback')
        msgTipo.text("Seleccione un Tipo de artículo Válido")
        $('#tipo_articulo').addClass('is-valid')
        msgTipo.removeClass('invalid-feedback')

        return true
    }
  }



  // ----------- Validacion Formulario Agregar Ítem
  formNewArticulo.submit(function(event) {

    if (verificarSelects()) {
        return
    }
    
    event.preventDefault() 
    
})


})
