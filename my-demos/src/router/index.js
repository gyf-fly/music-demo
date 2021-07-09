import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes:[
        
        
        {
            path:"/discovery",
            name:"/discovery",
            component:()=>
                import ("@/components/Body/components/discovery/index.vue")
        },
        {
            path:"/mvs",
            name:"/mvs",
            component:()=>
                import ("@/components/Body/components/mvs/index.vue")
        },
        {
            path:"/playlists",
            name:"/playlists",
            component:()=>
                import ("@/components/Body/components/playlists/index.vue")
        },
        {
            path:"/songs",
            name:"/songs",
            component:()=>
                import ("@/components/Body/components/songs/index.vue")
        },
        {
            path:"/toplaylist",
            name:"/toplaylist",
            component:()=>
                import ("@/components/Body/components/toPlaylist/index.vue")
        },
        {
            path:"/searchlist",
            name:"/searchlist",
            component:()=>
                import ("@/components/Body/components/search/index.vue")
        },
        {
            path: '*',
            redirect: "/discovery"
        },
    ]
})
export default router