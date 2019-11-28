var Belay = (function () {
    var settings = {
        strokeColor: '#fff',
        strokeWidth: 2,
        opacity: 1,
        fill: 'none',
        animate: true,
        animationDirection: 'right',
        animationDuration: .75
    };
    var me = {};

    me.init = function (initObj) {
        if (initObj) {
            $.each(initObj, function (index, value) {
                // console.log(initObj)
                //TODO validation on settings
                settings[index] = value;
            });
        }
    }

    me.set = function (prop, val) {
        //TODO validate
        settings[prop] = val;
    }

    me.on = function (el1, el2) {
    
        var $el1 = $(el1);
        var $el2 = $(el2);
        // console.log($el1)
        // console.log($el2);
        if ($el1.length && $el2.length) {
            var svgheight, p, svgleft, svgtop, svgwidth

            var el1pos = $(el1).offset();
            var el2pos = $(el2).offset();
            // console.log(el1pos);
            // console.log(el2pos);

            var el1H = $(el1).outerHeight();
            var el1W = $(el1).outerWidth();

            var el2H = $(el2).outerHeight();
            var el2W = $(el2).outerWidth();
            // console.log(el1H,el1W);
            // console.log(el2H,el2W);
            
            svgleft = Math.round(el1pos.left + el1W);
            svgwidth = Math.round(el2pos.left - svgleft);
            console.log(svgleft);
            console.log(svgwidth);

            var curvinessFactor, cpt;

            ////Determine which is higher/lower
            if ((el2pos.top + (el2H / 2)) <= (el1pos.top + (el1H / 2))) {
                // console.log("low to high");  
                p=0;      
                svgheight = Math.round((el1pos.top + el1H / 2) - (el2pos.top + el2H / 2));
                svgtop = Math.round(el2pos.top + el2H / 2) - settings.strokeWidth;
                cpt = Math.round(svgwidth * Math.min(svgheight / 300, 1));
                p = "M0," + (svgheight + settings.strokeWidth) + " C" + cpt + "," + (svgheight + settings.strokeWidth) + " " + (svgwidth - cpt) + "," + settings.strokeWidth + " " + svgwidth + "," + settings.strokeWidth;
                console.log(p);
            } else {
                // console.log("high to low");
                p=0;
                svgheight = Math.round((el2pos.top + el2H / 2) - (el1pos.top + el1H / 2));
                svgtop = Math.round(el1pos.top + el1H / 2) - settings.strokeWidth;
                cpt = Math.round(svgwidth * Math.min(svgheight / 300, 1));
                p = "M0," + settings.strokeWidth + " C" + cpt + ",0 " + (svgwidth - cpt) + "," + (svgheight + settings.strokeWidth) + " " + svgwidth + "," + (svgheight + settings.strokeWidth);
                console.log(p);
            }

            //ugly one-liner
            $ropebag = $('#ropebag').length ? $('#ropebag') : $('.hypermodel-area').append($("<div id='ropebag' />")).find('#ropebag');
            // console.log($ropebag);

            var svgnode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var newpath = document.createElementNS('http://www.w3.org/2000/svg', "path");
            newpath.setAttributeNS(null, "d", p);
            newpath.setAttributeNS(null, "stroke", settings.strokeColor);
            newpath.setAttributeNS(null, "stroke-width", settings.strokeWidth);
            newpath.setAttributeNS(null, "opacity", settings.opacity);
            newpath.setAttributeNS(null, "fill", settings.fill);
            svgnode.appendChild(newpath);
             console.log(newpath);
            //for some reason, adding a min-height to the svg div makes the lines appear more correctly.
            $(svgnode).css({
                left: 200,
                top: 100,
                position: 'absolute',
                // width: 250,
                // height: 250,
                // minHeight: '250px',
                "z-index":100000000000000000
            
            });
            $ropebag.append(svgnode);

            console.log($ropebag)
            if (settings.animate) {
                // THANKS to http://jakearchibald.com/2013/animated-line-drawing-svg/
                var pl = newpath.getTotalLength();
                // Set up the starting positions
                newpath.style.strokeDasharray = pl + ' ' + pl;

                if (settings.animationDirection == 'right') {
                    newpath.style.strokeDashoffset = pl;
                } else {
                    newpath.style.strokeDashoffset = -pl;
                }

                // Trigger a layout so styles are calculated & the browser
                // picks up the starting position before animating
                // WON'T WORK IN IE. If you want that, use requestAnimationFrame to update instead of CSS animation
                newpath.getBoundingClientRect();
                newpath.style.transition = newpath.style.WebkitTransition = 'stroke-dashoffset ' + settings.animationDuration + 's ease-in-out';
                // Go!
                newpath.style.strokeDashoffset = '0';
            }
        }
    }

    me.off = function () {
        $("#ropebag").empty();
    }

    return me;
}());


/***********************  Custom JavaScript **********************************/


// $(document).ready(function () {


    // $(".draggable").draggable({
    //     drag: function (event, ui) {
    //         Belay.off();
    //         drawConnectors();
    //     }
    // });



    function drawConnectors() {
        $(".parent").each(function () {
            var theID = this.id;
            $("." + theID).each(function (i, e) {
                // console.log(e);
                var rand = Math.random() * .7 + .3;
                Belay.set('animationDuration', rand)
                Belay.on($("#" + theID), e)
                // console.log(e);
                // console.log('the id'+theID);
            });
        })
    }

    $(window).resize(function () {
        Belay.off();
        drawConnectors();
    });

    Belay.init({
        strokeWidth: 1
    });
    Belay.set('strokeColor', '#999');
    drawConnectors();
// });