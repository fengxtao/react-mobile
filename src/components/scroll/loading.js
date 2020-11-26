import React from 'react'
import './style/loading.less'
function Loading() {
    return (
        <div className="loading-wrapper">
            <div></div>
            <div></div>
        </div>
    )
}

export default React.memo(Loading)
