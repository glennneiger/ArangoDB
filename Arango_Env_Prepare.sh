#!/bin/bash
#   wget https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/Arango_Env_Prepare.sh
#   chmod +x ./Arango_Env_Prepare.sh && ./Arango_Env_Prepare.sh
set -e
docker rm -f arangodb || echo "***INGONE ABOVE ---- Error: No such container: arangodb"
docker run -e ARANGO_NO_AUTH=1 -p 8529:8529 -d --name arangodb arangodb
echo 'database is starting......wait for 10 second and dont enter any password'
sleep 10
docker container exec -ti arangodb /bin/bash -c "export ARANGODB_DEFAULT_ROOT_PASSWORD='' && curl https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/Arango_SampleDB_create.js -o db.sh && echo -e '\n \n \n \n \n DO NOT ENTER ANY PASSWORD JUST HIT ENTER \n ' && chmod +x db.sh && ./db.sh"
wget -O - https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/cities.json | curl -X POST --data-binary @- --dump - 'http://localhost:8529/_db/mydb/_api/import?collection=cities&type=documents'
wget -O - https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/roads.json | curl -X POST --data-binary @- --dump - 'http://localhost:8529/_db/mydb/_api/import?collection=roads&type=documents'

echo -e '\n \n \n Completed successfully'