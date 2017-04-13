/*
Christy is interning at HackerRank. One day she has to distribute some chocolates to her colleagues. She is biased towards her friends and may have distributed the chocolates unequally. One of the program managers gets to know this and orders Christy to make sure everyone gets equal number of chocolates.

But to make things difficult for the intern, she is ordered to equalize the number of chocolates for every colleague in the following manner,

For every operation, she can choose one of her colleagues and can do one of the three things.

She can give one chocolate to every colleague other than chosen one.
She can give two chocolates to every colleague other than chosen one.
She can give five chocolates to every colleague other than chosen one.
Calculate minimum number of such operations needed to ensure that every colleague has the same number of chocolates.

Input Format

First line contains an integer  denoting the number of testcases.  testcases follow.
Each testcase has  lines. First line of each testcase contains an integer  denoting the number of co-interns. Second line contains N space separated integers denoting the current number of chocolates each colleague has.

Constraints



Number of initial chocolates each colleague has <

Output Format

 lines, each containing the minimum number of operations needed to make sure all colleagues have the same number of chocolates.

Sample Input

1
4
2 2 3 7
Sample Output

2
Explanation

1st operation: Christy increases all elements by 1 except 3rd one
2 2 3 7 -> 3 3 3 8
2nd operation: Christy increases all element by 5 except last one
3 3 3 8 -> 8 8 8 8
*/

function distribute(distributions)
{
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    const FOUR = 4;
    const FIVE = 5;
    var iteration = 0;
    // sort the array
    distributions.sort(function(a, b) {
        return a - b;
    });
    while(allEqual(distributions) == false)
    {
        distributions.sort(function(a, b) {
            return a - b;
        });
        iteration = iteration + 1;
        var highest = maxInArray(distributions);
        var smallest = minInArray(distributions);
        var secondSmallest = secondSmallestInArray(distributions);
        var secondSmallestPosition = secondSmallestPositionInArray(distributions);
        switch(secondSmallest - smallest)
        {
            case ONE:
            {
                distributions = holdAndAdd(ONE, distributions, secondSmallestPosition);
                break;
            }
            case TWO:
            case THREE:
            case FOUR:
            {
                distributions = holdAndAdd(TWO, distributions, secondSmallestPosition);
                break;
            }
            default:
            {
                distributions = holdAndAdd(FIVE, distributions, secondSmallestPosition);
                break;
            }
        }
    }
    console.log(iteration);
    //console.log("\nCompleted in " + iteration + " iterations.\n");
}

function maxInArray(arr)
{
    return Math.max.apply(null, arr);
}

function minInArray(arr)
{
    return Math.min.apply(null, arr);
}

function secondSmallestInArray(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i+1] > arr[i]) return arr[i+1];
        else continue;
    }
}

function secondSmallestPositionInArray(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i+1] > arr[i]) return (i+1);
        else continue;
    }
}

function holdAndAdd(value, distributions, positionToHold)
{
    for(let i = 0; i < distributions.length; i++)
    {
        if(i != positionToHold)
        {
            distributions[i] = distributions[i] + value;
        }
    }
    return distributions;
}

function allEqual(arr)
{
    var isAllGood = true;
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] != arr[i+1] && arr[i+1] != undefined)
        {
            isAllGood = false;
            break;
        }
    }
    return isAllGood;
}

distribute([2, 5, 5, 5, 5, 5]);



/* SAMPLE TEST CASE */
/*

Expected Output:
1123
6236
6743
2206
8624
2639
12830
6346
6181
927

INPUT:
[249,666,500,101,227,85,963,681,331,119,448,587,668,398,802]

[803,893,723,109,384,733,457,697,426,805,703,496,447,911,911,48,577,411,149,805,849,465,838,180,936,638,120,956,36,922,819,839,168,894,300,552,979,110,601,406,915,304,902,714,215,166,762,145,577,263,302,778,80,140,311,16,130,431,324,166,705,144,358]

[390,10,778,370,120,379,776,387,36,30,101,251,196,215,748,126,831,50,256,911,542,567,280,672,350,956,191,56,100,901,281,843,911,59,213,32,791,341,771,827,371,225,430,920,440,179,46,623,229,302,887,124,222,519,796,572,475,987,980,928,888,262,771,152,673,984,536,816,677,307,643,48,532]

[968,325,605,366,948,186,21,187,310,243,706,107,167,534,446,148,462,687,762,233,839,435,569,375,604,246]

[247,646,567,25,967,892,630,333,192,817,706,732,479,301,438,938,469,972,385,969,786,424,731,19,263,518,940,990,122,186,24,722,833,591,747,152,835,730,837,380,899,544,112,378,845,902,317,666,875,54,635,661,478,366,33,93,885,325,435,359,512,459,81,697,403,181,849,238,911,686,970,810,582,82,188,780,985,857,446,212,911,82]

[741,448,610,186,685,936,621,45,800,81,478,497,836,659,698,426,922,736,397,732,671,479,273,451,816]

[897,28,394,979,254,487,428,216,674,465,152,295,862,952,728,693,801,916,352,499,343,627,588,740,359,259,219,984,710,388,115,607,416,861,939,22,348,719,239,374,184,743,22,47,696,102,740,497,19,444,349,362,423,289,102,783,548,673,767,610,413,234,569,830,447,508,204,148,227,795,874,764,539,896,163,235,351,255,84,370,51,785,84,475,74,538,258,974,563,377,584,977,964,506,807,763,14,363,911,594,159,786,710,698,34,873,285,385,128,721,755,179,507,839,654,933,729,264,908,293,994,844,270,310,350,429,73,717,792,985]

[951,123,373,1,157,246,286,543,726,8,650,905,867,842,912,800,571,528,60,216,522,905,486,832,607,915,258,676,60,595,339,11,718,712,365,875,310,651,770,36,11,773,294,230,615,558,383,538,86,443,755,961,700,241,145,660,509,403,336,569,998,28,932]

[92,649,296,403,301,66,791,664,839,437,895,806,995,278,345,434,73,100,395,126,341,892,786,202,296,474,123,646,502,408,715,947,57,11,350,710,429,493,375,621,283,622,427,630,900,124,416,325,224,811,451,918,704,589,120,352,416,596,998,270,4,65,217,413,428,919,124,210]

[851,183,48,473,610,678,725,87,95,50,311,258,854]

*/
