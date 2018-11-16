import request from './request'

export const initMenu = (router, store,next) => {
    if (store.state.routes && store.state.routes.length > 2) {
        router.options.routes = store.state.routes;
        next();
        return;
    }
    request({
        url: '/menu/menuList',
        method: 'get'
    }).then(result => {
        if (result.data.resultCode == 200) {
            var fmtRoutes = formatRoutes(result.data.data);
            for (let el of fmtRoutes) {
                router.options.routes.push(el)
            }
            router.addRoutes(fmtRoutes);
            store.commit('initMenu', router.options.routes);
            next({path: '/'} );//跳转到首页，
        } else {
            that.$message.error('获取菜单失败！');
        }
    })
}

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            // meta,
            iconCls,
            leaf,
            menuShow,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            component(resolve) {
                require(['../components/' + component + '.vue'], resolve);
            },
            name: name,
            iconCls: iconCls,
            // meta: meta,
            leaf: leaf,
            menuShow: menuShow,
            children: children
        };
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}