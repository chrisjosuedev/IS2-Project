$(function () {
    const actionForm = $('#edit-tipoCalzado')

    const deleteTipoCalzado = $('.delete-tcalzado')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Tipo de Calzado?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/tipos/calzado/delete/' + id                             
            }
        })
    }

    deleteTipoCalzado.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })
  
      $('.editTipoCalzado').click(function(){
          const dataTipoCalzado = $(this).data("tcalzado")
  
          var urlTipoCalzadoForm = '/articulos/tipos/calzado/edit/' + dataTipoCalzado
  
          actionForm.prop('action', urlTipoCalzadoForm)
          
          $.ajax({
              url: '/articulos/tipos/calzado/' + dataTipoCalzado,
              success: function(res) {
                    $('#desc_tipocalzado').val(res[0].DESC_TIPOCALZADO);
              }
          })
  
      })
        
})