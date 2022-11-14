export const menuItems = [
    {
        title: 'HOME',
        url: '/',
    },
    {
        title: 'testing',
        submenu: [
            {
                title: 'public',
                url: '/test/public'
            },
            {
                title: 'protected',
                url: '/test/protected'},
            {
                title: 'admin',
                url: '/test/admin'
            },
        ]
    },
    {
        title: 'USERS',
        submenu: [
            {
                title: 'LOGIN',
                url: '/users/login'
            },
            {
                title: 'REGISTER',
                url: '/users/register'
            },
            {
                title: 'LOGOUT',
                url: '/users/logout'
            }
        ]
    }

]