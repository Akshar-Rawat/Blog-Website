import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1.5 pl-0.5 text-sm font-medium text-mist' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3.5 py-2.5 rounded-lg bg-surface text-chalk outline-none border border-slate focus:border-cyan focus:ring-1 focus:ring-cyan/30 duration-200 w-full placeholder:text-mist/50 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input