<script>
import { getUserIdentity } from '@/services/Authprovider.js';
export default {
  data() {
    return {
      user: getUserIdentity(),
    };
  },
};

</script>

<template>
  <div>
    <h3>Welcome {{ user }}</h3>
  </div>
</template>