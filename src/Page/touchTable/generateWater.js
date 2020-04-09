export function generateWaterMark(
  element = {}, 
  {width = '150px', height = '120px', font = '12px', color = 'rgba(244, 244, 244, 1)', text = '', rotate = '-30'} = {}
) {
  const {contentTable} = element;
  if (!contentTable) return;
  const tablebodyEle = contentTable
  
  /* 制作水印背景 */
 if(!!text.length){
    var base64Url;//水印背景
    
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(text, 0, 40);
    ctx.fillText(text, 20, 120);

    base64Url = canvas.toDataURL();
     /* 元素上背景水印 */
     tablebodyEle && (tablebodyEle.style['background-image']=`url(${base64Url})`);
     return 
 }
  tablebodyEle && (tablebodyEle.style['background-image']=`none`)
}
