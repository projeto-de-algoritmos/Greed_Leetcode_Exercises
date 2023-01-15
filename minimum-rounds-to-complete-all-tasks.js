// https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks
/**
 * @param {number[]} tasks
 * @return {number}
 */
var minimumRounds = function (tasks) {
    // sort tasks in ascending order
    const sortedTasks = tasks.sort()
    // Map to store the number of occurrences of each task
    const ocorrencesMap = new Map();

    const prevTask = tasks[0];
    for (let task of sortedTasks) {
        // if the current task is different from the previous task and the previous task has only one occurrence, return -1
        if(ocorrencesMap.get(prevTask) == 1 && task != prevTask) return -1;
        
        // increment the number of occurrences of the current task in the map
        const value = ocorrencesMap.get(task) ?? 0
        ocorrencesMap.set(task, value + 1)
    }

    let count = 0;

    // for each task in the map, calculate the number of rounds needed to complete all tasks
    for(let task of ocorrencesMap.keys()) {
        const freq = ocorrencesMap.get(task) 
        
        if(freq === 1) return -1

       // rounding up considering chunks of 2/3 tasks
        count += Math.ceil(freq / 3)
    }    
    
  return count;
};