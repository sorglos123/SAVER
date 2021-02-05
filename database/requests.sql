-- Creating some requests that might be usefull
--show users
SELECT * FROM users; 

--show all receipts from specific user
SELECT * FROM receipts WHERE user_id = 1; 

-- all items from specific user
SELECT * FROM items WHERE user_id = 1; 

-- rebuilding a specific receipt and combining items with prices and categories. Could be expanded with volumes etc...
SELECT * FROM items 
INNER JOIN prices ON prices.item_id = items.item_id 
INNER JOIN categories ON categories.item_id = items.item_id
WHERE receipt_id = 2