$('document').ready(function () {
    chart();
    pie();
});

// Рисуем график
function chart() {
// Массив с 10 рандомными значениями
        const data = Array.from({length: 10}, () => Math.floor(Math.random() * 100));

        // Ширина и высота графика
        const width  = window.innerWidth;
        const height = window.innerHeight / 1.628;

        // Устанавливаем ширину и высоту на svg элемент 
        let main_box = document.getElementById("chart");
        main_box.setAttribute('width', width);
        main_box.setAttribute('height', height);

        // Отступы сверху и снизу
        const margin = {
            top: 30,
            bottom: 10
        }

        // Создание x- и y-шкал
        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height - margin.bottom, margin.top]);

        // Создание линии на основе данных
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        const area = d3.area()
            .x((d, i) => xScale(i))
            .y1(d => yScale(d))
            .y0(yScale(0))
            .curve(d3.curveMonotoneX);

        // Добавление заливки на график
        d3.select('#chart')
            .append('path')
            .datum(data)
            .attr('d', area)
            .attr('fill', '#00ff94')
            .attr('opacity', 0.21);

        // Добавление линии на график
        d3.select('#chart')
            .append('path')
            .datum(data)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', '#13FF96')
            .attr('stroke-width', '3px');

        // Добавление информации при наведении
            d3.select('#chart')
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d, i) { return xScale(i); })
                .attr("cy", function(d) { return yScale(d); })
                .attr("r", 5)
                .style("fill", "white")
                .style("cursor", "pointer")
                .on("mouseover", function(d) {
                    d3.select(this).attr("r", 10);
                    d3.select('#chart').append("text")
                       .attr("id", "tooltip")
                       .attr("x", d3.select(this).attr('cx'))
                       .attr("y", d3.select(this).attr('cy') - 15)
                       .text(d3.select(this).attr('cy'));
                })
                .on("mouseout", function() {
                    d3.select(this).attr("r", 5);
                    d3.select("#tooltip").remove();
                });
}

// Рисуем круглый график
function pie() {

// Задаем данные для круговой диаграммы
const data = Array.from({length: 2}, () => Math.floor(Math.random() * 100));

// Задаем цвета для секторов
let colors = ["#13FF96", "#00ff94"];

// Создаем элемент svg и устанавливаем его размеры
let svg = d3.select("#pie")
            .append("svg")
            .attr("width", window.innerWidth)
            .attr("height", window.innerWidth / 2)

// Создаем круговую диаграмму
let pie = d3.pie()(data);

// Создаем группу для элементов диаграммы
let g = svg.append("g")
           .attr("transform", "translate(" + (window.innerWidth / 2) + "," + (window.innerWidth / 2) / 2 + ")");

// Создаем элементы диаграммы
let arc = d3.arc()
            .innerRadius(0)
            .outerRadius((window.innerWidth / 2) / 2);

// Создаем секторы диаграммы
let sectors = g.selectAll("path")
              .data(pie)
              .enter()
              .append("path")
              .attr("d", arc)
              .attr("fill", function(d, i) {
                  return colors[i];
              })
              .attr('opacity', function(d, i) {
                  return (i == 1) ? 0.21 : 1});
}

