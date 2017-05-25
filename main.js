'use strict'

var inputs = {};
var paths = [];
function readInput()
{
    /*
        Data format
        AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7
    */
    var data = "AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7";
    var nodes = data.trim().split(",");
    for(var i = 0; i < nodes.length; i++)
    {
        var key = nodes[i].substring(0, nodes[i].length-1);
        var val = nodes[i].substring(2, nodes[i].length);

        inputs[key] = val;
    }

    var args = {
        maxStops:3,
        exactStops:4,
        computeShortestDistance: true,
        distanceLessThan: 30
    };

    // var fs = require('fs');
    // fs.readFile('./data.txt', 'utf8', function (error, data) {
    //     if (error)
    //     {
    //         return console.log(error);
    //     }
    //     var nodes = data.trim().split(",");
    //     for(var i = 0; i < nodes.length; i++)
    //     {
    //         var key = nodes[i].substring(0, nodes[i].length-1);
    //         var val = nodes[i].substring(2, nodes[i].length);
    //
    //         inputs[key] = val;
    //     }
    //
    //     var args = {
    //         maxStops:3,
    //         exactStops:4,
    //         computeShortestDistance: true,
    //         distanceLessThan: 30
    //     };
    //
    //     //console.log(getRouteDistance('A-E-D'));
    //     //getStations()
    //     //getDirectRoutes();
    //     //getAllRoutes('A', 'E', args);
    // });
}

function getDistance(source, destination, path)
{
    if(path == undefined)
    {
        var path = source + "-" + destination;
    }

    var distance = getRouteDistance(path);
    alert(distance);
}

function buildPath(station)
{
    if(document.getElementById('path').value != "")
        document.getElementById('path').value = document.getElementById('path').value + "-" + station;
    else
        document.getElementById('path').value = station;
}

function clearPath()
{
    document.getElementById('path').value = "";
}

function getTripsMaxStops(source, destination, maxStops)
{
    var args = {};
    args.maxStops = maxStops;
    alert(getAllRoutes(source, destination, args));
}

// For problem 1 - 5
function getRouteDistance(path)
{
    //var inputs = readInput();
    var distance = 0;
    var strPath = path.split('-').map(String);
    for(var i = 0; i < strPath.length -1; i++)
    {
        var directPath = strPath[i] + strPath[i+1];
        if( inputs[directPath] == undefined)
        {
            return ("NO SUCH ROUTE");
        }
        else
        {
            distance = distance + parseInt(inputs[directPath], 10);
        }
    }
    return distance;
}


// Get all stations
function getStations()
{
    var arr = [];
    //var inputs = readInput();
    for(var props in inputs)
    {
        arr.push(props.split("")[0]);
        arr.push(props.split("")[1]);
    }

    return Array.from(new Set(arr));
}


// Get direct routes sorted order
function getDirectRoutes(source)
{
    var directRoutesInput = [];
    var routes = [];
    //var inputs = readInput();
    for(var props in inputs)
    {
        directRoutesInput.push(props);
    }

    if(source == undefined)
    {
        routes = directRoutesInput;
    }
    else
    {
        for(var i = 0; i < directRoutesInput.length; i++)
        {
            if( source == directRoutesInput[i].split("")[0] )
            {
                routes.push( directRoutesInput[i].split("")[1] );
            }
        }
    }

    return routes.sort();
}


// For problem 6 - 10
function getAllRoutes(source, destination, args)
{
    var routesInput = getDirectRoutes();
    var sourcePresent = false;
    var destinationPresent = false;
    for(var i = 0; i < routesInput.length; i++)
    {
        if( routesInput[i].split("")[0] == source ) { sourcePresent = true }
        if( routesInput[i].split("")[1] == destination ) { destinationPresent = true }
    }

    if( sourcePresent && destinationPresent )
    {
        traverseRoutes("", source, destination, getDirectRoutes(source), args);

        // For problem 6
        if(args.maxStops != undefined)
        {
            var maxStops = paths.filter(function(element, index, array){
                return (element.length <= args.maxStops + 1);
            });
            console.log("Trips from " + source + " to " + destination +" with max " + args.maxStops + " stops", maxStops);
            return maxStops;
        }

        // For problem 7
        if(args.exactStops != undefined)
        {
            var exatStops = paths.filter(function(element, index, array){
                return (element.length == args.exactStops + 1);
            });
            console.log("Trips from " + source + " to " + destination +" with exact " + args.exactStops + " stops", exatStops);
            return exatStops;
        }

        // For problem 8 and 9
        if(args.computeShortestDistance)
        {
            var distance = paths.map(function(element, index, array){
                var route = element.split("").join("-");
                return getRouteDistance(route);
            });
            console.log("Shortest distance from " + source + " to " + destination +" is ", Math.min.apply(Math, distance));
            return distance;
        }

        // For problem 10
        if(args.distanceLessThan != undefined)
        {
            var distanceLessThan = paths.filter(function(element, index, array){
                var route = element.split("").join("-");
                var distance = getRouteDistance(route);
                if(distance < args.distanceLessThan) { return element; }
            });
            console.log("Path from " + source + " to " + destination +"  less than " + args.distanceLessThan + " is : ", distanceLessThan);
            return distanceLessThan;
        }
    }
    else
    {
        console.log("NO ROUTE");
        return "No Route";
    }
}


function traverseRoutes(prefix, source, destination, list, args)
{
    for(var i = 0; i < list.length; i++)
    {
        if( destination == list[i])
        {
            var path = prefix + source + destination;
            paths.push(path);
        }

        var p = prefix + source;
        var r = p.split("").join("-");
        var d = getRouteDistance(r);
        if(d > args.distanceLessThan) { break; }
        traverseRoutes(p, list[i], destination, getDirectRoutes(list[i]), args);
    }
}

// Start from reading a file
readInput();
