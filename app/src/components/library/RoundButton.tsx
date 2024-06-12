//@ts-nocheck
function RoundButton(props) {
    return <button className={`bg-[#AEC670] hover:bg-[#AEC09A] font-semibold  py-2 px-4 rounded w-auto mt-4 ${props.className}`} type={props.type} onClick={props.onClick}>{props.children || 'Button'}</button>
}

export default RoundButton