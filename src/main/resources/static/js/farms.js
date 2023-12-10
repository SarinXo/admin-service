

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


$(document).ready(function () {
    $('#editForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/farms',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var farmCode = data['farmCode'];

                $(`td[data-idEmail='${farmCode}']`).text(data['email']);
                $(`td[data-idDescription='${farmCode}']`).text(data['description']);
                $(`td[data-idAddress='${farmCode}']`).text(data['address']);
                $(`td[data-idLicense='${farmCode}']`).text(data['license']);
                $(`td[data-idMoney='${farmCode}']`).text(data['money']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/farms',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var farmCode = data['farmCode'];

                var newRow = $('<tr>');
                newRow.append($('<td>').attr('data-idFarmCode', farmCode).text(data['farmCode']));
                newRow.append($('<td>').attr('data-idEmail', farmCode).text(data['email']));
                newRow.append($('<td>').attr('data-idDescription', farmCode).text(data['description']));
                newRow.append($('<td>').attr('data-idAddress', farmCode).text(data['address']));
                newRow.append($('<td>').attr('data-idLicense', farmCode).text(data['license']));
                newRow.append($('<td>').attr('data-idMoney', farmCode).text(data['money']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-farm-id': farmCode,
                    'data-email': data['email'],
                    'data-description': data['description'],
                    'data-address': data['address'],
                    'data-license': data['license'],
                    'data-money': data['money']
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm',
                    'onclick': 'deleteRow(this)',
                    'data-farm-id': farmCode
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#farmTable').append(newRow);
                toastr["success"]("Успешно добавлено")

                $('#addModal').modal('hide');
            }
        });
    });
});
//для дефолтных значений
document.addEventListener('DOMContentLoaded', function () {
    var editButtons = document.querySelectorAll('.btn[data-bs-toggle="modal"]');

    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Извлекаем значения из атрибутов data-* кнопки
            var farmCode = button.getAttribute('data-farm-id');
            var email = button.getAttribute('data-email');
            var description = button.getAttribute('data-description');
            var address = button.getAttribute('data-address');
            var license = button.getAttribute('data-license');
            var money = button.getAttribute('data-money');

            // Устанавливаем значения в форме модального окна
            document.getElementById('editFarmCode').value = farmCode;
            document.getElementById('editEmail').value = email;
            document.getElementById('editDescription').value = description;
            document.getElementById('editAddress').value = address;
            document.getElementById('editLicense').value = license;
            document.getElementById('editMoney').value = money;
        });
    });
});

function deleteFarm(button) {
    var farmCode = $(button).data('farm-id');
    Swal.fire({
        title: 'Вы уверены?',
        text: `Вы уверены, что хотите удалить ферму с кодом ${farmCode}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFarmOnServer(farmCode);
        }
    });
}

// Пример AJAX-запроса для удаления на сервере
function deleteFarmOnServer(farmCode) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/farms/' + farmCode,
        success: function () {
            toastr.success('Ферма успешно удалена');
            var element = document.getElementById('row'+farmCode);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении фермы');
        }
    });
}


