#!/bin/bash
export DBNAME="mydb"
export DBUSER="user"
export DBPASS="password"
filepath="/home/vagrant/imports"
nodes= "jsondoc1.json jsondoc2.json"
links="jsondoc3.json"
for f in $nodes
do
	collectionname=$(echo $f | sed 's/.json//')
	echo "arangoimp --file $filepath --type json --collection $collectionname"
	arangoimp --file "$filepath/$f" --type json --collection "$collectionname" --server.database "$DBNAME" --server.endpoint tcp://127.0.0.1:8529 --server.username "$DBUSER" --server.password "$DBPASS" --progress true --create-collection true --create-collection-type document --overwrite true
done
for f in $links
do
	collectionname=$(echo $f | sed 's/.json//')
	echo "arangoimp --file $filepath --type json --collection $collectionname"
	arangoimp --file "$filepath/$f" --type json --collection "$collectionname" --server.database "$DBNAME" --server.endpoint tcp://127.0.0.1:8529 --server.username "$DBUSER" --server.password "$DBPASS" --progress true --create-collection true --create-collection-type edge --overwrite true
done
#arangosh --server.endpoint tcp://127.0.0.1:8529 --server.username root --server.password root123 --server.authentication true
#arangoexport --output-directory "/home/vagrant/exports" --type json --collection "deviceVersions" --server.database "$DBNAME" --server.endpoint tcp://127.0.0.1:8529 --server.username "$DBUSER" --server.password "$DBPASS"
#arangodump --output-directory "/home/vagrant/dumps" --server.database "$DBNAME" --server.endpoint tcp://127.0.0.1:8529 --server.username "$DBUSER" --server.password "$DBPASS"
#arangorestore --input-directory "/home/vagrant/dumps" --create-database true --server.database "$DBNAME" --server.endpoint tcp://127.0.0.1:8529 --server.username "$DBUSER" --server.password "$DBPASS" 