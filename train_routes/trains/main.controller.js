'use strict'

function MainController(){
    var inputs;
    var paths = [];
    function readInput()
    {
        if(inputs === undefined)
        {
            inputs = {};
            const fs = require('fs');
            var data = fs.readFileSync('./data/inputFile.txt','utf8');
            var nodes = data.trim().split(",");
            for(var i = 0; i < nodes.length; i++)
            {
                var key = nodes[i].substring(0, nodes[i].length-1);
                var val = nodes[i].substring(2, nodes[i].length);

                inputs[key] = val;
            }
        }
        return inputs;
    }

    function calculateDistance(source, destination)
    {
        if(source == undefined || destination == undefined)
            return null;

        var path = source + "-" + destination;
        var distance = getRouteDistance(path);
        console.log("\tDistance from " + source + " to " + destination + " is " + distance);
        return distance;
    }


    function calculateDistanceFromPath(path)
    {
        if(path == undefined)
            return null;

        var distance = getRouteDistance(path);
        console.log("\tDistance for path " + path + " is " + distance);
        return distance;
    }


    function getTripsMaxStops(source, destination, maxStops)
    {
        if(source && destination && maxStops)
        {
            var args = {};
            args.maxStops = maxStops;
            var routes = getAllRoutes(source, destination, args);
            if(Array.isArray(routes))
            {
                var maxStops = routes.filter(function(element, index, array){
                    return (element.length <= args.maxStops + 1);
                });
                console.log("\tTrips from " + source + " to " + destination +" with max " + args.maxStops + " stops", maxStops.join());
            }
            else
            {
                console.log(routes);
                return routes;
            }

            return maxStops;
        }

        return null;
    }

    function getTripsExactStops(source, destination, stops)
    {
        if(source && destination && stops)
        {
            var args = {};
            args.exactStops = stops;
            var routes = getAllRoutes(source, destination, args);
            var exactStops = "NO SUCH ROUTE";
            if(Array.isArray(routes))
            {
                var exactStops = routes.filter(function(element, index, array){
                    return (element.length == args.exactStops + 1);
                });
                console.log("\tTrips from " + source + " to " + destination +" with exact " + args.exactStops + " stops", exactStops.join());
            }
            else {
                console.log(routes);
            }

            return exactStops;
        }

        return null;
    }

    function calculateShortestDistance(source, destination)
    {
        if(source && destination)
        {
            var args = {};
            args.computeShortestDistance = true;
            var routes = getAllRoutes(source, destination, args);

            if(Array.isArray(routes) && routes.length > 0)
            {
                var distance = routes.map(function(element, index, array){
                    var route = element.split("").join("-");
                    return getRouteDistance(route);
                });

                console.log("\tShortest distance from " + source + " to " + destination +" is ", Math.min.apply(Math, distance));
                return Math.min.apply(Math, distance);
            }
            else {
                console.log("\tNO SUCH ROUTE");
                return routes;
            }
        }

        return null;
    }


    function getTripsOfMaxDistance(source, destination, maxDistance)
    {
        if(source && destination && maxDistance)
        {
            var args = {};
            args.distanceLessThan = maxDistance;
            var routes = getAllRoutes(source, destination, args);

            if(Array.isArray(routes))
            {
                var tripsInRange = routes.filter(function(element, index, array){
                    var route = element.split("").join("-");
                    var distance = getRouteDistance(route);
                    if(distance < maxDistance) { return element; }
                });
                console.log("\tPath from " + source + " to " + destination +"  less than " + maxDistance + " is : ", tripsInRange.join());
                return tripsInRange;
            }
            else {
                console.log("\tNO SUCH ROUTE");
                return routes;
            }
        }

        return null;
    }

    // For problem 1 - 5
    function getRouteDistance(path)
    {
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
        paths = [];
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
            return paths;
        }
        return "NO SUCH ROUTE";
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

            // These conditions are required to avoid circular looping
            // e.g. route C-D and route D-C

            // loop stopping condition for max stops problem
            if(args.maxStops){ if( p.length >= args.maxStops ) { break; } }

            // loop stopping condition for exact stops problem
            if(args.exactStops) { if( p.length == args.exactStops + 1 ) { break; } }

            // loop stopping condition for shortest path problem
            if(args.computeShortestDistance){ if( p.indexOf(source) >= 1 ) { break; } }

            // loop stopping condition for shortest path problem

            if(args.distanceLessThan){ if(d > args.distanceLessThan) { break; } }

            traverseRoutes(p, list[i], destination, getDirectRoutes(list[i]), args);
        }
    }

    return {
            readInput,
            calculateDistance,
            calculateDistanceFromPath,
            getTripsMaxStops,
            getTripsExactStops,
            calculateShortestDistance,
            getTripsOfMaxDistance
        };
}

module.exports = MainController();
