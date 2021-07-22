// API to read input from the command line in Node.js
const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout })

/**
 *  Defines relations between options
 *  [Key] wins against [value]
 *  Example:
 *  [schere] wins against [papier]
 */
const rules = {
  schere: 'papier',
  stein: 'schere',
  papier: 'stein'
}

// main function that initializes the game and handles user input
function play() {
  /**
   * Ask the user which option they choose.
   * [answer] is the users input.
   */
  rl.question('\n✂️ Schere, 💎 Stein oder 🧻 Papier?\n\n', answer => {
    /**
     * Option chosen by the computer. But what is going on here?
     * `Object.keys ` returns all keys of the `rules` object
     * => ['schere', 'stein', 'papier']
     */
    const allOptions = Object.keys(rules)

    /**
     * `Math.random() * 2` generates a random number between 0 and 2
     * => e.g. 1,235654
     * `Math.round` will round that number since an integer is needed to pick an option
     * => 1
     */
    const randomIndex = Math.round(Math.random() * 2)

    /**
     * Pick the option based on the random index
     * => allOptions[1] === 'stein'
     */
    const computerChoice = allOptions[randomIndex]

    /**
     * Capitalize the first letter of our option to use in the programs output.
     * Not needed but it is correct german.
     * `stein` => `Stein`
     */
    const capitalizedOption = capitalizeFirstLetter(computerChoice[0])

    /**
     * Normalize the user input
     * `answer.toLowerCase()` normalizes the user input.
     * That means the user can capitalize how they want.
     * `'ScHEre'.toLowerCase()` => `schere`
     */
    const normalizedAnswer = answer.toLowerCase()

    /**
     * Check if the users answer is a valid option.
     * `['schere', 'stein', 'papier'].includes('günther') === false`
     * The `!` negates the statement.
     * `!['schere', 'stein', 'papier'].includes('günther') === true`
     * In the case that the answer is not one of the options,
     * tell the user and start the game again.
     */
    if (!allOptions.includes(normalizedAnswer)) {
      return playAgain(`\n"${answer}" ist keine valide Option!\n`)
    }

    /**
     * Check if the user and the computer chose the same option.
     * If that is the case, print a draw message and ask to play again.
     */
    if (normalizedAnswer === computerChoice) {
      return playAgain(`\nUnentschieden!\n`)
    }

    /**
     * Decide who whon based on the rules object.
     * => `rules['stein'] === schere`
     * => `schere === schere`
     * => `true`
     * Computer wins
     *
     * => `rules['stein'] === stein`
     * => `schere === stein`
     * => `false`
     * User wins
     *
     * This works because we checked the possibility of both choices being the same earlier.
     * Rock, Paper, Scissors only has 3 options(draw, win, loose) and we checked one already.
     * And this only works because 1 option can only win against 1 other, not 2.
     * If rock would win against paper and scissors, this logic breaks
     * (and the game wouldn't be fair any more).
     */
    const computerWon = rules[computerChoice] === normalizedAnswer

    /**
     * Initialize a variable for the game end message.
     */
    let gameEndMessage = ''

    /**
     * Decide to print a win or loose message based on the game outcome.
     * `\n` Creates a new line in the terminal. It's like pressing enter.
     */
    if (computerWon) {
      gameEndMessage = `\nDu hast gegen ${capitalizedOption} verloren.\n`
    } else {
      gameEndMessage = `\n🎉 Du hast gegen ${capitalizedOption} gewonnen! 🎉\n`
    }

    /**
     * Print the game end message and ask the user if they want to play again
     */
    playAgain(gameEndMessage)
  })
}

/**
 * This function prints the given message, and asks the user if they want to play again.
 * If the user answers `ja` the game starts again.
 * Any other input stops the game and exits the program.
 */
function playAgain(message) {
  console.log(message)
  rl.question('Noch einmal spielen? (Ja | Nein)\n\n', answer =>
    answer.toLowerCase() === 'ja' ? play() : rl.close()
  )
}

/**
 * Start the game the first time
 */
play()

/**
 * Small helper function that capitalizes the first letter of a string.
 * `capitalizeFirstLetter('dr. Strange')`
 * => `Dr. Strange`
 */
function capitalizeFirstLetter (string) {
  return computerChoice[0].toUpperCase() + computerChoice.slice(1)
}