<template>
  <div>
    <div class="error">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Error',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    const error = this.$route.params;
    this.message = error.err;
    // let vm = error.vm;
    // let url = vm.$route.fullPath;
  }
});
</script>

<style>
.error {
  font-size: 10vw;
}
</style>
