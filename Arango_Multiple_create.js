#!/usr/bin/arangosh --javascript.execute
//use the root password of arongodb as it will need to drop and create database
// ./create_db.js 
//  password of root user as it is run as root user.
function print(msg){require("internal").print(msg)}
function createdb(dbobject)
{
	var DBNAME=dbobject["dbname"];
	var DBUSER=dbobject["user"];
	var DBPASS=dbobject["password"];
	try
	{
		print("Dropping existing "+DBNAME);
		db._dropDatabase(DBNAME);
	}
	catch(e) {print("DROPING .... error occur")}

	try{
		print("CREATING new db "+DBNAME);
		db._createDatabase(DBNAME, {}, [{ username: DBUSER, passwd: DBPASS, active: true}])
	}
	catch(e) {print("CREATING .... error occur")}
}
function createCollection(collectinname,dbobject)
{
	try{
		print("CREATING collection " + collectinname + " in  "+dbobject["dbname"]);
		db._useDatabase(dbobject["dbname"]);
		db._create(collectinname);
	}
	catch(e) {print("CREATING collection.... error occur"+e)}
}
function createEdge(collectinname,dbobject)
{
	try{
		print("CREATING Edge collection " + collectinname + " in  "+dbobject["dbname"]);
		
		db._useDatabase(dbobject["dbname"]);
		db._createEdgeCollection(collectinname);
	}
	catch(e) {print("CREATING Edge collection.... error occur"+e)}
}

colList=[
"mycollection1"
,"mycollection2"
,"mycollection3"
]

edgeList=[
"mycollection3"
,"mycollection4"
]

dblist=[
	{"dbname":"mydb1","user":"root","password":"root123"},
	{"dbname":"mydb2","user":"root","password":"root123"}
	]

dblist.forEach(createdb);

for(j=0;j<3;j++)
{
	for (i=0;i<colList.length;i++)
	{
		createCollection(colList[i],dblist[j])
	}
	for (i=0;i<edgeList.length;i++)
	{
		createEdge(edgeList[i],dblist[j])
	}
}