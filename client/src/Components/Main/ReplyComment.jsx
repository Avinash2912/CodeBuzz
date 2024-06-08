import User from './User';

export default function ReplyComment(props)
{

    if(!props.data)
    {
        
    }

    return(
        <div className='flex items-center'>
            <span className="material-icons -scale-x-100 opacity-50">
            keyboard_return
            </span>
            <div className='ml-8'>
                <User small className='mt-4'></User>
                <p className='text-light/75 text-sm mt-2'>This is a reply</p>
                <p className='text-xs text-light/50'>26/12/23</p>
            </div>
        </div>
    )
}