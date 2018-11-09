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
	
	var nodeinsert=[
	{"_key":"1","field1":"A","range":1,"delta":[{"a":"1"}]},
	{"_key":"2","field1":"A","range":2,"delta":[]},
	{"_key":"3","field1":"A","range":3,"delta":[]},
	{"_key":"4","field1":"A","range":4,"delta":[{"a":"1"}]},
	{"_key":"5","field1":"A","range":5,"delta":[{"a":"1"}]},
	{"_key":"6","field1":"A","range":6,"delta":[]},
	{"_key":"7","field1":"A","range":7,"delta":[]},
	{"_key":"8","field1":"A","range":8,"delta":[]},
	{"_key":"9","field1":"A","range":9,"delta":[{"a":"1"}]},
	{"_key":"10","field1":"A","range":10,"delta":[{"a":"1"}]}
	];

	var edgeinsert=
	[
	{"_from":"dummynode/1","_to":"dummynode/2","desc":"1to2"},
	{"_from":"dummynode/1","_to":"dummynode/3","desc":"1to3"},
	{"_from":"dummynode/2","_to":"dummynode/4","desc":"2to4"},
	{"_from":"dummynode/2","_to":"dummynode/5","desc":"2to5"},
	{"_from":"dummynode/3","_to":"dummynode/6","desc":"3to6"},
	{"_from":"dummynode/3","_to":"dummynode/7","desc":"3to7"},
	{"_from":"dummynode/4","_to":"dummynode/8","desc":"4to8"},
	{"_from":"dummynode/5","_to":"dummynode/9","desc":"5to9"},
	{"_from":"dummynode/7","_to":"dummynode/10","desc":"7to10"}
	];
	var dummynode = db._create("dummynode");
	db.dummynode.insert(nodeinsert);
	
	var dummyedge = db._createEdgeCollection("dummyedge");
	db.dummyedge.insert(edgeinsert);
	//var mumbai = cities.save({_key: "mumbai", name:"mumbai", state:"mh"})
	//var pune = cities.save({_key: "pune", name:"pune", state:"mh"})
	//var nagpur = cities.save({_key: "nagpur", name:"nagpur", state:"mh"})

	//var nh5 = roads.save(mumbai,pune,{name:"express way 1",distance:200})
	//var nh6 = roads.save(mumbai,nagpur,{name:"express way 2",distance:600})

	try{
	var Graph = require('@arangodb/general-graph');
	var g1 = Graph._create('road_graph',[Graph._relation('roads', ['cities'], ['cities'])]);
	var g2 = Graph._create('dummygraph',[Graph._relation('dummyedge', ['dummynode'], ['dummynode'])]);
	{print("CREATING GRAPH")}
	}
	catch(e) {print("CREATING GRAPH .... error occur"+e)}
}

