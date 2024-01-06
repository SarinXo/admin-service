INSERT INTO app.farms (email, description, address, license, money) VALUES
    ('mylitlefarm@example.com', 'Наша ферма специализируется на свиньях разной породы',    'Ул. Пушкина д. Колотушкина 1', '82DFO-JB3PZ-LE56ME', 71500.50),
    ('pigSurprise@example.com', 'Свиньи с сюрпризом! Заказывайте только у нас!',            'Ул. Попова д. 95 ',            'IKDZO-P9MLJ-CSNQ70', 82200.75),
    ('goodProject@example.com', 'Мы хорошие, мы очень хорошие, мы такие хорошие ...',       'Ул. Горбунова д. 28',          '8UDFO-JB3PZ-LMP6ME', 21800.20),
    ('PigGod@example.com',      'Только мы производим продукцию высшего сорта',             'Ул. Пенькова д. 71',           'OPDFO-JB3PZ-LE5LFO', 42500.30),
    ('LastPig@example.com',     'У нас осталась последняя свинья и нам нужно ее продать',   'Ул. Зазубрина д. 1',           'PMSHS-781JZ-IGKS4M', 22000.00),
    ('pigSup@example.com',      'Свиньи для супов! Идеальный прикорм!',                     'Ул. Рататуева д. 95 ',         'IKDZO-P9MLJ-CSNQ70', 92200.75),
    ('goodMeat@example.com',    'Хорошее мясо будет вовремя!',                              'Ул. Горбунова д. 29',          '8UDFO-JB3PZ-LMP6ME', 51800.20),
    ('FastFarm@example.com',    'В кратчайшие сроки сможем доставить свинину',              'Ул. Жижова д. 17',             'OPDFO-JB3PZ-LE5LFO', 82500.30),
    ('DidPig@example.com',      'Многолетний опыт в производстве мяса',                     'Ул. Карина д. 11',             'PMSHS-781JZ-IGKS4M', 42000.00),
    ('Alebargo@example.com',    'Сколько вам нужно мяса столько и сделаем',                 'Ул. Парина д. 95',             'PMSHS-781JZ-IGKS4M', 62000.00);

INSERT INTO app.fattening_days (date_start, date_end, farm_code)
VALUES
    ('2023-01-01', '2023-01-10', 1),
    ('2023-02-05', '2023-02-15', 2),
    ('2023-03-10', '2023-03-20', 1),
    ('2023-04-15', '2023-04-25', 3),
    ('2023-05-20', '2023-05-30', 2),
    ('2023-06-01', '2023-06-10', 1),
    ('2023-07-05', '2023-07-15', 2),
    ('2023-08-10', '2023-08-20', 3),
    ('2023-09-15', '2023-09-25', 1),
    ('2023-10-20', '2023-10-30', 2);

INSERT INTO app.farmers (name, surname, patronymic, email, description, farm_id)
VALUES
    ('Иван',    'Иванов',    'Иванович',     'ivan@example.com',    'Фермер с опытом в выращивании свиней', 1),
    ('Мария',   'Петрова',   'Сергеевна',    'maria@example.com',   'Опыт в свиноводстве',                  2),
    ('Алексей', 'Сидоров',   'Алексеевич',   'alex@example.com',    'Эксперт свиноводства',                 3),
    ('Елена',   'Кузнецова', 'Анатольевна',  'elena@example.com',   'Победитель свиноводство2020',          4),
    ('Дмитрий', 'Николаев',  'Дмитриевич',   'dmitry@example.com',  'Древний свиновод',                     5),
    ('Ольга',   'Козлова',   'Владимировна', 'olga@example.com',    'Люблю свиней',                         6),
    ('Павел',   'Морозов',   'Сергеевич',    'pavel@example.com',   'Фермер с опытом',                      7),
    ('Анна',    'Белова',    'Анатольевна',  'anna@example.com',    'Свиная королева',                      8),
    ('Сергей',  'Ковалев',   'Сергеевич',    'sergey@example.com',  'Специалист по свиноводству',           9),
    ('Наталья', 'Смирнова',  'Ивановна',     'natalia@example.com', 'Хороший свиновод',                    10);

INSERT INTO app.users (login, password, role, farmer_id)
VALUES
    ('user1',  'password1',  'USER', 1),
    ('user2',  'password2',  'USER', 2),
    ('user3',  'password3',  'USER', 3),
    ('user4',  'password4',  'USER', 4),
    ('user5',  'password5',  'USER', 5),
    ('user6',  'password6',  'USER', 6),
    ('user7',  'password7',  'USER', 7),
    ('user8',  'password8',  'USER', 8),
    ('user9',  'password9',  'USER', 9),
    ('user10', 'password10', 'USER',10);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE app.users SET password = crypt(password, gen_salt('bf', 10));

