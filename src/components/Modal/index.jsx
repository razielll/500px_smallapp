import React from 'react';
import './style.css';


export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedText: '',
            originalText: '',
            isLong: false,
            isFullText: false,
        }
    }

    componentDidMount = () => {
        const { selectedPic } = this.props;

        const displayedText = selectedPic.description.length > 30 ? selectedPic.description.substring(0, 30) + '...' : selectedPic.description
        this.setState({ originalText: selectedPic.description, isLong: selectedPic.description.length > 30, displayedText })
    }

    handleReadMore = () => {
        this.setState({ isFullText: !this.state.isFullText })
    }


    closeModal = () => this.props.handleCloseModal();

    toggleText = () => {
        this.setState({ displayedText: this.state.originalText, isFullText: true })
    }

    render() {
        const { selectedPic } = this.props;
        const { isFullText, isLong } = this.state
        return (
            <div className="modal-wrapper" onClick={this.closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{selectedPic.name}</h2>
                    {isLong && !isFullText ?
                        <>
                            <h5>{this.state.displayedText}<span className="read-more" onClick={this.toggleText}>read more...</span></h5>

                        </>
                        :
                        <h5>{this.state.originalText}</h5>
                    }
                    <img src={selectedPic.image_url} alt={selectedPic.name} />
                    <h4>Taken with {selectedPic.camera} {selectedPic.lens}</h4>
                    {selectedPic.editors_choce && <h4>EDITOR'S CHOICE</h4>}
                </div>
            </div>
        )
    }
}
