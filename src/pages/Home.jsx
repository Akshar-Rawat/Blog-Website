import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full">
                {/* Hero Section */}
                <section className="py-24 sm:py-32">
                    <Container>
                        <div className="max-w-2xl">
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-chalk leading-[1.1]">
                                Thoughts in code<span className="cursor-blink">|</span>
                            </h1>
                            <div className="hero-underline w-24 mt-4"></div>
                            <p className="mt-6 text-lg text-mist leading-relaxed max-w-lg">
                                A quiet space for long-form writing about software, craft, and the things that matter between the keystrokes.
                            </p>
                            {!authStatus && (
                                <div className="mt-8 flex gap-3">
                                    <Link 
                                        to="/login"
                                        className="px-5 py-2.5 rounded-lg font-medium text-sm bg-cyan text-ink hover:bg-cyan/85 hover:shadow-[0_0_16px_rgba(88,166,255,0.25)] transition-all duration-200"
                                    >
                                        Sign in to read
                                    </Link>
                                    <Link 
                                        to="/signup"
                                        className="px-5 py-2.5 rounded-lg font-medium text-sm bg-transparent text-chalk border border-slate hover:border-mist transition-all duration-200"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Container>
                </section>
            </div>
        )
    }
    return (
        <div className='w-full'>
            {/* Hero Section */}
            <section className="py-16 sm:py-20">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-chalk leading-[1.1]">
                            Thoughts in code<span className="cursor-blink">|</span>
                        </h1>
                        <div className="hero-underline w-24 mt-4"></div>
                        <p className="mt-4 text-mist text-lg">
                            Recent posts from the workshop.
                        </p>
                    </div>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="pb-16">
                <Container>
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

export default Home