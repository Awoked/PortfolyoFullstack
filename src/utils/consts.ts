const RootUrls = {
    Dashboard: {
        title: "Dashboard",
        url: "/dashboard",
        SubPages:{
            Sections: {
                title: "Sections",
                url: "/dashboard/sections"
            }
        }
    },
    
    Home: {
        title: "Home",
        url: "/"
    },
}

const Pages = {
    Dashboard: [
        {
            title: "Sections",
            url: `${RootUrls.Dashboard.url}/sections`,
        },
    ],
    Client: [
        {
            title: "Home",
            url: RootUrls.Home.url
        },
    ]
}


export {
    RootUrls,
    Pages
}