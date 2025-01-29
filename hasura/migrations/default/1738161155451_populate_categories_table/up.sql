INSERT INTO categories (name)
SELECT DISTINCT category
FROM gifs
ON CONFLICT (name) DO NOTHING;
