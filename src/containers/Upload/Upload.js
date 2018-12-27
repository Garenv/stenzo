import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import firebase from 'firebase';
import axios from '../../axios-chosen';
import './Upload.css';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            previewImgURL: '',
            imgPrev: false,
            success: false,
            image: null
        };
        this.imageUpload = this.imageUpload.bind(this);
    }

    displayName = () => {
        let user = firebase.auth().currentUser;
        let userEmail = " ";

        if(user !== null) {
            user.providerData.forEach(function(profile) {
                console.log(userEmail);
                userEmail = profile.email;
            });
        }

        let userInfo = {
            userEmail
        };

        axios.post('/chosen.json', userInfo)
            .then(response => console.log(response))
            .catch(error => console.log(error));

        return(
            <div>
                <p>Welcome {userEmail}</p>
            </div>
        );
    };

    imagePreview = (newPostImageBool) => {
        this.setState({imgPrev: newPostImageBool});

        if (this.state.selectedFile === null) {
            alert("can't preview a picture on this because it's empty");
            this.setState({imgPrev: false});
        }
    };

    closeModal = () => {
        this.setState({imgPrev: false});
    };

    imageUpload(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                previewImgURL: reader.result
            });
            // console.log("Here's value => " + this.state.previewImgURL);
        };
        if (file) reader.readAsDataURL(file); // Allows user to preview image uploaded
        this.setState({success: true});
    }

    submitImage() {


    }

    render() {
        return (
            <div>
                {this.displayName()}
                <form method="post"
                      encType="multipart/form-data">
                    <div className="inputWrapper">
                        <input
                            id="new_post_image"
                            name="post_image"
                            className="button is-success is-outlined"
                            type="file"
                            style={{display: 'none'}}
                            onChange={this.imageUpload}
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

                </form>

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
                                <img className="img-responsive" src={this.state.previewImgURL}/>
                            </div>

                            {/*\/\/\/\/\/ Modal \/\/\/\/\/*/}

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.closeModal}
                                >
                                    Close
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-default"
                                    data-dismiss="modal"
                                    onClick={this.submitImage}
                                    name={"post_image_submit"}
                                >
                                    Submit
                                </button>

                            </div>

                            {/*/\/\/\/\ End Modal /\/\/\/\/\*/}
                        </div>
                    </div>
                    : null}
                {this.state.success ? <div className="alert alert-success">
                    <strong>Chosen image is successful!
                        Now click Preview and make sure that's the one you want to upload!</strong>
                </div> : null}
            </div>
        );
    }
}

export default Upload;