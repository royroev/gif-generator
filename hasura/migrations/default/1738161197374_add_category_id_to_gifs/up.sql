ALTER TABLE gifs
ADD COLUMN category_id INTEGER;

-- Update category_id based on the category name
UPDATE gifs
SET category_id = categories.id
FROM categories
WHERE gifs.category = categories.name;
