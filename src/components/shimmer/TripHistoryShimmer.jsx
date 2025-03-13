import React from 'react'
import {ShimmerTitle,ShimmerBadge,ShimmerPostList} from "react-shimmer-effects";

const TripHistoryShimmer = () => {
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10 pb-96'>
        <div className='flex justify-between'>
            <ShimmerTitle line={1} variant="primary" className="w-52 my-5" />
            <ShimmerBadge width={100} height={50} className='pt-48' />
        </div>
        <ShimmerPostList postStyle="STYLE_THREE" col={3} row={2} gap={30} />
    </div>
  )
}

export default TripHistoryShimmer