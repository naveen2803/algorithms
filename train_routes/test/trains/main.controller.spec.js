let assert = require('assert');
let mainController = require('../../trains/main.controller.js');

describe('MainController', function () {
    beforeEach(function readingInput() {
        mainController.readInput();
    });


    describe('CALCULATE DISTANCE( calculateDistance )', function () {
        it('Should return null if source or destination is not defined\n', function () {
            let distance = mainController.calculateDistance();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper inputs are defined\n', function () {
            let distance = mainController.calculateDistance('A', 'D');
            let result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('CALCULATE DISTANCE FROM PATH( calculateDistanceFromPath )', function () {
        it('Should return null if path is not defined\n', function () {
            let distance = mainController.calculateDistanceFromPath();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper path are defined\n', function () {
            let distance = mainController.calculateDistanceFromPath('A-D-E');
            let result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('GET TRIPS MAX STOPS( getTripsMaxStops )', function () {
        it('Should return null if inputs is not defined\n', function () {
            let distance = mainController.getTripsMaxStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined\n', function () {
            let trips = mainController.getTripsMaxStops('C', 'C', 3);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('GET TRIPS EXACT STOPS( getTripsExactStops )', function () {
        it('Should return null if inputs is not defined\n', function () {
            let distance = mainController.getTripsExactStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined\n', function () {
            let trips = mainController.getTripsExactStops('A', 'C', 4);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('CALCULATE SHORTEST DISTANCE( calculateShortestDistance )', function () {
        it('Should return null if inputs is not defined\n', function () {
            let distance = mainController.calculateShortestDistance();
            assert.equal(null, distance );
        })
        it('Should return shortest path or string "NO SUCH ROUTE" if proper path are defined\n', function () {
            let distance = mainController.calculateShortestDistance('B', 'B');
            let result = (distance >= 0 || distance == "NO SUCH ROUTE")
            assert.equal(true, result );
        })
    });


    describe('getTripsOfMaxDistance', function () {
        it('Should return null if inputs is not defined\n', function () {
            let trips = mainController.getTripsOfMaxDistance();
            assert.equal(null, trips );
        })
        it('Should return trips with distance less than the given distance or string "NO SUCH ROUTE"\n', function () {
            let trips = mainController.getTripsOfMaxDistance('C', 'C', 30);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });

});
