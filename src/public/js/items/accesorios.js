$(function() {

    const actionForm = $('#edit-accesorioart')

    const deleteAccesorio = $('.delete-accesorio')
      
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el articulo Accesorio?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/articulos/accesorios/delete/' + id                             
            }
        })
    }

    deleteAccesorio.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })

    $('.editAccesorioArt').click(function(){
        const dataAccesorioArt = $(this).data("accesorioart")

        var urlAccesorioArtForm = '/articulos/accesorios/edit/' + dataAccesorioArt

        actionForm.prop('action', urlAccesorioArtForm)
        
        $.ajax({
            url: '/articulos/accesorios/' + dataAccesorioArt,
            success: function(res) {
                $('#descripcion').val(res[0].DESCRIPCION);
                $('#marca').val(res[0].ID_MARCA);
                $('#linea').val(res[0].ID_LINEA_ARTICULO);
                $('#color').val(res[0].ID_COLOR);
                $('#talla').val(res[0].TALLA);
                $('#precio').val(res[0].PRECIO_UNIT);
                $('#tipoaccesorio').val(res[0].ID_TIPOACCESORIO);
            }
        })

    })
    
})