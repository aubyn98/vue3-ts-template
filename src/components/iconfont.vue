<template>
  <svg>
    <use :xlink:href="`#icons-${name}`"></use>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['name'],
})
</script>

<style></style>
