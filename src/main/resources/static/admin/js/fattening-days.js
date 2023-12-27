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
            url: '/admin-rest/fattening-days',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var fatteningDayId = data['id'];

                $(`td[data-dateStart = '${fatteningDayId}']`).text(data['dateStart']);
                $(`td[data-dateEnd =   '${fatteningDayId}']`).text(data['dateEnd']);
                $(`td[data-farmCode  = '${fatteningDayId}']`).text(data['farmCode']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/fattening-days',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var fatteningDayId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+fatteningDayId);
                newRow.append($('<td>').attr('data-id', fatteningDayId).text(data['id']));
                newRow.append($('<td>').attr('data-dateStart', fatteningDayId).text(data['dateStart']));
                newRow.append($('<td>').attr('data-dateEnd', fatteningDayId).text(data['dateEnd']));
                newRow.append($('<td>').attr('data-farmCode', fatteningDayId).text(data['farmCode']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': fatteningDayId,
                    'data-dateStart': data['dateStart'],
                    'data-dateEnd': data['dateEnd'],
                    'data-farmCode': data['farmCode'],
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm',
                    'onclick': 'deleteFatteningDay(this)',
                    'data-id': fatteningDayId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#fatteningDaysTable').append(newRow);
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
            var id           = button.getAttribute('data-id');
            var dateStart    = button.getAttribute('data-dateStart');
            var dateEnd      = button.getAttribute('data-dateEnd');
            var farmCode     = button.getAttribute('data-farmCode');

            // Устанавливаем значения в форме модального окна
            document.getElementById('editId').value = id;
            document.getElementById('editDateStart').value = dateStart;
            document.getElementById('editDateEnd').value = dateEnd;
            document.getElementById('editFarmCode').value = farmCode;
        });
    });
});

function deleteFatteningDay(button) {
    var id = $(button).data('id');
    Swal.fire({
        title: 'Вы уверены?',
        text: `Вы уверены, что хотите удалить Откормочный день с id ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#bf30fc',
        cancelButtonColor: '#c50404',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFatteningDayOnServer(id);
        }
    });
}

// удаление на сервере
function deleteFatteningDayOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/fattening-days/' + id,
        success: function () {
            toastr.success('Откормочный день успешно удален');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении Откормочного дня');
        }
    });
}


