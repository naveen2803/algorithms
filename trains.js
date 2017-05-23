/*
The local commuter railroad services a number of towns in Kiwiland.  Because of monetary concerns, all of the tracks are 'one-way’. That is, a route from Kaitaia to Invercargill does not imply the existence of a route from Invercargill to Kaitaia. In fact, even if both of these routes do happen to exist, they are distinct and are not necessarily the same distance!

The purpose of this problem is to help the railroad provide its customers with information about the routes. In particular, you will compute the distance along a certain route, the number of different routes between two towns, and the shortest route between two towns.

Input: A directed graph where a node represents a town and an edge represents a route between two towns. The weighting of the edge represents the distance between the two towns. A given route will never appear more than once, and for a given route, the starting and ending town will not be the same town.

Output: For test input 1 through 5, if no such route exists, output 'NO SUCH ROUTE'. Otherwise, follow the route as given; do not make any extra stops! For example, the first problem means to start at city A, then travel directly to city B (a distance of 5), then directly to city C (a distance of 4).

1. The distance of the route A-B-C.
2. The distance of the route A-D.
3. The distance of the route A-D-C.
4. The distance of the route A-E-B-C-D.
5. The distance of the route A-E-D.
6. The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
7. The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
8. The length of the shortest route (in terms of distance to travel) from A to C.
9. The length of the shortest route (in terms of distance to travel) from B to B.
10. The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.

Test Input:
For the test input, the towns are named using the first few letters of the alphabet from A to D. A route between two towns (A to B) with a distance of 5 is represented as AB5.

Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7

Expected Output:
Output #1: 9
Output #2: 5
Output #3: 13
Output #4: 22
Output #5: NO SUCH ROUTE
Output #6: 2
Output #7: 3
Output #8: 9
Output #9: 9
Output #10: 7

 - There must be a way to supply the application with the input data via text file.
 - The application must run and you should provide sufficient evidence that your solution is complete by, as a minimum, indicating that it works correctly against the supplied test data.
 - The submission should be production quality and it can be done in any language (using JavaScript, Ruby or Go would be a bonus).
 - You may not use any external libraries to solve this problem, but you may use external libraries or tools for building or testing purposes. Specifically, you may use unit testing libraries or build tools available for your chosen language.
*/

'use strict'

var inputs = {};
var paths = [];
function readInput()
{
    /*
        Data format
        AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7
    */
    var fs = require('fs');
    fs.readFile('./data.txt', 'utf8', function (error, data) {
        if (error)
        {
            return console.log(error);
        }
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

        //console.log(getRouteDistance('A-E-D'));
        //getStations()
        //getDirectRoutes();
        getAllRoutes('A', 'E', args);
    });
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
        }

        // For problem 7
        if(args.exactStops != undefined)
        {
            var exatStops = paths.filter(function(element, index, array){
                return (element.length == args.exactStops + 1);
            });
            console.log("Trips from " + source + " to " + destination +" with exact " + args.exactStops + " stops", exatStops);
        }

        // For problem 8 and 9
        if(args.computeShortestDistance)
        {
            var distance = paths.map(function(element, index, array){
                var route = element.split("").join("-");
                return getRouteDistance(route);
            });
            console.log("Shortest distance from " + source + " to " + destination +" is ", Math.min.apply(Math, distance));
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
        }
    }
    else
    {
        console.log("NO ROUTE");
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
