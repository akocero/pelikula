const apikey = process.env.VUE_APP_TMDB_API_KEY;

const request = {
	apikey,
	search: `search/movie?api_key=${apikey}&query=`,
	youtube: "https://www.youtube.com/embed/",
	image_path: {
		original: "https://image.tmdb.org/t/p/original",
		credits: {
			w138: "https://image.tmdb.org/t/p/w138_and_h175_face",
		},
		poster: {
			w92: "https://image.tmdb.org/t/p/w92",
			w150: "https://image.tmdb.org/t/p/w150_and_h225_bestv2",
			w220: "https://image.tmdb.org/t/p/w220_and_h330_face",
			w300: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
			w440: "https://image.tmdb.org/t/p/w440_and_h660_face",
			w600: "https://image.tmdb.org/t/p/w600_and_h900_bestv2",
		},
		backdrop: {
			w780: "https://image.tmdb.org/t/p/w780",
			w1920: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
			w1280: "https://image.tmdb.org/t/p/w1280",
		},
		logo: {
			w500: "https://image.tmdb.org/t/p/w500/",
			w300: "https://image.tmdb.org/t/p/w300/",
		},
	},
	trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`,
	topPeople: `https://api.themoviedb.org/3/person/popular?api_key=${apikey}`,
	topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`,
	topAction: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`,
	topPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`,
	// topPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1&region=ph` with region
};

export const image_path = {
	original: "https://image.tmdb.org/t/p/original",
	credits: {
		w138: "https://image.tmdb.org/t/p/w138_and_h175_face",
	},
	poster: {
		w45: "https://image.tmdb.org/t/p/w45",
		w92: "https://image.tmdb.org/t/p/w92",
		w150: "https://image.tmdb.org/t/p/w150_and_h225_bestv2",
		w220: "https://image.tmdb.org/t/p/w220_and_h330_face",
		w440: "https://image.tmdb.org/t/p/w440_and_h660_face",
		w300: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
		w600: "https://image.tmdb.org/t/p/w600_and_h900_bestv2",
	},
	backdrop: {
		w300: "https://image.tmdb.org/t/p/w300",
		w780: "https://image.tmdb.org/t/p/w780",
		w1920: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
		w1280: "https://image.tmdb.org/t/p/w1280",
	},
};

// "backdrop_sizes": [
//   "w300",
//   "w780",
//   "w1280",
//   "original"
// ],
// "logo_sizes": [
//   "w45",
//   "w92",
//   "w154",
//   "w185",
//   "w300",
//   "w500",
//   "original"
// ],
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
// "profile_sizes": [
//   "w45",
//   "w185",
//   "h632",
//   "original"
// ],
// "still_sizes": [
//   "w92",
//   "w185",
//   "w300",
//   "original"
// ]

export default request;
