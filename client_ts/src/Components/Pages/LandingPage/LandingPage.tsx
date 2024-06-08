import AudioVisualizer from './AudioVisualizer';
import logoNavbar from '../../../assets/Logo/LogoNavbar.png';
// import phone from '../../../assets/Phone.png';
import buzzImage1 from '../../../assets/Buzz1.png';
import buzzImage2 from '../../../assets/Buzz2.png';
import { Link } from 'react-router-dom';
import Button from '../../Common/Button';
import Cursor from './Cursor';
import LandingPageCard from './LandingPageCard';
import useAnimation from '../../../Hooks/useAnimation';
import { useRef } from 'react';
import User from '../../Common/User';
import ModelCanvas from './3D/ModelCanvas';

export default function LandingPage()
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
                <section className={`flex flex-wrap justify-center  py-24 px-12 md:px-40`}>
                    <ModelCanvas className=''/>
                    {/* <img src={phone} className='z-10 w-56 md:w-80' alt="" /> */}
                    <div className="grow lg:grow-0 lg:w-1/2 flex flex-col justify-center">
                        <h1 className='animate left font-black text-6xl md:text-9xl leading-tight'>BUZZUP<span className='accent-gradient background-clip-text'>.</span></h1>
                        <h1 className='animate left delay-1 font-extrabold text-2xl md:text-5xl leading-tight'>It's an <span className='accent-gradient background-clip-text'>Audio Thing.</span></h1>
                        <p className='animate left delay-2 font-light opacity-70 text-sm md:text-base mt-2'>Combine images and audio for a vibrant, new social experience!</p>
                    </div>
                </section>
                <section className={`flex flex-wrap justify-center py-40`}>
                    <h1 className='animate left font-black text-5xl md:text-9xl leading-tight tracking-tighter'><span className='accent-gradient background-clip-text'>Unclear?</span></h1>
                </section>
                <section className={`flex flex-wrap justify-center py-40 px-12 md:px-40`}>
                    <h1 className='animate left font-black text-3xl md:text-7xl leading-tight tracking-tighter'>Buzzup is a <span className='accent-gradient background-clip-text'>Social Media Platform</span></h1>
                </section>
                 <section className={`flex flex-wrap justify-center gap-16 py-10 px-12 md:px-40`}>
                    <div className="grow lg:grow-0 lg:w-1/2 flex flex-col justify-center">
                        <h1 className='animate left font-black lg:pr-32 text-3xl md:text-5xl leading-tight'>Which is Based on <span className='accent-gradient background-clip-text'>Broadcast of Audio.</span></h1>
                        <p className='animate left delay-1 font-light opacity-70 text-sm md:text-base mt-4'>Images worth more than a thousand words, sounds that evoke a thousand feelings. On BuzzUp, sharing transcends the ordinary.</p>
                    </div>
                    <div className="animate right delay-3 grow p-0 md:p-8 flex justify-center items-center">
                        <AudioVisualizer hueRotateFactor={0} randomFactor={150} timePeriodFactor={100} count={20} />
                    </div>
                </section>
                <section className={`flex flex-wrap justify-center gap-16 py-20 px-12 md:px-40`}>
                    <h1 className='animate left font-black text-4xl md:text-5xl leading-tight'>Our <span className='accent-gradient background-clip-text'>Features</span></h1>
                    <div className="mt-0 flex justify-center items-center w-full flex-wrap gap-x-4">
                        <LandingPageCard className='animate left delay-1' />
                        <LandingPageCard className='animate left delay-2' />
                        <LandingPageCard className='animate left delay-3' />
                        <LandingPageCard className='animate left delay-4' />
                    </div>
                </section>
                <section ref={(element)=>{scrollers.current && (scrollers.current[0] = element)}} className='py-20 relative justify-center'>
                    <div className='absolute h-64 md:h-96 flex justify-center gap-8' style={{transform:"translateX(calc((var(--scroll)) * 10% - 10%))",}}>
                        <div className='h-full w-48 md:w-80 overflow-hidden'>
                            <img className='h-full max-w-fit' style={{transform:"translateX(calc((var(--scroll)) * -15% - 8%))",}} src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className='h-full w-48 md:w-80 overflow-hidden'>
                            <img className='h-full max-w-fit' style={{transform:"translateX(calc((var(--scroll)) * -15% - 8%))",}} src="https://images.pexels.com/photos/730981/pexels-photo-730981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className='h-full w-48 md:w-80 overflow-hidden'>
                            <img className='h-full max-w-fit' style={{transform:"translateX(calc((var(--scroll)) * -15% - 8%))",}} src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className='h-full w-48 md:w-80 overflow-hidden'>
                            <img className='h-full max-w-fit' style={{transform:"translateX(calc((var(--scroll)) * -15% - 8%))",}}  src="https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                        <div className='h-full w-48 md:w-80 overflow-hidden'>
                            <img className='h-full max-w-fit' style={{transform:"translateX(calc((var(--scroll)) * -15% - 8%))",}} src="https://images.pexels.com/photos/16732791/pexels-photo-16732791/free-photo-of-city-nature-sky-bird.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        </div>
                    </div>
                    <div className="h-64 md:h-96"/>
                </section>
                <section className='px-12 md:px-40 py-40 flex gap-8 justify-center'>
                    <div className='hidden md:flex flex-col w-1/2 gap-8 z-20'>
                        <img src={buzzImage1} className='w-full' alt="" />
                        <img src={buzzImage2} className='w-full' alt="" />
                    </div>
                    <div className="sticky md:w-1/2 h-fit top-1/2">
                        <h1 className='animate left font-black text-4xl md:text-5xl leading-tight drop-shadow-md'>Link Up and <span className='accent-gradient background-clip-text'>Tune In!</span></h1>
                        <p className='animate left delay-1 opacity-70 font-normal text-sm md:text-base mt-4 drop-shadow-md'>Paint your world in pixels, narrate it in waves.</p>
                        <p className='animate left delay-1 opacity-70 font-normal text-sm md:text-base drop-shadow-md'>With us your photos and audio clips harmonize to craft unforgettable tales.</p>
                    </div>
                </section>
                <section className='px-12 md:px-40 py-40 flex gap-8 justify-center'>
                    <div className="sticky md:w-1/2 h-1/2 top-1/2">
                        <h1 className='animate right font-black text-3xl md:text-5xl leading-tight'>Share <span className='accent-gradient background-clip-text'>Your Voice.</span></h1>
                        <h1 className='animate right delay-1 font-black text-3xl md:text-5xl leading-tight'>And <span className='accent-gradient background-clip-text'>Your Memories.</span></h1>
                        <p className='animate right delay-2 opacity-70 text-sm md:text-base mt-4'>Here, memories find their voice, and stories come alive through shared moments.</p>
                    </div>
                    <div ref={(element)=>{scrollers.current && (scrollers.current[1] = element)}} className='hidden md:flex flex-col w-1/2 gap-8 z-20'>
                        <div className='overflow-hidden relative w-full h-96'>
                            <div className="bg-gradient-to-t from-black/50 to-transparent w-full absolute z-10 bottom-0 left-0 p-4">
                                <User static small data={{pfp:"https://images.pexels.com/photos/1864641/pexels-photo-1864641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",name:"Lilly",username:"lillydoe"}}/>
                                <p className='text-xs opacity-70 mt-4'>Just performed at my college farewell.</p>
                            </div>
                            <img style={{transform:"translateY(calc(-40% + 30% * var(--scroll)))"}} 
                            src="https://images.pexels.com/photos/1864641/pexels-photo-1864641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='rounded-lg w-full' alt="" />
                        </div>
                        <div className='overflow-hidden relative w-full h-96'>
                            <div className="bg-gradient-to-t from-black/50 to-transparent w-full absolute z-10 bottom-0 left-0 p-4">
                                <User static small data={{pfp:"https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",name:"Samuel",username:"isagiyoichi1123"}}/>
                                <p className='text-xs opacity-70 mt-4'>Ayo Blue Lock's op slaps.</p>
                            </div>
                            <img style={{transform:"translateY(calc(-50% + 30% * var(--scroll)))"}} 
                            src="https://images.pexels.com/photos/1311619/pexels-photo-1311619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='rounded-lg w-full' alt="" />
                        </div>
                        <div className='overflow-hidden relative w-full h-56'>
                            <div className="bg-gradient-to-t from-black/50 to-transparent w-full absolute z-10 bottom-0 left-0 p-4">
                                <User static small data={{name:"Kushagra",username:"kushgoyal"}}/>
                                <p className='text-xs opacity-70 mt-4'>Ye doggy mujhe park ke bench pe mila.</p>
                                <p className='text-xs opacity-70'>Ghar le jaa rha hu isse.</p>
                            </div>
                            <img style={{transform:"translateY(calc(-55% + 30% * var(--scroll)))"}} 
                            src="https://images.pexels.com/photos/17827084/pexels-photo-17827084/free-photo-of-close-up-of-a-sleeping-puppy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='rounded-lg w-full' alt="" />
                        </div>
                    </div>
                </section>
                <section className={`flex flex-wrap justify-center gap-16 py-48 px-12 md:px-40`}>
                    <div className="grow lg:grow-0 lg:w-1/2 flex flex-col justify-center">
                        <h1 className='animate left font-black text-3xl md:text-5xl leading-tight'>Let's <span className='accent-gradient background-clip-text'>Get Started.</span></h1>
                        <p className='animate left delay-2 opacity-70 text-sm md:text-base mt-4'>Let's start the journey on BuzzUp, where your stories come to life through captivating visuals and resonating audio!</p>
                    </div>
                    <div className='grow sticky flex flex-col justify-center gap-4'>
                        <Link to="/soon"><Button big className='animate left delay-3 w-full'>SIGN UP</Button></Link>
                        <Link to="/soon"><Button big outline className='animate left delay-4 w-full'>SIGN IN</Button></Link>
                    </div>
                </section>
                <div className='flex mt-8 justify-center p-4 border-t-2 border-white/10 text-light/50 '>BUZZUP © 2023</div>
            </main>
        </>
    )
}