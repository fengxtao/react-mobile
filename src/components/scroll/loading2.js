import React from 'react'
import './style/loading2'

function LoadingV2() {
    return (
        <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <span>拼命加载中...</span>
        </div>
    )
}

export default React.memo(LoadingV2)
