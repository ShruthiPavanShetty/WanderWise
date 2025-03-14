import React from 'react'
import { ShimmerThumbnail,ShimmerBadge,ShimmerTitle, ShimmerPostList} from "react-shimmer-effects";

const TripInfoShimmer = () => {
    const cards = new Array(3);
  return (
    <div>
        <ShimmerThumbnail height={350} rounded />
        <div className='my-5 flex flex-col gap-2'>
            <ShimmerTitle line={1} variant="primary" height={20} className="w-52 h-5" />
            <div className='flex gap-5'>
                <ShimmerBadge width={100} height={50} />
                <ShimmerBadge width={100} height={50} />
                <ShimmerBadge width={100} height={50} />
            </div>
        </div>
        <div>
            <ShimmerTitle line={1} variant="primary" className="w-52 my-5" />
            <ShimmerPostList postStyle="STYLE_THREE" col={3} row={1} gap={30} />     
        </div>
    </div>
  )
}

export default TripInfoShimmer;
