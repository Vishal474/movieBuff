import axios from '../services/axios.config';
import store from '../store/store'

export const getConfigurations =  () => {
    return async dispatch => {
        await axios.get('configuration').then(res => {
            const imageConfig = res.data.images;
            
            const configurations = {
            imageConfig : res.data.images,
            baseImageUrl : imageConfig.base_url,
            gridImageSize : imageConfig.poster_sizes[2],
            detailImageSize : imageConfig.poster_sizes[4]
        }
        dispatch({
            type: 'GET_MOVIES',
            payload: {configurations:configurations}
            })
        })
    }
}

export const getGenres = () => {
    return async dispatch => {
        await axios.get('genre/movie/list').then(res => {
        const {data : {genres} } = res
        dispatch(
            {
                type: 'GET_MOVIES',
                payload: {genres:genres}
            })
        
            getMoviesList();
        })
    }
}

const transformMovieData = (data) => {
    const state = store.getState()
    const genres = state.MoviesReducer.genres

    let movies = []

        data.results.map(m => {
            let movie ={}
            movie.name = m.original_title.length > 18 ? m.original_title.slice(0,18) + ' ..' : m.original_title
            movie.full_name = m.original_title 
            movie.image = m.poster_path
            movie.release_date = m.release_date
            movie.rating = m.vote_average
            movie.description = m.overview 

            const movieGenres = m.genre_ids.map(gen => {
                let genre;
                genres.forEach(gen2 => {
                    if(gen === gen2.id){
                        genre = gen2
                    }})
                return genre && genre.name 
            })

            movie.genres = '' 
            movieGenres.forEach((genre,i) => {
                    movie.genres += movieGenres.length - 1 !== i ?  genre + ', ' : genre 
                })
            
            movies.push(movie)
        })
    
    return movies
}

export const getMoviesList  = (pageNum = 1) => {
    
    return async dispatch => {
        await axios.get('movie/popular',{
            params: {
                page:pageNum
            }
        }).then(res => {
            const data = res.data

            const movies = transformMovieData(data)

            dispatch({
                type: 'GET_MOVIES',
                payload: {movies:movies,pageNum:data.page,
                totalPages:data.total_pages,totalResults:data.total_results}
            })
            }).catch(error => console.log(error))
        }
    }

export const searchMovies = (keyword,pageNum = 1) => {
    return async dispatch => {
        axios.get('search/movie',{params:{
            query: keyword,
            page: pageNum }
        }).then(res => {
            
            const data = res.data
            const movies = transformMovieData(data)
            dispatch({
                type: 'GET_MOVIES',
                payload: {movies:movies,pageNum:data.page,
                totalPages:data.total_pages,totalResults:data.total_results,
                search:keyword,selectedGenre:-1}
            })
        })
        
    }
    }

export const handleEmptySearch = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_MOVIES',
            payload: {search:''}
        })
    }
}

export const filterMovies = (genre,pageNum = 1) => {
    return async dispatch => {
        axios.get('discover/movie',{params:{
            with_genres: genre,
            page: pageNum }
        }).then(res => {
            const data = res.data
            const movies = transformMovieData(data)
            dispatch({
                type: 'GET_MOVIES',
                payload: {movies:movies,pageNum:data.page,
                totalPages:data.total_pages,totalResults:data.total_results,
                selectedGenre:genre}
            })
        })
        
    }
}
