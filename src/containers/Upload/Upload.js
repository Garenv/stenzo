import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import firebase from 'firebase'
import axios from '../../axios-chosen';
import './Upload.css';
import {storage} from '../../config/Fire';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            displayEmail: '',
            previewImgURL: '',
            imgPrev: false,
            success: false
        };
        this.imageUpload = this.imageUpload.bind(this);
        this.submitImage = this.submitImage.bind(this);
    }

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
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                previewImgURL: reader.result
            });
        };

        if (file) reader.readAsDataURL(file); // Allows user to preview image uploaded

        this.setState(() => ({file}));
        this.setState({success: true});
    }

    submitImage() {
        // console.log("clicked");
        const {file} = this.state;
        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });

        let user = firebase.auth().currentUser;
        let userEmail = "";

        if(user !== null) {
            user.providerData.forEach(function (profile) {
                userEmail = profile.email;
            })
        }

        const userInfo = {
            userEmail,
            file
        }

        axios.post(`/userInfo.json`, userInfo)
            .then((response) => console.log("Here's the response " + response))
            .catch(error => console.log("Here's the error " + error));

    };

    render() {
        return (
            <div>
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
                        type="submit"
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
