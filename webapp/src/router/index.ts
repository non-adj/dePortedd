import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Map from '../views/Map.vue'
import { useHead } from '@unhead/vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash && !to.hash.startsWith('#map')) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'DePortedd | Student Visa Revocation Tracker'
      }
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {
        title: 'Visa Revocation Map | DePortedd'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: 'About | DePortedd'
      }
    },
    {
      path: '/what-is-a-student-visa-revocation',
      name: 'what-is-a-student-visa-revocation',
      component: () => import('../views/WhatIsAStudentVisaRevocation.vue'),
      meta: {
        title: 'What is a Student Visa Revocation | DePortedd'
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportRevocation.vue'),
      meta: {
        title: 'Report a Revocation/Deportation | DePortedd'
      }
    },
    {
      path: '/flyers-and-posters',
      name: 'flyers-and-posters',
      component: () => import('../views/FlyersAndPosters.vue'),
      meta: {
        title: 'Flyers and Posters | DePortedd'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      meta: {
        title: 'Contact | DePortedd'
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/Terms.vue'),
      meta: {
        title: 'Terms of Service | DePortedd'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/Privacy.vue'),
      meta: {
        title: 'Privacy Policy | DePortedd'
      }
    },
    {
      path: '/why-not-foia',
      name: 'why-not-foia',
      component: () => import('../views/WhyNotFOIA.vue'),
      meta: {
        title: 'Why NOT to Submit a FOIA | DePortedd'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue'),
      meta: {
        title: 'Not Found | DePortedd'
      }
    }
  ]
})

// backward compatibility with old url scheme
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    useHead({
      title: to.meta.title
    })
  }
  
  if (to.path === '/' && to.hash) {
    next({ path: '/map', hash: to.hash })
  } else {
    next()
  }
})

export default router
