<script>
import { getUserIdentity } from '@/services/Authprovider.js';
export default {
  data() {
    return {
      username: getUserIdentity(),
    };
  },
};

</script>

<template>
  <div>
    <h3>Games Dashboard of {{ username }} </h3>
  </div>
</template>