import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import post from '../../components/Post/Post';

class Blog extends Component {
//  create a state property to get data 
    state = {
     posts:[],
     selectedPostId : null
    }

    componentDidMount(){
            // getting mock json repsonse from a server 
        axios.get("https://jsonplaceholder.typicode.com/posts")
        // storing the response and setting the data in the state property 
             .then((response) => {
                //  slice the repsose to get only 4 in the initial call - pagination 
                 const posts = response.data.slice(0,4);
                //  update each post to include additional custom content 
                 const updatePosts = posts.map( post =>{
                  return {
                        ...post ,
                        author : "Prashant"
                    }   
                 });
                 this.setState({posts: updatePosts});
            });

    }

    postSelectedHandler = (id) =>{
        this.setState({selectedPostId : id});
    }

    render () {
        // creating a const to get the data to render using the map fucntion 
        const posts = this.state.posts.map((post) =>{   
        return (<Post 
        key={post.id} 
        title={post.title} 
        author={post.author}
        clicked={() =>{this.postSelectedHandler(post.id)}}
        />);
        }) 

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;