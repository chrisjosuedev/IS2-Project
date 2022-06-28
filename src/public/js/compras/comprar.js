$(function() {

    const noFound = $('#alert')
    const tableCompra = $('tbody')
    const btnAgregar = $('#btn-agregar')
    const comprasForm = $('#compra_form')

    // Evitar Submit Post
    $('.compra_input').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            e.preventDefault()
        }   
    })
    
    // Buscar ENTER KEY Proveedor
    $("#id_proveedor").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            var id = $(this).val()
            startProveedor(id)        
        }   
    })

    // Buscar Click Proveedor
    $('#btn_buscar_proveedor').click(function() {
        var id = $("#id_proveedor").val()
        startProveedor(id)
    })

    // Buscar ENTER KEY Articulo
    $("#id_producto").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            var cod = $(this).val()
            startArticulo(cod)            
        }   
    })

    // Buscar Click Articulo
    $('#btn_buscar_producto').click(function() {
        var cod = $("#id_producto").val()
        startArticulo(cod)
    })

    // ENTER FOCUS 
    $("#cantidad_compra").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $('#precio_compra').focus()            
        }   
    })


    // ENTER PRECIO COMPRA
    $('#precio_compra').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            agregarTabla()            
        } 
    })
    
    // Boton agregar
    btnAgregar.click(function() {
        agregarTabla()
    })

    
    // ------------- FUNCIONES

    // Agregar a tabla
    function agregarTabla() {
        let cantidad = $('#cantidad_compra').val()
        let precioUnit = $('#precio_compra').val()
        let proveedor = $("#id_proveedor").val()

        if (cantidad === '' || precioUnit === '' || proveedor === '') {
            alertFound("Por favor, ingrese todos los datos solicitados.")
        }
        else {
            let stItem = parseInt(cantidad) * parseFloat(precioUnit)

            tableCompra.append(`
                <tr class="isRow">
                    <td> ${$("#id_producto").val()} 
                        <input type="number" name="id_articulo" value="${$("#id_producto").val()}" hidden/> 
                    </td>
                    <td> ${$("#descripcion").val()} </td>
                    <td> ${cantidad} 
                        <input type="number" name="cantidad" value="${cantidad}" hidden/>
                    </td>
                    <td> ${precioUnit} 
                        <input type="number" name="precio_compra" value="${precioUnit}" hidden/>
                    </td>
                    <td> L. ${stItem.toFixed(2)} </td>
                    <td>
                        <button class="btn btn-danger btnDeleteItem">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `)
            
            cleanFields()
            
            $('.btnDeleteItem').click(function() {
                $(this).closest("tr").remove()
                sumarDatos()
            })
        }

        sumarDatos()
    }

    // Calculo de Subtotal
    function sumarDatos() {
        var st = 0
        var isv = 0
        var total = 0

        $('#table-compra tbody tr').each(function() {
            var stColumn = $(this).find('td').eq(4).html()
            var newStColumn = stColumn.substring(4, stColumn.length - 1)
            st += parseFloat(newStColumn)
        })

        isv = st * 0.15
        total = st + isv

        $('#st-compra').val('L. ' + st.toFixed(2))
        $('#isv').val('L. ' + isv.toFixed(2))
        $('#total').val('L. ' + total.toFixed(2))
        // Contador de Filas
        $('#contadorFilas').val(contarFilas())
    }
   

    function cleanFields() {
        $("#id_producto").val('')
        $("#descripcion").val('')
        $('#cantidad_compra').val('')
        $('#precio_compra').val('')
        $("#id_producto").focus()
    }

    function startArticulo(idArticulo) {
        if (idArticulo === '') {
            alertFound("Ingrese código del Artículo")
        }
        else {
            foundArticulo(idArticulo)
        }
    }

    function startProveedor(idProveedor) {
        if (idProveedor === '') {
            alertFound("Ingrese código del Proveedor")
        }
        else {
            foundProveedor(idProveedor)
        }
    }

    function foundProveedor(id) {
        $.ajax({
            url: '/proveedores/' + id,
            success: function(res) {
                if (res.length === 0) {
                    alertFound("Proveedor no existe, revise el código ingresado")
                }
                else {
                    $('#nombre_proveedor').val(res[0].NOMBRE_PROVEEDOR)
                    $('#cel_pro').val(res[0].CEL_PROVEEDOR)
                    $('#id_producto').focus()
                }
            }
        })
    }

    function foundArticulo (codigo) {
        $.ajax({
            url: '/articulos/general/' + codigo,
            success: function(res) {
                if (res.length === 0) {
                    alertFound("Artículo no existe, revise el código ingresado")
                }
                else {
                    $('#descripcion').val(res[0].DESCRIPCION)
                    $('#cantidad_compra').focus()   
                }
                
            }
        })
    }

    function alertFound(msg) {
        noFound.text(msg)
        noFound.removeClass('d-none')

        setTimeout(function () {
            noFound.addClass('d-none')
        }, 5000)
    }

    function contarFilas() {
        var numFilas = 0
        $(".isRow").each(function() {
            numFilas++;
        })
        return numFilas
    }

    // -------------------- Validar Formulario
    // ----- Verificar que no ha modificado el Proveedor
    function verificarProveedor(rtn) {
        var flag = true
        $.ajax({
            url: '/proveedores/' + rtn,
            async: false,
            success: function(res) {
                if (res.length === 0) {
                    alertFound("Proveedor no existe, revise el código ingresado")
                    $("#id_proveedor").focus()
                    flag = false
                }
                else {
                    flag = true
                }
            }
        })
        return flag
    }

    comprasForm.submit(function(event) {
        var rtn = $("#id_proveedor").val()

        // Si filas === 0
        // Verificar que existe un RTN de Proveedor Valido
        
        if ((verificarProveedor(rtn)) && (contarFilas() > 0)) {
            return
        }

        alertFound("Por favor, ingrese los datos correctamente.")
        event.preventDefault() 
        
    })

})