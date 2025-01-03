import store from '../store';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('../views/Welcome.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: () => import('../views/SignIn.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/forgotpassword/ForgotPassword.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/check-email',
        name: 'ForgotPasswordCheckEmail',
        component: () => import('../views/forgotpassword/ForgotPasswordCheckEmail.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/new-password',
        name: 'CreateNewPassword',
        component: () => import('../views/forgotpassword/CreateNewPassword.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/reset-success',
        name: 'ResetPasswordSuccess',
        component: () => import('../views/forgotpassword/ResetPasswordSuccess.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import('../views/signup/SignUp.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/check-your-email',
        name: 'SignUpCheckEmail',
        component: () => import('../views/signup/SignUpCheckEmail.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/setup-account',
        name: 'SetupAccount',
        component: () => import('../views/signup/SetupAccount.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/registration-success',
        name: 'RegistrationSuccess',
        component: () => import('../views/signup/RegistrationSuccess.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/join-meeting',
        name: 'JoinMeeting',
        component: () => import('../views/JoinMeeting.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/host-meeting',
        name: 'HostMeeting',
        component: () => import('../views/HostMeeting.vue'),
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../views/History.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/history-meeting-detail/:serial',
        name: 'HistoryMeetingDetail',
        component: () => import('../views/HistoryMeetingDetail.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/recordings',
        name: 'Recordings',
        component: () => import('../views/Recordings.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            requireAuth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('accessToken')) {
        store.commit('auth/SET', ['isAuth', true]);
    }

    if (localStorage.getItem('username') && localStorage.getItem('email')) {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');

        store.commit('auth/SET', ['username', username]);
        store.commit('auth/SET', ['email', email]);
    }

    // if (!store.getters['auth/isAuth']) {
    // 	if (to.name !== 'Welcome' && to.name !== 'SignIn' && to.name !== 'SignUp' && to.name !== 'JoinMeeting' && to.name !== 'HostMeeting') {
    // 		next({
    // 			path: '/',
    // 			replace: true
    // 		})
    // 	} else next()
    // } else {
    // 	if ((to.name === 'Welcome' || to.name === 'SignIn' || to.name === 'SignUp')) {
    // 		console.error('masuk if')
    // 		next({
    // 			path: '/home',
    // 			replace: true
    // 		})
    // 	} else {
    // 		next()
    // 	}
    // }
    let auth = store.getters['auth/isAuth'];
    if ((to.name === 'SignIn' || to.name === 'SignUp' || to.name === 'Welcome') && auth) {
        next({ name: 'Home' });
    } else if (to.matched.some((record) => record.meta.requireAuth)) {
        if (!auth) {
            next({
                path: '/sign-in',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
