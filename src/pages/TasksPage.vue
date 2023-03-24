<template>
  <q-page padding>
    <div class="text-h6">Tasks</div>

    <q-btn
      label="Adicionar Nova Tarefa"
      color="primary"
      glossy
      @click="handleNewTask"
    />
    <q-list bordered separator v-if="tasks.length > 0">
      <q-item clickable v-ripple v-for="(task, index) in tasks" :key="index">
        <q-item-section>
          <q-item-label>{{ task.desc }}</q-item-label>
          <q-item-label caption>{{ task.tipo }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TasksPage',
  setup() {
    const tasks = ref<{ desc: string; tipo: string }[]>([]);

    const handleNewTask = () => {
      const newTask = {
        desc: 'Arrumar as coisas',
        tipo: 'Rotina',
      };

      tasks.value.push(newTask);
    };

    return { tasks, handleNewTask };
  },
});
</script>
