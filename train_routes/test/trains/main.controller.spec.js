let assert = require('assert');
let mainController = require('../../trains/main.controller.js');

describe('MainController', function () {
    beforeEach(function readingInput() {
        mainController.readInput();
    });


    describe('calculateDistance', function () {
        it('Should return null if source or destination is not defined', function () {
            let distance = mainController.calculateDistance();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper inputs are defined', function () {
            let distance = mainController.calculateDistance('A', 'B');
            let result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('calculateDistanceFromPath', function () {
        it('Should return null if path is not defined', function () {
            let distance = mainController.calculateDistanceFromPath();
            assert.equal(null, distance );
        })
        it('Should return either distance or string "NO SUCH ROUTE" if proper path are defined', function () {
            let distance = mainController.calculateDistanceFromPath('A-B-C');
            let result = false;
            if(distance >= 0 || distance == "NO SUCH ROUTE")
                result = true;

            assert.equal(true, result );
        })
    });


    describe('getTripsMaxStops', function () {
        it('Should return null if inputs is not defined', function () {
            let distance = mainController.getTripsMaxStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined', function () {
            let trips = mainController.getTripsMaxStops('C', 'C', 3);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('getTripsExactStops', function () {
        it('Should return null if inputs is not defined', function () {
            let distance = mainController.getTripsExactStops();
            assert.equal(null, distance );
        })
        it('Should return array of trips if proper path are defined', function () {
            let trips = mainController.getTripsExactStops('A', 'C', 4);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });


    describe('calculateShortestDistance', function () {
        it('Should return null if inputs is not defined', function () {
            let distance = mainController.calculateShortestDistance();
            assert.equal(null, distance );
        })
        it('Should return shortest path or string "NO SUCH ROUTE" if proper path are defined', function () {
            let distance = mainController.calculateShortestDistance('B', 'B');
            let result = (distance >= 0 || distance == "NO SUCH ROUTE")
            assert.equal(true, result );
        })
    });


    describe('getTripsOfMaxDistance', function () {
        it('Should return null if inputs is not defined', function () {
            let trips = mainController.getTripsOfMaxDistance();
            assert.equal(null, trips );
        })
        it('Should return trips with distance less than the given distance or string "NO SUCH ROUTE"', function () {
            let trips = mainController.getTripsOfMaxDistance('C', 'C', 30);
            let result = ( (Array.isArray(trips) && trips.length > 0) || trips == "NO SUCH ROUTE" )
            assert.equal(true, result );
        })
    });

});
