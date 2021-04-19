import {TextField, Paper,Select, MenuItem} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovies, filterMovies,handleEmptySearch } from '../services/moviesHelper';

const mapStateToProps = state => {
    return({
       genres: state.MoviesReducer.genres,
       pageNum: state.MoviesReducer.pageNum,
       selectedGenre: state.MoviesReducer.selectedGenre  })
   }
   
const mapDispatchToProps = {searchMovies, filterMovies,handleEmptySearch}
   
class FilterBox extends Component {

    render() {
        const { genres } = this.props;
        return (
            <div style={{
                justifyContent: 'center',
                display: 'flex',
                padding: '20px'}}>
            <Paper style={{width:'30%',display:'flex'}}>
                <TextField 
                    placeholder='Search'
                    style={{width:'70%',paddingLeft:'15px'}} 
                    onChange={(event) => {
                        const keyword = event.target.value;
                        this.props.searchMovies(keyword)
                        }}>    
                </TextField>
                <hr></hr>
                <Select 
                    value={this.props.selectedGenre}
                    style={{width:'30%'}}
                    onChange={(event) => {
                        const genre = event.target.value;
                        if(genre === '') this.props.handleEmptySearch()
                        this.props.filterMovies(genre)
                    }}
                    >
                    <MenuItem value={-1} disabled>Genre</MenuItem>
                    {genres.map(genre => {
                        return (<MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)
                        })
                    }
                </Select>
            </Paper>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (FilterBox);