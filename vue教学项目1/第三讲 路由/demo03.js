var routes = [
	{
		path: '/',
		component: {
			template: '<div><h1>首页</h1></div>'
		}
	},
	{
		path: '/about',
		component: {
			template: '<div><h1>关于我们</h1></div>'
		}
	},
	{
		//path:'/路径/:参数名'
		path: '/type/:id',
		component: {
			template: `<div>
				<h1>编号已经收到：{{$route.params.id}} 
				{{$route.query.search}} 可以从后头访问数据</h1>
				<p>$route.path:{{$route.path}}</p>
				<p>$route.params:{{$route.params}}</p>
				<p>$route.query:{{$route.query}}</p>
				<p>$route.router:{{$route.router}}</p>
				<p>$route.name:{{$route.name}}</p>
			</div>`
		}
	}
]

var router = new VueRouter({
	routes: routes
})

new Vue({
	el: '#demo03',
	router: router
})