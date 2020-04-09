/**
 *
 * waterMark 水印文字内容
 * waterMarkOption 水印参数 Object类型 (width, height, font, color,rotate)
 *
 * badge Boolean 徽章  在dataSource(data) 属性中每一行的数据定义badge字段会自动生成，不需要定义对应的columns
 * dataSource: [{badge: {text: '赠', position: 'leftTop', className: ''}}]
 * badge:  text 文字内容 | position 徽章位置(leftTop/rightTop/leftBottom/rightBottom) | className
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Checkbox } from 'tinper-bee';
import { Ticon } from '../../index';
// import { generateWaterMark } from './generateWater.js';
import { badgeClassNames } from './utils';
// import tools from '../../util/tools.js'
import moment from 'moment'
import './index.less';

import Table from 'bee-table';
import 'bee-table/build/Table.css';
// import Message from '../message';

const emptyTabImage = 'https://newretail-static-pro-bj.oss-cn-beijing.aliyuncs.com/empty.png';
export class InputNumberCell extends Component {
    render() {
        let {
            val, text, record, index, selectedRowKeys, rowItem, handleClick
        } = this.props;
        if (selectedRowKeys && selectedRowKeys.length > 0) {
            for (let item of selectedRowKeys) {
                if (index === parseInt(item) && rowItem.readOnly === false) {
                    return (<div className={rowItem.quick == true ? 'selectedCell' : 'unSelectedCell'}>
                        {rowItem.quick == true && <Ticon type='jianqu' className='iconKey' onClick={e => handleClick(e, 'minus', text, record, index, rowItem)} />}
                        <span onClick={e => handleClick(e, 'modal', text, record, index, rowItem)} className='iconText row-cell-pad mouse'>{val}</span>
                        {rowItem.quick == true && <Ticon type="zengjia" className="iconKey" onClick={e => handleClick(e, 'plus', text, record, index, rowItem)} />}
                    </div>)
                }
            }
        }
        return (<div className='unSelectedCell'><span className='iconText row-cell-pad'>{val}</span></div>)
    }
}

export default class TouchTable extends Component {
    static propTypes = {
        waterMark: PropTypes.string,
        waterMarkOption: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            tabColumns: [],
            scrollY: 0
        }
        this.checkboxedList = [];
        this.type = {
            click: 'click',
            update: 'update',
            delete: 'delete',
            updateField: 'updateField'
        }
        this.tableElement = React.createRef();
        this.getTableElement = this.getTableElement.bind(this);
        this.getRowClassName = this.getRowClassName.bind(this);
    }
    getTableElement() {
        return this.tableElement;
    }
    // generateWaterMark() {
    //     const { waterMark, waterMarkOption = {} } = this.props;
    //     generateWaterMark(this.tableElement.current, { text: waterMark, ...waterMarkOption });
    // }

    renderCheckbox = (text, record, index) => {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        const onChange = (checked, index) => {
            let arr = this.state.selectedRowKeys;
            if (checked === true) {
                arr.push(index);
            }
            else if (checked === false) {
                arr.remove(index);
            }
            this.setSelectedRowKeys([...new Set(arr)]);
            const fn = this.props.cboxClick;
            if (typeof fn == 'function') { fn(checked, index) }
        }
        const status = this.findSelectedRowKeys(index);
        return (
            <div style={{ margin: 'auto', width: '20px' }}>
                {/* <Checkbox className="test" checked={status} onChange={(event) => onChange(event, index)}></Checkbox> */}
            </div>
        )
    }
    renderLineNum = (text, record, index) => {
        return this.prefixZero(index + 1, 2);
    }
    renderNumber = (text, record, index, item) => {
        const precision = parseInt(item.precision);
        const val = this.changeDecimalBuZero(text, precision);
        const rowIndexs = this.state.selectedRowKeys;
        return <InputNumberCell
            val={val}
            text={text}
            record={record}
            index={index}
            selectedRowKeys={rowIndexs}
            rowItem={item}
            handleClick={this.handleClick} />
    }
    renderAction = (text, record, index) => {
        const status = this.findSelectedRowKeys(index);
        if (status == true) {
            return (<Ticon type="shanchu" className="iconDel" onClick={e => this.handleClick(e, 'del', index, record)} />)
        } else {
            return ''
        }
    }
    renderOther = (text, record, index, item) => {
        //增加宽度是为了控制超出之后显示省略号。
        return <div className='row-cell-div row-cell-pad' style={{ width: item.width + 'px' }}>{text}</div>
    }
    //自定义列
    renderUserDefined = (text, record, index, item) => {
        const fn = item.callbackFunc;
        if (typeof fn == 'function') {
            return fn();
        }
        else {
            return '';
        }
    }
    getRowClassName = (record, index) => {
        const status = this.findSelectedRowKeys(index);
        if (status == true) {
            return 'row-selected'
        } else {
            return '';
        }
    }
    getRenderColumns = (cols, dataSource) => {
        const { badge, height = 50 } = this.props;
        const arr = [];
        let check = typeof this.props.checkbox == 'boolean' ? this.props.checkbox : false;
        if (check === true) {
            arr.push({
                key: 'checkbox',
                dataIndex: 'checkbox',
                title: '',
                width: 25,
                textAlign: 'center',
                readOnly: true,
                render: (text, record, index) => this.renderCheckbox(text, record, index)
            })
        }
        let lineType = typeof this.props.lineNum == 'boolean' ? this.props.lineNum : false;
        if (lineType === true) {
            arr.push({
                key: 'key',
                dataIndex: 'key',
                title: '行号',
                width: 50,
                textAlign: 'center',
                readOnly: true,
                render: (text, record, index) => this.renderLineNum(text, record, index)
            })
        }
        if (cols && cols.length > 0) {
            for (let item of cols) {
                if (item.controlType === 'NumTextBox') {
                    item.render = (text, record, index) => {
                        return this.renderNumber(text, record, index, item);
                    }
                } else if (item.controlType === 'Userdefined') {
                    item.render = (text, record, index) => {
                        return this.renderUserDefined(text, record, index, item);
                    }
                } else if (item.controlType === 'DatePicker') {
                    item.format
                    item.render = (text, record, index) => {
                        // let renderText=tools.dateFormat(text,item.Format);
                        let renderText=2;
                        return <span>{renderText}</span>
                    }
                } else {
                    item.render = (text, record, index) => {
                        return this.renderOther(text, record, index, item);
                    }
                }
                arr.push(item);
            }
        }
        let delType = typeof this.props.delRow == 'boolean' ? this.props.delRow : true;
        if (delType === true) {
            arr.push({
                key: 'del',
                dataIndex: 'del',
                title: '',
                width: 28,
                textAlign: 'center',
                render: (text, record, index) => this.renderAction(text, record, index)
            })
        }

        if (badge) {
            const hasBadge = dataSource.find(v => v.badge);
            if (hasBadge) {
                const badgeColumn = {
                    dataIndex: 'badge',
                    className: 'tplus-table-badge',
                    width: 0,
                    render: (value, record = {}, index) => {
                        if (!record.badge) return null;
                        const { badge: { text, position = 'leftTop', className = '' } = {} } = record;
                        const badgeClassName = badgeClassNames[position];
                        const baseNum = position.includes('Bottom') ? 25 : 0;
                        return <div className={`badge-item ${className} ${badgeClassName}`} style={{ top: baseNum + (height * index) }}><span>{text}</span></div>
                    }
                }
                arr.push(badgeColumn);
            }
        }

        return arr;
    }

    stopPropagation = (_event) => {
        if (_event && _event.stopPropagation) {
            _event.stopPropagation();
        }
    }

    /*以下为触发事件*/
    handleClick = (_event, type, ...rest) => {
        const lists = this.props.dataSource;
        switch (type) {
            case 'rowClick':
                this.rowClick(...rest)
                break;
            case 'del':
                this.delClick(lists, ...rest)
                this.stopPropagation(_event)
                break;
            case 'minus':
                this.minusClick(lists, ...rest)
                this.stopPropagation(_event)
                break;
            case 'plus':
                this.plusClick(lists, ...rest)
                this.stopPropagation(_event)
                break;
            case 'modal':
                this.modalClick(...rest)
                break;
        }

    }
    rowClick = (record, index, fn) => {
        //当不设置行点击事件时，则返回。
        // if (typeof fn !== 'function') return;
        if (this.state.selectedRowKeys.indexOf(index) > -1) return;
        this.setSelectedRowKeys(index);
        this.outerCallback(this.type.click, record, index);
    }
    delClick = (lists, index, record) => {
        lists.splice(index, 1);
        this.clearSelectedRows();
        this.outerCallback(this.type.delete, record, index);
    }
    minusClick = (lists, text, record, index, rowItem) => {
        let val = text;
        let min = rowItem.minValue;
        let quantityUiState = record.uiState&&record.uiState.Quantity;
           //单元格状态控制
        let cellMin = quantityUiState && quantityUiState.min.value;
        let cellMinTip = quantityUiState && quantityUiState.min.tip;

        let item = { };
        let afterValue = this.accSub(val, 1);

        if (min !== undefined) {
            if (min >= val) return;
            afterValue = (min >= afterValue) ? min : afterValue;
        }
        //单元格状态控制
        // if ( !tools.isNull(cellMin)) {
        //     if (cellMin >= val) {
        //         if( !tools.isNull(cellMinTip) ) Message.info(cellMinTip);
        //         return;
        //     }
        //     afterValue = (cellMin >= afterValue) ? cellMin : afterValue;
        // }

        item[rowItem.key] = afterValue;
        this.outerCallback(this.type.update, item, index);
    }
    plusClick = (lists, text, record, index, rowItem) => {
        let val = text;
        let max = rowItem.maxValue;
        let quantityUiState = record.uiState&&record.uiState.Quantity;
        //单元格状态控制
        let cellMax = quantityUiState && quantityUiState.max.value;
        let cellMaxTip = quantityUiState && quantityUiState.max.tip;

        let item = {  };
        let afterValue = this.accAdd(val, 1);
        if (max !== undefined) {
            if (max <= val) return;
            afterValue = (max <= afterValue) ? max : afterValue;
        }
        //单元格状态控制
        // if ( !tools.isNull(cellMax)) {
        //     if (cellMax <= val){
        //         if( !tools.isNull(cellMaxTip) ) Message.info(cellMaxTip); 
        //         return;
        //     }
        //     afterValue = (cellMax <= afterValue) ? cellMax : afterValue;
        // }

        item[rowItem.key] = afterValue;
        this.outerCallback(this.type.update, item, index);
    }
    modalClick = (text, record, index, rowItem) => {
        const fn = this.props.rowClick;
        if (typeof fn == 'function') {
            fn(this.type.updateField, index, record, rowItem.key, rowItem)
        }
    }

    /*以下为抽离公共方法*/

    setRow = (index) => {
        this.setSelectedRowKeys(index)
    }

    setSelectedRowKeys = (params) => {
        let arr = new Array();
        if (params instanceof Array) {
            arr.push(...params)
        } else {
            arr.push(params)
        }
        this.setState({ selectedRowKeys: arr })
    }

    findSelectedRowKeys = (index) => {
        let rowIndexs = this.state.selectedRowKeys;
        if (rowIndexs && rowIndexs.length > 0) {
            for (let i = 0; i < rowIndexs.length; i++) {
                let item = rowIndexs[i];
                if (item === index) {
                    return true;
                }
            }
        }
        return false;
    }

    clearSelectedRows = () => {
        this.setSelectedRowKeys([])
    }

    outerCallback = (type, record, index) => {
        const cb = this.props.rowClick;
        if (typeof cb == 'function') cb(type, index, record)
    }

    changeDecimalBuZero = (number, bitNum) => {
        if (bitNum == 0) return number;
        var f_x = parseFloat(number);
        if (isNaN(f_x)) {
            return '';
        }
        var s_x = number.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + bitNum) {
            s_x += '0';
        }
        return s_x;
    }

    prefixZero = (num, n) => {
        return (Array(n).join(0) + num).slice(-n);
    }

    //相加
    accAdd = (arg1, arg2) => {
        let r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    }

    //相减
    accSub = (arg1, arg2) => {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    emptyFunc = (tabHeight, emptyStyle = 'txt') => {
        let type = null;
        switch (emptyStyle) {
            case 'icon':
                type = 1;
                break;
            case 'txt':
                type = 2;
                break;
            case 'icon-txt':
                type = 3;
                break;
            default: type = 0;
        }
        return (<div className='defaultContainer' style={{ height: tabHeight + 'px' }}>
            <div style={{ display: type === 0 ? 'none' : '' }}>
                <img className='img' style={{ display: (type === 1 || type === 3) ? '' : 'none' }} src={emptyTabImage} />
                <div style={{ display: (type === 2 || type === 3) ? '' : 'none' }}>暂无数据~~</div>
            </div>
        </div>);
    }

    getScrollHeight = () => {
        const { tableHeight, headerHeight = 50 } = this.props;
        if (typeof tableHeight == 'number') return tableHeight - headerHeight;
        let tab = this.tableElement.current;
        if (tab) {
            let t = tab.contentTable.parentNode.clientHeight
            return t - headerHeight > 0 ? t - headerHeight : headerHeight
        } else {
            return 0
        }
    }

    initScrollHeight = () => {
        const scrollHeight = this.getScrollHeight();
        this.setState({ scrollY: scrollHeight })
    }



    componentDidMount() {
        setTimeout(() => {
            if( this.props.rowIndex!==void(0) ){
                this.setSelectedRowKeys(this.props.rowIndex)
            }
            this.initScrollHeight() 
        }, 0)
        // this.generateWaterMark()
    }
    componentDidUpdate() {
        // this.generateWaterMark()
    }
    componentWillReceiveProps(nextProps) {
        if ('rowIndex' in nextProps) {
            this.setSelectedRowKeys(nextProps.rowIndex)
            this.initScrollHeight()
        }
    }
    render() {
        let {
            autoScroll,width, tableHeight,
            headerHeight = 50, height = 50,
            pagination, dataSource,
            columns, rowClick, cboxClick, className = '',
            checkbox, emptyStyle
        } = this.props;
        let { scrollY } = this.state;
        // const tabColumns = this.getRenderColumns(columns, dataSource);
        return (
            <div className={`touchTable ${className}`}>
                <Table
                    // {...items}
                    // ref={this.tableElement}
                    // style={{ width: width ? width : '100%', height: tableHeight ? tableHeight : '100%' }}
                    rowKey={row => row.Code}
                    // height={height}
                    // headerHeight={headerHeight}
                    // pagination={pagination ? pagination : false}
                    data={dataSource}
                    columns={columns}
                    rowClassName={this.getRowClassName}
                    // emptyText={() => this.emptyFunc(tableHeight, emptyStyle)}
                    // scroll={autoScroll?{}:{ y: scrollY }}
                    // headerScroll={false}
                    onRowClick={(record, index) => this.handleClick(null, 'rowClick', record, index, rowClick)}
                />
            </div>
        )
    }
}
