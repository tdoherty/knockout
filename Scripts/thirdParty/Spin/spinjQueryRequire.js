/**
 * Modified spin.js plugin
 * - adds bg elemtn
 */
define(
    [   //direct dependencies
        "jquery",
        "./spin"
    ],
    function ($) {
        $.fn.spin = function(opts) {
            var defaults = {
                lines: 12, // The number of lines to draw
                length: 7, // The length of each line
                width: 5, // The line thickness
                radius: 10, // The radius of the inner circle
                color: '#fff', // #rbg or #rrggbb
                speed: 1, // Rounds per second
                trail: 100, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                bgColor: 'Gray', //loading background color
                opacity: 4 //loading background opacity
            };
            var bgEl;


            this.each(function() {
                var $this = $(this),
                    data = $this.data();
                    //spinner = $this.data('spinner');

                if (data.spinner) {
                    data.spinner.stop();
                    delete data.spinner;
                    $this.find(".loadingBG").remove();
                }
                if (opts !== false) {
                    opts = $.extend(defaults, opts);
                    bgEl = document.createElement('div');
                    $(bgEl).addClass('loadingBG');
                    $(bgEl).css("display", "none")
                        .css("filter", "alpha(opacity=40)")
                        .css("opacity", opts.opacity / 10)
                        .css("position", "absolute")
                        .css("z-index", 9999)
                        .css("top", $this.css("position") === "absolute" ? 0 : $this.position().top)
                        .css("left", $this.css("position") === "absolute" ? 0 : $this.position().left)
                        .css("background-color", opts.bgColor.toString())
                        .css("width", $this.outerWidth())
                        .css("height", $this.outerHeight() === 0 ? "100%" : $this.outerHeight())
                        .css("filter", "alpha(opacity=' + opts.opacity * 10 + ')")

                    delete opts.bgColor;
                    delete opts.opacity;
                    data.spinner = new Spinner(opts).spin(this);
                    //$this.data('spinner', spinner);

                    $(bgEl).prependTo($this)
                        .show();
                }
            });
            return this;
        };
    }
);