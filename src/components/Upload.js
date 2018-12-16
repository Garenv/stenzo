import React, { Component } from 'react';
import $ from 'jquery';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            prevImgURL: '',
            imgPrev: false
        };
        this.imageChange = this.imageChange.bind(this);
    }

    imagePreview = (newPostImageBool) => {
        this.setState({imgPrev: newPostImageBool});

        if(this.state.selectedFile === null) {
            alert("can't click on this cuz it's empty");
            return null;
        }
    };

    closeModal = () => {
        this.setState({imgPrev: false});
    };

    imageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                prevImgURL: reader.result
            });
        };
        if(file) reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <input
                    id="new_post_image"
                    type="file"
                    onChange={this.imageChange}
                    name="image"
                    accept="image/*"
                />

                <button
                    id="filled"
                    type="button"
                    onClick={() => this.imagePreview(true)}
                    className="btn btn-info btn-lg"
                    data-toggle="modal"
                    data-target="#myModal"
                >
                    Preview Image
                </button>

                {this.state.imgPrev ?
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="text-center">Do you want to upload this photo?</h1>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={this.closeModal}
                                >
                                    &times;</button>

                            </div>
                            <div className="modal-body">
                                <img className="img-responsive" src={this.state.prevImgURL}/>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.closeModal}
                                >
                                    Close</button>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default Upload;