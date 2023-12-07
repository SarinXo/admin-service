
//обновление данных
document.querySelector('#editForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Получаем значения из формы
    var farmCode = document.getElementById('editFarmCode').value;
    var email = document.getElementById('editEmail').value;
    var description = document.getElementById('editDescription').value;
    var address = document.getElementById('editAddress').value;
    var license = document.getElementById('editLicense').value;
    var money = document.getElementById('editMoney').value;

    if (parseFloat(money) <= 0.0) {
        alert('Значение "Деньги" должно быть больше 0.0.');
        return;
    }
    // Формируем объект данных для отправки на сервер
    var data = {
    farmCode: farmCode,
    email: email,
    description: description,
    address: address,
    license: license,
    money: money
    };

    // Отправляем AJAX-запрос на сервер
    fetch('/admin-rest/farms', {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })

    .then(response => response.json())
    .then(updatedFarm => {
    // Находим соответствующую строку в таблице и обновляем значения
    var row = document.querySelector('tr[data-farm-id="' + updatedFarm.farmCode + '"]');
    row.querySelector('td:nth-child(2)').textContent = updatedFarm.email;
    row.querySelector('td:nth-child(3)').textContent = updatedFarm.description;
    row.querySelector('td:nth-child(4)').textContent = updatedFarm.address;
    row.querySelector('td:nth-child(5)').textContent = updatedFarm.license;
    row.querySelector('td:nth-child(6)').textContent = updatedFarm.money;

    // Закрываем модальное окно
    $('#editModal').modal('hide');
    })
    .catch(error => console.error('Error:', error));
});

// Добавляем обработчик для кнопки "Удалить"
function deleteRow(button) {
    var farmCode = button.getAttribute('data-farm-id');

    // Отправляем запрос на сервер для удаления
    fetch('/admin-rest/farms/' + farmCode, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка удаления фермы');
            }
            return response.json();
        })
        .then(() => {
            // Удаляем строку из таблицы
            var row = button.closest('tr');
            row.parentNode.removeChild(row);
        })
        .catch(error => console.error('Error:', error));
}

// Добавление кортежа
document.querySelector('#addForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Получаем значения из формы
    var email = document.getElementById('addEmail').value;
    var description = document.getElementById('addDescription').value;
    var address = document.getElementById('addAddress').value;
    var license = document.getElementById('addLicense').value;
    var money = document.getElementById('addMoney').value;

    // Формируем объект данных для отправки на сервер
    var data = {
        email: email,
        description: description,
        address: address,
        license: license,
        money: money
    };

    // Отправляем AJAX-запрос на сервер для создания новой фермы
    fetch('/admin-rest/farms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при создании фермы');
            }
            return response.json();
        })
        .then(newFarm => {
            // Обновляем таблицу
            updateTable(newFarm);

            // Закрываем модальное окно
            $('#addModal').modal('hide');
        })
        .catch(error => console.error('Error:', error));
});

// Функция для обновления таблицы после добавления фермы
function updateTable(newFarm) {
    // Находим таблицу в DOM
    var table = document.querySelector('.table tbody');

    // Создаем новую строку
    var newRow = table.insertRow(table.rows.length);

    // Добавляем ячейки для каждого столбца
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    // Устанавливаем значения в ячейки
    cell1.textContent = newFarm.farmCode;
    cell2.textContent = newFarm.email;
    cell3.textContent = newFarm.description;
    cell4.textContent = newFarm.address;
    cell5.textContent = newFarm.license;
    cell6.textContent = newFarm.money;
}


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
