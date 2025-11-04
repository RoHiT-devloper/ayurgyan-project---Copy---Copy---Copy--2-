-- -- Add new columns to herbs table
-- ALTER TABLE herbs 
-- ADD COLUMN IF NOT EXISTS region_of_origin VARCHAR(255),
-- ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0.0;

-- -- Update existing herbs with sample data (optional)
-- UPDATE herbs SET 
-- region_ofOrigin = CASE 
--     WHEN name ILIKE '%tulsi%' OR name ILIKE '%ashwagandha%' THEN 'INDIA'
--     WHEN name ILIKE '%ginseng%' THEN 'CHINA'
--     WHEN name ILIKE '%echinacea%' THEN 'NORTH_AMERICA'
--     ELSE 'UNKNOWN'
-- END,
-- average_rating = CASE 
--     WHEN name ILIKE '%tulsi%' THEN 4.5
--     WHEN name ILIKE '%ashwagandha%' THEN 4.2
--     WHEN name ILIKE '%ginseng%' THEN 4.0
--     WHEN name ILIKE '%echinacea%' THEN 3.8
--     ELSE 3.5
-- END
-- WHERE region_of_origin IS NULL;

-- -- Create index for better search performance
-- CREATE INDEX IF NOT EXISTS idx_herbs_safety_level ON herbs(safety_level);
-- CREATE INDEX IF NOT EXISTS idx_herbs_region ON herbs(region_of_origin);
-- CREATE INDEX IF NOT EXISTS idx_herbs_rating ON herbs(average_rating);
-- CREATE INDEX IF NOT EXISTS idx_herbs_name_search ON herbs USING gin(to_tsvector('english', name));
-- CREATE INDEX IF NOT EXISTS idx_herbs_scientific_name_search ON herbs USING gin(to_tsvector('english', scientific_name));

-- -- Update medicinal_uses table if needed
-- ALTER TABLE medicinal_uses 
-- ADD COLUMN IF NOT EXISTS condition_search_vector tsvector;

-- -- Create trigger for search vector update
-- CREATE OR REPLACE FUNCTION medicinal_uses_search_vector_update() RETURNS trigger AS $$
-- BEGIN
--     NEW.condition_search_vector = to_tsvector('english', COALESCE(NEW.condition, ''));
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER medicinal_uses_search_vector_trigger
--     BEFORE INSERT OR UPDATE ON medicinal_uses
--     FOR EACH ROW EXECUTE FUNCTION medicinal_uses_search_vector_update();