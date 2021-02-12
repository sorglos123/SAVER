-- Optimized Script

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(50),
  `password` varchar(255),
  `creation_date` timestamp,
  `email` varchar(255),
  UNIQUE (user_name, email)
);

CREATE TABLE `receipts` (
  `receipt_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `total_value` NUMERIC(8,2),
  `receipt_date` datetime,
  `supermarket` ENUM ('Lidl', 'Aldi', 'Kaufland', 'Rewe'),
  `image_file_path` varchar(255)
);

CREATE TABLE `items` (
  `item_id` int PRIMARY KEY AUTO_INCREMENT,
  `receipt_id` int,
  `user_id` int,
  `product_name` varchar(50)
);

CREATE TABLE `volumes` (
  `volume_id` int PRIMARY KEY AUTO_INCREMENT,
  `item_id` int,
  `volume` int
);

CREATE TABLE `prices` (
  `price_id` int PRIMARY KEY AUTO_INCREMENT,
  `item_id` int,
  `price` NUMERIC(8,2)
);

CREATE TABLE `categories` (
  `category_id` int PRIMARY KEY AUTO_INCREMENT,
  `item_id` int,
  `category` ENUM ('Frische Produkte', 'Fleisch', 'Kaese', 'Getraenke', 'Alkoholische Getraenke', 'Convenience-Produkte', 'Brot- und Gebaeckwaren', 'Sonstiges')
);

ALTER TABLE `receipts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `items` ADD FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`receipt_id`);

ALTER TABLE `items` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `volumes` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

ALTER TABLE `prices` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);



