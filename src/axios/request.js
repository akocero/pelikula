const apikey = process.env.VUE_APP_TMDB_API_KEY;

const request = {
    apikey,
    search: `search/movie?api_key=${apikey}&query=`,
    youtube: 'https://www.youtube.com/embed/',
    imagePaths: {
        w138: 'https://image.tmdb.org/t/p/w138_and_h175_face',
    },
    imagePath: 'https://image.tmdb.org/t/p/w220_and_h330_face',
    imagePathSm: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
    imagePathBD: 'https://image.tmdb.org/t/p/w780',
    imagePathMd: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces',
    imagePathOrig: 'https://image.tmdb.org/t/p/original',
    trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`,
    topAction: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`,
    topPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`,
    // topPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1&region=ph` with region
}



export default request;