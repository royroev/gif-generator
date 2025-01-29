DELETE FROM categories
WHERE name IN (SELECT DISTINCT category FROM gifs);