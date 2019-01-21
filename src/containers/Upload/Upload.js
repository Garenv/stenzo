import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import firebase from 'firebase'
import axios from '../../axios-chosen';
import './Upload.css';
import Stack from '../../containers/Stack/Stack';
import {storage} from '../../config/Fire';
import {Link} from 'react-router-dom';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            displayEmail: '',
            previewImgURL: '',
            imgPrev: false,
            success: false,
            progress: 0,
            redirectToStackAfterPhotoSubmit: false,
            url: '',
            picture: []
        };
        this.imageUpload = this.imageUpload.bind(this);
        this.submitImageAndRedirect = this.submitImageAndRedirect.bind(this);
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

    submitImageAndRedirect() {
        const {file} = this.state;
        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress function
                // Math to convert progress to percentage
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log("Here's the progress " + progress + "%"); // Output will be in %
                this.setState({progress: progress});
            },
            (error) => {
                // Error function
                console.log(error);
            },
            () => {
                // Complete function
                storage.ref('images').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });

        let user = firebase.auth().currentUser; // grab user that's currently logged on
        let userEmail = "";

        if (user !== null) {
            user.providerData.forEach(function (profile) {
                userEmail = profile.email;
            })
        }

        const userInfo = {userEmail, file};

        // Redirect to the stack upon photo submission
        this.setState({redirectToStackAfterPhotoSubmit: true});

        // Post user information to the DB.
        axios.post(`/userInfo.json`, userInfo)
            .then((response) => console.log("Here's the response " + response))
            .catch(error => console.log("Here's the error " + error));
    };

    render() {
        const redirectToStackAfterPhotoSubmit = this.state.redirectToStackAfterPhotoSubmit;
        const url = this.state.url;

        if (redirectToStackAfterPhotoSubmit) {
            return (
                <Stack
                    imagesOnStack={url || 'http://via.placeholder.com/400x300'}
                    alt="Uploaded Images"
                    height="300"
                    Width="400"
                />
            );
        }

        return (
            <div>
                {this.state.success ? <div className="alert alert-success">
                    <strong>Chosen image is successful!
                        Now click Preview and make sure that's the one you want to upload!</strong>
                </div> : null}

                {/* Progress bar illustrating successful upload to DB */}
                <progress value={this.state.progress} max="100"/>

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
                                    &times;
                                </button>
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

                                <Link to={{
                                    pathname: '/Deck'
                                }}>
                                    <button
                                        type="submit"
                                        className="btn btn-default"
                                        data-dismiss="modal"
                                        onClick={this.submitImageAndRedirect}
                                        name={"post_image_submit"}
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>

                            {/*/\/\/\/\ End Modal /\/\/\/\/\*/}

                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default Upload;
