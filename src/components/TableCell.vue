<script setup>
const props = defineProps({
  name: String,
  team: String,
  firstStat: Number,
  secondStat: String,
  index: Number,
  firstStatName: String,
  secondStatName: String,
  img: String,
});
</script>
<template>
  <div
    class="md:w-xl md:p-4 bg-white/75 border-b border-gray-700 shadow-sm flex hover:bg-gray-100 text-gray-700 justify-center"
  >
    <img
      :src="img"
      class="md:w-[80px] md:h-[80px] w-[50px] h-[50px]"
      loading="lazy"
    />
    <div
      class="md:w-[30px] w-[25px] pr-0.5 md:text-xl text-sm border-r border-gray-700 flex justify-center"
    >
      {{ props.index }}
    </div>
    <div
      class="inline-block md:w-[200px] w-[110px] px-2 border-r border-gray-700 md:text-lg text-xs text-black align-middle overflow-hidden"
    >
      {{ props.name }}
    </div>
    <div
      class="inline-block md:w-[200px] w-[110px] px-2 border-r text-sm md:text-lg overflow-hidden border-gray-700"
    >
      {{ props.team }}
    </div>
    <div
      class="md:w-[70px] w-[45px] px-2 border-r text-sm border-gray-700 flex justify-center"
    >
      {{ props.firstStat }}
    </div>
    <div
      class="md:w-[80px] w-[50px] text-sm px-2 border-r border-gray-700 flex justify-center"
    >
      {{ props.secondStat }}
    </div>
  </div>
</template>
