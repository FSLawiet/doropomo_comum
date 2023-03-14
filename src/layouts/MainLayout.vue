<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="icons/favicon-32x32.png" />
          </q-avatar>
          Doropomo
        </q-toolbar-title>
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
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :to="{ name: menuItem.routeName }" exact v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="icons/favicon-32x32.png" />
          </q-avatar>
          <div>Comum</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const { logout } = useAuthUser();

    const leftDrawerOpen = ref(false);

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

    const menuList = [
      {
        label: 'Página Inicial',
        icon: 'home',
        separator: false,
        routeName: 'perfil',
      },
      {
        label: 'Categorias',
        icon: 'category',
        separator: true,
        routeName: 'categorias',
      },
    ];

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuList,
      handleLogout,
      miniState: ref(true),
    };
  },
});
</script>
