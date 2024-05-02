import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import AboutView from '../views/about-view.vue'
import ConnectParticleBackgroundView from '../views/connect-particle-background-view.vue'
import AnimatedMousePointerView from '../views/animated-mouse-pointer-view.vue'
import SolarSystemView from '../views/solar-system-view.vue'
import gravityCursorView from '@/views/gravity-cursor-view.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'landing-page', component: HomeView },
        { path: '/home', name: 'home', component: HomeView },
        { path: '/about', name: 'about', component: AboutView },
        {
            path: '/particles',
            name: 'connect-particle-background',
            component: ConnectParticleBackgroundView
        },
        {
            path: '/pointer',
            name: 'animated-mouse-pointer',
            component: AnimatedMousePointerView
        },
        {
            path: '/solar-system',
            name: 'solar-system',
            component: SolarSystemView
        },
        {
            path: '/gravity-cursor',
            name: 'gravity-cursor',
            component: gravityCursorView
        }
    ]
})

export default router
