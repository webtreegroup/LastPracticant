#!/bin/bash

docker build -t lp-app-v4 .
docker tag lp-app-v4 cr.yandex/crpasb6c8g98nppq2f2v/lp-app-v4
docker push cr.yandex/crpasb6c8g98nppq2f2v/lp-app-v4

# ssh yacloud
# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)
# docker rmi $(docker images -q)
# docker pull cr.yandex/crpasb6c8g98nppq2f2v/lp-app-v4:latest
# docker run -p 8066:5000 -d -v ~/.postgresql/:/var/www/cert cr.yandex/crpasb6c8g98nppq2f2v/lp-app-v4:latest

read

