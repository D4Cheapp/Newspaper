-- Клиенты
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

-- Типографии
CREATE TABLE printing_houses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Типы изданий
CREATE TABLE publication_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Статусы изданий
CREATE TABLE publication_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Издания
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

-- Статусы заявок
CREATE TABLE request_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Типы услуг
CREATE TABLE service_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Заявки
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

-- Авторы статей (связь многие-ко-многим между авторами и изданиями)
CREATE TABLE publication_authors (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    publication_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    UNIQUE (author_id, publication_id)
);

-- Подписки
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

-- Статусы доставки
CREATE TABLE delivery_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Доставки
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
