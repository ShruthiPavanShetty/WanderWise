import React from 'react'
import {ShimmerTitle,ShimmerContentBlock} from "react-shimmer-effects";

const PlacesToVisitShimmer = () => {
  return (
    <div className='my-5'>
            <ShimmerTitle line={1} variant="primary" className="w-52 my-2" id="ShimmerTitle" />
            <ShimmerTitle line={3} gap={10} variant="primary" className="w-60" id="ShimmerTitleWithContent" />
            <div className='flex flex-col gap-5'>
                <ShimmerContentBlock
                    id="ShimmerContentBlock"
                    title
                    text
                    cta
                    thumbnailWidth={300}
                    thumbnailHeight={300}
                />
                 <ShimmerContentBlock
                    id="ShimmerContentBlock"
                    title
                    text
                    cta
                    thumbnailWidth={300}
                    thumbnailHeight={300}
                />
                 <ShimmerContentBlock
                    id="ShimmerContentBlock"
                    title
                    text
                    cta
                    thumbnailWidth={300}
                    thumbnailHeight={300}
                />
                
            </div>
        </div>
  )
}

export default PlacesToVisitShimmer;