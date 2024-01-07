CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.farms (
    farm_code   SERIAL PRIMARY KEY,
    email       VARCHAR(50),
    description VARCHAR(150),
    address     VARCHAR(70),
    license     VARCHAR(30),
    money       DECIMAL(10, 2) CHECK (money >= 0)
);

CREATE TABLE IF NOT EXISTS app.fattening_days (
    id          SERIAL PRIMARY KEY,
    date_start  DATE,
    date_end    DATE,
    farm_code   INT REFERENCES app.farms(farm_code)
);

CREATE TABLE IF NOT EXISTS app.farmers(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(20),
    surname     VARCHAR(30),
    patronymic  VARCHAR(30),
    email       VARCHAR(50),
    description VARCHAR(100),
    farm_id     INT REFERENCES app.farms(farm_code)
);

CREATE TABLE IF NOT EXISTS app.feedbacks (
    id          SERIAL PRIMARY KEY,
    comment     VARCHAR(200),
    owner_id    INT,
    rating      DECIMAL(3, 1),
    time_stamp  DATE,
    farmer_id   INT REFERENCES app.farmers(id)
);

CREATE TABLE IF NOT EXISTS app.deals (
    id  SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES app.farmers(id),
    supplier_id INT,
    time_stamp DATE,
    cost DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS app.items (
    deal_id INT REFERENCES app.deals(id),
    type    INT,
    item_id INT
);

CREATE TABLE IF NOT EXISTS app.pigs (
    id                  SERIAL PRIMARY KEY,
    farmer_id           INT REFERENCES app.farmers(id),
    breed               VARCHAR(30),
    date_of_birthday    DATE,
    gender              VARCHAR(30),
    death_date          DATE
);

CREATE TABLE IF NOT EXISTS app.weight_statistics (
    id                  SERIAL PRIMARY KEY,
    pig_id              INT REFERENCES app.pigs(id),
    date_collection_day DATE,
    weight              DECIMAL(5, 2)
);


CREATE TABLE IF NOT EXISTS app.sterns (
    id          SERIAL PRIMARY KEY,
    farmer_id   INT REFERENCES app.farmers(id),
    type        VARCHAR(30),
    weight      DECIMAL(15, 2)
);

CREATE TABLE IF NOT EXISTS app.orders (
    id          SERIAL PRIMARY KEY,
    farmer_id   INT REFERENCES app.farmers(id),
    type        INT,
    cost        DECIMAL(10, 2)
);

CREATE TABLE IF NOT EXISTS app.users (
    id          SERIAL PRIMARY KEY,
    login       VARCHAR(30),
    password    VARCHAR(300),
    role        VARCHAR(20),
    farmer_id   INT REFERENCES app.farmers(id)
);

CREATE TABLE IF NOT EXISTS app.pigs_to_sell (
    id                  SERIAL PRIMARY KEY,
    pig_id              INT REFERENCES app.pigs(id),
    cost                DECIMAL(10, 2),
    farmer_id           INT REFERENCES app.farmers(id)
);

CREATE TABLE IF NOT EXISTS app.stern_to_sell (
    id                  SERIAL PRIMARY KEY,
    stern_id            INT REFERENCES app.sterns(id),
    weight              DECIMAL(10, 2),
    cost_per_kilo       DECIMAL(10, 2),
    farmer_id           INT REFERENCES app.farmers(id)
);
