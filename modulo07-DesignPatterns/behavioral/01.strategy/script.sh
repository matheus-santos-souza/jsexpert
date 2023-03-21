docker run \
    --name postgres \
    -e POSTGRES_USER=matheus \
    -e POSTGRES_PASSWORD="123456" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username matheus --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

#MongoDB

docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=matheus \
    -e MONGO_INITDB_ROOT_PASSWORD=123456 \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb
