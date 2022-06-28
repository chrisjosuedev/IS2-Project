$(function() {
  const actionForm = $("#edit-resolucion");

  dataResoluciones()


  function dataResoluciones() {
    $.ajax({
      url: '/sys/resoluciones/detalle',
      success: function(res) {

        var formResolucion = "/sys/resoluciones/edit/" + res[0].ID_RESOLUCION;

        actionForm.prop("action", formResolucion);

        $("#cai").val(res[0].CAI);
        $("#serie").val(res[0].SERIE);
        $("#num_inicial").val(res[0].NUM_INICIAL);
        $("#num_final").val(res[0].NUM_FINAL);
        $("#notificar").val(res[0].NOTIFICAR);
        $("#fecha_limite").val(formatDate(res[0].FECHA_LIMITE));
      }
    })
  }

  function formatDate(fecha) {
    var d = new Date(fecha),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }

    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  }

  function verificarCai() {
    var cai = $("#cai").val()

    if (cai.charAt(6) != '-' || cai.charAt(13) != '-' || cai.charAt(20) != '-'
    || cai.charAt(27) != '-' || cai.charAt(34) != '-') {
      msgAlert("Escriba el CAI en el formato correcto. (Ej. 321433-6E8E7B-8D4DA5-6EC686-EB842B-A3)")
      return false
    }
    else {
      $('#alert').addClass('d-none')
      return true
    }
  }

  function verificarSerie() {
    var serie = $("#serie").val()
    console.log(serie.substr(0, 3), serie.substr(4, 6), serie.substr(8, 8))

    if (serie.charAt(3) != '-' || serie.charAt(7) != '-') {
      msgAlert("Escriba el No. Serie en el formato correcto. (Ej. 000-001-01)")
      return false
    }
    else if (isNaN(serie.substr(0, 3))) {
      msgAlert("Escriba el No. Serie en el formato correcto. (Ej. 000-001-01)")
      return false
    }

    else if (isNaN(serie.substr(0, 3))) {
      msgAlert("Escriba el No. Serie en el formato correcto. (Ej. 000-001-01)")
      return false
    }

    else if (isNaN(serie.substr(8, 2))) {
      msgAlert("Escriba el No. Serie en el formato correcto. (Ej. 000-001-01)")
      return false
    }

    else {
      $('#alert').addClass('d-none')
      return true
    }
  }

  function msgAlert(msg) {
    $('#alert').text(msg)
    $('#alert').removeClass('d-none')
  }

  function verificarRango() {
    var inicial = $("#num_inicial").val();
    var final = $("#num_final").val();
    
    if (parseInt(inicial) > parseInt(final)) {
      msgAlert("Rango inicial no puede ser mayor que el final.")
      return false
    }
    else {
      $('#alert').addClass('d-none')
      return true
    }
  }

  actionForm.submit(function (event) {
    if (verificarCai() && verificarSerie() && verificarRango()) {
      return
    }
    event.preventDefault();
  });

})