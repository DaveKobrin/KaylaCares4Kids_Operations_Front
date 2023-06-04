import { PATH_STRINGS } from "./constants"

export const menuItems = [
    {
        title: 'HOME',
        url: PATH_STRINGS.home,
    },
]

export const menuItemsOps = [
    {
        title: 'HOME',
        url: PATH_STRINGS.home,
    },
    {
        title: 'Items',
        role: 'Internal',
        submenu: [
            {
                title: 'All Items',
                url: PATH_STRINGS.ops_items,
            },
            {
                title: 'Add Item(s)',
                url: `${PATH_STRINGS.ops_items}/new`,
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
                        url: PATH_STRINGS.ops_lookups,
                    },
                    {
                        title: 'Add Item',
                        url: `${PATH_STRINGS.ops_lookups}/new`,
                    },
                ]
            },
            {
                title: 'Facilities',
                role: 'admin',
                submenu: [
                    {
                        title: 'All Facilities',
                        url: PATH_STRINGS.ops_facilities,
                    },
                    {
                        title: 'Add Facility',
                        url: `${PATH_STRINGS.ops_facilities}/new`,
                    },
                ]
            },
            {
                title: 'Destinations',
                role: 'admin',
                submenu: [
                    {
                        title: 'All Destinations',
                        url: PATH_STRINGS.ops_destinations,
                    },
                    {
                        title: 'Add Destination',
                        url: `${PATH_STRINGS.ops_destinations}/new`,
                    },
                ]
            },
        ]
    },

]