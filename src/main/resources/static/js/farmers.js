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
            url: '/admin-rest/farmers',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var farmerId = data['id'];

                $(`td[data-name = '${farmerId}']`).text(data['name']);
                $(`td[data-surname = '${farmerId}']`).text(data['surname']);
                $(`td[data-patronymic = '${farmerId}']`).text(data['patronymic']);
                $(`td[data-email  = '${farmerId}']`).text(data['email']);
                $(`td[data-description = '${farmerId}']`).text(data['description']);
                $(`td[data-farmId = '${farmerId}']`).text(data['farmId']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/farmers',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var farmerId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+farmerId);
                newRow.append($('<td>').attr('data-id', farmerId).text(data['id']));
                newRow.append($('<td>').attr('data-name', farmerId).text(data['name']));
                newRow.append($('<td>').attr('data-surname', farmerId).text(data['surname']));
                newRow.append($('<td>').attr('data-patronymic', farmerId).text(data['patronymic']));
                newRow.append($('<td>').attr('data-email', farmerId).text(data['email']));
                newRow.append($('<td>').attr('data-description', farmerId).text(data['description']));
                newRow.append($('<td>').attr('data-farmId', farmerId).text(data['farmId']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': farmerId,
                    'data-name': data['id'],
                    'data-surname': data['name'],
                    'data-patronymic': data['surname'],
                    'data-email': data['patronymic'],
                    'data-description': data['email'],
                    'data-farmId': data['description']
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm',
                    'onclick': 'deleteFarmer(this)',
                    'data-id': farmerId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#farmersTable').append(newRow);
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
            var id            = button.getAttribute('data-id');
            var name          = button.getAttribute('data-name');
            var surname       = button.getAttribute('data-surname');
            var patronymic    = button.getAttribute('data-patronymic');
            var email         = button.getAttribute('data-email');
            var description   = button.getAttribute('data-description');
            var farmId        = button.getAttribute('data-farmId');

            // Устанавливаем значения в форме модального окна
            document.getElementById('editId').value = id;
            document.getElementById('editName').value = name;
            document.getElementById('editSurname').value = surname;
            document.getElementById('editPatronymic').value = patronymic;
            document.getElementById('editEmail').value = email;
            document.getElementById('editDescription').value = description;
            document.getElementById('editFarmId').value = farmId;
        });
    });
});

function deleteFarmer(button) {
    var id = $(button).data('id');
    Swal.fire({
        title: 'Вы уверены?',
        text: `Вы уверены, что хотите удалить фермера с id ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#bf30fc',
        cancelButtonColor: '#c50404',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFarmerOnServer(id);
        }
    });
}

// удаление на сервере
function deleteFarmerOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/farmers/' + id,
        success: function () {
            toastr.success('Фермер успешно удален');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении сделки');
        }
    });
}


