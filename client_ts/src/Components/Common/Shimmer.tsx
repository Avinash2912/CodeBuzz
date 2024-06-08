type propType = {shimmerType:("card" | "profile" | "buzzcomment" | "replycomment"),className?:string};
export default function Shimmer({shimmerType,className}:propType)
{
    if(shimmerType == 'profile')
    {
        return(
            <div className='mid-part flex flex-col overflow-auto'>
                <div className='card shimmer'>
                    <div className='pattern h-48 rounded-xl'></div>
                    <div className='flex justify-between items-center'>
                        <div className='object-cover w-32 h-32 border-8 border-dark relative -mt-16 ml-4 bg-accent rounded-full mr-4'/> 
                    </div>
                    <div className=''>
                        <div className=''>
                            <h1 className='font-bold text-2xl'>Loading</h1>
                            <h2 className='text-light/50'>Loading</h2>
                        </div>
                    </div>
                    <div className='flex mt-4 flex-wrap'>
                        <div className='card grow flex flex-col justify-center items-center'>
                            -
                        </div>
                        <div className='card grow flex flex-col justify-center items-center'>
                            -
                        </div>
                        <div className='card grow flex flex-col justify-center items-center'>
                            -
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(shimmerType == "card")
    {
        return(
            <div className={`card shimmer ${className}`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='h-full'>
                            <div className='h-14 w-14 rounded-full bg-light/10'/>
                        </div>
                        <div className='h-full w-full flex flex-col gap-4'>
                            <div className='h-2 w-1/2 rounded-full bg-light/10'/>
                            <div className='h-2 w-1/4 rounded-full bg-light/10'/>
                        </div>
                    </div>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                </div>
            </div>
        )
    }
    else if(shimmerType == "buzzcomment")
    {
        return(
            <div className='mt-4'>
                <div className='shimmer flex flex-col gap-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='h-full'>
                            <div className='h-7 w-7 rounded-full bg-light/10'/>
                        </div>
                        <div className='h-full w-full flex flex-col gap-4'>
                            <div className='h-2 w-1/2 rounded-full bg-light/10'/>
                            <div className='h-2 w-1/4 rounded-full bg-light/10'/>
                        </div>
                    </div>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className='mt-4'>
                <div className='shimmer flex flex-col gap-4'>
                    <div className='flex gap-4 items-center'>
                        <span className="material-icons -scale-x-100 opacity-50">
                        keyboard_return
                        </span>
                        <div className='h-full'>
                            <div className='h-7 w-7 rounded-full bg-light/10'/>
                        </div>
                        <div className='h-full w-full flex flex-col gap-4'>
                            <div className='h-2 w-1/2 rounded-full bg-light/10'/>
                            <div className='h-2 w-1/4 rounded-full bg-light/10'/>
                        </div>
                    </div>
                    <div className="ml-8 flex flex-col gap-4">
                        <div className='h-2 rounded-full bg-light/10'/>
                        <div className='h-2 rounded-full bg-light/10'/>
                    </div>
                </div>
            </div>
        )
    }
}