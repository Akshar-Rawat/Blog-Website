import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-1.5 pl-0.5 text-sm font-medium text-mist'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3.5 py-2.5 rounded-lg bg-surface text-chalk outline-none border border-slate focus:border-cyan focus:ring-1 focus:ring-cyan/30 duration-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option} className="bg-surface text-chalk">
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)