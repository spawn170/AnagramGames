const { createApp } = Vue;

createApp({
  data() {
    return {
      currentGame: "menu",
      playing: false,
      time: 0,
      timer: null,
      score: 0,
      selectedLength: "",

      // Anagram game data
      dictionary: [
        "stop","post","pots","opt","tops","spot","top","pot","so","to","op",
        "train","rain","anti","rat","tar","art","tan","ran","nit","tin","an","at","it",
        "apple","appel","pal","ape","lap","plea","peal","ale","lea","pa",
        "stone","tones","notes","tone","note","ones","nest","sent","set","son","ten","net","toe","one","not","so","to","on",
        "light","hilt","lit","hit","git","hi","it",
        "chair","arch","rich","char","hair","ahi","air","arc","car","chi","ha","ah",
        "bread","beard","bared","bear","bare","read","dare","dear","ear","era","are","red","bed","bad","bar","dab","rad","ad","be",
        "plane","panel","penal","nepal","pane","lean","leap","lane","plan","plea","peal","nap","pan","pen","pal","ape","ale","lap","pea","an","pa",
        "earth","heart","hater","heat","hear","hare","hart","rate","eat","tea","tar","rat","art","era","ear","hat","her","at","he","ah","er",
        "water","ware","wear","wart","rate","tare","war","ate","eat","tea","tar","rat","art","awe","raw","ear","era","wet","at","we","aw","er",
        "mouse","muse","some","emu","use","sum","so","me","us","um","sue" 
      ],
      currentWord: "",
      shuffledWord: "",
      possibleAnagrams: [],
      guessed: [],
      guess: "",
      anagramMessage: "",

      // Math game data
      num1: 0,
      num2: 0,
      answer: 0,
      mathMessage: ""
    };
  },

  methods: {
    // --- Menu & navigation ---
    selectGame(game) {
      this.currentGame = game;
      this.playing = false;
      this.score = 0;
      this.selectedLength = "";
      this.anagramMessage = "";
      this.mathMessage = "";
    },

    goHome() {
      this.clearTimer();
      this.currentGame = "menu";
      this.playing = false;
      this.score = 0;
      this.guess = "";
      this.answer = 0;
      this.guessed = [];
      this.currentWord = "";
      this.shuffledWord = "";
      this.anagramMessage = "";
      this.mathMessage = "";
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
      if (!this.selectedLength) {
        alert("Please select a word length before starting!");
        return;
      }

      this.guessed = [];
      this.guess = "";
      this.anagramMessage = "";

      const length = parseInt(this.selectedLength); // convert string to number
      const words = this.dictionary.filter(w => w.length === length);

      if (words.length === 0) {
        this.anagramMessage = `No words of length ${length} found!`;
        return;
      }

      this.currentWord = words[Math.floor(Math.random() * words.length)];
      this.shuffledWord = this.shuffleWord(this.currentWord);

      this.possibleAnagrams = this.dictionary.filter(
        (w) => this.isValidAnagram(w, this.currentWord) && w !== this.currentWord
      );

      this.score = 0;
      this.playing = true;
      this.startTimer(60);
    },

    shuffleWord(word) {
      return word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    },

    submitGuess() {
      this.anagramMessage = "";

      if (!this.guess) return;
      const guessLower = this.guess.toLowerCase();

      if (guessLower === this.currentWord.toLowerCase()) {
        this.anagramMessage = "You cannot guess the original word!";
      } else if (!this.isValidAnagram(guessLower, this.currentWord)) {
        this.anagramMessage = "Invalid letters. Use only letters from the original word.";
      } else if (!this.dictionary.includes(guessLower)) {
        this.anagramMessage = "Not a valid word in the dictionary.";
      } else if (this.guessed.includes(guessLower)) {
        this.anagramMessage = "Already guessed!";
      } else {
        this.guessed.push(guessLower);
        this.score++;
        this.anagramMessage = `Good! You found "${guessLower}".`;
      }

      this.guess = "";

      if (this.guessed.length >= this.possibleAnagrams.length) {
        this.anagramMessage = `All possible words for "${this.currentWord}" found!`;
        setTimeout(() => this.startAnagramGame(), 1500);
      }
    },

    isValidAnagram(word, original) {
      const letters = original.split("");
      for (let letter of word) {
        const idx = letters.indexOf(letter);
        if (idx === -1) return false;
        letters.splice(idx, 1);
      }
      return true;
    },

    // --- Math game ---
    startMathGame() {
      this.score = 0;
      this.playing = true;
      this.mathMessage = "";
      this.generateMathProblem();
      this.startTimer(30);
    },

    generateMathProblem() {
      this.num1 = Math.floor(Math.random() * 20);
      this.num2 = Math.floor(Math.random() * 20);
      this.answer = 0;
    },

    submitAnswer() {
      if (this.answer === this.num1 + this.num2) {
        this.score++;
        this.mathMessage = "Correct!";
        this.generateMathProblem();
      } else {
        this.mathMessage = "Incorrect! Try again.";
      }
      this.answer = 0;
    },
  },
}).mount("#app");
