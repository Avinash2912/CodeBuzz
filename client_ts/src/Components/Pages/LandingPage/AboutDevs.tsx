import logoNavbar from '../../../assets/Logo/LogoNavbar.png';
import { Link } from 'react-router-dom';
import Button from '../../Common/Button';
import Cursor from './Cursor';
import useAnimation from '../../../Hooks/useAnimation';
import { useRef } from 'react';
import ModelCanvas from './3D/ModelCanvas';

export default function AboutDevs()
{
    const scrollers = useRef<(HTMLElement | null)[]>([]);
    useAnimation(".animate", "shown",scrollers.current,false);

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
                        <h1 className='animate left font-black text-3xl md:text-7xl leading-tight'>ABOUT <span className='accent-gradient background-clip-text'>US.</span></h1>
                        <p className='animate left delay-2 font-light opacity-70 text-base md:text-xl'>The Developers</p>
                    </div>
                </section>
                <section className='flex flex-wrap justify-center px-4 md:px-40 py-20'>
                    <img className='w-full lg:max-w-md object-cover z-10' src="https://alphacupcake10.github.io/Portfolio/Resouces/Me.png" alt="" /> 
                    <div className='lg:w-1/2 md:p-8 flex flex-col justify-center'>
                        <h1 className='animate left font-black text-3xl md:text-6xl leading-tight'>Lakshman Sundar</h1>
                        <h1 className='animate left delay-1 font-black text-xl md:text-3xl leading-tight'><span className='accent-gradient background-clip-text'>FRONT-END DEVELOPER</span></h1>
                        <p className='animate left delay-2 opacity-70 text-sm md:text-base mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod, dolorum distinctio fugit atque eligendi quos omnis corrupti autem pariatur, ipsam officia praesentium, commodi inventore.</p>
                        <div className="animate left delay-3 h-20 md:h-24 w-full mt-4 flex gap-4">
                            <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="https://alphacupcake10.github.io/Portfolio/"><span className="material-icons md:text-4xl">language</span></a>
                            <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="https://www.instagram.com/alphacupcake10/"><span className="material-icons md:text-4xl">palette</span></a>
                            <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="https://github.com/AlphaCupcake10/"><span className="material-icons md:text-4xl">code</span></a>
                        </div>
                    </div>
                </section>
                <section className='flex flex-wrap-reverse justify-center px-4 md:px-40 py-20'>
                    <div className='lg:w-1/2 md:p-8 flex flex-col justify-center'>
                        <h1 className='animate right font-black text-3xl md:text-6xl leading-tight'>Kushagra Goyal</h1>
                        <h1 className='animate right delay-1 font-black text-xl md:text-3xl leading-tight'><span className='accent-gradient background-clip-text'>FULLSTACK DEVELOPER</span></h1>
                        <p className='animate right delay-2 opacity-70 text-sm md:text-base mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quod, dolorum distinctio fugit atque eligendi quos omnis corrupti autem pariatur, ipsam officia praesentium, commodi inventore.</p>
                        <div className="animate right delay-3 h-20 md:h-24 w-full mt-4 flex gap-4">
                            <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="https://kushagra-goyal-14.github.io/"><span className="material-icons md:text-4xl">language</span></a>
                            {/* <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="https://www.instagram.com/alphacupcake10/"><span className="material-icons md:text-4xl">palette</span></a> */}
                            <a className='bg-dark/30 border-2 rounded-lg border-light/10 hover:border-accent/30 grow hover:grow-[4] transition-all duration-500 active:scale-90 flex justify-center items-center w-20 md:w-24' target='_blank' href="github.com/kushagra-goyal-14/"><span className="material-icons md:text-4xl">code</span></a>
                        </div>
                    </div>
                    <img className='w-full lg:max-w-md object-cover z-10' src="https://kushagra-goyal-14.github.io/img/profile.jpg" alt="" />
                </section>
                <div className='flex mt-8 justify-center p-4 border-t-2 border-white/10 text-light/50 '>BUZZUP © 2023</div>
            </main>
        </>
    )
}