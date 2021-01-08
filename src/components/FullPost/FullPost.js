import React, { Component } from 'react';
import axios from "axios";
import './FullPost.css';

class FullPost extends Component {
    // creating a state to save the single post 
    state ={
        loadedPost : null,
        error : false
        }

    // using the hook to make http call 
    componentDidUpdate(){
        // gettting the psot from the server
        if (this.props.id){
            // to make http call on when there is a loadedpost or loadedpost with a different ID - this removes infinite server calls
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get("https://jsonplaceholder.typicode.com/posts/"+this.props.id)

                // updating the state 
                 .then((response) =>{
                     this.setState({loadedPost : response.data});
                                })
                .catch((error)=>{
                    this.setState({error : true});
                    console.log(error);
                });                
            }
        }
    }

    deletePostHandler = (id)=>{
        axios.delete("https://jsonplaceholder.typicode.com/posts/"+this.props.id)
            .then((response)=>{
                console.log(response);
            })
    }

    render () {
        // default 
        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
        
        // when the id is received , we have not got response from the server which take time .. so we are showing the loading message 
        if (this.props.id){
            post = <p style={{textAlign:"center"}}>Loading....</p>
        };

        // once we get the respose from the server and the state is updated we update the component 
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button on onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            ); 
        }
        return post;
    }
}

export default FullPost;