#!/usr/bin/arangosh --javascript.execute
//use the root password of arongodb as it will need to drop and create database
// ./create_db.js 
//  password of root user as it is run as root user.
//https://download.arangodb.com/arangodb33/doc/ArangoDB_AQL_3.3.19.pdf
function print(msg){require("internal").print(msg)}
const DBNAME="mydb"
const DBUSER="user"
const DBPASS="password"
try
{
	print("Dropping existing "+DBNAME)
	db._dropDatabase(DBNAME);
}
catch(e) {print("*****IGNORE DROPING error occur")}

try{
db._createDatabase(DBNAME, {}, [{ username: DBUSER, passwd: DBPASS, active: true}])
testing()
print("Successfully Created databse....")
}
catch(e) {print("CREATING .... error occur")}



function runscript()
{
	try{
var exec = require('child_process').exec, child;

child = exec('dir',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 child();
}catch(e) {print("runscript.... error occur"+e)}

}

function testing(){

db._useDatabase(DBNAME)
var cities = db._create("cities");
var roads = db._createEdgeCollection("roads");
//var mumbai = cities.save({_key: "mumbai", name:"mumbai", state:"mh"})
//var pune = cities.save({_key: "pune", name:"pune", state:"mh"})
//var nagpur = cities.save({_key: "nagpur", name:"nagpur", state:"mh"})

//var nh5 = roads.save(mumbai,pune,{name:"express way 1",distance:200})
//var nh6 = roads.save(mumbai,nagpur,{name:"express way 2",distance:600})

try{
var Graph = require('@arangodb/general-graph');
var g = Graph._create('road_graph',[Graph._relation('roads', ['cities'], ['cities'])]);
{print("CREATING GRAPH")}
}
catch(e) {print("CREATING GRAPH .... error occur"+e)}
}

