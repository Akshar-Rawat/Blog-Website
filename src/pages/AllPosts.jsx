import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full'>
        <section className="py-12 sm:py-16">
            <Container>
                <div className="mb-10">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chalk">
                        All Posts
                    </h1>
                    <div className="hero-underline w-16 mt-3"></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </section>
    </div>
  )
}

export default AllPosts