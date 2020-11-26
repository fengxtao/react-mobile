import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from '@better-scroll/core/src/index.ts'
// import Loading from './loading'
// import Loading2 from './loading2'

const debounce = (func, delay) => {
    let timer
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}
import './style/index.less'
let defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true,
    renderFooter: null,
    datalength: 1,
}
// type propTypes = {
//     direction: 'vertical' | 'horizental'
//     refresh: boolean
//     onScroll: (x, y) => void
//     pullUp: () => void
//     pullDown: () => void
//     pullUpLoading: boolean
//     pullDownLoading: boolean
//     bounceTop: boolean //是否支持向上吸顶
//     bounceBottom: boolean //是否支持向下吸顶
//     renderFooter: Function
//     datalength: number
//     [key: string]: any
// }

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState()

    const scrollContaninerRef = useRef()
    const {
        direction,
        click,
        refresh,
        pullUpLoading,
        pullDownLoading,
        bounceTop,
        bounceBottom,
        renderFooter,
        datalength,
    } = props 

    const { pullUp, pullDown, onScroll } = props 

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 500)
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 500)
    }, [pullDown])

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom,
            },
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])

    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on('scroll', onScroll)
        return () => {
            bScroll.off('scroll', onScroll)
        }
    }, [onScroll, bScroll])

    useEffect(() => {
        if (!bScroll || !pullUp) return
        const handlePullUp = () => {
            //判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce()
            }
        }
        bScroll.on('scrollEnd', handlePullUp)
        return () => {
            bScroll.off('scrollEnd', handlePullUp)
        }
    }, [pullUp, pullUpDebounce, bScroll])

    useEffect(() => {
        if (!bScroll || !pullDown) return
        const handlePullDown = pos => {
            //判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce()
            }
        }
        bScroll.on('touchEnd', handlePullDown)
        return () => {
            bScroll.off('touchEnd', handlePullDown)
        }
    }, [pullDown, pullDownDebounce, bScroll])

    useEffect(() => {
        setTimeout(() => {
            if (refresh && bScroll) {
                bScroll.refresh()
            }
        }, 0)
    })

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                // bScroll.scrollTo(0, 0)
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll
            }
        },
    }))

    const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
    const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }
    return (
        <div className="scroll-container" ref={scrollContaninerRef}>
            {props.children}
            {pullDown ? <div className="scroll-container-top">下拉刷新。。。</div> : null}
            {pullUp ? (
                <div className={`scroll-container-bottom`}>
                    {(renderFooter && renderFooter()) || '加载中...'}
                </div>
            ) : null}
            {/* 滑到底部加载动画 */}
            {/* <div className="pull-up-loading" style={PullUpdisplayStyle}>
                <Loading></Loading>
            </div> */}
            {/* 顶部下拉刷新动画 */}
            {/* <div className="pull-down-loading" style={PullDowndisplayStyle}>
                <Loading2></Loading2>
            </div> */}
        </div>
    )
})
Scroll.defaultProps = defaultProps

export default Scroll
