import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`} className="block group">
        <div className='bg-surface border border-slate rounded-xl overflow-hidden card-hover'>
            <div className='aspect-[16/10] overflow-hidden'>
                {featuredImage && (
                  <img
                    src={appwriteService.getFileView(featuredImage)}
                    alt={title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                )}
            </div>
            <div className='p-4'>
                <h2 className='font-display text-lg font-semibold text-chalk leading-snug tracking-tight group-hover:text-cyan transition-colors duration-200'>
                    {title}
                </h2>
            </div>
        </div>
    </Link>
  )
}


export default PostCard