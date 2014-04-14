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

        console.log("Starting...")

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

                    if(o.success)
                        o.success();
                }
                else {
                    e.data("loaded", false);

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