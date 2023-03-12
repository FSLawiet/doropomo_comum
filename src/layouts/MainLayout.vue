<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const { logout } = useAuthUser();

    const handleLogout = async () => {
      Dialog.create({
        title: 'Logout?',
        message: 'Tem certeza de que deseja sair?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: 'login' });
      });
    };

    return {
      handleLogout,
    };
  },
});
</script>
