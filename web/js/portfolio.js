'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portfolio = function (_React$Component) {
	_inherits(Portfolio, _React$Component);

	function Portfolio(props) {
		_classCallCheck(this, Portfolio);

		var _this = _possibleConstructorReturn(this, (Portfolio.__proto__ || Object.getPrototypeOf(Portfolio)).call(this, props));

		_this.state = {
			message: '',
			status: '',
			position: 1,
			next: true,
			back: false,
			count: 1,
			portfolios: [{
				image: 'web/images/products/site-sells_portf.png',
				title: 'Site Sells',
				desc: 'Сервис дает возможность продовать малому бизнессу, одежду онлайн.',
				scope: 'ФРОНТЕНД И БЕКЕНД РАЗРАБОТКА',
				link: 'https://site-sells.kz'
			}],
			portf_en: [{
				image: 'web/images/products/site-sells_portf.png',
				title: 'Site Sells',
				desc: 'The service makes it possible to sell clothes online to small businesses.',
				scope: 'FRONTEND AND BACKEND DEVELOPMENT',
				link: 'https://site-sells.kz'
			}]
		};

		_this.clases = [{
			image: 'portfolio_image float-right',
			border_1: 'hover_image',
			border_2: 'hover_image_2',
			title: '',
			desc: 'mt-1 pl-3 portf_desk',
			scope: 'mt-3'
		}, {
			image: 'portfolio_image float-right portf_hide',
			border_1: 'hover_image portf_hide',
			border_2: 'hover_image_2 portf_hide',
			title: 'portf_hide',
			desc: 'mt-1 pl-3 portf_desk portf_down',
			scope: 'mt-3 portf_down_2'
		}, {
			image: 'portfolio_image float-right portf_image_on portf_hide_on_2',
			border_1: 'hover_image portf_hide_on_2',
			border_2: 'hover_image_2 portf_hide_on_2',
			title: 'portf_hide_on',
			desc: 'mt-1 pl-3 portf_desk portf_top_2',
			scope: 'mt-3 portf_down_2 portf_top'
		}];

		_this.next = _this.Next.bind(_this);
		_this.back = _this.Back.bind(_this);
		_this.show = _this.Show.bind(_this);

		return _this;
	}

	_createClass(Portfolio, [{
		key: 'Show',
		value: function Show(e) {
			var count = this.state.count;
			this.setState({ status: 'show', position: count });
		}
	}, {
		key: 'Next',
		value: function Next(e) {
			var count = this.state.count;
			var portf = this.state.portfolios.length;
			var status = 'hide';
			if (portf !== 1) {
				if (count !== portf) {
					this.setState({ count: count + 1, status: status });
				} else {
					this.setState({ count: 1, status: status });
				}
			}
		}
	}, {
		key: 'Back',
		value: function Back(e) {
			var count = this.state.count;
			var portf = this.state.portfolios.length;
			var status = 'hide';
			if (portf !== 1) {
				if (count == 1) {
					this.setState({ count: portf, status: status });
				} else {
					this.setState({ count: count - 1, status: status });
				}
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			var status = this.state.status;
			if (status == 'hide') {
				setTimeout(function () {
					return _this2.show();
				}, 600);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var status = this.state.status;
			var portf_butts = void 0;
			if (this.state.portfolios.length == 1) {
				portf_butts = {
					back: 'pf_butt_before d-none',
					line: 'porfolio_loading d-none',
					next: 'pf_butt_next d-none'
				};
			} else {
				portf_butts = {
					back: 'pf_butt_before',
					line: 'porfolio_loading',
					next: 'pf_butt_next'
				};
			}
			if (window.location.pathname == '/ru.php') {
				if (status == '') {
					var data = this.state.portfolios[this.state.position - 1];
					var clases = this.clases[0];
				} else if (status == 'hide') {
					var data = this.state.portfolios[this.state.position - 1];
					var clases = this.clases[1];
				} else if (status == 'show') {
					var data = this.state.portfolios[this.state.position - 1];
					var clases = this.clases[2];
				}
			} else {
				if (status == '') {
					var data = this.state.portf_en[this.state.position - 1];
					var clases = this.clases[0];
				} else if (status == 'hide') {
					var data = this.state.portf_en[this.state.position - 1];
					var clases = this.clases[1];
				} else if (status == 'show') {
					var data = this.state.portf_en[this.state.position - 1];
					var clases = this.clases[2];
				}
			}
			var line_procent = this.state.count / (this.state.portfolios.length / 100) + '%';

			return React.createElement(
				'div',
				{ className: 'col-11 m-auto h-100' },
				React.createElement(
					'div',
					{ className: 'row no-gutters h-100 align-items-center' },
					React.createElement(
						'div',
						{ className: 'col-11 m-auto' },
						React.createElement(
							'div',
							{ className: 'row no-gutters align-items-center' },
							React.createElement(
								'div',
								{ className: 'col-cm-6 col-5 m-sm-0 m-auto pr-3 pr-sm-5' },
								React.createElement(
									'a',
									{ className: 'm-auto portfolio', target: '_blanck', href: data.link },
									React.createElement('div', { className: clases.border_1 }),
									React.createElement('div', { className: clases.border_2 }),
									React.createElement('img', { className: clases.image, src: data.image, alt: '' })
								)
							),
							React.createElement('div', { className: 'w-100 d-sm-none d-block' }),
							React.createElement(
								'div',
								{ className: 'col p_after p_before pb-4 pt-3' },
								React.createElement(
									'h3',
									{ className: clases.title },
									data.title
								),
								React.createElement(
									'p',
									{ className: clases.desc },
									React.createElement(
										'span',
										null,
										data.desc
									)
								),
								React.createElement(
									'p',
									{ className: clases.scope },
									data.scope
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'row no-gutters align-items-center mt-1 mt-sm-5 mt-lg-2' },
							React.createElement(
								'div',
								{ className: 'col-3' },
								React.createElement('div', { className: portf_butts.back, onClick: this.back })
							),
							React.createElement(
								'div',
								{ className: 'col' },
								React.createElement(
									'div',
									{ className: 'row no-gutters' },
									React.createElement(
										'div',
										{ className: 'col-8 m-auto' },
										React.createElement(
											'div',
											{ className: portf_butts.line },
											React.createElement('div', { id: 'line', style: { width: line_procent } })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-3' },
								React.createElement('div', { className: portf_butts.next, onClick: this.next })
							)
						)
					)
				)
			);
		}
	}]);

	return Portfolio;
}(React.Component);

ReactDOM.render(React.createElement(Portfolio, null), document.getElementById('portfolio_box'));