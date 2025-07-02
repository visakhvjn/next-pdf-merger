type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export default function Button({ children, onClick, disabled, isLoading }: ButtonProps) {
    return (
        <button disabled={disabled || isLoading} className="group border bg-white text-black hover:bg-black hover:text-white px-8 py-2 rounded cursor-pointer text-2xl hover:shadow-md flex items-center justify-center min-w-[120px]" onClick={onClick}>
            {isLoading && <div className="flex gap-2 items-center">
                <span className="w-6 h-6 border-4 border-t-transparent border-black border-solid rounded-full animate-spin
                  group-hover:border-white group-hover:border-t-transparent
                "></span>
                {'Merging'}
                </div>}
            {!isLoading && children}
        </button>
    )
}