<template>
  <div @click="handleClick">
    <component
      class="component"
      :is="config.component"
      :style="getStyle(config.style)"
      :propValue="config.propValue"
      :element="config"
    />
  </div>
</template>

<script>
import { getStyle } from "@/utils/style";

export default {
  props: {
    config: {
      type: Object,
      require: true,
    },
  },
  mounted() {
  },
  methods: {
    getStyle,

    handleClick() {
      const events = this.config.events;
      Object.keys(events).forEach((event) => {
        this[event](events[event]);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
</style>