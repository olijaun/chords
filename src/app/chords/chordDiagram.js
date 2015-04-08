(function () {
    'use strict';

    var diagram;

    var chordDiagram = {
        draw: function () {

            var containerWidth = $('#main').width();
            var containerHeight = $('#main').height();

            var neckWidth = containerHeight / 2;

            var draw = SVG('diagram').size('100%', '100%');
            console.log(draw.width());
            var rect = draw.rect('50%', '50%').attr({ strokeWidth: 5, stroke: 'black', fill: 'none' });

            return draw;
        }
    };

    window.onload = function() {

        if (SVG.supported) {
            diagram = chordDiagram.draw();
        } else {
            alert('SVG not supported')
        }
    }

    window.onresize = function() {
        console.log('redraw');

        var containerWidth = $('#main').width();
        var containerHeight = $('#main').height();

        console.log(containerWidth);
        console.log(containerHeight);

        diagram.width(containerWidth);
        diagram.height(containerHeight);

    }

})();
