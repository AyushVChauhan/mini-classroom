const paths = {
    landing: {
        path: '',
        getHref: () => '/',
    },
    auth: {
        login: { path: 'login', getHref: () => '/login' },
        register: { path: 'register', getHref: () => '/register' },
    },
    teacher: {
        path: 'teacher',
        dashboard: { path: '', getHref: () => '/teacher' },
    },
    student: {
        path: 'student',
        dashboard: { path: '', getHref: () => '/student' },
    },
};
export default paths;
