document.getElementById('common-code-container').innerHTML
    = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n' +
    '        <div class="container-fluid">\n' +
    '            <!------------------------------>\n' +
    '            <!--Ссылка на главную страницу-->\n' +
    '            <!------------------------------>\n' +
    '            <a class="navbar-brand" href="http://localhost:8080/admin/homepage">\n' +
    '                <img src="/static/pictures/MRSU_dark_bg_en_full_colorful.png" alt="" width="30" height="24" class="d-inline-block align-text-top">\n' +
    '                Панель администратора\n' +
    '            </a>\n' +
    '\n' +
    '            <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '                <ul class="navbar-nav me-auto mb-2 mb-lg-0">\n' +
    '\n' +
    '                    <li class="nav-item dropdown">\n' +
    '                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">\n' +
    '                            Таблицы в базе данных\n' +
    '                        </a>\n' +
    '                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/farms"             data-table-id="farms"             >Фермы</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/farmers"           data-table-id="farmers"           >Фермеры</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/fattening-days"    data-table-id="fattening_days"    >Откормочные дни</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/feedbacks"         data-table-id="feedbacks"         >Отзывы</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/deals"             data-table-id="deals"             >Сделки</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/items"             data-table-id="items"             >Предметы</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/pigs"              data-table-id="pigs"              >Свиньи</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/weight-statistics" data-table-id="weight_statistics" >Весовая статистика</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/sterns"            data-table-id="sterns"            >Зерно</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/orders"            data-table-id="orders"            >Заказы</a></li>\n' +
    '                            <li><a class="dropdown-item" href="http://localhost:8080/admin/users"             data-table-id="users"             >Пользователи</a></li>\n' +
    '                        </ul>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </nav>';