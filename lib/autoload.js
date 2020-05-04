/**
 *  Autoload
 *  Version 0.1.2
 *  http://www.lucianorasente.com
 */
(function () {
    $.prototype.autoload = function (settings) {

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

        settings = $.extend({}, $.prototype.autoload.defaults, settings || {});

        settings.url = e.data("load") || settings.url;

        if (e.data("events") === "now") {
            settings.events = "now";
        }
        else {
            settings.events = (typeof e.data("events") === 'string') ? JSON.parse(e.data("events")) : settings.events;
        }

        settings.type = e.data("type") || settings.type;

        settings.identifier = e.data("identifier") || settings.identifier;

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

            $("<div>").load(settings.url, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus == "success") {

                    var div = $(this);
                    e.html(div.html());
                    div.remove();

                    /*if (e.find(".on-success")) {
                        e.html(e.find(".on-success"));
                        e.find(".on-success").show();
                    }*/

                    if (settings.success)
                        settings.success();

                    $(document).trigger("autoload", { success: true, settings });
                }
                else {
                    e.data("loaded", false);

                    if (e.find(".on-error")) {
                        e.html(e.find(".on-error"));
                        e.find(".on-error").show();
                    }

                    if (settings.fail)
                        settings.fail();

                    $(document).trigger("autoload", { success: false, settings });
                }

                if (settings.always)
                    settings.always();
            });

            e.data("loaded", true);
        };

        if (typeof settings.events === 'string') {
            settings.events = [settings.events];
        }
        for (var i = 0; i < settings.events.length; i++) {

            var ev = settings.events[i];

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