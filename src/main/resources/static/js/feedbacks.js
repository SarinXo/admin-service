import {getFormData} from "./utils/form-data.js";

$(document).ready(function () {
    $('#editForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/feedbacks',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var feedbackId = data['id'];

                $(`td[data-comment = '${feedbackId}']`).text(data['comment']);
                $(`td[data-ownerId = '${feedbackId}']`).text(data['ownerId']);
                $(`td[data-rating = '${feedbackId}']`).text(data['rating']);
                $(`td[data-timeStamp  = '${feedbackId}']`).text(data['timeStamp']);
                $(`td[data-farmerId = '${feedbackId}']`).text(data['farmerId']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/feedbacks',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var feedbackId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+feedbackId);
                newRow.append($('<td>').attr('data-id', feedbackId).text(data['id']));
                newRow.append($('<td>').attr('data-comment', feedbackId).text(data['comment']));
                newRow.append($('<td>').attr('data-ownerId', feedbackId).text(data['ownerId']));
                newRow.append($('<td>').attr('data-rating', feedbackId).text(data['rating']));
                newRow.append($('<td>').attr('data-timeStamp', feedbackId).text(data['timeStamp']));
                newRow.append($('<td>').attr('data-farmerId', feedbackId).text(data['farmerId']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': feedbackId,
                    'data-comment': data['comment'],
                    'data-ownerId': data['ownerId'],
                    'data-rating': data['rating'],
                    'data-timeStamp': data['timeStamp'],
                    'data-farmerId': data['farmerId'],
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm delete-entity',
                    'data-id': feedbackId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#feedbacksTable').append(newRow);
                toastr["success"]("Успешно добавлено")

                $('#addModal').modal('hide');
            }
        });
    });

    $('#feedbacksTable').on('click', '.delete-entity', function (){
        var id = $(this).data('id');
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы уверены, что хотите удалить комментарий с id ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#bf30fc',
            cancelButtonColor: '#c50404',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFeedbackOnServer(id);
            }
        });
    });

    $('#feedbacksTable').on('click', '.btn[data-bs-toggle="modal"]', function () {
        // Извлекаем значения из атрибутов data-* кнопки
        var id = $(this).data('id');
        var comment = $(this).data('comment');
        var ownerId = $(this).data('ownerId');
        var rating = $(this).data('rating');
        var timeStamp = $(this).data('timeStamp');
        var farmerId = $(this).data('farmerId');

        // Устанавливаем значения в форме модального окна
        $('#editId').val(id);
        $('#editComment').val(comment);
        $('#editOwnerId').val(ownerId);
        $('#editRating').val(rating);
        $('#editTimeStamp').val(timeStamp);
        $('#editFarmerId').val(farmerId);
    });

});

// удаление на сервере
function deleteFeedbackOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/feedbacks/' + id,
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


