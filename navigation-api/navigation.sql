DROP DATABASE IF EXISTS navigation_db;
CREATE DATABASE navigation_db;

\c navigation_db;

CREATE TABLE links (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(45),
  url VARCHAR,
  current_position SMALLINT,
  navigation_id SMALLINT
);
CREATE TABLE navigation (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);
INSERT INTO navigation (name) VALUES ('nav1');
  
INSERT INTO links (title, url, navigation_id)
  VALUES ('Google', 'https://www.google.com/', '1');