DROP DATABASE IF EXISTS navigation_db;
CREATE DATABASE navigation_db;

\c navigation_db;

CREATE TABLE links (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(45),
  url VARCHAR,
  navigation_id SMALLINT
);
CREATE TABLE navigation (
  ID SERIAL PRIMARY KEY
);

INSERT INTO links (title, url, navigation_id)
  VALUES ('Google', 'https://www.google.com/', '1');