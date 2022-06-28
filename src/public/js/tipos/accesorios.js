$(function () {
    const actionForm = $('#edit-tipoAccesorio')

    const deleteTipoAccesorio = $('.delete-taccesorio')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Tipo de Accesorio?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/tipos/accesorios/delete/' + id                             
            }
        })
    }

    deleteTipoAccesorio.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })
  
      $('.editTipoAccesorio').click(function(){
          const dataTipoAccesorio = $(this).data("taccesorio")
  
          var urlTipoAccesorioForm = '/articulos/tipos/accesorios/edit/' + dataTipoAccesorio
  
          actionForm.prop('action', urlTipoAccesorioForm)
          
          $.ajax({
              url: '/articulos/tipos/accesorios/' + dataTipoAccesorio,
              success: function(res) {
                    $('#desc_tipoaccesorio').val(res[0].DESC_TIPOACCESORIO);
              }
          })
  
      })
        
})