function ModernAccordion(container) {
    this.currentTitle = null;
    this.container = null;
    this.items = [];
    this.initialize = function () {
        this.container = $("#" + container)[0];
        if (!this.container) {
            alert("Could not locate container \"" + container + "\"");
            return;
        }
        this.readContent();
    }
    this.readContent = function () {
        var itemsInHTML = $("#" + this.container.id + " > div");
        for (var i = 0; i < itemsInHTML.length; i++) {
            var item = itemsInHTML[i];
            this.items.push({
                "title": item.title,
                "content": item
            });
        }
        $(this.container).empty();
        for (i = 0; i < this.items.length; i++)
        this.insertContent(this.items[i]);
    }
    this.getRelativeOffsetOf = function (child, parent) {
        var result = {};
        result.left = 0;
        result.top = 0;
        while (child && child != parent) {
            result.left += child.offsetLeft;
            result.top += child.pffsetTop;
            child = child.offsetParent;
        }
        return result;
    }
    this.retractCurrentOpenTitle = function (nextTitle) {
        if (!this.currentTitle) {
            this.currentTitle = nextTitle;
            this.resumeOpeningTitle();
            return;
        }
        var _this = this;
        this.currentTitle.className = "title";
        jQuery(this.currentTitle).next().slideUp(100, function () {
            jQuery(_this.currentTitle).animate({
                width: (_this.currentTitle.firstChild.offsetWidth - parseInt(jQuery(_this.currentTitle).css("margin-right"))) + "px"
            }, 300, function () {
                _this.currentTitle = nextTitle;
                _this.resumeOpeningTitle();
            });
        });
    }
    this.resumeOpeningTitle = function () {
        var titleDimension = [];
        var mainContainer = this.container;
        var title = jQuery(this.currentTitle);
        var content = title.next();
        titleDimension["rightMargin"] = parseInt(title.css("margin-right"));
        titleDimension["widthOfTitle"] = title.outerWidth() + titleDimension["rightMargin"];
        titleDimension["endOfTitle"] = this.getRelativeOffsetOf(this.currentTitle, mainContainer).left + titleDimension["widthOfTitle"];
        var toGrow = jQuery(mainContainer).innerWidth() - (titleDimension["endOfTitle"]);
        toGrow += (toGrow > 0) ? titleDimension["widthOfTitle"] - 1 : titleDimension["widthOfTitle"];
        this.currentTitle.className = "title_extended active";
        jQuery(this.currentTitle).animate({
            width: toGrow + "px"
        }, 300, "swing", function () {
            content.slideDown(100);
        });
    }
    this.insertContent = function (entryData) {
        var anchor = $(document)[0].createElement("a");
        anchor.href = entryData["title"];
        anchor.innerHTML = entryData["title"];
        var title = $(document)[0].createElement("div");
        title.className = "title";
        title.appendChild(anchor);
        var _this = this;
        jQuery(title).bind("click", function (e) {
            if (this != _this.currentTitle) _this.retractCurrentOpenTitle(this);
            return false;
        });
        var content = entryData["content"];
        content.className = "content";
        content.title = "";
        this.container.appendChild(title);
        this.container.appendChild(content);
    }
    this.showItem = function (index) {
        var contents = $(this.container).find(".title");
        var target = contents[index];
        if (target && target != this.currentTitle) this.retractCurrentOpenTitle(target);
    }
    this.initialize();
}