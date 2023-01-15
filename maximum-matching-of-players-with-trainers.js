// https://leetcode.com/problems/maximum-matching-of-players-with-trainers/
/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
var matchPlayersAndTrainers = function (players, trainers) {
    // sort players and trainers in descending order
    const sortedPlayers = players.sort((a, b) => b - a)
    const sortedTrainers = trainers.sort((a, b) => b - a)

    // count the number of players that can be matched with trainers    
    let count = 0

    for (let [i, j] = [0, 0]; i < sortedPlayers.length && j < sortedTrainers.length; ++i) { 
        // if match found, increment count and move to next trainer
        if(sortedPlayers[i] <= sortedTrainers[j]) {
            j++;
            count++;
        }
    }

    return count
};