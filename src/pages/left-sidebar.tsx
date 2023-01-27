interface LinkProps{
    text: string,
    imageSrc: string,
}

function Link(props: LinkProps){
    return(
        <div className={'p-[5px] box-border flex items-center flex-col w-full h-[70px] cursor-pointer hover:bg-darkgray1'}>
            <img className={'w-[35px] h-[35px]'} src={props.imageSrc} alt={props.text}/>
            <p className={'text-center m-0 h-[25px]'}>{props.text}</p>
        </div>
    )
}

export function LeftSidebar(){
    return(
        <nav className={'bg-lightgray1 h-screen fixed w-[100px] border-r-2 border-darkgray flex flex-col items-center justify-center gap-[10px] max-[600px]:hidden'}>
            <Link text={'Home'} imageSrc={'/images/homeIcon.png'}/>
            <Link text={'Calendar'} imageSrc={'/images/calendarIcon.png'}/>
            <Link text={'Meetings'} imageSrc={'/images/meetingsIcon.png'}/>
            <Link text={'Settings'} imageSrc={'/images/settingsIcon.png'}/>
        </nav>
    )
}