import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'loja/:id',
        name: 'product_public',
        component: () => import('pages/product/Public.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/SignupPage.vue'),
      },
      {
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/EmailConfirmation.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPassword.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'perfil',
        name: 'perfil',
        component: () => import('pages/PerfilPage.vue'),
      },
      {
        path: 'atividades',
        name: 'atividades',
        component: () => import('pages/TasksPage.vue'),
      },
      {
        path: 'doropomo',
        name: 'doropomo',
        component: () => import('pages/DoropomoPage.vue'),
      },
      {
        path: 'produtos',
        name: 'produtos',
        component: () => import('pages/product/List.vue'),
      },
      {
        path: 'produtos_form/:id?',
        name: 'produtos_form',
        component: () => import('pages/product/Form.vue'),
      },
      {
        path: 'categorias',
        name: 'categorias',
        component: () => import('pages/category/List.vue'),
      },
      {
        path: 'categorias_form/:id?',
        name: 'categorias_form',
        component: () => import('pages/category/Form.vue'),
      },
      {
        path: 'recover_password',
        name: 'recover_password',
        component: () => import('pages/RecoverPassword.vue'),
      },
      {
        path: 'config/:id?',
        name: 'config',
        component: () => import('pages/config/Form.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
