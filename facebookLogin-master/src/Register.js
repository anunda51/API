import React from 'react'
import FacebookLogin from 'react-facebook-login'
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './App.css'
import axios from 'axios';
import 'bulma/css/bulma.css'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: "Davide Inferno",
            email: "davidinferno@example.com",
            picture: "https://bulma.io/images/placeholders/96x96.png",
            message: "",
            title: "Do you want to login?"
        }
        this.responseFacebook = this.responseFacebook.bind(this)
    }

    responseFacebook(response){
        this.setState({
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
            message: "Login Success!!",
            title: "Congratulation!!"
        })

        axios.post('http://localhost:8080/login', {
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        })
    }

    render(){
        return(
            <div className="App">
                <section class="hero is-dark is-large">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                {this.state.title}
                            </h1>
                            <div>
                                <figure>
                                    <img src={this.state.picture} alt="Not found" />
                                </figure>
                            </div>
                            <div>
                                <p>{this.state.name}</p>
                                <p>{this.state.email}</p>
                            </div>
                            <div className="help is-success">
                                {this.state.message}
                            </div>
                            <br></br>
                            <FacebookLogin
                                appId='1900162333424021'
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                                render={(renderProps) => (
                                    <button onClick={renderProps.onClick}> This is my custom FB button </button>
                                )}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Register