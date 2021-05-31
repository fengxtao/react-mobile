

import React from 'react'
import './index.css'

export default class extends React.Component {

    componentDidMount() {
       

    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <input id="exp1" className="exp" type="checkbox" />
                    <div className="text">
                        <label className="btn" htmlFor="exp1">展开</label>
                                    浮动元素是如何定位的
                        正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
                        在下面的图片中，有三个红色的正方形。其中有两个向左浮动，一个向右浮动。要注意到第二个向左浮动的正方形被放在第一个向左浮动的正方形的右边。如果还有更多的正方形这样浮动，它们会继续向右堆放，直到填满容器一整行，之后换行至下一行。
                    </div>
                </div>

                <div className="wrapper">
                    <input id="exp2" className="exp" type="checkbox" />
                    <div className="text">
                        <label className="btn" htmlFor="exp2">展开2</label>
                       移出正常的文档流，然后向左或者向右平移，一直平移直到碰到
                    </div>
                </div>
            </>
        )
    }
}