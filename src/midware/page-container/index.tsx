import React from 'react';
const style={
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0,
}
function Page(name){
    return function decorator(Class) {
        return (function(...args){
          
            class NewPage extends Class{
                constructor(...args){
                    super(...args)
                }
                render(){
                    return <div style={style as any}>
                        { super.render()}
                    </div>
                }
            }
            return new NewPage(...args)
        }) as any
    }
}
function PageContainer(name){
    return function decorator(Class) {
        return (function(...args){
            return <div className='page-container' style={style as any}>
               <Class />
            </div>
        }) as any
    }
}
export default PageContainer;
export {Page,PageContainer}