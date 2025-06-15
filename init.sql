-- Таблица клиентов
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    phone_number VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Авторы
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица типографий
CREATE TABLE printing_houses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица типов изданий
CREATE TABLE publication_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Таблица статусов изданий
CREATE TABLE publication_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Таблица изданий
CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    publication_type_id INT NOT NULL,
    printing_house_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    circulation INT NOT NULL,
    publication_status_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publication_type_id) REFERENCES publication_types(id),
    FOREIGN KEY (printing_house_id) REFERENCES printing_houses(id),
    FOREIGN KEY (publication_status_id) REFERENCES publication_statuses(id)
);

-- Таблица статусов заявок
CREATE TABLE request_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Таблица типов услуг
CREATE TABLE service_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Таблица заявок
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    request_status_id INT NOT NULL,
    service_type_id INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (request_status_id) REFERENCES request_statuses(id),
    FOREIGN KEY (service_type_id) REFERENCES service_types(id)
);

-- Таблица связи авторов и изданий (связь многие-ко-многим)
CREATE TABLE publication_authors (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    publication_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    UNIQUE (author_id, publication_id)
);

-- Таблица подписок
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    publication_id INT NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    UNIQUE (client_id, publication_id)
);

-- Таблица статусов доставки
CREATE TABLE delivery_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица доставок
CREATE TABLE deliveries (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    publication_id INT NOT NULL,
    delivery_status_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    FOREIGN KEY (delivery_status_id) REFERENCES delivery_statuses(id)
);

-- Вставка начальных данных для статусов доставки
INSERT INTO delivery_statuses (name) VALUES
    ('В обработке'),
    ('В доставке'),
    ('Доставлено'),
    ('Отменено');


-- Вставка начальных данных для статусов изданий
INSERT INTO publication_statuses (name) VALUES
    ('В работе'),
    ('Печатается'),
    ('Опубликовано'),
    ('Архив');

-- Вставка начальных данных для статусов заявок
INSERT INTO request_statuses (name) VALUES
    ('В обработке'),
    ('Выполнен'),
    ('Отменено');

-- Вставка начальных данных для типов услуг
INSERT INTO service_types (name) VALUES
    ('Публикация рекламного объявления'),
    ('Публикация рекламной статьи'),
    ('Размещение вакансий'),
    ('Размещение поздравлений'),
    ('Размещение некрологов'),
    ('Архивная выписка'),
    ('Печать персонализированного выпуска'),
    ('Заказ тематического набора статей');

-- Вставка начальных данных для типов статей
INSERT INTO publication_types (name) VALUES
    -- Новостные
    ('Главная новость'),
    ('Срочная новость'),
    ('Расследование'),
    ('Репортаж'),
    ('Интервью'),
    
    -- Тематические
    ('Политическая статья'),
    ('Экономический обзор'),
    ('Культурное обозрение'),
    ('Спортивный отчёт'),
    ('Научно-популярная статья'),
    
    -- Развлекательные
    ('Юмористическая заметка'),
    ('Анекдот'),
    ('Кроссворд/Головоломка'),
    ('Гороскоп'),
    ('Рецепты'),
    
    -- Информационные
    ('Погода'),
    ('Курсы валют'),
    ('Телепрограмма'),
    ('Афиша мероприятий'),
    ('Объявления'),
    
    -- Специальные
    ('Редакторская колонка'),
    ('Письма читателей'),
    ('Аналитика'),
    ('Фоторепортаж');
