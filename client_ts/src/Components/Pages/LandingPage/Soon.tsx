import logoNavbar from '../../../assets/Logo/LogoNavbar.png';
import { Link } from 'react-router-dom';
import Button from '../../Common/Button';
import Cursor from './Cursor';
import useAnimation from '../../../Hooks/useAnimation';
import ModelCanvas from './3D/ModelCanvas';

export default function Soon() {
    useAnimation(".animate", "shown");
    return (
        <>
            <div className='hidden md:block fixed w-screen backdrop-blur-[200px] -z-40 h-screen' />
            <div className='fixed top-0 w-full h-2 -z-50 bg-slate-300/20'/>
            <Cursor />
            <header className="sticky top-0 w-full z-40 flex md:flex backdrop-blur-lg  justify-between items-center border-b-2 border-white/10">
                <div className={`p-8 text-sm hidden md:block`}><img className='h-8' src={logoNavbar} alt="" /></div>
                <div className='flex gap-8 p-4 text-light/70 text-xs'>
                    <Link to='/'><div className='hover:text-light transition-colors duration-500'>HOME</div></Link>
                    <Link to='/about'><div className='hover:text-light transition-colors duration-500'>ABOUT US</div></Link>
                </div>
                <div className="flex items-center gap-4 p-4 md:p-8">
                    <Link to='/soon'><Button outline>GO TO APP</Button></Link>
                </div>
            </header>
            <main className="text-light/95">
                <section className={`flex flex-wrap justify-center  py-20 px-12 md:px-40`}>
                    {/* <img src={phone} className='z-10 w-56 md:w-80' alt="" /> */}
                    <ModelCanvas/>
                    <div className="grow lg:grow-0 lg:w-1/2 flex flex-col justify-center">
                        <h1 className='animate left font-black text-6xl md:text-9xl leading-tight'>BUZZUP<span className='accent-gradient background-clip-text'>.</span></h1>
                        <h1 className='animate left delay-1 font-extrabold text-2xl md:text-5xl leading-tight'>Coming <span className='accent-gradient background-clip-text'>Soon.</span></h1>
                        <p className='animate left delay-2 font-light opacity-70 text-sm md:text-base mt-2'>Our website is currently under construction.</p>
                    </div>
                </section>
                <div className='flex mt-8 justify-center p-4 border-t-2 border-white/10 text-light/50 '>BUZZUP © 2023</div>
            </main>
        </>
    )
}