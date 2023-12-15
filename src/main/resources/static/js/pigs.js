import {getFormData} from "./utils/form-data.js";

$(document).ready(function () {
    $('#editForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/pigs',
            method: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var pigId = data['id'];

                $(`td[data-farmerId = '${pigId}']`).text(data['farmerId']);
                $(`td[data-breed = '${pigId}']`).text(data['breed']);
                $(`td[data-dateOfBirthday = '${pigId}']`).text(data['dateOfBirthday']);
                $(`td[data-gender = '${pigId}']`).text(data['gender']);
                $(`td[data-deathDate  = '${pigId}']`).text(data['deathDate']);
                $('#editModal').modal('hide');

                toastr["success"]("Успешно обновлено")
            }
        });
    });

    $('#addForm').on('submit', function (e){
        e.preventDefault();

        var data = getFormData($(this));
        $.ajax({
            url: '/admin-rest/pigs',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data){
                var pigId = data['id'];

                var newRow =  $('<tr>').attr('id',  'row'+pigId);
                newRow.append($('<td>').attr('data-id', pigId).text(data['id']));
                newRow.append($('<td>').attr('data-farmerId', pigId).text(data['farmerId']));
                newRow.append($('<td>').attr('data-breed', pigId).text(data['breed']));
                newRow.append($('<td>').attr('data-dateOfBirthday', pigId).text(data['dateOfBirthday']));
                newRow.append($('<td>').attr('data-gender', pigId).text(data['gender']));
                newRow.append($('<td>').attr('data-deathDate', pigId).text(data['deathDate']));

                var buttonCell = $('<td>');

                var editButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-warning btn-sm',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#editModal',
                    'data-id': pigId,
                    'data-farmer-id': data['farmerId'],
                    'data-breed': data['breed'],
                    'data-date-of-birthday': data['dateOfBirthday'],
                    'data-gender': data['gender'],
                    'data-death-date': data['deathDate'],
                }).text('Изменить');

                var deleteButton = $('<button>').attr({
                    'type': 'button',
                    'class': 'btn btn-danger btn-sm delete-entity',
                    'data-id': pigId
                }).text('Удалить');

                buttonCell.append(editButton, deleteButton);

                newRow.append(buttonCell);

                $('#pigsTable').append(newRow);
                toastr["success"]("Успешно добавлено")

                $('#addModal').modal('hide');
            }
        });
    });

    $('#pigsTable').on('click', '.delete-entity', function (){
        var id = $(this).data('id');
        Swal.fire({
            title: 'Вы уверены?',
            text: `Вы уверены, что хотите удалить свинью с id ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#bf30fc',
            cancelButtonColor: '#c50404',
            confirmButtonText: 'Да, удалить!',
            cancelButtonText: 'Отмена'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePigOnServer(id);
            }
        });
    });

    $('#pigsTable').on('click', '.btn[data-bs-toggle="modal"]', function () {
        // Извлекаем значения из атрибутов data-* кнопки
        var id = $(this).data('id');
        var farmerId = $(this).data('farmer-id');
        var breed = $(this).data('breed');
        var dateOfBirthday = $(this).data('date-of-birthday');
        var gender = $(this).data('gender');
        var deathDate = $(this).data('death-date');

        // Устанавливаем значения в форме модального окна
        $('#editId').val(id);
        $('#editBreed').val(breed);
        $('#editDateOfBirthday').val(dateOfBirthday);
        $('#editGender').val(gender);
        $('#editDeathDate').val(deathDate);
        $('#editFarmerId').val(farmerId);
    });

});

// удаление на сервере
function deletePigOnServer(id) {
    $.ajax({
        type: 'DELETE',
        url: '/admin-rest/pigs/' + id,
        success: function () {
            toastr.success('Свинья успешно удалена');
            var element = document.getElementById('row'+id);
            element.remove();
        },
        error: function () {
            toastr.error('Произошла ошибка при удалении Свиньи');
        }
    });
}


