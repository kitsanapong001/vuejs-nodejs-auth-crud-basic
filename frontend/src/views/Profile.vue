<template>
  <b-container>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Username:</strong>
      {{ currentUser.username }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <p>
      <strong>Authorities:</strong>
      {{ currentUser.roles }}
    </p>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      game: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {},
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>