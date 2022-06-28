$(function() {
  const tableVentas= $('tbody')

  // Revisar si está checado
  if ($('#filterDate').prop('checked')) {
    $('#rangeDate').removeClass('d-none')
  }

  // Verificar si desea buscar por rango de fechas
  $('#filterDate').click(function() {
    if ($('#filterDate').prop('checked')) {
        $('#rangeDate').removeClass('d-none')
    }
    else {
        $('#rangeDate').addClass('d-none')
        // Comprobar value, si es '' no rellenar tabla de nuevo, si lo es rellenar y poner valores
        // por defecto
        if ($('#fecha-in').val() === '' && $("#fecha-out").val() === '') {
          limpiarDate()
        }
        else {
          limpiarDate()
          limpiarTabla()
          defaultTable()
        }
    }
  })

  $("#fecha-out").on("change", function(){
    var fechaIn = $('#fecha-in').val()
    var fechaOut = $(this).val();

    if (fechaIn > fechaOut) {
      $('#alert').text("El rango establecido es incorrecto")
      $('#alert').removeClass('d-none')

      setTimeout(function () {
        $('#alert').addClass('d-none')
      }, 5000)
    }
    else {
      ventasByDate(fechaIn, fechaOut)
    }
  });

  // ------- Funciones 

  function limpiarDate() {
    $('#fecha-in').val('')
    $("#fecha-out").val('')
  }

  function limpiarTabla() {
    tableVentas.html('')
  }
  
  function ventasByDate(init, out) {
    $.ajax({
      url: '/consultas/ventas/fecha/' + init + '/' + out,
      success: function (res) {
        if (res.length === 0) {
          $('#alert').html("No hay ventas registradas entre el " + '<strong>' + init + '</strong>' +  " y el " + '<strong>' + out + '</strong>')
          $('#alert').removeClass('d-none')

          setTimeout(function () {
            $('#alert').addClass('d-none')
          }, 5000)
        }
        else {
          limpiarTabla()
          res.forEach(res => {

            var fecha = new Date(res.FECHA)
            var dd = String(fecha.getDate()).padStart(2, '0');
            var mm = String(fecha.getMonth() + 1).padStart(2, '0');
            var yyyy = fecha.getFullYear();
            fecha = dd + '/' + mm + '/' + yyyy

            tableVentas.append(`
              <tr>
                <td>
                  ${res.ID_FACTURA}
                </td>
                <td>
                  ${res.NOMBRE_PERSONA} ${res.APELLIDO_PERSONA}
                </td>
                <td>
                  ${fecha}
                </td>
                <td>
                  ${res.DESC_MODOPAGO}
                </td>
                <td class="text-right">
                  <a href="/consultas/ventas/detalle/${res.ID_FACTURA}" class="btn btn-secondary">
                    <i class="fas fa-eye"></i>
                  </a>
                  <a href="#" class="btn btn-danger">
                    <i class="fas fa-file-pdf"></i>
                  </a>
                </td>
              </tr>
            `)

          });

        }       
      } 
    })
  }

  function defaultTable() {
    $.ajax({
      url: '/consultas/ventas/listado',
      success: function(res) {

        res.forEach(res => {

          var fecha = new Date(res.FECHA)
          var dd = String(fecha.getDate()).padStart(2, '0');
          var mm = String(fecha.getMonth() + 1).padStart(2, '0');
          var yyyy = fecha.getFullYear();
          fecha = dd + '/' + mm + '/' + yyyy
          
          tableVentas.append(`
            <tr>
              <td>
                ${res.ID_FACTURA}
              </td>
              <td>
                ${res.NOMBRE_PERSONA} ${res.APELLIDO_PERSONA}
              </td>
              <td>
                ${fecha}
              </td>
              <td>
                ${res.DESC_MODOPAGO}
              </td>
              <td class="text-right">
                <a href="/consultas/ventas/detalle/${res.ID_FACTURA}" class="btn btn-secondary">
                  <i class="fas fa-eye"></i>
                </a>
                <a href="#" class="btn btn-danger">
                  <i class="fas fa-file-pdf"></i>
                </a>
              </td>
            </tr>
          `)
          
        });

      }
    })
  }




})