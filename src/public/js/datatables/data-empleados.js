$(function () {
    $("#dataEmpleados").DataTable({
        language: {
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "search": "Buscar:",
            "lengthMenu": "Mostrar _MENU_ registros",
            "emptyTable": "No existen empleados registrados",
            "zeroRecords": "No se encontraron coincidencias",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered": "(Filtrado de _MAX_ total de entradas)",
            "lengthMenu": "Mostrar _MENU_ entradas"
        },
        responsive: "true",
        dom: "Bfrtilp",
        buttons:[
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                titleAttr: 'Exportar a Excel',
                title: 'Magistral Store',
                messageTop: 'EMPLEADOS DE LA EMPRESA',
                filename: 'Empleados de Magistral Store',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i>',
                titleAttr: 'Exportar a PDF',
                title: 'Magistral Store',
                filename: 'Empleados de Magistral Store',
                messageTop: 'Empleados de Magistral Store',
                className: 'btn btn-danger',
            }
        ]
    });
});
  