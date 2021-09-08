--CREATE TABLE products (
--id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--title text NOT NULL,
--description text,
--price int
--);
--CREATE TABLE stock (
--id SERIAL PRIMARY key,
--product_id uuid,
--count int,
--FOREIGN KEY ("product_id") REFERENCES "products" ("id")
--);
insert into stock (product_id, count) values
('47d29812-b1cf-4cf3-aa2b-2fb30e6250a3','3'),
('0c2cdb33-d460-4ac3-8b74-fb48f1d49ef0','6'),
('2099c53a-8240-43e8-bce2-0fac06ec3586','3'),
('583103f7-f24b-427e-97aa-58467723e4f3','11'),
('119cb7a1-b2eb-4ea1-842d-f444050ed60f','5'),
('09d9979e-4cdc-4bd1-9f73-9fd7596c1c6c','7'),
('92b01914-5454-4346-85d4-44b5ed8dc9b3','4'),
('92b78664-711b-4a54-b82e-ae9c8e31d040','5')
select products.*, stock.count from products left join stock on products.id = stock.product_id where products.id='92b78664-711b-4a54-b82e-ae9c8e31d040'
insert into products (title, description, price) values
('guitar 1', 'desc 1', 2.4),
('guitar 2', 'desc 2', 3.3),
('guitar 3', 'desc 3', 1.9),
('guitar 4', 'desc 4', 2.5),
('guitar 5', 'desc 5', 3.4),
('guitar 6', 'desc 6', 8.5),
('guitar 7', 'desc 7', 6.1),
('guitar 8', 'desc 8', 5)
select * from products
select * from stock
select p.id, p.title, p.description, p.price, s.count from products as p left join stock as s on s.product_id=p.id
--create extension if not exists "uuid-ossp"