/**
 *  Autoload
 *  Version 0.1.1
 *  http://www.lucianorasente.com
 */
(function () {
    $.prototype.autoload = function (o) {

        var e = $(this);

        if (e.length == 0) {
            return this;
        }
        else if (e.length > 1) {
            e.each(function () {
                $(this).autoload();
            });

            return this;
        }

        if (e.data("loaded")) {
            return this;
        }

        o = $.extend({}, $.prototype.autoload.defaults, o || {});

        o.url = e.data("load") || o.url;
        o.events = (typeof e.data("events") === 'string')  ? JSON.parse(e.data("events")) : o.events;
        o.type = e.data("type") || o.type;

        e.removeData("load");
        e.removeData("events");
        e.removeData("type");

        //e.find(".on-success").hide();
        e.find(".on-error").hide();

        load = function () {

            if (e.data("loaded")) {
                return this;
            }

            console.log("Loading...");

            $("<div>").load(o.url, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "success") {

                    var div = $(this);
                    e.html(div.html());
                    div.remove();

                    /*if (e.find(".on-success")) {
                        e.html(e.find(".on-success"));
                        e.find(".on-success").show();
                    }*/

                    if(o.success)
                        o.success();
                }
                else {
                    e.data("loaded", false);

                    if (e.find(".on-error")) {
                        e.html(e.find(".on-error"));
                        e.find(".on-error").show();
                    }

                    if (o.fail)
                        o.fail();
                }

                if (o.always)
                    o.always();
            });

            e.data("loaded", true);
        };

        if (typeof o.events === 'string') {
            o.events = [o.events];
        }
        for (var i = 0; i < o.events.length; i++) {

            var ev = o.events[i];

            if (typeof ev === 'string') {
                ev = {
                    element: e,
                    event: ev
                };
            }

            if (ev.id) {
                ev.element = $(ev.id);
            }

            if (ev.event === "now") {
                load();
            }
            else {
                ev.element.on(ev.event, function () {
                    load();
                });
            }

        }

        return this;
    };

    $.prototype.autoload.defaults = {
        type: "auto",
        url: "",
        events: "now",      //  Now, [{element:, event:}, {id:, event:}]
        success: null,
        fail: null,
        always: null
    };
    
    $(function () { $("[data-load]").autoload() });
})();