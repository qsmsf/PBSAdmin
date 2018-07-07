import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import record from './views/nav1/Record.vue'
import report from './views/nav2/Report.vue'
import Login from './views/Login.vue'

let routes = [
    
    //{ path: '/main', component: Main },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '勘验记录管理',
        iconCls: 'el-icon-document',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/record', component: record, name: '记录管理' }
        ]
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '报表管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/report', component: report, name: '记录报表' }
        ]
    },    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;