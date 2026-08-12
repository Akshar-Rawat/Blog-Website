import React from "react";

export default function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    ...props
}) {
    const base = "px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus-ring cursor-pointer";

    const variants = {
        primary: "bg-cyan text-ink hover:bg-cyan/85 hover:shadow-[0_0_16px_rgba(88,166,255,0.25)]",
        ghost: "bg-transparent text-chalk border border-slate hover:border-mist hover:text-white",
        danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25",
        success: "bg-success/15 text-success border border-success/30 hover:bg-success/25",
    };

    return (
        <button
            type={type}
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
