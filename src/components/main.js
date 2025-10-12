const { createApp } = Vue;

createApp({
  data() {
    return {
      currentGame: "menu",
      playing: false,
      time: 0,
      timer: null,
      score: 0,

      // Anagram game
      dictionary: [
        // stop
        "post","pots","opt","tops","spot","top","pot","so","to","op",
        // train
        "rain","anti","rat","tar","art","tan","ran","nit","tin","an","at","it","in",
        // apple
        "appel","pal","ape","lap","plea","peal","ale","lap","lea","pa",
        // stone
        "tones","notes","tone","note","ones","nest","sent","set","son","ten","net","toe","one","not","so","to","on",
        // light
        "hilt","lit","hit","git","hi","it",
        // chair
        "arch","rich","char","hair","ahi","air","arc","car","chi","ha","ah",
        // bread
        "beard","bared","bear","bare","read","dare","ear","era","are","red","bed","bad","bar","dab","rad","ad","be","are",
        // plane
        "panel","penal","nepal","pane","lean","lane","plan","plea","peal","nap","pan","pen","pal","ape","ale","lap","pea","an","pa",
        // earth
        "heart","hater","heat","hear","hare","hart","rate","eat","tea","tar","rat","art","era","ear","hat","her","at","he","ah","er",
        // water
        "ware","wear","wart","rate","tare","war","ate","eat","tea","tar","rat","art","awe","raw","ear","era","wet","at","we","aw","er",
        // mouse
        "muse","some","emu","use","sum","so","me","us","so","um",
      ],
      currentWord: "",
      possibleAnagrams: [],
      guessed: [],
      guess: "",

      // Math game
      num1: 0,
      num2: 0,
      answer: 0
    };
  },
  methods: {
    // --- Menu & navigation ---
    selectGame(game) {
      this.currentGame = game;
      this.playing = false;
      this.score = 0;
    },
    goHome() {
      this.clearTimer();
      this.currentGame = "menu";
      this.playing = false;
      this.score = 0;
      this.guess = "";
      this.answer = 0;
      this.guessed = [];
    },

    // --- Timer ---
    startTimer(seconds) {
      this.clearTimer();
      this.time = seconds;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.clearTimer();
          alert(`Time's up! Score: ${this.score}`);
          this.playing = false;
          this.goHome();
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer) clearInterval(this.timer);
    },

    // --- Anagram game ---
    startAnagramGame() {
      this.guessed = [];
      this.guess = "";
      // Pick a random word from dictionary with length >= 4
      const longWords = this.dictionary.filter(w => w.length >= 4);
      this.currentWord = longWords[Math.floor(Math.random() * longWords.length)];
      // Compute all possible words (subwords) from dictionary
      this.possibleAnagrams = this.dictionary.filter(w => this.isValidAnagram(w, this.currentWord) && w !== this.currentWord);
      this.score = 0;
      this.playing = true;
      this.startTimer(60);
    },

    submitGuess() {
      if (!this.guess) return;

      const guessLower = this.guess.toLowerCase();

      if (guessLower === this.currentWord.toLowerCase()) {
        alert("You cannot guess the original word.");
      } else if (!this.isValidAnagram(guessLower, this.currentWord)) {
        alert("Invalid letters. Use letters from the original word.");
      } else if (!this.dictionary.includes(guessLower)) {
        alert("Not a valid word in the dictionary.");
      } else if (this.guessed.includes(guessLower)) {
        alert("Already guessed.");
      } else {
        this.guessed.push(guessLower);
        this.score++;
      }

      this.guess = "";

      // If all possible anagrams/subwords guessed, move to next word
      if (this.guessed.length >= this.possibleAnagrams.length) {
        alert(`All words for "${this.currentWord}" found! Moving to next word.`);
        this.startAnagramGame();
      }
    },

    isValidAnagram(word, original) {
      const originalLetters = original.split("");
      for (let letter of word) {
        const index = originalLetters.indexOf(letter);
        if (index === -1) return false;
        originalLetters.splice(index, 1);
      }
      return true;
    },

    // --- Math game ---
    startMathGame() {
      this.score = 0;
      this.playing = true;
      this.generateMathProblem();
      this.startTimer(30);
    },
    generateMathProblem() {
      this.num1 = Math.floor(Math.random() * 20);
      this.num2 = Math.floor(Math.random() * 20);
    },
    submitAnswer() {
      if (this.answer === this.num1 + this.num2) {
        this.score++;
        this.answer = 0;
        this.generateMathProblem();
      } else {
        alert("Incorrect! Try again.");
        this.answer = 0;
      }
    }
  }
}).mount("#app");
