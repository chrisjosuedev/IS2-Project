$(function() {

    const actionForm = $('#edit-ropaart')


    const deleteRopa = $('.delete-ropa')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el articulo Ropa?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/ropa/delete/' + id                             
            }
        })
    }

    deleteRopa.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })

    $('.editRopaArt').click(function(){
        const dataRopaArt = $(this).data("ropaart")

        var urlRopaArtForm = '/articulos/ropa/edit/' + dataRopaArt

        actionForm.prop('action', urlRopaArtForm)
        
        $.ajax({
            url: '/articulos/ropa/' + dataRopaArt,
            success: function(res) {
                $('#descripcion').val(res[0].DESCRIPCION);
                $('#marca').val(res[0].ID_MARCA);
                $('#linea').val(res[0].ID_LINEA_ARTICULO);
                $('#color').val(res[0].ID_COLOR);
                $('#talla').val(res[0].TALLA);
                $('#precio').val(res[0].PRECIO_UNIT);
                $('#tiposropa').val(res[0].ID_TIPOSROPA);
            }
        })

    })
    
})