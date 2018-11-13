import request from './request'

export const initMenu = (router, store) => {
    if (store.state.routes.length > 1) {
        return;
    }
    request({
        url: '/menu/menuList',
        method: 'get'
    }).then(result => {
        if (result.data.resultCode == 200) {
            var fmtRoutes = formatRoutes(result.data.data);
            router.addRoutes(fmtRoutes);
            store.commit('initMenu', fmtRoutes);
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
            children: children
        };
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}