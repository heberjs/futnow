//@ts-nocheck
import RoundButton from './library/RoundButton'
import CancelButton from './library/CancelButton'


function Confirm({ message, onAcceptClick, onCancelClick }) {
    return <div className={`fixed top-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70`}>
        <div className='py-16 px-8  flex flex-col items-center justify-center border-2 border-white bg-[#1A2902] animate-jump-in animate-once'>
            <h3 className='text-white'>{message}</h3>
            <div className='flex gap-8 text-black'>
                <CancelButton onClick={onCancelClick}>Cancel</CancelButton>
                <RoundButton onClick={onAcceptClick}>Accept</RoundButton>
            </div>
        </div>
    </div>
}

export default Confirm