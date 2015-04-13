(function () {
    'use strict';

    var diagram;

    var chordDiagram = {
        draw: function () {

            var tuning = ['E', 'A', 'D', 'G', 'B', 'e'];
            var chord = ['x', '3', '2', '0', '1', '0'];
            var fingering = ['x', '3', '2', 'x', '1', 'x'];

            // base variables
            var baseLineWidth = 1;
            var stringLineWidth = baseLineWidth;
            var fretBarLineWidth = baseLineWidth;
            var stringCount = tuning.length;


            var stringDistance = 10;
            var fretWidth = 20;
            var horizontalSpace = 10;
            var topBorder1 = 5;
            var topTextSize = 5;
            var bottomTextSize = 5;
            var topBorder2 = 2;
            var topSpace = topBorder1 + topTextSize + topBorder2;
            var bottomBorder1 = 2 + bottomTextSize / 2;
            var bottomBorder2 = bottomTextSize / 2;
            var bottomSpace = bottomBorder1 + bottomBorder2;

            var fingerDiameter = fretWidth / 3;

            var minFretCount = calculateMinFretCount(chord);
            var fretCount = minFretCount;
            console.log('min fret count: ' + minFretCount);

            var drawNut = false;

            var nutWidth = 0;

            if (chord.indexOf('0') > -1) {
                nutWidth = fretWidth / 5;
            } else {
                nutWidth = 1;
            }

            // derived variables
            var width = 2 * horizontalSpace + (tuning.length - 1) * stringDistance;
            var stringLength = minFretCount * fretWidth;
            var height = topSpace + stringLength + bottomSpace;

            var draw = SVG('diagram');
            draw.viewbox(0, 0, width, height);
            //draw.size('50%', '50%');
            draw.attr('class', 'svg-content');
            draw.attr('preserveAspectRatio', 'xMinYMin meet');

            // draw string
            var xStart = horizontalSpace;
            var yStart = topSpace;

            for (var i = 0; i < tuning.length; i++) {
                draw.line(xStart + (i * stringDistance), yStart, xStart + (i * stringDistance), yStart + stringLength).stroke({width: stringLineWidth})
            }

            // draw note name
            xStart = horizontalSpace;
            yStart = topBorder1;
            for (var i = 0; i < tuning.length; i++) {
                draw.text(tuning[i]).move(xStart + (i * stringDistance), yStart).font({
                    family:   'Helvetica'
                    , size:     topTextSize
                    , anchor:   'middle'
                    , leading:  '1.5em'
                });
            }

            // draw fret numbers
            xStart = horizontalSpace;
            yStart = topSpace + stringLength + bottomBorder1;
            for (var i = 0; i < tuning.length; i++) {
                draw.text(chord[i]).move(xStart + (i * stringDistance), yStart).font({
                    family:   'Helvetica'
                    , size:     topTextSize
                    , anchor:   'middle'
                    , leading:  '1.5em'
                });
            }

            // draw Nut
            draw.rect((stringCount - 1) * stringDistance, nutWidth).fill('none').stroke({width: stringLineWidth}).move(horizontalSpace, topSpace - nutWidth);

            // draw Frets
            xStart = horizontalSpace;
            yStart = topSpace;

            for (var i = 1; i <= fretCount; i++) {
                draw.line(xStart, yStart + (i * fretWidth), xStart + ((stringCount - 1) * stringDistance), yStart + (i * fretWidth)).stroke({width: stringLineWidth})
            }

            // draw fingers
            xStart = horizontalSpace - fingerDiameter / 2;
            yStart = topSpace + fretWidth / 3;

            draw.circle(fretWidth / 3).move(xStart, yStart);
            draw.text('i').move(xStart + fingerDiameter / 2, yStart + fretWidth / 3 - fingerDiameter / 3).font({
                family:   'Helvetica',
                size:     topTextSize,
                anchor:   'middle',
                //leading:  '1.5em',
                fill: 'red'
            });

            return draw;
        }
    };

    var calculateMinFretCount = function (chord) {
        var minFret = 99;
        var maxFret = 0;

        for (var i = 0; i < chord.length; i++) {
            var fret = chord[i];
            if (fret != 'x') {
                var fretNum = parseInt(fret);

                if (fretNum < minFret) {
                    minFret = fretNum;
                }
                if (fretNum > maxFret) {
                    maxFret = fretNum;
                }
            }
        }

        console.log('min fret: ' + minFret);
        console.log('max fret: ' + maxFret);

        var minFretCount = maxFret - minFret;

        if (minFretCount < 3) { // minimum 3 frets
            return 3;
        } else {
            if(minFret == 0) {
                return minFretCount;
            } else {
                return minFretCount + 1;
            }
        }
    };

    window.onload = function () {

        if (SVG.supported) {
            diagram = chordDiagram.draw();
        } else {
            alert('SVG not supported')
        }
    };

})();
