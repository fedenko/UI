var Timeline = function (container, date) {
    this.daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    this.monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dayNumbers = {
        "sunday": 0,
        "monday": 1,
        "tuesday": 2,
        "wednesday": 3,
        "thursday": 4,
        "friday": 5,
        "saturday": 6
    };
    this.initialize = function () {
        this.isIE6 = (jQuery.browser.msie && jQuery.browser.version == "6.0");
        this.container = $("#" + container);
        if (!this.container.length) {
            alert("can not locate container element \"" + container + "\"!");
            return;
        }
        this.bubble = new Timeline.Bubble(this);
        this.date = (date) ? date : new Date();
        this.readEvents();
        this.placeHolders = this.setupPlaceHolders();
        this.container.addClass("timeline");
        this.render();
    },
    this.readEvents = function () {
        this.events = [];
        var eventList = this.container.find("ul");
        var eventItems = eventList.find("li");
        for (var i = 0; i < eventItems.length; i++) {
            var date = new Date(eventItems[i].getAttribute("title"));
            if (date == "Invalid Date") continue;
            this.events[i] = {
                name: eventItems[i].className,
                date: date,
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                content: jQuery(eventItems[i]).text()
            };
        }
        var j, tmp, events = this.events;
        for (var i = 1; i < events.length; i++) {
            tmp = this.events[i];
            for (j = i; j > 0 && events[j - 1].date > tmp.date; j--)
            events[j] = events[j - 1];
            events[j] = tmp;
        }
        eventList.remove();
    }
    this.render = function () {
        this.placeHolders.arrows.empty();
        this.placeHolders.top.empty();
        this.placeHolders.bottom.empty();
        var monthRepresentation = this.getMonthRepresentation();
        for (var i = 0; i < monthRepresentation.length; i++)
        this.renderDay(this.placeHolders.top, this.placeHolders.bottom, monthRepresentation[i]);
        if (this.isIE6) this.handleIE6Issues();
        this.setupArrows();
    }
    this.handleIE6Issues = function () {
        var clone = this.placeHolders.top.clone(true);
        this.container.append(clone);
        clone.css({
            left: "-1000px",
            top: "-1000px"
        });
        var width = clone.outerWidth();
        clone.remove();
        this.placeHolders.top.css({
            width: width + "px"
        });
        this.placeHolders.bottom.css({
            width: width + "px"
        });
    }
    this.renderDay = function (topRow, bottomRow, data) {
        var cssClass = "";
        cssClass += (this.isToday(data.number)) ? "today" : "";
        cssClass += (data.events.length) ? " event" : "";
        topRow.append("<li><div class=\"" + cssClass + "\">" + data.name + "</div></li>");
        bottomRow.append("<li><div class=\"" + cssClass + "\">" + data.number + "</div></li>");
        nameEl = topRow.find("div:last");
        numbEl = bottomRow.find("div:last");
        if (data.events.length == 0) return;
        var self = this;
        var enterClosure = function (e) {
            self.onMouseEnter(e);
        };
        var leaveClosure = function (e) {
            self.onMouseLeave(e);
        };
        nameEl.bind("mouseenter", data, enterClosure);
        numbEl.bind("mouseenter", data, enterClosure);
        nameEl.bind("mouseleave", data, leaveClosure);
        numbEl.bind("mouseleave", data, leaveClosure);
    }
    this.setupArrows = function () {
        var dateString = this.monthsOfYear[this.date.getMonth()] + " " + this.date.getFullYear();
        var html = "";
        html += "<div class=\"timeline_lastyear\" title=\"Previous Year\"></div>"
        html += "<div class=\"timeline_lastmonth\" title=\"Previous Month\"></div>"
        html += "<div class=\"timeline_date\">" + dateString + "</div>"
        html += "<div class=\"timeline_nextmonth\" title=\"Next Month\"></div>"
        html += "<div class=\"timeline_nextyear\" title=\"Next Year\"></div>"
        this.placeHolders.arrows.append(html);
        var children = this.placeHolders.arrows.children();
        var self = this;
        $(children[0]).bind("click", this, function () {
            self.previousYear()
        });
        $(children[1]).bind("click", this, function () {
            self.previousMonth()
        });
        $(children[3]).bind("click", this, function () {
            self.nextMonth()
        });
        $(children[4]).bind("click", this, function () {
            self.nextYear()
        });
    }
    this.getEventsForDay = function (dayNumber) {
        var result = [];
        for (var i = 0; i < this.events.length; i++) {
            var e = this.events[i];
            if (e.day == dayNumber && e.month == this.date.getMonth() && e.year == this.date.getFullYear()) result.push(this.events[i]);
        }
        return result;
    }
    this.setupPlaceHolders = function () {
        var arrows = jQuery(document.createElement("div"));
        arrows.addClass("timeline_arrows");
        var top = jQuery(document.createElement("div"));
        top.addClass("timeline_top");
        var bottom = jQuery(document.createElement("div"));
        bottom.addClass("timeline_bottom");
        top.append("<ul></ul>");
        bottom.append("<ul></ul>");
        this.container.append([arrows[0], top[0], bottom[0]]);
        return {
            arrows: arrows,
            top: top.find("ul:first"),
            bottom: bottom.find("ul:first")
        };
    }
    this.getMonthRepresentation = function () {
        var result = [];
        var numberOfDays = this.getNumberOfDaysInMonth(this.date);
        var firstDay = this.getFirstDayOfMonth(this.date);
        var finished = false;
        for (var i = 0; i < numberOfDays; i++) {
            result.push({
                name: this.weekDays[firstDay].substring(0, 1),
                number: (i + 1 < 10) ? "0" + (i + 1) : (i + 1),
                events: this.getEventsForDay(i + 1)
            });
            firstDay = (firstDay == 6) ? 0 : ++firstDay;
        }
        return result;
    }
    this.getNumberOfDaysInMonth = function (dateObject) {
        var month = dateObject.getMonth();
        if (month == 1) {
            var leapYear = (new Date(dateObject.getYear(), 1, 29).getDate()) == 29;
            if (leapYear) return 29
            else return 28;
        } else return this.daysPerMonth[month];
    },
    this.getFirstDayOfMonth = function (dateObject) {
        var save = dateObject.getDate();
        dateObject.setDate(1);
        var result = dateObject.getDay();
        dateObject.setDate(save);
        return result;
    },
    this.isToday = function (dayNumber) {
        var today = new Date();
        return (today.getDate() == dayNumber && today.getFullYear() == this.date.getFullYear() && today.getMonth() == this.date.getMonth());
    },
    this.onMouseEnter = function (event) {
        var left = $(event.target).offset().left;
        var width = $(event.target).outerWidth();
        this.bubble.setContent(event.data.events);
        this.bubble.show(left + (width / 2));
    }
    this.onMouseLeave = function (event) {
        this.bubble.hide();
    }
    this.nextMonth = function () {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    }
    this.nextYear = function () {
        this.date.setYear(this.date.getFullYear() + 1);
        this.render();
    }
    this.previousMonth = function () {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    }
    this.previousYear = function () {
        this.date.setYear(this.date.getFullYear() - 1);
        this.render();
    }
    this.initialize();
}
Timeline.Bubble = function (timeline) {
    this.initialize = function () {
        var IE6Class = (timeline.isIE6) ? " bubbleIE6" : "";
        var id = "bubble_" + new Date().getTime();
        var html = "";
        html += "<div id=\"" + id + "\" class=\"timeline_bubble\">";
        html += "<div class=\"bubble_top" + IE6Class + "\"></div>";
        html += "<div class=\"bubble_mid" + IE6Class + "\"></div>";
        html += "<div class=\"bubble_bottom" + IE6Class + "\"></div></div>";
        timeline.container.after(html);
        this.container = $("#" + id);
        this.container.bind("mouseenter", this, this.onMouseEnter);
        this.container.bind("mouseleave", this, this.onMouseLeave);
    }
    this.onMouseEnter = function (event) {
        event.data.stopHiding();
    }
    this.onMouseLeave = function (event) {
        event.data.hide();
    }
    this.stopHiding = function () {
        if (this.goingOffHandle && this.goingOffHandle != null) {
            clearTimeout(this.goingOffHandle);
            this.goingOffHandle = null;
        }
    }
    this.setContent = function (events) {
        this.stopHiding();
        var html = "";
        for (var i = 0; i < events.length; i++)
        html += "<div><div class=\"event_title\">" + events[i].name + "<p class=\"event_data\">" + events[i].content + "</p></div></div>";
        var midSection = $(this.container.children()[1]);
        midSection.empty();
        midSection.append(html);
        var titles = midSection.find(".event_title");
        titles.each(function (inx, element) {
            $(element).bind("mouseenter", function (event) {
                $(element).children(":first").animate({
                    opacity: "toggle"
                }, 200);
            });
            $(element).bind("mouseleave", function (event) {
                $(element).children(":first").animate({
                    opacity: "hide"
                }, 200);
            });
        });
    }
    this.show = function (at) {
        this.container.animate({
            opacity: "show"
        }, 250);
        this.container.animate({
            left: at - (this.container.outerWidth() / 2)
        }, 300);
    }
    this.hide = function () {
        var self = this;
        this.goingOffHandle = setTimeout(function () {
            self.container.animate({
                opacity: "hide"
            }, 250);
        }, 700);
    }
    this.initialize();
}