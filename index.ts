
const pickRandomDoor = (doors: string[]) => {
    const randomIndex = Math.floor(Math.random() * doors.length);
    return doors[randomIndex]
}

const control = (userChangesDoor: boolean, gameChangesDoor: boolean): boolean => {
    const doors: string[] = ["A", "B", "C"]
    // console.log(`Doors: ${doors}`)
    const prizeDoor = pickRandomDoor(doors)
    // console.log(`Prize door: ${prizeDoor}`)
    const userDoor = pickRandomDoor(doors)
    // console.log(`User door: ${userDoor}`)
    return userDoor === prizeDoor
}


const game = (userChangesDoor: boolean, gameChangesDoor: boolean): boolean => {
    const doors: string[] = ["A", "B"]
    // console.log(`Doors: ${doors}`)

    let prizeDoor = pickRandomDoor(doors)
    // console.log(`Prize door: ${prizeDoor}`)

    let userDoor = pickRandomDoor(doors)
    // console.log(`User door: ${userDoor}`)

    const doorAdded = [...doors, "C"]
    // console.log(`Doors: ${doorAdded}`)

    if (gameChangesDoor) {
        prizeDoor = pickRandomDoor(doorAdded)
        // console.log(`Prize door: ${prizeDoor}`)
    }

    if (userChangesDoor) {
        const remainingDoors = doorAdded.filter(door => door !== userDoor)
        // console.log(`Remaining doors: ${remainingDoors}`)
        userDoor = pickRandomDoor(remainingDoors)
        // console.log(`User door: ${userDoor}`)
    }

    return userDoor === prizeDoor
}


const rounds = (
    gameFunc: (arg1: boolean, arg2: boolean) => boolean,
    userChangesDoor: boolean,
    gameChangesDoor: boolean
): number => {
    const numOfRounds = 5000000

    let wins = 0

    for (let i = 0; i < numOfRounds; i++) {
        // console.log(`Round ${i + 1}`)

        const win = gameFunc(userChangesDoor, gameChangesDoor)
        // console.log(`Win: ${win}`)

        if (win) {
            wins++
        }
    }

    // console.log(`Number of wins: ${wins}`)

    const winPercentage = (wins / numOfRounds) * 100

    return winPercentage
}

console.log("User win rate:\n")

console.log(`Control:\t\t\t\t${rounds(control, false, false)}%`)

console.log(`User and game keep choices:\t\t${rounds(game, false, false)}%`)

console.log(`User changes door, game keeps door:\t${rounds(game, true, false)}%`)

console.log(`User keeps door, game changes door:\t${rounds(game, false, true)}%`)

console.log(`User and game change door:\t\t${rounds(game, true, true)}%`)