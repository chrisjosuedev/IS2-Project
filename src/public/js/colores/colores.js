$(function () {
    const actionForm = $('#edit-color')


    const deleteColor = $('.delete-color')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Color?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/colores/delete/' + id                             
            }
        })
    }

    deleteColor.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })
  
      $('.editColor').click(function(){
          const dataColor = $(this).data("color")
  
          var urlColorForm = '/articulos/colores/edit/' + dataColor
  
          actionForm.prop('action', urlColorForm)
          
          $.ajax({
              url: '/articulos/colores/' + dataColor,
              success: function(res) {
                  $('#desc_color').val(res[0].DESC_COLOR);
              }
          })
  
      })
        
  })
    