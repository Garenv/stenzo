import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';
import './Upload.css';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            prevImgURL: '',
            imgPrev: false,
            success: false
        };
        this.imageChange = this.imageChange.bind(this);
    }

    imagePreview = (newPostImageBool) => {
        this.setState({imgPrev: newPostImageBool});

        if(this.state.selectedFile === null) {
            alert("can't preview a picture on this because it's empty");
            this.setState({imgPrev: false});
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

        this.setState({success: true});
    }

    render() {
        return (
            <div>
                <div className="inputWrapper">
                    <input
                        id="new_post_image"
                        className="button is-success is-outlined"
                        type="file"
                        style={{display: 'none'}}
                        onChange={this.imageChange}
                        name="image"
                        accept="image/*"
                    />

                    <label className="button is-success is-outlined" htmlFor="new_post_image">Upload</label>

                    <br/>

                    <button
                        id="preview"
                        type="button"
                        onClick={() => this.imagePreview(true)}
                        className="button is-link is-outlined"
                        data-toggle="modal"
                        data-target="#myModal"
                    >
                        Preview Image
                    </button>
                </div>

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

                                <button
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.closeModal}
                                >
                                    Submit</button>
                            </div>
                        </div>
                    </div>
                    : null}
                {this.state.success ? <div className="alert alert-success">
                    <strong>Chosen image is successful!  Now click Preview and make sure that's the one you want to upload!</strong>
                </div> : null}
            </div>
        );
    }
}

export default Upload;