import React, { Component } from 'react';
import { Grid,Container, Paper, IconButton } from '@material-ui/core';
import FilterBox from './filterbox';
import { connect } from 'react-redux';
import { getMoviesList, getConfigurations,getGenres, filterMovies, searchMovies } from '../services/moviesHelper'
import MovieModal from './movieModal';

const mapStateToProps = state => {
 return({
    movies: state.MoviesReducer.movies,
    genres: state.MoviesReducer.genres,
    pageNum: state.MoviesReducer.pageNum,
    configurations : state.MoviesReducer.configurations,
    selectedGenre: state.MoviesReducer.selectedGenre,
    search : state.MoviesReducer.search  })
}

const mapDispatchToProps = {getMoviesList, getConfigurations,getGenres, filterMovies, searchMovies}

class HomePage extends Component{

    state = {
        showModal: false,
        movieDetails: {}
    }

    componentDidMount = () => {
        //  call base functions on application load to instanciate initial load data
        this.props.getConfigurations();
        this.props.getGenres();
        this.props.getMoviesList();
    }

    onModalClose = () => {
        this.setState({showModal:false, movieDetails:{}})
    }

    render () {
        
        const {movies, search, selectedGenre, pageNum} = this.props;
        const {baseImageUrl,gridImageSize,detailImageSize} = this.props.configurations;

        return (
            <Container className='Application-container'>
                {this.state.showModal && 
                <MovieModal movie={this.state.movieDetails}
                            showModal={this.state.showModal}
                            baseImageUrl={baseImageUrl}
                            detailImageSize={detailImageSize}
                            onClose={this.onModalClose}
                            />}
                <FilterBox></FilterBox>
                <Grid container justify='center'>
                { movies && movies.map(movie => {
                    return (
                            <Paper style={{
                                        margin:'10px',
                                        width:'175px'}} 
                                        className='grid-movies-container' 
                                        // Open details on click 
                                        onClick={() => {
                                            this.setState({showModal:true,movieDetails:movie})
                                        }}
                                        key={movie.id}>
                                <img className='grid-image'
                                    alt=''
                                    src={`${baseImageUrl+gridImageSize+movie.image}`} />
                                <div style={{margin:'7px',display:'flex'}} >
                                    <span className='grid-movie-rating'>
                                        {movie.rating}
                                    </span>
                                    <span className='grid-movie-date'>{movie.release_date}</span>
                                </div>
                                <div className='grid-movie-name'>
                                {movie.name}
                                </div>
                                <div className='grid-movie-genres'>
                                    <span>{movie.genres.length > 22 ? movie.genres.slice(0,22) + ' ..' : movie.genres}</span>
                                </div>
                        </Paper>
                    )
                })}
                </Grid>
                <div className='movieListPagination'>
                    <IconButton onClick={() => {
                        if(search.length > 0){
                            this.props.searchMovies(search,pageNum-1)
                        }
                        else if(selectedGenre && selectedGenre !== -1){
                            this.props.filterMovies(selectedGenre,pageNum-1)
                        }
                        else{
                            this.props.getMoviesList(pageNum-1)
                            }
                        }}>
                        <i className='material-icons'>chevron_left</i>
                    </IconButton>
                    <span className='pageNum'>
                        {pageNum}
                    </span>
                    <IconButton onClick={() => {
                        if(search.length > 0){
                            this.props.searchMovies(search,pageNum+1)
                        }
                        else if(selectedGenre && selectedGenre !== -1){
                            this.props.filterMovies(selectedGenre,pageNum+1)
                        }
                        else{
                            this.props.getMoviesList(pageNum+1)
                            }
                        }}>
                        <i className='material-icons'>chevron_right</i>
                    </IconButton>
                </div>
            </Container>
        )
    }
} 

export default 
connect(mapStateToProps,mapDispatchToProps)(HomePage);