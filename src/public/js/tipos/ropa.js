$(function () {
    const actionForm = $('#edit-tipoRopa')

    const deleteTipoRopa = $('.delete-tropa')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Tipo de Ropa?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/tipos/ropa/delete/' + id                             
            }
        })
    }

    deleteTipoRopa.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })
  
      $('.editTipoRopa').click(function(){
          const dataTipoRopa = $(this).data("tropa")
  
          var urlTipoRopaForm = '/articulos/tipos/ropa/edit/' + dataTipoRopa
  
          actionForm.prop('action', urlTipoRopaForm)
          
          $.ajax({
              url: '/articulos/tipos/ropa/' + dataTipoRopa,
              success: function(res) {
                    $('#desc_tiposropa').val(res[0].DESC_TIPOSROPA);
              }
          })
  
      })
        
})