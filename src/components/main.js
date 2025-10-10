const { createApp } = Vue;

createApp({
  data() {
    return {
      currentGame: "menu", // 'menu', 'anagram', 'math'
      playing: false,
      time: 0,
      timer: null,
      score: 0,

      // Anagram game
      anagrams: [
        ["stop", "post", "pots", "opts", "tops", "spot"],
        ["train", "raint", "intra", "artin", "riant"],
        ["apple", "appel", "pepla", "pleap", "leapp"],
        ["stone", "tones", "notes", "onest", "seton"],
        ["light", "githl", "thgil", "lhtig", "htilg"],
        ["chair", "rchai", "achir", "hirac", "irach"],
        ["bread", "beard", "debar", "bared", "adreb"],
        ["plane", "panel", "nepal", "plean", "enpal"],
        ["earth", "hater", "rathe", "heart", "thrae"],
        ["water", "tawer", "wreta", "ewrat", "rawet"],
        ["mouse", "emous", "ouesm", "smeou", "mesou"]
      ],
      currentWord: "",
      currentAnagramList: [],
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
      const wordArray = this.anagrams[Math.floor(Math.random() * this.anagrams.length)];
      this.currentWord = wordArray[0]; // display first word
      this.currentAnagramList = wordArray.slice(1); // rest are valid guesses
      this.score = 0;
      this.playing = true;
      this.startTimer(60);
    },
    submitGuess() {
      if (!this.guess) return;

      const guessLower = this.guess.toLowerCase();

      if (guessLower === this.currentWord.toLowerCase()) {
        alert("Cannot guess the original word!");
      } else if (this.currentAnagramList.includes(guessLower) && !this.guessed.includes(guessLower)) {
        this.guessed.push(guessLower);
        this.score++;
      } else {
        alert("Wrong or already guessed!");
      }

      this.guess = "";

      // Pick new word if all anagrams found
      if (this.guessed.length >= this.currentAnagramList.length) {
        this.startAnagramGame();
      }
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
