import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface TemporizadorProps {
    duration: number
    handleTemporizador: () => void
    key: any
    runningTemporizador?: boolean
}

const Temporizador = ({
    duration,
    handleTemporizador,
    runningTemporizador
}: TemporizadorProps) => {

    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                duration={duration}
                size={120}
                isPlaying={runningTemporizador}
                colors="#bce596"
                onComplete={() => handleTemporizador()}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}

export default Temporizador