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

export default router;
