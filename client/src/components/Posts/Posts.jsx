import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch,useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, []);
    if(!posts) return 'No Posts';
    
  return (
    <div className="Posts">
      {loading?"Fetching Posts...":
        posts.map((post, id) => {
            return <Post data={post} key={id}/>
        })}
    </div>
  )
}

export default Posts;