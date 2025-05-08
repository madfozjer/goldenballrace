<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import TableCell from "./components/TableCell.vue";

const isLoaded = ref(false);
const isError = ref(false); // Track if there is an error
const errorText = ref("");
const data = ref({});
const winProbability = ref([]);

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

  var updateTime = "";
  try {
    updateTime = instance.appContext.config.globalProperties.$updateTime;
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
  data.value = Object.fromEntries(Object.entries(rawData).slice(0, 25));
  winProbability.value = calculateWinProbabilities(data.value);

  // Once data is loaded, clear the timeout and update the isLoaded flag
  clearTimeout(timeout);
  isLoaded.value = true;
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
    {{ errorText }}
  </div>
  <div
    v-show="isLoaded"
    class="bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F03%2F47%2F84%2F19%2F360_F_347841963_CaaqFyprXPVqf8f5XlVr3HkJ2sbaUmhW.jpg&f=1&nofb=1&ipt=3e2efddb4bea22e28c0cb7e5a770595deae007f14249fb4463677549aaee07a2')] bg-repeat overflow-x-hidden flex flex-col justify-center min-h-screen"
  >
    <!-- Logo Section -->
    <div class="flex justify-center -mb-24">
      <img class="mt-6" src="@/assets/logo.png" alt="Logo" />
    </div>

    <div class="flex justify-center -mb-24">Last update: {{ updateTime }}</div>

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
  </div>
</template>
