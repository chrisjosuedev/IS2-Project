$(function() {
    const noRows = $('#alert')
    const bEmp = $("#bEmp")
    const idEmp = $("#idEmp")

    const idNameEmp = $("#nameEmp")
    const idCodEmp = $("#codEmp")

    const actionForm = $('#edit-Usuario')

    const user = $('#user')
    const msg = $('#msg-valid')
    

    const formusers = $('#users_form')
    const guardarUsuario = $('#saveUsuario')

    const deleteUsuario = $('.delete-user')
    
    // ----- Eliminar Usuario
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Usuario?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/config/usuarios/delete/' + id                             
            }
        })
    }

    // -- Boton Eliminar Usuario
    deleteUsuario.on('click', function() {
        var user = $(this).attr("id")
        confirmarDelete(user)
    })

    // ------------- Mensaje de Validacion
    function msgValidacion (msg) {
        noRows.text(msg)
        noRows.removeClass('d-none')

        setTimeout(function () {
            noRows.addClass('d-none')
        }, 5000)
    }


    // ----------------- Agregar Usuario -------------------- //
    bEmp.on('click', function () {
        var id = idEmp.val()

        $.ajax({
            url: "/persona/empleados/" + id,
            success: function (empleado) {
                if (empleado.length === 0) {
                    msgValidacion("Empleado no existe, ingrese el DNI correctamente.")
                    $('#idEmp').focus()
                    
                }
                else {
                    if (empleado[0].PUESTO === 2) {
                        msgValidacion("ADVERTENCIA: Al personal de seguridad no puede asignarsele un usuario, por favor intente con otro empleado.")
                        $('#idEmp').val('')
                        $('#idEmp').focus()
                    }
                    else {
                        
                        idCodEmp.val(empleado[0].ID_EMPLEADO)
                    
                        if (userId(idCodEmp.val())){
                            // No tiene usuario
                            idNameEmp.val(empleado[0].NOMBRE_PERSONA + ' ' + empleado[0].APELLIDO_PERSONA)
                            $('#user').focus()
                            guardarUsuario.attr('disabled', false)
                        }
                        else {
                            // Tiene usuario
                            idEmp.focus()
                            msgValidacion("El empleado ya tiene un perfil registrado")

                            
                        }

                    }
                }

            }
        })

        
        
    });

    // Verificar el disponibilidad del usuario
    function verificarUsuario(usuario) {
        var submitUsuario = false
        $.ajax({
            url: '/config/usuarios/' + usuario,
            async: false,
            success: function(res) {
                if (res.length === 0) {
                    user.removeClass('is-invalid')
                    msg.addClass('valid-feedback')
                    msg.text("Nombre de usuario disponible")
                    user.addClass('is-valid')
                    msg.removeClass('invalid-feedback')
                    submitUsuario = true
                }
                else {
                    user.addClass('is-invalid')
                    user.removeClass('is-valid')
                    msg.addClass('invalid-feedback')
                    msg.text("Nombre de usuario no disponible")
                    msg.removeClass('valid-feedback')
                    submitUsuario = false
                }
            }
        })
        return submitUsuario
    }


    // ---------- Editar ----------------
       

    $('.editUsuario').click(function(){
        const dataUsuarios = $(this).data("usuario")

        var urlUsuariosForm = '/config/usuarios/edit/' + dataUsuarios

        actionForm.prop('action', urlUsuariosForm)
        
        $.ajax({
            url: '/config/usuarios/' + dataUsuarios,
            success: function(res) {
                $('#username').val(res[0].USERNAME)
                $('#select-rol').val(res[0].ID_ROL)  
            }
        })        

    })

    // Verificar si se desea una nueva contraseña para el usuario
    $('#verify-Password').click(function() {
        if ($('#verify-Password').prop('checked')) {
            $('#password').removeClass('d-none')
            $('#password').focus()
        }
        else {
            $('#password').addClass('d-none')
        }
    })

    // Verificar si el empleado ya tiene un usuario
    function userId(cod) {
        var flag = true
        $.ajax({
            url: '/config/usuarios/empleados/' + cod,
            async: false,
            success: function(res) {
                if (res.length === 0) {
                    flag = true
                }
                else {
                    flag = false
                }
            }
        })
        return flag
    }

    // --------- Verificar Roles
    function verificarRol(id) {
        var rol = false
        $.ajax({
            url: "/persona/empleados/" + id,
            async: false,
            success: function (empleado) {
                if ($('#rol-selected').val() === '1' && empleado.PUESTO != 5) {
                    rol = false
                }
                else if ($('#rol-selected').val() === '4' && empleado.PUESTO != 6) {
                    rol = false
                }
                else {
                    rol = true
                }
            }
        })
        return rol
    }


    // ------------------- Validar Envio de Formulario -------------
    

    formusers.submit(function(event) {
        var idEmpleado = $('#codEmp').val()

        if (verificarUsuario(user.val()) && verificarRol(idEmpleado)) {
            return
        }

        if (!verificarRol(idEmpleado)) {
            msgValidacion("El empleado no puede tener el control de acceso seleccionado.")
        }
        else if (!verificarUsuario(user.val())) {
            msgValidacion("Por favor, cambie el nombre de usuario.")
        }
        event.preventDefault()   
    })

})