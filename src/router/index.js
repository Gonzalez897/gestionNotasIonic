import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import RegistroUsuario from '../views/RegistroUsuario.vue'
import RegistroDocente from '../views/RegistroDocente.vue'
import RegistroEstudiante from '../views/RegistroEstudiante.vue'
import LoginView from '../views/LoginView.vue'
import { Storage } from "@ionic/storage";
import IngresoNotas from '../views/IngresoNotas.vue'

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginView,
        beforeEnter: async(to, from, next) => {

            let res = await sessionActiva();

            if (res) {
                next('/tabs/tab1')
            } else {
                next()
            }

        }
    },
    {
        path: '/registro',
        component: RegistroUsuario,
        beforeEnter: async(to, from, next) => {

            let res = await sessionActiva();

            if (res) {
                next('/tabs/tab1')
            } else {
                next()
            }

        }
    },
    {
        path: '/tabs/',
        component: TabsPage,
        children: [{
                path: '',
                redirect: '/tabs/tab1'
            },
            {
                path: 'tab1',
                component: () =>
                    import ('@/views/Tab3Page.vue'),
                beforeEnter: async(to, from, next) => {

                    let res = await sessionActiva();

                    if (res) {
                        next()
                    } else {
                        next('/')
                    }

                }
            },
            {
                path: 'tab2',
                component: RegistroDocente,
                beforeEnter: async(to, from, next) => {

                    let res = await sessionActiva();

                    if (res) {
                        next()
                    } else {
                        next('/')
                    }

                }
            },
            {
                path: 'tab3',
                component: RegistroEstudiante,
                beforeEnter: async(to, from, next) => {

                    let res = await sessionActiva();

                    if (res) {
                        next()
                    } else {
                        next('/')
                    }

                }
            },

        ]
    }
]

async function sessionActiva() {

    let storage = new Storage();

    await storage.create();

    let usuario = await storage.get('user');

    return (usuario) ? true : false;

}

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes
})

export default router