//@ts-nocheck
import RoundButton from './RoundButton'

function SubmitButton(props) {
    return <RoundButton classname='bg-[gold]' type='submit'>{props.children || 'Submit'}</RoundButton>
}

export default SubmitButton