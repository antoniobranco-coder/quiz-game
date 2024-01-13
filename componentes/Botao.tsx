import styles from '../styles/Botao.module.css'

interface ButtonProps {
    value?: string
    onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    children: any
}

const Button = ({
    value,
    onClickFunction,
    disabled,
    children
}: ButtonProps) => {
    return (
        <button
            value={value}
            onClick={onClickFunction}
            disabled={disabled}
            className={styles.botao}
        >
            {children}
        </button >
    )

}

export default Button