const readline = require('readline');

const quotes = [
    "\n\nThus should the timid by exciting their fears, the courageous by the arts of conciliation, \nthe covetous by gift of wealth, and equals and inferiors by exhibition of prowess be \nbrought under your sway. \n - Kanika to Dhritarashtra, The Mahabharat\n",
    "\nHe who believes that new benefits will cause great personages to forget old injuries is\ndeceived.\n - Nicolo Machiavelli\n",
    "\nOne who has a ‘why’ to live for can endure almost any ‘how’.\n - Friedrich Nietzsche\n",
    "\nIf he who rules a principality cannot recognize evils until they are upon him, he is not\ntruly wise.\n - Nicolo Machiavelli\n",
    "\nIt is wiser to have a reputation for meanness which brings reproach without hatred, than\nto be compelled through seeking a reputation for liberality to incur a name for rapacity\nwhich begets reproach with hatred.\n - Nicolo Machiavelli\n",
    "\nBecasue he who conquers does not want doubtful friends who will not aid him in the time of trial;\nand he who loses will not harbour you because you did not willingly, sword in hand, court his\nfate.\n - Nicolo Machiavelli\n"
]

const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Press enter to roll the die and gain wisdom.", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    console.log("\nYour nugget of wisdom for the day:");
    console.log(quotes[randomIndex]);
    rl.close();
});