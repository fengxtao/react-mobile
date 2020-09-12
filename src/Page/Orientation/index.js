import { List, Stepper } from 'antd-mobile';
import React from 'react'
import Swiper from 'swiper'
import 'swiper/swiper.less'
class Orientation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 3,
            val1: 2,
        };
    }
    onChange(val) {
        console.log(val);
        this.setState({ val });
    }
    onChange1(val1) {
        // console.log(val);
        this.setState({ val1 });
    }
    componentDidMount() {
        setTimeout(() => {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: true,//可选选项，自动滑动
            })
        }, 1000);
    }
    render() {
        return <div style={{ height: '100%' }}>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" style={{width:'100%'}}>slider1</div>
                    <div className="swiper-slide" style={{width:'100%'}}>slider2</div>
                    <div className="swiper-slide" style={{width:'100%'}}>slider3</div>
                </div>
            </div>
        </div>
    }
}
export default Orientation;