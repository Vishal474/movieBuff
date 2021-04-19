import React, { Component } from 'react';
import Modal from 'react-modal';
import { Paper } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

const customStyles = {
    content: {
        inset: '40px 22%',
        overflowX: 'hidden',
        overflowY: 'scroll',
        backgroundColor: '#1b1a17',
        width:'50%'
    }
}
class MovieModal extends Component{
    render() {
        const {movie, showModal,detailImageSize, baseImageUrl, onClose } = this.props;
        return(
            <Modal 
                isOpen={showModal}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel={movie.full_name}
                onRequestClose = {() => { onClose() }}
                centered
            >
                <IconButton className='close-image' onClick={() => { onClose() }}> 
                    <i className='material-icons'>clear</i>
                </IconButton>
                
               <Paper   className='detail-movies-container' 
                        key={movie.id}>
                    <img className='detail-image'
                        alt=''
                        src={`${baseImageUrl+detailImageSize+movie.image}`} />
                    <div style={{margin:'7px',display:'flex',justifyContent: 'space-between'}} >
                        <span className='detail-movie-rating'>
                            {movie.rating}
                        </span>
                        <span className='detail-movie-date'>{movie.release_date}</span>
                    </div>
                    <div className='detail-movie-name'>
                    {movie.full_name}
                    </div>
                    <p className='detail-movie-description'>
                        {movie.description}
                    </p>
                    <div className='detail-movie-genres'>
                        <span>{movie.genres}</span>
                    </div>
                </Paper>    
            </Modal>
        )
    }
}

export default MovieModal;