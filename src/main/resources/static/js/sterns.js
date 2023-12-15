import {getFormData} from "./utils/form-data.js";

$(document).ready(function () {
    $('#editForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/sterns',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var sternId = data['id'];

                $(`td[data-farmerId = '${sternId}']`).text(data['farmerId']);
                $(`td[data-type = '${sternId}']`).text(data['type']);
                $(`td[data-weight = '${sternId}']`).text(data['weight']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/sterns',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var sternId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+sternId);
                newRow.append($('<td>').attr('data-id', sternId).text(data['id']));
                newRow.append($('<td>').attr('data-farmerId', sternId).text(data['farmerId']));
                newRow.append($('<td>').attr('data-type', sternId).text(data['type']));
                newRow.append($('<td>').attr('data-weight', sternId).text(data['weight']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': sternId,
                    'data-farmer-id': data['farmerId'],
                    'data-type': data['type'],
                    'data-weight': data['weight'],
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm delete-entity',
                    'data-id': sternId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#sternsTable').append(newRow);
                toastr["success"]("Успешно добавлено")

                $('#addModal').modal('hide');
            }
        });
    });

    $('#sternsTable').on('click', '.delete-entity', function (){
        var id = $(this).data('id');
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы уверены, что хотите удалить корм с id ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#bf30fc',
            cancelButtonColor: '#c50404',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSternOnServer(id);
            }
        });
    });

    $('#sternsTable').on('click', '.btn[data-bs-toggle="modal"]', function () {
        // Извлекаем значения из атрибутов data-* кнопки
        var id = $(this).data('id');
        var farmerId = $(this).data('farmer-id');
        var type = $(this).data('type');
        var weight = $(this).data('weight');

        // Устанавливаем значения в форме модального окна
        $('#editId').val(id);
        $('#editFarmerId').val(farmerId);
        $('#editType').val(type);
        $('#editWeight').val(weight);
    });

});

// удаление на сервере
function deleteSternOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/sterns/' + id,
        success: function () {
            toastr.success('Корм успешно удален');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении Корма');
        }
    });
}


