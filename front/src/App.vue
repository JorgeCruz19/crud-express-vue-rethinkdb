<template>
  <v-app>
    <v-main>
      <person/>
    </v-main>
  </v-app>
</template>

<script>
import Person from './components/Person';

export default {
  name: 'App',

  components: {
    Person,
  },
};
</script>
