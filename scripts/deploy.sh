#!/bin/sh
DEST=/home/node/public/${PWD##*/}
if [ ! -z "${DEST//}" ]
then
    echo "Deploying project into ${ENV}"
    case $ENV in
        "production") SERVER=root@192.168.2.159;;
        "testing") SERVER=root@192.168.2.106;;
        *)
            echo "Can't deploy. ${ENV} is an invalid environment"
            exit 1
        ;;
    esac
    yarn build || exit 1
    ssh $SERVER "mkdir -p ${DEST}"
    scp -r ./src package.json yarn.lock Dockerfile docker-compose.yml tsconfig.* $SERVER:$DEST
    ssh $SERVER "cd ${DEST} && docker-compose up -d --build"
fi
