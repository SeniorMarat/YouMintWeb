<template lang="pug">
.layout
  .main
    layout-page-header
    .page: nuxt-page
</template>

<style module lang="scss">
.layout {
  display: flex;
  height: 100svh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page {
  padding: 24px;
  flex: 1;
}
</style>
