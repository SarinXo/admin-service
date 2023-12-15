import {getFormData} from "./utils/form-data.js";

$(document).ready(function () {
    $('#editForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/orders',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var orderId = data['id'];
                
                $(`td[data-farmerId = '${orderId}']`).text(data['farmerId']);
                $(`td[data-type = '${orderId}']`).text(data['type']);
                $(`td[data-cost = '${orderId}']`).text(data['cost']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/orders',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var orderId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+orderId);
                newRow.append($('<td>').attr('data-id', orderId).text(data['id']));
                newRow.append($('<td>').attr('data-farmerId', orderId).text(data['farmerId']));
                newRow.append($('<td>').attr('data-type', orderId).text(data['type']));
                newRow.append($('<td>').attr('data-cost', orderId).text(data['cost']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': orderId,
                    'data-farmerId': data['farmerId'],
                    'data-type': data['type'],
                    'data-cost': data['cost'],
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm delete-entity',
                    'data-id': orderId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#ordersTable').append(newRow);
                toastr["success"]("Успешно добавлено")

                $('#addModal').modal('hide');
            }
        });
    });

    $('#ordersTable').on('click', '.delete-entity', function (){
        var id = $(this).data('id');
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы уверены, что хотите удалить заказ с id ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#bf30fc',
            cancelButtonColor: '#c50404',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrderOnServer(id);
            }
        });
    });

    $('#ordersTable').on('click', '.btn[data-bs-toggle="modal"]', function () {
        // Извлекаем значения из атрибутов data-* кнопки
        var id = $(this).data('id');
        var farmerId = $(this).data('farmerId');
        var type = $(this).data('type');
        var cost = $(this).data('cost');

        // Устанавливаем значения в форме модального окна
        $('#editId').val(id);
        $('#editFarmerId').val(farmerId);
        $('#editType').val(type);
        $('#editCost').val(cost);
    });

});

// удаление на сервере
function deleteOrderOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/orders/' + id,
        success: function () {
            toastr.success('Комментарий успешно удален');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении Комментария');
        }
    });
}