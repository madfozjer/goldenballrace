<script setup>
import router from "../router/router";

router;
</script>

<template>
  <div
    class="bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F03%2F47%2F84%2F19%2F360_F_347841963_CaaqFyprXPVqf8f5XlVr3HkJ2sbaUmhW.jpg&f=1&nofb=1&ipt=3e2efddb4bea22e28c0cb7e5a770595deae007f14249fb4463677549aaee07a2')] bg-repeat overflow-x-hidden min-h-screen"
  >
    <div class="flex justify-center -mb-24">
      <img
        class="mt-6 hover:cursor-pointer"
        src="@/assets/logo.png"
        alt="Logo"
        @click="router.push('/')"
      />
    </div>
    <div
      class="flex flex-col justify-center text-white mt-24 text-2xl font-bold mx-12 md:mx-48"
      style="
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
          1px 1px 0 black;
      "
    >
      Our website was born from a passion to mathematically predict the Ballon
      d'Or winner, and we believe it excels in this endeavor.

      <br />
      Leveraging comprehensive data from the top 5 European leagues (English
      Premier League, Serie A, Ligue 1, Bundesliga, and La Liga) alongside the
      Champions League, we analyze key metrics such as goals, assists, FotMob
      ratings, and team standings to identify the current top 25 global players.
      While our proprietary mathematical equation remains confidential for
      commercial reasons, we can confidently state that it's the result of
      significant dedication and accurately predicts top 5 in over 60% of the
      Ballon d'Or situations.

      <br />
      We welcome any inquiries and are open to discussing potential integration
      of our data into your website. But for now, our data is publicly
      accessible for non-commercial use on GitHub: madfozjer/goldenballrace.
      <router-link to="license"
        >By proceeding, you confirm that you have read, understood, and agree to
        be bound by the terms of the following license.</router-link
      >
    </div>
  </div>
</template>
