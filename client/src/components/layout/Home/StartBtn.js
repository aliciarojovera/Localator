import './StartBtn.css'
import { Link } from 'react-router-dom'

const StartBtn = () => {
    return (
        <>
        <div class="container">
            <Link to='/inicio-sesion'>
            <div role="button" class="neon">EMPEZAR</div>
            </Link>
            <Link to='/locales'>
            <div role="button" class="flux">LOCALES</div>
            </Link>
        </div>
        </>

    )
}

export default StartBtn