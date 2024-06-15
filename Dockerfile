FROM mysql:8.0

ENV MYSQL_DATABASE=todo \
    MYSQL_ROOT_PASSWORD=root

COPY ./schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306