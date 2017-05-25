var assert = require('assert');
var mainController = require('../../trains/main.controller.js');

describe('MainController', function () {
    beforeEach(function readingInput() {
        mainController.readInput();
    });


    describe('calculateDistance', function () {
        it('Should return null if source or destination is not defined', function () {
            var distance = mainController.calculateDistance();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper inputs are defined', function () {
            var distance = mainController.calculateDistance('A', 'B');
            var result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('calculateDistanceFromPath', function () {
        it('Should return null if path is not defined', function () {
            var distance = mainController.calculateDistanceFromPath();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper path are defined', function () {
            var distance = mainController.calculateDistanceFromPath('A-B-C');
            var result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('getTripsMaxStops', function () {
        it('Should return null if inputs is not defined', function () {
            var distance = mainController.getTripsMaxStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined', function () {
            var trips = mainController.getTripsMaxStops('C', 'C', 3);
            var result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('getTripsExactStops', function () {
        it('Should return null if inputs is not defined', function () {
            var distance = mainController.getTripsExactStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined', function () {
            var trips = mainController.getTripsExactStops('A', 'C', 4);
            var result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('calculateShortestDistance', function () {
        it('Should return null if inputs is not defined', function () {
            var distance = mainController.calculateShortestDistance();
            assert.equal(null, distance );
        })
        it('Should return shortest path or string "NO SUCH ROUTE" if proper path are defined', function () {
            var distance = mainController.calculateShortestDistance('B', 'B');
            var result = (distance >= 0 || distance == "NO SUCH ROUTE")
            assert.equal(true, result );
        })
    });


    describe('getTripsOfMaxDistance', function () {
        it('Should return null if inputs is not defined', function () {
            var trips = mainController.getTripsOfMaxDistance();
            assert.equal(null, trips );
        })
        it('Should return trips with distance less than the given distance or string "NO SUCH ROUTE"', function () {
            var trips = mainController.getTripsOfMaxDistance('C', 'C', 30);
            var result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });

});