<template>
  <div class="p-4">
    <h2>Maintenance App (Vue)</h2>
    <p>Work orders and MEL/deferrals will be displayed here.</p>
    <div v-for="(wo, index) in workOrders" :key="index" class="mt-2 p-2 border rounded bg-gray-100">
      <strong>{{ wo.title }}</strong> — <span>{{ wo.status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface WorkOrder {
  title: string;
  status: string;
}

const workOrders = ref<WorkOrder[]>([
  { title: 'Replace tire on N123AB', status: 'In-Progress' },
  { title: 'Fix avionics fault', status: 'New' },
  { title: 'Oil change on N456CD', status: 'Blocked' },
]);
</script>

<style scoped>
.p-4 { padding: 16px; }
.mt-2 { margin-top: 8px; }
.p-2 { padding: 8px; }
.border { border: 1px solid #ccc; }
.rounded { border-radius: 4px; }
.bg-gray-100 { background-color: #f7fafc; }
</style>