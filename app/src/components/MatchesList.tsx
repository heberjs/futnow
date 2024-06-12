//@ts-nocheck
import { logger } from '../utils'
// import logic from '../logic'
// import { useState, useEffect } from 'react'
import Match from './Match'



function MatchesList({ matches, onEditMatchFormClick, onDeleteMatchClick, onJoinedClick, onUnJoinedClick }) {
    logger.debug('MatchesList -> render')

    const handleOnJoinClick = match => onJoinedClick(match)

    const handleEditMatchClick = match => onEditMatchFormClick(match)

    const handleOnDeleteClick = match => onDeleteMatchClick(match)

    const handleUnJoinedMatch = match => onUnJoinedClick(match)

    return <section className='pt-[90px] pb-[140px] h-full'>

        <div className=' px-8 pt-2 flex flex-col gap-2 lg:max-w-[940px] lg:m-auto'>
            {matches.map(match => <Match key={match.id} item={match} onJoinClick={handleOnJoinClick} onEditMatchClick={handleEditMatchClick} onDeleteMatchClick={handleOnDeleteClick} UnJoinedMatch={handleUnJoinedMatch} />)}
        </div>

    </section>

}

export default MatchesList