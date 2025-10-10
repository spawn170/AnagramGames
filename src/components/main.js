import { createApp, ref, watch } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  setup() {
    const screen = ref("start");
    const gameType = ref("");
    const score = ref(0);
    const time = ref(0);
    const input = ref("");

    // ---------- Timer ----------
    let timerInterval = null;

    const startTimer = (seconds) => {
      clearInterval(timerInterval);
      time.value = seconds;
      timerInterval = setInterval(() => {
        time.value--;
        if (time.value <= 0) {
          clearInterval(timerInterval);
          screen.value = "gameover";
        }
      }, 1000);
    };

    // ---------- Anagram Game ----------
    const wordsData = ref([]);
    const currentWord = ref("");
    const remaining = ref([]);

    const loadAnagrams = async () => {
      const res = await fetch("../data/anagrams.json");
      const data = await res.json();
      wordsData.value = data;
      startAnagram();
    };

    const startAnagram = () => {
      const array = wordsData.value[Math.floor(Math.random() * wordsData.value.length)];
      currentWord.value = array[0];
      remaining.value = array.slice(1);
      score.value = 0;
      input.value = "";
      startTimer(60);
    };

    const submitAnagram = () => {
      if (remaining.value.includes(input.value) && input.value !== currentWord.value) {
        score.value++;
        remaining.value = remaining.value.filter((w) => w !== input.value);
      }
      input.value = "";
    };

    // ---------- Math Game ----------
    const num1 = ref(0);
    const num2 = ref(0);

    const startMath = () => {
      score.value = 0;
      input.value = "";
      generateMathProblem();
      startTimer(30);
    };

    const generateMathProblem = () => {
      num1.value = Math.floor(Math.random() * 10);
      num2.value = Math.floor(Math.random() * 10);
    };

    const submitMath = () => {
      if (parseInt(input.value) === num1.value + num2.value) {
        score.value++;
        generateMathProblem();
      }
      input.value = "";
    };

    // ---------- Screen Controls ----------
    const startGame = (type) => {
      gameType.value = type;
      if (type === "anagram") loadAnagrams();
      else startMath();
      screen.value = type;
    };

    const playAgain = () => {
      if (gameType.value === "anagram") startAnagram();
      else startMath();
      screen.value = gameType.value;
    };

    const backToStart = () => {
      screen.value = "start";
    };

    return {
      screen,
      gameType,
      score,
      time,
      input,
      currentWord,
      remaining,
      num1,
      num2,
      startGame,
      submitAnagram,
      submitMath,
      playAgain,
      backToStart,
    };
  },
  template: `
    <div class="container">
      <!-- Start Screen -->
      <div v-if="screen==='start'" class="start-screen">
        <h1>Play2Learn</h1>
        <button @click="startGame('anagram')" class="btn">Anagram Hunt</button>
        <button @click="startGame('math')" class="btn">Math Facts</button>
      </div>

      <!-- Anagram Game -->
      <div v-if="screen==='anagram'" class="game-screen">
        <h2>Anagram Hunt</h2>
        <div class="info">
          <p>Score: {{score}}</p>
          <p>Time Left: {{time}}s</p>
        </div>
        <p>Find anagrams for: <strong>{{currentWord}}</strong></p>
        <input v-model="input" @keyup.enter="submitAnagram" placeholder="Type an anagram..." autofocus>
        <button @click="submitAnagram" class="btn">Submit</button>
        <button @click="backToStart" class="btn secondary">Back to Start</button>
      </div>

      <!-- Math Game -->
      <div v-if="screen==='math'" class="game-screen">
        <h2>Math Facts</h2>
        <div class="info">
          <p>Score: {{score}}</p>
          <p>Time Left: {{time}}s</p>
        </div>
        <p>Solve: {{num1}} + {{num2}} = ?</p>
        <input type="number" v-model.number="input" @keyup.enter="submitMath" placeholder="Enter answer" autofocus>
        <button @click="submitMath" class="btn">Submit</button>
        <button @click="backToStart" class="btn secondary">Back to Start</button>
      </div>

      <!-- Game Over Screen -->
      <div v-if="screen==='gameover'" class="game-over">
        <h2>Game Over!</h2>
        <p>Your score: {{score}}</p>
        <button @click="playAgain" class="btn">Play Again</button>
        <button @click="backToStart" class="btn secondary">Back to Start</button>
      </div>
    </div>
  `,
}).mount("#app");
