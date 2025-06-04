<script setup>
import { getCurrentInstance, onMounted, ref, computed } from "vue";
import TableCell from "../components/TableCell.vue";

const isLoaded = ref(false);
const isError = ref(false); // Track if there is an error
const errorText = ref("");
const data = ref({});
const winProbability = ref([]);
const time = ref("");
const loadingTimeout = 10000; // Timeout after 10 seconds

function calculateWinProbabilities(players, alpha = 0.0212) {
  const playerArray = Object.entries(players).map(([name, data]) => ({
    name,
    score: data["score"],
    team: data.team,
    image: data.image,
  }));

  const expScores = playerArray.map((p) => ({
    ...p,
    expScore: Math.exp(alpha * p.score),
  }));

  const totalExp = expScores.reduce((sum, p) => sum + p.expScore, 0);

  return expScores.map((p) => ({
    name: p.name,
    team: p.team,
    image: p.image,
    score: p.score,
    probability: ((p.expScore / totalExp) * 100).toFixed(2),
  }));
}

onMounted(() => {
  const instance = getCurrentInstance();

  if (!instance) {
    errorText.value = "No Vue instance found";
    isError.value = true;
    return;
  }

  var globalData = {};
  try {
    globalData = instance.appContext.config.globalProperties.$data;
  } catch (error) {
    errorText.value = "$data not found on globalProperties";
    isError.value = true;
    return;
  }

  try {
    time.value = instance.appContext.config.globalProperties.$updateTime;
  } catch (error) {
    errorText.value = "$updateTime not found on globalProperties";
    return;
  }

  // Start the timeout countdown
  const timeout = setTimeout(() => {
    errorText.value = "Data loading timed out";
    isError.value = true; // Set the error state after timeout
  }, loadingTimeout);

  // Process data and win probabilities
  const rawData = globalData;
  data.value = Object.fromEntries(Object.entries(rawData).slice(0, 30));
  winProbability.value = calculateWinProbabilities(data.value);

  // Once data is loaded, clear the timeout and update the isLoaded flag
  clearTimeout(timeout);
  isLoaded.value = true;
});

const updateTime = computed(() => {
  if (time.value) {
    return time.value;
  } else {
    return "Loading...";
  }
});
</script>

<template>
  <div
    v-show="!isLoaded && !isError"
    class="flex justify-center items-center h-screen text-4xl bg-gray-800 text-yellow-600"
  >
    Loading..
  </div>
  <div
    class="flex justify-center items-center h-screen text-4xl bg-gray-800 text-red-600"
    v-show="isError"
  >
    There is error on our side. Try reload!
  </div>
  <div
    v-show="isLoaded"
    class="bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F03%2F47%2F84%2F19%2F360_F_347841963_CaaqFyprXPVqf8f5XlVr3HkJ2sbaUmhW.jpg&f=1&nofb=1&ipt=3e2efddb4bea22e28c0cb7e5a770595deae007f14249fb4463677549aaee07a2')] bg-repeat overflow-x-hidden flex flex-col justify-center min-h-screen"
  >
    <!-- Logo Section -->
    <div class="flex justify-center -mb-24">
      <img class="mt-6" src="@/assets/logo.png" alt="Logo" />
    </div>

    <div
      class="flex justify-center mt-24 -mb-18 text-white font-bold text-xl md:text-3xl"
      style="
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
          1px 1px 0 black;
      "
    >
      Last update: {{ updateTime }}
    </div>
    <div
      class="flex justify-center mt-24 -mb-18 text-white font-bold text-xl md:text-2xl"
      style="
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
          1px 1px 0 black;
      "
    >
      Latest blog post: &nbsp;
      <a
        class="underline"
        href="https://www.golden-ball-race.eu/blog/toty24.html"
        >Team of the Season 2024/2025</a
      >
    </div>

    <!-- Player Table Section -->
    <div class="mt-24 w-full flex justify-center px-4">
      <div class="flex flex-col items-center">
        <TableCell
          v-for="(player, name, index) in data"
          :name="name"
          :index="index + 1"
          :team="player.team"
          :first-stat="player.score"
          :second-stat="winProbability[index]?.probability + '%' || 'N/A'"
          :img="player.image"
        />
      </div>
    </div>
    <div
      id="footer"
      class="flex flex-col items-center text-gray-100 font-bold"
      style="
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
          1px 1px 0 black;
      "
    >
      All rights reserved. mitrifozjer (@secondvahn on x), 2025.
      <router-link to="/about">About page</router-link>
    </div>
  </div>
</template>
