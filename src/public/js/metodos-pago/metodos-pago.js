$(function() {

    const actionForm = $('#edit-payment')


    const deletePayment = $('.delete-payment')
    
    // ----- Eliminar Metodo de Pago
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Método de Pago?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/transacciones/metodos-pago/delete/' + id                             
            }
        })
    }

    // -- Boton Eliminar Metodo de Pago
    deletePayment.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })


    $('.editModoPago').click(function(){
        const dataPagos = $(this).data("pagos")

        var urlPaymentForm = '/transacciones/metodos-pago/edit/' + dataPagos

        actionForm.prop('action', urlPaymentForm)
        
        $.ajax({
            url: '/transacciones/metodos-pago/' + dataPagos,
            success: function(res) {
                $('#desc_modopago').val(res[0].DESC_MODOPAGO);
            }
        })

    })
    
})