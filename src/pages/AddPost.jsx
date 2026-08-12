import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 sm:py-16'>
        <Container>
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold tracking-tight text-chalk">
                    New Post
                </h1>
                <div className="hero-underline w-16 mt-3"></div>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost