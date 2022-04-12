import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
	let user = projectAuth.currentUser;
	if (!user) {
		next({ name: "Auth" });
	} else {
		next();
	}
};

const noAuthRequire = (to, from, next) => {
	let user = projectAuth.currentUser;
	if (!user) {
		next();
	} else {
		next({ name: "forum" });
	}
};

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/home/Home.vue"),
		meta: {
			title: "Home Page - Example App",
			metaTags: [
				{
					name: "description",
					content: "The home page of our example app.",
				},
				{
					property: "og:description",
					content: "The home page of our example app.",
				},
			],
		},
	},
	{
		path: "/browse_movies",
		name: "browse_movies",
		component: () => import("@/views/browse_movies/BrowseMovies.vue"),
	},
	{
		path: "/auth",
		name: "auth",
		component: () => import("@/views/auth/Auth.vue"),
		beforeEnter: noAuthRequire,
	},
	{
		path: "/movie/:id",
		name: "movie",
		component: () => import("@/views/movie/MovieDetails.vue"),
	},
	{
		path: "/test",
		name: "test",
		component: () => import("@/views/Test.vue"),
	},
	{
		path: "/forum",
		name: "forum",
		component: () => import("@/views/forum/ForumHome.vue"),
		beforeEnter: requireAuth,
	},
	{
		path: "/person/:id",
		name: "person",
		component: () => import("@/views/person/PersonDetails.vue"),
	},
	{
		path: "/genre/:id",
		name: "genre",
		component: () => import("@/views/genre/GenrePage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
const generateProperTitle = (name) => {
	name = name.replace("_", " ");

	return name.charAt(0).toUpperCase() + name.slice(1);
};
router.beforeEach((to, from, next) => {
	console.log(to.name);
	document.title = `${process.env.VUE_APP_NAME} - ${generateProperTitle(
		to.name
	)}`;
	next();
});

export default router;
