import icon from '../../../assets/Logo/LogoMonoDark.png'
export default function LandingPageCard(props:{className?:string}) 
{
    return (
        <div className={`${props.className} relative mt-10 flex w-56 md:w-64 flex-col rounded-xl card bg-dark/30 bg-clip-border shadow-md`}>
            <div className="relative -mx-2 -mt-10 h-32 sm:h-40 rounded-xl accent-gradient flex items-center justify-center">
                <img src={icon} className='w-8 sm:w-16' alt="" />
            </div>
            <div className='mt-4'>
                <h1 className='text-lg font-bold'>Feature</h1>
                <h1 className='text-sm opacity-70'>Feature Description</h1>
                <p className='hidden sm:inline mt-4 opacity-70 text-sm'>Feature Details.</p>
            </div>
        </div>
    );
}