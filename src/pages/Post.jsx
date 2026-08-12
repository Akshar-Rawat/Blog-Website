import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 sm:py-16">
            <Container>
                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="max-w-4xl mx-auto mb-8 relative rounded-xl overflow-hidden border border-slate">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover max-h-[480px]"
                        />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="success" className="shadow-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="danger" className="shadow-lg" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Title */}
                <div className="max-w-3xl mx-auto mb-8">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-chalk tracking-tight leading-tight">
                        {post.title}
                    </h1>
                    <div className="hero-underline w-16 mt-4"></div>
                </div>

                {/* Content */}
                <div className="prose-bytelog">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="loading-spinner"></div>
        </div>
    );
}
