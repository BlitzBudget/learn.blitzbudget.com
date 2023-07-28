<template>
  <div class="wrapper blog-posts">
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import initParallax from "@/utils/initParallax";
export default {
  name: "blog-posts",
  head: {
    title: 'BlitzBudget Learn for learning coding, personal finance and psychology among others',
  },
  layout: "default",
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  mounted() {
    initParallax();
  },
};
</script>
<style></style>