INSERT INTO app.feedbacks (comment, owner_id, rating, time_stamp, farmer_id)
VALUES
    ('Отличный продукт, всегда хорошие свиньи!',            2, 4.5, '2023-01-15', 1),
    ('Хорошее обслуживание, рекомендую!',                   2, 4.0, '2023-02-02', 3),
    ('Большой выбор продукции, удовлетворенность высокая.', 3, 4.8, '2023-02-20', 2),
    ('Очень вкусные свиньи, спасибо!',                      4, 4.3, '2023-03-10', 1),
    ('Прекрасное качество свиней, всегда свежее.',          5, 4.6, '2023-03-25', 3),
    ('Отличные цены, качество на высоте.',                  1, 4.0, '2023-04-05', 2),
    ('Замечательный выбор свиней, всегда покупаю здесь.',   2, 4.7, '2023-04-18', 1),
    ('Радует ассортимент свиней, всегда свежие и сочные.',  3, 4.5, '2023-05-01', 2),
    ('Очень доволен качеством мяса, рекомендую.',           4, 4.9, '2023-05-15', 3),
    ('Отличное место для экологически чистых продуктов.',   5, 4.8, '2023-06-02', 1);

INSERT INTO app.deals (farmer_id, supplier_id, time_stamp, cost)
VALUES
    (1, 5, '2023-01-15', 5000.00),
    (2, 6, '2023-02-02', 7000.50),
    (3, 4, '2023-02-20', 3000.75),
    (1, 5, '2023-03-10', 9000.25),
    (3, 6, '2023-03-25', 6000.80),
    (2, 9, '2023-04-05', 4000.50),
    (1, 5, '2023-04-18', 8000.90),
    (2, 4, '2023-05-01', 5500.75),
    (3, 6, '2023-05-15', 7500.60),
    (1, 5, '2023-06-02', 4800.30);

INSERT INTO app.items (deal_id, type, item_id)
VALUES
    (1, 1, 2),
    (2, 2, 1),
    (3, 1, 3),
    (4, 2, 4),
    (5, 2, 5),
    (6, 1, 6),
    (7, 2, 7),
    (8, 1, 8),
    (9, 1, 9),
    (10, 2, 10);

INSERT INTO app.pigs (farmer_id, breed, date_of_birthday, gender, death_date)
VALUES
    (1, 'Large White',              '2022-01-15', 'Female', NULL),
    (2, 'Yorkshire',                '2021-12-02', 'Male',   '2023-02-15'),
    (3, 'Duroc',                    '2022-02-20', 'Male',   NULL),
    (1, 'Hampshire',                '2022-03-10', 'Female', NULL),
    (3, 'Berkshire',                '2021-11-25', 'Female', '2023-03-01'),
    (2, 'Tamworth',                 '2022-04-05', 'Male',   NULL),
    (1, 'Large Black',              '2022-04-18', 'Female', NULL),
    (2, 'Chester White',            '2021-05-01', 'Male',   '2023-04-15'),
    (3, 'Landrace',                 '2022-05-15', 'Male',   NULL),
    (1, 'Gloucestershire Old Spot', '2022-06-02', 'Female', NULL);

INSERT INTO app.weight_statistics (pig_id, date_collection_day, weight)
VALUES
    (1, '2023-01-20', 120.50),
    (1, '2023-02-10', 150.75),
    (2, '2023-02-25', 110.20),
    (2, '2023-03-15', 130.80),
    (2, '2023-03-28', 140.25),
    (3, '2023-04-10', 115.30),
    (3, '2023-04-22', 125.90),
    (4, '2023-05-05', 160.45),
    (5, '2023-05-20', 135.60),
    (6, '2023-06-05', 145.75);

INSERT INTO app.sterns (farmer_id, type, weight)
VALUES
    (1, 'Grain',        50.50),
    (2, 'Vegetables',   70.75),
    (3, 'Fruits',       30.20),
    (1, 'Hay',          90.80),
    (3, 'Corn',         60.25),
    (2, 'Soybean',      40.30),
    (1, 'Alfalfa',      80.90),
    (2, 'Barley',       55.45),
    (3, 'Oats',         75.60),
    (1, 'Wheat',        48.75);

INSERT INTO app.orders (farmer_id, type, cost)
VALUES
    (1, 1, 500.00),
    (2, 2, 700.50),
    (3, 1, 300.75),
    (1, 2, 900.25),
    (3, 1, 600.80),
    (2, 2, 400.50),
    (1, 2, 800.90),
    (2, 2, 550.75),
    (3, 1, 750.60),
    (1, 2, 480.30);

INSERT INTO app.products (type, product_id, cost, farmer_id)
VALUES
    (1, 1, 252.99, 1),
    (2, 2, 155.49, 2),
    (1, 3, 303.00, 3),
    (1, 4, 126.75, 1),
    (2, 5, 589.99, 3),
    (1, 6, 223.50, 2),
    (2, 7, 943.95, 1),
    (2, 8, 200.75, 2),
    (1, 9, 773.50, 3),
    (1, 10, 161.99, 1);