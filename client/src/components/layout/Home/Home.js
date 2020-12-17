import HomeHeader from './HomeHeader'
import MainTitle from './MainTitle'
import SubTitle from './SubTitle'
import StartBtn from './StartBtn'
import './Home.css'

const Home = () => {
    const myClick = () => {
        console.log('holahola')
    }
    return (
        <>
            <div className="mainTitle">
                <MainTitle/>
            </div>
            <div className="subTitle">
                <SubTitle text="Reserva ya en tus locales de ensayo"/>
            </div>
            <div onClick={() => myClick()} className="StartBtn">
                <StartBtn/>
            </div>
            <div className="homeHeaderMain">
                <HomeHeader/>
            </div>
        </>
    )
}

export default Home