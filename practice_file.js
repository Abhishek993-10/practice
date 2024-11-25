const engine = {
    start(adverb) {
        console.log(`The engine starts up ${adverb}...`);
    },

    sputter: () => {
        console.log("The engine sputters")
    }
};

engine.start('noisily');
engine.sputter();
