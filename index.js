var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var pickRandomDoor = function (doors) {
    var randomIndex = Math.floor(Math.random() * doors.length);
    return doors[randomIndex];
};
var control = function (userChangesDoor, gameChangesDoor) {
    var doors = ["A", "B", "C"];
    // console.log(`Doors: ${doors}`)
    var prizeDoor = pickRandomDoor(doors);
    // console.log(`Prize door: ${prizeDoor}`)
    var userDoor = pickRandomDoor(doors);
    // console.log(`User door: ${userDoor}`)
    return userDoor === prizeDoor;
};
var game = function (userChangesDoor, gameChangesDoor) {
    var doors = ["A", "B"];
    // console.log(`Doors: ${doors}`)
    var prizeDoor = pickRandomDoor(doors);
    // console.log(`Prize door: ${prizeDoor}`)
    var userDoor = pickRandomDoor(doors);
    // console.log(`User door: ${userDoor}`)
    var doorAdded = __spreadArrays(doors, ["C"]);
    // console.log(`Doors: ${doorAdded}`)
    if (gameChangesDoor) {
        prizeDoor = pickRandomDoor(doorAdded);
        // console.log(`Prize door: ${prizeDoor}`)
    }
    if (userChangesDoor) {
        var remainingDoors = doorAdded.filter(function (door) { return door !== userDoor; });
        // console.log(`Remaining doors: ${remainingDoors}`)
        userDoor = pickRandomDoor(remainingDoors);
        // console.log(`User door: ${userDoor}`)
    }
    return userDoor === prizeDoor;
};
var rounds = function (gameFunc, userChangesDoor, gameChangesDoor) {
    var numOfRounds = 5000000;
    var wins = 0;
    for (var i = 0; i < numOfRounds; i++) {
        // console.log(`Round ${i + 1}`)
        var win = gameFunc(userChangesDoor, gameChangesDoor);
        // console.log(`Win: ${win}`)
        if (win) {
            wins++;
        }
    }
    // console.log(`Number of wins: ${wins}`)
    var winPercentage = (wins / numOfRounds) * 100;
    return winPercentage;
};
console.log("Control:\t\t\t\t" + rounds(control, false, false) + "%");
console.log("User and game keep choices:\t\t" + rounds(game, false, false) + "%");
console.log("User changes door, game keeps door:\t" + rounds(game, true, false) + "%");
console.log("User keeps door, game changes door:\t" + rounds(game, false, true) + "%");
console.log("User and game change door:\t\t" + rounds(game, true, true) + "%");
