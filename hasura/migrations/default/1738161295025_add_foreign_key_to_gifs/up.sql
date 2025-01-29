ALTER TABLE gifs
ADD CONSTRAINT fk_gifs_category
FOREIGN KEY (category_id)
REFERENCES categories(id)
ON DELETE CASCADE;
