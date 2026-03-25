
-- INSERT INTO items (name, template_id) VALUES
-- ('AC/DC', 3),
-- ('queen', 3),
-- ('metallica', 3),
-- ('led zeppelin', 3),
-- ('linkin park', 3);

-- INSERT INTO meta_tier.items (name, template_id) VALUES
--  	('cookies', 4),
--  	('ice cream', 4),
--  	('brownies', 4),
--  	('pie', 4),
-- 	('cake', 4);

SELECT name, id from meta_tier.items WHERE template_id = 4;
