'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('../popupPicker');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { provins, citys, areas } from './address';


var provins = [],
    citys = {},
    areas = {};

var getProvinsList = function getProvinsList() {
  return provins.map(function (name, i) {
    return { name: name, value: i };
  });
};

var getCitysList = function getCitysList(provinName) {
  if (!citys[provinName]) return [];
  return citys[provinName].map(function (name, i) {
    return { name: name, value: i };
  });
};

var getAreasList = function getAreasList(citysName) {
  if (!areas[citysName]) {
    return [];
  };
  return areas[citysName].map(function (name, i) {
    return { name: name, value: i };
  });
};

var getProvNameByIndex = function getProvNameByIndex(ind) {
  return provins[ind];
};

var getCityNameByIndex = function getCityNameByIndex(provInd, cityInd) {
  var citysList = citys[getProvNameByIndex(provInd)];
  if (!citysList) return [];
  return citysList[cityInd];
};

var getAreaNameByIndex = function getAreaNameByIndex(provInd, cityInd, areaInd) {
  return areas[getCityNameByIndex(provInd, cityInd)][areaInd];
};

var propTypes = {
  selectedValue: _propTypes2.default.object,
  onCancel: _propTypes2.default.func,
  onSelect: _propTypes2.default.func.isRequired,
  onChanging: _propTypes2.default.func
};
var defaultProps = {
  visible: false
};

var PickerAddress = function (_React$Component) {
  _inherits(PickerAddress, _React$Component);

  function PickerAddress(props) {
    _classCallCheck(this, PickerAddress);

    var _this = _possibleConstructorReturn(this, (PickerAddress.__proto__ || Object.getPrototypeOf(PickerAddress)).call(this, props));

    _this.props = props;
    var selectedValue = props.selectedValue ? props.selectedValue : {
      prov: 0,
      city: 0,
      area: 0
    };
    _this.state = {
      selectedValue: selectedValue
    };
    return _this;
  }

  _createClass(PickerAddress, [{
    key: 'handleSelect',
    value: function handleSelect(selectedValue, selectedName) {
      this.props.onSelect(selectedValue, selectedName);
    }
  }, {
    key: 'handleChanging',
    value: function handleChanging(selectedValue, key, value, name) {
      var _this2 = this;

      console.log(selectedValue, key, value, name);
      // this.setState({ selectedValue }, () => {
      //   this.props.onChanging &&
      //     this.props.onChanging(selectedValue, key, value, name);
      // });
      var prov = selectedValue.prov,
          city = selectedValue.city,
          area = selectedValue.area;

      switch (key) {
        case 'prov':
          city = 0;
          area = 0;
          break;
        case 'city':
          area = 0;
          break;
      }
      this.setState({
        selectedValue: { prov: prov, city: city, area: area }
      }, function () {
        _this2.props.onChanging && _this2.props.onChanging(_this2.state.selectedValue, key, value, name);
      });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.props.onCancel && this.props.onCancel();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nexProps) {
      var _this3 = this;

      if (nexProps.visible) {
        this.loadAddrFile();
      }

      // 选项更新
      if (nexProps.selectedValue && Object.keys(nexProps.selectedValue).find(function (key) {
        return _this3.state.selectedValue[key] !== nexProps.selectedValue[key];
      })) {
        this.setState({
          selectedValue: nexProps.selectedValue
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible) {
        this.loadAddrFile();
      }
    }
  }, {
    key: 'loadAddrFile',
    value: function loadAddrFile() {
      var _this4 = this;

      if (this._hasReqAddrFile) return;
      this._hasReqAddrFile = true;
      require.ensure([], function () {
        var addr = require('./address');
        provins = addr.provins;
        citys = addr.citys;
        areas = addr.areas;
        _this4.setState({
          loadAddr: true
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var selected = this.state.selectedValue;
      console.log("render:", selected);
      var provList = getProvinsList();
      var cityList = getCitysList(getProvNameByIndex(selected.prov || 0));
      var areaList = getAreasList(getCityNameByIndex(selected.prov || 0, selected.city || 0));
      return _react2.default.createElement(
        'div',
        { className: 'ui-picker-address' },
        _react2.default.createElement(_components, {
          data: {
            prov: provList,
            city: cityList,
            area: areaList
          },
          selectedValue: selected,
          visible: this.props.visible,
          onCancel: this.handleCancel.bind(this),
          onSelect: this.handleSelect.bind(this),
          onChanging: this.handleChanging.bind(this)
        })
      );
    }
  }]);

  return PickerAddress;
}(_react2.default.Component);

PickerAddress.propTypes = propTypes;
PickerAddress.defaultProps = defaultProps;
exports.default = PickerAddress;
//# sourceMappingURL=index.js.map