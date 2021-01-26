INSERT INTO users(user_name, password, email) VALUES
    ('Franz', '9y^r@82R', 'franz@gmail.com'),
    ('Max', 'LECo5GT&', 'max@gmail.com'),
    ('Elsa', 'AMH9j@Er', 'elsa@hotmail.com');


-- For future js: need to use last_insert_id() to get receipt id; use the id for related entries
INSERT INTO receipts(user_id, receipt_id, total_value, receipt_date, supermarket, image_file_path) VALUES
    (1, 1, 8.21, '2021-01-02', 'Lidl', '/receipts/user01/01.jpg');

--Call function to var here and bind to receipt_id
--Same needs to happen with item_id
INSERT INTO items(user_id, receipt_id,item_id, product_name) VALUES
    (1, 1, 1, 'Gouda'),
    (1, 1, 2, 'Salami'),
    (1, 1, 3, 'Chips Funnifrisch'),
    (1, 1, 4, 'Jacobs Kaffee');

INSERT INTO volumes(item_id, volume) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 1);

INSERT INTO prices(item_id, price) VALUES
    (1, 3.01),
    (2, 2.20),
    (3, 1.00),
    (4, 2.00);

INSERT INTO categories(item_id, category) VALUES
    (1, 'Kaese'),
    (2, 'Fleisch'),
    (3, 'Convenience-Produkte'),
    (4, 'Sonstiges');

INSERT INTO receipts(user_id, receipt_id, total_value, receipt_date, supermarket, image_file_path) VALUES
    (1, 2, 12.53, '2021-01-12', 'Aldi', '/receipts/user01/02.jpg');

--to preserve the item_id as a reference in JS each item needs to be 
--inserted into all tables before the next one is inserted
INSERT INTO items(user_id, receipt_id,item_id, product_name) VALUES
    (1, 2, 5, 'Bedda Scheiben'),
    (1, 2, 6, 'Bunter Pfeffer'),
    (1, 2, 7, 'Hohes C'),
    (1, 2, 8, 'Auberginen'),
    (1, 2, 9, 'Bananen'),
    (1, 2, 10, 'Äpfel');

INSERT INTO volumes(item_id, volume) VALUES
    (5, 1),
    (6, 1),
    (7, 2),
    (8, 1),
    (9, 2),
    (10, 3);

INSERT INTO prices(item_id, price) VALUES
    (5, 2.99),
    (6, 0.89),
    (7, 1.00),
    (8, 1.39),
    (9, 0.89),
    (10. 5.37);

INSERT INTO categories(item_id, category) VALUES
    (5, 'Kaese'),
    (6, 'Frische Produkte'),
    (7, 'Getraenke'),
    (8, 'Frische Produkte'),
    (9, 'Frische Produkte'),
    (10, 'Frische Produkte');

INSERT INTO receipts(user_id, receipt_id, total_value, receipt_date, supermarket, image_file_path) VALUES
    (2, 3, 11.03, '2021-01-20', 'Rewe', '/receipts/user02/01.jpg');

INSERT INTO items(user_id, receipt_id,item_id, product_name) VALUES
    (2, 3, 11, 'Chia Bal Sandwich'),
    (2, 3, 12, 'Coca Cola Zero'),
    (2, 3, 13, 'Select Spaghetti'),
    (2, 3, 14, 'G&G Tomaten'),
    (2, 3, 15, 'Ruegenw. veg.'),
    (2, 3, 16, 'Sofine Lachs 150g');

INSERT INTO volumes(item_id, volume) VALUES
    (11, 1),
    (12, 1),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1);

INSERT INTO prices(item_id, price) VALUES
    (11, 1.69),
    (12, 1.19),
    (13, 2.19),
    (14, 0.98),
    (15, 1.99),
    (16, 2.99);
