-- Create tables for GCS Food
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    google_id TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nationalities (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    flag_emoji TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    emoji TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    instructions TEXT[] NOT NULL,
    image_url TEXT,
    prep_time INTEGER,
    user_id TEXT NOT NULL REFERENCES users(id),
    nationality_id TEXT NOT NULL REFERENCES nationalities(id),
    category_id TEXT NOT NULL REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample nationalities
INSERT INTO nationalities (id, name, flag_emoji) VALUES 
('br', 'Brasileira', '🇧🇷'),
('it', 'Italiana', '🇮🇹'),
('jp', 'Japonesa', '🇯🇵'),
('cn', 'Chinesa', '🇨🇳'),
('gr', 'Grega', '🇬🇷'),
('us', 'Americana', '🇺🇸'),
('ru', 'Russa', '🇷🇺'),
('pl', 'Polonesa', '🇵🇱')
ON CONFLICT (id) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (id, name, emoji) VALUES 
('fitness', 'Fitness', '🏋️'),
('vegan', 'Vegana', '🌱'),
('vegetarian', 'Vegetariana', '🥕'),
('dessert', 'Sobremesa', '🍰'),
('breakfast', 'Café da Manhã', '☀️'),
('lunch', 'Almoço', '🌤️'),
('dinner', 'Jantar', '🌙')
ON CONFLICT (id) DO NOTHING;

-- Insert sample recipes
INSERT INTO recipes (id, title, description, ingredients, instructions, image_url, prep_time, user_id, nationality_id, category_id) VALUES 
('sample-1', 'Lasanha Tradicional', 'Uma deliciosa lasanha italiana com molho bolonhesa', 
 ARRAY['500g massa de lasanha', '500g carne moída', '2 xícaras molho de tomate', '300g queijo mussarela', '200g queijo parmesão'],
 ARRAY['Cozinhe a massa', 'Prepare o molho bolonhesa', 'Monte as camadas', 'Leve ao forno por 45 minutos'],
 '/placeholder.svg?height=300&width=400', 60, 'admin', 'it', 'lunch'),
('sample-2', 'Bowl de Quinoa', 'Bowl nutritivo e saudável com quinoa e vegetais',
 ARRAY['1 xícara quinoa', '200g brócolis', '1 abacate', '100g tomate cereja', 'Azeite extra virgem'],
 ARRAY['Cozinhe a quinoa', 'Refogue os vegetais', 'Monte o bowl', 'Tempere com azeite'],
 '/placeholder.svg?height=300&width=400', 25, 'admin', 'br', 'fitness')
ON CONFLICT (id) DO NOTHING;

-- Create admin user
INSERT INTO users (id, email, first_name, last_name, password) VALUES 
('admin', 'admin@gcsfood.com', 'Admin', 'GCS', '$2a$10$example')
ON CONFLICT (id) DO NOTHING;
