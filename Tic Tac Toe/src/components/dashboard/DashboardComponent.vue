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
    <h3>Welcome {{ username }}</h3>
  </div>
</template>