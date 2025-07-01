$('document').ready(function () {
	start_slick();
});
	$(function() {
	        $.scrollify({
	            section : 			   ".section",
	            easing: 		   		  "swing",
	            scrollSpeed: 			     1800,
	            touchScroll: 				 false,
	            interstitialSection: 	'.footer',
	        });
	    drow_lines();
	});

function drow_lines() {
	// Ширина и высота видимой части экрана.
	var height = document.documentElement.clientHeight;
	var width  = document.documentElement.clientWidth;

	// Получение информации о блоке, от которого пойдет рисование.
	var fio   = document.getElementById('fio');
	var fio_w = fio.offsetWidth; 
	var fio_h = fio.offsetHeight;
	var fio_t = getTop(fio);
	var box_fio = document.getElementById('name_box');
	box_fio = {
		left: box_fio.getBoundingClientRect().x
	};
	var fio_l = fio.getBoundingClientRect().x;
	// Текст портфолио, к которому должна придти линия.
	var portf   = document.getElementById('portf');
	var portf_w =  portf.offsetWidth;
	var portf_l = portf.getBoundingClientRect().x;
	var portf_t = getTop(portf);
	// получение обьектов, для определения глубины спуска первой линии.
	// Текст "я профессиональный программист"
	var elem_1 = document.getElementById('l1_b_1');
	// Кнопка круг.
	var elem_2 = document.getElementById('c_3');
	// Изначально считаем от первого элемента.
	var elem_is = 1;
	var e_t_1 = getTop(elem_1);
	var e_t_2 = getTop(elem_2);
	if(e_t_1 < e_t_2) {
		// Если второй элемент больше, то от него.
		elem_is = 2;
	}
	// Устанавливаем квадрат в нужном месте.
	let k = document.getElementById('line_1');
	k.style.position = 'absolute';
	// k.style.width = (width / 2) - (fio_l / 2) + 'px';
	// k.style.height = portf_t - (fio_h / 2) - fio_t  + 'px';
	// k.style.background = 'red';
	k.style.left = (box_fio.left / 2) + 'px';
	k.style.top = (fio_h / 2)- 20 + fio_t + 'px';
	var svg_w = (width / 2) - (box_fio.left / 2) + 20;
	var svg_h = portf_t - (fio_h / 2) - fio_t;
	var paper = Raphael("line_1", svg_w, svg_h);
	// Определяем левую позицию для первого круга.
	var circ_1_l = (fio_l - box_fio.left) + ((box_fio.left / 2) - 20);
	var circ_1_2_l = (fio_l - box_fio.left) + ((box_fio.left / 2) - 20);
	if(circ_1_l < 20) {
		circ_1_l = 20;
		circ_1_2_l = 20;
	}
	let path1_V_1 = 0;
	if(elem_is == 2) {
		path1_V_1 = (e_t_2 + elem_2.offsetHeight) - (((fio_h / 2) - 20) + fio_t);
		path1_V_1 = ((height - (e_t_2 + elem_2.offsetHeight)) / 2) + path1_V_1;

		path1_V_2 = (e_t_2 + elem_2.offsetHeight) + ((height - (e_t_2 + elem_2.offsetHeight)) / 2);
		path1_V_2 = ((portf_t - path1_V_2) - 40) + path1_V_1;
	} else {
		path1_V_1 = (e_t_1 + elem_1.offsetHeight) - (((fio_h / 2) - 20) + fio_t);
		path1_V_1 = ((height - (e_t_1 + elem_1.offsetHeight)) / 2) + path1_V_1;

		path1_V_2 = (e_t_1 + elem_1.offsetHeight) + ((height - (e_t_1 + elem_1.offsetHeight)) / 2);
		path1_V_2 = ((portf_t - path1_V_2) - 40) + path1_V_1;
	}
	var path1_H_2 = ((width / 2) - (box_fio.left / 2));
	// 22% повороты.
	var path1_turns    = (path1_H_2 / 100) * 22 + 3;
	var path1_turns_ps = (path1_turns / 100) * 55.2284430093923;
	path1_V_1 = path1_V_1 - path1_turns;
	path1_H_2 = path1_H_2 - (path1_turns + path1_V_2);
	var path1_turns_ps_2 = (path1_V_2 / 100) * 55.2284430093923;
	paper.path('M' + circ_1_l + ' 20H3V' + path1_V_1 + 'C3,' + (path1_V_1 + path1_turns_ps) + ' '+ (path1_turns - path1_turns_ps) + ',' + (path1_V_1 + path1_turns) +' ' + path1_turns + ',' + (path1_V_1 + path1_turns) + 'h' + (path1_H_2 + path1_V_2) + ',0' + 'V' + path1_V_2).attr({'stroke':'#00FF94','stroke-width':'3'});
	paper.circle(circ_1_l, 20, 20).attr({'opacity':'0.21','fill':'#00FF94', 'stroke':'none'}); //example
	paper.circle(circ_1_2_l, 20, 8).attr({'opacity':'1','fill':'#FFFFFF', 'stroke':'none'}); //example
	paper.circle((path1_H_2 + path1_turns + path1_V_2), path1_V_2, 20).attr({'opacity':'0.21','fill':'#00FF94', 'stroke':'none'}); //example
	paper.circle((path1_H_2 + path1_turns + path1_V_2), path1_V_2, 8).attr({'opacity':'1','fill':'#FFFFFF', 'stroke':'none'}); //example

}

function getTop(e) {
	let box = e.getBoundingClientRect();
	return box.top + window.pageYOffset;
}

function start_slick() {
	$('.rewev_box').slick({  
  		slidesToShow: 1, //сколько слайдов показывать в карусели
  		slidesToScroll: 1, // сколько слайдов прокручивать за раз
  		аccessibility: true,
  		cssEase: 'easeOutCirc',
  		draggable: true,
  		infinite: false,
  		edgeFriction: false,
  		responsive: true,
  		respondTo: true,
  		speed: 0,
  		arrows : true,
	});
	
}