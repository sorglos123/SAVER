# SAVER
create initial volume via


sudo docker volume create mariaSQL_01

cd to docker-compose.yml directory

sudo docker-compose up -d

connect to adminer via IP of docker-host; connect to database and enjoy

build tables with saver_init.sql

import some sample data with test_data.sql

play around with some requests; requests.sql is a good starting point
