#!/bin/bash
#   wget https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/Arango_Env_Prepare.sh && . ./Arango_Env_Prepare.sh y
set -e
param1=$1
installdata=${param1:-"n"}
echo -e "\n\n\n\n ***INGONE BELOW ---- Error: No such container: arangodb"
docker rm -f arangodb || echo -e "\n\n\n ***INGONE ABOVE ---- Error: No such container: arangodb\n\n\n"
docker run -e ARANGO_NO_AUTH=1 -p 8529:8529 -d --name arangodb arangodb
echo -e '\n \n \n \n database is starting......wait for 10 second and dont enter any password \n \n \n '
sleep 10
docker container exec -ti arangodb /bin/bash -c "export ARANGODB_DEFAULT_ROOT_PASSWORD='' && curl https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/Arango_SampleDB_create.js -o db.sh && echo -e '\n \n \n \n \n DO NOT ENTER ANY PASSWORD JUST HIT ENTER \n ' && chmod +x db.sh && ./db.sh"

wget -O - https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/cities.json | curl -X POST --data-binary @- --dump - 'http://localhost:8529/_db/mydb/_api/import?collection=cities&type=documents'
wget -O - https://raw.githubusercontent.com/patelvijayg/ArangoDB/master/roads.json | curl -X POST --data-binary @- --dump - 'http://localhost:8529/_db/mydb/_api/import?collection=roads&type=documents'

#installing GIT
if [ "$installdata" = "y" ] || [ "$installdata" = "Y" ];
then

echo -e "\n \n Installing the GIT and WGET utility \n\n\n"
docker container exec -ti arangodb /bin/bash -c 'apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E1DD270288B4E6030699E45FA1715D88E1DF1F24 && echo "deb http://ppa.launchpad.net/git-core/ppa/ubuntu trusty main" > /etc/apt/sources.list.d/git.list && apt-get -qq update >/dev/null && apt-get -qq install -y git vim wget >/dev/null && echo "packaged installed"' 

internalcommand=`cat <<EOF
cd ~
echo -e "\n downloading the data files ............\n\n\n\n"
wget https://raw.githubusercontent.com/arangodb/example-datasets/master/Countries/countries.csv
wget https://raw.githubusercontent.com/arangodb/example-datasets/master/Regions/regions.csv
wget https://raw.githubusercontent.com/arangodb/example-datasets/master/RandomUsers/names_1000.json
echo -e  "\n \n importing the data files"
arangoimp --file names_1000.json --collection=users --type=json --create-collection=true --server.database "mydb" --server.username "user" --server.password "password" --progress true --overwrite true
arangoimp --file countries.csv --collection=countries --type=csv --create-collection=true --server.database "mydb" --server.username "user" --server.password "password" --progress true --overwrite true
arangoimp --file regions.csv --collection=regions --type=csv --create-collection=true --server.database "mydb" --server.username "user" --server.password "password" --progress true --overwrite true
echo -e "\n Successfully imported data"
EOF`
docker container exec -ti arangodb /bin/bash -c "${internalcommand}"
echo -e '\n \n \n Completed successfully with some default data'
else 
echo -e '\n \n \n Completed successfully'
fi