'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
	_inherits(Menu, _React$Component);

	function Menu(props) {
		_classCallCheck(this, Menu);

		var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

		_this.state = {
			message: '',
			visible: 0
		};

		_this.visib = _this.MakeVisib.bind(_this);
		return _this;
	}

	_createClass(Menu, [{
		key: 'MakeVisib',
		value: function MakeVisib(e) {
			var visib = this.state.visible;
			if (visib == 0) {
				this.setState({ visible: 1 });
			} else if (visib == 1) {
				this.setState({ visible: 0 });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var classes = void 0;
			var visib = this.state.visible;
			if (visib == 0) {
				classes = { box: 'container-fluid p-0 box_mobile_menu d-none' };
			} else if (visib == 1) {
				classes = { box: 'container-fluid p-0 box_mobile_menu' };
			}
			return React.createElement(
				'div',
				{ className: 'col' },
				React.createElement(
					'div',
					{ className: classes.box },
					React.createElement(
						'div',
						{ className: 'row no-gutters h-100 align-items-center' },
						React.createElement('div', { className: 'b-close', onClick: this.visib }),
						React.createElement(
							'div',
							{ className: 'col-12' },
							React.createElement(
								'div',
								{ className: 'row mb-2 no-gutters', onClick: this.visib },
								React.createElement(
									'a',
									{ href: '#1', className: 'home py-2 px-3 m-auto', id: 'm_1' },
									'<\u0413\u043B\u0430\u0432\u043D\u0430\u044F/>'
								)
							),
							React.createElement(
								'div',
								{ className: 'row mb-2 no-gutters', onClick: this.visib },
								React.createElement(
									'a',
									{ href: '#2', className: 'home py-2 px-3 m-auto', id: 'm_2' },
									'<\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E/>'
								)
							),
							React.createElement(
								'div',
								{ className: 'row mb-2 no-gutters', onClick: this.visib },
								React.createElement(
									'a',
									{ href: '#3', className: 'home py-2 px-3 m-auto', id: 'm_3' },
									'<\u041D\u0430\u0432\u044B\u043A\u0438/>'
								)
							),
							React.createElement(
								'div',
								{ className: 'row mb-2 no-gutters', onClick: this.visib },
								React.createElement(
									'a',
									{ href: '#4', className: 'home py-2 px-3 m-auto', id: 'm_4' },
									'<\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B/>'
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'p-0 float-right' },
					React.createElement(
						'a',
						{ className: 'home text-right float-right mt-3 py-2', onClick: this.visib },
						React.createElement(
							'span',
							null,
							'//01.'
						),
						'<\u041C\u0435\u043D\u044E/>'
					)
				)
			);
		}
	}]);

	return Menu;
}(React.Component);

ReactDOM.render(React.createElement(Menu, null), document.getElementById('mobile_menu'));
