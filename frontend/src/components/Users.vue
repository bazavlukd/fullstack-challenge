<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import type { User } from "@/types/user.interface";
import type { WeatherData } from "@/types/weather.interface";
import Dialog from "primevue/dialog";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default defineComponent({
  components: {
    Dialog,
  },
  setup() {
    const userStore = useUserStore();

    const loading = ref<boolean>(false);
    const users = ref<User[]>([]);
    const showModal = ref<boolean>(false);
    const selectedUser = ref<User | null>(null);
    const weatherData = ref<WeatherData | null>(null);

    const showDetails = async (user: User) => {
      selectedUser.value = user;
      loading.value = true;
      showModal.value = true;

      if (selectedUser.value) {
        loading.value = true;

        try {
          
        } catch (error) {
          console.error(error);
        }

        loading.value = false;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    onMounted(async () => {
      await userStore.fetchUsers();
      users.value = userStore.users;
    });

    return {
      users,
      showDetails,
      showModal,
      selectedUser,
      closeModal,
    };
  },
});
</script>

<template>
  <div>
    <div class="p-d-flex p-jc-center">
      <div
        class="p-mt-6 p-grid p-justify-center p-align-center"
        style="width: 100%"
      >
        <div
          class="p-col-12 p-md-6 p-lg-4"
          v-for="user in users"
          :key="user.id"
        >
          <div class="p-shadow-3 p-p-3 p-mb-3 p-d-flex p-flex-column">
            <div class="p-text-center">
              <h3>{{ user.name }}</h3>
              <p class="p-mt-3">{{ user.email }}</p>
            </div>
            <div class="p-mt-4 p-text-center">
              <h5>Current Location:</h5>
              <p class="p-mt-2">Latitude: {{ user.latitude }}</p>
              <p>Longitude: {{ user.longitude }}</p>
            </div>
            <div class="p-mt-4 p-d-flex p-jc-center">
              <button
                class="p-button p-button-success"
                @click="showDetails(user)"
              >
                Detailed weather report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-model="showModal"
      :header="selectedUser?.name + ' Weather'"
      :visible="showModal"
      width="500px"
      :modal="true"
      @hide="closeModal"
    >
      <div v-if="!loading && weatherData">
        <p>Temperature: {{ weatherData.temperature }} &#8451;</p>
        <p>Feels like: {{ weatherData.feelsLike }} &#8451;</p>
        <p>Description: {{ weatherData.description }}</p>
      </div>
      <div v-else-if="loading">Loading weather data...</div>
      <div v-else>No weather data available.</div>
    </Dialog>
  </div>
</template>
