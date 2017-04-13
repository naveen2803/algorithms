/*
Find the length of the largest subarray of an array a where the sum on the subarray elements
should be less that or equal to the parameter maxSum in a function.
*/

function getMaxLength(a, maxSum) {
    var maxLength = 0;
    var subArrays = getSubArrays(a);
    var selectedSubArray = [];

    for(var i = 0; i < subArrays.length; i++) {
        var sum = subArrays[i].reduce(function(a,b) {
            return a+b;
        });

        if( sum <= maxSum && subArrays[i].length > maxLength) {
            maxLength = subArrays[i].length;
            selectedSubArray = subArrays[i];
        }
    }

    console.log("Max subarray length: " + maxLength);
    console.log("Max Sum: " + maxSum + "; Subarray: [" + selectedSubArray + "]");
}

function getSubArrays(a){
    var p = 0,
    r = [],
    t = [];
    for (var i = 0, la = a.length; i < la; i++) {
        r.push([a[i]]);
        p = r.length-1;
        for (var j = i+1; j < la; j++)
            for (var k = p, lr = r.length; k < lr; k++){
                t = r[k].slice();
                t.push(a[j]);
                r.push(t);
        }
    }
    return r;
}

getMaxLength([1,12,3,4,5,6,7,8,9,10,11], 20);
