import React from 'react';
import './style.css';


export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedText: '',
            originalText: '',
            isLong: false,
        }
    }

    componentDidMount = () => {
        const { selectedPic } = this.props;
        let displayedText = '';
        if (selectedPic.description.length > 30) {
            displayedText = selectedPic.description.substring(0, 27) + '...';
            this.setState({ originalText: selectedPic.description, isLong: true, displayedText })
        } else {
            displayedText = selectedPic.description;
            this.setState({ originalText: selectedPic.description, isLong: false, displayedText })
        }

    };

    // call back to function from App.js
    closeModal = () => this.props.handleCloseModal();

    toggleText = () => this.setState({ displayedText: this.state.originalText, isLong: false });

    render() {
        const { selectedPic } = this.props;
        const { isLong } = this.state
        return (
            <div className="modal-wrapper" onClick={this.closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{selectedPic.name}</h2>
                    {isLong ?
                        <>
                            <h5>{this.state.displayedText}<span className="read-more" onClick={this.toggleText}>read more...</span></h5>

                        </>
                        :
                        <h5 className="typo">{this.state.originalText}</h5>
                    }
                    <img src={selectedPic.image_url} alt={selectedPic.name} />
                    <div>
                        <h4 className="typo">Taken with {selectedPic.camera} {selectedPic.lens}</h4>
                    </div>
                    {selectedPic.editors_choce && <h4>EDITOR'S CHOICE</h4>}
                </div>
            </div>
        )
    }
}
