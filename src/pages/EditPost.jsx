import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-12 sm:py-16'>
        <Container>
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold tracking-tight text-chalk">
                    Edit Post
                </h1>
                <div className="hero-underline w-16 mt-3"></div>
            </div>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="loading-spinner"></div>
    </div>
  )
}

export default EditPost