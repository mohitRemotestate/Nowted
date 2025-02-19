import Docposter from '../../assets/main-frame-doc.svg';

function Default(){

    return(
        <>
            <div className='h-full w-full flex flex-col gap-2.5 text-white justify-center items-center'>
                <div className=''><img src={Docposter} /></div>
                <div className='font-sans font-semibold text-3xl'>Select a note to view</div>
                <div className='w-115 flex-wrap text-center'>Choose a note form the list on the leftt to view its contents, or create a new noe to add to your collection.</div>

            </div>
        </>
    )
}

export default Default;