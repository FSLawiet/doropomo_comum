<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title v-if="getIsPlaying" class="text-center">
          <q-avatar>
            <img src="icons/favicon-32x32.png" />
          </q-avatar>
          {{ getCurrentTimer }} - {{ convertToTime(getClockCount) }}
        </q-toolbar-title>
        <q-toolbar-title v-else class="text-center">
          <q-avatar>
            <img src="icons/favicon-32x32.png" />
          </q-avatar>
          Doropomo
        </q-toolbar-title>
        <q-btn
          flat
          :color="$q.dark.isActive ? 'white' : 'dark'"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="$q.dark.toggle()"
        />
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
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useAuthUser } from 'src/composables/UseAuthUser';
import { useApi } from 'src/composables/UseApi';
import { Dialog, Dark, LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';

import { useDoropomoStore } from 'stores/doropomoStore';
import { storeToRefs } from 'pinia';

const store = useDoropomoStore();

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const { logout } = useAuthUser();
    const { getTheme } = useApi();

    const leftDrawerOpen = ref(false);

    onMounted(() => {
      getTheme();
      store.resetTimer();
      if (
        LocalStorage.getItem('darkmode') ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        LocalStorage.set('darkmode', true);
        Dark.set(true);
      } else if (
        !LocalStorage.getItem('darkmode') ||
        (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        LocalStorage.set('darkmode', false);
        Dark.set(false);
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if (event.matches) {
            LocalStorage.set('darkmode', true);
            Dark.set(true);
          } else {
            LocalStorage.set('darkmode', false);
            Dark.set(false);
          }
        });
    });

    onUnmounted(() => {
      store.resetTimer();
    });

    const handleLogout = async () => {
      Dialog.create({
        title: 'Logout?',
        message: 'Tem certeza de que deseja sair?',
        ok: {
          flat: true,
          color: 'primary',
        },
        cancel: {
          flat: true,
          color: 'primary',
        },
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
        label: 'Produtos',
        icon: 'shopping_bag',
        separator: false,
        routeName: 'produtos',
      },
      {
        label: 'Categorias',
        icon: 'category',
        separator: true,
        routeName: 'categorias',
      },
      {
        label: 'Configurações',
        icon: 'settings',
        separaor: false,
        routeName: 'config',
      },
    ];

    const { getIsPlaying, getCurrentTimer, getClockCount } = storeToRefs(store);

    const convertToTime = (count: number) => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;

      let minutesString = minutes < 10 ? '0' + minutes : minutes;
      let secondsString = seconds < 10 ? '0' + seconds : seconds;

      return `${minutesString}:${secondsString}`;
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuList,
      handleLogout,
      miniState: ref(true),
      getIsPlaying,
      getCurrentTimer,
      getClockCount,
      convertToTime,
    };
  },
});
</script>
