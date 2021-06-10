
import Scroll from '../../components/scroll'
import './index.less'
import React from 'react'
import { auto } from 'html-webpack-plugin/lib/chunksorter'
export default class extends React.Component{

    componentDidMount(){
        setTimeout(()=>{
            this.container1.addEventListener('touchmove',function(e){
                // e.preventDefault();
                    // e.stopPropagation();
                    console.log('scroll-container.touchstart')
                }, {
                    // passive: false,
                    capture: true,
                })
            
                this.container.addEventListener('touchend',function(e){
                    e.preventDefault();
                        e.stopPropagation();
                        console.log('scroll-container.touchsend')
                    }, {
                        // passive: false,
                        capture: true,
                    })

                this.container.addEventListener('scroll',function(e){
                    e.preventDefault();
                    e.stopPropagation()
                    console.log('scroll-container')
                })
        },2000)

    }

    render(){
        console.log('routers,th',this.props)
        return <div className='page-scroll'>
            <div className='scroll-one'>
                
                <div className='scroll-container1' ref={(e)=>{this.container1 = e;}}>
                    {/* <Scroll> */}
                        <div className='scroll-container'  ref={(e)=>{this.container = e;}} >
                            <div>
                            {
                            new Array(100).fill(1).map((el,index)=>{
                                return <div key={index}>
                                    {index}
                                    <br/>
                                </div>
                            })
                        }

end  
                            </div>
                      
                        </div>
                    {/* </Scroll> */}
                </div>

            </div>
        </div>
    }
}