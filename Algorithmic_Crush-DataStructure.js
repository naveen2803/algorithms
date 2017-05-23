/*
You are given a list of size , initialized with zeroes. You have to perform  operations on the list and output the maximum of final values of all the  elements in the list. For every operation, you are given three integers ,  and  and you have to add value  to all the elements ranging from index  to (both inclusive).

Input Format

First line will contain two integers  and  separated by a single space.
Next  lines will contain three integers ,  and  separated by a single space.
Numbers in list are numbered from  to .

Output Format

A single line containing maximum value in the updated list.

Sample Input

5 3
1 2 100
2 5 100
3 4 100
Sample Output

200
Explanation

After first update list will be 100 100 0 0 0.
After second update list will be 100 200 100 100 100.
After third update list will be 100 200 200 200 100.
So the required answer will be 200.
*/

function processData(input) {
    var inputs = input.split('\n');
    var arraySize = parseInt(inputs[0].split(' ')[0]);
    var arr = new Array(arraySize).fill(0);
    var noOperations = parseInt(inputs[0].split(' ')[1]);
    var dataArray = inputs.slice(1, inputs.length);
    var arrays = [];
    for(let i = 0; i < dataArray.length; i++)
    {
        var t = dataArray[i].split(' ');
        arrays.push(t.map(Number).slice(0, t.length-1));
    }
    console.log(arrays);
    /*for(let i = 0; i < noOperations; i++)
    {
        let operationParams = inputs[i+1].split(' ');
        let lowerLimit = parseInt(operationParams[0], 10);
        let upperLimit = parseInt(operationParams[1], 10);
        let numberToAdd =  parseInt(operationParams[2], 10);
        for(let j = lowerLimit; j <= upperLimit; j++)
        {
            arr[j-1] = arr[j-1] + numberToAdd;
        }
    }*/


    //console.log(maxInArray(arr));
}

/* destructively finds the intersection of
 * two arrays in a simple fashion.
 *
 * PARAMS
 *  a - first array, must already be sorted
 *  b - second array, must already be sorted
 *
 * NOTES
 *  State of input arrays is undefined when
 *  the function returns.  They should be
 *  (prolly) be dumped.
 *
 *  Should have O(n) operations, where n is
 *    n = MIN(a.length, b.length)
 */
function intersection_destructive(a, b)
{
  var result = [];
  while( a.length > 0 && b.length > 0 )
  {
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else /* they're equal */
     {
       result.push(a.shift());
       b.shift();
     }
  }

  //return result;
  console.log(result);
}

function intersaction()
{
    var arrays = [
        ['apple', 'orange', 'banana', 'pear', 'pizza', 'fish', 'pancake', 'taco', 'pizza'],
        ['taco', 'fish', 'apple', 'pizza'],
        ['banana', 'pizza', 'fish', 'pizza', 'apple']
        ];

    var result = arrays.shift().reduce(function(res, v) {
        if (res.indexOf(v) === -1 && arrays.every(function(a) {
            return a.indexOf(v) !== -1;
        })) res.push(v);
        return res;
    }, []);

    console.log(result);
}



function maxInArray(arr)
{
    return Math.max.apply(null, arr);
}


//intersection_destructive([1,2,3], [2,3,4,5]);
