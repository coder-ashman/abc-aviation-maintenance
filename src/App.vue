<template>
  <div class="c-page maintenance-theme">
    <header class="c-module-header">
      <div>
        <p class="c-module-eyebrow">Maintenance Control • Powered by Vue.js</p>
        <h1 class="c-module-title">Industrial Maintenance Operations</h1>
        <p class="c-module-subtitle">Prioritised list of active work orders across the fleet.</p>
      </div>
      <button type="button" class="c-button c-button--primary">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 5a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V5z" />
        </svg>
        Create Work Order
      </button>
    </header>

    <section>
      <div class="c-kpi-grid">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="c-card c-card--kpi"
          :data-tone="stat.tone"
        >
          <div class="c-card__label">{{ stat.label }}</div>
          <div class="c-card__value">{{ stat.value }}</div>
          <div class="c-card__meta">
            <span class="c-badge" :class="badgeClass(stat.tone)">{{ stat.meta }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="c-card">
      <h2 class="c-section-title">Open Work Orders</h2>
      <div class="c-list">
        <div v-for="order in workOrders" :key="order.id" class="c-card c-card--flat">
          <div class="c-list__item">
            <div>
              <div class="c-card__label">{{ order.id }}</div>
              <div class="c-card__meta">{{ order.description }}</div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span class="c-badge" :class="priorityBadge(order.priority)">{{ order.priority }}</span>
              <span class="c-badge" :class="statusBadge(order.status)">{{ order.status }}</span>
            </div>
          </div>
          <div class="c-divider"></div>
          <div class="c-list__item" style="align-items:flex-start;">
            <div>
              <div class="c-card__meta">Aircraft</div>
              <div>{{ order.aircraft }}</div>
            </div>
            <div>
              <div class="c-card__meta">Assigned To</div>
              <div>{{ order.assignedTo }}</div>
            </div>
            <div>
              <div class="c-card__meta">Due</div>
              <div>{{ order.dueDate }}</div>
            </div>
            <div>
              <div class="c-card__meta">Est. Hours</div>
              <div>{{ order.estimatedHours }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';

interface Stat {
  label: string;
  value: string;
  meta: string;
  tone?: 'success' | 'warning' | 'critical' | 'info';
}

interface WorkOrder {
  id: string;
  priority: 'High' | 'Critical' | 'Routine';
  status: 'Open' | 'In Progress' | 'Completed';
  aircraft: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  estimatedHours: string;
}

const stats: Stat[] = [
  { label: 'Open Work Orders', value: '2', meta: 'Awaiting completion' },
  { label: 'In Progress', value: '1', meta: 'Active teams', tone: 'info' },
  { label: 'Completed', value: '1', meta: 'Last 7 days', tone: 'success' },
  { label: 'Total Est. Hours', value: '26', meta: 'Current backlog' },
];

const workOrders = computed<WorkOrder[]>(() => [
  {
    id: 'WO-2024-001',
    priority: 'High',
    status: 'In Progress',
    aircraft: 'N123AB • G650',
    description: '100-hour inspection package',
    assignedTo: 'Team A',
    dueDate: '10/14/2024',
    estimatedHours: '14',
  },
  {
    id: 'WO-2024-002',
    priority: 'Critical',
    status: 'Open',
    aircraft: 'N456CD • Global 7500',
    description: 'Hydraulic leak isolation and repair',
    assignedTo: 'Team B',
    dueDate: '10/09/2024',
    estimatedHours: '12',
  },
]);

function badgeClass(tone?: Stat['tone']) {
  switch (tone) {
    case 'success':
      return 'c-badge--success';
    case 'warning':
      return 'c-badge--warning';
    case 'critical':
      return 'c-badge--critical';
    default:
      return 'c-badge--info';
  }
}

function priorityBadge(priority: WorkOrder['priority']) {
  if (priority === 'Critical') return 'c-badge--critical';
  if (priority === 'High') return 'c-badge--warning';
  return 'c-badge--info';
}

function statusBadge(status: WorkOrder['status']) {
  if (status === 'Completed') return 'c-badge--success';
  if (status === 'In Progress') return 'c-badge--info';
  return 'c-badge--warning';
}

// Vue-specific theme detection and application
onMounted(() => {
  // Ensure theme is applied when component mounts
  document.documentElement.setAttribute('data-brand', 'maintenance');
  
  // Listen for theme changes from shell
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-brand') {
        // Force Vue to re-render with new theme
        document.documentElement.setAttribute('data-vue-theme', 'maintenance');
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-brand']
  });
  
  // Cleanup on unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style>
/* Global styles - CSS variables from shell's theme-generated.css are already available */
.c-page {
  background: var(--color-background);
  color: var(--color-text-primary);
  min-height: 100vh;
  padding: var(--spacing-lg);
}

.c-module-header {
  background: linear-gradient(135deg, rgb(var(--color-primary-rgb)) 0%, rgb(var(--color-accent-rgb)) 100%);
  color: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
}

.c-module-eyebrow {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-sm);
}

.c-module-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
}

.c-module-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-top: var(--spacing-sm);
}
</style>
