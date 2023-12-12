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
            url: '/admin-rest/deals',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var dealId = data['id'];

                $(`td[data-farmer-id   = '${dealId}']`).text(data['farmerId']);
                $(`td[data-supplier-id = '${dealId}']`).text(data['supplierId']);
                $(`td[data-time-stamp  = '${dealId}']`).text(data['timeStamp']);
                $(`td[data-cost        = '${dealId}']`).text(data['cost']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/deals',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var dealId = data['id'];

                var newRow = $('<tr>').attr('id', 'row'+dealId);
                newRow.append($('<td>').attr('data-id', dealId).text(data['id']));
                newRow.append($('<td>').attr('data-farmerId', dealId).text(data['farmerId']));
                newRow.append($('<td>').attr('data-supplierId', dealId).text(data['supplierId']));
                newRow.append($('<td>').attr('data-timeStamp', dealId).text(data['timeStamp']));
                newRow.append($('<td>').attr('data-cost', dealId).text(data['cost']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': dealId,
                    'data-farmerId': data['farmerId'],
                    'data-supplierId': data['supplierId'],
                    'data-timeStamp': data['timeStamp'],
                    'data-cost': data['cost']
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm',
                    'onclick': 'deleteDeal(this)',
                    'data-id': dealId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#dealTable').append(newRow);
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
            var id          = button.getAttribute('data-id');
            var farmerId    = button.getAttribute('data-farmerId');
            var supplierId  = button.getAttribute('data-supplierId');
            var timeStamp   = button.getAttribute('data-timeStamp');
            var cost        = button.getAttribute('data-cost');

            // Устанавливаем значения в форме модального окна
            document.getElementById('editId').value = id;
            document.getElementById('editFarmerId').value = farmerId;
            document.getElementById('editSupplierId').value = supplierId;
            document.getElementById('editTimeStamp').value = timeStamp;
            document.getElementById('editCost').value = cost;
        });
    });
});

function deleteDeal(button) {
    var id = $(button).data('id');
    Swal.fire({
        title: 'Вы уверены?',
        text: `Вы уверены, что хотите удалить сделку с кодом ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#bf30fc',
        cancelButtonColor: '#c50404',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFarmOnServer(id);
        }
    });
}

// удаление на сервере
function deleteFarmOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/deals/' + id,
        success: function () {
            toastr.success('Сделка успешно удалена');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении сделки');
        }
    });
}


