export const menuItems = [
    {
        title: 'HOME',
        url: '/',
    },
    // {
    //     title: 'testing',
    //     submenu: [
    //         {
    //             title: 'public',
    //             url: '/test/public'
    //         },
    //         {
    //             title: 'protected',
    //             url: '/test/protected',
    //         },
    //         {
    //             title: 'admin',
    //             url: '/test/admin',
    //             role: 'admin'
    //         },
    //     ]
    // },
    // {
    //     title: 'USERS',
    //     role: 'admin',
    //     submenu: [
    //         {
    //             title: 'LOGIN',
    //             url: '/users/login'
    //         },
    //         {
    //             title: 'REGISTER',
    //             url: '/users/register'
    //         },
    //         {
    //             title: 'LOGOUT',
    //             url: '/users/logout'
    //         }
    //     ]
    // },
    {
        title: 'Items',
        role: 'Internal',
        submenu: [
            {
                title: 'All Items',
                url: '/items',
            },
            {
                title: 'Add Item(s)',
                url: '/items/new',
            },
        ]
    },
    {
        title: 'Administration',
        role: 'admin',
        submenu: [
            {
                title: 'FMV Lookup',
                role: 'admin',
                submenu: [
                    {
                        title: 'All Items',
                        url: '/lookup',
                    },
                    {
                        title: 'Add Item',
                        url: '/lookup/new',
                    },
                ]
            },
            {
                title: 'Facilities',
                role: 'admin',
                submenu: [
                    {
                        title: 'All Facilities',
                        url: '/facility',
                    },
                    {
                        title: 'Add Facility',
                        url: '/facility/new',
                    },
                ]
            },
            {
                title: 'Destinations',
                role: 'admin',
                submenu: [
                    {
                        title: 'All Destinations',
                        url: '/destination',
                    },
                    {
                        title: 'Add Destination',
                        url: '/destination/new',
                    },
                ]
            },
        ]
    },

]