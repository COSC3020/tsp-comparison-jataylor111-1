// ----------------------------------------------
// This is the section for the TSP Held Karp - Borrowed from Cade Maynard
// ----------------------------------------------

function tsp_hk(distance_matrix) {
    tsp_mems = [];
    let nodesLeft = [];
    if(distance_matrix.length <= 1) {
        return 0;
    } else {
        for(let a = 0; a < distance_matrix.length; a++) //Initializes the nodesLeft array, it is in order from the beginning
            nodesLeft[a] = a;
        let min = Infinity;
        let temp = 0;
        for(let i = 0; i < distance_matrix.length; i++){
            temp = tsp_HeldKarp(distance_matrix, i, nodesLeft)
            if(temp < min)
                min = temp
    }
    return min
    }
}

function tsp_HeldKarp(distance_matrix, start, nodesLeft) {
    if(tsp_mems[JSON.stringify(nodesLeft) + start] === undefined) {
        if(nodesLeft.length < 1) {
            return 0;
        } else if(nodesLeft.length == 1) {
            tsp_mems[JSON.stringify(nodesLeft) + start] = distance_matrix[start][nodesLeft[0]];
            return tsp_mems[JSON.stringify(nodesLeft) + start];
        } else {
            let min = Infinity;
            let minI = -1;

            for(let i = 0; i < nodesLeft.length; i++) {
                let tempStart = nodesLeft.splice(i,1)                                        //The splice function here removes one item
                temp = distance_matrix[start][tempStart] + tsp_HeldKarp(distance_matrix, tempStart, nodesLeft.flat(Infinity))    //from the array at the index and returns
                if(temp < min) {                                                             //that item to the tempStart variable
                    min = temp;                                                                                                                                                                                           
                    minI = tempStart;
                }
                nodesLeft.splice(i,0,tempStart);                                            //Here, splice is used to reinsert the 
            }                                                                               //tempStart variable back into the array at
            tsp_mems[JSON.stringify(nodesLeft) + start] = min;//the same point it was removed. For all
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //recursive calls, the function will receive
        }                                                                                   //a correctly sorted array and anything taken
                                                                                            //out will be added back in at the same 
    } else {                                                                                //point. At no point should the array become
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //unsorted. So we do not need to worry about
        }                                                                                   //the memoization not being used for different
}                   

// ----------------------------------------------
// This section contains the TSP Local Search
// ----------------------------------------------

function tsp_ls(distance_matrix) {
    // Empty or matrix of one
    if (distance_matrix.length == 0 || distance_matrix.length == 1) {
        return 0;
    }

    // Just start with the nodes themselves, won't be ideal, doesn't have to be
    let currentRoute = Object.keys(distance_matrix);
    let currentLength = routeLen(currentRoute, distance_matrix);
    // Get a max number of iterations that makes sense and can change based on the size of the matrix
    // distance_matrix.length squared is what makes the most sense for both a reasonable number of iterations 
    // and making sure there are enough of them
    let maxIters = distance_matrix.length ** 2;
    // console.log("Max Iterations: " + maxIterations);

    for(let j = 1; j < maxIters; j++) { // Runs for length squared, so time complexity n^2
        // Just choose i and k randomly odds that they're the same are low
        let i = Math.floor(Math.random() * distance_matrix.length);
        let k = Math.floor(Math.random() * distance_matrix.length);
        // Ensure that they aren't the same, smaller matrices are tough on the random implementation
        // Gave it a maximum runtime cause in theory it could go infinite
        let iters = 0
        // console.log("Matrix length: " + distance_matrix.length);
        while(i == k && iters < distance_matrix.length) { // Could run the length of the matrix, time complexity n
            i = Math.floor(Math.random() * distance_matrix.length);
            k = Math.floor(Math.random() * distance_matrix.length);
            iters++
        }
        // console.log("Iters: " + iters);

        // Perform the 2-opt swap
        let newRoute = twoOpt(currentRoute, i, k);
        let newLength = routeLen(newRoute, distance_matrix);
        // console.log("New Length: " + newLength);

        if (newLength < currentLength) {
            currentRoute = newRoute;
            currentLength = newLength;
        }
    }

    return currentLength;
}

// Helper function to calculate the total length of a route
function routeLen(route, distanceMatrix) {
    let length = 0;
    for (let i = 0; i < route.length - 1; i++) {
        length += distanceMatrix[route[i]][route[i + 1]];
    }
    // console.log("Calculated length: " + length);
    return length;
}

// Helper function to perform the 2-opt swap using a direct approach
function twoOpt(route, i, k) {
    let newRoute = [];
    
    for (let j = 0; j < i; j++) { // At worst i is the size of the length of matrix, complexity n
        // Keep the segment before i unchanged
        newRoute.push(route[j]); 
    }
    // console.log("First for: " + newRoute);
    for (let j = k; j >= i; j--) { // Same as above, complexity n
        // Reverse the segment between i and k
        newRoute.push(route[j]);
    }
    // console.log("Second for: " + newRoute);
    for (let j = k + 1; j < route.length; j++) { // Uses the length of the current route, also complexity n
        // Keep the segment after k unchanged
        newRoute.push(route[j]); 
    }
    // console.log("Third for: " + newRoute);
    return newRoute;
}

// ----------------------------------------------
// These are the timings and paths 
// ----------------------------------------------

// Function to generate matrices
function makeMat(n) {
    let arr = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                // Generate random number between min and max (inclusive)
                row.push(Math.floor(Math.random() * 20));
            }
            arr.push(row);
        }
        return arr;
}

// console.log("makeMat test: " + tsp_ls(mat));

// Initialize distance matrix
let dm = [[]];

// // Held Karp runner for timings
// console.log("HELD KARP");
// for(i = 1; i < 12; i++) {
//     console.log("HK Iteration: " + i);
//     dm = makeMat(i);
//     console.time('Held Karp');
//     console.log("held karp: " + tsp_hk(dm));
//     console.timeEnd("Held Karp");
// }

// // Local Search runner for timings
// console.log("\n\n\nLOCAL SEARCH");
// for(i = 1; i < 4500; i+=409) {
//     console.log("LS Iteration: " + i);
//     dm = makeMat(i);
//     console.time('Local Search');
//     console.log("local search: " + tsp_ls(dm));
//     console.timeEnd('Local Search');
// }

// // Runner for accuracy comparisons
// console.log("\n\n\nACCURACY COMPARISON");
// for(i = 1; i < 12; i++) {
//     dm = makeMat(i);
//     console.log("Iteration: " + i + "\nLocal Search: " + tsp_ls(dm) + "\nHeld Karp: " + tsp_hk(dm));
// }
