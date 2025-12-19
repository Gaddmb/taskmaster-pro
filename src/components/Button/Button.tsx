import "./Button.css"

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean
}

export function Button({ children, variant = 'primary', onClick, disabled = false }: ButtonProps) {
    return (
        <button className={`button button--${variant}`}
            onClick={onClick}
            disabled={disabled}>{children}</button>)
}