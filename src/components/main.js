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
        "stop","post","pots","opts","tops","spot","top","pot","opt","so","to","op",
        // train
        "train","rain","intra","artin","riant","ran","rat","tan","tin","ant","tar","air",
        // apple
        "apple","appel","pepla","pleap","pal","lap","ape","pea","ale","app",
        // stone
        "stone","tones","notes","onest","seton","note","not","tone","on","to","no","net","ten",
        // light
        "light","hit","lit","git","hi","it","ti",
        // chair
        "chair","arc","air","chi","har","rah","ah","hi","ahc",
        // bread
        "bread","beard","debar","bared","adreb","be","ad","red","dab","ear","are","bed",
        // plane
        "plane","panel","nepal","plean","enpal","pan","nap","ale","pea","pen","lap","pal",
        // earth
        "earth","hater","rathe","heart","thrae","he","her","hat","tar","rat","art","ear",
        // water
        "water","tawer","wreta","ewrat","rawet","war","tar","rat","ate","ear","tea","wet",
        // mouse
        "mouse","emous","ouesm","smeou","mesou","use","sum","so","me","us","mo"
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
        alert("Cannot guess the original word!");
      } else if (!this.isValidAnagram(guessLower, this.currentWord)) {
        alert("Invalid letters! Use letters from the original word.");
      } else if (!this.dictionary.includes(guessLower)) {
        alert("Not a valid word in the dictionary!");
      } else if (this.guessed.includes(guessLower)) {
        alert("Already guessed!");
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
