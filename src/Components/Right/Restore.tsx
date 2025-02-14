import React from 'react';
import resicon from '../../assets/restore-icon.svg';

function Restore(){

    return(
        <>
            <div className='h-full w-full flex flex-col gap-2.5 text-white justify-center items-center'>
                <div className=''><img src={resicon} /></div>
                <div className='font-sans font-semibold text-3xl'>Restore “Reflection on the Month of June”</div>
                <div className='w-115 flex-wrap text-base text-center'>Don't want to lose this note? It's not too late! Just click the 'Restore' button and it will be added back to your list. It's that simple.</div>
                <button type='button' className='bg-[#312EB5] w-28 h-10.5 rounded-xl' > Restore</button>
            </div>
        </>
    )
}

export default Restore;