
;!function() {
    for (var method, noop = function() {}
    , methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], length = methods.length, console = window.console = window.console || {}; length--; )
        method = methods[length],
        console[method] || (console[method] = noop)
}();
!function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document)
            throw new Error("jQuery requires a window with a document");
        return factory(w)
    }
     : factory(global)
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length
          , type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier))
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            });
        if (qualifier.nodeType)
            return jQuery.grep(elements, function(elem) {
                return elem === qualifier !== not
            });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier))
                return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) > -1 !== not
        })
    }
    function sibling(cur, dir) {
        do
            cur = cur[dir];
        while (cur && 1 !== cur.nodeType);return cur
    }
    function createOptions(options) {
        var object = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0
        }),
        object
    }
    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed),
        window.removeEventListener("load", completed)) : (document.detachEvent("onreadystatechange", completed),
        window.detachEvent("onload", completed))
    }
    function completed() {
        (document.addEventListener || "load" === window.event.type || "complete" === document.readyState) && (detach(),
        jQuery.ready())
    }
    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name),
            "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null  : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else
                data = void 0
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj)
            if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name)
                return !1;
        return !0
    }
    function internalData(elem, name, data, pvt) {
        if (acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name)
                return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey),
                cache[id] || (cache[id] = isNode ? {} : {
                    toJSON: jQuery.noop
                }),
                ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)),
                thisCache = cache[id],
                pvt || (thisCache.data || (thisCache.data = {}),
                thisCache = thisCache.data),
                void 0 !== data && (thisCache[jQuery.camelCase(name)] = data),
                "string" == typeof name ? (ret = thisCache[name],
                null  == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache,
                ret
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [name] : (name = jQuery.camelCase(name),
                    name = name in thisCache ? [name] : name.split(" ")),
                    i = name.length;
                    for (; i--; )
                        delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache))
                        return
                }
                (pvt || (delete cache[id].data,
                isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = void 0)
            }
        }
    }
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur()
        }
         : function() {
            return jQuery.css(elem, prop, "")
        }
        , initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3],
            valueParts = valueParts || [],
            initialInUnit = +initial || 1;
            do
                scale = scale || ".5",
                initialInUnit /= scale,
                jQuery.style(elem, prop, initialInUnit + unit);
            while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations)
        }
        return valueParts && (initialInUnit = +initialInUnit || +initial || 0,
        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2],
        tween && (tween.unit = unit,
        tween.start = initialInUnit,
        tween.end = adjusted)),
        adjusted
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|")
          , safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement)
            for (; list.length; )
                safeFrag.createElement(list.pop());
        return safeFrag
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : void 0;
        if (!found)
            for (found = [],
            elems = context.childNodes || context; null  != (elem = elems[i]); i++)
                !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null  != (elem = elems[i]); i++)
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
        for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++)
            if (elem = elems[i],
            elem || 0 === elem)
                if ("object" === jQuery.type(elem))
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                else if (rhtml.test(elem)) {
                    for (tmp = tmp || safe.appendChild(context.createElement("div")),
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                    wrap = wrapMap[tag] || wrapMap._default,
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2],
                    j = wrap[0]; j--; )
                        tmp = tmp.lastChild;
                    if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])),
                    !support.tbody)
                        for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild,
                        j = elem && elem.childNodes.length; j--; )
                            jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                    for (jQuery.merge(nodes, tmp.childNodes),
                    tmp.textContent = ""; tmp.firstChild; )
                        tmp.removeChild(tmp.firstChild);
                    tmp = safe.lastChild
                } else
                    nodes.push(context.createTextNode(elem));
        for (tmp && safe.removeChild(tmp),
        support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked),
        i = 0; elem = nodes[i++]; )
            if (selection && jQuery.inArray(elem, selection) > -1)
                ignored && ignored.push(elem);
            else if (contains = jQuery.contains(elem.ownerDocument, elem),
            tmp = getAll(safe.appendChild(elem), "script"),
            contains && setGlobalEval(tmp),
            scripts)
                for (j = 0; elem = tmp[j++]; )
                    rscriptType.test(elem.type || "") && scripts.push(elem);
        return tmp = null ,
        safe
    }
    function returnTrue() {
        return !0
    }
    function returnFalse() {
        return !1
    }
    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if ("object" == typeof types) {
            "string" != typeof selector && (data = data || selector,
            selector = void 0);
            for (type in types)
                on(elem, type, selector, data, types[type], one);
            return elem
        }
        if (null  == data && null  == fn ? (fn = selector,
        data = selector = void 0) : null  == fn && ("string" == typeof selector ? (fn = data,
        data = void 0) : (fn = data,
        data = selector,
        selector = void 0)),
        fn === !1)
            fn = returnFalse;
        else if (!fn)
            return elem;
        return 1 === one && (origFn = fn,
        fn = function(event) {
            return jQuery().off(event),
            origFn.apply(this, arguments)
        }
        ,
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)),
        elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector)
        })
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }
    function disableScript(elem) {
        return elem.type = (null  !== jQuery.find.attr(elem, "type")) + "/" + elem.type,
        elem
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"),
        elem
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle,
                curData.events = {};
                for (type in events)
                    for (i = 0,
                    l = events[type].length; l > i; i++)
                        jQuery.event.add(dest, type, events[type][i])
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data))
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(),
            !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events)
                    jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando)
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text,
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML),
            support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked,
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
        }
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var first, node, hasScripts, scripts, doc, fragment, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
        if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value))
            return collection.each(function(index) {
                var self = collection.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())),
                domManip(self, args, callback, ignored)
            });
        if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored),
        first = fragment.firstChild,
        1 === fragment.childNodes.length && (fragment = first),
        first || ignored)) {
            for (scripts = jQuery.map(getAll(fragment, "script"), disableScript),
            hasScripts = scripts.length; l > i; i++)
                node = fragment,
                i !== iNoClone && (node = jQuery.clone(node, !0, !0),
                hasScripts && jQuery.merge(scripts, getAll(node, "script"))),
                callback.call(collection[i], node, i);
            if (hasScripts)
                for (doc = scripts[scripts.length - 1].ownerDocument,
                jQuery.map(scripts, restoreScript),
                i = 0; hasScripts > i; i++)
                    node = scripts[i],
                    rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
            fragment = first = null 
        }
        return collection
    }
    function remove(elem, selector, keepData) {
        for (var node, elems = selector ? jQuery.filter(selector, elem) : elem, i = 0; null  != (node = elems[i]); i++)
            keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)),
            node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")),
            node.parentNode.removeChild(node));
        return elem
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body)
          , display = jQuery.css(elem[0], "display");
        return elem.detach(),
        display
    }
    function defaultDisplay(nodeName) {
        var doc = document
          , display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc),
        "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement),
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document,
        doc.write(),
        doc.close(),
        display = actualDisplay(nodeName, doc),
        iframe.detach()),
        elemdisplay[nodeName] = display),
        display
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments)
            }
        }
    }
    function vendorPropName(name) {
        if (name in emptyStyle)
            return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), i = cssPrefixes.length; i--; )
            if (name = cssPrefixes[i] + capName,
            name in emptyStyle)
                return name
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++)
            elem = elements[index],
            elem.style && (values[index] = jQuery._data(elem, "olddisplay"),
            display = elem.style.display,
            show ? (values[index] || "none" !== display || (elem.style.display = ""),
            "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem),
            (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++)
            elem = elements[index],
            elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2)
            "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)),
            isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)),
            "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles),
            "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0
          , val = "width" === name ? elem.offsetWidth : elem.offsetHeight
          , styles = getStyles(elem)
          , isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (document.msFullscreenElement && window.top !== window && elem.getClientRects().length && (val = Math.round(100 * elem.getBoundingClientRect()[name])),
        0 >= val || null  == val) {
            if (val = curCSS(elem, name, styles),
            (0 > val || null  == val) && (val = elem.style[name]),
            rnumnonpx.test(val))
                return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]),
            val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing)
    }
    function createFxNow() {
        return window.setTimeout(function() {
            fxNow = void 0
        }),
        fxNow = jQuery.now()
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth)
            which = cssExpand[i],
            attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type),
        attrs
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; length > index; index++)
            if (tween = collection[index].call(animation, prop, value))
                return tween
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"),
        null  == hooks.unqueued && (hooks.unqueued = 0,
        oldfire = hooks.empty.fire,
        hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }
        ),
        hooks.unqueued++,
        anim.always(function() {
            anim.always(function() {
                hooks.unqueued--,
                jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })),
        1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY],
        display = jQuery.css(elem, "display"),
        checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display,
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")),
        opts.overflow && (style.overflow = "hidden",
        support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0],
            style.overflowX = opts.overflow[1],
            style.overflowY = opts.overflow[2]
        }));
        for (prop in props)
            if (value = props[prop],
            rfxtypes.exec(value)) {
                if (delete props[prop],
                toggle = toggle || "toggle" === value,
                value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop])
                        continue;hidden = !0
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else
                display = void 0;
        if (jQuery.isEmptyObject(orig))
            "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
        else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}),
            toggle && (dataShow.hidden = !hidden),
            hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }),
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig)
                    jQuery.style(elem, prop, orig[prop])
            });
            for (prop in orig)
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim),
                prop in dataShow || (dataShow[prop] = tween.start,
                hidden && (tween.end = tween.start,
                tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props)
            if (name = jQuery.camelCase(index),
            easing = specialEasing[name],
            value = props[index],
            jQuery.isArray(value) && (easing = value[1],
            value = props[index] = value[0]),
            index !== name && (props[name] = value,
            delete props[index]),
            hooks = jQuery.cssHooks[name],
            hooks && "expand" in hooks) {
                value = hooks.expand(value),
                delete props[name];
                for (index in value)
                    index in props || (props[index] = value[index],
                    specialEasing[index] = easing)
            } else
                specialEasing[name] = easing
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }), tick = function() {
            if (stopped)
                return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++)
                animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [animation, percent, remaining]),
            1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]),
            !1)
        }
        , animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween),
                tween
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                if (stopped)
                    return this;
                for (stopped = !0; length > index; index++)
                    animation.tweens[index].run(1);
                return gotoEnd ? (deferred.notifyWith(elem, [animation, 1, 0]),
                deferred.resolveWith(elem, [animation, gotoEnd])) : deferred.rejectWith(elem, [animation, gotoEnd]),
                this
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++)
            if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts))
                return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)),
                result;
        return jQuery.map(props, createTween, animation),
        jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation),
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })),
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function getClass(elem) {
        return jQuery.attr(elem, "class") || ""
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression,
            dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func))
                for (; dataType = dataTypes[i++]; )
                    "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*",
                    (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0,
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport),
                inspect(dataTypeOrTransport),
                !1)
            }),
            selected
        }
        var inspected = {}
          , seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src)
            void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep),
        target
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; )
            dataTypes.shift(),
            void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
        if (dataTypes[0] in responses)
            finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType),
        responses[finalDataType]) : void 0
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1])
            for (conv in s.converters)
                converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; )
            if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response),
            !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)),
            prev = current,
            current = dataTypes.shift())
                if ("*" === current)
                    current = prev;
                else if ("*" !== prev && prev !== current) {
                    if (conv = converters[prev + " " + current] || converters["* " + current],
                    !conv)
                        for (conv2 in converters)
                            if (tmp = conv2.split(" "),
                            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0],
                                dataTypes.unshift(tmp[1]));
                                break
                            }
                    if (conv !== !0)
                        if (conv && s["throws"])
                            response = conv(response);
                        else
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                }
        return {
            state: "success",
            data: response
        }
    }
    function getDisplay(elem) {
        return elem.style && elem.style.display || jQuery.css(elem, "display")
    }
    function filterHidden(elem) {
        for (; elem && 1 === elem.nodeType; ) {
            if ("none" === getDisplay(elem) || "hidden" === elem.type)
                return !0;
            elem = elem.parentNode
        }
        return !1
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj))
            jQuery.each(obj, function(i, v) {
                traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null  != v ? i : "") + "]", v, traditional, add)
            });
        else if (traditional || "object" !== jQuery.type(obj))
            add(prefix, obj);
        else
            for (name in obj)
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1
    }
    var deletedIds = []
      , document = window.document
      , slice = deletedIds.slice
      , concat = deletedIds.concat
      , push = deletedIds.push
      , indexOf = deletedIds.indexOf
      , class2type = {}
      , toString = class2type.toString
      , hasOwn = class2type.hasOwnProperty
      , support = {}
      , version = "1.12.0"
      , jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context)
    }
      , rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , rmsPrefix = /^-ms-/
      , rdashAlpha = /-([\da-z])/gi
      , fcamelCase = function(all, letter) {
        return letter.toUpperCase()
    }
    ;
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return null  != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this,
            ret.context = this.context,
            ret
        },
        each: function(callback) {
            return jQuery.each(this, callback)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length
              , j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    },
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target,
        target = arguments[i] || {},
        i++),
        "object" == typeof target || jQuery.isFunction(target) || (target = {}),
        i === length && (target = this,
        i--); length > i; i++)
            if (null  != (options = arguments[i]))
                for (name in options)
                    src = target[name],
                    copy = options[name],
                    target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1,
                    clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {},
                    target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target
    }
    ,
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj)
        }
        ,
        isWindow: function(obj) {
            return null  != obj && obj == obj.window
        },
        isNumeric: function(obj) {
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj)
                return !1;
            return !0
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj))
                return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (e) {
                return !1
            }
            if (!support.ownFirst)
                for (key in obj)
                    return hasOwn.call(obj, key);
            for (key in obj)
                ;
            return void 0 === key || hasOwn.call(obj, key)
        },
        type: function(obj) {
            return null  == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data)
            }
            )(data)
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj))
                for (length = obj.length; length > i && callback.call(obj[i], i, obj[i]) !== !1; i++)
                    ;
            else
                for (i in obj)
                    if (callback.call(obj[i], i, obj[i]) === !1)
                        break;
            return obj
        },
        trim: function(text) {
            return null  == text ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null  != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)),
            ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf)
                    return indexOf.call(arr, elem, i);
                for (len = arr.length,
                i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++)
                    if (i in arr && arr[i] === elem)
                        return i
            }
            return -1
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; )
                first[i++] = second[j++];
            if (len !== len)
                for (; void 0 !== second[j]; )
                    first[i++] = second[j++];
            return first.length = i,
            first
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++)
                callbackInverse = !callback(elems[i], i),
                callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems))
                for (length = elems.length; length > i; i++)
                    value = callback(elems[i], i, arg),
                    null  != value && ret.push(value);
            else
                for (i in elems)
                    value = callback(elems[i], i, arg),
                    null  != value && ret.push(value);
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context],
            context = fn,
            fn = tmp),
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2),
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            }
            ,
            proxy.guid = fn.guid = fn.guid || jQuery.guid++,
            proxy) : void 0
        },
        now: function() {
            return +new Date
        },
        support: support
    }),
    "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator]),
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            if (results = results || [],
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType)
                return results;
            if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context),
            context = context || document,
            documentIsHTML)) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector)))
                    if (m = match[1]) {
                        if (9 === nodeType) {
                            if (!(elem = context.getElementById(m)))
                                return results;
                            if (elem.id === m)
                                return results.push(elem),
                                results
                        } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m)
                            return results.push(elem),
                            results
                    } else {
                        if (match[2])
                            return push.apply(results, context.getElementsByTagName(selector)),
                            results;
                        if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName)
                            return push.apply(results, context.getElementsByClassName(m)),
                            results
                    }
                if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (1 !== nodeType)
                        newContext = context,
                        newSelector = selector;
                    else if ("object" !== context.nodeName.toLowerCase()) {
                        for ((nid = context.getAttribute("id")) ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid = expando),
                        groups = tokenize(selector),
                        i = groups.length,
                        nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']"; i--; )
                            groups[i] = nidselect + " " + toSelector(groups[i]);
                        newSelector = groups.join(","),
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                    }
                    if (newSelector)
                        try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)),
                            results
                        } catch (qsaError) {} finally {
                            nid === expando && context.removeAttribute("id")
                        }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()],
                cache[key + " "] = value
            }
            var keys = [];
            return cache
        }
        function markFunction(fn) {
            return fn[expando] = !0,
            fn
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div)
            } catch (e) {
                return !1
            } finally {
                div.parentNode && div.parentNode.removeChild(div),
                div = null 
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = arr.length; i--; )
                Expr.attrHandle[arr[i]] = handler
        }
        function siblingCheck(a, b) {
            var cur = b && a
              , diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff)
                return diff;
            if (cur)
                for (; cur = cur.nextSibling; )
                    if (cur === b)
                        return -1;
            return a ? 1 : -1
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument,
                markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; )
                        seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                })
            })
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++)
                selector += tokens[i].value;
            return selector
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , checkNonElements = base && "parentNode" === dir
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (; elem = elem[dir]; )
                    if (1 === elem.nodeType || checkNonElements)
                        return matcher(elem, context, xml)
            }
             : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    for (; elem = elem[dir]; )
                        if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml))
                            return !0
                } else
                    for (; elem = elem[dir]; )
                        if (1 === elem.nodeType || checkNonElements) {
                            if (outerCache = elem[expando] || (elem[expando] = {}),
                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}),
                            (oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName)
                                return newCache[2] = oldCache[2];
                            if (uniqueCache[dir] = newCache,
                            newCache[2] = matcher(elem, context, xml))
                                return !0
                        }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; )
                    if (!matchers[i](elem, context, xml))
                        return !1;
                return !0
            }
             : matchers[0]
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++)
                Sizzle(selector, contexts[i], results);
            return results
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null  != map; len > i; i++)
                (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem),
                mapped && map.push(i));
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)),
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)),
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml),
                postFilter)
                    for (temp = condense(matcherOut, postMap),
                    postFilter(temp, [], context, xml),
                    i = temp.length; i--; )
                        (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [],
                            i = matcherOut.length; i--; )
                                (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null , matcherOut = [], temp, xml)
                        }
                        for (i = matcherOut.length; i--; )
                            (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                } else
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut),
                    postFinder ? postFinder(null , results, matcherOut, xml) : push.apply(results, matcherOut)
            })
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1
            }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null ,
                ret
            }
            ]; len > i; i++)
                if (matcher = Expr.relative[tokens[i].type])
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else {
                    if (matcher = Expr.filter[tokens[i].type].apply(null , tokens[i].matches),
                    matcher[expando]) {
                        for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++)
                            ;
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: " " === tokens[i - 2].type ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0
              , byElement = elementMatchers.length > 0
              , superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null  == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context === document || context || outermost); i !== len && null  != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0,
                        context || elem.ownerDocument === document || (setDocument(elem),
                        xml = !documentIsHTML); matcher = elementMatchers[j++]; )
                            if (matcher(elem, context || document, xml)) {
                                results.push(elem);
                                break
                            }
                        outermost && (dirruns = dirrunsUnique)
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--,
                    seed && unmatched.push(elem))
                }
                if (matchedCount += i,
                bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; )
                        matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0)
                            for (; i--; )
                                unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched),
                    outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                }
                return outermost && (dirruns = dirrunsUnique,
                outermostContext = contextBackup),
                unmatched
            }
            ;
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date, preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0),
            0
        }
        , MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++)
                if (list[i] === elem)
                    return i;
            return -1
        }
        , booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+","g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]","g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            bool: new RegExp("^(?:" + booleans + ")$","i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)","i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)","ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
        }
        , unloadHandler = function() {
            setDocument()
        }
        ;
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes),
            arr[preferredDoc.childNodes.length].nodeType
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                }
                 : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; )
                        ;
                    target.length = j - 1
                }
            }
        }
        support = Sizzle.support = {},
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1
        }
        ,
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc,
            docElem = document.documentElement,
            documentIsHTML = !isXML(document),
            (parent = document.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)),
            support.attributes = assert(function(div) {
                return div.className = "i",
                !div.getAttribute("className")
            }),
            support.getElementsByTagName = assert(function(div) {
                return div.appendChild(document.createComment("")),
                !div.getElementsByTagName("*").length
            }),
            support.getElementsByClassName = rnative.test(document.getElementsByClassName),
            support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando,
                !document.getElementsByName || !document.getElementsByName(expando).length
            }),
            support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m ? [m] : []
                }
            }
            ,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId
                }
            }
            ) : (delete Expr.find.ID,
            Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId
                }
            }
            ),
            Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0
            }
             : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (; elem = results[i++]; )
                        1 === elem.nodeType && tmp.push(elem);
                    return tmp
                }
                return results
            }
            ,
            Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return "undefined" != typeof context.getElementsByClassName && documentIsHTML ? context.getElementsByClassName(className) : void 0
            }
            ,
            rbuggyMatches = [],
            rbuggyQSA = [],
            (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"),
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"),
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="),
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"),
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]")
            }),
            assert(function(div) {
                var input = document.createElement("input");
                input.setAttribute("type", "hidden"),
                div.appendChild(input).setAttribute("name", "D"),
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="),
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"),
                div.querySelectorAll("*,:x"),
                rbuggyQSA.push(",.*:")
            })),
            (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"),
                matches.call(div, "[s!='']:x"),
                rbuggyMatches.push("!=", pseudos)
            }),
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")),
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")),
            hasCompare = rnative.test(docElem.compareDocumentPosition),
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a
                  , bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
            }
             : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            sortOrder = hasCompare ? function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1)
            }
             : function(a, b) {
                if (a === b)
                    return hasDuplicate = !0,
                    0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                if (!aup || !bup)
                    return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup)
                    return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; )
                    ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; )
                    bp.unshift(cur);
                for (; ap[i] === bp[i]; )
                    i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            }
            ,
            document) : document
        }
        ,
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null , null , elements)
        }
        ,
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem),
            expr = expr.replace(rattributeQuotes, "='$1']"),
            support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr)))
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType)
                        return ret
                } catch (e) {}
            return Sizzle(expr, document, null , [elem]).length > 0
        }
        ,
        Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context),
            contains(context, elem)
        }
        ,
        Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()]
              , val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null 
        }
        ,
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }
        ,
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates,
            sortInput = !support.sortStable && results.slice(0),
            results.sort(sortOrder),
            hasDuplicate) {
                for (; elem = results[i++]; )
                    elem === results[i] && (j = duplicates.push(i));
                for (; j--; )
                    results.splice(duplicates[j], 1)
            }
            return sortInput = null ,
            results
        }
        ,
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent)
                        return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        ret += getText(elem)
                } else if (3 === nodeType || 4 === nodeType)
                    return elem.nodeValue
            } else
                for (; node = elem[i++]; )
                    ret += getText(node);
            return ret
        }
        ,
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape),
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape),
                    "~=" === match[2] && (match[3] = " " + match[3] + " "),
                    match.slice(0, 4)
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(),
                    "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]),
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])),
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]),
                    match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null  : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess),
                    match[2] = unquoted.slice(0, excess)),
                    match.slice(0, 3))
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0
                    }
                     : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "")
                    })
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null  == result ? "!=" === operator : operator ? (result += "",
                        "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3)
                      , forward = "last" !== type.slice(-4)
                      , ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode
                    }
                     : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                        if (parent) {
                            if (simple) {
                                for (; dir; ) {
                                    for (node = elem; node = node[dir]; )
                                        if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType)
                                            return !1;
                                    start = dir = "only" === type && !start && "nextSibling"
                                }
                                return !0
                            }
                            if (start = [forward ? parent.firstChild : parent.lastChild],
                            forward && useCache) {
                                for (node = parent,
                                outerCache = node[expando] || (node[expando] = {}),
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}),
                                cache = uniqueCache[type] || [],
                                nodeIndex = cache[0] === dirruns && cache[1],
                                diff = nodeIndex && cache[2],
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); )
                                    if (1 === node.nodeType && ++diff && node === elem) {
                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                            } else if (useCache && (node = elem,
                            outerCache = node[expando] || (node[expando] = {}),
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}),
                            cache = uniqueCache[type] || [],
                            nodeIndex = cache[0] === dirruns && cache[1],
                            diff = nodeIndex),
                            diff === !1)
                                for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}),
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}),
                                uniqueCache[type] = [dirruns, diff]),
                                node !== elem)); )
                                    ;
                            return diff -= last,
                            diff === first || diff % first === 0 && diff / first >= 0
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument],
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; )
                            idx = indexOf(seed, matched[i]),
                            seed[idx] = !(matches[idx] = matched[i])
                    }) : function(elem) {
                        return fn(elem, 0, args)
                    }
                    ) : fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null , xml, []), i = seed.length; i--; )
                            (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                    }) : function(elem, context, xml) {
                        return input[0] = elem,
                        matcher(input, null , xml, results),
                        input[0] = null ,
                        !results.pop()
                    }
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape),
                    function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang),
                    lang = lang.replace(runescape, funescape).toLowerCase(),
                    function(elem) {
                        var elemLang;
                        do
                            if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))
                                return elemLang = elemLang.toLowerCase(),
                                elemLang === lang || 0 === elemLang.indexOf(lang + "-");
                        while ((elem = elem.parentNode) && 1 === elem.nodeType);return !1
                    }
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return elem.disabled === !1
                },
                disabled: function(elem) {
                    return elem.disabled === !0
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex,
                    elem.selected === !0
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                        if (elem.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null  == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0 > argument ? argument + length : argument]
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2)
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; )
                        matchIndexes.push(i);
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; )
                        matchIndexes.push(i);
                    return matchIndexes
                })
            }
        },
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        })
            Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos,
        Expr.setFilters = new setFilters,
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached)
                return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector,
            groups = [],
            preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar),
                groups.push(tokens = [])),
                matched = !1,
                (match = rcombinators.exec(soFar)) && (matched = match.shift(),
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }),
                soFar = soFar.slice(matched.length));
                for (type in Expr.filter)
                    !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(),
                    tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }),
                    soFar = soFar.slice(matched.length));
                if (!matched)
                    break
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        ,
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)),
                i = match.length; i--; )
                    cached = matcherFromTokens(match[i]),
                    cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)),
                cached.selector = selector
            }
            return cached
        }
        ,
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [],
            1 === match.length) {
                if (tokens = match[0] = match[0].slice(0),
                tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0],
                    !context)
                        return results;
                    compiled && (context = context.parentNode),
                    selector = selector.slice(tokens.shift().value.length)
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i],
                !Expr.relative[type = token.type]); )
                    if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                        if (tokens.splice(i, 1),
                        selector = seed.length && toSelector(tokens),
                        !selector)
                            return push.apply(results, seed),
                            results;
                        break
                    }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context),
            results
        }
        ,
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando,
        support.detectDuplicates = !!hasDuplicate,
        setDocument(),
        support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"))
        }),
        assert(function(div) {
            return div.innerHTML = "<a href='#'></a>",
            "#" === div.firstChild.getAttribute("href")
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
        }),
        support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>",
            div.firstChild.setAttribute("value", ""),
            "" === div.firstChild.getAttribute("value")
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
        }),
        assert(function(div) {
            return null  == div.getAttribute("disabled")
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null 
        }),
        Sizzle
    }(window);
    jQuery.find = Sizzle,
    jQuery.expr = Sizzle.selectors,
    jQuery.expr[":"] = jQuery.expr.pseudos,
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort,
    jQuery.text = Sizzle.getText,
    jQuery.isXMLDoc = Sizzle.isXML,
    jQuery.contains = Sizzle.contains;
    var dir = function(elem, dir, until) {
        for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; )
            if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until))
                    break;
                matched.push(elem)
            }
        return matched
    }
      , siblings = function(n, elem) {
        for (var matched = []; n; n = n.nextSibling)
            1 === n.nodeType && n !== elem && matched.push(n);
        return matched
    }
      , rneedsContext = jQuery.expr.match.needsContext
      , rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"),
        1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType
        }))
    }
    ,
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector)
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; len > i; i++)
                        if (jQuery.contains(self[i], this))
                            return !0
                }));
            for (i = 0; len > i; i++)
                jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret),
            ret.selector = this.selector ? this.selector + " " + selector : selector,
            ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0))
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector)
            return this;
        if (root = root || rootjQuery,
        "string" == typeof selector) {
            if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null , selector, null ] : rquickExpr.exec(selector),
            !match || !match[1] && context)
                return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context,
                jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)),
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                    for (match in context)
                        jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this
            }
            if (elem = document.getElementById(match[2]),
            elem && elem.parentNode) {
                if (elem.id !== match[2])
                    return rootjQuery.find(selector);
                this.length = 1,
                this[0] = elem
            }
            return this.context = document,
            this.selector = selector,
            this
        }
        return selector.nodeType ? (this.context = this[0] = selector,
        this.length = 1,
        this) : jQuery.isFunction(selector) ? "undefined" != typeof root.ready ? root.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector,
        this.context = selector.context),
        jQuery.makeArray(selector, this))
    }
    ;
    init.prototype = jQuery.fn,
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/
      , guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++)
                    if (jQuery.contains(this, targets[i]))
                        return !0
            })
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(null  == selector ? this.prevObject : this.prevObject.filter(selector))
        }
    }),
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null 
        },
        parents: function(elem) {
            return dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return siblings(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until),
            selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)),
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.uniqueSort(ret)),
            rparentsprev.test(name) && (ret = ret.reverse())),
            this.pushStack(ret)
        }
    });
    var rnotwhite = /\S+/g;
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            for (locked = options.once,
            fired = firing = !0; queue.length; firingIndex = -1)
                for (memory = queue.shift(); ++firingIndex < list.length; )
                    list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length,
                    memory = !1);
            options.memory || (memory = !1),
            firing = !1,
            locked && (list = memory ? [] : "")
        }
        , self = {
            add: function() {
                return list && (memory && !firing && (firingIndex = list.length - 1,
                queue.push(memory)),
                function add(args) {
                    jQuery.each(args, function(_, arg) {
                        jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg)
                    })
                }(arguments),
                memory && !firing && fire()),
                this
            },
            remove: function() {
                return jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; )
                        list.splice(index, 1),
                        firingIndex >= index && firingIndex--
                }),
                this
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0
            },
            empty: function() {
                return list && (list = []),
                this
            },
            disable: function() {
                return locked = queue = [],
                list = memory = "",
                this
            },
            disabled: function() {
                return !list
            },
            lock: function() {
                return locked = !0,
                memory || self.disable(),
                this
            },
            locked: function() {
                return !!locked
            },
            fireWith: function(context, args) {
                return locked || (args = args || [],
                args = [context, args.slice ? args.slice() : args],
                queue.push(args),
                firing || fire()),
                this
            },
            fire: function() {
                return self.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!fired
            }
        };
        return self
    }
    ,
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                            })
                        }),
                        fns = null 
                    }).promise()
                },
                promise: function(obj) {
                    return null  != obj ? jQuery.extend(obj, promise) : promise
                }
            }
              , deferred = {};
            return promise.pipe = promise.then,
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[3];
                promise[tuple[1]] = list.add,
                stateString && list.add(function() {
                    state = stateString
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock),
                deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments),
                    this
                }
                ,
                deferred[tuple[0] + "With"] = list.fireWith
            }),
            promise.promise(deferred),
            func && func.call(deferred, deferred),
            deferred
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this,
                    values[i] = arguments.length > 1 ? slice.call(arguments) : value,
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                }
            }
            ;
            if (length > 1)
                for (progressValues = new Array(length),
                progressContexts = new Array(length),
                resolveContexts = new Array(length); length > i; i++)
                    resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues),
            deferred.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn),
        this
    }
    ,
    jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0,
            wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]),
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"),
            jQuery(document).off("ready"))))
        }
    }),
    jQuery.ready.promise = function(obj) {
        if (!readyList)
            if (readyList = jQuery.Deferred(),
            "complete" === document.readyState)
                window.setTimeout(jQuery.ready);
            else if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", completed),
                window.addEventListener("load", completed);
            else {
                document.attachEvent("onreadystatechange", completed),
                window.attachEvent("onload", completed);
                var top = !1;
                try {
                    top = null  == window.frameElement && document.documentElement
                } catch (e) {}
                top && top.doScroll && !function doScrollCheck() {
                    if (!jQuery.isReady) {
                        try {
                            top.doScroll("left")
                        } catch (e) {
                            return window.setTimeout(doScrollCheck, 50)
                        }
                        detach(),
                        jQuery.ready()
                    }
                }()
            }
        return readyList.promise(obj)
    }
    ,
    jQuery.ready.promise();
    var i;
    for (i in jQuery(support))
        break;
    support.ownFirst = "0" === i,
    support.inlineBlockNeedsLayout = !1,
    jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0],
        body && body.style && (div = document.createElement("div"),
        container = document.createElement("div"),
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        body.appendChild(container).appendChild(div),
        "undefined" != typeof div.style.zoom && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth,
        val && (body.style.zoom = 1)),
        body.removeChild(container))
    }),
    function() {
        var div = document.createElement("div");
        support.deleteExpando = !0;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = !1
        }
        div = null 
    }();
    var acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()]
          , nodeType = +elem.nodeType || 1;
        return 1 !== nodeType && 9 !== nodeType ? !1 : !noData || noData !== !0 && elem.getAttribute("classid") === noData
    }
      , rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando],
            !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data)
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name)
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0)
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0)
        }
    }),
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem),
                1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--; )
                        attrs[i] && (name = attrs[i].name,
                        0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)),
                        dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key)
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value)
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    }),
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue",
            queue = jQuery._data(elem, type),
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)),
            queue || []) : void 0
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type)
            }
            ;
            "inprogress" === fn && (fn = queue.shift(),
            startLength--),
            fn && ("fx" === type && queue.unshift("inprogress"),
            delete hooks.stop,
            fn.call(elem, next, hooks)),
            !startLength && hooks && hooks.empty.fire()
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"),
                    jQuery._removeData(elem, key)
                })
            })
        }
    }),
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type,
            type = "fx",
            setter--),
            arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type),
                "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [elements])
            }
            ;
            for ("string" != typeof type && (obj = type,
            type = void 0),
            type = type || "fx"; i--; )
                tmp = jQuery._data(elements[i], type + "queueHooks"),
                tmp && tmp.empty && (count++,
                tmp.empty.add(resolve));
            return resolve(),
            defer.promise(obj)
        }
    }),
    function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null  != shrinkWrapBlocksVal)
                return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0],
            body && body.style ? (div = document.createElement("div"),
            container = document.createElement("div"),
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            body.appendChild(container).appendChild(div),
            "undefined" != typeof div.style.zoom && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            div.appendChild(document.createElement("div")).style.width = "5px",
            shrinkWrapBlocksVal = 3 !== div.offsetWidth),
            body.removeChild(container),
            shrinkWrapBlocksVal) : void 0
        }
    }();
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$","i")
      , cssExpand = ["Top", "Right", "Bottom", "Left"]
      , isHidden = function(elem, el) {
        return elem = el || elem,
        "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
    }
      , access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0
          , length = elems.length
          , bulk = null  == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key)
                access(elems, fn, i, key[i], !0, emptyGet, raw)
        } else if (void 0 !== value && (chainable = !0,
        jQuery.isFunction(value) || (raw = !0),
        bulk && (raw ? (fn.call(elems, value),
        fn = null ) : (bulk = fn,
        fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value)
        }
        )),
        fn))
            for (; length > i; i++)
                fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
    }
      , rcheckableType = /^(?:checkbox|radio)$/i
      , rtagName = /<([\w:-]+)/
      , rscriptType = /^$|\/(?:java|ecma)script/i
      , rleadingWhitespace = /^\s+/
      , nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var div = document.createElement("div")
          , fragment = document.createDocumentFragment()
          , input = document.createElement("input");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        support.leadingWhitespace = 3 === div.firstChild.nodeType,
        support.tbody = !div.getElementsByTagName("tbody").length,
        support.htmlSerialize = !!div.getElementsByTagName("link").length,
        support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
        input.type = "checkbox",
        input.checked = !0,
        fragment.appendChild(input),
        support.appendChecked = input.checked,
        div.innerHTML = "<textarea>x</textarea>",
        support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue,
        fragment.appendChild(div),
        input = document.createElement("input"),
        input.setAttribute("type", "radio"),
        input.setAttribute("checked", "checked"),
        input.setAttribute("name", "t"),
        div.appendChild(input),
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked,
        support.noCloneEvent = !!div.addEventListener,
        div[jQuery.expando] = 1,
        support.attributes = !div.getAttribute(jQuery.expando)
    }();
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    wrapMap.optgroup = wrapMap.option,
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead,
    wrapMap.th = wrapMap.td;
    var rhtml = /<|&#?\w+;/
      , rtbody = /<tbody/i;
    !function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            eventName = "on" + i,
            (support[i] = eventName in window) || (div.setAttribute(eventName, "t"),
            support[i] = div.attributes[eventName].expando === !1);
        div = null 
    }();
    var rformElems = /^(?:input|select|textarea)$/i
      , rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
      , rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler,
                handler = handleObjIn.handler,
                selector = handleObjIn.selector),
                handler.guid || (handler.guid = jQuery.guid++),
                (events = elemData.events) || (events = elemData.events = {}),
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                }
                ,
                eventHandle.elem = elem),
                types = (types || "").match(rnotwhite) || [""],
                t = types.length; t--; )
                    tmp = rtypenamespace.exec(types[t]) || [],
                    type = origType = tmp[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type && (special = jQuery.event.special[type] || {},
                    type = (selector ? special.delegateType : special.bindType) || type,
                    special = jQuery.event.special[type] || {},
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn),
                    (handlers = events[type]) || (handlers = events[type] = [],
                    handlers.delegateCount = 0,
                    special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))),
                    special.add && (special.add.call(elem, handleObj),
                    handleObj.handler.guid || (handleObj.handler.guid = handler.guid)),
                    selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj),
                    jQuery.event.global[type] = !0);
                elem = null 
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [""],
                t = types.length; t--; )
                    if (tmp = rtypenamespace.exec(types[t]) || [],
                    type = origType = tmp[1],
                    namespaces = (tmp[2] || "").split(".").sort(),
                    type) {
                        for (special = jQuery.event.special[type] || {},
                        type = (selector ? special.delegateType : special.bindType) || type,
                        handlers = events[type] || [],
                        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        origCount = j = handlers.length; j--; )
                            handleObj = handlers[j],
                            !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1),
                            handleObj.selector && handlers.delegateCount--,
                            special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle),
                        delete events[type])
                    } else
                        for (type in events)
                            jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle,
                jQuery._removeData(elem, "events"))
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document,
            3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."),
            type = namespaces.shift(),
            namespaces.sort()),
            ontype = type.indexOf(":") < 0 && "on" + type,
            event = event[jQuery.expando] ? event : new jQuery.Event(type,"object" == typeof event && event),
            event.isTrigger = onlyHandlers ? 2 : 3,
            event.namespace = namespaces.join("."),
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
            event.result = void 0,
            event.target || (event.target = elem),
            data = null  == data ? [event] : jQuery.makeArray(data, [event]),
            special = jQuery.event.special[type] || {},
            onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type,
                    rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode)
                        eventPath.push(cur),
                        tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); )
                    event.type = i > 1 ? bubbleType : special.bindType || type,
                    handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"),
                    handle && handle.apply(cur, data),
                    handle = ontype && cur[ontype],
                    handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data),
                    event.result === !1 && event.preventDefault());
                if (event.type = type,
                !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype],
                    tmp && (elem[ontype] = null ),
                    jQuery.event.triggered = type;
                    try {
                        elem[type]()
                    } catch (e) {}
                    jQuery.event.triggered = void 0,
                    tmp && (elem[ontype] = tmp)
                }
                return event.result
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event,
            event.delegateTarget = this,
            !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers),
                i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); )
                    for (event.currentTarget = matched.elem,
                    j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); )
                        (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) && (event.handleObj = handleObj,
                        event.data = handleObj.data,
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args),
                        void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(),
                        event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event),
                event.result
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && ("click" !== event.type || isNaN(event.button) || event.button < 1))
                for (; cur != this; cur = cur.parentNode || this)
                    if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                        for (matches = [],
                        i = 0; delegateCount > i; i++)
                            handleObj = handlers[i],
                            sel = handleObj.selector + " ",
                            void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null , [cur]).length),
                            matches[sel] && matches.push(handleObj);
                        matches.length && handlerQueue.push({
                            elem: cur,
                            handlers: matches
                        })
                    }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }),
            handlerQueue
        },
        fix: function(event) {
            if (event[jQuery.expando])
                return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}),
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props,
            event = new jQuery.Event(originalEvent),
            i = copy.length; i--; )
                prop = copy[i],
                event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document),
            3 === event.target.nodeType && (event.target = event.target.parentNode),
            event.metaKey = !!event.metaKey,
            fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null  == event.which && (event.which = null  != original.charCode ? original.charCode : original.keyCode),
                event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null  == event.pageX && null  != original.clientX && (eventDoc = event.target.ownerDocument || document,
                doc = eventDoc.documentElement,
                body = eventDoc.body,
                event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0),
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)),
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement),
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0),
                event
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                }
            }
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: !0
            });
            jQuery.event.trigger(e, null , elem),
            e.isDefaultPrevented() && event.preventDefault()
        }
    },
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle)
    }
     : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && ("undefined" == typeof elem[name] && (elem[name] = null ),
        elem.detachEvent(name, handle))
    }
    ,
    jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src,
        this.type = src.type,
        this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src,
        props && jQuery.extend(this, props),
        this.timeStamp = src && src.timeStamp || jQuery.now(),
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src,props)
    }
    ,
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue,
            e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType,
                ret = handleObj.handler.apply(this, arguments),
                event.type = fix),
                ret
            }
        }
    }),
    support.submit || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target
                  , form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? jQuery.prop(elem, "form") : void 0;
                form && !jQuery._data(form, "submit") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submitBubble = !0
                }),
                jQuery._data(form, "submit", !0))
            })
        },
        postDispatch: function(event) {
            event._submitBubble && (delete event._submitBubble,
            this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event))
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit")
        }
    }),
    support.change || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._justChanged = !0)
            }),
            jQuery.event.add(this, "click._change", function(event) {
                this._justChanged && !event.isTrigger && (this._justChanged = !1),
                jQuery.event.simulate("change", this, event)
            })),
            !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "change") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event)
                }),
                jQuery._data(elem, "change", !0))
            })
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"),
            !rformElems.test(this.nodeName)
        }
    }),
    support.focusin || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event))
        }
        ;
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this
                  , attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0),
                jQuery._data(doc, fix, (attaches || 0) + 1)
            },
            teardown: function() {
                var doc = this.ownerDocument || this
                  , attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0),
                jQuery._removeData(doc, fix))
            }
        }
    }),
    jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn)
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj)
                return handleObj = types.handleObj,
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler),
                this;
            if ("object" == typeof types) {
                for (type in types)
                    this.off(type, selector, types[type]);
                return this
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector,
            selector = void 0),
            fn === !1 && (fn = returnFalse),
            this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
        }
    });
    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g
      , rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]","i")
      , rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , rnoInnerhtml = /<script|<style|<link/i
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptTypeMasked = /^true\/(.*)/
      , rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , safeFragment = createSafeFragment(document)
      , fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>")
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML,
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)),
            !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (destElements = getAll(clone),
                srcElements = getAll(elem),
                i = 0; null  != (node = srcElements[i]); ++i)
                    destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents)
                if (deepDataAndEvents)
                    for (srcElements = srcElements || getAll(elem),
                    destElements = destElements || getAll(clone),
                    i = 0; null  != (node = srcElements[i]); i++)
                        cloneCopyEvent(node, destElements[i]);
                else
                    cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"),
            destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")),
            destElements = srcElements = node = null ,
            clone
        },
        cleanData: function(elems, forceAcceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, attributes = support.attributes, special = jQuery.event.special; null  != (elem = elems[i]); i++)
                if ((forceAcceptData || acceptData(elem)) && (id = elem[internalKey],
                data = id && cache[id])) {
                    if (data.events)
                        for (type in data.events)
                            special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    cache[id] && (delete cache[id],
                    attributes || "undefined" == typeof elem.removeAttribute ? elem[internalKey] = void 0 : elem.removeAttribute(internalKey),
                    deletedIds.push(id))
                }
        }
    }),
    jQuery.fn.extend({
        domManip: domManip,
        detach: function(selector) {
            return remove(this, selector, !0)
        },
        remove: function(selector) {
            return remove(this, selector)
        },
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null , value, arguments.length)
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this)
            })
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
            })
        },
        empty: function() {
            for (var elem, i = 0; null  != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; )
                    elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0)
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null  == dataAndEvents ? !1 : dataAndEvents,
            deepDataAndEvents = null  == deepDataAndEvents ? dataAndEvents : deepDataAndEvents,
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (void 0 === value)
                    return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (; l > i; i++)
                            elem = this[i] || {},
                            1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)),
                            elem.innerHTML = value);
                        elem = 0
                    } catch (e) {}
                }
                elem && this.empty().append(value)
            }, null , value, arguments.length)
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)),
                parent && parent.replaceChild(elem, this))
            }, ignored)
        }
    }),
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++)
                elems = i === last ? this : this.clone(!0),
                jQuery(insert[i])[original](elems),
                push.apply(ret, elems.get());
            return this.pushStack(ret)
        }
    });
    var iframe, elemdisplay = {
        HTML: "block",
        BODY: "block"
    }, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$","i"), swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options)
            old[name] = elem.style[name],
            elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options)
            elem.style[name] = old[name];
        return ret
    }
    , documentElement = document.documentElement;
    !function() {
        function computeStyleTests() {
            var contents, divStyle, documentElement = document.documentElement;
            documentElement.appendChild(container),
            div.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
            pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = !1,
            pixelMarginRightVal = reliableMarginRightVal = !0,
            window.getComputedStyle && (divStyle = window.getComputedStyle(div),
            pixelPositionVal = "1%" !== (divStyle || {}).top,
            reliableMarginLeftVal = "2px" === (divStyle || {}).marginLeft,
            boxSizingReliableVal = "4px" === (divStyle || {
                width: "4px"
            }).width,
            div.style.marginRight = "50%",
            pixelMarginRightVal = "4px" === (divStyle || {
                marginRight: "4px"
            }).marginRight,
            contents = div.appendChild(document.createElement("div")),
            contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            contents.style.marginRight = contents.style.width = "0",
            div.style.width = "1px",
            reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight),
            div.removeChild(contents)),
            div.style.display = "none",
            reliableHiddenOffsetsVal = 0 === div.getClientRects().length,
            reliableHiddenOffsetsVal && (div.style.display = "",
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            contents = div.getElementsByTagName("td"),
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight,
            reliableHiddenOffsetsVal && (contents[0].style.display = "",
            contents[1].style.display = "none",
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight)),
            documentElement.removeChild(container)
        }
        var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.cssText = "float:left;opacity:.5",
        support.opacity = "0.5" === div.style.opacity,
        support.cssFloat = !!div.style.cssFloat,
        div.style.backgroundClip = "content-box",
        div.cloneNode(!0).style.backgroundClip = "",
        support.clearCloneStyle = "content-box" === div.style.backgroundClip,
        container = document.createElement("div"),
        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        div.innerHTML = "",
        container.appendChild(div),
        support.boxSizing = "" === div.style.boxSizing || "" === div.style.MozBoxSizing || "" === div.style.WebkitBoxSizing,
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                reliableHiddenOffsetsVal
            },
            boxSizingReliable: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                boxSizingReliableVal
            },
            pixelMarginRight: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                pixelMarginRightVal
            },
            pixelPosition: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                pixelPositionVal
            },
            reliableMarginRight: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                reliableMarginRightVal
            },
            reliableMarginLeft: function() {
                return null  == pixelPositionVal && computeStyleTests(),
                reliableMarginLeftVal
            }
        }))
    }();
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        return view.opener || (view = window),
        view.getComputedStyle(elem)
    }
    ,
    curCSS = function(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem),
        ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0,
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)),
        !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width,
        minWidth = style.minWidth,
        maxWidth = style.maxWidth,
        style.minWidth = style.maxWidth = style.width = ret,
        ret = computed.width,
        style.width = width,
        style.minWidth = minWidth,
        style.maxWidth = maxWidth)),
        void 0 === ret ? ret : ret + ""
    }
    ) : documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle
    }
    ,
    curCSS = function(elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        return computed = computed || getStyles(elem),
        ret = computed ? computed[name] : void 0,
        null  == ret && style && style[name] && (ret = style[name]),
        rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left,
        rs = elem.runtimeStyle,
        rsLeft = rs && rs.left,
        rsLeft && (rs.left = elem.currentStyle.left),
        style.left = "fontSize" === name ? "1em" : ret,
        ret = style.pixelLeft + "px",
        style.left = left,
        rsLeft && (rs.left = rsLeft)),
        void 0 === ret ? ret : ret + "" || "auto"
    }
    );
    var ralpha = /alpha\([^)]*\)/i
      , ropacity = /opacity\s*=\s*([^)]*)/i
      , rdisplayswap = /^(none|table(?!-c[ea]).+)/
      , rnumsplit = new RegExp("^(" + pnum + ")(.*)$","i")
      , cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , cssPrefixes = ["Webkit", "O", "Moz", "ms"]
      , emptyStyle = document.createElement("div").style;
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName),
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
                void 0 === value)
                    return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value,
                "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret),
                type = "number"),
                null  != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")),
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"),
                !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)))))
                    try {
                        style[name] = value
                    } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName),
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName],
            hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)),
            void 0 === val && (val = curCSS(elem, name, styles)),
            "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]),
            "" === extra || extra ? (num = parseFloat(val),
            extra === !0 || isFinite(num) ? num || 0 : val) : val
        }
    }),
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra)
                }) : getWidthOrHeight(elem, name, extra) : void 0
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
            }
        }
    }),
    support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
        },
        set: function(elem, value) {
            var style = elem.style
              , currentStyle = elem.currentStyle
              , opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : ""
              , filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1,
            (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"),
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
        }
    }),
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? swap(elem, {
            display: "inline-block"
        }, curCSS, [elem, "marginRight"]) : void 0
    }),
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        return computed ? (parseFloat(curCSS(elem, "marginLeft")) || (jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, {
            marginLeft: 0
        }, function() {
            return elem.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }),
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++)
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        },
        rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    }),
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem),
                    len = name.length; len > i; i++)
                        map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }),
    jQuery.Tween = Tween,
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem,
            this.prop = prop,
            this.easing = easing || jQuery.easing._default,
            this.options = options,
            this.start = this.now = this.cur(),
            this.end = end,
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent,
            this.now = (this.end - this.start) * eased + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this),
            this
        }
    },
    Tween.prototype.init.prototype = Tween.prototype,
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return 1 !== tween.elem.nodeType || null  != tween.elem[tween.prop] && null  == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""),
                result && "auto" !== result ? result : 0)
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null  == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
            }
        }
    },
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    },
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        },
        _default: "swing"
    },
    jQuery.fx = Tween.prototype.init,
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value);
                return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween),
                tween
            }
            ]
        },
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props,
            props = ["*"]) : props = props.match(rnotwhite);
            for (var prop, index = 0, length = props.length; length > index; index++)
                prop = props[index],
                Animation.tweeners[prop] = Animation.tweeners[prop] || [],
                Animation.tweeners[prop].unshift(callback)
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
            prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback)
        }
    }),
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default,
        (null  == opt.queue || opt.queue === !0) && (opt.queue = "fx"),
        opt.old = opt.complete,
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this),
            opt.queue && jQuery.dequeue(this, opt.queue)
        }
        ,
        opt
    }
    ,
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0)
            }
            ;
            return doAnimation.finish = doAnimation,
            empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop,
                stop(gotoEnd)
            }
            ;
            return "string" != typeof type && (gotoEnd = clearQueue,
            clearQueue = type,
            type = void 0),
            clearQueue && type !== !1 && this.queue(type || "fx", []),
            this.each(function() {
                var dequeue = !0
                  , index = null  != type && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = jQuery._data(this);
                if (index)
                    data[index] && data[index].stop && stopQueue(data[index]);
                else
                    for (index in data)
                        data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; )
                    timers[index].elem !== this || null  != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd),
                    dequeue = !1,
                    timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
            })
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"),
            this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0,
                jQuery.queue(this, type, []),
                hooks && hooks.stop && hooks.stop.call(this, !0),
                index = timers.length; index--; )
                    timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0),
                    timers.splice(index, 1));
                for (index = 0; length > index; index++)
                    queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish
            })
        }
    }),
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null  == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
        }
    }),
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    }),
    jQuery.timers = [],
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++)
            timer = timers[i],
            timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(),
        fxNow = void 0
    }
    ,
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer),
        timer() ? jQuery.fx.start() : jQuery.timers.pop()
    }
    ,
    jQuery.fx.interval = 13,
    jQuery.fx.start = function() {
        timerId || (timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }
    ,
    jQuery.fx.stop = function() {
        window.clearInterval(timerId),
        timerId = null 
    }
    ,
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time,
        type = type || "fx",
        this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout)
            }
        })
    }
    ,
    function() {
        var a, input = document.createElement("input"), div = document.createElement("div"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        div = document.createElement("div"),
        div.setAttribute("className", "t"),
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        a = div.getElementsByTagName("a")[0],
        input.setAttribute("type", "checkbox"),
        div.appendChild(input),
        a = div.getElementsByTagName("a")[0],
        a.style.cssText = "top:1px",
        support.getSetAttribute = "t" !== div.className,
        support.style = /top/.test(a.getAttribute("style")),
        support.hrefNormalized = "/a" === a.getAttribute("href"),
        support.checkOn = !!input.value,
        support.optSelected = opt.selected,
        support.enctype = !!document.createElement("form").enctype,
        select.disabled = !0,
        support.optDisabled = !opt.disabled,
        input = document.createElement("input"),
        input.setAttribute("value", ""),
        support.input = "" === input.getAttribute("value"),
        input.value = "t",
        input.setAttribute("type", "radio"),
        support.radioValue = "t" === input.value
    }();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length)
                    return isFunction = jQuery.isFunction(value),
                    this.each(function(i) {
                        var val;
                        1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value,
                        null  == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                            return null  == value ? "" : value + ""
                        })),
                        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()],
                        hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                    });
                if (elem)
                    return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()],
                    hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value,
                    "string" == typeof ret ? ret.replace(rreturn, "") : null  == ret ? "" : ret)
            }
        }
    }),
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null  != val ? val : jQuery.trim(jQuery.text(elem))
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null  : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                        if (option = options[i],
                        (option.selected || i === index) && (support.optDisabled ? !option.disabled : null  === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(),
                            one)
                                return value;
                            values.push(value)
                        }
                    return values
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; )
                        if (option = options[i],
                        jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0)
                            try {
                                option.selected = optionSet = !0
                            } catch (_) {
                                option.scrollHeight
                            }
                        else
                            option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1),
                    options
                }
            }
        }
    }),
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1 : void 0
            }
        },
        support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null  === elem.getAttribute("value") ? "on" : elem.value
        }
        )
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        }
    }),
    jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType)
                return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(),
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)),
                void 0 !== value ? null  === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""),
                value) : hooks && "get" in hooks && null  !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name),
                null  == ret ? void 0 : ret))
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value),
                        val && (elem.value = val),
                        value
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType)
                for (; name = attrNames[i++]; )
                    propName = jQuery.propFix[name] || name,
                    jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""),
                    elem.removeAttribute(getSetAttribute ? name : propName)
        }
    }),
    boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0,
            name
        }
    },
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        getSetInput && getSetAttribute || !ruseDefault.test(name) ? attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name],
            attrHandle[name] = ret,
            ret = null  != getter(elem, name, isXML) ? name.toLowerCase() : null ,
            attrHandle[name] = handle),
            ret
        }
         : attrHandle[name] = function(elem, name, isXML) {
            return isXML ? void 0 : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null 
        }
    }),
    getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name)
        }
    }),
    getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)),
            ret.value = value += "",
            "value" === name || value === elem.getAttribute(name) ? value : void 0
        }
    },
    attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? void 0 : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null 
    }
    ,
    jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : void 0
        },
        set: nodeHook.set
    },
    jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name)
        }
    },
    jQuery.each(["width", "height"], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"),
                value) : void 0
            }
        }
    })),
    support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0
        },
        set: function(elem, value) {
            return elem.style.cssText = value + ""
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i
      , rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name,
            this.each(function() {
                try {
                    this[name] = void 0,
                    delete this[name]
                } catch (e) {}
            })
        }
    }),
    jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType)
                return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name,
                hooks = jQuery.propHooks[name]),
                void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null  !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    support.hrefNormalized || jQuery.each(["href", "src"], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4)
            }
        }
    }),
    support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex,
            parent.parentNode && parent.parentNode.selectedIndex),
            null 
        }
    }),
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    }),
    support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)))
                });
            if ("string" == typeof value && value)
                for (classes = value.match(rnotwhite) || []; elem = this[i++]; )
                    if (curValue = getClass(elem),
                    cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                        for (j = 0; clazz = classes[j++]; )
                            cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                        finalValue = jQuery.trim(cur),
                        curValue !== finalValue && jQuery.attr(elem, "class", finalValue)
                    }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value))
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof value && value)
                for (classes = value.match(rnotwhite) || []; elem = this[i++]; )
                    if (curValue = getClass(elem),
                    cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                        for (j = 0; clazz = classes[j++]; )
                            for (; cur.indexOf(" " + clazz + " ") > -1; )
                                cur = cur.replace(" " + clazz + " ", " ");
                        finalValue = jQuery.trim(cur),
                        curValue !== finalValue && jQuery.attr(elem, "class", finalValue)
                    }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal)
            }) : this.each(function() {
                var className, i, self, classNames;
                if ("string" === type)
                    for (i = 0,
                    self = jQuery(this),
                    classNames = value.match(rnotwhite) || []; className = classNames[i++]; )
                        self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else
                    (void 0 === value || "boolean" === type) && (className = getClass(this),
                    className && jQuery._data(this, "__className__", className),
                    jQuery.attr(this, "class", className || value === !1 ? "" : jQuery._data(this, "__className__") || ""))
            })
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            for (className = " " + selector + " "; elem = this[i++]; )
                if (1 === elem.nodeType && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1)
                    return !0;
            return !1
        }
    }),
    jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null , data, fn) : this.trigger(name)
        }
    }),
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    var location = window.location
      , nonce = jQuery.now()
      , rquery = /\?/
      , rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse)
            return window.JSON.parse(data + "");
        var requireNonComma, depth = null , str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0),
            0 === depth ? token : (requireNonComma = open || comma,
            depth += !close - !open,
            "")
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data)
    }
    ,
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data)
            return null ;
        try {
            window.DOMParser ? (tmp = new window.DOMParser,
            xml = tmp.parseFromString(data, "text/xml")) : (xml = new window.ActiveXObject("Microsoft.XMLDOM"),
            xml.async = "false",
            xml.loadXML(data))
        } catch (e) {
            xml = void 0
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data),
        xml
    }
    ;
    var rhash = /#.*$/
      , rts = /([?&])_=[^&]*/
      , rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , rnoContent = /^(?:GET|HEAD)$/
      , rprotocol = /^\/\//
      , rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , prefilters = {}
      , transports = {}
      , allTypes = "*/".concat("*")
      , ajaxLocation = location.href
      , ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2,
                timeoutTimer && window.clearTimeout(timeoutTimer),
                transport = void 0,
                responseHeadersString = headers || "",
                jqXHR.readyState = status > 0 ? 4 : 0,
                isSuccess = status >= 200 && 300 > status || 304 === status,
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)),
                response = ajaxConvert(s, response, jqXHR, isSuccess),
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"),
                modified && (jQuery.lastModified[cacheURL] = modified),
                modified = jqXHR.getResponseHeader("etag"),
                modified && (jQuery.etag[cacheURL] = modified)),
                204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state,
                success = response.data,
                error = response.error,
                isSuccess = !error)) : (error = statusText,
                (status || !statusText) && (statusText = "error",
                0 > status && (status = 0))),
                jqXHR.status = status,
                jqXHR.statusText = (nativeStatusText || statusText) + "",
                isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]),
                jqXHR.statusCode(statusCode),
                statusCode = void 0,
                fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]),
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]),
                fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]),
                --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url,
            url = void 0),
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders)
                            for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); )
                                responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return null  == match ? null  : match
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null 
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name,
                    requestHeaders[name] = value),
                    this
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type),
                    this
                },
                statusCode: function(map) {
                    var code;
                    if (map)
                        if (2 > state)
                            for (code in map)
                                statusCode[code] = [statusCode[code], map[code]];
                        else
                            jqXHR.always(map[jqXHR.status]);
                    return this
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText),
                    done(0, finalText),
                    this
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add,
            jqXHR.success = jqXHR.done,
            jqXHR.error = jqXHR.fail,
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"),
            s.type = options.method || options.type || s.method || s.type,
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""],
            null  == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()),
            s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))),
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)),
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR),
            2 === state)
                return jqXHR;
            fireGlobals = jQuery.event && s.global,
            fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"),
            s.type = s.type.toUpperCase(),
            s.hasContent = !rnoContent.test(s.type),
            cacheURL = s.url,
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data,
            delete s.data),
            s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)),
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]),
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])),
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType),
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers)
                jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state))
                return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            })
                jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                if (jqXHR.readyState = 1,
                fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]),
                2 === state)
                    return jqXHR;
                s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                    jqXHR.abort("timeout")
                }, s.timeout));
                try {
                    state = 1,
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(2 > state))
                        throw e;
                    done(-1, e)
                }
            } else
                done(-1, "No Transport");
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script")
        }
    }),
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback,
            callback = data,
            data = void 0),
            jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url))
        }
    }),
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html))
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]),
                wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; )
                        elem = elem.firstChild;
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            }) : this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    jQuery.expr.filters.hidden = function(elem) {
        return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem)
    }
    ,
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    }
    ;
    var r20 = /%20/g
      , rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i
      , rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null  == value ? "" : value,
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        }
        ;
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional),
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a))
            jQuery.each(a, function() {
                add(this.name, this.value)
            });
        else
            for (prefix in a)
                buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    }
    ,
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null  == val ? null  : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }),
    jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return this.isLocal ? createActiveXHR() : document.documentMode > 8 ? createStandardXHR() : /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR()
    }
     : createStandardXHR;
    var xhrId = 0
      , xhrCallbacks = {}
      , xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks)
            xhrCallbacks[key](void 0, !0)
    }),
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported,
    xhrSupported = support.ajax = !!xhrSupported,
    xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password),
                    options.xhrFields)
                        for (i in options.xhrFields)
                            xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType),
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers)
                        void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null ),
                    callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState))
                            if (delete xhrCallbacks[id],
                            callback = void 0,
                            xhr.onreadystatechange = jQuery.noop,
                            isAbort)
                                4 !== xhr.readyState && xhr.abort();
                            else {
                                responses = {},
                                status = xhr.status,
                                "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                try {
                                    statusText = xhr.statusText
                                } catch (e) {
                                    statusText = ""
                                }
                                status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                            }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders())
                    }
                    ,
                    options.async ? 4 === xhr.readyState ? window.setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback()
                },
                abort: function() {
                    callback && callback(void 0, !0)
                }
            }
        }
    }),
    jQuery.ajaxPrefilter(function(s) {
        s.crossDomain && (s.contents.script = !1)
    }),
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text),
                text
            }
        }
    }),
    jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1),
        s.crossDomain && (s.type = "GET",
        s.global = !1)
    }),
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"),
                    script.async = !0,
                    s.scriptCharset && (script.charset = s.scriptCharset),
                    script.src = s.url,
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null ,
                        script.parentNode && script.parentNode.removeChild(script),
                        script = null ,
                        isAbort || callback(200, "success"))
                    }
                    ,
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    script && script.onload(void 0, !0)
                }
            }
        }
    });
    var oldCallbacks = []
      , rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0,
            callback
        }
    }),
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName),
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"),
            responseContainer[0]
        }
        ,
        s.dataTypes[0] = "json",
        overwritten = window[callbackName],
        window[callbackName] = function() {
            responseContainer = arguments
        }
        ,
        jqXHR.always(function() {
            void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten,
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback,
            oldCallbacks.push(callbackName)),
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]),
            responseContainer = overwritten = void 0
        }),
        "script") : void 0
    }),
    support.createHTMLDocument = function() {
        if (!document.implementation.createHTMLDocument)
            return !1;
        var doc = document.implementation.createHTMLDocument("");
        return doc.body.innerHTML = "<form></form><form></form>",
        2 === doc.body.childNodes.length
    }(),
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data)
            return null ;
        "boolean" == typeof context && (keepScripts = context,
        context = !1),
        context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
        var parsed = rsingleTag.exec(data)
          , scripts = !keepScripts && [];
        return parsed ? [context.createElement(parsed[1])] : (parsed = buildFragment([data], context, scripts),
        scripts && scripts.length && jQuery(scripts).remove(),
        jQuery.merge([], parsed.childNodes))
    }
    ;
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load)
            return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off > -1 && (selector = jQuery.trim(url.slice(off, url.length)),
        url = url.slice(0, off)),
        jQuery.isFunction(params) ? (callback = params,
        params = void 0) : params && "object" == typeof params && (type = "POST"),
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments,
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
        }).always(callback && function(jqXHR, status) {
            self.each(function() {
                callback.apply(self, response || [jqXHR.responseText, status, jqXHR])
            })
        }
        ),
        this
    }
    ,
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    }),
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    }
    ,
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"),
            curOffset = curElem.offset(),
            curCSSTop = jQuery.css(elem, "top"),
            curCSSLeft = jQuery.css(elem, "left"),
            calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
            calculatePosition ? (curPosition = curElem.position(),
            curTop = curPosition.top,
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0,
            curLeft = parseFloat(curCSSLeft) || 0),
            jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))),
            null  != options.top && (props.top = options.top - curOffset.top + curTop),
            null  != options.left && (props.left = options.left - curOffset.left + curLeft),
            "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }
    },
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length)
                return void 0 === options ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                });
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (doc)
                return docElem = doc.documentElement,
                jQuery.contains(docElem, elem) ? ("undefined" != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()),
                win = getWindow(doc),
                {
                    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
                }) : box
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(),
                offset = this.offset(),
                jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()),
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0) - offsetParent.scrollTop(),
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0) - offsetParent.scrollLeft()),
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); )
                    offsetParent = offsetParent.offsetParent;
                return offsetParent || documentElement
            })
        }
    }),
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val)
            }, method, val, arguments.length, null )
        }
    }),
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop),
            rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
        })
    }),
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin)
                  , extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement,
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : void 0, chainable, null )
            }
        })
    }),
    jQuery.fn.extend({
        bind: function(types, data, fn) {
            return this.on(types, null , data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null , fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    }),
    jQuery.fn.size = function() {
        return this.length
    }
    ,
    jQuery.fn.andSelf = jQuery.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery
    });
    var _jQuery = window.jQuery
      , _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$),
        deep && window.jQuery === jQuery && (window.jQuery = _jQuery),
        jQuery
    }
    ,
    noGlobal || (window.jQuery = window.$ = jQuery),
    jQuery
});
!function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery)
}(function($) {
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s)
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s)
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }
    function parseCookieValue(s) {
        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s = decodeURIComponent(s.replace(pluses, " ")),
            config.json ? JSON.parse(s) : s
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var pluses = /\+/g
      , config = $.cookie = function(key, value, options) {
        if (void 0 !== value && !$.isFunction(value)) {
            if (options = $.extend({}, config.defaults, options),
            "number" == typeof options.expires) {
                var days = options.expires
                  , t = options.expires = new Date;
                t.setTime(+t + 864e5 * days)
            }
            return document.cookie = [encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
        }
        for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; l > i; i++) {
            var parts = cookies[i].split("=")
              , name = decode(parts.shift())
              , cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break
            }
            key || void 0 === (cookie = read(cookie)) || (result[name] = cookie)
        }
        return result
    }
    ;
    config.defaults = {},
    $.removeCookie = function(key, options) {
        return void 0 === $.cookie(key) ? !1 : ($.cookie(key, "", $.extend({}, options, {
            expires: -1
        })),
        !$.cookie(key))
    }
});
!function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], factory) : "undefined" != typeof module && module.exports ? module.exports = factory(require("jquery")) : factory(jQuery)
}(function($) {
    "use strict";
    function isWin(elem) {
        return !elem.nodeName || -1 !== $.inArray(elem.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
    }
    function both(val) {
        return $.isFunction(val) || $.isPlainObject(val) ? val : {
            top: val,
            left: val
        }
    }
    var $scrollTo = $.scrollTo = function(target, duration, settings) {
        return $(window).scrollTo(target, duration, settings)
    }
    ;
    return $scrollTo.defaults = {
        axis: "xy",
        duration: 0,
        limit: !0
    },
    $.fn.scrollTo = function(target, duration, settings) {
        "object" == typeof duration && (settings = duration,
        duration = 0),
        "function" == typeof settings && (settings = {
            onAfter: settings
        }),
        "max" === target && (target = 9e9),
        settings = $.extend({}, $scrollTo.defaults, settings),
        duration = duration || settings.duration;
        var queue = settings.queue && settings.axis.length > 1;
        return queue && (duration /= 2),
        settings.offset = both(settings.offset),
        settings.over = both(settings.over),
        this.each(function() {
            function animate(callback) {
                var opts = $.extend({}, settings, {
                    queue: !0,
                    duration: duration,
                    complete: callback && function() {
                        callback.call(elem, targ, settings)
                    }
                });
                $elem.animate(attr, opts)
            }
            if (null  !== target) {
                var toff, win = isWin(this), elem = win ? this.contentWindow || window : this, $elem = $(elem), targ = target, attr = {};
                switch (typeof targ) {
                case "number":
                case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = win ? $(targ) : $(targ, elem);
                case "object":
                    if (0 === targ.length)
                        return;
                    (targ.is || targ.style) && (toff = (targ = $(targ)).offset())
                }
                var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;
                $.each(settings.axis.split(""), function(i, axis) {
                    var Pos = "x" === axis ? "Left" : "Top"
                      , pos = Pos.toLowerCase()
                      , key = "scroll" + Pos
                      , prev = $elem[key]()
                      , max = $scrollTo.max(elem, axis);
                    if (toff)
                        attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]),
                        settings.margin && (attr[key] -= parseInt(targ.css("margin" + Pos), 10) || 0,
                        attr[key] -= parseInt(targ.css("border" + Pos + "Width"), 10) || 0),
                        attr[key] += offset[pos] || 0,
                        settings.over[pos] && (attr[key] += targ["x" === axis ? "width" : "height"]() * settings.over[pos]);
                    else {
                        var val = targ[pos];
                        attr[key] = val.slice && "%" === val.slice(-1) ? parseFloat(val) / 100 * max : val
                    }
                    settings.limit && /^\d+$/.test(attr[key]) && (attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max)),
                    !i && settings.axis.length > 1 && (prev === attr[key] ? attr = {} : queue && (animate(settings.onAfterFirst),
                    attr = {}))
                }),
                animate(settings.onAfter)
            }
        })
    }
    ,
    $scrollTo.max = function(elem, axis) {
        var Dim = "x" === axis ? "Width" : "Height"
          , scroll = "scroll" + Dim;
        if (!isWin(elem))
            return elem[scroll] - $(elem)[Dim.toLowerCase()]();
        var size = "client" + Dim
          , doc = elem.ownerDocument || elem.document
          , html = doc.documentElement
          , body = doc.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size])
    }
    ,
    $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
        get: function(t) {
            return $(t.elem)[t.prop]()
        },
        set: function(t) {
            var curr = this.get(t);
            if (t.options.interrupt && t._last && t._last !== curr)
                return $(t.elem).stop();
            var next = Math.round(t.now);
            curr !== next && ($(t.elem)[t.prop](next),
            t._last = this.get(t))
        }
    },
    $scrollTo
});
!function($) {
    function fnPjax(selector, container, options) {
        var context = this;
        return this.on("click.pjax", selector, function(event) {
            var opts = $.extend({}, optionsFor(container, options));
            opts.container || (opts.container = $(this).attr("data-pjax") || context),
            handleClick(event, opts)
        })
    }
    function handleClick(event, container, options) {
        options = optionsFor(container, options);
        var link = event.currentTarget;
        if ("A" !== link.tagName.toUpperCase())
            throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || location.protocol !== link.protocol || location.hostname !== link.hostname || link.href.indexOf("#") > -1 && stripHash(link) == stripHash(location) || event.isDefaultPrevented())) {
            var defaults = {
                url: link.href,
                container: $(link).attr("data-pjax"),
                target: link
            }
              , opts = $.extend({}, defaults, options)
              , clickEvent = $.Event("pjax:click");
            $(link).trigger(clickEvent, [opts]),
            clickEvent.isDefaultPrevented() || (pjax(opts),
            event.preventDefault(),
            $(link).trigger("pjax:clicked", [opts]))
        }
    }
    function handleSubmit(event, container, options) {
        options = optionsFor(container, options);
        var form = event.currentTarget;
        if ("FORM" !== form.tagName.toUpperCase())
            throw "$.pjax.submit requires a form element";
        var defaults = {
            type: form.method.toUpperCase(),
            url: form.action,
            container: $(form).attr("data-pjax"),
            target: form
        };
        if ("GET" !== defaults.type && void 0 !== window.FormData)
            defaults.data = new FormData(form),
            defaults.processData = !1,
            defaults.contentType = !1;
        else {
            if ($(form).find(":file").length)
                return;
            defaults.data = $(form).serializeArray()
        }
        pjax($.extend({}, defaults, options)),
        event.preventDefault()
    }
    function pjax(options) {
        function fire(type, args, props) {
            props || (props = {}),
            props.relatedTarget = target;
            var event = $.Event(type, props);
            return context.trigger(event, args),
            !event.isDefaultPrevented()
        }
        options = $.extend(!0, {}, $.ajaxSettings, pjax.defaults, options),
        $.isFunction(options.url) && (options.url = options.url());
        var target = options.target
          , hash = parseURL(options.url).hash
          , context = options.context = findContainerFor(options.container);
        options.data || (options.data = {}),
        $.isArray(options.data) ? options.data.push({
            name: "_pjax",
            value: context.selector
        }) : options.data._pjax = context.selector;
        var timeoutTimer;
        options.beforeSend = function(xhr, settings) {
            if ("GET" !== settings.type && (settings.timeout = 0),
            xhr.setRequestHeader("X-PJAX", "true"),
            xhr.setRequestHeader("X-PJAX-Container", context.selector),
            !fire("pjax:beforeSend", [xhr, settings]))
                return !1;
            settings.timeout > 0 && (timeoutTimer = setTimeout(function() {
                fire("pjax:timeout", [xhr, options]) && xhr.abort("timeout")
            }, settings.timeout),
            settings.timeout = 0);
            var url = parseURL(settings.url);
            hash && (url.hash = hash),
            options.requestUrl = stripInternalParams(url)
        }
        ,
        options.complete = function(xhr, textStatus) {
            timeoutTimer && clearTimeout(timeoutTimer),
            fire("pjax:complete", [xhr, textStatus, options]),
            fire("pjax:end", [xhr, options])
        }
        ,
        options.error = function(xhr, textStatus, errorThrown) {
            var container = extractContainer("", xhr, options)
              , allowed = fire("pjax:error", [xhr, textStatus, errorThrown, options]);
            "GET" == options.type && "abort" !== textStatus && allowed && locationReplace(container.url)
        }
        ,
        options.success = function(data, status, xhr) {
            var previousState = pjax.state
              , currentVersion = "function" == typeof $.pjax.defaults.version ? $.pjax.defaults.version() : $.pjax.defaults.version
              , latestVersion = xhr.getResponseHeader("X-PJAX-Version")
              , container = extractContainer(data, xhr, options)
              , url = parseURL(container.url);
            if (hash && (url.hash = hash,
            container.url = url.href),
            currentVersion && latestVersion && currentVersion !== latestVersion)
                return void locationReplace(container.url);
            if (!container.contents)
                return void locationReplace(container.url);
            pjax.state = {
                id: options.id || uniqueId(),
                url: container.url,
                title: container.title,
                container: context.selector,
                fragment: options.fragment,
                timeout: options.timeout
            },
            (options.push || options.replace) && window.history.replaceState(pjax.state, container.title, container.url);
            try {
                document.activeElement.blur()
            } catch (e) {}
            container.title && (document.title = container.title),
            fire("pjax:beforeReplace", [container.contents, options], {
                state: pjax.state,
                previousState: previousState
            }),
            context.html(container.contents);
            var autofocusEl = context.find("input[autofocus], textarea[autofocus]").last()[0];
            autofocusEl && document.activeElement !== autofocusEl && autofocusEl.focus(),
            executeScriptTags(container.scripts);
            var scrollTo = options.scrollTo;
            if (hash) {
                var name = decodeURIComponent(hash.slice(1))
                  , target = document.getElementById(name) || document.getElementsByName(name)[0];
                target && (scrollTo = $(target).offset().top)
            }
            "number" == typeof scrollTo && $(window).scrollTop(scrollTo),
            fire("pjax:success", [data, status, xhr, options])
        }
        ,
        pjax.state || (pjax.state = {
            id: uniqueId(),
            url: window.location.href,
            title: document.title,
            container: context.selector,
            fragment: options.fragment,
            timeout: options.timeout
        },
        window.history.replaceState(pjax.state, document.title)),
        abortXHR(pjax.xhr),
        pjax.options = options;
        var xhr = pjax.xhr = $.ajax(options);
        return xhr.readyState > 0 && (options.push && !options.replace && (cachePush(pjax.state.id, cloneContents(context)),
        window.history.pushState(null , "", options.requestUrl)),
        fire("pjax:start", [xhr, options]),
        fire("pjax:send", [xhr, options])),
        pjax.xhr
    }
    function pjaxReload(container, options) {
        var defaults = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return pjax($.extend(defaults, optionsFor(container, options)))
    }
    function locationReplace(url) {
        window.history.replaceState(null , "", pjax.state.url),
        window.location.replace(url)
    }
    function onPjaxPopstate(event) {
        initialPop || abortXHR(pjax.xhr);
        var direction, previousState = pjax.state, state = event.state;
        if (state && state.container) {
            if (initialPop && initialURL == state.url)
                return;
            if (previousState) {
                if (previousState.id === state.id)
                    return;
                direction = previousState.id < state.id ? "forward" : "back"
            }
            var cache = cacheMapping[state.id] || []
              , container = $(cache[0] || state.container)
              , contents = cache[1];
            if (container.length) {
                previousState && cachePop(direction, previousState.id, cloneContents(container));
                var popstateEvent = $.Event("pjax:popstate", {
                    state: state,
                    direction: direction
                });
                container.trigger(popstateEvent);
                var options = {
                    id: state.id,
                    url: state.url,
                    container: container,
                    push: !1,
                    fragment: state.fragment,
                    timeout: state.timeout,
                    scrollTo: !1
                };
                if (contents) {
                    container.trigger("pjax:start", [null , options]),
                    pjax.state = state,
                    state.title && (document.title = state.title);
                    var beforeReplaceEvent = $.Event("pjax:beforeReplace", {
                        state: state,
                        previousState: previousState
                    });
                    container.trigger(beforeReplaceEvent, [contents, options]),
                    container.html(contents),
                    container.trigger("pjax:end", [null , options])
                } else
                    pjax(options);
                container[0].offsetHeight
            } else
                locationReplace(location.href)
        }
        initialPop = !1
    }
    function fallbackPjax(options) {
        var url = $.isFunction(options.url) ? options.url() : options.url
          , method = options.type ? options.type.toUpperCase() : "GET"
          , form = $("<form>", {
            method: "GET" === method ? "GET" : "POST",
            action: url,
            style: "display:none"
        });
        "GET" !== method && "POST" !== method && form.append($("<input>", {
            type: "hidden",
            name: "_method",
            value: method.toLowerCase()
        }));
        var data = options.data;
        if ("string" == typeof data)
            $.each(data.split("&"), function(index, value) {
                var pair = value.split("=");
                form.append($("<input>", {
                    type: "hidden",
                    name: pair[0],
                    value: pair[1]
                }))
            });
        else if ($.isArray(data))
            $.each(data, function(index, value) {
                form.append($("<input>", {
                    type: "hidden",
                    name: value.name,
                    value: value.value
                }))
            });
        else if ("object" == typeof data) {
            var key;
            for (key in data)
                form.append($("<input>", {
                    type: "hidden",
                    name: key,
                    value: data[key]
                }))
        }
        $(document.body).append(form),
        form.submit()
    }
    function abortXHR(xhr) {
        xhr && xhr.readyState < 4 && (xhr.onreadystatechange = $.noop,
        xhr.abort())
    }
    function uniqueId() {
        return (new Date).getTime()
    }
    function cloneContents(container) {
        var cloned = container.clone();
        return cloned.find("script").each(function() {
            this.src || jQuery._data(this, "globalEval", !1)
        }),
        [container.selector, cloned.contents()]
    }
    function stripInternalParams(url) {
        return url.search = url.search.replace(/([?&])(_pjax|_)=[^&]*/g, ""),
        url.href.replace(/\?($|#)/, "$1")
    }
    function parseURL(url) {
        var a = document.createElement("a");
        return a.href = url,
        a
    }
    function stripHash(location) {
        return location.href.replace(/#.*/, "")
    }
    function optionsFor(container, options) {
        return container && options ? options.container = container : options = $.isPlainObject(container) ? container : {
            container: container
        },
        options.container && (options.container = findContainerFor(options.container)),
        options
    }
    function findContainerFor(container) {
        if (container = $(container),
        container.length) {
            if ("" !== container.selector && container.context === document)
                return container;
            if (container.attr("id"))
                return $("#" + container.attr("id"));
            throw "cant get selector for pjax container!"
        }
        throw "no pjax container for " + container.selector
    }
    function findAll(elems, selector) {
        return elems.filter(selector).add(elems.find(selector))
    }
    function parseHTML(html) {
        return $.parseHTML(html, document, !0)
    }
    function extractContainer(data, xhr, options) {
        var obj = {}
          , fullDocument = /<html/i.test(data)
          , serverUrl = xhr.getResponseHeader("X-PJAX-URL");
        if (obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl,
        fullDocument)
            var $head = $(parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]))
              , $body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        else
            var $head = $body = $(parseHTML(data));
        if (0 === $body.length)
            return obj;
        if (obj.title = findAll($head, "title").last().text(),
        options.fragment) {
            if ("body" === options.fragment)
                var $fragment = $body;
            else
                var $fragment = findAll($body, options.fragment).first();
            $fragment.length && (obj.contents = "body" === options.fragment ? $fragment : $fragment.contents(),
            obj.title || (obj.title = $fragment.attr("title") || $fragment.data("title")))
        } else
            fullDocument || (obj.contents = $body);
        return obj.contents && (obj.contents = obj.contents.not(function() {
            return $(this).is("title")
        }),
        obj.contents.find("title").remove(),
        obj.scripts = findAll(obj.contents, "script[src]").remove(),
        obj.contents = obj.contents.not(obj.scripts)),
        obj.title && (obj.title = $.trim(obj.title)),
        obj
    }
    function executeScriptTags(scripts) {
        if (scripts) {
            var existingScripts = $("script[src]");
            scripts.each(function() {
                var src = this.src
                  , matchedScripts = existingScripts.filter(function() {
                    return this.src === src
                });
                if (!matchedScripts.length) {
                    var script = document.createElement("script")
                      , type = $(this).attr("type");
                    type && (script.type = type),
                    script.src = $(this).attr("src"),
                    document.head.appendChild(script)
                }
            })
        }
    }
    function cachePush(id, value) {
        cacheMapping[id] = value,
        cacheBackStack.push(id),
        trimCacheStack(cacheForwardStack, 0),
        trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength)
    }
    function cachePop(direction, id, value) {
        var pushStack, popStack;
        cacheMapping[id] = value,
        "forward" === direction ? (pushStack = cacheBackStack,
        popStack = cacheForwardStack) : (pushStack = cacheForwardStack,
        popStack = cacheBackStack),
        pushStack.push(id),
        (id = popStack.pop()) && delete cacheMapping[id],
        trimCacheStack(pushStack, pjax.defaults.maxCacheLength)
    }
    function trimCacheStack(stack, length) {
        for (; stack.length > length; )
            delete cacheMapping[stack.shift()]
    }
    function findVersion() {
        return $("meta").filter(function() {
            var name = $(this).attr("http-equiv");
            return name && "X-PJAX-VERSION" === name.toUpperCase()
        }).attr("content")
    }
    function enable() {
        $.fn.pjax = fnPjax,
        $.pjax = pjax,
        $.pjax.enable = $.noop,
        $.pjax.disable = disable,
        $.pjax.click = handleClick,
        $.pjax.submit = handleSubmit,
        $.pjax.reload = pjaxReload,
        $.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: findVersion
        },
        $(window).on("popstate.pjax", onPjaxPopstate)
    }
    function disable() {
        $.fn.pjax = function() {
            return this
        }
        ,
        $.pjax = fallbackPjax,
        $.pjax.enable = enable,
        $.pjax.disable = $.noop,
        $.pjax.click = $.noop,
        $.pjax.submit = $.noop,
        $.pjax.reload = function() {
            window.location.reload()
        }
        ,
        $(window).off("popstate.pjax", onPjaxPopstate)
    }
    var initialPop = !0
      , initialURL = window.location.href
      , initialState = window.history.state;
    initialState && initialState.container && (pjax.state = initialState),
    "state" in window.history && (initialPop = !1);
    var cacheMapping = {}
      , cacheForwardStack = []
      , cacheBackStack = [];
    $.inArray("state", $.event.props) < 0 && $.event.props.push("state"),
    $.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/),
    $.support.pjax ? enable() : disable()
}(jQuery);
!function() {
    var root = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global
      , previousUnderscore = root._
      , ArrayProto = Array.prototype
      , ObjProto = Object.prototype
      , push = ArrayProto.push
      , slice = ArrayProto.slice
      , toString = ObjProto.toString
      , hasOwnProperty = ObjProto.hasOwnProperty
      , nativeIsArray = Array.isArray
      , nativeKeys = Object.keys
      , nativeCreate = Object.create
      , Ctor = function() {}
      , _ = function(obj) {
        return obj instanceof _ ? obj : this instanceof _ ? void (this._wrapped = obj) : new _(obj)
    }
    ;
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _),
    exports._ = _) : root._ = _,
    _.VERSION = "1.8.3";
    var optimizeCb = function(func, context, argCount) {
        if (void 0 === context)
            return func;
        switch (null  == argCount ? 3 : argCount) {
        case 1:
            return function(value) {
                return func.call(context, value)
            }
            ;
        case 2:
            return function(value, other) {
                return func.call(context, value, other)
            }
            ;
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection)
            }
            ;
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection)
            }
        }
        return function() {
            return func.apply(context, arguments)
        }
    }
      , cb = function(value, context, argCount) {
        return null  == value ? _.identity : _.isFunction(value) ? optimizeCb(value, context, argCount) : _.isObject(value) ? _.matcher(value) : _.property(value)
    }
    ;
    _.iteratee = function(value, context) {
        return cb(value, context, 1 / 0)
    }
    ;
    var restArgs = function(func, startIndex) {
        return startIndex = null  == startIndex ? func.length - 1 : +startIndex,
        function() {
            var index, length = Math.max(arguments.length - startIndex, 0), rest = Array(length);
            for (index = 0; length > index; index++)
                rest[index] = arguments[index + startIndex];
            switch (startIndex) {
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
            case 2:
                return func.call(this, arguments[0], arguments[1], rest)
            }
            var args = Array(startIndex + 1);
            for (index = 0; startIndex > index; index++)
                args[index] = arguments[index];
            return args[startIndex] = rest,
            func.apply(this, args)
        }
    }
      , baseCreate = function(prototype) {
        if (!_.isObject(prototype))
            return {};
        if (nativeCreate)
            return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        return Ctor.prototype = null ,
        result
    }
      , property = function(key) {
        return function(obj) {
            return null  == obj ? void 0 : obj[key]
        }
    }
      , MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
      , getLength = property("length")
      , isArrayLike = function(collection) {
        var length = getLength(collection);
        return "number" == typeof length && length >= 0 && MAX_ARRAY_INDEX >= length
    }
    ;
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj))
            for (i = 0,
            length = obj.length; length > i; i++)
                iteratee(obj[i], i, obj);
        else {
            var keys = _.keys(obj);
            for (i = 0,
            length = keys.length; length > i; i++)
                iteratee(obj[keys[i]], keys[i], obj)
        }
        return obj
    }
    ,
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length), index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj)
        }
        return results
    }
    ;
    var createReduce = function(dir) {
        var reducer = function(obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj)
              , length = (keys || obj).length
              , index = dir > 0 ? 0 : length - 1;
            for (initial || (memo = obj[keys ? keys[index] : index],
            index += dir); index >= 0 && length > index; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj)
            }
            return memo
        }
        ;
        return function(obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial)
        }
    }
    ;
    _.reduce = _.foldl = _.inject = createReduce(1),
    _.reduceRight = _.foldr = createReduce(-1),
    _.find = _.detect = function(obj, predicate, context) {
        var key;
        return key = isArrayLike(obj) ? _.findIndex(obj, predicate, context) : _.findKey(obj, predicate, context),
        void 0 !== key && -1 !== key ? obj[key] : void 0
    }
    ,
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        return predicate = cb(predicate, context),
        _.each(obj, function(value, index, list) {
            predicate(value, index, list) && results.push(value)
        }),
        results
    }
    ,
    _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context)
    }
    ,
    _.every = _.all = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj))
                return !1
        }
        return !0
    }
    ,
    _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = 0; length > index; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj))
                return !0
        }
        return !1
    }
    ,
    _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        return isArrayLike(obj) || (obj = _.values(obj)),
        ("number" != typeof fromIndex || guard) && (fromIndex = 0),
        _.indexOf(obj, item, fromIndex) >= 0
    }
    ,
    _.invoke = restArgs(function(obj, method, args) {
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            var func = isFunc ? method : value[method];
            return null  == func ? func : func.apply(value, args)
        })
    }),
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key))
    }
    ,
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs))
    }
    ,
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs))
    }
    ,
    _.max = function(obj, iteratee, context) {
        var value, computed, result = -(1 / 0), lastComputed = -(1 / 0);
        if (null  == iteratee && null  != obj) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; length > i; i++)
                value = obj[i],
                value > result && (result = value)
        } else
            iteratee = cb(iteratee, context),
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list),
                (computed > lastComputed || computed === -(1 / 0) && result === -(1 / 0)) && (result = v,
                lastComputed = computed)
            });
        return result
    }
    ,
    _.min = function(obj, iteratee, context) {
        var value, computed, result = 1 / 0, lastComputed = 1 / 0;
        if (null  == iteratee && null  != obj) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; length > i; i++)
                value = obj[i],
                result > value && (result = value)
        } else
            iteratee = cb(iteratee, context),
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list),
                (lastComputed > computed || computed === 1 / 0 && result === 1 / 0) && (result = v,
                lastComputed = computed)
            });
        return result
    }
    ,
    _.shuffle = function(obj) {
        return _.sample(obj, 1 / 0)
    }
    ,
    _.sample = function(obj, n, guard) {
        if (null  == n || guard)
            return isArrayLike(obj) || (obj = _.values(obj)),
            obj[_.random(obj.length - 1)];
        var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj)
          , length = getLength(sample);
        n = Math.max(Math.min(n, length), 0);
        for (var last = length - 1, index = 0; n > index; index++) {
            var rand = _.random(index, last)
              , temp = sample[index];
            sample[index] = sample[rand],
            sample[rand] = temp
        }
        return sample.slice(0, n)
    }
    ,
    _.sortBy = function(obj, iteratee, context) {
        return iteratee = cb(iteratee, context),
        _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            }
        }).sort(function(left, right) {
            var a = left.criteria
              , b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a)
                    return 1;
                if (b > a || void 0 === b)
                    return -1
            }
            return left.index - right.index
        }), "value")
    }
    ;
    var group = function(behavior, partition) {
        return function(obj, iteratee, context) {
            var result = partition ? [[], []] : {};
            return iteratee = cb(iteratee, context),
            _.each(obj, function(value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key)
            }),
            result
        }
    }
    ;
    _.groupBy = group(function(result, value, key) {
        _.has(result, key) ? result[key].push(value) : result[key] = [value]
    }),
    _.indexBy = group(function(result, value, key) {
        result[key] = value
    }),
    _.countBy = group(function(result, value, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1
    }),
    _.toArray = function(obj) {
        return obj ? _.isArray(obj) ? slice.call(obj) : isArrayLike(obj) ? _.map(obj, _.identity) : _.values(obj) : []
    }
    ,
    _.size = function(obj) {
        return null  == obj ? 0 : isArrayLike(obj) ? obj.length : _.keys(obj).length
    }
    ,
    _.partition = group(function(result, value, pass) {
        result[pass ? 0 : 1].push(value)
    }, !0),
    _.first = _.head = _.take = function(array, n, guard) {
        return null  != array ? null  == n || guard ? array[0] : _.initial(array, array.length - n) : void 0
    }
    ,
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (null  == n || guard ? 1 : n)))
    }
    ,
    _.last = function(array, n, guard) {
        return null  != array ? null  == n || guard ? array[array.length - 1] : _.rest(array, Math.max(0, array.length - n)) : void 0
    }
    ,
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null  == n || guard ? 1 : n)
    }
    ,
    _.compact = function(array) {
        return _.filter(array, _.identity)
    }
    ;
    var flatten = function(input, shallow, strict, output) {
        output = output || [];
        for (var idx = output.length, i = 0, length = getLength(input); length > i; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value)))
                if (shallow)
                    for (var j = 0, len = value.length; len > j; )
                        output[idx++] = value[j++];
                else
                    flatten(value, shallow, strict, output),
                    idx = output.length;
            else
                strict || (output[idx++] = value)
        }
        return output
    }
    ;
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, !1)
    }
    ,
    _.without = restArgs(function(array, otherArrays) {
        return _.difference(array, otherArrays)
    }),
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        _.isBoolean(isSorted) || (context = iteratee,
        iteratee = isSorted,
        isSorted = !1),
        null  != iteratee && (iteratee = cb(iteratee, context));
        for (var result = [], seen = [], i = 0, length = getLength(array); length > i; i++) {
            var value = array[i]
              , computed = iteratee ? iteratee(value, i, array) : value;
            isSorted ? (i && seen === computed || result.push(value),
            seen = computed) : iteratee ? _.contains(seen, computed) || (seen.push(computed),
            result.push(value)) : _.contains(result, value) || result.push(value)
        }
        return result
    }
    ,
    _.union = restArgs(function(arrays) {
        return _.uniq(flatten(arrays, !0, !0))
    }),
    _.intersection = function(array) {
        for (var result = [], argsLength = arguments.length, i = 0, length = getLength(array); length > i; i++) {
            var item = array[i];
            if (!_.contains(result, item)) {
                var j;
                for (j = 1; argsLength > j && _.contains(arguments[j], item); j++)
                    ;
                j === argsLength && result.push(item)
            }
        }
        return result
    }
    ,
    _.difference = restArgs(function(array, rest) {
        return rest = flatten(rest, !0, !0),
        _.filter(array, function(value) {
            return !_.contains(rest, value)
        })
    }),
    _.unzip = function(array) {
        for (var length = array && _.max(array, getLength).length || 0, result = Array(length), index = 0; length > index; index++)
            result[index] = _.pluck(array, index);
        return result
    }
    ,
    _.zip = restArgs(_.unzip),
    _.object = function(list, values) {
        for (var result = {}, i = 0, length = getLength(list); length > i; i++)
            values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result
    }
    ;
    var createPredicateIndexFinder = function(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            for (var length = getLength(array), index = dir > 0 ? 0 : length - 1; index >= 0 && length > index; index += dir)
                if (predicate(array[index], index, array))
                    return index;
            return -1
        }
    }
    ;
    _.findIndex = createPredicateIndexFinder(1),
    _.findLastIndex = createPredicateIndexFinder(-1),
    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        for (var value = iteratee(obj), low = 0, high = getLength(array); high > low; ) {
            var mid = Math.floor((low + high) / 2);
            iteratee(array[mid]) < value ? low = mid + 1 : high = mid
        }
        return low
    }
    ;
    var createIndexFinder = function(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
            var i = 0
              , length = getLength(array);
            if ("number" == typeof idx)
                dir > 0 ? i = idx >= 0 ? idx : Math.max(idx + length, i) : length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            else if (sortedIndex && idx && length)
                return idx = sortedIndex(array, item),
                array[idx] === item ? idx : -1;
            if (item !== item)
                return idx = predicateFind(slice.call(array, i, length), _.isNaN),
                idx >= 0 ? idx + i : -1;
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && length > idx; idx += dir)
                if (array[idx] === item)
                    return idx;
            return -1
        }
    }
    ;
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex),
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex),
    _.range = function(start, stop, step) {
        null  == stop && (stop = start || 0,
        start = 0),
        step = step || 1;
        for (var length = Math.max(Math.ceil((stop - start) / step), 0), range = Array(length), idx = 0; length > idx; idx++,
        start += step)
            range[idx] = start;
        return range
    }
    ;
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc))
            return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype)
          , result = sourceFunc.apply(self, args);
        return _.isObject(result) ? result : self
    }
    ;
    _.bind = restArgs(function(func, context, args) {
        if (!_.isFunction(func))
            throw new TypeError("Bind must be called on a function");
        var bound = restArgs(function(callArgs) {
            return executeBound(func, bound, context, this, args.concat(callArgs))
        });
        return bound
    }),
    _.partial = restArgs(function(func, boundArgs) {
        var placeholder = _.partial.placeholder
          , bound = function() {
            for (var position = 0, length = boundArgs.length, args = Array(length), i = 0; length > i; i++)
                args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
            for (; position < arguments.length; )
                args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args)
        }
        ;
        return bound
    }),
    _.partial.placeholder = _,
    _.bindAll = restArgs(function(obj, keys) {
        keys = flatten(keys, !1, !1);
        var index = keys.length;
        if (1 > index)
            throw new Error("bindAll must be passed function names");
        for (; index--; ) {
            var key = keys[index];
            obj[key] = _.bind(obj[key], obj)
        }
    }),
    _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache
              , address = "" + (hasher ? hasher.apply(this, arguments) : key);
            return _.has(cache, address) || (cache[address] = func.apply(this, arguments)),
            cache[address]
        }
        ;
        return memoize.cache = {},
        memoize
    }
    ,
    _.delay = restArgs(function(func, wait, args) {
        return setTimeout(function() {
            return func.apply(null , args)
        }, wait)
    }),
    _.defer = _.partial(_.delay, _, 1),
    _.throttle = function(func, wait, options) {
        var context, args, result, timeout = null , previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === !1 ? 0 : _.now(),
            timeout = null ,
            result = func.apply(context, args),
            timeout || (context = args = null )
        }
        ;
        return function() {
            var now = _.now();
            previous || options.leading !== !1 || (previous = now);
            var remaining = wait - (now - previous);
            return context = this,
            args = arguments,
            0 >= remaining || remaining > wait ? (timeout && (clearTimeout(timeout),
            timeout = null ),
            previous = now,
            result = func.apply(context, args),
            timeout || (context = args = null )) : timeout || options.trailing === !1 || (timeout = setTimeout(later, remaining)),
            result
        }
    }
    ,
    _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result, later = function() {
            var last = _.now() - timestamp;
            wait > last && last >= 0 ? timeout = setTimeout(later, wait - last) : (timeout = null ,
            immediate || (result = func.apply(context, args),
            timeout || (context = args = null )))
        }
        ;
        return function() {
            context = this,
            args = arguments,
            timestamp = _.now();
            var callNow = immediate && !timeout;
            return timeout || (timeout = setTimeout(later, wait)),
            callNow && (result = func.apply(context, args),
            context = args = null ),
            result
        }
    }
    ,
    _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func)
    }
    ,
    _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this, arguments)
        }
    }
    ,
    _.compose = function() {
        var args = arguments
          , start = args.length - 1;
        return function() {
            for (var i = start, result = args[start].apply(this, arguments); i--; )
                result = args[i].call(this, result);
            return result
        }
    }
    ,
    _.after = function(times, func) {
        return function() {
            return --times < 1 ? func.apply(this, arguments) : void 0
        }
    }
    ,
    _.before = function(times, func) {
        var memo;
        return function() {
            return --times > 0 && (memo = func.apply(this, arguments)),
            1 >= times && (func = null ),
            memo
        }
    }
    ,
    _.once = _.partial(_.before, 2),
    _.restArgs = restArgs;
    var hasEnumBug = !{
        toString: null 
    }.propertyIsEnumerable("toString")
      , nonEnumerableProps = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"]
      , collectNonEnumProps = function(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length
          , constructor = obj.constructor
          , proto = _.isFunction(constructor) && constructor.prototype || ObjProto
          , prop = "constructor";
        for (_.has(obj, prop) && !_.contains(keys, prop) && keys.push(prop); nonEnumIdx--; )
            prop = nonEnumerableProps[nonEnumIdx],
            prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop) && keys.push(prop)
    }
    ;
    _.keys = function(obj) {
        if (!_.isObject(obj))
            return [];
        if (nativeKeys)
            return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            _.has(obj, key) && keys.push(key);
        return hasEnumBug && collectNonEnumProps(obj, keys),
        keys
    }
    ,
    _.allKeys = function(obj) {
        if (!_.isObject(obj))
            return [];
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return hasEnumBug && collectNonEnumProps(obj, keys),
        keys
    }
    ,
    _.values = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, values = Array(length), i = 0; length > i; i++)
            values[i] = obj[keys[i]];
        return values
    }
    ,
    _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        for (var keys = _.keys(obj), length = keys.length, results = {}, index = 0; length > index; index++) {
            var currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj)
        }
        return results
    }
    ,
    _.pairs = function(obj) {
        for (var keys = _.keys(obj), length = keys.length, pairs = Array(length), i = 0; length > i; i++)
            pairs[i] = [keys[i], obj[keys[i]]];
        return pairs
    }
    ,
    _.invert = function(obj) {
        for (var result = {}, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++)
            result[obj[keys[i]]] = keys[i];
        return result
    }
    ,
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj)
            _.isFunction(obj[key]) && names.push(key);
        return names.sort()
    }
    ;
    var createAssigner = function(keysFunc, undefinedOnly) {
        return function(obj) {
            var length = arguments.length;
            if (2 > length || null  == obj)
                return obj;
            for (var index = 1; length > index; index++)
                for (var source = arguments[index], keys = keysFunc(source), l = keys.length, i = 0; l > i; i++) {
                    var key = keys[i];
                    undefinedOnly && void 0 !== obj[key] || (obj[key] = source[key])
                }
            return obj
        }
    }
    ;
    _.extend = createAssigner(_.allKeys),
    _.extendOwn = _.assign = createAssigner(_.keys),
    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        for (var key, keys = _.keys(obj), i = 0, length = keys.length; length > i; i++)
            if (key = keys[i],
            predicate(obj[key], key, obj))
                return key
    }
    ;
    var keyInObj = function(value, key, obj) {
        return key in obj
    }
    ;
    _.pick = restArgs(function(obj, keys) {
        var result = {}
          , iteratee = keys[0];
        if (null  == obj)
            return result;
        _.isFunction(iteratee) ? (keys.length > 1 && (iteratee = optimizeCb(iteratee, keys[1])),
        keys = _.allKeys(obj)) : (iteratee = keyInObj,
        keys = flatten(keys, !1, !1),
        obj = Object(obj));
        for (var i = 0, length = keys.length; length > i; i++) {
            var key = keys[i]
              , value = obj[key];
            iteratee(value, key, obj) && (result[key] = value)
        }
        return result
    }),
    _.omit = restArgs(function(obj, keys) {
        var context, iteratee = keys[0];
        return _.isFunction(iteratee) ? (iteratee = _.negate(iteratee),
        keys.length > 1 && (context = keys[1])) : (keys = _.map(flatten(keys, !1, !1), String),
        iteratee = function(value, key) {
            return !_.contains(keys, key)
        }
        ),
        _.pick(obj, iteratee, context)
    }),
    _.defaults = createAssigner(_.allKeys, !0),
    _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        return props && _.extendOwn(result, props),
        result
    }
    ,
    _.clone = function(obj) {
        return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
    }
    ,
    _.tap = function(obj, interceptor) {
        return interceptor(obj),
        obj
    }
    ,
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs)
          , length = keys.length;
        if (null  == object)
            return !length;
        for (var obj = Object(object), i = 0; length > i; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj))
                return !1
        }
        return !0
    }
    ;
    var eq, deepEq;
    eq = function(a, b, aStack, bStack) {
        if (a === b)
            return 0 !== a || 1 / a === 1 / b;
        if (null  == a || null  == b)
            return a === b;
        if (a !== a)
            return b !== b;
        var type = typeof a;
        return "function" !== type && "object" !== type && "object" != typeof b ? !1 : deepEq(a, b, aStack, bStack)
    }
    ,
    deepEq = function(a, b, aStack, bStack) {
        a instanceof _ && (a = a._wrapped),
        b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className !== toString.call(b))
            return !1;
        switch (className) {
        case "[object RegExp]":
        case "[object String]":
            return "" + a == "" + b;
        case "[object Number]":
            return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            return +a === +b
        }
        var areArrays = "[object Array]" === className;
        if (!areArrays) {
            if ("object" != typeof a || "object" != typeof b)
                return !1;
            var aCtor = a.constructor
              , bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b)
                return !1
        }
        aStack = aStack || [],
        bStack = bStack || [];
        for (var length = aStack.length; length--; )
            if (aStack[length] === a)
                return bStack[length] === b;
        if (aStack.push(a),
        bStack.push(b),
        areArrays) {
            if (length = a.length,
            length !== b.length)
                return !1;
            for (; length--; )
                if (!eq(a[length], b[length], aStack, bStack))
                    return !1
        } else {
            var key, keys = _.keys(a);
            if (length = keys.length,
            _.keys(b).length !== length)
                return !1;
            for (; length--; )
                if (key = keys[length],
                !_.has(b, key) || !eq(a[key], b[key], aStack, bStack))
                    return !1
        }
        return aStack.pop(),
        bStack.pop(),
        !0
    }
    ,
    _.isEqual = function(a, b) {
        return eq(a, b)
    }
    ,
    _.isEmpty = function(obj) {
        return null  == obj ? !0 : isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) ? 0 === obj.length : 0 === _.keys(obj).length
    }
    ,
    _.isElement = function(obj) {
        return !(!obj || 1 !== obj.nodeType)
    }
    ,
    _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" === toString.call(obj)
    }
    ,
    _.isObject = function(obj) {
        var type = typeof obj;
        return "function" === type || "object" === type && !!obj
    }
    ,
    _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) === "[object " + name + "]"
        }
    }),
    _.isArguments(arguments) || (_.isArguments = function(obj) {
        return _.has(obj, "callee")
    }
    ),
    "function" != typeof /./ && "object" != typeof Int8Array && (_.isFunction = function(obj) {
        return "function" == typeof obj || !1
    }
    ),
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj))
    }
    ,
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj
    }
    ,
    _.isBoolean = function(obj) {
        return obj === !0 || obj === !1 || "[object Boolean]" === toString.call(obj)
    }
    ,
    _.isNull = function(obj) {
        return null  === obj
    }
    ,
    _.isUndefined = function(obj) {
        return void 0 === obj
    }
    ,
    _.has = function(obj, key) {
        return null  != obj && hasOwnProperty.call(obj, key)
    }
    ,
    _.noConflict = function() {
        return root._ = previousUnderscore,
        this
    }
    ,
    _.identity = function(value) {
        return value
    }
    ,
    _.constant = function(value) {
        return function() {
            return value
        }
    }
    ,
    _.noop = function() {}
    ,
    _.property = property,
    _.propertyOf = function(obj) {
        return null  == obj ? function() {}
         : function(key) {
            return obj[key]
        }
    }
    ,
    _.matcher = _.matches = function(attrs) {
        return attrs = _.extendOwn({}, attrs),
        function(obj) {
            return _.isMatch(obj, attrs)
        }
    }
    ,
    _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; n > i; i++)
            accum[i] = iteratee(i);
        return accum
    }
    ,
    _.random = function(min, max) {
        return null  == max && (max = min,
        min = 0),
        min + Math.floor(Math.random() * (max - min + 1))
    }
    ,
    _.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , unescapeMap = _.invert(escapeMap)
      , createEscaper = function(map) {
        var escaper = function(match) {
            return map[match]
        }
          , source = "(?:" + _.keys(map).join("|") + ")"
          , testRegexp = RegExp(source)
          , replaceRegexp = RegExp(source, "g");
        return function(string) {
            return string = null  == string ? "" : "" + string,
            testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string
        }
    }
    ;
    _.escape = createEscaper(escapeMap),
    _.unescape = createEscaper(unescapeMap),
    _.result = function(object, prop, fallback) {
        var value = null  == object ? void 0 : object[prop];
        return void 0 === value && (value = fallback),
        _.isFunction(value) ? value.call(object) : value
    }
    ;
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id
    }
    ,
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/
      , escapes = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g
      , escapeChar = function(match) {
        return "\\" + escapes[match]
    }
    ;
    _.template = function(text, settings, oldSettings) {
        !settings && oldSettings && (settings = oldSettings),
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g")
          , index = 0
          , source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escapeRegExp, escapeChar),
            index = offset + match.length,
            escape ? source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" : interpolate ? source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" : evaluate && (source += "';\n" + evaluate + "\n__p+='"),
            match
        }),
        source += "';\n",
        settings.variable || (source = "with(obj||{}){\n" + source + "}\n"),
        source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        var render;
        try {
            render = new Function(settings.variable || "obj","_",source)
        } catch (e) {
            throw e.source = source,
            e
        }
        var template = function(data) {
            return render.call(this, data, _)
        }
          , argument = settings.variable || "obj";
        return template.source = "function(" + argument + "){\n" + source + "}",
        template
    }
    ,
    _.chain = function(obj) {
        var instance = _(obj);
        return instance._chain = !0,
        instance
    }
    ;
    var chainResult = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj
    }
    ;
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                return push.apply(args, arguments),
                chainResult(this, func.apply(_, args))
            }
        })
    }
    ,
    _.mixin(_),
    _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            return method.apply(obj, arguments),
            "shift" !== name && "splice" !== name || 0 !== obj.length || delete obj[0],
            chainResult(this, obj)
        }
    }),
    _.each(["concat", "join", "slice"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return chainResult(this, method.apply(this._wrapped, arguments))
        }
    }),
    _.prototype.value = function() {
        return this._wrapped
    }
    ,
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value,
    _.prototype.toString = function() {
        return "" + this._wrapped
    }
    ,
    "function" == typeof define && define.amd && define("underscore", [], function() {
        return _
    })
}();
!function(root, factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : root.jQuery ? root.jQuery : root.Zepto)
}(this, function($, undefined) {
    $.fn.jPlayer = function(options) {
        var name = "jPlayer"
          , isMethodCall = "string" == typeof options
          , args = Array.prototype.slice.call(arguments, 1)
          , returnValue = this;
        return options = !isMethodCall && args.length ? $.extend.apply(null , [!0, options].concat(args)) : options,
        isMethodCall && "_" === options.charAt(0) ? returnValue : (isMethodCall ? this.each(function() {
            var instance = $(this).data(name)
              , methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
            return methodValue !== instance && methodValue !== undefined ? (returnValue = methodValue,
            !1) : void 0
        }) : this.each(function() {
            var instance = $(this).data(name);
            instance ? instance.option(options || {}) : $(this).data(name, new $.jPlayer(options,this))
        }),
        returnValue)
    }
    ,
    $.jPlayer = function(options, element) {
        if (arguments.length) {
            this.element = $(element),
            this.options = $.extend(!0, {}, this.options, options);
            var self = this;
            this.element.bind("remove.jPlayer", function() {
                self.destroy()
            }),
            this._init()
        }
    }
    ,
    "function" != typeof $.fn.stop && ($.fn.stop = function() {}
    ),
    $.jPlayer.emulateMethods = "load play pause",
    $.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate",
    $.jPlayer.emulateOptions = "muted volume",
    $.jPlayer.reservedEvent = "ready flashreset resize repeat error warning",
    $.jPlayer.event = {},
    $.each(["ready", "setmedia", "flashreset", "resize", "repeat", "click", "error", "warning", "loadstart", "progress", "suspend", "abort", "emptied", "stalled", "play", "pause", "loadedmetadata", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "seeking", "seeked", "timeupdate", "ended", "ratechange", "durationchange", "volumechange"], function() {
        $.jPlayer.event[this] = "jPlayer_" + this
    }),
    $.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "canplay", "canplaythrough"],
    $.jPlayer.pause = function() {
        $.jPlayer.prototype.destroyRemoved(),
        $.each($.jPlayer.prototype.instances, function(i, element) {
            element.data("jPlayer").status.srcSet && element.jPlayer("pause")
        })
    }
    ,
    $.jPlayer.timeFormat = {
        showHour: !1,
        showMin: !0,
        showSec: !0,
        padHour: !1,
        padMin: !0,
        padSec: !0,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    };
    var ConvertTime = function() {
        this.init()
    }
    ;
    ConvertTime.prototype = {
        init: function() {
            this.options = {
                timeFormat: $.jPlayer.timeFormat
            }
        },
        time: function(s) {
            s = s && "number" == typeof s ? s : 0;
            var myTime = new Date(1e3 * s)
              , hour = myTime.getUTCHours()
              , min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + 60 * hour
              , sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + 60 * min
              , strHour = this.options.timeFormat.padHour && 10 > hour ? "0" + hour : hour
              , strMin = this.options.timeFormat.padMin && 10 > min ? "0" + min : min
              , strSec = this.options.timeFormat.padSec && 10 > sec ? "0" + sec : sec
              , strTime = "";
            return strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "",
            strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "",
            strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : ""
        }
    };
    var myConvertTime = new ConvertTime;
    $.jPlayer.convertTime = function(s) {
        return myConvertTime.time(s)
    }
    ,
    $.jPlayer.uaBrowser = function(userAgent) {
        var ua = userAgent.toLowerCase()
          , rwebkit = /(webkit)[ \/]([\w.]+)/
          , ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/
          , rmsie = /(msie) ([\w.]+)/
          , rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/
          , match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        }
    }
    ,
    $.jPlayer.uaPlatform = function(userAgent) {
        var ua = userAgent.toLowerCase()
          , rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/
          , rtablet = /(ipad|playbook)/
          , randroid = /(android)/
          , rmobile = /(mobile)/
          , platform = rplatform.exec(ua) || []
          , tablet = rtablet.exec(ua) || !rmobile.exec(ua) && randroid.exec(ua) || [];
        return platform[1] && (platform[1] = platform[1].replace(/\s/g, "_")),
        {
            platform: platform[1] || "",
            tablet: tablet[1] || ""
        }
    }
    ,
    $.jPlayer.browser = {},
    $.jPlayer.platform = {};
    var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
    browserMatch.browser && ($.jPlayer.browser[browserMatch.browser] = !0,
    $.jPlayer.browser.version = browserMatch.version);
    var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
    platformMatch.platform && ($.jPlayer.platform[platformMatch.platform] = !0,
    $.jPlayer.platform.mobile = !platformMatch.tablet,
    $.jPlayer.platform.tablet = !!platformMatch.tablet),
    $.jPlayer.getDocMode = function() {
        var docMode;
        return $.jPlayer.browser.msie && (document.documentMode ? docMode = document.documentMode : (docMode = 5,
        document.compatMode && "CSS1Compat" === document.compatMode && (docMode = 7))),
        docMode
    }
    ,
    $.jPlayer.browser.documentMode = $.jPlayer.getDocMode(),
    $.jPlayer.nativeFeatures = {
        init: function() {
            var fs, i, il, d = document, v = d.createElement("video"), spec = {
                w3c: ["fullscreenEnabled", "fullscreenElement", "requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenerror"],
                moz: ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"],
                webkit: ["", "webkitCurrentFullScreenElement", "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", ""],
                webkitVideo: ["webkitSupportsFullscreen", "webkitDisplayingFullscreen", "webkitEnterFullscreen", "webkitExitFullscreen", "", ""],
                ms: ["", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"]
            }, specOrder = ["w3c", "moz", "webkit", "webkitVideo", "ms"];
            for (this.fullscreen = fs = {
                support: {
                    w3c: !!d[spec.w3c[0]],
                    moz: !!d[spec.moz[0]],
                    webkit: "function" == typeof d[spec.webkit[3]],
                    webkitVideo: "function" == typeof v[spec.webkitVideo[2]],
                    ms: "function" == typeof v[spec.ms[2]]
                },
                used: {}
            },
            i = 0,
            il = specOrder.length; il > i; i++) {
                var n = specOrder[i];
                if (fs.support[n]) {
                    fs.spec = n,
                    fs.used[n] = !0;
                    break
                }
            }
            if (fs.spec) {
                var s = spec[fs.spec];
                fs.api = {
                    fullscreenEnabled: !0,
                    fullscreenElement: function(elem) {
                        return elem = elem ? elem : d,
                        elem[s[1]]
                    },
                    requestFullscreen: function(elem) {
                        return elem[s[2]]()
                    },
                    exitFullscreen: function(elem) {
                        return elem = elem ? elem : d,
                        elem[s[3]]()
                    }
                },
                fs.event = {
                    fullscreenchange: s[4],
                    fullscreenerror: s[5]
                }
            } else
                fs.api = {
                    fullscreenEnabled: !1,
                    fullscreenElement: function() {
                        return null 
                    },
                    requestFullscreen: function() {},
                    exitFullscreen: function() {}
                },
                fs.event = {}
        }
    },
    $.jPlayer.nativeFeatures.init(),
    $.jPlayer.focus = null ,
    $.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";
    var keyBindings = function(event) {
        var ignoreKey, f = $.jPlayer.focus;
        f && ($.each($.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
            return event.target.nodeName.toUpperCase() === name.toUpperCase() ? (ignoreKey = !0,
            !1) : void 0
        }),
        ignoreKey || $.each(f.options.keyBindings, function(action, binding) {
            return binding && $.isFunction(binding.fn) && ("number" == typeof binding.key && event.which === binding.key || "string" == typeof binding.key && event.key === binding.key) ? (event.preventDefault(),
            binding.fn(f),
            !1) : void 0
        }))
    }
    ;
    $.jPlayer.keys = function(en) {
        var event = "keydown.jPlayer";
        $(document.documentElement).unbind(event),
        en && $(document.documentElement).bind(event, keyBindings)
    }
    ,
    $.jPlayer.keys(!0),
    $.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.9.2",
            needFlash: "2.9.0",
            flash: "unknown"
        },
        options: {
            swfPath: "js",
            solution: "html, flash",
            supplied: "mp3",
            auroraFormats: "wav",
            preload: "metadata",
            volume: .8,
            muted: !1,
            remainingDuration: !1,
            toggleDuration: !1,
            captureDuration: !0,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            minPlaybackRate: .5,
            maxPlaybackRate: 4,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                playbackRateBar: ".jp-playback-rate-bar",
                playbackRateBarValue: ".jp-playback-rate-bar-value",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                title: ".jp-title",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            stateClass: {
                playing: "jp-state-playing",
                seeking: "jp-state-seeking",
                muted: "jp-state-muted",
                looped: "jp-state-looped",
                fullScreen: "jp-state-full-screen",
                noVolume: "jp-state-no-volume"
            },
            useStateClassSkin: !1,
            autoBlur: !0,
            smoothPlayBar: !1,
            fullScreen: !1,
            fullWindow: !1,
            autohide: {
                restored: !1,
                full: !0,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1e3
            },
            loop: !1,
            repeat: function(event) {
                event.jPlayer.options.loop ? $(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
                    $(this).jPlayer("play")
                }) : $(this).unbind(".jPlayerRepeat")
            },
            nativeVideoControls: {},
            noFullWindow: {
                msie: /msie [0-6]\./,
                ipad: /ipad.*?os [0-4]\./,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3]\.(?!.*?mobile)/,
                android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                iemobile: /iemobile/,
                webos: /webos/,
                playbook: /playbook/
            },
            timeFormat: {},
            keyEnabled: !1,
            audioFullScreen: !1,
            keyBindings: {
                play: {
                    key: 80,
                    fn: function(f) {
                        f.status.paused ? f.play() : f.pause()
                    }
                },
                fullScreen: {
                    key: 70,
                    fn: function(f) {
                        (f.status.video || f.options.audioFullScreen) && f._setOption("fullScreen", !f.options.fullScreen)
                    }
                },
                muted: {
                    key: 77,
                    fn: function(f) {
                        f._muted(!f.options.muted)
                    }
                },
                volumeUp: {
                    key: 190,
                    fn: function(f) {
                        f.volume(f.options.volume + .1)
                    }
                },
                volumeDown: {
                    key: 188,
                    fn: function(f) {
                        f.volume(f.options.volume - .1)
                    }
                },
                loop: {
                    key: 76,
                    fn: function(f) {
                        f._loop(!f.options.loop)
                    }
                }
            },
            verticalVolume: !1,
            verticalPlaybackRate: !1,
            globalVolume: !1,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: !1,
            consoleAlerts: !0,
            errorAlerts: !1,
            warningAlerts: !1
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: !0,
            format: {},
            formatType: "",
            waitForPlay: !0,
            waitForLoad: !0,
            srcSet: !1,
            video: !1,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            remaining: 0,
            videoWidth: 0,
            videoHeight: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: !1
        },
        solution: {
            html: !0,
            aurora: !0,
            flash: !0
        },
        format: {
            mp3: {
                codec: "audio/mpeg",
                flashCanPlay: !0,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: !0,
                media: "audio"
            },
            m3u8a: {
                codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
                flashCanPlay: !1,
                media: "audio"
            },
            m3ua: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis, opus"',
                flashCanPlay: !1,
                media: "audio"
            },
            flac: {
                codec: "audio/x-flac",
                flashCanPlay: !1,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: !1,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: !0,
                media: "audio"
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !0,
                media: "video"
            },
            m3u8v: {
                codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !1,
                media: "video"
            },
            m3uv: {
                codec: "audio/mpegurl",
                flashCanPlay: !1,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: !1,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: !1,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: !0,
                media: "video"
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "video"
            }
        },
        _init: function() {
            var self = this;
            if (this.element.empty(),
            this.status = $.extend({}, this.status),
            this.internal = $.extend({}, this.internal),
            this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat),
            this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod,
            this.internal.domNode = this.element.get(0),
            this.options.keyEnabled && !$.jPlayer.focus && ($.jPlayer.focus = this),
            this.androidFix = {
                setMedia: !1,
                play: !1,
                pause: !1,
                time: NaN
            },
            $.jPlayer.platform.android && (this.options.preload = "auto" !== this.options.preload ? "metadata" : "auto"),
            this.formats = [],
            this.solutions = [],
            this.require = {},
            this.htmlElement = {},
            this.html = {},
            this.html.audio = {},
            this.html.video = {},
            this.aurora = {},
            this.aurora.formats = [],
            this.aurora.properties = [],
            this.flash = {},
            this.css = {},
            this.css.cs = {},
            this.css.jq = {},
            this.ancestorJq = [],
            this.options.volume = this._limitValue(this.options.volume, 0, 1),
            $.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
                var format = value1.replace(/^\s+|\s+$/g, "");
                if (self.format[format]) {
                    var dupFound = !1;
                    $.each(self.formats, function(index2, value2) {
                        return format === value2 ? (dupFound = !0,
                        !1) : void 0
                    }),
                    dupFound || self.formats.push(format)
                }
            }),
            $.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
                var solution = value1.replace(/^\s+|\s+$/g, "");
                if (self.solution[solution]) {
                    var dupFound = !1;
                    $.each(self.solutions, function(index2, value2) {
                        return solution === value2 ? (dupFound = !0,
                        !1) : void 0
                    }),
                    dupFound || self.solutions.push(solution)
                }
            }),
            $.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
                var format = value1.replace(/^\s+|\s+$/g, "");
                if (self.format[format]) {
                    var dupFound = !1;
                    $.each(self.aurora.formats, function(index2, value2) {
                        return format === value2 ? (dupFound = !0,
                        !1) : void 0
                    }),
                    dupFound || self.aurora.formats.push(format)
                }
            }),
            this.internal.instance = "jp_" + this.count,
            this.instances[this.internal.instance] = this.element,
            this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count),
            this.internal.self = $.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            }),
            this.internal.audio = $.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: undefined
            }),
            this.internal.video = $.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: undefined
            }),
            this.internal.flash = $.extend({}, {
                id: this.options.idPrefix + "_flash_" + this.count,
                jq: undefined,
                swf: this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "jquery.jplayer.swf" : "")
            }),
            this.internal.poster = $.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: undefined
            }),
            $.each($.jPlayer.event, function(eventName, eventType) {
                self.options[eventName] !== undefined && (self.element.bind(eventType + ".jPlayer", self.options[eventName]),
                self.options[eventName] = undefined)
            }),
            this.require.audio = !1,
            this.require.video = !1,
            $.each(this.formats, function(priority, format) {
                self.require[self.format[format].media] = !0
            }),
            this.require.video ? this.options = $.extend(!0, {}, this.optionsVideo, this.options) : this.options = $.extend(!0, {}, this.optionsAudio, this.options),
            this._setSize(),
            this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
            this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow),
            this.status.noVolume = this._uaBlocklist(this.options.noVolume),
            $.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners(),
            this._restrictNativeVideoControls(),
            this.htmlElement.poster = document.createElement("img"),
            this.htmlElement.poster.id = this.internal.poster.id,
            this.htmlElement.poster.onload = function() {
                (!self.status.video || self.status.waitForPlay) && self.internal.poster.jq.show()
            }
            ,
            this.element.append(this.htmlElement.poster),
            this.internal.poster.jq = $("#" + this.internal.poster.id),
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }),
            this.internal.poster.jq.hide(),
            this.internal.poster.jq.bind("click.jPlayer", function() {
                self._trigger($.jPlayer.event.click)
            }),
            this.html.audio.available = !1,
            this.require.audio && (this.htmlElement.audio = document.createElement("audio"),
            this.htmlElement.audio.id = this.internal.audio.id,
            this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)),
            this.html.video.available = !1,
            this.require.video && (this.htmlElement.video = document.createElement("video"),
            this.htmlElement.video.id = this.internal.video.id,
            this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)),
            this.flash.available = this._checkForFlash(10.1),
            this.html.canPlay = {},
            this.aurora.canPlay = {},
            this.flash.canPlay = {},
            $.each(this.formats, function(priority, format) {
                self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec),
                self.aurora.canPlay[format] = $.inArray(format, self.aurora.formats) > -1,
                self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available
            }),
            this.html.desired = !1,
            this.aurora.desired = !1,
            this.flash.desired = !1,
            $.each(this.solutions, function(solutionPriority, solution) {
                if (0 === solutionPriority)
                    self[solution].desired = !0;
                else {
                    var audioCanPlay = !1
                      , videoCanPlay = !1;
                    $.each(self.formats, function(formatPriority, format) {
                        self[self.solutions[0]].canPlay[format] && ("video" === self.format[format].media ? videoCanPlay = !0 : audioCanPlay = !0)
                    }),
                    self[solution].desired = self.require.audio && !audioCanPlay || self.require.video && !videoCanPlay
                }
            }),
            this.html.support = {},
            this.aurora.support = {},
            this.flash.support = {},
            $.each(this.formats, function(priority, format) {
                self.html.support[format] = self.html.canPlay[format] && self.html.desired,
                self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired,
                self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired
            }),
            this.html.used = !1,
            this.aurora.used = !1,
            this.flash.used = !1,
            $.each(this.solutions, function(solutionPriority, solution) {
                $.each(self.formats, function(formatPriority, format) {
                    return self[solution].support[format] ? (self[solution].used = !0,
                    !1) : void 0
                })
            }),
            this._resetActive(),
            this._resetGate(),
            this._cssSelectorAncestor(this.options.cssSelectorAncestor),
            this.html.used || this.aurora.used || this.flash.used ? this.css.jq.noSolution.length && this.css.jq.noSolution.hide() : (this._error({
                type: $.jPlayer.error.NO_SOLUTION,
                context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                message: $.jPlayer.errorMsg.NO_SOLUTION,
                hint: $.jPlayer.errorHint.NO_SOLUTION
            }),
            this.css.jq.noSolution.length && this.css.jq.noSolution.show()),
            this.flash.used) {
                var htmlObj, flashVars = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
                if ($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
                    var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>'
                      , paramStr = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + flashVars + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    htmlObj = document.createElement(objStr);
                    for (var i = 0; i < paramStr.length; i++)
                        htmlObj.appendChild(document.createElement(paramStr[i]))
                } else {
                    var createParam = function(el, n, v) {
                        var p = document.createElement("param");
                        p.setAttribute("name", n),
                        p.setAttribute("value", v),
                        el.appendChild(p)
                    }
                    ;
                    htmlObj = document.createElement("object"),
                    htmlObj.setAttribute("id", this.internal.flash.id),
                    htmlObj.setAttribute("name", this.internal.flash.id),
                    htmlObj.setAttribute("data", this.internal.flash.swf),
                    htmlObj.setAttribute("type", "application/x-shockwave-flash"),
                    htmlObj.setAttribute("width", "1"),
                    htmlObj.setAttribute("height", "1"),
                    htmlObj.setAttribute("tabindex", "-1"),
                    createParam(htmlObj, "flashvars", flashVars),
                    createParam(htmlObj, "allowscriptaccess", "always"),
                    createParam(htmlObj, "bgcolor", this.options.backgroundColor),
                    createParam(htmlObj, "wmode", this.options.wmode)
                }
                this.element.append(htmlObj),
                this.internal.flash.jq = $(htmlObj)
            }
            this.html.used && !this.flash.used ? this.status.playbackRateEnabled = this._testPlaybackRate("audio") : this.status.playbackRateEnabled = !1,
            this._updatePlaybackRate(),
            this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio),
            this.element.append(this.htmlElement.audio),
            this.internal.audio.jq = $("#" + this.internal.audio.id)),
            this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video),
            this.element.append(this.htmlElement.video),
            this.internal.video.jq = $("#" + this.internal.video.id),
            this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            }),
            this.internal.video.jq.bind("click.jPlayer", function() {
                self._trigger($.jPlayer.event.click)
            }))),
            this.aurora.used,
            this.options.emulateHtml && this._emulateHtmlBridge(),
            !this.html.used && !this.aurora.used || this.flash.used || setTimeout(function() {
                self.internal.ready = !0,
                self.version.flash = "n/a",
                self._trigger($.jPlayer.event.repeat),
                self._trigger($.jPlayer.event.ready)
            }, 100),
            this._updateNativeVideoControls(),
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            $.jPlayer.prototype.count++
        },
        destroy: function() {
            this.clearMedia(),
            this._removeUiClass(),
            this.css.jq.currentTime.length && this.css.jq.currentTime.text(""),
            this.css.jq.duration.length && this.css.jq.duration.text(""),
            $.each(this.css.jq, function(fn, jq) {
                jq.length && jq.unbind(".jPlayer")
            }),
            this.internal.poster.jq.unbind(".jPlayer"),
            this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer"),
            this._fullscreenRemoveEventListeners(),
            this === $.jPlayer.focus && ($.jPlayer.focus = null ),
            this.options.emulateHtml && this._destroyHtmlBridge(),
            this.element.removeData("jPlayer"),
            this.element.unbind(".jPlayer"),
            this.element.empty(),
            delete this.instances[this.internal.instance]
        },
        destroyRemoved: function() {
            var self = this;
            $.each(this.instances, function(i, element) {
                self.element !== element && (element.data("jPlayer") || (element.jPlayer("destroy"),
                delete self.instances[i]))
            })
        },
        enable: function() {},
        disable: function() {},
        _testCanPlayType: function(elem) {
            try {
                return elem.canPlayType(this.format.mp3.codec),
                !0
            } catch (err) {
                return !1
            }
        },
        _testPlaybackRate: function(type) {
            var el, rate = .5;
            type = "string" == typeof type ? type : "audio",
            el = document.createElement(type);
            try {
                return "playbackRate" in el ? (el.playbackRate = rate,
                el.playbackRate === rate) : !1
            } catch (err) {
                return !1
            }
        },
        _uaBlocklist: function(list) {
            var ua = navigator.userAgent.toLowerCase()
              , block = !1;
            return $.each(list, function(p, re) {
                return re && re.test(ua) ? (block = !0,
                !1) : void 0
            }),
            block
        },
        _restrictNativeVideoControls: function() {
            this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1,
            this.status.noFullWindow = !0)
        },
        _updateNativeVideoControls: function() {
            this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls,
            this._updateAutohide(),
            this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(),
            this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(),
            this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            })))
        },
        _addHtmlEventListeners: function(mediaElement, entity) {
            var self = this;
            mediaElement.preload = this.options.preload,
            mediaElement.muted = this.options.muted,
            mediaElement.volume = this.options.volume,
            this.status.playbackRateEnabled && (mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate,
            mediaElement.playbackRate = this.options.playbackRate),
            mediaElement.addEventListener("progress", function() {
                entity.gate && (self.internal.cmdsIgnored && this.readyState > 0 && (self.internal.cmdsIgnored = !1),
                self._getHtmlStatus(mediaElement),
                self._updateInterface(),
                self._trigger($.jPlayer.event.progress))
            }, !1),
            mediaElement.addEventListener("loadeddata", function() {
                entity.gate && (self.androidFix.setMedia = !1,
                self.androidFix.play && (self.androidFix.play = !1,
                self.play(self.androidFix.time)),
                self.androidFix.pause && (self.androidFix.pause = !1,
                self.pause(self.androidFix.time)),
                self._trigger($.jPlayer.event.loadeddata))
            }, !1),
            mediaElement.addEventListener("timeupdate", function() {
                entity.gate && (self._getHtmlStatus(mediaElement),
                self._updateInterface(),
                self._trigger($.jPlayer.event.timeupdate))
            }, !1),
            mediaElement.addEventListener("durationchange", function() {
                entity.gate && (self._getHtmlStatus(mediaElement),
                self._updateInterface(),
                self._trigger($.jPlayer.event.durationchange))
            }, !1),
            mediaElement.addEventListener("play", function() {
                entity.gate && (self._updateButtons(!0),
                self._html_checkWaitForPlay(),
                self._trigger($.jPlayer.event.play))
            }, !1),
            mediaElement.addEventListener("playing", function() {
                entity.gate && (self._updateButtons(!0),
                self._seeked(),
                self._trigger($.jPlayer.event.playing))
            }, !1),
            mediaElement.addEventListener("pause", function() {
                entity.gate && (self._updateButtons(!1),
                self._trigger($.jPlayer.event.pause))
            }, !1),
            mediaElement.addEventListener("waiting", function() {
                entity.gate && (self._seeking(),
                self._trigger($.jPlayer.event.waiting))
            }, !1),
            mediaElement.addEventListener("seeking", function() {
                entity.gate && (self._seeking(),
                self._trigger($.jPlayer.event.seeking))
            }, !1),
            mediaElement.addEventListener("seeked", function() {
                entity.gate && (self._seeked(),
                self._trigger($.jPlayer.event.seeked))
            }, !1),
            mediaElement.addEventListener("volumechange", function() {
                entity.gate && (self.options.volume = mediaElement.volume,
                self.options.muted = mediaElement.muted,
                self._updateMute(),
                self._updateVolume(),
                self._trigger($.jPlayer.event.volumechange))
            }, !1),
            mediaElement.addEventListener("ratechange", function() {
                entity.gate && (self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate,
                self.options.playbackRate = mediaElement.playbackRate,
                self._updatePlaybackRate(),
                self._trigger($.jPlayer.event.ratechange))
            }, !1),
            mediaElement.addEventListener("suspend", function() {
                entity.gate && (self._seeked(),
                self._trigger($.jPlayer.event.suspend))
            }, !1),
            mediaElement.addEventListener("ended", function() {
                entity.gate && ($.jPlayer.browser.webkit || (self.htmlElement.media.currentTime = 0),
                self.htmlElement.media.pause(),
                self._updateButtons(!1),
                self._getHtmlStatus(mediaElement, !0),
                self._updateInterface(),
                self._trigger($.jPlayer.event.ended))
            }, !1),
            mediaElement.addEventListener("error", function() {
                entity.gate && (self._updateButtons(!1),
                self._seeked(),
                self.status.srcSet && (clearTimeout(self.internal.htmlDlyCmdId),
                self.status.waitForLoad = !0,
                self.status.waitForPlay = !0,
                self.status.video && !self.status.nativeVideoControls && self.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }),
                self._validString(self.status.media.poster) && !self.status.nativeVideoControls && self.internal.poster.jq.show(),
                self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(),
                self._error({
                    type: $.jPlayer.error.URL,
                    context: self.status.src,
                    message: $.jPlayer.errorMsg.URL,
                    hint: $.jPlayer.errorHint.URL
                })))
            }, !1),
            $.each($.jPlayer.htmlEvent, function(i, eventType) {
                mediaElement.addEventListener(this, function() {
                    entity.gate && self._trigger($.jPlayer.event[eventType])
                }, !1)
            })
        },
        _addAuroraEventListeners: function(player, entity) {
            var self = this;
            player.volume = 100 * this.options.volume,
            player.on("progress", function() {
                entity.gate && (self.internal.cmdsIgnored && this.readyState > 0 && (self.internal.cmdsIgnored = !1),
                self._getAuroraStatus(player),
                self._updateInterface(),
                self._trigger($.jPlayer.event.progress),
                player.duration > 0 && self._trigger($.jPlayer.event.timeupdate))
            }, !1),
            player.on("ready", function() {
                entity.gate && self._trigger($.jPlayer.event.loadeddata)
            }, !1),
            player.on("duration", function() {
                entity.gate && (self._getAuroraStatus(player),
                self._updateInterface(),
                self._trigger($.jPlayer.event.durationchange))
            }, !1),
            player.on("end", function() {
                entity.gate && (self._updateButtons(!1),
                self._getAuroraStatus(player, !0),
                self._updateInterface(),
                self._trigger($.jPlayer.event.ended))
            }, !1),
            player.on("error", function() {
                entity.gate && (self._updateButtons(!1),
                self._seeked(),
                self.status.srcSet && (self.status.waitForLoad = !0,
                self.status.waitForPlay = !0,
                self.status.video && !self.status.nativeVideoControls && self.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }),
                self._validString(self.status.media.poster) && !self.status.nativeVideoControls && self.internal.poster.jq.show(),
                self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(),
                self._error({
                    type: $.jPlayer.error.URL,
                    context: self.status.src,
                    message: $.jPlayer.errorMsg.URL,
                    hint: $.jPlayer.errorHint.URL
                })))
            }, !1)
        },
        _getHtmlStatus: function(media, override) {
            var ct = 0
              , cpa = 0
              , sp = 0
              , cpr = 0;
            isFinite(media.duration) && (this.status.duration = media.duration),
            ct = media.currentTime,
            cpa = this.status.duration > 0 ? 100 * ct / this.status.duration : 0,
            "object" == typeof media.seekable && media.seekable.length > 0 ? (sp = this.status.duration > 0 ? 100 * media.seekable.end(media.seekable.length - 1) / this.status.duration : 100,
            cpr = this.status.duration > 0 ? 100 * media.currentTime / media.seekable.end(media.seekable.length - 1) : 0) : (sp = 100,
            cpr = cpa),
            override && (ct = 0,
            cpr = 0,
            cpa = 0),
            this.status.seekPercent = sp,
            this.status.currentPercentRelative = cpr,
            this.status.currentPercentAbsolute = cpa,
            this.status.currentTime = ct,
            this.status.remaining = this.status.duration - this.status.currentTime,
            this.status.videoWidth = media.videoWidth,
            this.status.videoHeight = media.videoHeight,
            this.status.readyState = media.readyState,
            this.status.networkState = media.networkState,
            this.status.playbackRate = media.playbackRate,
            this.status.ended = media.ended
        },
        _getAuroraStatus: function(player, override) {
            var ct = 0
              , cpa = 0
              , sp = 0
              , cpr = 0;
            this.status.duration = player.duration / 1e3,
            ct = player.currentTime / 1e3,
            cpa = this.status.duration > 0 ? 100 * ct / this.status.duration : 0,
            player.buffered > 0 ? (sp = this.status.duration > 0 ? player.buffered * this.status.duration / this.status.duration : 100,
            cpr = this.status.duration > 0 ? ct / (player.buffered * this.status.duration) : 0) : (sp = 100,
            cpr = cpa),
            override && (ct = 0,
            cpr = 0,
            cpa = 0),
            this.status.seekPercent = sp,
            this.status.currentPercentRelative = cpr,
            this.status.currentPercentAbsolute = cpa,
            this.status.currentTime = ct,
            this.status.remaining = this.status.duration - this.status.currentTime,
            this.status.readyState = 4,
            this.status.networkState = 0,
            this.status.playbackRate = 1,
            this.status.ended = !1
        },
        _resetStatus: function() {
            this.status = $.extend({}, this.status, $.jPlayer.prototype.status)
        },
        _trigger: function(eventType, error, warning) {
            var event = $.Event(eventType);
            event.jPlayer = {},
            event.jPlayer.version = $.extend({}, this.version),
            event.jPlayer.options = $.extend(!0, {}, this.options),
            event.jPlayer.status = $.extend(!0, {}, this.status),
            event.jPlayer.html = $.extend(!0, {}, this.html),
            event.jPlayer.aurora = $.extend(!0, {}, this.aurora),
            event.jPlayer.flash = $.extend(!0, {}, this.flash),
            error && (event.jPlayer.error = $.extend({}, error)),
            warning && (event.jPlayer.warning = $.extend({}, warning)),
            this.element.trigger(event)
        },
        jPlayerFlashEvent: function(eventType, status) {
            if (eventType === $.jPlayer.event.ready)
                if (this.internal.ready) {
                    if (this.flash.gate) {
                        if (this.status.srcSet) {
                            var currentTime = this.status.currentTime
                              , paused = this.status.paused;
                            this.setMedia(this.status.media),
                            this.volumeWorker(this.options.volume),
                            currentTime > 0 && (paused ? this.pause(currentTime) : this.play(currentTime))
                        }
                        this._trigger($.jPlayer.event.flashreset)
                    }
                } else
                    this.internal.ready = !0,
                    this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }),
                    this.version.flash = status.version,
                    this.version.needFlash !== this.version.flash && this._error({
                        type: $.jPlayer.error.VERSION,
                        context: this.version.flash,
                        message: $.jPlayer.errorMsg.VERSION + this.version.flash,
                        hint: $.jPlayer.errorHint.VERSION
                    }),
                    this._trigger($.jPlayer.event.repeat),
                    this._trigger(eventType);
            if (this.flash.gate)
                switch (eventType) {
                case $.jPlayer.event.progress:
                    this._getFlashStatus(status),
                    this._updateInterface(),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.timeupdate:
                    this._getFlashStatus(status),
                    this._updateInterface(),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.play:
                    this._seeked(),
                    this._updateButtons(!0),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.pause:
                    this._updateButtons(!1),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.ended:
                    this._updateButtons(!1),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.click:
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.error:
                    this.status.waitForLoad = !0,
                    this.status.waitForPlay = !0,
                    this.status.video && this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }),
                    this._validString(this.status.media.poster) && this.internal.poster.jq.show(),
                    this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show(),
                    this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media),
                    this._updateButtons(!1),
                    this._error({
                        type: $.jPlayer.error.URL,
                        context: status.src,
                        message: $.jPlayer.errorMsg.URL,
                        hint: $.jPlayer.errorHint.URL
                    });
                    break;
                case $.jPlayer.event.seeking:
                    this._seeking(),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.seeked:
                    this._seeked(),
                    this._trigger(eventType);
                    break;
                case $.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(eventType)
                }
            return !1
        },
        _getFlashStatus: function(status) {
            this.status.seekPercent = status.seekPercent,
            this.status.currentPercentRelative = status.currentPercentRelative,
            this.status.currentPercentAbsolute = status.currentPercentAbsolute,
            this.status.currentTime = status.currentTime,
            this.status.duration = status.duration,
            this.status.remaining = status.duration - status.currentTime,
            this.status.videoWidth = status.videoWidth,
            this.status.videoHeight = status.videoHeight,
            this.status.readyState = 4,
            this.status.networkState = 0,
            this.status.playbackRate = 1,
            this.status.ended = !1
        },
        _updateButtons: function(playing) {
            playing === undefined ? playing = !this.status.paused : this.status.paused = !playing,
            playing ? this.addStateClass("playing") : this.removeStateClass("playing"),
            !this.status.noFullWindow && this.options.fullWindow ? this.addStateClass("fullScreen") : this.removeStateClass("fullScreen"),
            this.options.loop ? this.addStateClass("looped") : this.removeStateClass("looped"),
            this.css.jq.play.length && this.css.jq.pause.length && (playing ? (this.css.jq.play.hide(),
            this.css.jq.pause.show()) : (this.css.jq.play.show(),
            this.css.jq.pause.hide())),
            this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(),
            this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(),
            this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(),
            this.css.jq.restoreScreen.hide())),
            this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(),
            this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(),
            this.css.jq.repeatOff.hide()))
        },
        _updateInterface: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%"),
            this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({
                width: this.status.currentPercentAbsolute + "%"
            }, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
            var currentTimeText = "";
            this.css.jq.currentTime.length && (currentTimeText = this._convertTime(this.status.currentTime),
            currentTimeText !== this.css.jq.currentTime.text() && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime)));
            var durationText = ""
              , duration = this.status.duration
              , remaining = this.status.remaining;
            this.css.jq.duration.length && ("string" == typeof this.status.media.duration ? durationText = this.status.media.duration : ("number" == typeof this.status.media.duration && (duration = this.status.media.duration,
            remaining = duration - this.status.currentTime),
            durationText = this.options.remainingDuration ? (remaining > 0 ? "-" : "") + this._convertTime(remaining) : this._convertTime(duration)),
            durationText !== this.css.jq.duration.text() && this.css.jq.duration.text(durationText))
        },
        _convertTime: ConvertTime.prototype.time,
        _seeking: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg"),
            this.addStateClass("seeking")
        },
        _seeked: function() {
            this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg"),
            this.removeStateClass("seeking")
        },
        _resetGate: function() {
            this.html.audio.gate = !1,
            this.html.video.gate = !1,
            this.aurora.gate = !1,
            this.flash.gate = !1
        },
        _resetActive: function() {
            this.html.active = !1,
            this.aurora.active = !1,
            this.flash.active = !1
        },
        _escapeHtml: function(s) {
            return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")
        },
        _qualifyURL: function(url) {
            var el = document.createElement("div");
            return el.innerHTML = '<a href="' + this._escapeHtml(url) + '">x</a>',
            el.firstChild.href
        },
        _absoluteMediaUrls: function(media) {
            var self = this;
            return $.each(media, function(type, url) {
                url && self.format[type] && "data:" !== url.substr(0, 5) && (media[type] = self._qualifyURL(url))
            }),
            media
        },
        addStateClass: function(state) {
            this.ancestorJq.length && this.ancestorJq.addClass(this.options.stateClass[state])
        },
        removeStateClass: function(state) {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.options.stateClass[state])
        },
        setMedia: function(media) {
            var self = this
              , supported = !1
              , posterChanged = this.status.media.poster !== media.poster;
            this._resetMedia(),
            this._resetGate(),
            this._resetActive(),
            this.androidFix.setMedia = !1,
            this.androidFix.play = !1,
            this.androidFix.pause = !1,
            media = this._absoluteMediaUrls(media),
            $.each(this.formats, function(formatPriority, format) {
                var isVideo = "video" === self.format[format].media;
                return $.each(self.solutions, function(solutionPriority, solution) {
                    if (self[solution].support[format] && self._validString(media[format])) {
                        var isHtml = "html" === solution
                          , isAurora = "aurora" === solution;
                        return isVideo ? (isHtml ? (self.html.video.gate = !0,
                        self._html_setVideo(media),
                        self.html.active = !0) : (self.flash.gate = !0,
                        self._flash_setVideo(media),
                        self.flash.active = !0),
                        self.css.jq.videoPlay.length && self.css.jq.videoPlay.show(),
                        self.status.video = !0) : (isHtml ? (self.html.audio.gate = !0,
                        self._html_setAudio(media),
                        self.html.active = !0,
                        $.jPlayer.platform.android && (self.androidFix.setMedia = !0)) : isAurora ? (self.aurora.gate = !0,
                        self._aurora_setAudio(media),
                        self.aurora.active = !0) : (self.flash.gate = !0,
                        self._flash_setAudio(media),
                        self.flash.active = !0),
                        self.css.jq.videoPlay.length && self.css.jq.videoPlay.hide(),
                        self.status.video = !1),
                        supported = !0,
                        !1
                    }
                }),
                supported ? !1 : void 0
            }),
            supported ? (this.status.nativeVideoControls && this.html.video.gate || this._validString(media.poster) && (posterChanged ? this.htmlElement.poster.src = media.poster : this.internal.poster.jq.show()),
            "string" == typeof media.title && (this.css.jq.title.length && this.css.jq.title.html(media.title),
            this.htmlElement.audio && this.htmlElement.audio.setAttribute("title", media.title),
            this.htmlElement.video && this.htmlElement.video.setAttribute("title", media.title)),
            this.status.srcSet = !0,
            this.status.media = $.extend({}, media),
            this._updateButtons(!1),
            this._updateInterface(),
            this._trigger($.jPlayer.event.setmedia)) : this._error({
                type: $.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: $.jPlayer.errorMsg.NO_SUPPORT,
                hint: $.jPlayer.errorHint.NO_SUPPORT
            })
        },
        _resetMedia: function() {
            this._resetStatus(),
            this._updateButtons(!1),
            this._updateInterface(),
            this._seeked(),
            this.internal.poster.jq.hide(),
            clearTimeout(this.internal.htmlDlyCmdId),
            this.html.active ? this._html_resetMedia() : this.aurora.active ? this._aurora_resetMedia() : this.flash.active && this._flash_resetMedia()
        },
        clearMedia: function() {
            this._resetMedia(),
            this.html.active ? this._html_clearMedia() : this.aurora.active ? this._aurora_clearMedia() : this.flash.active && this._flash_clearMedia(),
            this._resetGate(),
            this._resetActive()
        },
        load: function() {
            this.status.srcSet ? this.html.active ? this._html_load() : this.aurora.active ? this._aurora_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
        },
        focus: function() {
            this.options.keyEnabled && ($.jPlayer.focus = this)
        },
        play: function(time) {
            var guiAction = "object" == typeof time;
            guiAction && this.options.useStateClassSkin && !this.status.paused ? this.pause(time) : (time = "number" == typeof time ? time : NaN,
            this.status.srcSet ? (this.focus(),
            this.html.active ? this._html_play(time) : this.aurora.active ? this._aurora_play(time) : this.flash.active && this._flash_play(time)) : this._urlNotSetError("play"))
        },
        videoPlay: function() {
            this.play()
        },
        pause: function(time) {
            time = "number" == typeof time ? time : NaN,
            this.status.srcSet ? this.html.active ? this._html_pause(time) : this.aurora.active ? this._aurora_pause(time) : this.flash.active && this._flash_pause(time) : this._urlNotSetError("pause")
        },
        tellOthers: function(command, conditions) {
            var self = this
              , hasConditions = "function" == typeof conditions
              , args = Array.prototype.slice.call(arguments);
            "string" == typeof command && (hasConditions && args.splice(1, 1),
            $.jPlayer.prototype.destroyRemoved(),
            $.each(this.instances, function() {
                self.element !== this && (!hasConditions || conditions.call(this.data("jPlayer"), self)) && this.jPlayer.apply(this, args)
            }))
        },
        pauseOthers: function(time) {
            this.tellOthers("pause", function() {
                return this.status.srcSet
            }, time)
        },
        stop: function() {
            this.status.srcSet ? this.html.active ? this._html_pause(0) : this.aurora.active ? this._aurora_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
        },
        playHead: function(p) {
            p = this._limitValue(p, 0, 100),
            this.status.srcSet ? this.html.active ? this._html_playHead(p) : this.aurora.active ? this._aurora_playHead(p) : this.flash.active && this._flash_playHead(p) : this._urlNotSetError("playHead")
        },
        _muted: function(muted) {
            this.mutedWorker(muted),
            this.options.globalVolume && this.tellOthers("mutedWorker", function() {
                return this.options.globalVolume
            }, muted)
        },
        mutedWorker: function(muted) {
            this.options.muted = muted,
            this.html.used && this._html_setProperty("muted", muted),
            this.aurora.used && this._aurora_mute(muted),
            this.flash.used && this._flash_mute(muted),
            this.html.video.gate || this.html.audio.gate || (this._updateMute(muted),
            this._updateVolume(this.options.volume),
            this._trigger($.jPlayer.event.volumechange))
        },
        mute: function(mute) {
            var guiAction = "object" == typeof mute;
            guiAction && this.options.useStateClassSkin && this.options.muted ? this._muted(!1) : (mute = mute === undefined ? !0 : !!mute,
            this._muted(mute))
        },
        unmute: function(unmute) {
            unmute = unmute === undefined ? !0 : !!unmute,
            this._muted(!unmute)
        },
        _updateMute: function(mute) {
            mute === undefined && (mute = this.options.muted),
            mute ? this.addStateClass("muted") : this.removeStateClass("muted"),
            this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(),
            this.css.jq.unmute.hide()) : mute ? (this.css.jq.mute.hide(),
            this.css.jq.unmute.show()) : (this.css.jq.mute.show(),
            this.css.jq.unmute.hide()))
        },
        volume: function(v) {
            this.volumeWorker(v),
            this.options.globalVolume && this.tellOthers("volumeWorker", function() {
                return this.options.globalVolume
            }, v)
        },
        volumeWorker: function(v) {
            v = this._limitValue(v, 0, 1),
            this.options.volume = v,
            this.html.used && this._html_setProperty("volume", v),
            this.aurora.used && this._aurora_volume(v),
            this.flash.used && this._flash_volume(v),
            this.html.video.gate || this.html.audio.gate || (this._updateVolume(v),
            this._trigger($.jPlayer.event.volumechange))
        },
        volumeBar: function(e) {
            if (this.css.jq.volumeBar.length) {
                var $bar = $(e.currentTarget)
                  , offset = $bar.offset()
                  , x = e.pageX - offset.left
                  , w = $bar.width()
                  , y = $bar.height() - e.pageY + offset.top
                  , h = $bar.height();
                this.options.verticalVolume ? this.volume(y / h) : this.volume(x / w)
            }
            this.options.muted && this._muted(!1)
        },
        _updateVolume: function(v) {
            v === undefined && (v = this.options.volume),
            v = this.options.muted ? 0 : v,
            this.status.noVolume ? (this.addStateClass("noVolume"),
            this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(),
            this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(),
            this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.removeStateClass("noVolume"),
            this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(),
            this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(),
            this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * v + "%")),
            this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
        },
        volumeMax: function() {
            this.volume(1),
            this.options.muted && this._muted(!1)
        },
        _cssSelectorAncestor: function(ancestor) {
            var self = this;
            this.options.cssSelectorAncestor = ancestor,
            this._removeUiClass(),
            this.ancestorJq = ancestor ? $(ancestor) : [],
            ancestor && 1 !== this.ancestorJq.length && this._warning({
                type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: ancestor,
                message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
            }),
            this._addUiClass(),
            $.each(this.options.cssSelector, function(fn, cssSel) {
                self._cssSelector(fn, cssSel)
            }),
            this._updateInterface(),
            this._updateButtons(),
            this._updateAutohide(),
            this._updateVolume(),
            this._updateMute()
        },
        _cssSelector: function(fn, cssSel) {
            var self = this;
            if ("string" == typeof cssSel)
                if ($.jPlayer.prototype.options.cssSelector[fn]) {
                    if (this.css.jq[fn] && this.css.jq[fn].length && this.css.jq[fn].unbind(".jPlayer"),
                    this.options.cssSelector[fn] = cssSel,
                    this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel,
                    cssSel ? this.css.jq[fn] = $(this.css.cs[fn]) : this.css.jq[fn] = [],
                    this.css.jq[fn].length && this[fn]) {
                        var handler = function(e) {
                            e.preventDefault(),
                            self[fn](e),
                            self.options.autoBlur ? $(this).blur() : $(this).focus()
                        }
                        ;
                        this.css.jq[fn].bind("click.jPlayer", handler)
                    }
                    cssSel && 1 !== this.css.jq[fn].length && this._warning({
                        type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
                        context: this.css.cs[fn],
                        message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
                        hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
                    })
                } else
                    this._warning({
                        type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
                        context: fn,
                        message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                        hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
                    });
            else
                this._warning({
                    type: $.jPlayer.warning.CSS_SELECTOR_STRING,
                    context: cssSel,
                    message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                    hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
                })
        },
        duration: function(e) {
            this.options.toggleDuration && (this.options.captureDuration && e.stopPropagation(),
            this._setOption("remainingDuration", !this.options.remainingDuration))
        },
        seekBar: function(e) {
            if (this.css.jq.seekBar.length) {
                var $bar = $(e.currentTarget)
                  , offset = $bar.offset()
                  , x = e.pageX - offset.left
                  , w = $bar.width()
                  , p = 100 * x / w;
                this.playHead(p)
            }
        },
        playbackRate: function(pbr) {
            this._setOption("playbackRate", pbr)
        },
        playbackRateBar: function(e) {
            if (this.css.jq.playbackRateBar.length) {
                var ratio, pbr, $bar = $(e.currentTarget), offset = $bar.offset(), x = e.pageX - offset.left, w = $bar.width(), y = $bar.height() - e.pageY + offset.top, h = $bar.height();
                ratio = this.options.verticalPlaybackRate ? y / h : x / w,
                pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate,
                this.playbackRate(pbr)
            }
        },
        _updatePlaybackRate: function() {
            var pbr = this.options.playbackRate
              , ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
            this.status.playbackRateEnabled ? (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.show(),
            this.css.jq.playbackRateBarValue.length && (this.css.jq.playbackRateBarValue.show(),
            this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](100 * ratio + "%"))) : (this.css.jq.playbackRateBar.length && this.css.jq.playbackRateBar.hide(),
            this.css.jq.playbackRateBarValue.length && this.css.jq.playbackRateBarValue.hide())
        },
        repeat: function(event) {
            var guiAction = "object" == typeof event;
            guiAction && this.options.useStateClassSkin && this.options.loop ? this._loop(!1) : this._loop(!0)
        },
        repeatOff: function() {
            this._loop(!1)
        },
        _loop: function(loop) {
            this.options.loop !== loop && (this.options.loop = loop,
            this._updateButtons(),
            this._trigger($.jPlayer.event.repeat))
        },
        option: function(key, value) {
            var options = key;
            if (0 === arguments.length)
                return $.extend(!0, {}, this.options);
            if ("string" == typeof key) {
                var keys = key.split(".");
                if (value === undefined) {
                    for (var opt = $.extend(!0, {}, this.options), i = 0; i < keys.length; i++) {
                        if (opt[keys[i]] === undefined)
                            return this._warning({
                                type: $.jPlayer.warning.OPTION_KEY,
                                context: key,
                                message: $.jPlayer.warningMsg.OPTION_KEY,
                                hint: $.jPlayer.warningHint.OPTION_KEY
                            }),
                            undefined;
                        opt = opt[keys[i]]
                    }
                    return opt
                }
                options = {};
                for (var opts = options, j = 0; j < keys.length; j++)
                    j < keys.length - 1 ? (opts[keys[j]] = {},
                    opts = opts[keys[j]]) : opts[keys[j]] = value
            }
            return this._setOptions(options),
            this
        },
        _setOptions: function(options) {
            var self = this;
            return $.each(options, function(key, value) {
                self._setOption(key, value)
            }),
            this
        },
        _setOption: function(key, value) {
            var self = this;
            switch (key) {
            case "volume":
                this.volume(value);
                break;
            case "muted":
                this._muted(value);
                break;
            case "globalVolume":
                this.options[key] = value;
                break;
            case "cssSelectorAncestor":
                this._cssSelectorAncestor(value);
                break;
            case "cssSelector":
                $.each(value, function(fn, cssSel) {
                    self._cssSelector(fn, cssSel)
                });
                break;
            case "playbackRate":
                this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate),
                this.html.used && this._html_setProperty("playbackRate", value),
                this._updatePlaybackRate();
                break;
            case "defaultPlaybackRate":
                this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate),
                this.html.used && this._html_setProperty("defaultPlaybackRate", value),
                this._updatePlaybackRate();
                break;
            case "minPlaybackRate":
                this.options[key] = value = this._limitValue(value, .1, this.options.maxPlaybackRate - .1),
                this._updatePlaybackRate();
                break;
            case "maxPlaybackRate":
                this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + .1, 16),
                this._updatePlaybackRate();
                break;
            case "fullScreen":
                if (this.options[key] !== value) {
                    var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                    (!wkv || wkv && !this.status.waitForPlay) && (wkv || (this.options[key] = value),
                    value ? this._requestFullscreen() : this._exitFullscreen(),
                    wkv || this._setOption("fullWindow", value))
                }
                break;
            case "fullWindow":
                this.options[key] !== value && (this._removeUiClass(),
                this.options[key] = value,
                this._refreshSize());
                break;
            case "size":
                this.options.fullWindow || this.options[key].cssClass === value.cssClass || this._removeUiClass(),
                this.options[key] = $.extend({}, this.options[key], value),
                this._refreshSize();
                break;
            case "sizeFull":
                this.options.fullWindow && this.options[key].cssClass !== value.cssClass && this._removeUiClass(),
                this.options[key] = $.extend({}, this.options[key], value),
                this._refreshSize();
                break;
            case "autohide":
                this.options[key] = $.extend({}, this.options[key], value),
                this._updateAutohide();
                break;
            case "loop":
                this._loop(value);
                break;
            case "remainingDuration":
                this.options[key] = value,
                this._updateInterface();
                break;
            case "toggleDuration":
                this.options[key] = value;
                break;
            case "nativeVideoControls":
                this.options[key] = $.extend({}, this.options[key], value),
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
                this._restrictNativeVideoControls(),
                this._updateNativeVideoControls();
                break;
            case "noFullWindow":
                this.options[key] = $.extend({}, this.options[key], value),
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls),
                this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow),
                this._restrictNativeVideoControls(),
                this._updateButtons();
                break;
            case "noVolume":
                this.options[key] = $.extend({}, this.options[key], value),
                this.status.noVolume = this._uaBlocklist(this.options.noVolume),
                this._updateVolume(),
                this._updateMute();
                break;
            case "emulateHtml":
                this.options[key] !== value && (this.options[key] = value,
                value ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
                break;
            case "timeFormat":
                this.options[key] = $.extend({}, this.options[key], value);
                break;
            case "keyEnabled":
                this.options[key] = value,
                value || this !== $.jPlayer.focus || ($.jPlayer.focus = null );
                break;
            case "keyBindings":
                this.options[key] = $.extend(!0, {}, this.options[key], value);
                break;
            case "audioFullScreen":
                this.options[key] = value;
                break;
            case "autoBlur":
                this.options[key] = value
            }
            return this
        },
        _refreshSize: function() {
            this._setSize(),
            this._addUiClass(),
            this._updateSize(),
            this._updateButtons(),
            this._updateAutohide(),
            this._trigger($.jPlayer.event.resize)
        },
        _setSize: function() {
            this.options.fullWindow ? (this.status.width = this.options.sizeFull.width,
            this.status.height = this.options.sizeFull.height,
            this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width,
            this.status.height = this.options.size.height,
            this.status.cssClass = this.options.size.cssClass),
            this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
        },
        _removeUiClass: function() {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
        },
        _updateSize: function() {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }),
            !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _updateAutohide: function() {
            var self = this
              , event = "mousemove.jPlayer"
              , namespace = ".jPlayerAutohide"
              , eventType = event + namespace
              , handler = function(event) {
                var deltaX, deltaY, moved = !1;
                "undefined" != typeof self.internal.mouse ? (deltaX = self.internal.mouse.x - event.pageX,
                deltaY = self.internal.mouse.y - event.pageY,
                moved = Math.floor(deltaX) > 0 || Math.floor(deltaY) > 0) : moved = !0,
                self.internal.mouse = {
                    x: event.pageX,
                    y: event.pageY
                },
                moved && self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
                    clearTimeout(self.internal.autohideId),
                    self.internal.autohideId = setTimeout(function() {
                        self.css.jq.gui.fadeOut(self.options.autohide.fadeOut)
                    }, self.options.autohide.hold)
                })
            }
            ;
            this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0),
            clearTimeout(this.internal.autohideId),
            delete this.internal.mouse,
            this.element.unbind(namespace),
            this.css.jq.gui.unbind(namespace),
            this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind(eventType, handler),
            this.css.jq.gui.bind(eventType, handler),
            this.css.jq.gui.hide()) : this.css.jq.gui.show())
        },
        fullScreen: function(event) {
            var guiAction = "object" == typeof event;
            guiAction && this.options.useStateClassSkin && this.options.fullScreen ? this._setOption("fullScreen", !1) : this._setOption("fullScreen", !0)
        },
        restoreScreen: function() {
            this._setOption("fullScreen", !1)
        },
        _fullscreenAddEventListeners: function() {
            var self = this
              , fs = $.jPlayer.nativeFeatures.fullscreen;
            fs.api.fullscreenEnabled && fs.event.fullscreenchange && ("function" != typeof this.internal.fullscreenchangeHandler && (this.internal.fullscreenchangeHandler = function() {
                self._fullscreenchange()
            }
            ),
            document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
        },
        _fullscreenRemoveEventListeners: function() {
            var fs = $.jPlayer.nativeFeatures.fullscreen;
            this.internal.fullscreenchangeHandler && document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
        },
        _fullscreenchange: function() {
            this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() && this._setOption("fullScreen", !1)
        },
        _requestFullscreen: function() {
            var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0]
              , fs = $.jPlayer.nativeFeatures.fullscreen;
            fs.used.webkitVideo && (e = this.htmlElement.video),
            fs.api.fullscreenEnabled && fs.api.requestFullscreen(e)
        },
        _exitFullscreen: function() {
            var e, fs = $.jPlayer.nativeFeatures.fullscreen;
            fs.used.webkitVideo && (e = this.htmlElement.video),
            fs.api.fullscreenEnabled && fs.api.exitFullscreen(e)
        },
        _html_initMedia: function(media) {
            var $media = $(this.htmlElement.media).empty();
            $.each(media.track || [], function(i, v) {
                var track = document.createElement("track");
                track.setAttribute("kind", v.kind ? v.kind : ""),
                track.setAttribute("src", v.src ? v.src : ""),
                track.setAttribute("srclang", v.srclang ? v.srclang : ""),
                track.setAttribute("label", v.label ? v.label : ""),
                v.def && track.setAttribute("default", v.def),
                $media.append(track)
            }),
            this.htmlElement.media.src = this.status.src,
            "none" !== this.options.preload && this._html_load(),
            this._trigger($.jPlayer.event.timeupdate)
        },
        _html_setFormat: function(media) {
            var self = this;
            $.each(this.formats, function(priority, format) {
                return self.html.support[format] && media[format] ? (self.status.src = media[format],
                self.status.format[format] = !0,
                self.status.formatType = format,
                !1) : void 0
            })
        },
        _html_setAudio: function(media) {
            this._html_setFormat(media),
            this.htmlElement.media = this.htmlElement.audio,
            this._html_initMedia(media)
        },
        _html_setVideo: function(media) {
            this._html_setFormat(media),
            this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : ""),
            this.htmlElement.media = this.htmlElement.video,
            this._html_initMedia(media)
        },
        _html_resetMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.id !== this.internal.video.id || this.status.nativeVideoControls || this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            }),
            this.htmlElement.media.pause())
        },
        _html_clearMedia: function() {
            this.htmlElement.media && (this.htmlElement.media.src = "about:blank",
            this.htmlElement.media.load())
        },
        _html_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1,
            this.htmlElement.media.load()),
            clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function(time) {
            var self = this
              , media = this.htmlElement.media;
            if (this.androidFix.pause = !1,
            this._html_load(),
            this.androidFix.setMedia)
                this.androidFix.play = !0,
                this.androidFix.time = time;
            else if (isNaN(time))
                media.play();
            else {
                this.internal.cmdsIgnored && media.play();
                try {
                    if (media.seekable && !("object" == typeof media.seekable && media.seekable.length > 0))
                        throw 1;
                    media.currentTime = time,
                    media.play()
                } catch (err) {
                    return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                        self.play(time)
                    }, 250))
                }
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function(time) {
            var self = this
              , media = this.htmlElement.media;
            if (this.androidFix.play = !1,
            time > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId),
            media.pause(),
            this.androidFix.setMedia)
                this.androidFix.pause = !0,
                this.androidFix.time = time;
            else if (!isNaN(time))
                try {
                    if (media.seekable && !("object" == typeof media.seekable && media.seekable.length > 0))
                        throw 1;
                    media.currentTime = time
                } catch (err) {
                    return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                        self.pause(time)
                    }, 250))
                }
            time > 0 && this._html_checkWaitForPlay()
        },
        _html_playHead: function(percent) {
            var self = this
              , media = this.htmlElement.media;
            this._html_load();
            try {
                if ("object" == typeof media.seekable && media.seekable.length > 0)
                    media.currentTime = percent * media.seekable.end(media.seekable.length - 1) / 100;
                else {
                    if (!(media.duration > 0) || isNaN(media.duration))
                        throw "e";
                    media.currentTime = percent * media.duration / 100
                }
            } catch (err) {
                return void (this.internal.htmlDlyCmdId = setTimeout(function() {
                    self.playHead(percent)
                }, 250))
            }
            this.status.waitForLoad || this._html_checkWaitForPlay()
        },
        _html_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1,
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            this.status.video && (this.internal.poster.jq.hide(),
            this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _html_setProperty: function(property, value) {
            this.html.audio.available && (this.htmlElement.audio[property] = value),
            this.html.video.available && (this.htmlElement.video[property] = value)
        },
        _aurora_setAudio: function(media) {
            var self = this;
            $.each(this.formats, function(priority, format) {
                return self.aurora.support[format] && media[format] ? (self.status.src = media[format],
                self.status.format[format] = !0,
                self.status.formatType = format,
                !1) : void 0
            }),
            this.aurora.player = new AV.Player.fromURL(this.status.src),
            this._addAuroraEventListeners(this.aurora.player, this.aurora),
            "auto" === this.options.preload && (this._aurora_load(),
            this.status.waitForLoad = !1)
        },
        _aurora_resetMedia: function() {
            this.aurora.player && this.aurora.player.stop()
        },
        _aurora_clearMedia: function() {},
        _aurora_load: function() {
            this.status.waitForLoad && (this.status.waitForLoad = !1,
            this.aurora.player.preload())
        },
        _aurora_play: function(time) {
            this.status.waitForLoad || isNaN(time) || this.aurora.player.seek(time),
            this.aurora.player.playing || this.aurora.player.play(),
            this.status.waitForLoad = !1,
            this._aurora_checkWaitForPlay(),
            this._updateButtons(!0),
            this._trigger($.jPlayer.event.play)
        },
        _aurora_pause: function(time) {
            isNaN(time) || this.aurora.player.seek(1e3 * time),
            this.aurora.player.pause(),
            time > 0 && this._aurora_checkWaitForPlay(),
            this._updateButtons(!1),
            this._trigger($.jPlayer.event.pause)
        },
        _aurora_playHead: function(percent) {
            this.aurora.player.duration > 0 && this.aurora.player.seek(percent * this.aurora.player.duration / 100),
            this.status.waitForLoad || this._aurora_checkWaitForPlay()
        },
        _aurora_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1)
        },
        _aurora_volume: function(v) {
            this.aurora.player.volume = 100 * v
        },
        _aurora_mute: function(m) {
            m ? (this.aurora.properties.lastvolume = this.aurora.player.volume,
            this.aurora.player.volume = 0) : this.aurora.player.volume = this.aurora.properties.lastvolume,
            this.aurora.properties.muted = m
        },
        _flash_setAudio: function(media) {
            var self = this;
            try {
                $.each(this.formats, function(priority, format) {
                    if (self.flash.support[format] && media[format]) {
                        switch (format) {
                        case "m4a":
                        case "fla":
                            self._getMovie().fl_setAudio_m4a(media[format]);
                            break;
                        case "mp3":
                            self._getMovie().fl_setAudio_mp3(media[format]);
                            break;
                        case "rtmpa":
                            self._getMovie().fl_setAudio_rtmp(media[format])
                        }
                        return self.status.src = media[format],
                        self.status.format[format] = !0,
                        self.status.formatType = format,
                        !1
                    }
                }),
                "auto" === this.options.preload && (this._flash_load(),
                this.status.waitForLoad = !1)
            } catch (err) {
                this._flashError(err)
            }
        },
        _flash_setVideo: function(media) {
            var self = this;
            try {
                $.each(this.formats, function(priority, format) {
                    if (self.flash.support[format] && media[format]) {
                        switch (format) {
                        case "m4v":
                        case "flv":
                            self._getMovie().fl_setVideo_m4v(media[format]);
                            break;
                        case "rtmpv":
                            self._getMovie().fl_setVideo_rtmp(media[format])
                        }
                        return self.status.src = media[format],
                        self.status.format[format] = !0,
                        self.status.formatType = format,
                        !1
                    }
                }),
                "auto" === this.options.preload && (this._flash_load(),
                this.status.waitForLoad = !1)
            } catch (err) {
                this._flashError(err)
            }
        },
        _flash_resetMedia: function() {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            }),
            this._flash_pause(NaN)
        },
        _flash_clearMedia: function() {
            try {
                this._getMovie().fl_clearMedia()
            } catch (err) {
                this._flashError(err)
            }
        },
        _flash_load: function() {
            try {
                this._getMovie().fl_load()
            } catch (err) {
                this._flashError(err)
            }
            this.status.waitForLoad = !1
        },
        _flash_play: function(time) {
            try {
                this._getMovie().fl_play(time)
            } catch (err) {
                this._flashError(err)
            }
            this.status.waitForLoad = !1,
            this._flash_checkWaitForPlay()
        },
        _flash_pause: function(time) {
            try {
                this._getMovie().fl_pause(time)
            } catch (err) {
                this._flashError(err)
            }
            time > 0 && (this.status.waitForLoad = !1,
            this._flash_checkWaitForPlay())
        },
        _flash_playHead: function(p) {
            try {
                this._getMovie().fl_play_head(p)
            } catch (err) {
                this._flashError(err)
            }
            this.status.waitForLoad || this._flash_checkWaitForPlay()
        },
        _flash_checkWaitForPlay: function() {
            this.status.waitForPlay && (this.status.waitForPlay = !1,
            this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(),
            this.status.video && (this.internal.poster.jq.hide(),
            this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _flash_volume: function(v) {
            try {
                this._getMovie().fl_volume(v)
            } catch (err) {
                this._flashError(err)
            }
        },
        _flash_mute: function(m) {
            try {
                this._getMovie().fl_mute(m)
            } catch (err) {
                this._flashError(err)
            }
        },
        _getMovie: function() {
            return document[this.internal.flash.id]
        },
        _getFlashPluginVersion: function() {
            var flash, version = 0;
            if (window.ActiveXObject)
                try {
                    if (flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                        var v = flash.GetVariable("$version");
                        v && (v = v.split(" ")[1].split(","),
                        version = parseInt(v[0], 10) + "." + parseInt(v[1], 10))
                    }
                } catch (e) {}
            else
                navigator.plugins && navigator.mimeTypes.length > 0 && (flash = navigator.plugins["Shockwave Flash"],
                flash && (version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1")));
            return 1 * version
        },
        _checkForFlash: function(version) {
            var flashOk = !1;
            return this._getFlashPluginVersion() >= version && (flashOk = !0),
            flashOk
        },
        _validString: function(url) {
            return url && "string" == typeof url
        },
        _limitValue: function(value, min, max) {
            return min > value ? min : value > max ? max : value
        },
        _urlNotSetError: function(context) {
            this._error({
                type: $.jPlayer.error.URL_NOT_SET,
                context: context,
                message: $.jPlayer.errorMsg.URL_NOT_SET,
                hint: $.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function(error) {
            var errorType;
            errorType = this.internal.ready ? "FLASH_DISABLED" : "FLASH",
            this._error({
                type: $.jPlayer.error[errorType],
                context: this.internal.flash.swf,
                message: $.jPlayer.errorMsg[errorType] + error.message,
                hint: $.jPlayer.errorHint[errorType]
            }),
            this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function(error) {
            this._trigger($.jPlayer.event.error, error),
            this.options.errorAlerts && this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context)
        },
        _warning: function(warning) {
            this._trigger($.jPlayer.event.warning, undefined, warning),
            this.options.warningAlerts && this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
        },
        _alert: function(message) {
            var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + message;
            this.options.consoleAlerts ? window.console && window.console.log && window.console.log(msg) : alert(msg)
        },
        _emulateHtmlBridge: function() {
            var self = this;
            $.each($.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = function(arg) {
                    self[name](arg)
                }
            }),
            $.each($.jPlayer.event, function(eventName, eventType) {
                var nativeEvent = !0;
                $.each($.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
                    return name === eventName ? (nativeEvent = !1,
                    !1) : void 0
                }),
                nativeEvent && self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() {
                    self._emulateHtmlUpdate();
                    var domEvent = document.createEvent("Event");
                    domEvent.initEvent(eventName, !1, !0),
                    self.internal.domNode.dispatchEvent(domEvent)
                })
            })
        },
        _emulateHtmlUpdate: function() {
            var self = this;
            $.each($.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = self.status[name]
            }),
            $.each($.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
                self.internal.domNode[name] = self.options[name]
            })
        },
        _destroyHtmlBridge: function() {
            var self = this;
            this.element.unbind(".jPlayerHtml");
            var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
            $.each(emulated.split(/\s+/g), function(i, name) {
                delete self.internal.domNode[name]
            })
        }
    },
    $.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    },
    $.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found "
    },
    $.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    },
    $.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    },
    $.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    },
    $.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
});
!function($) {
    "use strict";
    var nextId = 0
      , Filestyle = function(element, options) {
        this.options = options,
        this.$elementFilestyle = [],
        this.$element = $(element)
    }
    ;
    Filestyle.prototype = {
        clear: function() {
            this.$element.val(""),
            this.$elementFilestyle.find(":text").val(""),
            this.$elementFilestyle.find(".badge").remove()
        },
        destroy: function() {
            this.$element.removeAttr("style").removeData("filestyle"),
            this.$elementFilestyle.remove()
        },
        disabled: function(value) {
            if (value === !0)
                this.options.disabled || (this.$element.attr("disabled", "true"),
                this.$elementFilestyle.find("label").attr("disabled", "true"),
                this.options.disabled = !0);
            else {
                if (value !== !1)
                    return this.options.disabled;
                this.options.disabled && (this.$element.removeAttr("disabled"),
                this.$elementFilestyle.find("label").removeAttr("disabled"),
                this.options.disabled = !1)
            }
        },
        buttonBefore: function(value) {
            if (value === !0)
                this.options.buttonBefore || (this.options.buttonBefore = !0,
                this.options.input && (this.$elementFilestyle.remove(),
                this.constructor(),
                this.pushNameFiles()));
            else {
                if (value !== !1)
                    return this.options.buttonBefore;
                this.options.buttonBefore && (this.options.buttonBefore = !1,
                this.options.input && (this.$elementFilestyle.remove(),
                this.constructor(),
                this.pushNameFiles()))
            }
        },
        icon: function(value) {
            if (value === !0)
                this.options.icon || (this.options.icon = !0,
                this.$elementFilestyle.find("label").prepend(this.htmlIcon()));
            else {
                if (value !== !1)
                    return this.options.icon;
                this.options.icon && (this.options.icon = !1,
                this.$elementFilestyle.find(".icon-span-filestyle").remove())
            }
        },
        input: function(value) {
            if (value === !0)
                this.options.input || (this.options.input = !0,
                this.options.buttonBefore ? this.$elementFilestyle.append(this.htmlInput()) : this.$elementFilestyle.prepend(this.htmlInput()),
                this.$elementFilestyle.find(".badge").remove(),
                this.pushNameFiles(),
                this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn"));
            else {
                if (value !== !1)
                    return this.options.input;
                if (this.options.input) {
                    this.options.input = !1,
                    this.$elementFilestyle.find(":text").remove();
                    var files = this.pushNameFiles();
                    files.length > 0 && this.options.badge && this.$elementFilestyle.find("label").append(' <span class="badge">' + files.length + "</span>"),
                    this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn")
                }
            }
        },
        size: function(value) {
            if (void 0 === value)
                return this.options.size;
            var btn = this.$elementFilestyle.find("label")
              , input = this.$elementFilestyle.find("input");
            btn.removeClass("btn-lg btn-sm"),
            input.removeClass("input-lg input-sm"),
            "nr" != value && (btn.addClass("btn-" + value),
            input.addClass("input-" + value))
        },
        placeholder: function(value) {
            return void 0 === value ? this.options.placeholder : (this.options.placeholder = value,
            void this.$elementFilestyle.find("input").attr("placeholder", value))
        },
        buttonText: function(value) {
            return void 0 === value ? this.options.buttonText : (this.options.buttonText = value,
            void this.$elementFilestyle.find("label .buttonText").html(this.options.buttonText))
        },
        buttonName: function(value) {
            return void 0 === value ? this.options.buttonName : (this.options.buttonName = value,
            void this.$elementFilestyle.find("label").attr({
                "class": "btn " + this.options.buttonName
            }))
        },
        iconName: function(value) {
            return void 0 === value ? this.options.iconName : void this.$elementFilestyle.find(".icon-span-filestyle").attr({
                "class": "icon-span-filestyle " + this.options.iconName
            })
        },
        htmlIcon: function() {
            return this.options.icon ? '<span class="icon-span-filestyle ' + this.options.iconName + '"></span> ' : ""
        },
        htmlInput: function() {
            return this.options.input ? '<input type="text" class="form-control ' + ("nr" == this.options.size ? "" : "input-" + this.options.size) + '" placeholder="' + this.options.placeholder + '" disabled> ' : ""
        },
        pushNameFiles: function() {
            var content = ""
              , files = [];
            void 0 === this.$element[0].files ? files[0] = {
                name: this.$element[0] && this.$element[0].value
            } : files = this.$element[0].files;
            for (var i = 0; i < files.length; i++)
                content += files[i].name.split("\\").pop() + ", ";
            return "" !== content ? this.$elementFilestyle.find(":text").val(content.replace(/\, $/g, "")) : this.$elementFilestyle.find(":text").val(""),
            files
        },
        constructor: function() {
            var _self = this
              , html = ""
              , id = _self.$element.attr("id")
              , btn = "";
            "" !== id && id || (id = "filestyle-" + nextId,
            _self.$element.attr({
                id: id
            }),
            nextId++),
            btn = '<span class="group-span-filestyle ' + (_self.options.input ? "input-group-btn" : "") + '"><label for="' + id + '" class="btn ' + _self.options.buttonName + " " + ("nr" == _self.options.size ? "" : "btn-" + _self.options.size) + '" ' + (_self.options.disabled ? 'disabled="true"' : "") + ">" + _self.htmlIcon() + '<span class="buttonText">' + _self.options.buttonText + "</span></label></span>",
            html = _self.options.buttonBefore ? btn + _self.htmlInput() : _self.htmlInput() + btn,
            _self.$elementFilestyle = $('<div class="bootstrap-filestyle input-group">' + html + "</div>"),
            _self.$elementFilestyle.find(".group-span-filestyle").attr("tabindex", _self.$element.attr("tabindex") || "0").keypress(function(e) {
                return 13 === e.keyCode || 32 === e.charCode ? (_self.$elementFilestyle.find("label").click(),
                !1) : void 0
            }),
            _self.$element.css({
                position: "absolute",
                clip: "rect(0px 0px 0px 0px)"
            }).attr("tabindex", "-1").after(_self.$elementFilestyle),
            _self.options.disabled && _self.$element.attr("disabled", "true"),
            _self.$element.change(function() {
                var files = _self.pushNameFiles();
                0 == _self.options.input && _self.options.badge ? 0 == _self.$elementFilestyle.find(".badge").length ? _self.$elementFilestyle.find("label").append(' <span class="badge">' + files.length + "</span>") : 0 == files.length ? _self.$elementFilestyle.find(".badge").remove() : _self.$elementFilestyle.find(".badge").html(files.length) : _self.$elementFilestyle.find(".badge").remove()
            }),
            window.navigator.userAgent.search(/firefox/i) > -1 && _self.$elementFilestyle.find("label").click(function() {
                return _self.$element.click(),
                !1
            })
        }
    };
    var old = $.fn.filestyle;
    $.fn.filestyle = function(option, value) {
        var get = ""
          , element = this.each(function() {
            if ("file" === $(this).attr("type")) {
                var $this = $(this)
                  , data = $this.data("filestyle")
                  , options = $.extend({}, $.fn.filestyle.defaults, option, "object" == typeof option && option);
                data || ($this.data("filestyle", data = new Filestyle(this,options)),
                data.constructor()),
                "string" == typeof option && (get = data[option](value))
            }
        });
        return void 0 !== typeof get ? get : element
    }
    ,
    $.fn.filestyle.defaults = {
        buttonText: "Choose file",
        iconName: "glyphicon glyphicon-folder-open",
        buttonName: "btn-default",
        size: "nr",
        input: !0,
        badge: !0,
        icon: !0,
        buttonBefore: !1,
        disabled: !1,
        placeholder: ""
    },
    $.fn.filestyle.noConflict = function() {
        return $.fn.filestyle = old,
        this
    }
    ,
    $(function() {
        $(".filestyle").each(function() {
            var $this = $(this)
              , options = {
                input: "false" === $this.attr("data-input") ? !1 : !0,
                icon: "false" === $this.attr("data-icon") ? !1 : !0,
                buttonBefore: "true" === $this.attr("data-buttonBefore") ? !0 : !1,
                disabled: "true" === $this.attr("data-disabled") ? !0 : !1,
                size: $this.attr("data-size"),
                buttonText: $this.attr("data-buttonText"),
                buttonName: $this.attr("data-buttonName"),
                iconName: $this.attr("data-iconName"),
                badge: "false" === $this.attr("data-badge") ? !1 : !0,
                placeholder: $this.attr("data-placeholder")
            };
            $this.filestyle(options)
        })
    })
}(window.jQuery);
!function(window) {
    var ua = navigator.userAgent;
    window.HTMLPictureElement && /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 41 && addEventListener("resize", function() {
        var timer, dummySrc = document.createElement("source"), fixRespimg = function(img) {
            var source, sizes, picture = img.parentNode;
            "PICTURE" === picture.nodeName.toUpperCase() ? (source = dummySrc.cloneNode(),
            picture.insertBefore(source, picture.firstElementChild),
            setTimeout(function() {
                picture.removeChild(source)
            })) : (!img._pfLastSize || img.offsetWidth > img._pfLastSize) && (img._pfLastSize = img.offsetWidth,
            sizes = img.sizes,
            img.sizes += ",100vw",
            setTimeout(function() {
                img.sizes = sizes
            }))
        }
        , findPictureImgs = function() {
            var i, imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
            for (i = 0; i < imgs.length; i++)
                fixRespimg(imgs[i])
        }
        , onResize = function() {
            clearTimeout(timer),
            timer = setTimeout(findPictureImgs, 99)
        }
        , mq = window.matchMedia && matchMedia("(orientation: landscape)"), init = function() {
            onResize(),
            mq && mq.addListener && mq.addListener(onResize)
        }
        ;
        return dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        /^[c|i]|d$/.test(document.readyState || "") ? init() : document.addEventListener("DOMContentLoaded", init),
        onResize
    }())
}(window),
function(window, document, undefined) {
    "use strict";
    function isSpace(c) {
        return " " === c || "	" === c || "\n" === c || "\f" === c || "\r" === c
    }
    function detectTypeSupport(type, typeUri) {
        var image = new window.Image;
        return image.onerror = function() {
            types[type] = !1,
            picturefill()
        }
        ,
        image.onload = function() {
            types[type] = 1 === image.width,
            picturefill()
        }
        ,
        image.src = typeUri,
        "pending"
    }
    function updateMetrics() {
        isVwDirty = !1,
        DPR = window.devicePixelRatio,
        cssCache = {},
        sizeLengthCache = {},
        pf.DPR = DPR || 1,
        units.width = Math.max(window.innerWidth || 0, docElem.clientWidth),
        units.height = Math.max(window.innerHeight || 0, docElem.clientHeight),
        units.vw = units.width / 100,
        units.vh = units.height / 100,
        evalId = [units.height, units.width, DPR].join("-"),
        units.em = pf.getEmValue(),
        units.rem = units.em
    }
    function chooseLowRes(lowerValue, higherValue, dprValue, isCached) {
        var bonusFactor, tooMuch, bonus, meanDensity;
        return "saveData" === cfg.algorithm ? lowerValue > 2.7 ? meanDensity = dprValue + 1 : (tooMuch = higherValue - dprValue,
        bonusFactor = Math.pow(lowerValue - .6, 1.5),
        bonus = tooMuch * bonusFactor,
        isCached && (bonus += .1 * bonusFactor),
        meanDensity = lowerValue + bonus) : meanDensity = dprValue > 1 ? Math.sqrt(lowerValue * higherValue) : lowerValue,
        meanDensity > dprValue
    }
    function applyBestCandidate(img) {
        var srcSetCandidates, matchingSet = pf.getSet(img), evaluated = !1;
        "pending" !== matchingSet && (evaluated = evalId,
        matchingSet && (srcSetCandidates = pf.setRes(matchingSet),
        pf.applySetCandidate(srcSetCandidates, img))),
        img[pf.ns].evaled = evaluated
    }
    function ascendingSort(a, b) {
        return a.res - b.res
    }
    function setSrcToCur(img, src, set) {
        var candidate;
        return !set && src && (set = img[pf.ns].sets,
        set = set && set[set.length - 1]),
        candidate = getCandidateForSrc(src, set),
        candidate && (src = pf.makeUrl(src),
        img[pf.ns].curSrc = src,
        img[pf.ns].curCan = candidate,
        candidate.res || setResolution(candidate, candidate.set.sizes)),
        candidate
    }
    function getCandidateForSrc(src, set) {
        var i, candidate, candidates;
        if (src && set)
            for (candidates = pf.parseSet(set),
            src = pf.makeUrl(src),
            i = 0; i < candidates.length; i++)
                if (src === pf.makeUrl(candidates[i].url)) {
                    candidate = candidates[i];
                    break
                }
        return candidate
    }
    function getAllSourceElements(picture, candidates) {
        var i, len, source, srcset, sources = picture.getElementsByTagName("source");
        for (i = 0,
        len = sources.length; len > i; i++)
            source = sources[i],
            source[pf.ns] = !0,
            srcset = source.getAttribute("srcset"),
            srcset && candidates.push({
                srcset: srcset,
                media: source.getAttribute("media"),
                type: source.getAttribute("type"),
                sizes: source.getAttribute("sizes")
            })
    }
    function parseSrcset(input, set) {
        function collectCharacters(regEx) {
            var chars, match = regEx.exec(input.substring(pos));
            return match ? (chars = match[0],
            pos += chars.length,
            chars) : void 0
        }
        function parseDescriptors() {
            var w, d, h, i, desc, lastChar, value, intVal, floatVal, pError = !1, candidate = {};
            for (i = 0; i < descriptors.length; i++)
                desc = descriptors[i],
                lastChar = desc[desc.length - 1],
                value = desc.substring(0, desc.length - 1),
                intVal = parseInt(value, 10),
                floatVal = parseFloat(value),
                regexNonNegativeInteger.test(value) && "w" === lastChar ? ((w || d) && (pError = !0),
                0 === intVal ? pError = !0 : w = intVal) : regexFloatingPoint.test(value) && "x" === lastChar ? ((w || d || h) && (pError = !0),
                0 > floatVal ? pError = !0 : d = floatVal) : regexNonNegativeInteger.test(value) && "h" === lastChar ? ((h || d) && (pError = !0),
                0 === intVal ? pError = !0 : h = intVal) : pError = !0;
            pError || (candidate.url = url,
            w && (candidate.w = w),
            d && (candidate.d = d),
            h && (candidate.h = h),
            h || d || w || (candidate.d = 1),
            1 === candidate.d && (set.has1x = !0),
            candidate.set = set,
            candidates.push(candidate))
        }
        function tokenize() {
            for (collectCharacters(regexLeadingSpaces),
            currentDescriptor = "",
            state = "in descriptor"; ; ) {
                if (c = input.charAt(pos),
                "in descriptor" === state)
                    if (isSpace(c))
                        currentDescriptor && (descriptors.push(currentDescriptor),
                        currentDescriptor = "",
                        state = "after descriptor");
                    else {
                        if ("," === c)
                            return pos += 1,
                            currentDescriptor && descriptors.push(currentDescriptor),
                            void parseDescriptors();
                        if ("(" === c)
                            currentDescriptor += c,
                            state = "in parens";
                        else {
                            if ("" === c)
                                return currentDescriptor && descriptors.push(currentDescriptor),
                                void parseDescriptors();
                            currentDescriptor += c
                        }
                    }
                else if ("in parens" === state)
                    if (")" === c)
                        currentDescriptor += c,
                        state = "in descriptor";
                    else {
                        if ("" === c)
                            return descriptors.push(currentDescriptor),
                            void parseDescriptors();
                        currentDescriptor += c
                    }
                else if ("after descriptor" === state)
                    if (isSpace(c))
                        ;
                    else {
                        if ("" === c)
                            return void parseDescriptors();
                        state = "in descriptor",
                        pos -= 1
                    }
                pos += 1
            }
        }
        for (var url, descriptors, currentDescriptor, state, c, inputLength = input.length, pos = 0, candidates = []; ; ) {
            if (collectCharacters(regexLeadingCommasOrSpaces),
            pos >= inputLength)
                return candidates;
            url = collectCharacters(regexLeadingNotSpaces),
            descriptors = [],
            "," === url.slice(-1) ? (url = url.replace(regexTrailingCommas, ""),
            parseDescriptors()) : tokenize()
        }
    }
    function parseSizes(strValue) {
        function parseComponentValues(str) {
            function pushComponent() {
                component && (componentArray.push(component),
                component = "")
            }
            function pushComponentArray() {
                componentArray[0] && (listArray.push(componentArray),
                componentArray = [])
            }
            for (var chrctr, component = "", componentArray = [], listArray = [], parenDepth = 0, pos = 0, inComment = !1; ; ) {
                if (chrctr = str.charAt(pos),
                "" === chrctr)
                    return pushComponent(),
                    pushComponentArray(),
                    listArray;
                if (inComment) {
                    if ("*" === chrctr && "/" === str[pos + 1]) {
                        inComment = !1,
                        pos += 2,
                        pushComponent();
                        continue
                    }
                    pos += 1
                } else {
                    if (isSpace(chrctr)) {
                        if (str.charAt(pos - 1) && isSpace(str.charAt(pos - 1)) || !component) {
                            pos += 1;
                            continue
                        }
                        if (0 === parenDepth) {
                            pushComponent(),
                            pos += 1;
                            continue
                        }
                        chrctr = " "
                    } else if ("(" === chrctr)
                        parenDepth += 1;
                    else if (")" === chrctr)
                        parenDepth -= 1;
                    else {
                        if ("," === chrctr) {
                            pushComponent(),
                            pushComponentArray(),
                            pos += 1;
                            continue
                        }
                        if ("/" === chrctr && "*" === str.charAt(pos + 1)) {
                            inComment = !0,
                            pos += 2;
                            continue
                        }
                    }
                    component += chrctr,
                    pos += 1
                }
            }
        }
        function isValidNonNegativeSourceSizeValue(s) {
            return regexCssLengthWithUnits.test(s) && parseFloat(s) >= 0 ? !0 : regexCssCalc.test(s) ? !0 : "0" === s || "-0" === s || "+0" === s ? !0 : !1
        }
        var i, unparsedSizesList, unparsedSizesListLength, unparsedSize, lastComponentValue, size, regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
        for (unparsedSizesList = parseComponentValues(strValue),
        unparsedSizesListLength = unparsedSizesList.length,
        i = 0; unparsedSizesListLength > i; i++)
            if (unparsedSize = unparsedSizesList[i],
            lastComponentValue = unparsedSize[unparsedSize.length - 1],
            isValidNonNegativeSourceSizeValue(lastComponentValue)) {
                if (size = lastComponentValue,
                unparsedSize.pop(),
                0 === unparsedSize.length)
                    return size;
                if (unparsedSize = unparsedSize.join(" "),
                pf.matchesMedia(unparsedSize))
                    return size
            }
        return "100vw"
    }
    document.createElement("picture");
    var warn, eminpx, alwaysCheckWDescriptor, evalId, pf = {}, noop = function() {}
    , image = document.createElement("img"), getImgAttr = image.getAttribute, setImgAttr = image.setAttribute, removeImgAttr = image.removeAttribute, docElem = document.documentElement, types = {}, cfg = {
        algorithm: ""
    }, srcAttr = "data-pfsrc", srcsetAttr = srcAttr + "set", ua = navigator.userAgent, supportAbort = /rident/.test(ua) || /ecko/.test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35, curSrcProp = "currentSrc", regWDesc = /\s+\+?\d+(e\d+)?w/, regSize = /(\([^)]+\))?\s*(.+)/, setOptions = window.picturefillCFG, baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", fsCss = "font-size:100%!important;", isVwDirty = !0, cssCache = {}, sizeLengthCache = {}, DPR = window.devicePixelRatio, units = {
        px: 1,
        "in": 96
    }, anchor = document.createElement("a"), alreadyRun = !1, regexLeadingSpaces = /^[ \t\n\r\u000c]+/, regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/, regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/, regexTrailingCommas = /[,]+$/, regexNonNegativeInteger = /^\d+$/, regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, on = function(obj, evt, fn, capture) {
        obj.addEventListener ? obj.addEventListener(evt, fn, capture || !1) : obj.attachEvent && obj.attachEvent("on" + evt, fn)
    }
    , memoize = function(fn) {
        var cache = {};
        return function(input) {
            return input in cache || (cache[input] = fn(input)),
            cache[input]
        }
    }
    , evalCSS = function() {
        var regLength = /^([\d\.]+)(em|vw|px)$/
          , replace = function() {
            for (var args = arguments, index = 0, string = args[0]; ++index in args; )
                string = string.replace(args[index], args[++index]);
            return string
        }
          , buildStr = memoize(function(css) {
            return "return " + replace((css || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
        });
        return function(css, length) {
            var parsedLength;
            if (!(css in cssCache))
                if (cssCache[css] = !1,
                length && (parsedLength = css.match(regLength)))
                    cssCache[css] = parsedLength[1] * units[parsedLength[2]];
                else
                    try {
                        cssCache[css] = new Function("e",buildStr(css))(units)
                    } catch (e) {}
            return cssCache[css]
        }
    }(), setResolution = function(candidate, sizesattr) {
        return candidate.w ? (candidate.cWidth = pf.calcListLength(sizesattr || "100vw"),
        candidate.res = candidate.w / candidate.cWidth) : candidate.res = candidate.d,
        candidate
    }
    , picturefill = function(opt) {
        var elements, i, plen, options = opt || {};
        if (options.elements && 1 === options.elements.nodeType && ("IMG" === options.elements.nodeName.toUpperCase() ? options.elements = [options.elements] : (options.context = options.elements,
        options.elements = null )),
        elements = options.elements || pf.qsa(options.context || document, options.reevaluate || options.reselect ? pf.sel : pf.selShort),
        plen = elements.length) {
            for (pf.setupRun(options),
            alreadyRun = !0,
            i = 0; plen > i; i++)
                pf.fillImg(elements[i], options);
            pf.teardownRun(options)
        }
    }
    ;
    warn = window.console && console.warn ? function(message) {
        console.warn(message)
    }
     : noop,
    curSrcProp in image || (curSrcProp = "src"),
    types["image/jpeg"] = !0,
    types["image/gif"] = !0,
    types["image/png"] = !0,
    types["image/svg+xml"] = document.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1"),
    pf.ns = ("pf" + (new Date).getTime()).substr(0, 9),
    pf.supSrcset = "srcset" in image,
    pf.supSizes = "sizes" in image,
    pf.supPicture = !!window.HTMLPictureElement,
    pf.supSrcset && pf.supPicture && !pf.supSizes && !function(image2) {
        image.srcset = "data:,a",
        image2.src = "data:,a",
        pf.supSrcset = image.complete === image2.complete,
        pf.supPicture = pf.supSrcset && pf.supPicture
    }(document.createElement("img")),
    pf.selShort = "picture>img,img[srcset]",
    pf.sel = pf.selShort,
    pf.cfg = cfg,
    pf.supSrcset && (pf.sel += ",img[" + srcsetAttr + "]"),
    pf.DPR = DPR || 1,
    pf.u = units,
    pf.types = types,
    alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes,
    pf.setSize = noop,
    pf.makeUrl = memoize(function(src) {
        return anchor.href = src,
        anchor.href
    }),
    pf.qsa = function(context, sel) {
        return context.querySelectorAll(sel)
    }
    ,
    pf.matchesMedia = function() {
        return window.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? pf.matchesMedia = function(media) {
            return !media || matchMedia(media).matches
        }
         : pf.matchesMedia = pf.mMQ,
        pf.matchesMedia.apply(this, arguments)
    }
    ,
    pf.mMQ = function(media) {
        return media ? evalCSS(media) : !0
    }
    ,
    pf.calcLength = function(sourceSizeValue) {
        var value = evalCSS(sourceSizeValue, !0) || !1;
        return 0 > value && (value = !1),
        value
    }
    ,
    pf.supportsType = function(type) {
        return type ? types[type] : !0
    }
    ,
    pf.parseSize = memoize(function(sourceSizeStr) {
        var match = (sourceSizeStr || "").match(regSize);
        return {
            media: match && match[1],
            length: match && match[2]
        }
    }),
    pf.parseSet = function(set) {
        return set.cands || (set.cands = parseSrcset(set.srcset, set)),
        set.cands
    }
    ,
    pf.getEmValue = function() {
        var body;
        if (!eminpx && (body = document.body)) {
            var div = document.createElement("div")
              , originalHTMLCSS = docElem.style.cssText
              , originalBodyCSS = body.style.cssText;
            div.style.cssText = baseStyle,
            docElem.style.cssText = fsCss,
            body.style.cssText = fsCss,
            body.appendChild(div),
            eminpx = div.offsetWidth,
            body.removeChild(div),
            eminpx = parseFloat(eminpx, 10),
            docElem.style.cssText = originalHTMLCSS,
            body.style.cssText = originalBodyCSS
        }
        return eminpx || 16
    }
    ,
    pf.calcListLength = function(sourceSizeListStr) {
        if (!(sourceSizeListStr in sizeLengthCache) || cfg.uT) {
            var winningLength = pf.calcLength(parseSizes(sourceSizeListStr));
            sizeLengthCache[sourceSizeListStr] = winningLength ? winningLength : units.width
        }
        return sizeLengthCache[sourceSizeListStr]
    }
    ,
    pf.setRes = function(set) {
        var candidates;
        if (set) {
            candidates = pf.parseSet(set);
            for (var i = 0, len = candidates.length; len > i; i++)
                setResolution(candidates[i], set.sizes)
        }
        return candidates
    }
    ,
    pf.setRes.res = setResolution,
    pf.applySetCandidate = function(candidates, img) {
        if (candidates.length) {
            var candidate, i, j, length, bestCandidate, curSrc, curCan, candidateSrc, abortCurSrc, imageData = img[pf.ns], dpr = pf.DPR;
            if (curSrc = imageData.curSrc || img[curSrcProp],
            curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set),
            curCan && curCan.set === candidates[0].set && (abortCurSrc = supportAbort && !img.complete && curCan.res - .1 > dpr,
            abortCurSrc || (curCan.cached = !0,
            curCan.res >= dpr && (bestCandidate = curCan))),
            !bestCandidate)
                for (candidates.sort(ascendingSort),
                length = candidates.length,
                bestCandidate = candidates[length - 1],
                i = 0; length > i; i++)
                    if (candidate = candidates[i],
                    candidate.res >= dpr) {
                        j = i - 1,
                        bestCandidate = candidates[j] && (abortCurSrc || curSrc !== pf.makeUrl(candidate.url)) && chooseLowRes(candidates[j].res, candidate.res, dpr, candidates[j].cached) ? candidates[j] : candidate;
                        break
                    }
            bestCandidate && (candidateSrc = pf.makeUrl(bestCandidate.url),
            imageData.curSrc = candidateSrc,
            imageData.curCan = bestCandidate,
            candidateSrc !== curSrc && pf.setSrc(img, bestCandidate),
            pf.setSize(img))
        }
    }
    ,
    pf.setSrc = function(img, bestCandidate) {
        var origWidth;
        img.src = bestCandidate.url,
        "image/svg+xml" === bestCandidate.set.type && (origWidth = img.style.width,
        img.style.width = img.offsetWidth + 1 + "px",
        img.offsetWidth + 1 && (img.style.width = origWidth))
    }
    ,
    pf.getSet = function(img) {
        var i, set, supportsType, match = !1, sets = img[pf.ns].sets;
        for (i = 0; i < sets.length && !match; i++)
            if (set = sets[i],
            set.srcset && pf.matchesMedia(set.media) && (supportsType = pf.supportsType(set.type))) {
                "pending" === supportsType && (set = supportsType),
                match = set;
                break
            }
        return match
    }
    ,
    pf.parseSets = function(element, parent, options) {
        var srcsetAttribute, imageSet, isWDescripor, srcsetParsed, hasPicture = parent && "PICTURE" === parent.nodeName.toUpperCase(), imageData = element[pf.ns];
        (imageData.src === undefined || options.src) && (imageData.src = getImgAttr.call(element, "src"),
        imageData.src ? setImgAttr.call(element, srcAttr, imageData.src) : removeImgAttr.call(element, srcAttr)),
        (imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset) && (srcsetAttribute = getImgAttr.call(element, "srcset"),
        imageData.srcset = srcsetAttribute,
        srcsetParsed = !0),
        imageData.sets = [],
        hasPicture && (imageData.pic = !0,
        getAllSourceElements(parent, imageData.sets)),
        imageData.srcset ? (imageSet = {
            srcset: imageData.srcset,
            sizes: getImgAttr.call(element, "sizes")
        },
        imageData.sets.push(imageSet),
        isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || ""),
        isWDescripor || !imageData.src || getCandidateForSrc(imageData.src, imageSet) || imageSet.has1x || (imageSet.srcset += ", " + imageData.src,
        imageSet.cands.push({
            url: imageData.src,
            d: 1,
            set: imageSet
        }))) : imageData.src && imageData.sets.push({
            srcset: imageData.src,
            sizes: null 
        }),
        imageData.curCan = null ,
        imageData.curSrc = undefined,
        imageData.supported = !(hasPicture || imageSet && !pf.supSrcset || isWDescripor),
        srcsetParsed && pf.supSrcset && !imageData.supported && (srcsetAttribute ? (setImgAttr.call(element, srcsetAttr, srcsetAttribute),
        element.srcset = "") : removeImgAttr.call(element, srcsetAttr)),
        imageData.supported && !imageData.srcset && (!imageData.src && element.src || element.src !== pf.makeUrl(imageData.src)) && (null  === imageData.src ? element.removeAttribute("src") : element.src = imageData.src),
        imageData.parsed = !0
    }
    ,
    pf.fillImg = function(element, options) {
        var imageData, extreme = options.reselect || options.reevaluate;
        element[pf.ns] || (element[pf.ns] = {}),
        imageData = element[pf.ns],
        (extreme || imageData.evaled !== evalId) && ((!imageData.parsed || options.reevaluate) && pf.parseSets(element, element.parentNode, options),
        imageData.supported ? imageData.evaled = evalId : applyBestCandidate(element))
    }
    ,
    pf.setupRun = function() {
        (!alreadyRun || isVwDirty || DPR !== window.devicePixelRatio) && updateMetrics()
    }
    ,
    pf.supPicture ? (picturefill = noop,
    pf.fillImg = noop) : !function() {
        var isDomReady, regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/, run = function() {
            var readyState = document.readyState || "";
            timerId = setTimeout(run, "loading" === readyState ? 200 : 999),
            document.body && (pf.fillImgs(),
            isDomReady = isDomReady || regReady.test(readyState),
            isDomReady && clearTimeout(timerId))
        }
        , timerId = setTimeout(run, document.body ? 9 : 99), debounce = function(func, wait) {
            var timeout, timestamp, later = function() {
                var last = new Date - timestamp;
                wait > last ? timeout = setTimeout(later, wait - last) : (timeout = null ,
                func())
            }
            ;
            return function() {
                timestamp = new Date,
                timeout || (timeout = setTimeout(later, wait))
            }
        }
        , lastClientWidth = docElem.clientHeight, onResize = function() {
            isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth,
            lastClientWidth = docElem.clientHeight,
            isVwDirty && pf.fillImgs()
        }
        ;
        on(window, "resize", debounce(onResize, 99)),
        on(document, "readystatechange", run)
    }(),
    pf.picturefill = picturefill,
    pf.fillImgs = picturefill,
    pf.teardownRun = noop,
    picturefill._ = pf,
    window.picturefillCFG = {
        pf: pf,
        push: function(args) {
            var name = args.shift();
            "function" == typeof pf[name] ? pf[name].apply(pf, args) : (cfg[name] = args[0],
            alreadyRun && pf.fillImgs({
                reselect: !0
            }))
        }
    };
    for (; setOptions && setOptions.length; )
        window.picturefillCFG.push(setOptions.shift());
    window.picturefill = picturefill,
    "object" == typeof module && "object" == typeof module.exports ? module.exports = picturefill : "function" == typeof define && define.amd && define("picturefill", function() {
        return picturefill
    }),
    pf.supPicture || (types["image/webp"] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
}(window, document);
!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : global.moment = factory()
}(this, function() {
    "use strict";
    function utils_hooks__hooks() {
        return hookCallback.apply(null , arguments)
    }
    function setHookCallback(callback) {
        hookCallback = callback
    }
    function isArray(input) {
        return "[object Array]" === Object.prototype.toString.call(input)
    }
    function isDate(input) {
        return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input)
    }
    function map(arr, fn) {
        var i, res = [];
        for (i = 0; i < arr.length; ++i)
            res.push(fn(arr[i], i));
        return res
    }
    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    function extend(a, b) {
        for (var i in b)
            hasOwnProp(b, i) && (a[i] = b[i]);
        return hasOwnProp(b, "toString") && (a.toString = b.toString),
        hasOwnProp(b, "valueOf") && (a.valueOf = b.valueOf),
        a
    }
    function create_utc__createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !0).utc()
    }
    function defaultParsingFlags() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null ,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }
    function getParsingFlags(m) {
        return null  == m._pf && (m._pf = defaultParsingFlags()),
        m._pf
    }
    function valid__isValid(m) {
        if (null  == m._isValid) {
            var flags = getParsingFlags(m);
            m._isValid = !(isNaN(m._d.getTime()) || !(flags.overflow < 0) || flags.empty || flags.invalidMonth || flags.invalidWeekday || flags.nullInput || flags.invalidFormat || flags.userInvalidated),
            m._strict && (m._isValid = m._isValid && 0 === flags.charsLeftOver && 0 === flags.unusedTokens.length && void 0 === flags.bigHour)
        }
        return m._isValid
    }
    function valid__createInvalid(flags) {
        var m = create_utc__createUTC(NaN);
        return null  != flags ? extend(getParsingFlags(m), flags) : getParsingFlags(m).userInvalidated = !0,
        m
    }
    function isUndefined(input) {
        return void 0 === input
    }
    function copyConfig(to, from) {
        var i, prop, val;
        if (isUndefined(from._isAMomentObject) || (to._isAMomentObject = from._isAMomentObject),
        isUndefined(from._i) || (to._i = from._i),
        isUndefined(from._f) || (to._f = from._f),
        isUndefined(from._l) || (to._l = from._l),
        isUndefined(from._strict) || (to._strict = from._strict),
        isUndefined(from._tzm) || (to._tzm = from._tzm),
        isUndefined(from._isUTC) || (to._isUTC = from._isUTC),
        isUndefined(from._offset) || (to._offset = from._offset),
        isUndefined(from._pf) || (to._pf = getParsingFlags(from)),
        isUndefined(from._locale) || (to._locale = from._locale),
        momentProperties.length > 0)
            for (i in momentProperties)
                prop = momentProperties[i],
                val = from[prop],
                isUndefined(val) || (to[prop] = val);
        return to
    }
    function Moment(config) {
        copyConfig(this, config),
        this._d = new Date(null  != config._d ? config._d.getTime() : NaN),
        updateInProgress === !1 && (updateInProgress = !0,
        utils_hooks__hooks.updateOffset(this),
        updateInProgress = !1)
    }
    function isMoment(obj) {
        return obj instanceof Moment || null  != obj && null  != obj._isAMomentObject
    }
    function absFloor(number) {
        return 0 > number ? Math.ceil(number) : Math.floor(number)
    }
    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion
          , value = 0;
        return 0 !== coercedNumber && isFinite(coercedNumber) && (value = absFloor(coercedNumber)),
        value
    }
    function compareArrays(array1, array2, dontConvert) {
        var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
        for (i = 0; len > i; i++)
            (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
        return diffs + lengthDiff
    }
    function Locale() {}
    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace("_", "-") : key
    }
    function chooseLocale(names) {
        for (var j, next, locale, split, i = 0; i < names.length; ) {
            for (split = normalizeLocale(names[i]).split("-"),
            j = split.length,
            next = normalizeLocale(names[i + 1]),
            next = next ? next.split("-") : null ; j > 0; ) {
                if (locale = loadLocale(split.slice(0, j).join("-")))
                    return locale;
                if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1)
                    break;
                j--
            }
            i++
        }
        return null 
    }
    function loadLocale(name) {
        var oldLocale = null ;
        if (!locales[name] && "undefined" != typeof module && module && module.exports)
            try {
                oldLocale = globalLocale._abbr,
                require("./locale/" + name),
                locale_locales__getSetGlobalLocale(oldLocale)
            } catch (e) {}
        return locales[name]
    }
    function locale_locales__getSetGlobalLocale(key, values) {
        var data;
        return key && (data = isUndefined(values) ? locale_locales__getLocale(key) : defineLocale(key, values),
        data && (globalLocale = data)),
        globalLocale._abbr
    }
    function defineLocale(name, values) {
        return null  !== values ? (values.abbr = name,
        locales[name] = locales[name] || new Locale,
        locales[name].set(values),
        locale_locales__getSetGlobalLocale(name),
        locales[name]) : (delete locales[name],
        null )
    }
    function locale_locales__getLocale(key) {
        var locale;
        if (key && key._locale && key._locale._abbr && (key = key._locale._abbr),
        !key)
            return globalLocale;
        if (!isArray(key)) {
            if (locale = loadLocale(key))
                return locale;
            key = [key]
        }
        return chooseLocale(key)
    }
    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit
    }
    function normalizeUnits(units) {
        return "string" == typeof units ? aliases[units] || aliases[units.toLowerCase()] : void 0
    }
    function normalizeObjectUnits(inputObject) {
        var normalizedProp, prop, normalizedInput = {};
        for (prop in inputObject)
            hasOwnProp(inputObject, prop) && (normalizedProp = normalizeUnits(prop),
            normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
        return normalizedInput
    }
    function isFunction(input) {
        return input instanceof Function || "[object Function]" === Object.prototype.toString.call(input)
    }
    function makeGetSet(unit, keepTime) {
        return function(value) {
            return null  != value ? (get_set__set(this, unit, value),
            utils_hooks__hooks.updateOffset(this, keepTime),
            this) : get_set__get(this, unit)
        }
    }
    function get_set__get(mom, unit) {
        return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN
    }
    function get_set__set(mom, unit, value) {
        mom.isValid() && mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value)
    }
    function getSet(units, value) {
        var unit;
        if ("object" == typeof units)
            for (unit in units)
                this.set(unit, units[unit]);
        else if (units = normalizeUnits(units),
        isFunction(this[units]))
            return this[units](value);
        return this
    }
    function zeroFill(number, targetLength, forceSign) {
        var absNumber = "" + Math.abs(number)
          , zerosToFill = targetLength - absNumber.length
          , sign = number >= 0;
        return (sign ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
    }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        "string" == typeof callback && (func = function() {
            return this[callback]()
        }
        ),
        token && (formatTokenFunctions[token] = func),
        padded && (formatTokenFunctions[padded[0]] = function() {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2])
        }
        ),
        ordinal && (formatTokenFunctions[ordinal] = function() {
            return this.localeData().ordinal(func.apply(this, arguments), token)
        }
        )
    }
    function removeFormattingTokens(input) {
        return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") : input.replace(/\\/g, "")
    }
    function makeFormatFunction(format) {
        var i, length, array = format.match(formattingTokens);
        for (i = 0,
        length = array.length; length > i; i++)
            formatTokenFunctions[array[i]] ? array[i] = formatTokenFunctions[array[i]] : array[i] = removeFormattingTokens(array[i]);
        return function(mom) {
            var output = "";
            for (i = 0; length > i; i++)
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            return output
        }
    }
    function formatMoment(m, format) {
        return m.isValid() ? (format = expandFormat(format, m.localeData()),
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format),
        formatFunctions[format](m)) : m.localeData().invalidDate()
    }
    function expandFormat(format, locale) {
        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input
        }
        var i = 5;
        for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); )
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens),
            localFormattingTokens.lastIndex = 0,
            i -= 1;
        return format
    }
    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function(isStrict) {
            return isStrict && strictRegex ? strictRegex : regex
        }
    }
    function getParseRegexForToken(token, config) {
        return hasOwnProp(regexes, token) ? regexes[token](config._strict, config._locale) : new RegExp(unescapeFormat(token))
    }
    function unescapeFormat(s) {
        return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4
        }))
    }
    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function addParseToken(token, callback) {
        var i, func = callback;
        for ("string" == typeof token && (token = [token]),
        "number" == typeof callback && (func = function(input, array) {
            array[callback] = toInt(input)
        }
        ),
        i = 0; i < token.length; i++)
            tokens[token[i]] = func
    }
    function addWeekParseToken(token, callback) {
        addParseToken(token, function(input, array, config, token) {
            config._w = config._w || {},
            callback(input, config._w, config, token)
        })
    }
    function addTimeToArrayFromToken(token, input, config) {
        null  != input && hasOwnProp(tokens, token) && tokens[token](input, config._a, config, token)
    }
    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    }
    function localeMonths(m, format) {
        return isArray(this._months) ? this._months[m.month()] : this._months[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()]
    }
    function localeMonthsShort(m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"][m.month()]
    }
    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;
        for (this._monthsParse || (this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = []),
        i = 0; 12 > i; i++) {
            if (mom = create_utc__createUTC([2e3, i]),
            strict && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$","i"),
            this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$","i")),
            strict || this._monthsParse[i] || (regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""),
            this._monthsParse[i] = new RegExp(regex.replace(".", ""),"i")),
            strict && "MMMM" === format && this._longMonthsParse[i].test(monthName))
                return i;
            if (strict && "MMM" === format && this._shortMonthsParse[i].test(monthName))
                return i;
            if (!strict && this._monthsParse[i].test(monthName))
                return i
        }
    }
    function setMonth(mom, value) {
        var dayOfMonth;
        return mom.isValid() ? "string" == typeof value && (value = mom.localeData().monthsParse(value),
        "number" != typeof value) ? mom : (dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value)),
        mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth),
        mom) : mom
    }
    function getSetMonth(value) {
        return null  != value ? (setMonth(this, value),
        utils_hooks__hooks.updateOffset(this, !0),
        this) : get_set__get(this, "Month")
    }
    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month())
    }
    function monthsShortRegex(isStrict) {
        return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this),
        isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex
    }
    function monthsRegex(isStrict) {
        return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this),
        isStrict ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex
    }
    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length
        }
        var i, mom, shortPieces = [], longPieces = [], mixedPieces = [];
        for (i = 0; 12 > i; i++)
            mom = create_utc__createUTC([2e3, i]),
            shortPieces.push(this.monthsShort(mom, "")),
            longPieces.push(this.months(mom, "")),
            mixedPieces.push(this.months(mom, "")),
            mixedPieces.push(this.monthsShort(mom, ""));
        for (shortPieces.sort(cmpLenRev),
        longPieces.sort(cmpLenRev),
        mixedPieces.sort(cmpLenRev),
        i = 0; 12 > i; i++)
            shortPieces[i] = regexEscape(shortPieces[i]),
            longPieces[i] = regexEscape(longPieces[i]),
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")","i"),
        this._monthsShortRegex = this._monthsRegex,
        this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")$","i"),
        this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")$","i")
    }
    function checkOverflow(m) {
        var overflow, a = m._a;
        return a && -2 === getParsingFlags(m).overflow && (overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1,
        getParsingFlags(m)._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE),
        getParsingFlags(m)._overflowWeeks && -1 === overflow && (overflow = WEEK),
        getParsingFlags(m)._overflowWeekday && -1 === overflow && (overflow = WEEKDAY),
        getParsingFlags(m).overflow = overflow),
        m
    }
    function warn(msg) {
        utils_hooks__hooks.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + msg)
    }
    function deprecate(msg, fn) {
        var firstTime = !0;
        return extend(function() {
            return firstTime && (warn(msg + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack),
            firstTime = !1),
            fn.apply(this, arguments)
        }, fn)
    }
    function deprecateSimple(name, msg) {
        deprecations[name] || (warn(msg),
        deprecations[name] = !0)
    }
    function configFromISO(config) {
        var i, l, allowTime, dateFormat, timeFormat, tzFormat, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string);
        if (match) {
            for (getParsingFlags(config).iso = !0,
            i = 0,
            l = isoDates.length; l > i; i++)
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0],
                    allowTime = isoDates[i][2] !== !1;
                    break
                }
            if (null  == dateFormat)
                return void (config._isValid = !1);
            if (match[3]) {
                for (i = 0,
                l = isoTimes.length; l > i; i++)
                    if (isoTimes[i][1].exec(match[3])) {
                        timeFormat = (match[2] || " ") + isoTimes[i][0];
                        break
                    }
                if (null  == timeFormat)
                    return void (config._isValid = !1)
            }
            if (!allowTime && null  != timeFormat)
                return void (config._isValid = !1);
            if (match[4]) {
                if (!tzRegex.exec(match[4]))
                    return void (config._isValid = !1);
                tzFormat = "Z"
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || ""),
            configFromStringAndFormat(config)
        } else
            config._isValid = !1
    }
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        return null  !== matched ? void (config._d = new Date(+matched[1])) : (configFromISO(config),
        void (config._isValid === !1 && (delete config._isValid,
        utils_hooks__hooks.createFromInputFallback(config))))
    }
    function createDate(y, m, d, h, M, s, ms) {
        var date = new Date(y,m,d,h,M,s,ms);
        return 100 > y && y >= 0 && isFinite(date.getFullYear()) && date.setFullYear(y),
        date
    }
    function createUTCDate(y) {
        var date = new Date(Date.UTC.apply(null , arguments));
        return 100 > y && y >= 0 && isFinite(date.getUTCFullYear()) && date.setUTCFullYear(y),
        date
    }
    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365
    }
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
    }
    function getIsLeapYear() {
        return isLeapYear(this.year())
    }
    function firstWeekOffset(year, dow, doy) {
        var fwd = 7 + dow - doy
          , fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1
    }
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var resYear, resDayOfYear, localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset;
        return 0 >= dayOfYear ? (resYear = year - 1,
        resDayOfYear = daysInYear(resYear) + dayOfYear) : dayOfYear > daysInYear(year) ? (resYear = year + 1,
        resDayOfYear = dayOfYear - daysInYear(year)) : (resYear = year,
        resDayOfYear = dayOfYear),
        {
            year: resYear,
            dayOfYear: resDayOfYear
        }
    }
    function weekOfYear(mom, dow, doy) {
        var resWeek, resYear, weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1;
        return 1 > week ? (resYear = mom.year() - 1,
        resWeek = week + weeksInYear(resYear, dow, doy)) : week > weeksInYear(mom.year(), dow, doy) ? (resWeek = week - weeksInYear(mom.year(), dow, doy),
        resYear = mom.year() + 1) : (resYear = mom.year(),
        resWeek = week),
        {
            week: resWeek,
            year: resYear
        }
    }
    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy)
          , weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7
    }
    function defaults(a, b, c) {
        return null  != a ? a : null  != b ? b : c
    }
    function currentDateArray(config) {
        var nowValue = new Date(utils_hooks__hooks.now());
        return config._useUTC ? [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()] : [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()]
    }
    function configFromArray(config) {
        var i, date, currentDate, yearToUse, input = [];
        if (!config._d) {
            for (currentDate = currentDateArray(config),
            config._w && null  == config._a[DATE] && null  == config._a[MONTH] && dayOfYearFromWeekInfo(config),
            config._dayOfYear && (yearToUse = defaults(config._a[YEAR], currentDate[YEAR]),
            config._dayOfYear > daysInYear(yearToUse) && (getParsingFlags(config)._overflowDayOfYear = !0),
            date = createUTCDate(yearToUse, 0, config._dayOfYear),
            config._a[MONTH] = date.getUTCMonth(),
            config._a[DATE] = date.getUTCDate()),
            i = 0; 3 > i && null  == config._a[i]; ++i)
                config._a[i] = input[i] = currentDate[i];
            for (; 7 > i; i++)
                config._a[i] = input[i] = null  == config._a[i] ? 2 === i ? 1 : 0 : config._a[i];
            24 === config._a[HOUR] && 0 === config._a[MINUTE] && 0 === config._a[SECOND] && 0 === config._a[MILLISECOND] && (config._nextDay = !0,
            config._a[HOUR] = 0),
            config._d = (config._useUTC ? createUTCDate : createDate).apply(null , input),
            null  != config._tzm && config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm),
            config._nextDay && (config._a[HOUR] = 24)
        }
    }
    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
        w = config._w,
        null  != w.GG || null  != w.W || null  != w.E ? (dow = 1,
        doy = 4,
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year),
        week = defaults(w.W, 1),
        weekday = defaults(w.E, 1),
        (1 > weekday || weekday > 7) && (weekdayOverflow = !0)) : (dow = config._locale._week.dow,
        doy = config._locale._week.doy,
        weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year),
        week = defaults(w.w, 1),
        null  != w.d ? (weekday = w.d,
        (0 > weekday || weekday > 6) && (weekdayOverflow = !0)) : null  != w.e ? (weekday = w.e + dow,
        (w.e < 0 || w.e > 6) && (weekdayOverflow = !0)) : weekday = dow),
        1 > week || week > weeksInYear(weekYear, dow, doy) ? getParsingFlags(config)._overflowWeeks = !0 : null  != weekdayOverflow ? getParsingFlags(config)._overflowWeekday = !0 : (temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        config._a[YEAR] = temp.year,
        config._dayOfYear = temp.dayOfYear)
    }
    function configFromStringAndFormat(config) {
        if (config._f === utils_hooks__hooks.ISO_8601)
            return void configFromISO(config);
        config._a = [],
        getParsingFlags(config).empty = !0;
        var i, parsedInput, tokens, token, skipped, string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
        for (tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [],
        i = 0; i < tokens.length; i++)
            token = tokens[i],
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0],
            parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)),
            skipped.length > 0 && getParsingFlags(config).unusedInput.push(skipped),
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length),
            totalParsedInputLength += parsedInput.length),
            formatTokenFunctions[token] ? (parsedInput ? getParsingFlags(config).empty = !1 : getParsingFlags(config).unusedTokens.push(token),
            addTimeToArrayFromToken(token, parsedInput, config)) : config._strict && !parsedInput && getParsingFlags(config).unusedTokens.push(token);
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength,
        string.length > 0 && getParsingFlags(config).unusedInput.push(string),
        getParsingFlags(config).bigHour === !0 && config._a[HOUR] <= 12 && config._a[HOUR] > 0 && (getParsingFlags(config).bigHour = void 0),
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem),
        configFromArray(config),
        checkOverflow(config)
    }
    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        return null  == meridiem ? hour : null  != locale.meridiemHour ? locale.meridiemHour(hour, meridiem) : null  != locale.isPM ? (isPm = locale.isPM(meridiem),
        isPm && 12 > hour && (hour += 12),
        isPm || 12 !== hour || (hour = 0),
        hour) : hour
    }
    function configFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (0 === config._f.length)
            return getParsingFlags(config).invalidFormat = !0,
            void (config._d = new Date(NaN));
        for (i = 0; i < config._f.length; i++)
            currentScore = 0,
            tempConfig = copyConfig({}, config),
            null  != config._useUTC && (tempConfig._useUTC = config._useUTC),
            tempConfig._f = config._f[i],
            configFromStringAndFormat(tempConfig),
            valid__isValid(tempConfig) && (currentScore += getParsingFlags(tempConfig).charsLeftOver,
            currentScore += 10 * getParsingFlags(tempConfig).unusedTokens.length,
            getParsingFlags(tempConfig).score = currentScore,
            (null  == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore,
            bestMoment = tempConfig));
        extend(config, bestMoment || tempConfig)
    }
    function configFromObject(config) {
        if (!config._d) {
            var i = normalizeObjectUnits(config._i);
            config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function(obj) {
                return obj && parseInt(obj, 10)
            }),
            configFromArray(config)
        }
    }
    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        return res._nextDay && (res.add(1, "d"),
        res._nextDay = void 0),
        res
    }
    function prepareConfig(config) {
        var input = config._i
          , format = config._f;
        return config._locale = config._locale || locale_locales__getLocale(config._l),
        null  === input || void 0 === format && "" === input ? valid__createInvalid({
            nullInput: !0
        }) : ("string" == typeof input && (config._i = input = config._locale.preparse(input)),
        isMoment(input) ? new Moment(checkOverflow(input)) : (isArray(format) ? configFromStringAndArray(config) : format ? configFromStringAndFormat(config) : isDate(input) ? config._d = input : configFromInput(config),
        valid__isValid(config) || (config._d = null ),
        config))
    }
    function configFromInput(config) {
        var input = config._i;
        void 0 === input ? config._d = new Date(utils_hooks__hooks.now()) : isDate(input) ? config._d = new Date(+input) : "string" == typeof input ? configFromString(config) : isArray(input) ? (config._a = map(input.slice(0), function(obj) {
            return parseInt(obj, 10)
        }),
        configFromArray(config)) : "object" == typeof input ? configFromObject(config) : "number" == typeof input ? config._d = new Date(input) : utils_hooks__hooks.createFromInputFallback(config)
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};
        return "boolean" == typeof locale && (strict = locale,
        locale = void 0),
        c._isAMomentObject = !0,
        c._useUTC = c._isUTC = isUTC,
        c._l = locale,
        c._i = input,
        c._f = format,
        c._strict = strict,
        createFromConfig(c)
    }
    function local__createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, !1)
    }
    function pickBy(fn, moments) {
        var res, i;
        if (1 === moments.length && isArray(moments[0]) && (moments = moments[0]),
        !moments.length)
            return local__createLocal();
        for (res = moments[0],
        i = 1; i < moments.length; ++i)
            (!moments[i].isValid() || moments[i][fn](res)) && (res = moments[i]);
        return res
    }
    function min() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isBefore", args)
    }
    function max() {
        var args = [].slice.call(arguments, 0);
        return pickBy("isAfter", args)
    }
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration)
          , years = normalizedInput.year || 0
          , quarters = normalizedInput.quarter || 0
          , months = normalizedInput.month || 0
          , weeks = normalizedInput.week || 0
          , days = normalizedInput.day || 0
          , hours = normalizedInput.hour || 0
          , minutes = normalizedInput.minute || 0
          , seconds = normalizedInput.second || 0
          , milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours,
        this._days = +days + 7 * weeks,
        this._months = +months + 3 * quarters + 12 * years,
        this._data = {},
        this._locale = locale_locales__getLocale(),
        this._bubble()
    }
    function isDuration(obj) {
        return obj instanceof Duration
    }
    function offset(token, separator) {
        addFormatToken(token, 0, 0, function() {
            var offset = this.utcOffset()
              , sign = "+";
            return 0 > offset && (offset = -offset,
            sign = "-"),
            sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2)
        })
    }
    function offsetFromString(matcher, string) {
        var matches = (string || "").match(matcher) || []
          , chunk = matches[matches.length - 1] || []
          , parts = (chunk + "").match(chunkOffset) || ["-", 0, 0]
          , minutes = +(60 * parts[1]) + toInt(parts[2]);
        return "+" === parts[0] ? minutes : -minutes
    }
    function cloneWithOffset(input, model) {
        var res, diff;
        return model._isUTC ? (res = model.clone(),
        diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - +res,
        res._d.setTime(+res._d + diff),
        utils_hooks__hooks.updateOffset(res, !1),
        res) : local__createLocal(input).local()
    }
    function getDateOffset(m) {
        return 15 * -Math.round(m._d.getTimezoneOffset() / 15)
    }
    function getSetOffset(input, keepLocalTime) {
        var localAdjust, offset = this._offset || 0;
        return this.isValid() ? null  != input ? ("string" == typeof input ? input = offsetFromString(matchShortOffset, input) : Math.abs(input) < 16 && (input = 60 * input),
        !this._isUTC && keepLocalTime && (localAdjust = getDateOffset(this)),
        this._offset = input,
        this._isUTC = !0,
        null  != localAdjust && this.add(localAdjust, "m"),
        offset !== input && (!keepLocalTime || this._changeInProgress ? add_subtract__addSubtract(this, create__createDuration(input - offset, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
        utils_hooks__hooks.updateOffset(this, !0),
        this._changeInProgress = null )),
        this) : this._isUTC ? offset : getDateOffset(this) : null  != input ? this : NaN
    }
    function getSetZone(input, keepLocalTime) {
        return null  != input ? ("string" != typeof input && (input = -input),
        this.utcOffset(input, keepLocalTime),
        this) : -this.utcOffset()
    }
    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime)
    }
    function setOffsetToLocal(keepLocalTime) {
        return this._isUTC && (this.utcOffset(0, keepLocalTime),
        this._isUTC = !1,
        keepLocalTime && this.subtract(getDateOffset(this), "m")),
        this
    }
    function setOffsetToParsedOffset() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(offsetFromString(matchOffset, this._i)),
        this
    }
    function hasAlignedHourOffset(input) {
        return this.isValid() ? (input = input ? local__createLocal(input).utcOffset() : 0,
        (this.utcOffset() - input) % 60 === 0) : !1
    }
    function isDaylightSavingTime() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }
    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted))
            return this._isDSTShifted;
        var c = {};
        if (copyConfig(c, this),
        c = prepareConfig(c),
        c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0
        } else
            this._isDSTShifted = !1;
        return this._isDSTShifted
    }
    function isLocal() {
        return this.isValid() ? !this._isUTC : !1
    }
    function isUtcOffset() {
        return this.isValid() ? this._isUTC : !1
    }
    function isUtc() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
    }
    function create__createDuration(input, key) {
        var sign, ret, diffRes, duration = input, match = null ;
        return isDuration(input) ? duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        } : "number" == typeof input ? (duration = {},
        key ? duration[key] = input : duration.milliseconds = input) : (match = aspNetRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1,
        duration = {
            y: 0,
            d: toInt(match[DATE]) * sign,
            h: toInt(match[HOUR]) * sign,
            m: toInt(match[MINUTE]) * sign,
            s: toInt(match[SECOND]) * sign,
            ms: toInt(match[MILLISECOND]) * sign
        }) : (match = isoRegex.exec(input)) ? (sign = "-" === match[1] ? -1 : 1,
        duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            d: parseIso(match[4], sign),
            h: parseIso(match[5], sign),
            m: parseIso(match[6], sign),
            s: parseIso(match[7], sign),
            w: parseIso(match[8], sign)
        }) : null  == duration ? duration = {} : "object" == typeof duration && ("from" in duration || "to" in duration) && (diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to)),
        duration = {},
        duration.ms = diffRes.milliseconds,
        duration.M = diffRes.months),
        ret = new Duration(duration),
        isDuration(input) && hasOwnProp(input, "_locale") && (ret._locale = input._locale),
        ret
    }
    function parseIso(inp, sign) {
        var res = inp && parseFloat(inp.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign
    }
    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        return res.months = other.month() - base.month() + 12 * (other.year() - base.year()),
        base.clone().add(res.months, "M").isAfter(other) && --res.months,
        res.milliseconds = +other - +base.clone().add(res.months, "M"),
        res
    }
    function momentsDifference(base, other) {
        var res;
        return base.isValid() && other.isValid() ? (other = cloneWithOffset(other, base),
        base.isBefore(other) ? res = positiveMomentsDifference(base, other) : (res = positiveMomentsDifference(other, base),
        res.milliseconds = -res.milliseconds,
        res.months = -res.months),
        res) : {
            milliseconds: 0,
            months: 0
        }
    }
    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            return null  === period || isNaN(+period) || (deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period)."),
            tmp = val,
            val = period,
            period = tmp),
            val = "string" == typeof val ? +val : val,
            dur = create__createDuration(val, period),
            add_subtract__addSubtract(this, dur, direction),
            this
        }
    }
    function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds
          , days = duration._days
          , months = duration._months;
        mom.isValid() && (updateOffset = null  == updateOffset ? !0 : updateOffset,
        milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding),
        days && get_set__set(mom, "Date", get_set__get(mom, "Date") + days * isAdding),
        months && setMonth(mom, get_set__get(mom, "Month") + months * isAdding),
        updateOffset && utils_hooks__hooks.updateOffset(mom, days || months))
    }
    function moment_calendar__calendar(time, formats) {
        var now = time || local__createLocal()
          , sod = cloneWithOffset(now, this).startOf("day")
          , diff = this.diff(sod, "days", !0)
          , format = -6 > diff ? "sameElse" : -1 > diff ? "lastWeek" : 0 > diff ? "lastDay" : 1 > diff ? "sameDay" : 2 > diff ? "nextDay" : 7 > diff ? "nextWeek" : "sameElse"
          , output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);
        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)))
    }
    function clone() {
        return new Moment(this)
    }
    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        return this.isValid() && localInput.isValid() ? (units = normalizeUnits(isUndefined(units) ? "millisecond" : units),
        "millisecond" === units ? +this > +localInput : +localInput < +this.clone().startOf(units)) : !1
    }
    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        return this.isValid() && localInput.isValid() ? (units = normalizeUnits(isUndefined(units) ? "millisecond" : units),
        "millisecond" === units ? +localInput > +this : +this.clone().endOf(units) < +localInput) : !1
    }
    function isBetween(from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units)
    }
    function isSame(input, units) {
        var inputMs, localInput = isMoment(input) ? input : local__createLocal(input);
        return this.isValid() && localInput.isValid() ? (units = normalizeUnits(units || "millisecond"),
        "millisecond" === units ? +this === +localInput : (inputMs = +localInput,
        +this.clone().startOf(units) <= inputMs && inputMs <= +this.clone().endOf(units))) : !1
    }
    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units)
    }
    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units)
    }
    function diff(input, units, asFloat) {
        var that, zoneDelta, delta, output;
        return this.isValid() ? (that = cloneWithOffset(input, this),
        that.isValid() ? (zoneDelta = 6e4 * (that.utcOffset() - this.utcOffset()),
        units = normalizeUnits(units),
        "year" === units || "month" === units || "quarter" === units ? (output = monthDiff(this, that),
        "quarter" === units ? output /= 3 : "year" === units && (output /= 12)) : (delta = this - that,
        output = "second" === units ? delta / 1e3 : "minute" === units ? delta / 6e4 : "hour" === units ? delta / 36e5 : "day" === units ? (delta - zoneDelta) / 864e5 : "week" === units ? (delta - zoneDelta) / 6048e5 : delta),
        asFloat ? output : absFloor(output)) : NaN) : NaN
    }
    function monthDiff(a, b) {
        var anchor2, adjust, wholeMonthDiff = 12 * (b.year() - a.year()) + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months");
        return 0 > b - anchor ? (anchor2 = a.clone().add(wholeMonthDiff - 1, "months"),
        adjust = (b - anchor) / (anchor - anchor2)) : (anchor2 = a.clone().add(wholeMonthDiff + 1, "months"),
        adjust = (b - anchor) / (anchor2 - anchor)),
        -(wholeMonthDiff + adjust)
    }
    function toString() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }
    function moment_format__toISOString() {
        var m = this.clone().utc();
        return 0 < m.year() && m.year() <= 9999 ? isFunction(Date.prototype.toISOString) ? this.toDate().toISOString() : formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }
    function format(inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output)
    }
    function from(time, withoutSuffix) {
        return this.isValid() && (isMoment(time) && time.isValid() || local__createLocal(time).isValid()) ? create__createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate();
    }
    function fromNow(withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix)
    }
    function to(time, withoutSuffix) {
        return this.isValid() && (isMoment(time) && time.isValid() || local__createLocal(time).isValid()) ? create__createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix) : this.localeData().invalidDate()
    }
    function toNow(withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix)
    }
    function locale(key) {
        var newLocaleData;
        return void 0 === key ? this._locale._abbr : (newLocaleData = locale_locales__getLocale(key),
        null  != newLocaleData && (this._locale = newLocaleData),
        this)
    }
    function localeData() {
        return this._locale
    }
    function startOf(units) {
        switch (units = normalizeUnits(units)) {
        case "year":
            this.month(0);
        case "quarter":
        case "month":
            this.date(1);
        case "week":
        case "isoWeek":
        case "day":
            this.hours(0);
        case "hour":
            this.minutes(0);
        case "minute":
            this.seconds(0);
        case "second":
            this.milliseconds(0)
        }
        return "week" === units && this.weekday(0),
        "isoWeek" === units && this.isoWeekday(1),
        "quarter" === units && this.month(3 * Math.floor(this.month() / 3)),
        this
    }
    function endOf(units) {
        return units = normalizeUnits(units),
        void 0 === units || "millisecond" === units ? this : this.startOf(units).add(1, "isoWeek" === units ? "week" : units).subtract(1, "ms")
    }
    function to_type__valueOf() {
        return +this._d - 6e4 * (this._offset || 0)
    }
    function unix() {
        return Math.floor(+this / 1e3)
    }
    function toDate() {
        return this._offset ? new Date(+this) : this._d
    }
    function toArray() {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()]
    }
    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        }
    }
    function toJSON() {
        return this.isValid() ? this.toISOString() : "null"
    }
    function moment_valid__isValid() {
        return valid__isValid(this)
    }
    function parsingFlags() {
        return extend({}, getParsingFlags(this))
    }
    function invalidAt() {
        return getParsingFlags(this).overflow
    }
    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }
    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter)
    }
    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }
    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4)
    }
    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4)
    }
    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy)
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        return null  == input ? weekOfYear(this, dow, doy).year : (weeksTarget = weeksInYear(input, dow, doy),
        week > weeksTarget && (week = weeksTarget),
        setWeekAll.call(this, input, week, weekday, dow, doy))
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy)
          , date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
        return this.year(date.getUTCFullYear()),
        this.month(date.getUTCMonth()),
        this.date(date.getUTCDate()),
        this
    }
    function getSetQuarter(input) {
        return null  == input ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (input - 1) + this.month() % 3)
    }
    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week
    }
    function localeFirstDayOfWeek() {
        return this._week.dow
    }
    function localeFirstDayOfYear() {
        return this._week.doy
    }
    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return null  == input ? week : this.add(7 * (input - week), "d")
    }
    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return null  == input ? week : this.add(7 * (input - week), "d")
    }
    function parseWeekday(input, locale) {
        return "string" != typeof input ? input : isNaN(input) ? (input = locale.weekdaysParse(input),
        "number" == typeof input ? input : null ) : parseInt(input, 10)
    }
    function localeWeekdays(m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? "format" : "standalone"][m.day()]
    }
    function localeWeekdaysShort(m) {
        return this._weekdaysShort[m.day()]
    }
    function localeWeekdaysMin(m) {
        return this._weekdaysMin[m.day()]
    }
    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;
        for (this._weekdaysParse || (this._weekdaysParse = [],
        this._minWeekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._fullWeekdaysParse = []),
        i = 0; 7 > i; i++) {
            if (mom = local__createLocal([2e3, 1]).day(i),
            strict && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", ".?") + "$","i"),
            this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", ".?") + "$","i"),
            this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", ".?") + "$","i")),
            this._weekdaysParse[i] || (regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""),
            this._weekdaysParse[i] = new RegExp(regex.replace(".", ""),"i")),
            strict && "dddd" === format && this._fullWeekdaysParse[i].test(weekdayName))
                return i;
            if (strict && "ddd" === format && this._shortWeekdaysParse[i].test(weekdayName))
                return i;
            if (strict && "dd" === format && this._minWeekdaysParse[i].test(weekdayName))
                return i;
            if (!strict && this._weekdaysParse[i].test(weekdayName))
                return i
        }
    }
    function getSetDayOfWeek(input) {
        if (!this.isValid())
            return null  != input ? this : NaN;
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null  != input ? (input = parseWeekday(input, this.localeData()),
        this.add(input - day, "d")) : day
    }
    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid())
            return null  != input ? this : NaN;
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null  == input ? weekday : this.add(input - weekday, "d")
    }
    function getSetISODayOfWeek(input) {
        return this.isValid() ? null  == input ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7) : null  != input ? this : NaN
    }
    function getSetDayOfYear(input) {
        var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null  == input ? dayOfYear : this.add(input - dayOfYear, "d")
    }
    function hFormat() {
        return this.hours() % 12 || 12
    }
    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase)
        })
    }
    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse
    }
    function localeIsPM(input) {
        return "p" === (input + "").toLowerCase().charAt(0)
    }
    function localeMeridiem(hours, minutes, isLower) {
        return hours > 11 ? isLower ? "pm" : "PM" : isLower ? "am" : "AM"
    }
    function parseMs(input, array) {
        array[MILLISECOND] = toInt(1e3 * ("0." + input))
    }
    function getZoneAbbr() {
        return this._isUTC ? "UTC" : ""
    }
    function getZoneName() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }
    function moment__createUnix(input) {
        return local__createLocal(1e3 * input)
    }
    function moment__createInZone() {
        return local__createLocal.apply(null , arguments).parseZone()
    }
    function locale_calendar__calendar(key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output
    }
    function longDateFormat(key) {
        var format = this._longDateFormat[key]
          , formatUpper = this._longDateFormat[key.toUpperCase()];
        return format || !formatUpper ? format : (this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
            return val.slice(1)
        }),
        this._longDateFormat[key])
    }
    function invalidDate() {
        return this._invalidDate
    }
    function ordinal(number) {
        return this._ordinal.replace("%d", number)
    }
    function preParsePostFormat(string) {
        return string
    }
    function relative__relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number)
    }
    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? "future" : "past"];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output)
    }
    function locale_set__set(config) {
        var prop, i;
        for (i in config)
            prop = config[i],
            isFunction(prop) ? this[i] = prop : this["_" + i] = prop;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }
    function lists__get(format, index, field, setter) {
        var locale = locale_locales__getLocale()
          , utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format)
    }
    function list(format, index, field, count, setter) {
        if ("number" == typeof format && (index = format,
        format = void 0),
        format = format || "",
        null  != index)
            return lists__get(format, index, field, setter);
        var i, out = [];
        for (i = 0; count > i; i++)
            out[i] = lists__get(format, i, field, setter);
        return out
    }
    function lists__listMonths(format, index) {
        return list(format, index, "months", 12, "month")
    }
    function lists__listMonthsShort(format, index) {
        return list(format, index, "monthsShort", 12, "month")
    }
    function lists__listWeekdays(format, index) {
        return list(format, index, "weekdays", 7, "day")
    }
    function lists__listWeekdaysShort(format, index) {
        return list(format, index, "weekdaysShort", 7, "day")
    }
    function lists__listWeekdaysMin(format, index) {
        return list(format, index, "weekdaysMin", 7, "day")
    }
    function duration_abs__abs() {
        var data = this._data;
        return this._milliseconds = mathAbs(this._milliseconds),
        this._days = mathAbs(this._days),
        this._months = mathAbs(this._months),
        data.milliseconds = mathAbs(data.milliseconds),
        data.seconds = mathAbs(data.seconds),
        data.minutes = mathAbs(data.minutes),
        data.hours = mathAbs(data.hours),
        data.months = mathAbs(data.months),
        data.years = mathAbs(data.years),
        this
    }
    function duration_add_subtract__addSubtract(duration, input, value, direction) {
        var other = create__createDuration(input, value);
        return duration._milliseconds += direction * other._milliseconds,
        duration._days += direction * other._days,
        duration._months += direction * other._months,
        duration._bubble()
    }
    function duration_add_subtract__add(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1)
    }
    function duration_add_subtract__subtract(input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1)
    }
    function absCeil(number) {
        return 0 > number ? Math.floor(number) : Math.ceil(number)
    }
    function bubble() {
        var seconds, minutes, hours, years, monthsFromDays, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
        return milliseconds >= 0 && days >= 0 && months >= 0 || 0 >= milliseconds && 0 >= days && 0 >= months || (milliseconds += 864e5 * absCeil(monthsToDays(months) + days),
        days = 0,
        months = 0),
        data.milliseconds = milliseconds % 1e3,
        seconds = absFloor(milliseconds / 1e3),
        data.seconds = seconds % 60,
        minutes = absFloor(seconds / 60),
        data.minutes = minutes % 60,
        hours = absFloor(minutes / 60),
        data.hours = hours % 24,
        days += absFloor(hours / 24),
        monthsFromDays = absFloor(daysToMonths(days)),
        months += monthsFromDays,
        days -= absCeil(monthsToDays(monthsFromDays)),
        years = absFloor(months / 12),
        months %= 12,
        data.days = days,
        data.months = months,
        data.years = years,
        this
    }
    function daysToMonths(days) {
        return 4800 * days / 146097
    }
    function monthsToDays(months) {
        return 146097 * months / 4800
    }
    function as(units) {
        var days, months, milliseconds = this._milliseconds;
        if (units = normalizeUnits(units),
        "month" === units || "year" === units)
            return days = this._days + milliseconds / 864e5,
            months = this._months + daysToMonths(days),
            "month" === units ? months : months / 12;
        switch (days = this._days + Math.round(monthsToDays(this._months)),
        units) {
        case "week":
            return days / 7 + milliseconds / 6048e5;
        case "day":
            return days + milliseconds / 864e5;
        case "hour":
            return 24 * days + milliseconds / 36e5;
        case "minute":
            return 1440 * days + milliseconds / 6e4;
        case "second":
            return 86400 * days + milliseconds / 1e3;
        case "millisecond":
            return Math.floor(864e5 * days) + milliseconds;
        default:
            throw new Error("Unknown unit " + units)
        }
    }
    function duration_as__valueOf() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12)
    }
    function makeAs(alias) {
        return function() {
            return this.as(alias)
        }
    }
    function duration_get__get(units) {
        return units = normalizeUnits(units),
        this[units + "s"]()
    }
    function makeGetter(name) {
        return function() {
            return this._data[name]
        }
    }
    function weeks() {
        return absFloor(this.days() / 7)
    }
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture)
    }
    function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs()
          , seconds = round(duration.as("s"))
          , minutes = round(duration.as("m"))
          , hours = round(duration.as("h"))
          , days = round(duration.as("d"))
          , months = round(duration.as("M"))
          , years = round(duration.as("y"))
          , a = seconds < thresholds.s && ["s", seconds] || 1 >= minutes && ["m"] || minutes < thresholds.m && ["mm", minutes] || 1 >= hours && ["h"] || hours < thresholds.h && ["hh", hours] || 1 >= days && ["d"] || days < thresholds.d && ["dd", days] || 1 >= months && ["M"] || months < thresholds.M && ["MM", months] || 1 >= years && ["y"] || ["yy", years];
        return a[2] = withoutSuffix,
        a[3] = +posNegDuration > 0,
        a[4] = locale,
        substituteTimeAgo.apply(null , a)
    }
    function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
        return void 0 === thresholds[threshold] ? !1 : void 0 === limit ? thresholds[threshold] : (thresholds[threshold] = limit,
        !0)
    }
    function humanize(withSuffix) {
        var locale = this.localeData()
          , output = duration_humanize__relativeTime(this, !withSuffix, locale);
        return withSuffix && (output = locale.pastFuture(+this, output)),
        locale.postformat(output)
    }
    function iso_string__toISOString() {
        var minutes, hours, years, seconds = iso_string__abs(this._milliseconds) / 1e3, days = iso_string__abs(this._days), months = iso_string__abs(this._months);
        minutes = absFloor(seconds / 60),
        hours = absFloor(minutes / 60),
        seconds %= 60,
        minutes %= 60,
        years = absFloor(months / 12),
        months %= 12;
        var Y = years
          , M = months
          , D = days
          , h = hours
          , m = minutes
          , s = seconds
          , total = this.asSeconds();
        return total ? (0 > total ? "-" : "") + "P" + (Y ? Y + "Y" : "") + (M ? M + "M" : "") + (D ? D + "D" : "") + (h || m || s ? "T" : "") + (h ? h + "H" : "") + (m ? m + "M" : "") + (s ? s + "S" : "") : "P0D"
    }
    var hookCallback, globalLocale, momentProperties = utils_hooks__hooks.momentProperties = [], updateInProgress = !1, locales = {}, aliases = {}, formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {}, match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, regexes = {}, tokens = {}, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
    addFormatToken("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }),
    addFormatToken("MMM", 0, 0, function(format) {
        return this.localeData().monthsShort(this, format)
    }),
    addFormatToken("MMMM", 0, 0, function(format) {
        return this.localeData().months(this, format)
    }),
    addUnitAlias("month", "M"),
    addRegexToken("M", match1to2),
    addRegexToken("MM", match1to2, match2),
    addRegexToken("MMM", function(isStrict, locale) {
        return locale.monthsShortRegex(isStrict)
    }),
    addRegexToken("MMMM", function(isStrict, locale) {
        return locale.monthsRegex(isStrict)
    }),
    addParseToken(["M", "MM"], function(input, array) {
        array[MONTH] = toInt(input) - 1
    }),
    addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        null  != month ? array[MONTH] = month : getParsingFlags(config).invalidMonth = input
    });
    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/
      , defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
      , defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
      , defaultMonthsShortRegex = matchWord
      , defaultMonthsRegex = matchWord
      , deprecations = {};
    utils_hooks__hooks.suppressDeprecationWarnings = !1;
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/
      , basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/
      , tzRegex = /Z|[+-]\d\d(?::?\d\d)?/
      , isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]]
      , isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]]
      , aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    utils_hooks__hooks.createFromInputFallback = deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""))
    }),
    addFormatToken("Y", 0, 0, function() {
        var y = this.year();
        return 9999 >= y ? "" + y : "+" + y
    }),
    addFormatToken(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }),
    addFormatToken(0, ["YYYY", 4], 0, "year"),
    addFormatToken(0, ["YYYYY", 5], 0, "year"),
    addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"),
    addUnitAlias("year", "y"),
    addRegexToken("Y", matchSigned),
    addRegexToken("YY", match1to2, match2),
    addRegexToken("YYYY", match1to4, match4),
    addRegexToken("YYYYY", match1to6, match6),
    addRegexToken("YYYYYY", match1to6, match6),
    addParseToken(["YYYYY", "YYYYYY"], YEAR),
    addParseToken("YYYY", function(input, array) {
        array[YEAR] = 2 === input.length ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input)
    }),
    addParseToken("YY", function(input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input)
    }),
    addParseToken("Y", function(input, array) {
        array[YEAR] = parseInt(input, 10)
    }),
    utils_hooks__hooks.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3)
    }
    ;
    var getSetYear = makeGetSet("FullYear", !1);
    utils_hooks__hooks.ISO_8601 = function() {}
    ;
    var prototypeMin = deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null , arguments);
        return this.isValid() && other.isValid() ? this > other ? this : other : valid__createInvalid()
    })
      , prototypeMax = deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var other = local__createLocal.apply(null , arguments);
        return this.isValid() && other.isValid() ? other > this ? this : other : valid__createInvalid()
    })
      , now = function() {
        return Date.now ? Date.now() : +new Date
    }
    ;
    offset("Z", ":"),
    offset("ZZ", ""),
    addRegexToken("Z", matchShortOffset),
    addRegexToken("ZZ", matchShortOffset),
    addParseToken(["Z", "ZZ"], function(input, array, config) {
        config._useUTC = !0,
        config._tzm = offsetFromString(matchShortOffset, input)
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    utils_hooks__hooks.updateOffset = function() {}
    ;
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/
      , isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    create__createDuration.fn = Duration.prototype;
    var add_subtract__add = createAdder(1, "add")
      , add_subtract__subtract = createAdder(-1, "subtract");
    utils_hooks__hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
        return void 0 === key ? this.localeData() : this.locale(key)
    });
    addFormatToken(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }),
    addFormatToken(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }),
    addWeekYearFormatToken("gggg", "weekYear"),
    addWeekYearFormatToken("ggggg", "weekYear"),
    addWeekYearFormatToken("GGGG", "isoWeekYear"),
    addWeekYearFormatToken("GGGGG", "isoWeekYear"),
    addUnitAlias("weekYear", "gg"),
    addUnitAlias("isoWeekYear", "GG"),
    addRegexToken("G", matchSigned),
    addRegexToken("g", matchSigned),
    addRegexToken("GG", match1to2, match2),
    addRegexToken("gg", match1to2, match2),
    addRegexToken("GGGG", match1to4, match4),
    addRegexToken("gggg", match1to4, match4),
    addRegexToken("GGGGG", match1to6, match6),
    addRegexToken("ggggg", match1to6, match6),
    addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input)
    }),
    addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input)
    }),
    addFormatToken("Q", 0, "Qo", "quarter"),
    addUnitAlias("quarter", "Q"),
    addRegexToken("Q", match1),
    addParseToken("Q", function(input, array) {
        array[MONTH] = 3 * (toInt(input) - 1)
    }),
    addFormatToken("w", ["ww", 2], "wo", "week"),
    addFormatToken("W", ["WW", 2], "Wo", "isoWeek"),
    addUnitAlias("week", "w"),
    addUnitAlias("isoWeek", "W"),
    addRegexToken("w", match1to2),
    addRegexToken("ww", match1to2, match2),
    addRegexToken("W", match1to2),
    addRegexToken("WW", match1to2, match2),
    addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input)
    });
    var defaultLocaleWeek = {
        dow: 0,
        doy: 6
    };
    addFormatToken("D", ["DD", 2], "Do", "date"),
    addUnitAlias("date", "D"),
    addRegexToken("D", match1to2),
    addRegexToken("DD", match1to2, match2),
    addRegexToken("Do", function(isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient
    }),
    addParseToken(["D", "DD"], DATE),
    addParseToken("Do", function(input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10)
    });
    var getSetDayOfMonth = makeGetSet("Date", !0);
    addFormatToken("d", 0, "do", "day"),
    addFormatToken("dd", 0, 0, function(format) {
        return this.localeData().weekdaysMin(this, format)
    }),
    addFormatToken("ddd", 0, 0, function(format) {
        return this.localeData().weekdaysShort(this, format)
    }),
    addFormatToken("dddd", 0, 0, function(format) {
        return this.localeData().weekdays(this, format)
    }),
    addFormatToken("e", 0, 0, "weekday"),
    addFormatToken("E", 0, 0, "isoWeekday"),
    addUnitAlias("day", "d"),
    addUnitAlias("weekday", "e"),
    addUnitAlias("isoWeekday", "E"),
    addRegexToken("d", match1to2),
    addRegexToken("e", match1to2),
    addRegexToken("E", match1to2),
    addRegexToken("dd", matchWord),
    addRegexToken("ddd", matchWord),
    addRegexToken("dddd", matchWord),
    addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        null  != weekday ? week.d = weekday : getParsingFlags(config).invalidWeekday = input
    }),
    addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
        week[token] = toInt(input)
    });
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
      , defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
      , defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    addUnitAlias("dayOfYear", "DDD"),
    addRegexToken("DDD", match1to3),
    addRegexToken("DDDD", match3),
    addParseToken(["DDD", "DDDD"], function(input, array, config) {
        config._dayOfYear = toInt(input)
    }),
    addFormatToken("H", ["HH", 2], 0, "hour"),
    addFormatToken("h", ["hh", 2], 0, hFormat),
    addFormatToken("hmm", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2)
    }),
    addFormatToken("hmmss", 0, 0, function() {
        return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
    }),
    addFormatToken("Hmm", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2)
    }),
    addFormatToken("Hmmss", 0, 0, function() {
        return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2)
    }),
    meridiem("a", !0),
    meridiem("A", !1),
    addUnitAlias("hour", "h"),
    addRegexToken("a", matchMeridiem),
    addRegexToken("A", matchMeridiem),
    addRegexToken("H", match1to2),
    addRegexToken("h", match1to2),
    addRegexToken("HH", match1to2, match2),
    addRegexToken("hh", match1to2, match2),
    addRegexToken("hmm", match3to4),
    addRegexToken("hmmss", match5to6),
    addRegexToken("Hmm", match3to4),
    addRegexToken("Hmmss", match5to6),
    addParseToken(["H", "HH"], HOUR),
    addParseToken(["a", "A"], function(input, array, config) {
        config._isPm = config._locale.isPM(input),
        config._meridiem = input
    }),
    addParseToken(["h", "hh"], function(input, array, config) {
        array[HOUR] = toInt(input),
        getParsingFlags(config).bigHour = !0
    }),
    addParseToken("hmm", function(input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos)),
        array[MINUTE] = toInt(input.substr(pos)),
        getParsingFlags(config).bigHour = !0
    }),
    addParseToken("hmmss", function(input, array, config) {
        var pos1 = input.length - 4
          , pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1)),
        array[MINUTE] = toInt(input.substr(pos1, 2)),
        array[SECOND] = toInt(input.substr(pos2)),
        getParsingFlags(config).bigHour = !0
    }),
    addParseToken("Hmm", function(input, array) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos)),
        array[MINUTE] = toInt(input.substr(pos))
    }),
    addParseToken("Hmmss", function(input, array) {
        var pos1 = input.length - 4
          , pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1)),
        array[MINUTE] = toInt(input.substr(pos1, 2)),
        array[SECOND] = toInt(input.substr(pos2))
    });
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i
      , getSetHour = makeGetSet("Hours", !0);
    addFormatToken("m", ["mm", 2], 0, "minute"),
    addUnitAlias("minute", "m"),
    addRegexToken("m", match1to2),
    addRegexToken("mm", match1to2, match2),
    addParseToken(["m", "mm"], MINUTE);
    var getSetMinute = makeGetSet("Minutes", !1);
    addFormatToken("s", ["ss", 2], 0, "second"),
    addUnitAlias("second", "s"),
    addRegexToken("s", match1to2),
    addRegexToken("ss", match1to2, match2),
    addParseToken(["s", "ss"], SECOND);
    var getSetSecond = makeGetSet("Seconds", !1);
    addFormatToken("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }),
    addFormatToken(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }),
    addFormatToken(0, ["SSS", 3], 0, "millisecond"),
    addFormatToken(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }),
    addFormatToken(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }),
    addFormatToken(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }),
    addFormatToken(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }),
    addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }),
    addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }),
    addUnitAlias("millisecond", "ms"),
    addRegexToken("S", match1to3, match1),
    addRegexToken("SS", match1to3, match2),
    addRegexToken("SSS", match1to3, match3);
    var token;
    for (token = "SSSS"; token.length <= 9; token += "S")
        addRegexToken(token, matchUnsigned);
    for (token = "S"; token.length <= 9; token += "S")
        addParseToken(token, parseMs);
    var getSetMillisecond = makeGetSet("Milliseconds", !1);
    addFormatToken("z", 0, 0, "zoneAbbr"),
    addFormatToken("zz", 0, 0, "zoneName");
    var momentPrototype__proto = Moment.prototype;
    momentPrototype__proto.add = add_subtract__add,
    momentPrototype__proto.calendar = moment_calendar__calendar,
    momentPrototype__proto.clone = clone,
    momentPrototype__proto.diff = diff,
    momentPrototype__proto.endOf = endOf,
    momentPrototype__proto.format = format,
    momentPrototype__proto.from = from,
    momentPrototype__proto.fromNow = fromNow,
    momentPrototype__proto.to = to,
    momentPrototype__proto.toNow = toNow,
    momentPrototype__proto.get = getSet,
    momentPrototype__proto.invalidAt = invalidAt,
    momentPrototype__proto.isAfter = isAfter,
    momentPrototype__proto.isBefore = isBefore,
    momentPrototype__proto.isBetween = isBetween,
    momentPrototype__proto.isSame = isSame,
    momentPrototype__proto.isSameOrAfter = isSameOrAfter,
    momentPrototype__proto.isSameOrBefore = isSameOrBefore,
    momentPrototype__proto.isValid = moment_valid__isValid,
    momentPrototype__proto.lang = lang,
    momentPrototype__proto.locale = locale,
    momentPrototype__proto.localeData = localeData,
    momentPrototype__proto.max = prototypeMax,
    momentPrototype__proto.min = prototypeMin,
    momentPrototype__proto.parsingFlags = parsingFlags,
    momentPrototype__proto.set = getSet,
    momentPrototype__proto.startOf = startOf,
    momentPrototype__proto.subtract = add_subtract__subtract,
    momentPrototype__proto.toArray = toArray,
    momentPrototype__proto.toObject = toObject,
    momentPrototype__proto.toDate = toDate,
    momentPrototype__proto.toISOString = moment_format__toISOString,
    momentPrototype__proto.toJSON = toJSON,
    momentPrototype__proto.toString = toString,
    momentPrototype__proto.unix = unix,
    momentPrototype__proto.valueOf = to_type__valueOf,
    momentPrototype__proto.creationData = creationData,
    momentPrototype__proto.year = getSetYear,
    momentPrototype__proto.isLeapYear = getIsLeapYear,
    momentPrototype__proto.weekYear = getSetWeekYear,
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear,
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter,
    momentPrototype__proto.month = getSetMonth,
    momentPrototype__proto.daysInMonth = getDaysInMonth,
    momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek,
    momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek,
    momentPrototype__proto.weeksInYear = getWeeksInYear,
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear,
    momentPrototype__proto.date = getSetDayOfMonth,
    momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek,
    momentPrototype__proto.weekday = getSetLocaleDayOfWeek,
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek,
    momentPrototype__proto.dayOfYear = getSetDayOfYear,
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour,
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute,
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond,
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond,
    momentPrototype__proto.utcOffset = getSetOffset,
    momentPrototype__proto.utc = setOffsetToUTC,
    momentPrototype__proto.local = setOffsetToLocal,
    momentPrototype__proto.parseZone = setOffsetToParsedOffset,
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset,
    momentPrototype__proto.isDST = isDaylightSavingTime,
    momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted,
    momentPrototype__proto.isLocal = isLocal,
    momentPrototype__proto.isUtcOffset = isUtcOffset,
    momentPrototype__proto.isUtc = isUtc,
    momentPrototype__proto.isUTC = isUtc,
    momentPrototype__proto.zoneAbbr = getZoneAbbr,
    momentPrototype__proto.zoneName = getZoneName,
    momentPrototype__proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth),
    momentPrototype__proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth),
    momentPrototype__proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear),
    momentPrototype__proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", getSetZone);
    var momentPrototype = momentPrototype__proto
      , defaultCalendar = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }
      , defaultLongDateFormat = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }
      , defaultInvalidDate = "Invalid date"
      , defaultOrdinal = "%d"
      , defaultOrdinalParse = /\d{1,2}/
      , defaultRelativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
      , prototype__proto = Locale.prototype;
    prototype__proto._calendar = defaultCalendar,
    prototype__proto.calendar = locale_calendar__calendar,
    prototype__proto._longDateFormat = defaultLongDateFormat,
    prototype__proto.longDateFormat = longDateFormat,
    prototype__proto._invalidDate = defaultInvalidDate,
    prototype__proto.invalidDate = invalidDate,
    prototype__proto._ordinal = defaultOrdinal,
    prototype__proto.ordinal = ordinal,
    prototype__proto._ordinalParse = defaultOrdinalParse,
    prototype__proto.preparse = preParsePostFormat,
    prototype__proto.postformat = preParsePostFormat,
    prototype__proto._relativeTime = defaultRelativeTime,
    prototype__proto.relativeTime = relative__relativeTime,
    prototype__proto.pastFuture = pastFuture,
    prototype__proto.set = locale_set__set,
    prototype__proto.months = localeMonths,
    prototype__proto._months = defaultLocaleMonths,
    prototype__proto.monthsShort = localeMonthsShort,
    prototype__proto._monthsShort = defaultLocaleMonthsShort,
    prototype__proto.monthsParse = localeMonthsParse,
    prototype__proto._monthsRegex = defaultMonthsRegex,
    prototype__proto.monthsRegex = monthsRegex,
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex,
    prototype__proto.monthsShortRegex = monthsShortRegex,
    prototype__proto.week = localeWeek,
    prototype__proto._week = defaultLocaleWeek,
    prototype__proto.firstDayOfYear = localeFirstDayOfYear,
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek,
    prototype__proto.weekdays = localeWeekdays,
    prototype__proto._weekdays = defaultLocaleWeekdays,
    prototype__proto.weekdaysMin = localeWeekdaysMin,
    prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin,
    prototype__proto.weekdaysShort = localeWeekdaysShort,
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort,
    prototype__proto.weekdaysParse = localeWeekdaysParse,
    prototype__proto.isPM = localeIsPM,
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse,
    prototype__proto.meridiem = localeMeridiem,
    locale_locales__getSetGlobalLocale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10
              , output = 1 === toInt(number % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return number + output
        }
    }),
    utils_hooks__hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", locale_locales__getSetGlobalLocale),
    utils_hooks__hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", locale_locales__getLocale);
    var mathAbs = Math.abs
      , asMilliseconds = makeAs("ms")
      , asSeconds = makeAs("s")
      , asMinutes = makeAs("m")
      , asHours = makeAs("h")
      , asDays = makeAs("d")
      , asWeeks = makeAs("w")
      , asMonths = makeAs("M")
      , asYears = makeAs("y")
      , milliseconds = makeGetter("milliseconds")
      , seconds = makeGetter("seconds")
      , minutes = makeGetter("minutes")
      , hours = makeGetter("hours")
      , days = makeGetter("days")
      , months = makeGetter("months")
      , years = makeGetter("years")
      , round = Math.round
      , thresholds = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }
      , iso_string__abs = Math.abs
      , duration_prototype__proto = Duration.prototype;
    duration_prototype__proto.abs = duration_abs__abs,
    duration_prototype__proto.add = duration_add_subtract__add,
    duration_prototype__proto.subtract = duration_add_subtract__subtract,
    duration_prototype__proto.as = as,
    duration_prototype__proto.asMilliseconds = asMilliseconds,
    duration_prototype__proto.asSeconds = asSeconds,
    duration_prototype__proto.asMinutes = asMinutes,
    duration_prototype__proto.asHours = asHours,
    duration_prototype__proto.asDays = asDays,
    duration_prototype__proto.asWeeks = asWeeks,
    duration_prototype__proto.asMonths = asMonths,
    duration_prototype__proto.asYears = asYears,
    duration_prototype__proto.valueOf = duration_as__valueOf,
    duration_prototype__proto._bubble = bubble,
    duration_prototype__proto.get = duration_get__get,
    duration_prototype__proto.milliseconds = milliseconds,
    duration_prototype__proto.seconds = seconds,
    duration_prototype__proto.minutes = minutes,
    duration_prototype__proto.hours = hours,
    duration_prototype__proto.days = days,
    duration_prototype__proto.weeks = weeks,
    duration_prototype__proto.months = months,
    duration_prototype__proto.years = years,
    duration_prototype__proto.humanize = humanize,
    duration_prototype__proto.toISOString = iso_string__toISOString,
    duration_prototype__proto.toString = iso_string__toISOString,
    duration_prototype__proto.toJSON = iso_string__toISOString,
    duration_prototype__proto.locale = locale,
    duration_prototype__proto.localeData = localeData,
    duration_prototype__proto.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", iso_string__toISOString),
    duration_prototype__proto.lang = lang,
    addFormatToken("X", 0, 0, "unix"),
    addFormatToken("x", 0, 0, "valueOf"),
    addRegexToken("x", matchSigned),
    addRegexToken("X", matchTimestamp),
    addParseToken("X", function(input, array, config) {
        config._d = new Date(1e3 * parseFloat(input, 10))
    }),
    addParseToken("x", function(input, array, config) {
        config._d = new Date(toInt(input))
    }),
    utils_hooks__hooks.version = "2.11.2",
    setHookCallback(local__createLocal),
    utils_hooks__hooks.fn = momentPrototype,
    utils_hooks__hooks.min = min,
    utils_hooks__hooks.max = max,
    utils_hooks__hooks.now = now,
    utils_hooks__hooks.utc = create_utc__createUTC,
    utils_hooks__hooks.unix = moment__createUnix,
    utils_hooks__hooks.months = lists__listMonths,
    utils_hooks__hooks.isDate = isDate,
    utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale,
    utils_hooks__hooks.invalid = valid__createInvalid,
    utils_hooks__hooks.duration = create__createDuration,
    utils_hooks__hooks.isMoment = isMoment,
    utils_hooks__hooks.weekdays = lists__listWeekdays,
    utils_hooks__hooks.parseZone = moment__createInZone,
    utils_hooks__hooks.localeData = locale_locales__getLocale,
    utils_hooks__hooks.isDuration = isDuration,
    utils_hooks__hooks.monthsShort = lists__listMonthsShort,
    utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin,
    utils_hooks__hooks.defineLocale = defineLocale,
    utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort,
    utils_hooks__hooks.normalizeUnits = normalizeUnits,
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold,
    utils_hooks__hooks.prototype = momentPrototype;
    var _moment = utils_hooks__hooks;
    return _moment
});
"function" != typeof Object.create && (Object.create = function(obj) {
    function F() {}
    return F.prototype = obj,
    new F
}
),
function($, window, document) {
    var Carousel = {
        init: function(options, el) {
            var base = this;
            base.$elem = $(el),
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options),
            base.userOptions = options,
            base.loadContent()
        },
        loadContent: function() {
            function getData(data) {
                var i, content = "";
                if ("function" == typeof base.options.jsonSuccess)
                    base.options.jsonSuccess.apply(this, [data]);
                else {
                    for (i in data.owl)
                        data.owl.hasOwnProperty(i) && (content += data.owl[i].item);
                    base.$elem.html(content)
                }
                base.logIn()
            }
            var url, base = this;
            "function" == typeof base.options.beforeInit && base.options.beforeInit.apply(this, [base.$elem]),
            "string" == typeof base.options.jsonPath ? (url = base.options.jsonPath,
            $.getJSON(url, getData)) : base.logIn()
        },
        logIn: function() {
            var base = this;
            base.$elem.data("owl-originalStyles", base.$elem.attr("style")),
            base.$elem.data("owl-originalClasses", base.$elem.attr("class")),
            base.$elem.css({
                opacity: 0
            }),
            base.orignalItems = base.options.items,
            base.checkBrowser(),
            base.wrapperWidth = 0,
            base.checkVisible = null ,
            base.setVars()
        },
        setVars: function() {
            var base = this;
            return 0 === base.$elem.children().length ? !1 : (base.baseClass(),
            base.eventTypes(),
            base.$userItems = base.$elem.children(),
            base.itemsAmount = base.$userItems.length,
            base.wrapItems(),
            base.$owlItems = base.$elem.find(".owl-item"),
            base.$owlWrapper = base.$elem.find(".owl-wrapper"),
            base.playDirection = "next",
            base.prevItem = 0,
            base.prevArr = [0],
            base.currentItem = 0,
            base.customEvents(),
            void base.onStartup())
        },
        onStartup: function() {
            var base = this;
            base.updateItems(),
            base.calculateAll(),
            base.buildControls(),
            base.updateControls(),
            base.response(),
            base.moveEvents(),
            base.stopOnHover(),
            base.owlStatus(),
            base.options.transitionStyle !== !1 && base.transitionTypes(base.options.transitionStyle),
            base.options.autoPlay === !0 && (base.options.autoPlay = 5e3),
            base.play(),
            base.$elem.find(".owl-wrapper").css("display", "block"),
            base.$elem.is(":visible") ? base.$elem.css("opacity", 1) : base.watchVisibility(),
            base.onstartup = !1,
            base.eachMoveUpdate(),
            "function" == typeof base.options.afterInit && base.options.afterInit.apply(this, [base.$elem])
        },
        eachMoveUpdate: function() {
            var base = this;
            base.options.lazyLoad === !0 && base.lazyLoad(),
            base.options.autoHeight === !0 && base.autoHeight(),
            base.onVisibleItems(),
            "function" == typeof base.options.afterAction && base.options.afterAction.apply(this, [base.$elem])
        },
        updateVars: function() {
            var base = this;
            "function" == typeof base.options.beforeUpdate && base.options.beforeUpdate.apply(this, [base.$elem]),
            base.watchVisibility(),
            base.updateItems(),
            base.calculateAll(),
            base.updatePosition(),
            base.updateControls(),
            base.eachMoveUpdate(),
            "function" == typeof base.options.afterUpdate && base.options.afterUpdate.apply(this, [base.$elem])
        },
        reload: function() {
            var base = this;
            window.setTimeout(function() {
                base.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var base = this;
            return base.$elem.is(":visible") !== !1 ? !1 : (base.$elem.css({
                opacity: 0
            }),
            window.clearInterval(base.autoPlayInterval),
            window.clearInterval(base.checkVisible),
            void (base.checkVisible = window.setInterval(function() {
                base.$elem.is(":visible") && (base.reload(),
                base.$elem.animate({
                    opacity: 1
                }, 200),
                window.clearInterval(base.checkVisible))
            }, 500)))
        },
        wrapItems: function() {
            var base = this;
            base.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),
            base.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer"),
            base.$elem.css("display", "block")
        },
        baseClass: function() {
            var base = this
              , hasBaseClass = base.$elem.hasClass(base.options.baseClass)
              , hasThemeClass = base.$elem.hasClass(base.options.theme);
            hasBaseClass || base.$elem.addClass(base.options.baseClass),
            hasThemeClass || base.$elem.addClass(base.options.theme)
        },
        updateItems: function() {
            var width, i, base = this;
            if (base.options.responsive === !1)
                return !1;
            if (base.options.singleItem === !0)
                return base.options.items = base.orignalItems = 1,
                base.options.itemsCustom = !1,
                base.options.itemsDesktop = !1,
                base.options.itemsDesktopSmall = !1,
                base.options.itemsTablet = !1,
                base.options.itemsTabletSmall = !1,
                base.options.itemsMobile = !1,
                !1;
            if (width = $(base.options.responsiveBaseWidth).width(),
            width > (base.options.itemsDesktop[0] || base.orignalItems) && (base.options.items = base.orignalItems),
            base.options.itemsCustom !== !1)
                for (base.options.itemsCustom.sort(function(a, b) {
                    return a[0] - b[0]
                }),
                i = 0; i < base.options.itemsCustom.length; i += 1)
                    base.options.itemsCustom[i][0] <= width && (base.options.items = base.options.itemsCustom[i][1]);
            else
                width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== !1 && (base.options.items = base.options.itemsDesktop[1]),
                width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== !1 && (base.options.items = base.options.itemsDesktopSmall[1]),
                width <= base.options.itemsTablet[0] && base.options.itemsTablet !== !1 && (base.options.items = base.options.itemsTablet[1]),
                width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== !1 && (base.options.items = base.options.itemsTabletSmall[1]),
                width <= base.options.itemsMobile[0] && base.options.itemsMobile !== !1 && (base.options.items = base.options.itemsMobile[1]);
            base.options.items > base.itemsAmount && base.options.itemsScaleUp === !0 && (base.options.items = base.itemsAmount)
        },
        response: function() {
            var smallDelay, lastWindowWidth, base = this;
            return base.options.responsive !== !0 ? !1 : (lastWindowWidth = $(window).width(),
            base.resizer = function() {
                $(window).width() !== lastWindowWidth && (base.options.autoPlay !== !1 && window.clearInterval(base.autoPlayInterval),
                window.clearTimeout(smallDelay),
                smallDelay = window.setTimeout(function() {
                    lastWindowWidth = $(window).width(),
                    base.updateVars()
                }, base.options.responsiveRefreshRate))
            }
            ,
            void $(window).resize(base.resizer))
        },
        updatePosition: function() {
            var base = this;
            base.jumpTo(base.currentItem),
            base.options.autoPlay !== !1 && base.checkAp()
        },
        appendItemsSizes: function() {
            var base = this
              , roundPages = 0
              , lastItem = base.itemsAmount - base.options.items;
            base.$owlItems.each(function(index) {
                var $this = $(this);
                $this.css({
                    width: base.itemWidth
                }).data("owl-item", Number(index)),
                (index % base.options.items === 0 || index === lastItem) && (index > lastItem || (roundPages += 1)),
                $this.data("owl-roundPages", roundPages)
            })
        },
        appendWrapperSizes: function() {
            var base = this
              , width = base.$owlItems.length * base.itemWidth;
            base.$owlWrapper.css({
                width: 2 * width,
                left: 0
            }),
            base.appendItemsSizes()
        },
        calculateAll: function() {
            var base = this;
            base.calculateWidth(),
            base.appendWrapperSizes(),
            base.loops(),
            base.max()
        },
        calculateWidth: function() {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items)
        },
        max: function() {
            var base = this
              , maximum = -1 * (base.itemsAmount * base.itemWidth - base.options.items * base.itemWidth);
            return base.options.items > base.itemsAmount ? (base.maximumItem = 0,
            maximum = 0,
            base.maximumPixels = 0) : (base.maximumItem = base.itemsAmount - base.options.items,
            base.maximumPixels = maximum),
            maximum
        },
        min: function() {
            return 0
        },
        loops: function() {
            var i, item, roundPageNum, base = this, prev = 0, elWidth = 0;
            for (base.positionsInArray = [0],
            base.pagesInArray = [],
            i = 0; i < base.itemsAmount; i += 1)
                elWidth += base.itemWidth,
                base.positionsInArray.push(-elWidth),
                base.options.scrollPerPage === !0 && (item = $(base.$owlItems[i]),
                roundPageNum = item.data("owl-roundPages"),
                roundPageNum !== prev && (base.pagesInArray[prev] = base.positionsInArray[i],
                prev = roundPageNum))
        },
        buildControls: function() {
            var base = this;
            (base.options.navigation === !0 || base.options.pagination === !0) && (base.owlControls = $('<div class="owl-controls"/>').toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem)),
            base.options.pagination === !0 && base.buildPagination(),
            base.options.navigation === !0 && base.buildButtons()
        },
        buildButtons: function() {
            var base = this
              , buttonsWrapper = $('<div class="owl-buttons"/>');
            base.owlControls.append(buttonsWrapper),
            base.buttonPrev = $("<div/>", {
                "class": "owl-prev",
                html: base.options.navigationText[0] || ""
            }),
            base.buttonNext = $("<div/>", {
                "class": "owl-next",
                html: base.options.navigationText[1] || ""
            }),
            buttonsWrapper.append(base.buttonPrev).append(base.buttonNext),
            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(event) {
                event.preventDefault()
            }),
            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(event) {
                event.preventDefault(),
                $(this).hasClass("owl-next") ? base.next() : base.prev()
            })
        },
        buildPagination: function() {
            var base = this;
            base.paginationWrapper = $('<div class="owl-pagination"/>'),
            base.owlControls.append(base.paginationWrapper),
            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(event) {
                event.preventDefault(),
                Number($(this).data("owl-page")) !== base.currentItem && base.goTo(Number($(this).data("owl-page")), !0)
            })
        },
        updatePagination: function() {
            var counter, lastPage, lastItem, i, paginationButton, paginationButtonInner, base = this;
            if (base.options.pagination === !1)
                return !1;
            for (base.paginationWrapper.html(""),
            counter = 0,
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items,
            i = 0; i < base.itemsAmount; i += 1)
                i % base.options.items === 0 && (counter += 1,
                lastPage === i && (lastItem = base.itemsAmount - base.options.items),
                paginationButton = $("<div/>", {
                    "class": "owl-page"
                }),
                paginationButtonInner = $("<span></span>", {
                    text: base.options.paginationNumbers === !0 ? counter : "",
                    "class": base.options.paginationNumbers === !0 ? "owl-numbers" : ""
                }),
                paginationButton.append(paginationButtonInner),
                paginationButton.data("owl-page", lastPage === i ? lastItem : i),
                paginationButton.data("owl-roundPages", counter),
                base.paginationWrapper.append(paginationButton));
            base.checkPagination()
        },
        checkPagination: function() {
            var base = this;
            return base.options.pagination === !1 ? !1 : void base.paginationWrapper.find(".owl-page").each(function() {
                $(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages") && (base.paginationWrapper.find(".owl-page").removeClass("active"),
                $(this).addClass("active"))
            })
        },
        checkNavigation: function() {
            var base = this;
            return base.options.navigation === !1 ? !1 : void (base.options.rewindNav === !1 && (0 === base.currentItem && 0 === base.maximumItem ? (base.buttonPrev.addClass("disabled"),
            base.buttonNext.addClass("disabled")) : 0 === base.currentItem && 0 !== base.maximumItem ? (base.buttonPrev.addClass("disabled"),
            base.buttonNext.removeClass("disabled")) : base.currentItem === base.maximumItem ? (base.buttonPrev.removeClass("disabled"),
            base.buttonNext.addClass("disabled")) : 0 !== base.currentItem && base.currentItem !== base.maximumItem && (base.buttonPrev.removeClass("disabled"),
            base.buttonNext.removeClass("disabled"))))
        },
        updateControls: function() {
            var base = this;
            base.updatePagination(),
            base.checkNavigation(),
            base.owlControls && (base.options.items >= base.itemsAmount ? base.owlControls.hide() : base.owlControls.show())
        },
        destroyControls: function() {
            var base = this;
            base.owlControls && base.owlControls.remove()
        },
        next: function(speed) {
            var base = this;
            if (base.isTransition)
                return !1;
            if (base.currentItem += base.options.scrollPerPage === !0 ? base.options.items : 1,
            base.currentItem > base.maximumItem + (base.options.scrollPerPage === !0 ? base.options.items - 1 : 0)) {
                if (base.options.rewindNav !== !0)
                    return base.currentItem = base.maximumItem,
                    !1;
                base.currentItem = 0,
                speed = "rewind"
            }
            base.goTo(base.currentItem, speed)
        },
        prev: function(speed) {
            var base = this;
            if (base.isTransition)
                return !1;
            if (base.options.scrollPerPage === !0 && base.currentItem > 0 && base.currentItem < base.options.items ? base.currentItem = 0 : base.currentItem -= base.options.scrollPerPage === !0 ? base.options.items : 1,
            base.currentItem < 0) {
                if (base.options.rewindNav !== !0)
                    return base.currentItem = 0,
                    !1;
                base.currentItem = base.maximumItem,
                speed = "rewind"
            }
            base.goTo(base.currentItem, speed)
        },
        goTo: function(position, speed, drag) {
            var goToPixel, base = this;
            return base.isTransition ? !1 : ("function" == typeof base.options.beforeMove && base.options.beforeMove.apply(this, [base.$elem]),
            position >= base.maximumItem ? position = base.maximumItem : 0 >= position && (position = 0),
            base.currentItem = base.owl.currentItem = position,
            base.options.transitionStyle !== !1 && "drag" !== drag && 1 === base.options.items && base.browser.support3d === !0 ? (base.swapSpeed(0),
            base.browser.support3d === !0 ? base.transition3d(base.positionsInArray[position]) : base.css2slide(base.positionsInArray[position], 1),
            base.afterGo(),
            base.singleItemTransition(),
            !1) : (goToPixel = base.positionsInArray[position],
            base.browser.support3d === !0 ? (base.isCss3Finish = !1,
            speed === !0 ? (base.swapSpeed("paginationSpeed"),
            window.setTimeout(function() {
                base.isCss3Finish = !0
            }, base.options.paginationSpeed)) : "rewind" === speed ? (base.swapSpeed(base.options.rewindSpeed),
            window.setTimeout(function() {
                base.isCss3Finish = !0
            }, base.options.rewindSpeed)) : (base.swapSpeed("slideSpeed"),
            window.setTimeout(function() {
                base.isCss3Finish = !0
            }, base.options.slideSpeed)),
            base.transition3d(goToPixel)) : speed === !0 ? base.css2slide(goToPixel, base.options.paginationSpeed) : "rewind" === speed ? base.css2slide(goToPixel, base.options.rewindSpeed) : base.css2slide(goToPixel, base.options.slideSpeed),
            void base.afterGo()))
        },
        jumpTo: function(position) {
            var base = this;
            "function" == typeof base.options.beforeMove && base.options.beforeMove.apply(this, [base.$elem]),
            position >= base.maximumItem || -1 === position ? position = base.maximumItem : 0 >= position && (position = 0),
            base.swapSpeed(0),
            base.browser.support3d === !0 ? base.transition3d(base.positionsInArray[position]) : base.css2slide(base.positionsInArray[position], 1),
            base.currentItem = base.owl.currentItem = position,
            base.afterGo()
        },
        afterGo: function() {
            var base = this;
            base.prevArr.push(base.currentItem),
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2],
            base.prevArr.shift(0),
            base.prevItem !== base.currentItem && (base.checkPagination(),
            base.checkNavigation(),
            base.eachMoveUpdate(),
            base.options.autoPlay !== !1 && base.checkAp()),
            "function" == typeof base.options.afterMove && base.prevItem !== base.currentItem && base.options.afterMove.apply(this, [base.$elem])
        },
        stop: function() {
            var base = this;
            base.apStatus = "stop",
            window.clearInterval(base.autoPlayInterval)
        },
        checkAp: function() {
            var base = this;
            "stop" !== base.apStatus && base.play()
        },
        play: function() {
            var base = this;
            return base.apStatus = "play",
            base.options.autoPlay === !1 ? !1 : (window.clearInterval(base.autoPlayInterval),
            void (base.autoPlayInterval = window.setInterval(function() {
                base.next(!0)
            }, base.options.autoPlay)))
        },
        swapSpeed: function(action) {
            var base = this;
            "slideSpeed" === action ? base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed)) : "paginationSpeed" === action ? base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed)) : "string" != typeof action && base.$owlWrapper.css(base.addCssSpeed(action))
        },
        addCssSpeed: function(speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                transition: "all " + speed + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                transform: "translate3d(" + pixels + "px, 0px,0px)"
            }
        },
        transition3d: function(value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value))
        },
        css2move: function(value) {
            var base = this;
            base.$owlWrapper.css({
                left: value
            })
        },
        css2slide: function(value, speed) {
            var base = this;
            base.isCssFinish = !1,
            base.$owlWrapper.stop(!0, !0).animate({
                left: value
            }, {
                duration: speed || base.options.slideSpeed,
                complete: function() {
                    base.isCssFinish = !0
                }
            })
        },
        checkBrowser: function() {
            var regex, asSupport, support3d, isTouch, base = this, translate3D = "translate3d(0px, 0px, 0px)", tempElem = document.createElement("div");
            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D,
            regex = /translate3d\(0px, 0px, 0px\)/g,
            asSupport = tempElem.style.cssText.match(regex),
            support3d = null  !== asSupport && 1 === asSupport.length,
            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints,
            base.browser = {
                support3d: support3d,
                isTouch: isTouch
            }
        },
        moveEvents: function() {
            var base = this;
            (base.options.mouseDrag !== !1 || base.options.touchDrag !== !1) && (base.gestures(),
            base.disabledEvents())
        },
        eventTypes: function() {
            var base = this
              , types = ["s", "e", "x"];
            base.ev_types = {},
            base.options.mouseDrag === !0 && base.options.touchDrag === !0 ? types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : base.options.mouseDrag === !1 && base.options.touchDrag === !0 ? types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : base.options.mouseDrag === !0 && base.options.touchDrag === !1 && (types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]),
            base.ev_types.start = types[0],
            base.ev_types.move = types[1],
            base.ev_types.end = types[2]
        },
        disabledEvents: function() {
            var base = this;
            base.$elem.on("dragstart.owl", function(event) {
                event.preventDefault()
            }),
            base.$elem.on("mousedown.disableTextSelect", function(e) {
                return $(e.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function getTouches(event) {
                if (void 0 !== event.touches)
                    return {
                        x: event.touches[0].pageX,
                        y: event.touches[0].pageY
                    };
                if (void 0 === event.touches) {
                    if (void 0 !== event.pageX)
                        return {
                            x: event.pageX,
                            y: event.pageY
                        };
                    if (void 0 === event.pageX)
                        return {
                            x: event.clientX,
                            y: event.clientY
                        }
                }
            }
            function swapEvents(type) {
                "on" === type ? ($(document).on(base.ev_types.move, dragMove),
                $(document).on(base.ev_types.end, dragEnd)) : "off" === type && ($(document).off(base.ev_types.move),
                $(document).off(base.ev_types.end))
            }
            function dragStart(event) {
                var position, ev = event.originalEvent || event || window.event;
                if (3 === ev.which)
                    return !1;
                if (!(base.itemsAmount <= base.options.items)) {
                    if (base.isCssFinish === !1 && !base.options.dragBeforeAnimFinish)
                        return !1;
                    if (base.isCss3Finish === !1 && !base.options.dragBeforeAnimFinish)
                        return !1;
                    base.options.autoPlay !== !1 && window.clearInterval(base.autoPlayInterval),
                    base.browser.isTouch === !0 || base.$owlWrapper.hasClass("grabbing") || base.$owlWrapper.addClass("grabbing"),
                    base.newPosX = 0,
                    base.newRelativeX = 0,
                    $(this).css(base.removeTransition()),
                    position = $(this).position(),
                    locals.relativePos = position.left,
                    locals.offsetX = getTouches(ev).x - position.left,
                    locals.offsetY = getTouches(ev).y - position.top,
                    swapEvents("on"),
                    locals.sliding = !1,
                    locals.targetElement = ev.target || ev.srcElement
                }
            }
            function dragMove(event) {
                var minSwipe, maxSwipe, ev = event.originalEvent || event || window.event;
                base.newPosX = getTouches(ev).x - locals.offsetX,
                base.newPosY = getTouches(ev).y - locals.offsetY,
                base.newRelativeX = base.newPosX - locals.relativePos,
                "function" == typeof base.options.startDragging && locals.dragging !== !0 && 0 !== base.newRelativeX && (locals.dragging = !0,
                base.options.startDragging.apply(base, [base.$elem])),
                (base.newRelativeX > 8 || base.newRelativeX < -8) && base.browser.isTouch === !0 && (void 0 !== ev.preventDefault ? ev.preventDefault() : ev.returnValue = !1,
                locals.sliding = !0),
                (base.newPosY > 10 || base.newPosY < -10) && locals.sliding === !1 && $(document).off("touchmove.owl"),
                minSwipe = function() {
                    return base.newRelativeX / 5
                }
                ,
                maxSwipe = function() {
                    return base.maximumPixels + base.newRelativeX / 5
                }
                ,
                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe()),
                base.browser.support3d === !0 ? base.transition3d(base.newPosX) : base.css2move(base.newPosX)
            }
            function dragEnd(event) {
                var newPosition, handlers, owlStopEvent, ev = event.originalEvent || event || window.event;
                ev.target = ev.target || ev.srcElement,
                locals.dragging = !1,
                base.browser.isTouch !== !0 && base.$owlWrapper.removeClass("grabbing"),
                base.newRelativeX < 0 ? base.dragDirection = base.owl.dragDirection = "left" : base.dragDirection = base.owl.dragDirection = "right",
                0 !== base.newRelativeX && (newPosition = base.getNewPosition(),
                base.goTo(newPosition, !1, "drag"),
                locals.targetElement === ev.target && base.browser.isTouch !== !0 && ($(ev.target).on("click.disable", function(ev) {
                    ev.stopImmediatePropagation(),
                    ev.stopPropagation(),
                    ev.preventDefault(),
                    $(ev.target).off("click.disable")
                }),
                handlers = $._data(ev.target, "events").click,
                owlStopEvent = handlers.pop(),
                handlers.splice(0, 0, owlStopEvent))),
                swapEvents("off")
            }
            var base = this
              , locals = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null ,
                minSwipe: null ,
                maxSwipe: null ,
                sliding: null ,
                dargging: null ,
                targetElement: null 
            };
            base.isCssFinish = !0,
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart)
        },
        getNewPosition: function() {
            var base = this
              , newPosition = base.closestItem();
            return newPosition > base.maximumItem ? (base.currentItem = base.maximumItem,
            newPosition = base.maximumItem) : base.newPosX >= 0 && (newPosition = 0,
            base.currentItem = 0),
            newPosition
        },
        closestItem: function() {
            var base = this
              , array = base.options.scrollPerPage === !0 ? base.pagesInArray : base.positionsInArray
              , goal = base.newPosX
              , closest = null ;
            return $.each(array, function(i, v) {
                goal - base.itemWidth / 20 > array[i + 1] && goal - base.itemWidth / 20 < v && "left" === base.moveDirection() ? (closest = v,
                base.options.scrollPerPage === !0 ? base.currentItem = $.inArray(closest, base.positionsInArray) : base.currentItem = i) : goal + base.itemWidth / 20 < v && goal + base.itemWidth / 20 > (array[i + 1] || array[i] - base.itemWidth) && "right" === base.moveDirection() && (base.options.scrollPerPage === !0 ? (closest = array[i + 1] || array[array.length - 1],
                base.currentItem = $.inArray(closest, base.positionsInArray)) : (closest = array[i + 1],
                base.currentItem = i + 1))
            }),
            base.currentItem
        },
        moveDirection: function() {
            var direction, base = this;
            return base.newRelativeX < 0 ? (direction = "right",
            base.playDirection = "next") : (direction = "left",
            base.playDirection = "prev"),
            direction
        },
        customEvents: function() {
            var base = this;
            base.$elem.on("owl.next", function() {
                base.next()
            }),
            base.$elem.on("owl.prev", function() {
                base.prev()
            }),
            base.$elem.on("owl.play", function(event, speed) {
                base.options.autoPlay = speed,
                base.play(),
                base.hoverStatus = "play"
            }),
            base.$elem.on("owl.stop", function() {
                base.stop(),
                base.hoverStatus = "stop"
            }),
            base.$elem.on("owl.goTo", function(event, item) {
                base.goTo(item)
            }),
            base.$elem.on("owl.jumpTo", function(event, item) {
                base.jumpTo(item)
            })
        },
        stopOnHover: function() {
            var base = this;
            base.options.stopOnHover === !0 && base.browser.isTouch !== !0 && base.options.autoPlay !== !1 && (base.$elem.on("mouseover", function() {
                base.stop()
            }),
            base.$elem.on("mouseout", function() {
                "stop" !== base.hoverStatus && base.play()
            }))
        },
        lazyLoad: function() {
            var i, $item, itemNumber, $lazyImg, follow, base = this;
            if (base.options.lazyLoad === !1)
                return !1;
            for (i = 0; i < base.itemsAmount; i += 1)
                $item = $(base.$owlItems[i]),
                "loaded" !== $item.data("owl-loaded") && (itemNumber = $item.data("owl-item"),
                $lazyImg = $item.find(".lazyOwl"),
                "string" == typeof $lazyImg.data("src") ? (void 0 === $item.data("owl-loaded") && ($lazyImg.hide(),
                $item.addClass("loading").data("owl-loaded", "checked")),
                follow = base.options.lazyFollow === !0 ? itemNumber >= base.currentItem : !0,
                follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length && base.lazyPreload($item, $lazyImg)) : $item.data("owl-loaded", "loaded"))
        },
        lazyPreload: function($item, $lazyImg) {
            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading"),
                $lazyImg.removeAttr("data-src"),
                "fade" === base.options.lazyEffect ? $lazyImg.fadeIn(400) : $lazyImg.show(),
                "function" == typeof base.options.afterLazyLoad && base.options.afterLazyLoad.apply(this, [base.$elem])
            }
            function checkLazyImage() {
                iterations += 1,
                base.completeImg($lazyImg.get(0)) || isBackgroundImg === !0 ? showImage() : 100 >= iterations ? window.setTimeout(checkLazyImage, 100) : showImage()
            }
            var isBackgroundImg, base = this, iterations = 0;
            "DIV" === $lazyImg.prop("tagName") ? ($lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")"),
            isBackgroundImg = !0) : $lazyImg[0].src = $lazyImg.data("src"),
            checkLazyImage()
        },
        autoHeight: function() {
            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px"),
                base.wrapperOuter.hasClass("autoHeight") || window.setTimeout(function() {
                    base.wrapperOuter.addClass("autoHeight")
                }, 0)
            }
            function checkImage() {
                iterations += 1,
                base.completeImg($currentimg.get(0)) ? addHeight() : 100 >= iterations ? window.setTimeout(checkImage, 100) : base.wrapperOuter.css("height", "")
            }
            var iterations, base = this, $currentimg = $(base.$owlItems[base.currentItem]).find("img");
            void 0 !== $currentimg.get(0) ? (iterations = 0,
            checkImage()) : addHeight()
        },
        completeImg: function(img) {
            var naturalWidthType;
            return img.complete ? (naturalWidthType = typeof img.naturalWidth,
            "undefined" !== naturalWidthType && 0 === img.naturalWidth ? !1 : !0) : !1
        },
        onVisibleItems: function() {
            var i, base = this;
            for (base.options.addClassActive === !0 && base.$owlItems.removeClass("active"),
            base.visibleItems = [],
            i = base.currentItem; i < base.currentItem + base.options.items; i += 1)
                base.visibleItems.push(i),
                base.options.addClassActive === !0 && $(base.$owlItems[i]).addClass("active");
            base.owl.visibleItems = base.visibleItems
        },
        transitionTypes: function(className) {
            var base = this;
            base.outClass = "owl-" + className + "-out",
            base.inClass = "owl-" + className + "-in"
        },
        singleItemTransition: function() {
            function transStyles(prevPos) {
                return {
                    position: "relative",
                    left: prevPos + "px"
                }
            }
            var base = this
              , outClass = base.outClass
              , inClass = base.inClass
              , $currentItem = base.$owlItems.eq(base.currentItem)
              , $prevItem = base.$owlItems.eq(base.prevItem)
              , prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem]
              , origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2
              , animEnd = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            base.isTransition = !0,
            base.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": origin + "px",
                "-moz-perspective-origin": origin + "px",
                "perspective-origin": origin + "px"
            }),
            $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function() {
                base.endPrev = !0,
                $prevItem.off(animEnd),
                base.clearTransStyle($prevItem, outClass)
            }),
            $currentItem.addClass(inClass).on(animEnd, function() {
                base.endCurrent = !0,
                $currentItem.off(animEnd),
                base.clearTransStyle($currentItem, inClass)
            })
        },
        clearTransStyle: function(item, classToRemove) {
            var base = this;
            item.css({
                position: "",
                left: ""
            }).removeClass(classToRemove),
            base.endPrev && base.endCurrent && (base.$owlWrapper.removeClass("owl-origin"),
            base.endPrev = !1,
            base.endCurrent = !1,
            base.isTransition = !1)
        },
        owlStatus: function() {
            var base = this;
            base.owl = {
                userOptions: base.userOptions,
                baseElement: base.$elem,
                userItems: base.$userItems,
                owlItems: base.$owlItems,
                currentItem: base.currentItem,
                prevItem: base.prevItem,
                visibleItems: base.visibleItems,
                isTouch: base.browser.isTouch,
                browser: base.browser,
                dragDirection: base.dragDirection
            }
        },
        clearEvents: function() {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect"),
            $(document).off(".owl owl"),
            $(window).off("resize", base.resizer)
        },
        unWrap: function() {
            var base = this;
            0 !== base.$elem.children().length && (base.$owlWrapper.unwrap(),
            base.$userItems.unwrap().unwrap(),
            base.owlControls && base.owlControls.remove()),
            base.clearEvents(),
            base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            var base = this;
            base.stop(),
            window.clearInterval(base.checkVisible),
            base.unWrap(),
            base.$elem.removeData()
        },
        reinit: function(newOptions) {
            var base = this
              , options = $.extend({}, base.userOptions, newOptions);
            base.unWrap(),
            base.init(options, base.$elem)
        },
        addItem: function(htmlString, targetPosition) {
            var position, base = this;
            return htmlString ? 0 === base.$elem.children().length ? (base.$elem.append(htmlString),
            base.setVars(),
            !1) : (base.unWrap(),
            position = void 0 === targetPosition || -1 === targetPosition ? -1 : targetPosition,
            position >= base.$userItems.length || -1 === position ? base.$userItems.eq(-1).after(htmlString) : base.$userItems.eq(position).before(htmlString),
            void base.setVars()) : !1
        },
        removeItem: function(targetPosition) {
            var position, base = this;
            return 0 === base.$elem.children().length ? !1 : (position = void 0 === targetPosition || -1 === targetPosition ? -1 : targetPosition,
            base.unWrap(),
            base.$userItems.eq(position).remove(),
            void base.setVars())
        }
    };
    $.fn.owlCarousel = function(options) {
        return this.each(function() {
            if ($(this).data("owl-init") === !0)
                return !1;
            $(this).data("owl-init", !0);
            var carousel = Object.create(Carousel);
            carousel.init(options, this),
            $.data(this, "owlCarousel", carousel)
        })
    }
    ,
    $.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
}(jQuery, window, document);
!function(t, e, i) {
    var n = t.L
      , o = {};
    o.version = "0.7.7",
    "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && define.amd && define(o),
    o.noConflict = function() {
        return t.L = n,
        this
    }
    ,
    t.L = o,
    o.Util = {
        extend: function(t) {
            var e, i, n, o, s = Array.prototype.slice.call(arguments, 1);
            for (i = 0,
            n = s.length; n > i; i++) {
                o = s[i] || {};
                for (e in o)
                    o.hasOwnProperty(e) && (t[e] = o[e])
            }
            return t
        },
        bind: function(t, e) {
            var i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null ;
            return function() {
                return t.apply(e, i || arguments)
            }
        },
        stamp: function() {
            var t = 0
              , e = "_leaflet_id";
            return function(i) {
                return i[e] = i[e] || ++t,
                i[e]
            }
        }(),
        invokeEach: function(t, e, i) {
            var n, o;
            if ("object" == typeof t) {
                o = Array.prototype.slice.call(arguments, 3);
                for (n in t)
                    e.apply(i, [n, t[n]].concat(o));
                return !0
            }
            return !1
        },
        limitExecByInterval: function(t, e, i) {
            var n, o;
            return function s() {
                var a = arguments;
                return n ? void (o = !0) : (n = !0,
                setTimeout(function() {
                    n = !1,
                    o && (s.apply(i, a),
                    o = !1)
                }, e),
                void t.apply(i, a))
            }
        },
        falseFn: function() {
            return !1
        },
        formatNum: function(t, e) {
            var i = Math.pow(10, e || 5);
            return Math.round(t * i) / i
        },
        trim: function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function(t) {
            return o.Util.trim(t).split(/\s+/)
        },
        setOptions: function(t, e) {
            return t.options = o.extend({}, t.options, e),
            t.options
        },
        getParamString: function(t, e, i) {
            var n = [];
            for (var o in t)
                n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
            return (e && -1 !== e.indexOf("?") ? "&" : "?") + n.join("&")
        },
        template: function(t, e) {
            return t.replace(/\{ *([\w_]+) *\}/g, function(t, n) {
                var o = e[n];
                if (o === i)
                    throw new Error("No value provided for variable " + t);
                return "function" == typeof o && (o = o(e)),
                o
            })
        },
        isArray: Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
        ,
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    },
    function() {
        function e(e) {
            var i, n, o = ["webkit", "moz", "o", "ms"];
            for (i = 0; i < o.length && !n; i++)
                n = t[o[i] + e];
            return n
        }
        function i(e) {
            var i = +new Date
              , o = Math.max(0, 16 - (i - n));
            return n = i + o,
            t.setTimeout(e, o)
        }
        var n = 0
          , s = t.requestAnimationFrame || e("RequestAnimationFrame") || i
          , a = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
            t.clearTimeout(e)
        }
        ;
        o.Util.requestAnimFrame = function(e, n, a, r) {
            return e = o.bind(e, n),
            a && s === i ? void e() : s.call(t, e, r)
        }
        ,
        o.Util.cancelAnimFrame = function(e) {
            e && a.call(t, e)
        }
    }(),
    o.extend = o.Util.extend,
    o.bind = o.Util.bind,
    o.stamp = o.Util.stamp,
    o.setOptions = o.Util.setOptions,
    o.Class = function() {}
    ,
    o.Class.extend = function(t) {
        var e = function() {
            this.initialize && this.initialize.apply(this, arguments),
            this._initHooks && this.callInitHooks()
        }
          , i = function() {}
        ;
        i.prototype = this.prototype;
        var n = new i;
        n.constructor = e,
        e.prototype = n;
        for (var s in this)
            this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
        t.statics && (o.extend(e, t.statics),
        delete t.statics),
        t.includes && (o.Util.extend.apply(null , [n].concat(t.includes)),
        delete t.includes),
        t.options && n.options && (t.options = o.extend({}, n.options, t.options)),
        o.extend(n, t),
        n._initHooks = [];
        var a = this;
        return e.__super__ = a.prototype,
        n.callInitHooks = function() {
            if (!this._initHooksCalled) {
                a.prototype.callInitHooks && a.prototype.callInitHooks.call(this),
                this._initHooksCalled = !0;
                for (var t = 0, e = n._initHooks.length; e > t; t++)
                    n._initHooks[t].call(this)
            }
        }
        ,
        e
    }
    ,
    o.Class.include = function(t) {
        o.extend(this.prototype, t)
    }
    ,
    o.Class.mergeOptions = function(t) {
        o.extend(this.prototype.options, t)
    }
    ,
    o.Class.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1)
          , i = "function" == typeof t ? t : function() {
            this[t].apply(this, e)
        }
        ;
        this.prototype._initHooks = this.prototype._initHooks || [],
        this.prototype._initHooks.push(i)
    }
    ;
    var s = "_leaflet_events";
    o.Mixin = {},
    o.Mixin.Events = {
        addEventListener: function(t, e, i) {
            if (o.Util.invokeEach(t, this.addEventListener, this, e, i))
                return this;
            var n, a, r, h, l, u, c, d = this[s] = this[s] || {}, p = i && i !== this && o.stamp(i);
            for (t = o.Util.splitWords(t),
            n = 0,
            a = t.length; a > n; n++)
                r = {
                    action: e,
                    context: i || this
                },
                h = t[n],
                p ? (l = h + "_idx",
                u = l + "_len",
                c = d[l] = d[l] || {},
                c[p] || (c[p] = [],
                d[u] = (d[u] || 0) + 1),
                c[p].push(r)) : (d[h] = d[h] || [],
                d[h].push(r));
            return this
        },
        hasEventListeners: function(t) {
            var e = this[s];
            return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
        },
        removeEventListener: function(t, e, i) {
            if (!this[s])
                return this;
            if (!t)
                return this.clearAllEventListeners();
            if (o.Util.invokeEach(t, this.removeEventListener, this, e, i))
                return this;
            var n, a, r, h, l, u, c, d, p, _ = this[s], m = i && i !== this && o.stamp(i);
            for (t = o.Util.splitWords(t),
            n = 0,
            a = t.length; a > n; n++)
                if (r = t[n],
                u = r + "_idx",
                c = u + "_len",
                d = _[u],
                e) {
                    if (h = m && d ? d[m] : _[r]) {
                        for (l = h.length - 1; l >= 0; l--)
                            h[l].action !== e || i && h[l].context !== i || (p = h.splice(l, 1),
                            p[0].action = o.Util.falseFn);
                        i && d && 0 === h.length && (delete d[m],
                        _[c]--)
                    }
                } else
                    delete _[r],
                    delete _[u],
                    delete _[c];
            return this
        },
        clearAllEventListeners: function() {
            return delete this[s],
            this
        },
        fireEvent: function(t, e) {
            if (!this.hasEventListeners(t))
                return this;
            var i, n, a, r, h, l = o.Util.extend({}, e, {
                type: t,
                target: this
            }), u = this[s];
            if (u[t])
                for (i = u[t].slice(),
                n = 0,
                a = i.length; a > n; n++)
                    i[n].action.call(i[n].context, l);
            r = u[t + "_idx"];
            for (h in r)
                if (i = r[h].slice())
                    for (n = 0,
                    a = i.length; a > n; n++)
                        i[n].action.call(i[n].context, l);
            return this
        },
        addOneTimeEventListener: function(t, e, i) {
            if (o.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i))
                return this;
            var n = o.bind(function() {
                this.removeEventListener(t, e, i).removeEventListener(t, n, i)
            }, this);
            return this.addEventListener(t, e, i).addEventListener(t, n, i)
        }
    },
    o.Mixin.Events.on = o.Mixin.Events.addEventListener,
    o.Mixin.Events.off = o.Mixin.Events.removeEventListener,
    o.Mixin.Events.once = o.Mixin.Events.addOneTimeEventListener,
    o.Mixin.Events.fire = o.Mixin.Events.fireEvent,
    function() {
        var n = "ActiveXObject" in t
          , s = n && !e.addEventListener
          , a = navigator.userAgent.toLowerCase()
          , r = -1 !== a.indexOf("webkit")
          , h = -1 !== a.indexOf("chrome")
          , l = -1 !== a.indexOf("phantom")
          , u = -1 !== a.indexOf("android")
          , c = -1 !== a.search("android [23]")
          , d = -1 !== a.indexOf("gecko")
          , p = typeof orientation != i + ""
          , _ = !t.PointerEvent && t.MSPointerEvent
          , m = t.PointerEvent && t.navigator.pointerEnabled || _
          , f = "devicePixelRatio" in t && t.devicePixelRatio > 1 || "matchMedia" in t && t.matchMedia("(min-resolution:144dpi)") && t.matchMedia("(min-resolution:144dpi)").matches
          , g = e.documentElement
          , v = n && "transition" in g.style
          , y = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !c
          , P = "MozPerspective" in g.style
          , L = "OTransition" in g.style
          , x = !t.L_DISABLE_3D && (v || y || P || L) && !l
          , w = !t.L_NO_TOUCH && !l && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
        o.Browser = {
            ie: n,
            ielt9: s,
            webkit: r,
            gecko: d && !r && !t.opera && !n,
            android: u,
            android23: c,
            chrome: h,
            ie3d: v,
            webkit3d: y,
            gecko3d: P,
            opera3d: L,
            any3d: x,
            mobile: p,
            mobileWebkit: p && r,
            mobileWebkit3d: p && y,
            mobileOpera: p && t.opera,
            touch: w,
            msPointer: _,
            pointer: m,
            retina: f
        }
    }(),
    o.Point = function(t, e, i) {
        this.x = i ? Math.round(t) : t,
        this.y = i ? Math.round(e) : e
    }
    ,
    o.Point.prototype = {
        clone: function() {
            return new o.Point(this.x,this.y)
        },
        add: function(t) {
            return this.clone()._add(o.point(t))
        },
        _add: function(t) {
            return this.x += t.x,
            this.y += t.y,
            this
        },
        subtract: function(t) {
            return this.clone()._subtract(o.point(t))
        },
        _subtract: function(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this
        },
        divideBy: function(t) {
            return this.clone()._divideBy(t)
        },
        _divideBy: function(t) {
            return this.x /= t,
            this.y /= t,
            this
        },
        multiplyBy: function(t) {
            return this.clone()._multiplyBy(t)
        },
        _multiplyBy: function(t) {
            return this.x *= t,
            this.y *= t,
            this
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this
        },
        distanceTo: function(t) {
            t = o.point(t);
            var e = t.x - this.x
              , i = t.y - this.y;
            return Math.sqrt(e * e + i * i)
        },
        equals: function(t) {
            return t = o.point(t),
            t.x === this.x && t.y === this.y
        },
        contains: function(t) {
            return t = o.point(t),
            Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
        }
    },
    o.point = function(t, e, n) {
        return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0],t[1]) : t === i || null  === t ? t : new o.Point(t,e,n)
    }
    ,
    o.Bounds = function(t, e) {
        if (t)
            for (var i = e ? [t, e] : t, n = 0, o = i.length; o > n; n++)
                this.extend(i[n])
    }
    ,
    o.Bounds.prototype = {
        extend: function(t) {
            return t = o.point(t),
            this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x),
            this.max.x = Math.max(t.x, this.max.x),
            this.min.y = Math.min(t.y, this.min.y),
            this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(),
            this.max = t.clone()),
            this
        },
        getCenter: function(t) {
            return new o.Point((this.min.x + this.max.x) / 2,(this.min.y + this.max.y) / 2,t)
        },
        getBottomLeft: function() {
            return new o.Point(this.min.x,this.max.y)
        },
        getTopRight: function() {
            return new o.Point(this.max.x,this.min.y)
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(t) {
            var e, i;
            return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t),
            t instanceof o.Bounds ? (e = t.min,
            i = t.max) : e = i = t,
            e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
        },
        intersects: function(t) {
            t = o.bounds(t);
            var e = this.min
              , i = this.max
              , n = t.min
              , s = t.max
              , a = s.x >= e.x && n.x <= i.x
              , r = s.y >= e.y && n.y <= i.y;
            return a && r
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    },
    o.bounds = function(t, e) {
        return !t || t instanceof o.Bounds ? t : new o.Bounds(t,e)
    }
    ,
    o.Transformation = function(t, e, i, n) {
        this._a = t,
        this._b = e,
        this._c = i,
        this._d = n
    }
    ,
    o.Transformation.prototype = {
        transform: function(t, e) {
            return this._transform(t.clone(), e)
        },
        _transform: function(t, e) {
            return e = e || 1,
            t.x = e * (this._a * t.x + this._b),
            t.y = e * (this._c * t.y + this._d),
            t
        },
        untransform: function(t, e) {
            return e = e || 1,
            new o.Point((t.x / e - this._b) / this._a,(t.y / e - this._d) / this._c)
        }
    },
    o.DomUtil = {
        get: function(t) {
            return "string" == typeof t ? e.getElementById(t) : t
        },
        getStyle: function(t, i) {
            var n = t.style[i];
            if (!n && t.currentStyle && (n = t.currentStyle[i]),
            (!n || "auto" === n) && e.defaultView) {
                var o = e.defaultView.getComputedStyle(t, null );
                n = o ? o[i] : null 
            }
            return "auto" === n ? null  : n
        },
        getViewportOffset: function(t) {
            var i, n = 0, s = 0, a = t, r = e.body, h = e.documentElement;
            do {
                if (n += a.offsetTop || 0,
                s += a.offsetLeft || 0,
                n += parseInt(o.DomUtil.getStyle(a, "borderTopWidth"), 10) || 0,
                s += parseInt(o.DomUtil.getStyle(a, "borderLeftWidth"), 10) || 0,
                i = o.DomUtil.getStyle(a, "position"),
                a.offsetParent === r && "absolute" === i)
                    break;
                if ("fixed" === i) {
                    n += r.scrollTop || h.scrollTop || 0,
                    s += r.scrollLeft || h.scrollLeft || 0;
                    break
                }
                if ("relative" === i && !a.offsetLeft) {
                    var l = o.DomUtil.getStyle(a, "width")
                      , u = o.DomUtil.getStyle(a, "max-width")
                      , c = a.getBoundingClientRect();
                    ("none" !== l || "none" !== u) && (s += c.left + a.clientLeft),
                    n += c.top + (r.scrollTop || h.scrollTop || 0);
                    break
                }
                a = a.offsetParent
            } while (a);a = t;
            do {
                if (a === r)
                    break;
                n -= a.scrollTop || 0,
                s -= a.scrollLeft || 0,
                a = a.parentNode
            } while (a);return new o.Point(s,n)
        },
        documentIsLtr: function() {
            return o.DomUtil._docIsLtrCached || (o.DomUtil._docIsLtrCached = !0,
            o.DomUtil._docIsLtr = "ltr" === o.DomUtil.getStyle(e.body, "direction")),
            o.DomUtil._docIsLtr
        },
        create: function(t, i, n) {
            var o = e.createElement(t);
            return o.className = i,
            n && n.appendChild(o),
            o
        },
        hasClass: function(t, e) {
            if (t.classList !== i)
                return t.classList.contains(e);
            var n = o.DomUtil._getClass(t);
            return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
        },
        addClass: function(t, e) {
            if (t.classList !== i)
                for (var n = o.Util.splitWords(e), s = 0, a = n.length; a > s; s++)
                    t.classList.add(n[s]);
            else if (!o.DomUtil.hasClass(t, e)) {
                var r = o.DomUtil._getClass(t);
                o.DomUtil._setClass(t, (r ? r + " " : "") + e)
            }
        },
        removeClass: function(t, e) {
            t.classList !== i ? t.classList.remove(e) : o.DomUtil._setClass(t, o.Util.trim((" " + o.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
        },
        _setClass: function(t, e) {
            t.className.baseVal === i ? t.className = e : t.className.baseVal = e
        },
        _getClass: function(t) {
            return t.className.baseVal === i ? t.className : t.className.baseVal
        },
        setOpacity: function(t, e) {
            if ("opacity" in t.style)
                t.style.opacity = e;
            else if ("filter" in t.style) {
                var i = !1
                  , n = "DXImageTransform.Microsoft.Alpha";
                try {
                    i = t.filters.item(n)
                } catch (o) {
                    if (1 === e)
                        return
                }
                e = Math.round(100 * e),
                i ? (i.Enabled = 100 !== e,
                i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
            }
        },
        testProp: function(t) {
            for (var i = e.documentElement.style, n = 0; n < t.length; n++)
                if (t[n] in i)
                    return t[n];
            return !1
        },
        getTranslateString: function(t) {
            var e = o.Browser.webkit3d
              , i = "translate" + (e ? "3d" : "") + "("
              , n = (e ? ",0" : "") + ")";
            return i + t.x + "px," + t.y + "px" + n
        },
        getScaleString: function(t, e) {
            var i = o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t)))
              , n = " scale(" + t + ") ";
            return i + n
        },
        setPosition: function(t, e, i) {
            t._leaflet_pos = e,
            !i && o.Browser.any3d ? t.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px",
            t.style.top = e.y + "px")
        },
        getPosition: function(t) {
            return t._leaflet_pos
        }
    },
    o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]),
    o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
    o.DomUtil.TRANSITION_END = "webkitTransition" === o.DomUtil.TRANSITION || "OTransition" === o.DomUtil.TRANSITION ? o.DomUtil.TRANSITION + "End" : "transitionend",
    function() {
        if ("onselectstart" in e)
            o.extend(o.DomUtil, {
                disableTextSelection: function() {
                    o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
                },
                enableTextSelection: function() {
                    o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
                }
            });
        else {
            var i = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            o.extend(o.DomUtil, {
                disableTextSelection: function() {
                    if (i) {
                        var t = e.documentElement.style;
                        this._userSelect = t[i],
                        t[i] = "none"
                    }
                },
                enableTextSelection: function() {
                    i && (e.documentElement.style[i] = this._userSelect,
                    delete this._userSelect)
                }
            })
        }
        o.extend(o.DomUtil, {
            disableImageDrag: function() {
                o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
            },
            enableImageDrag: function() {
                o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
            }
        })
    }(),
    o.LatLng = function(t, e, n) {
        if (t = parseFloat(t),
        e = parseFloat(e),
        isNaN(t) || isNaN(e))
            throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = t,
        this.lng = e,
        n !== i && (this.alt = parseFloat(n))
    }
    ,
    o.extend(o.LatLng, {
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MAX_MARGIN: 1e-9
    }),
    o.LatLng.prototype = {
        equals: function(t) {
            if (!t)
                return !1;
            t = o.latLng(t);
            var e = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
            return e <= o.LatLng.MAX_MARGIN
        },
        toString: function(t) {
            return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
        },
        distanceTo: function(t) {
            t = o.latLng(t);
            var e = 6378137
              , i = o.LatLng.DEG_TO_RAD
              , n = (t.lat - this.lat) * i
              , s = (t.lng - this.lng) * i
              , a = this.lat * i
              , r = t.lat * i
              , h = Math.sin(n / 2)
              , l = Math.sin(s / 2)
              , u = h * h + l * l * Math.cos(a) * Math.cos(r);
            return 2 * e * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u))
        },
        wrap: function(t, e) {
            var i = this.lng;
            return t = t || -180,
            e = e || 180,
            i = (i + e) % (e - t) + (t > i || i === e ? e : t),
            new o.LatLng(this.lat,i)
        }
    },
    o.latLng = function(t, e) {
        return t instanceof o.LatLng ? t : o.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new o.LatLng(t[0],t[1],t[2]) : null  : t === i || null  === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat,"lng" in t ? t.lng : t.lon) : e === i ? null  : new o.LatLng(t,e)
    }
    ,
    o.LatLngBounds = function(t, e) {
        if (t)
            for (var i = e ? [t, e] : t, n = 0, o = i.length; o > n; n++)
                this.extend(i[n])
    }
    ,
    o.LatLngBounds.prototype = {
        extend: function(t) {
            if (!t)
                return this;
            var e = o.latLng(t);
            return t = null  !== e ? e : o.latLngBounds(t),
            t instanceof o.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat),
            this._southWest.lng = Math.min(t.lng, this._southWest.lng),
            this._northEast.lat = Math.max(t.lat, this._northEast.lat),
            this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new o.LatLng(t.lat,t.lng),
            this._northEast = new o.LatLng(t.lat,t.lng)) : t instanceof o.LatLngBounds && (this.extend(t._southWest),
            this.extend(t._northEast)),
            this
        },
        pad: function(t) {
            var e = this._southWest
              , i = this._northEast
              , n = Math.abs(e.lat - i.lat) * t
              , s = Math.abs(e.lng - i.lng) * t;
            return new o.LatLngBounds(new o.LatLng(e.lat - n,e.lng - s),new o.LatLng(i.lat + n,i.lng + s))
        },
        getCenter: function() {
            return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2,(this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new o.LatLng(this.getNorth(),this.getWest())
        },
        getSouthEast: function() {
            return new o.LatLng(this.getSouth(),this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(t) {
            t = "number" == typeof t[0] || t instanceof o.LatLng ? o.latLng(t) : o.latLngBounds(t);
            var e, i, n = this._southWest, s = this._northEast;
            return t instanceof o.LatLngBounds ? (e = t.getSouthWest(),
            i = t.getNorthEast()) : e = i = t,
            e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
        },
        intersects: function(t) {
            t = o.latLngBounds(t);
            var e = this._southWest
              , i = this._northEast
              , n = t.getSouthWest()
              , s = t.getNorthEast()
              , a = s.lat >= e.lat && n.lat <= i.lat
              , r = s.lng >= e.lng && n.lng <= i.lng;
            return a && r
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(t) {
            return t ? (t = o.latLngBounds(t),
            this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast())) : !1
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    },
    o.latLngBounds = function(t, e) {
        return !t || t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t,e)
    }
    ,
    o.Projection = {},
    o.Projection.SphericalMercator = {
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
            var e = o.LatLng.DEG_TO_RAD
              , i = this.MAX_LATITUDE
              , n = Math.max(Math.min(i, t.lat), -i)
              , s = t.lng * e
              , a = n * e;
            return a = Math.log(Math.tan(Math.PI / 4 + a / 2)),
            new o.Point(s,a)
        },
        unproject: function(t) {
            var e = o.LatLng.RAD_TO_DEG
              , i = t.x * e
              , n = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
            return new o.LatLng(n,i)
        }
    },
    o.Projection.LonLat = {
        project: function(t) {
            return new o.Point(t.lng,t.lat)
        },
        unproject: function(t) {
            return new o.LatLng(t.y,t.x)
        }
    },
    o.CRS = {
        latLngToPoint: function(t, e) {
            var i = this.projection.project(t)
              , n = this.scale(e);
            return this.transformation._transform(i, n)
        },
        pointToLatLng: function(t, e) {
            var i = this.scale(e)
              , n = this.transformation.untransform(t, i);
            return this.projection.unproject(n)
        },
        project: function(t) {
            return this.projection.project(t)
        },
        scale: function(t) {
            return 256 * Math.pow(2, t)
        },
        getSize: function(t) {
            var e = this.scale(t);
            return o.point(e, e)
        }
    },
    o.CRS.Simple = o.extend({}, o.CRS, {
        projection: o.Projection.LonLat,
        transformation: new o.Transformation(1,0,-1,0),
        scale: function(t) {
            return Math.pow(2, t)
        }
    }),
    o.CRS.EPSG3857 = o.extend({}, o.CRS, {
        code: "EPSG:3857",
        projection: o.Projection.SphericalMercator,
        transformation: new o.Transformation(.5 / Math.PI,.5,-.5 / Math.PI,.5),
        project: function(t) {
            var e = this.projection.project(t)
              , i = 6378137;
            return e.multiplyBy(i)
        }
    }),
    o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
        code: "EPSG:900913"
    }),
    o.CRS.EPSG4326 = o.extend({}, o.CRS, {
        code: "EPSG:4326",
        projection: o.Projection.LonLat,
        transformation: new o.Transformation(1 / 360,.5,-1 / 360,.5)
    }),
    o.Map = o.Class.extend({
        includes: o.Mixin.Events,
        options: {
            crs: o.CRS.EPSG3857,
            fadeAnimation: o.DomUtil.TRANSITION && !o.Browser.android23,
            trackResize: !0,
            markerZoomAnimation: o.DomUtil.TRANSITION && o.Browser.any3d
        },
        initialize: function(t, e) {
            e = o.setOptions(this, e),
            this._initContainer(t),
            this._initLayout(),
            this._onResize = o.bind(this._onResize, this),
            this._initEvents(),
            e.maxBounds && this.setMaxBounds(e.maxBounds),
            e.center && e.zoom !== i && this.setView(o.latLng(e.center), e.zoom, {
                reset: !0
            }),
            this._handlers = [],
            this._layers = {},
            this._zoomBoundLayers = {},
            this._tileLayersNum = 0,
            this.callInitHooks(),
            this._addLayers(e.layers)
        },
        setView: function(t, e) {
            return e = e === i ? this.getZoom() : e,
            this._resetView(o.latLng(t), this._limitZoom(e)),
            this
        },
        setZoom: function(t, e) {
            return this._loaded ? this.setView(this.getCenter(), t, {
                zoom: e
            }) : (this._zoom = this._limitZoom(t),
            this)
        },
        zoomIn: function(t, e) {
            return this.setZoom(this._zoom + (t || 1), e)
        },
        zoomOut: function(t, e) {
            return this.setZoom(this._zoom - (t || 1), e)
        },
        setZoomAround: function(t, e, i) {
            var n = this.getZoomScale(e)
              , s = this.getSize().divideBy(2)
              , a = t instanceof o.Point ? t : this.latLngToContainerPoint(t)
              , r = a.subtract(s).multiplyBy(1 - 1 / n)
              , h = this.containerPointToLatLng(s.add(r));
            return this.setView(h, e, {
                zoom: i
            })
        },
        fitBounds: function(t, e) {
            e = e || {},
            t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
            var i = o.point(e.paddingTopLeft || e.padding || [0, 0])
              , n = o.point(e.paddingBottomRight || e.padding || [0, 0])
              , s = this.getBoundsZoom(t, !1, i.add(n));
            s = e.maxZoom ? Math.min(e.maxZoom, s) : s;
            var a = n.subtract(i).divideBy(2)
              , r = this.project(t.getSouthWest(), s)
              , h = this.project(t.getNorthEast(), s)
              , l = this.unproject(r.add(h).divideBy(2).add(a), s);
            return this.setView(l, s, e)
        },
        fitWorld: function(t) {
            return this.fitBounds([[-90, -180], [90, 180]], t)
        },
        panTo: function(t, e) {
            return this.setView(t, this._zoom, {
                pan: e
            })
        },
        panBy: function(t) {
            return this.fire("movestart"),
            this._rawPanBy(o.point(t)),
            this.fire("move"),
            this.fire("moveend")
        },
        setMaxBounds: function(t) {
            return t = o.latLngBounds(t),
            this.options.maxBounds = t,
            t ? (this._loaded && this._panInsideMaxBounds(),
            this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
        },
        panInsideBounds: function(t, e) {
            var i = this.getCenter()
              , n = this._limitCenter(i, this._zoom, t);
            return i.equals(n) ? this : this.panTo(n, e)
        },
        addLayer: function(t) {
            var e = o.stamp(t);
            return this._layers[e] ? this : (this._layers[e] = t,
            !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t,
            this._updateZoomLevels()),
            this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum++,
            this._tileLayersToLoad++,
            t.on("load", this._onTileLayerLoad, this)),
            this._loaded && this._layerAdd(t),
            this)
        },
        removeLayer: function(t) {
            var e = o.stamp(t);
            return this._layers[e] ? (this._loaded && t.onRemove(this),
            delete this._layers[e],
            this._loaded && this.fire("layerremove", {
                layer: t
            }),
            this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e],
            this._updateZoomLevels()),
            this.options.zoomAnimation && o.TileLayer && t instanceof o.TileLayer && (this._tileLayersNum--,
            this._tileLayersToLoad--,
            t.off("load", this._onTileLayerLoad, this)),
            this) : this
        },
        hasLayer: function(t) {
            return t ? o.stamp(t) in this._layers : !1
        },
        eachLayer: function(t, e) {
            for (var i in this._layers)
                t.call(e, this._layers[i]);
            return this
        },
        invalidateSize: function(t) {
            if (!this._loaded)
                return this;
            t = o.extend({
                animate: !1,
                pan: !0
            }, t === !0 ? {
                animate: !0
            } : t);
            var e = this.getSize();
            this._sizeChanged = !0,
            this._initialCenter = null ;
            var i = this.getSize()
              , n = e.divideBy(2).round()
              , s = i.divideBy(2).round()
              , a = n.subtract(s);
            return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a),
            this.fire("move"),
            t.debounceMoveend ? (clearTimeout(this._sizeTimer),
            this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")),
            this.fire("resize", {
                oldSize: e,
                newSize: i
            })) : this
        },
        addHandler: function(t, e) {
            if (!e)
                return this;
            var i = this[t] = new e(this);
            return this._handlers.push(i),
            this.options[t] && i.enable(),
            this
        },
        remove: function() {
            this._loaded && this.fire("unload"),
            this._initEvents("off");
            try {
                delete this._container._leaflet
            } catch (t) {
                this._container._leaflet = i
            }
            return this._clearPanes(),
            this._clearControlPos && this._clearControlPos(),
            this._clearHandlers(),
            this
        },
        getCenter: function() {
            return this._checkIfLoaded(),
            this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var t = this.getPixelBounds()
              , e = this.unproject(t.getBottomLeft())
              , i = this.unproject(t.getTopRight());
            return new o.LatLngBounds(e,i)
        },
        getMinZoom: function() {
            return this.options.minZoom === i ? this._layersMinZoom === i ? 0 : this._layersMinZoom : this.options.minZoom
        },
        getMaxZoom: function() {
            return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function(t, e, i) {
            t = o.latLngBounds(t);
            var n, s = this.getMinZoom() - (e ? 1 : 0), a = this.getMaxZoom(), r = this.getSize(), h = t.getNorthWest(), l = t.getSouthEast(), u = !0;
            i = o.point(i || [0, 0]);
            do
                s++,
                n = this.project(l, s).subtract(this.project(h, s)).add(i),
                u = e ? n.x < r.x || n.y < r.y : r.contains(n);
            while (u && a >= s);return u && e ? null  : e ? s : s - 1
        },
        getSize: function() {
            return (!this._size || this._sizeChanged) && (this._size = new o.Point(this._container.clientWidth,this._container.clientHeight),
            this._sizeChanged = !1),
            this._size.clone()
        },
        getPixelBounds: function() {
            var t = this._getTopLeftPoint();
            return new o.Bounds(t,t.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(),
            this._initialTopLeftPoint
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(t) {
            var e = this.options.crs;
            return e.scale(t) / e.scale(this._zoom)
        },
        getScaleZoom: function(t) {
            return this._zoom + Math.log(t) / Math.LN2
        },
        project: function(t, e) {
            return e = e === i ? this._zoom : e,
            this.options.crs.latLngToPoint(o.latLng(t), e)
        },
        unproject: function(t, e) {
            return e = e === i ? this._zoom : e,
            this.options.crs.pointToLatLng(o.point(t), e)
        },
        layerPointToLatLng: function(t) {
            var e = o.point(t).add(this.getPixelOrigin());
            return this.unproject(e)
        },
        latLngToLayerPoint: function(t) {
            var e = this.project(o.latLng(t))._round();
            return e._subtract(this.getPixelOrigin())
        },
        containerPointToLayerPoint: function(t) {
            return o.point(t).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(t) {
            return o.point(t).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(t) {
            var e = this.containerPointToLayerPoint(o.point(t));
            return this.layerPointToLatLng(e)
        },
        latLngToContainerPoint: function(t) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
        },
        mouseEventToContainerPoint: function(t) {
            return o.DomEvent.getMousePosition(t, this._container)
        },
        mouseEventToLayerPoint: function(t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
        },
        mouseEventToLatLng: function(t) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
        },
        _initContainer: function(t) {
            var e = this._container = o.DomUtil.get(t);
            if (!e)
                throw new Error("Map container not found.");
            if (e._leaflet)
                throw new Error("Map container is already initialized.");
            e._leaflet = !0
        },
        _initLayout: function() {
            var t = this._container;
            o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
            var e = o.DomUtil.getStyle(t, "position");
            "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"),
            this._initPanes(),
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var t = this._panes = {};
            this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container),
            this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane),
            t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane),
            t.shadowPane = this._createPane("leaflet-shadow-pane"),
            t.overlayPane = this._createPane("leaflet-overlay-pane"),
            t.markerPane = this._createPane("leaflet-marker-pane"),
            t.popupPane = this._createPane("leaflet-popup-pane");
            var e = " leaflet-zoom-hide";
            this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, e),
            o.DomUtil.addClass(t.shadowPane, e),
            o.DomUtil.addClass(t.popupPane, e))
        },
        _createPane: function(t, e) {
            return o.DomUtil.create("div", t, e || this._panes.objectsPane)
        },
        _clearPanes: function() {
            this._container.removeChild(this._mapPane)
        },
        _addLayers: function(t) {
            t = t ? o.Util.isArray(t) ? t : [t] : [];
            for (var e = 0, i = t.length; i > e; e++)
                this.addLayer(t[e])
        },
        _resetView: function(t, e, i, n) {
            var s = this._zoom !== e;
            n || (this.fire("movestart"),
            s && this.fire("zoomstart")),
            this._zoom = e,
            this._initialCenter = t,
            this._initialTopLeftPoint = this._getNewTopLeftPoint(t),
            i ? this._initialTopLeftPoint._add(this._getMapPanePos()) : o.DomUtil.setPosition(this._mapPane, new o.Point(0,0)),
            this._tileLayersToLoad = this._tileLayersNum;
            var a = !this._loaded;
            this._loaded = !0,
            this.fire("viewreset", {
                hard: !i
            }),
            a && (this.fire("load"),
            this.eachLayer(this._layerAdd, this)),
            this.fire("move"),
            (s || n) && this.fire("zoomend"),
            this.fire("moveend", {
                hard: !i
            })
        },
        _rawPanBy: function(t) {
            o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _updateZoomLevels: function() {
            var t, e = 1 / 0, n = -(1 / 0), o = this._getZoomSpan();
            for (t in this._zoomBoundLayers) {
                var s = this._zoomBoundLayers[t];
                isNaN(s.options.minZoom) || (e = Math.min(e, s.options.minZoom)),
                isNaN(s.options.maxZoom) || (n = Math.max(n, s.options.maxZoom))
            }
            t === i ? this._layersMaxZoom = this._layersMinZoom = i : (this._layersMaxZoom = n,
            this._layersMinZoom = e),
            o !== this._getZoomSpan() && this.fire("zoomlevelschange")
        },
        _panInsideMaxBounds: function() {
            this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded)
                throw new Error("Set map center and zoom first.")
        },
        _initEvents: function(e) {
            if (o.DomEvent) {
                e = e || "on",
                o.DomEvent[e](this._container, "click", this._onMouseClick, this);
                var i, n, s = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
                for (i = 0,
                n = s.length; n > i; i++)
                    o.DomEvent[e](this._container, s[i], this._fireMouseEvent, this);
                this.options.trackResize && o.DomEvent[e](t, "resize", this._onResize, this)
            }
        },
        _onResize: function() {
            o.Util.cancelAnimFrame(this._resizeRequest),
            this._resizeRequest = o.Util.requestAnimFrame(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this, !1, this._container)
        },
        _onMouseClick: function(t) {
            !this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || o.DomEvent._skipped(t) || (this.fire("preclick"),
            this._fireMouseEvent(t))
        },
        _fireMouseEvent: function(t) {
            if (this._loaded && !o.DomEvent._skipped(t)) {
                var e = t.type;
                if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e,
                this.hasEventListeners(e)) {
                    "contextmenu" === e && o.DomEvent.preventDefault(t);
                    var i = this.mouseEventToContainerPoint(t)
                      , n = this.containerPointToLayerPoint(i)
                      , s = this.layerPointToLatLng(n);
                    this.fire(e, {
                        latlng: s,
                        layerPoint: n,
                        containerPoint: i,
                        originalEvent: t
                    })
                }
            }
        },
        _onTileLayerLoad: function() {
            this._tileLayersToLoad--,
            this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
        },
        _clearHandlers: function() {
            for (var t = 0, e = this._handlers.length; e > t; t++)
                this._handlers[t].disable()
        },
        whenReady: function(t, e) {
            return this._loaded ? t.call(e || this, this) : this.on("load", t, e),
            this
        },
        _layerAdd: function(t) {
            t.onAdd(this),
            this.fire("layeradd", {
                layer: t
            })
        },
        _getMapPanePos: function() {
            return o.DomUtil.getPosition(this._mapPane)
        },
        _moved: function() {
            var t = this._getMapPanePos();
            return t && !t.equals([0, 0])
        },
        _getTopLeftPoint: function() {
            return this.getPixelOrigin().subtract(this._getMapPanePos())
        },
        _getNewTopLeftPoint: function(t, e) {
            var i = this.getSize()._divideBy(2);
            return this.project(t, e)._subtract(i)._round()
        },
        _latLngToNewLayerPoint: function(t, e, i) {
            var n = this._getNewTopLeftPoint(i, e).add(this._getMapPanePos());
            return this.project(t, e)._subtract(n)
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(t) {
            return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(t, e, i) {
            if (!i)
                return t;
            var n = this.project(t, e)
              , s = this.getSize().divideBy(2)
              , a = new o.Bounds(n.subtract(s),n.add(s))
              , r = this._getBoundsOffset(a, i, e);
            return this.unproject(n.add(r), e)
        },
        _limitOffset: function(t, e) {
            if (!e)
                return t;
            var i = this.getPixelBounds()
              , n = new o.Bounds(i.min.add(t),i.max.add(t));
            return t.add(this._getBoundsOffset(n, e))
        },
        _getBoundsOffset: function(t, e, i) {
            var n = this.project(e.getNorthWest(), i).subtract(t.min)
              , s = this.project(e.getSouthEast(), i).subtract(t.max)
              , a = this._rebound(n.x, -s.x)
              , r = this._rebound(n.y, -s.y);
            return new o.Point(a,r)
        },
        _rebound: function(t, e) {
            return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
        },
        _limitZoom: function(t) {
            var e = this.getMinZoom()
              , i = this.getMaxZoom();
            return Math.max(e, Math.min(i, t))
        }
    }),
    o.map = function(t, e) {
        return new o.Map(t,e)
    }
    ,
    o.Projection.Mercator = {
        MAX_LATITUDE: 85.0840591556,
        R_MINOR: 6356752.314245179,
        R_MAJOR: 6378137,
        project: function(t) {
            var e = o.LatLng.DEG_TO_RAD
              , i = this.MAX_LATITUDE
              , n = Math.max(Math.min(i, t.lat), -i)
              , s = this.R_MAJOR
              , a = this.R_MINOR
              , r = t.lng * e * s
              , h = n * e
              , l = a / s
              , u = Math.sqrt(1 - l * l)
              , c = u * Math.sin(h);
            c = Math.pow((1 - c) / (1 + c), .5 * u);
            var d = Math.tan(.5 * (.5 * Math.PI - h)) / c;
            return h = -s * Math.log(d),
            new o.Point(r,h)
        },
        unproject: function(t) {
            for (var e, i = o.LatLng.RAD_TO_DEG, n = this.R_MAJOR, s = this.R_MINOR, a = t.x * i / n, r = s / n, h = Math.sqrt(1 - r * r), l = Math.exp(-t.y / n), u = Math.PI / 2 - 2 * Math.atan(l), c = 15, d = 1e-7, p = c, _ = .1; Math.abs(_) > d && --p > 0; )
                e = h * Math.sin(u),
                _ = Math.PI / 2 - 2 * Math.atan(l * Math.pow((1 - e) / (1 + e), .5 * h)) - u,
                u += _;
            return new o.LatLng(u * i,a)
        }
    },
    o.CRS.EPSG3395 = o.extend({}, o.CRS, {
        code: "EPSG:3395",
        projection: o.Projection.Mercator,
        transformation: function() {
            var t = o.Projection.Mercator
              , e = t.R_MAJOR
              , i = .5 / (Math.PI * e);
            return new o.Transformation(i,.5,-i,.5)
        }()
    }),
    o.TileLayer = o.Class.extend({
        includes: o.Mixin.Events,
        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: "abc",
            errorTileUrl: "",
            attribution: "",
            zoomOffset: 0,
            opacity: 1,
            unloadInvisibleTiles: o.Browser.mobile,
            updateWhenIdle: o.Browser.mobile
        },
        initialize: function(t, e) {
            e = o.setOptions(this, e),
            e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2),
            e.zoomOffset++,
            e.minZoom > 0 && e.minZoom--,
            this.options.maxZoom--),
            e.bounds && (e.bounds = o.latLngBounds(e.bounds)),
            this._url = t;
            var i = this.options.subdomains;
            "string" == typeof i && (this.options.subdomains = i.split(""))
        },
        onAdd: function(t) {
            this._map = t,
            this._animated = t._zoomAnimated,
            this._initContainer(),
            t.on({
                viewreset: this._reset,
                moveend: this._update
            }, this),
            this._animated && t.on({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this),
            this.options.updateWhenIdle || (this._limitedUpdate = o.Util.limitExecByInterval(this._update, 150, this),
            t.on("move", this._limitedUpdate, this)),
            this._reset(),
            this._update()
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        onRemove: function(t) {
            this._container.parentNode.removeChild(this._container),
            t.off({
                viewreset: this._reset,
                moveend: this._update
            }, this),
            this._animated && t.off({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this),
            this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this),
            this._container = null ,
            this._map = null 
        },
        bringToFront: function() {
            var t = this._map._panes.tilePane;
            return this._container && (t.appendChild(this._container),
            this._setAutoZIndex(t, Math.max)),
            this
        },
        bringToBack: function() {
            var t = this._map._panes.tilePane;
            return this._container && (t.insertBefore(this._container, t.firstChild),
            this._setAutoZIndex(t, Math.min)),
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._map && this._updateOpacity(),
            this
        },
        setZIndex: function(t) {
            return this.options.zIndex = t,
            this._updateZIndex(),
            this
        },
        setUrl: function(t, e) {
            return this._url = t,
            e || this.redraw(),
            this
        },
        redraw: function() {
            return this._map && (this._reset({
                hard: !0
            }),
            this._update()),
            this
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== i && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(t, e) {
            var i, n, o, s = t.children, a = -e(1 / 0, -(1 / 0));
            for (n = 0,
            o = s.length; o > n; n++)
                s[n] !== this._container && (i = parseInt(s[n].style.zIndex, 10),
                isNaN(i) || (a = e(a, i)));
            this.options.zIndex = this._container.style.zIndex = (isFinite(a) ? a : 0) + e(1, -1)
        },
        _updateOpacity: function() {
            var t, e = this._tiles;
            if (o.Browser.ielt9)
                for (t in e)
                    o.DomUtil.setOpacity(e[t], this.options.opacity);
            else
                o.DomUtil.setOpacity(this._container, this.options.opacity)
        },
        _initContainer: function() {
            var t = this._map._panes.tilePane;
            if (!this._container) {
                if (this._container = o.DomUtil.create("div", "leaflet-layer"),
                this._updateZIndex(),
                this._animated) {
                    var e = "leaflet-tile-container";
                    this._bgBuffer = o.DomUtil.create("div", e, this._container),
                    this._tileContainer = o.DomUtil.create("div", e, this._container)
                } else
                    this._tileContainer = this._container;
                t.appendChild(this._container),
                this.options.opacity < 1 && this._updateOpacity()
            }
        },
        _reset: function(t) {
            for (var e in this._tiles)
                this.fire("tileunload", {
                    tile: this._tiles[e]
                });
            this._tiles = {},
            this._tilesToLoad = 0,
            this.options.reuseTiles && (this._unusedTiles = []),
            this._tileContainer.innerHTML = "",
            this._animated && t && t.hard && this._clearBgBuffer(),
            this._initContainer()
        },
        _getTileSize: function() {
            var t = this._map
              , e = t.getZoom() + this.options.zoomOffset
              , i = this.options.maxNativeZoom
              , n = this.options.tileSize;
            return i && e > i && (n = Math.round(t.getZoomScale(e) / t.getZoomScale(i) * n)),
            n
        },
        _update: function() {
            if (this._map) {
                var t = this._map
                  , e = t.getPixelBounds()
                  , i = t.getZoom()
                  , n = this._getTileSize();
                if (!(i > this.options.maxZoom || i < this.options.minZoom)) {
                    var s = o.bounds(e.min.divideBy(n)._floor(), e.max.divideBy(n)._floor());
                    this._addTilesFromCenterOut(s),
                    (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(s)
                }
            }
        },
        _addTilesFromCenterOut: function(t) {
            var i, n, s, a = [], r = t.getCenter();
            for (i = t.min.y; i <= t.max.y; i++)
                for (n = t.min.x; n <= t.max.x; n++)
                    s = new o.Point(n,i),
                    this._tileShouldBeLoaded(s) && a.push(s);
            var h = a.length;
            if (0 !== h) {
                a.sort(function(t, e) {
                    return t.distanceTo(r) - e.distanceTo(r)
                });
                var l = e.createDocumentFragment();
                for (this._tilesToLoad || this.fire("loading"),
                this._tilesToLoad += h,
                n = 0; h > n; n++)
                    this._addTile(a[n], l);
                this._tileContainer.appendChild(l)
            }
        },
        _tileShouldBeLoaded: function(t) {
            if (t.x + ":" + t.y in this._tiles)
                return !1;
            var e = this.options;
            if (!e.continuousWorld) {
                var i = this._getWrapTileNum();
                if (e.noWrap && (t.x < 0 || t.x >= i.x) || t.y < 0 || t.y >= i.y)
                    return !1
            }
            if (e.bounds) {
                var n = this._getTileSize()
                  , o = t.multiplyBy(n)
                  , s = o.add([n, n])
                  , a = this._map.unproject(o)
                  , r = this._map.unproject(s);
                if (e.continuousWorld || e.noWrap || (a = a.wrap(),
                r = r.wrap()),
                !e.bounds.intersects([a, r]))
                    return !1
            }
            return !0
        },
        _removeOtherTiles: function(t) {
            var e, i, n, o;
            for (o in this._tiles)
                e = o.split(":"),
                i = parseInt(e[0], 10),
                n = parseInt(e[1], 10),
                (i < t.min.x || i > t.max.x || n < t.min.y || n > t.max.y) && this._removeTile(o)
        },
        _removeTile: function(t) {
            var e = this._tiles[t];
            this.fire("tileunload", {
                tile: e,
                url: e.src
            }),
            this.options.reuseTiles ? (o.DomUtil.removeClass(e, "leaflet-tile-loaded"),
            this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e),
            o.Browser.android || (e.onload = null ,
            e.src = o.Util.emptyImageUrl),
            delete this._tiles[t]
        },
        _addTile: function(t, e) {
            var i = this._getTilePos(t)
              , n = this._getTile();
            o.DomUtil.setPosition(n, i, o.Browser.chrome),
            this._tiles[t.x + ":" + t.y] = n,
            this._loadTile(n, t),
            n.parentNode !== this._tileContainer && e.appendChild(n)
        },
        _getZoomForUrl: function() {
            var t = this.options
              , e = this._map.getZoom();
            return t.zoomReverse && (e = t.maxZoom - e),
            e += t.zoomOffset,
            t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
        },
        _getTilePos: function(t) {
            var e = this._map.getPixelOrigin()
              , i = this._getTileSize();
            return t.multiplyBy(i).subtract(e)
        },
        getTileUrl: function(t) {
            return o.Util.template(this._url, o.extend({
                s: this._getSubdomain(t),
                z: t.z,
                x: t.x,
                y: t.y
            }, this.options))
        },
        _getWrapTileNum: function() {
            var t = this._map.options.crs
              , e = t.getSize(this._map.getZoom());
            return e.divideBy(this._getTileSize())._floor()
        },
        _adjustTilePoint: function(t) {
            var e = this._getWrapTileNum();
            this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x),
            this.options.tms && (t.y = e.y - t.y - 1),
            t.z = this._getZoomForUrl()
        },
        _getSubdomain: function(t) {
            var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[e]
        },
        _getTile: function() {
            if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                var t = this._unusedTiles.pop();
                return this._resetTile(t),
                t
            }
            return this._createTile()
        },
        _resetTile: function() {},
        _createTile: function() {
            var t = o.DomUtil.create("img", "leaflet-tile");
            return t.style.width = t.style.height = this._getTileSize() + "px",
            t.galleryimg = "no",
            t.onselectstart = t.onmousemove = o.Util.falseFn,
            o.Browser.ielt9 && this.options.opacity !== i && o.DomUtil.setOpacity(t, this.options.opacity),
            o.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"),
            t
        },
        _loadTile: function(t, e) {
            t._layer = this,
            t.onload = this._tileOnLoad,
            t.onerror = this._tileOnError,
            this._adjustTilePoint(e),
            t.src = this.getTileUrl(e),
            this.fire("tileloadstart", {
                tile: t,
                url: t.src
            })
        },
        _tileLoaded: function() {
            this._tilesToLoad--,
            this._animated && o.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"),
            this._tilesToLoad || (this.fire("load"),
            this._animated && (clearTimeout(this._clearBgBufferTimer),
            this._clearBgBufferTimer = setTimeout(o.bind(this._clearBgBuffer, this), 500)))
        },
        _tileOnLoad: function() {
            var t = this._layer;
            this.src !== o.Util.emptyImageUrl && (o.DomUtil.addClass(this, "leaflet-tile-loaded"),
            t.fire("tileload", {
                tile: this,
                url: this.src
            })),
            t._tileLoaded()
        },
        _tileOnError: function() {
            var t = this._layer;
            t.fire("tileerror", {
                tile: this,
                url: this.src
            });
            var e = t.options.errorTileUrl;
            e && (this.src = e),
            t._tileLoaded()
        }
    }),
    o.tileLayer = function(t, e) {
        return new o.TileLayer(t,e)
    }
    ,
    o.TileLayer.WMS = o.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
        },
        initialize: function(t, e) {
            this._url = t;
            var i = o.extend({}, this.defaultWmsParams)
              , n = e.tileSize || this.options.tileSize;
            e.detectRetina && o.Browser.retina ? i.width = i.height = 2 * n : i.width = i.height = n;
            for (var s in e)
                this.options.hasOwnProperty(s) || "crs" === s || (i[s] = e[s]);
            this.wmsParams = i,
            o.setOptions(this, e)
        },
        onAdd: function(t) {
            this._crs = this.options.crs || t.options.crs,
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[e] = this._crs.code,
            o.TileLayer.prototype.onAdd.call(this, t)
        },
        getTileUrl: function(t) {
            var e = this._map
              , i = this.options.tileSize
              , n = t.multiplyBy(i)
              , s = n.add([i, i])
              , a = this._crs.project(e.unproject(n, t.z))
              , r = this._crs.project(e.unproject(s, t.z))
              , h = this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [r.y, a.x, a.y, r.x].join(",") : [a.x, r.y, r.x, a.y].join(",")
              , l = o.Util.template(this._url, {
                s: this._getSubdomain(t)
            });
            return l + o.Util.getParamString(this.wmsParams, l, !0) + "&BBOX=" + h
        },
        setParams: function(t, e) {
            return o.extend(this.wmsParams, t),
            e || this.redraw(),
            this
        }
    }),
    o.tileLayer.wms = function(t, e) {
        return new o.TileLayer.WMS(t,e)
    }
    ,
    o.TileLayer.Canvas = o.TileLayer.extend({
        options: {
            async: !1
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        redraw: function() {
            this._map && (this._reset({
                hard: !0
            }),
            this._update());
            for (var t in this._tiles)
                this._redrawTile(this._tiles[t]);
            return this
        },
        _redrawTile: function(t) {
            this.drawTile(t, t._tilePoint, this._map._zoom)
        },
        _createTile: function() {
            var t = o.DomUtil.create("canvas", "leaflet-tile");
            return t.width = t.height = this.options.tileSize,
            t.onselectstart = t.onmousemove = o.Util.falseFn,
            t
        },
        _loadTile: function(t, e) {
            t._layer = this,
            t._tilePoint = e,
            this._redrawTile(t),
            this.options.async || this.tileDrawn(t)
        },
        drawTile: function() {},
        tileDrawn: function(t) {
            this._tileOnLoad.call(t)
        }
    }),
    o.tileLayer.canvas = function(t) {
        return new o.TileLayer.Canvas(t)
    }
    ,
    o.ImageOverlay = o.Class.extend({
        includes: o.Mixin.Events,
        options: {
            opacity: 1
        },
        initialize: function(t, e, i) {
            this._url = t,
            this._bounds = o.latLngBounds(e),
            o.setOptions(this, i)
        },
        onAdd: function(t) {
            this._map = t,
            this._image || this._initImage(),
            t._panes.overlayPane.appendChild(this._image),
            t.on("viewreset", this._reset, this),
            t.options.zoomAnimation && o.Browser.any3d && t.on("zoomanim", this._animateZoom, this),
            this._reset()
        },
        onRemove: function(t) {
            t.getPanes().overlayPane.removeChild(this._image),
            t.off("viewreset", this._reset, this),
            t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._updateOpacity(),
            this
        },
        bringToFront: function() {
            return this._image && this._map._panes.overlayPane.appendChild(this._image),
            this
        },
        bringToBack: function() {
            var t = this._map._panes.overlayPane;
            return this._image && t.insertBefore(this._image, t.firstChild),
            this
        },
        setUrl: function(t) {
            this._url = t,
            this._image.src = this._url
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _initImage: function() {
            this._image = o.DomUtil.create("img", "leaflet-image-layer"),
            this._map.options.zoomAnimation && o.Browser.any3d ? o.DomUtil.addClass(this._image, "leaflet-zoom-animated") : o.DomUtil.addClass(this._image, "leaflet-zoom-hide"),
            this._updateOpacity(),
            o.extend(this._image, {
                galleryimg: "no",
                onselectstart: o.Util.falseFn,
                onmousemove: o.Util.falseFn,
                onload: o.bind(this._onImageLoad, this),
                src: this._url
            })
        },
        _animateZoom: function(t) {
            var e = this._map
              , i = this._image
              , n = e.getZoomScale(t.zoom)
              , s = this._bounds.getNorthWest()
              , a = this._bounds.getSouthEast()
              , r = e._latLngToNewLayerPoint(s, t.zoom, t.center)
              , h = e._latLngToNewLayerPoint(a, t.zoom, t.center)._subtract(r)
              , l = r._add(h._multiplyBy(.5 * (1 - 1 / n)));
            i.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(l) + " scale(" + n + ") "
        },
        _reset: function() {
            var t = this._image
              , e = this._map.latLngToLayerPoint(this._bounds.getNorthWest())
              , i = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
            o.DomUtil.setPosition(t, e),
            t.style.width = i.x + "px",
            t.style.height = i.y + "px"
        },
        _onImageLoad: function() {
            this.fire("load")
        },
        _updateOpacity: function() {
            o.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    }),
    o.imageOverlay = function(t, e, i) {
        return new o.ImageOverlay(t,e,i)
    }
    ,
    o.Icon = o.Class.extend({
        options: {
            className: ""
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        createIcon: function(t) {
            return this._createIcon("icon", t)
        },
        createShadow: function(t) {
            return this._createIcon("shadow", t)
        },
        _createIcon: function(t, e) {
            var i = this._getIconUrl(t);
            if (!i) {
                if ("icon" === t)
                    throw new Error("iconUrl not set in Icon options (see the docs).");
                return null 
            }
            var n;
            return n = e && "IMG" === e.tagName ? this._createImg(i, e) : this._createImg(i),
            this._setIconStyles(n, t),
            n
        },
        _setIconStyles: function(t, e) {
            var i, n = this.options, s = o.point(n[e + "Size"]);
            i = "shadow" === e ? o.point(n.shadowAnchor || n.iconAnchor) : o.point(n.iconAnchor),
            !i && s && (i = s.divideBy(2, !0)),
            t.className = "leaflet-marker-" + e + " " + n.className,
            i && (t.style.marginLeft = -i.x + "px",
            t.style.marginTop = -i.y + "px"),
            s && (t.style.width = s.x + "px",
            t.style.height = s.y + "px")
        },
        _createImg: function(t, i) {
            return i = i || e.createElement("img"),
            i.src = t,
            i
        },
        _getIconUrl: function(t) {
            return o.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
        }
    }),
    o.icon = function(t) {
        return new o.Icon(t)
    }
    ,
    o.Icon.Default = o.Icon.extend({
        options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(t) {
            var e = t + "Url";
            if (this.options[e])
                return this.options[e];
            o.Browser.retina && "icon" === t && (t += "-2x");
            var i = o.Icon.Default.imagePath;
            if (!i)
                throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return i + "/marker-" + t + ".png"
        }
    }),
    o.Icon.Default.imagePath = function() {
        var t, i, n, o, s, a = e.getElementsByTagName("script"), r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
        for (t = 0,
        i = a.length; i > t; t++)
            if (n = a[t].src,
            o = n.match(r))
                return s = n.split(r)[0],
                (s ? s + "/" : "") + "images"
    }(),
    o.Marker = o.Class.extend({
        includes: o.Mixin.Events,
        options: {
            icon: new o.Icon.Default,
            title: "",
            alt: "",
            clickable: !0,
            draggable: !1,
            keyboard: !0,
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250
        },
        initialize: function(t, e) {
            o.setOptions(this, e),
            this._latlng = o.latLng(t)
        },
        onAdd: function(t) {
            this._map = t,
            t.on("viewreset", this.update, this),
            this._initIcon(),
            this.update(),
            this.fire("add"),
            t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        onRemove: function(t) {
            this.dragging && this.dragging.disable(),
            this._removeIcon(),
            this._removeShadow(),
            this.fire("remove"),
            t.off({
                viewreset: this.update,
                zoomanim: this._animateZoom
            }, this),
            this._map = null 
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            return this._latlng = o.latLng(t),
            this.update(),
            this.fire("move", {
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(t) {
            return this.options.zIndexOffset = t,
            this.update(),
            this
        },
        setIcon: function(t) {
            return this.options.icon = t,
            this._map && (this._initIcon(),
            this.update()),
            this._popup && this.bindPopup(this._popup),
            this
        },
        update: function() {
            return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()),
            this
        },
        _initIcon: function() {
            var t = this.options
              , e = this._map
              , i = e.options.zoomAnimation && e.options.markerZoomAnimation
              , n = i ? "leaflet-zoom-animated" : "leaflet-zoom-hide"
              , s = t.icon.createIcon(this._icon)
              , a = !1;
            s !== this._icon && (this._icon && this._removeIcon(),
            a = !0,
            t.title && (s.title = t.title),
            t.alt && (s.alt = t.alt)),
            o.DomUtil.addClass(s, n),
            t.keyboard && (s.tabIndex = "0"),
            this._icon = s,
            this._initInteraction(),
            t.riseOnHover && o.DomEvent.on(s, "mouseover", this._bringToFront, this).on(s, "mouseout", this._resetZIndex, this);
            var r = t.icon.createShadow(this._shadow)
              , h = !1;
            r !== this._shadow && (this._removeShadow(),
            h = !0),
            r && o.DomUtil.addClass(r, n),
            this._shadow = r,
            t.opacity < 1 && this._updateOpacity();
            var l = this._map._panes;
            a && l.markerPane.appendChild(this._icon),
            r && h && l.shadowPane.appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && o.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex),
            this._map._panes.markerPane.removeChild(this._icon),
            this._icon = null 
        },
        _removeShadow: function() {
            this._shadow && this._map._panes.shadowPane.removeChild(this._shadow),
            this._shadow = null 
        },
        _setPos: function(t) {
            o.DomUtil.setPosition(this._icon, t),
            this._shadow && o.DomUtil.setPosition(this._shadow, t),
            this._zIndex = t.y + this.options.zIndexOffset,
            this._resetZIndex()
        },
        _updateZIndex: function(t) {
            this._icon.style.zIndex = this._zIndex + t
        },
        _animateZoom: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(e)
        },
        _initInteraction: function() {
            if (this.options.clickable) {
                var t = this._icon
                  , e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                o.DomUtil.addClass(t, "leaflet-clickable"),
                o.DomEvent.on(t, "click", this._onMouseClick, this),
                o.DomEvent.on(t, "keypress", this._onKeyPress, this);
                for (var i = 0; i < e.length; i++)
                    o.DomEvent.on(t, e[i], this._fireMouseEvent, this);
                o.Handler.MarkerDrag && (this.dragging = new o.Handler.MarkerDrag(this),
                this.options.draggable && this.dragging.enable())
            }
        },
        _onMouseClick: function(t) {
            var e = this.dragging && this.dragging.moved();
            (this.hasEventListeners(t.type) || e) && o.DomEvent.stopPropagation(t),
            e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {
                originalEvent: t,
                latlng: this._latlng
            })
        },
        _onKeyPress: function(t) {
            13 === t.keyCode && this.fire("click", {
                originalEvent: t,
                latlng: this._latlng
            })
        },
        _fireMouseEvent: function(t) {
            this.fire(t.type, {
                originalEvent: t,
                latlng: this._latlng
            }),
            "contextmenu" === t.type && this.hasEventListeners(t.type) && o.DomEvent.preventDefault(t),
            "mousedown" !== t.type ? o.DomEvent.stopPropagation(t) : o.DomEvent.preventDefault(t)
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._map && this._updateOpacity(),
            this
        },
        _updateOpacity: function() {
            o.DomUtil.setOpacity(this._icon, this.options.opacity),
            this._shadow && o.DomUtil.setOpacity(this._shadow, this.options.opacity)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        }
    }),
    o.marker = function(t, e) {
        return new o.Marker(t,e)
    }
    ,
    o.DivIcon = o.Icon.extend({
        options: {
            iconSize: [12, 12],
            className: "leaflet-div-icon",
            html: !1
        },
        createIcon: function(t) {
            var i = t && "DIV" === t.tagName ? t : e.createElement("div")
              , n = this.options;
            return n.html !== !1 ? i.innerHTML = n.html : i.innerHTML = "",
            n.bgPos && (i.style.backgroundPosition = -n.bgPos.x + "px " + -n.bgPos.y + "px"),
            this._setIconStyles(i, "icon"),
            i
        },
        createShadow: function() {
            return null 
        }
    }),
    o.divIcon = function(t) {
        return new o.DivIcon(t)
    }
    ,
    o.Map.mergeOptions({
        closePopupOnClick: !0
    }),
    o.Popup = o.Class.extend({
        includes: o.Mixin.Events,
        options: {
            minWidth: 50,
            maxWidth: 300,
            autoPan: !0,
            closeButton: !0,
            offset: [0, 7],
            autoPanPadding: [5, 5],
            keepInView: !1,
            className: "",
            zoomAnimation: !0
        },
        initialize: function(t, e) {
            o.setOptions(this, t),
            this._source = e,
            this._animated = o.Browser.any3d && this.options.zoomAnimation,
            this._isOpen = !1
        },
        onAdd: function(t) {
            this._map = t,
            this._container || this._initLayout();
            var e = t.options.fadeAnimation;
            e && o.DomUtil.setOpacity(this._container, 0),
            t._panes.popupPane.appendChild(this._container),
            t.on(this._getEvents(), this),
            this.update(),
            e && o.DomUtil.setOpacity(this._container, 1),
            this.fire("open"),
            t.fire("popupopen", {
                popup: this
            }),
            this._source && this._source.fire("popupopen", {
                popup: this
            })
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        openOn: function(t) {
            return t.openPopup(this),
            this
        },
        onRemove: function(t) {
            t._panes.popupPane.removeChild(this._container),
            o.Util.falseFn(this._container.offsetWidth),
            t.off(this._getEvents(), this),
            t.options.fadeAnimation && o.DomUtil.setOpacity(this._container, 0),
            this._map = null ,
            this.fire("close"),
            t.fire("popupclose", {
                popup: this
            }),
            this._source && this._source.fire("popupclose", {
                popup: this
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            return this._latlng = o.latLng(t),
            this._map && (this._updatePosition(),
            this._adjustPan()),
            this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(t) {
            return this._content = t,
            this.update(),
            this
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden",
            this._updateContent(),
            this._updateLayout(),
            this._updatePosition(),
            this._container.style.visibility = "",
            this._adjustPan())
        },
        _getEvents: function() {
            var t = {
                viewreset: this._updatePosition
            };
            return this._animated && (t.zoomanim = this._zoomAnimation),
            ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close),
            this.options.keepInView && (t.moveend = this._adjustPan),
            t
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var t, e = "leaflet-popup", i = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"), n = this._container = o.DomUtil.create("div", i);
            this.options.closeButton && (t = this._closeButton = o.DomUtil.create("a", e + "-close-button", n),
            t.href = "#close",
            t.innerHTML = "&#215;",
            o.DomEvent.disableClickPropagation(t),
            o.DomEvent.on(t, "click", this._onCloseButtonClick, this));
            var s = this._wrapper = o.DomUtil.create("div", e + "-content-wrapper", n);
            o.DomEvent.disableClickPropagation(s),
            this._contentNode = o.DomUtil.create("div", e + "-content", s),
            o.DomEvent.disableScrollPropagation(this._contentNode),
            o.DomEvent.on(s, "contextmenu", o.DomEvent.stopPropagation),
            this._tipContainer = o.DomUtil.create("div", e + "-tip-container", n),
            this._tip = o.DomUtil.create("div", e + "-tip", this._tipContainer)
        },
        _updateContent: function() {
            if (this._content) {
                if ("string" == typeof this._content)
                    this._contentNode.innerHTML = this._content;
                else {
                    for (; this._contentNode.hasChildNodes(); )
                        this._contentNode.removeChild(this._contentNode.firstChild);
                    this._contentNode.appendChild(this._content)
                }
                this.fire("contentupdate")
            }
        },
        _updateLayout: function() {
            var t = this._contentNode
              , e = t.style;
            e.width = "",
            e.whiteSpace = "nowrap";
            var i = t.offsetWidth;
            i = Math.min(i, this.options.maxWidth),
            i = Math.max(i, this.options.minWidth),
            e.width = i + 1 + "px",
            e.whiteSpace = "",
            e.height = "";
            var n = t.offsetHeight
              , s = this.options.maxHeight
              , a = "leaflet-popup-scrolled";
            s && n > s ? (e.height = s + "px",
            o.DomUtil.addClass(t, a)) : o.DomUtil.removeClass(t, a),
            this._containerWidth = this._container.offsetWidth
        },
        _updatePosition: function() {
            if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng)
                  , e = this._animated
                  , i = o.point(this.options.offset);
                e && o.DomUtil.setPosition(this._container, t),
                this._containerBottom = -i.y - (e ? 0 : t.y),
                this._containerLeft = -Math.round(this._containerWidth / 2) + i.x + (e ? 0 : t.x),
                this._container.style.bottom = this._containerBottom + "px",
                this._container.style.left = this._containerLeft + "px"
            }
        },
        _zoomAnimation: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            o.DomUtil.setPosition(this._container, e)
        },
        _adjustPan: function() {
            if (this.options.autoPan) {
                var t = this._map
                  , e = this._container.offsetHeight
                  , i = this._containerWidth
                  , n = new o.Point(this._containerLeft,-e - this._containerBottom);
                this._animated && n._add(o.DomUtil.getPosition(this._container));
                var s = t.layerPointToContainerPoint(n)
                  , a = o.point(this.options.autoPanPadding)
                  , r = o.point(this.options.autoPanPaddingTopLeft || a)
                  , h = o.point(this.options.autoPanPaddingBottomRight || a)
                  , l = t.getSize()
                  , u = 0
                  , c = 0;
                s.x + i + h.x > l.x && (u = s.x + i - l.x + h.x),
                s.x - u - r.x < 0 && (u = s.x - r.x),
                s.y + e + h.y > l.y && (c = s.y + e - l.y + h.y),
                s.y - c - r.y < 0 && (c = s.y - r.y),
                (u || c) && t.fire("autopanstart").panBy([u, c])
            }
        },
        _onCloseButtonClick: function(t) {
            this._close(),
            o.DomEvent.stop(t)
        }
    }),
    o.popup = function(t, e) {
        return new o.Popup(t,e)
    }
    ,
    o.Map.include({
        openPopup: function(t, e, i) {
            if (this.closePopup(),
            !(t instanceof o.Popup)) {
                var n = t;
                t = new o.Popup(i).setLatLng(e).setContent(n)
            }
            return t._isOpen = !0,
            this._popup = t,
            this.addLayer(t)
        },
        closePopup: function(t) {
            return t && t !== this._popup || (t = this._popup,
            this._popup = null ),
            t && (this.removeLayer(t),
            t._isOpen = !1),
            this
        }
    }),
    o.Marker.include({
        openPopup: function() {
            return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng),
            this._map.openPopup(this._popup)),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        togglePopup: function() {
            return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()),
            this
        },
        bindPopup: function(t, e) {
            var i = o.point(this.options.icon.options.popupAnchor || [0, 0]);
            return i = i.add(o.Popup.prototype.options.offset),
            e && e.offset && (i = i.add(e.offset)),
            e = o.extend({
                offset: i
            }, e),
            this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this),
            this._popupHandlersAdded = !0),
            t instanceof o.Popup ? (o.setOptions(t, e),
            this._popup = t,
            t._source = this) : this._popup = new o.Popup(e,this).setContent(t),
            this
        },
        setPopupContent: function(t) {
            return this._popup && this._popup.setContent(t),
            this
        },
        unbindPopup: function() {
            return this._popup && (this._popup = null ,
            this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this),
            this._popupHandlersAdded = !1),
            this
        },
        getPopup: function() {
            return this._popup
        },
        _movePopup: function(t) {
            this._popup.setLatLng(t.latlng)
        }
    }),
    o.LayerGroup = o.Class.extend({
        initialize: function(t) {
            this._layers = {};
            var e, i;
            if (t)
                for (e = 0,
                i = t.length; i > e; e++)
                    this.addLayer(t[e])
        },
        addLayer: function(t) {
            var e = this.getLayerId(t);
            return this._layers[e] = t,
            this._map && this._map.addLayer(t),
            this
        },
        removeLayer: function(t) {
            var e = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]),
            delete this._layers[e],
            this
        },
        hasLayer: function(t) {
            return t ? t in this._layers || this.getLayerId(t) in this._layers : !1
        },
        clearLayers: function() {
            return this.eachLayer(this.removeLayer, this),
            this
        },
        invoke: function(t) {
            var e, i, n = Array.prototype.slice.call(arguments, 1);
            for (e in this._layers)
                i = this._layers[e],
                i[t] && i[t].apply(i, n);
            return this
        },
        onAdd: function(t) {
            this._map = t,
            this.eachLayer(t.addLayer, t)
        },
        onRemove: function(t) {
            this.eachLayer(t.removeLayer, t),
            this._map = null 
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        eachLayer: function(t, e) {
            for (var i in this._layers)
                t.call(e, this._layers[i]);
            return this
        },
        getLayer: function(t) {
            return this._layers[t]
        },
        getLayers: function() {
            var t = [];
            for (var e in this._layers)
                t.push(this._layers[e]);
            return t
        },
        setZIndex: function(t) {
            return this.invoke("setZIndex", t)
        },
        getLayerId: function(t) {
            return o.stamp(t)
        }
    }),
    o.layerGroup = function(t) {
        return new o.LayerGroup(t)
    }
    ,
    o.FeatureGroup = o.LayerGroup.extend({
        includes: o.Mixin.Events,
        statics: {
            EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
        },
        addLayer: function(t) {
            return this.hasLayer(t) ? this : ("on" in t && t.on(o.FeatureGroup.EVENTS, this._propagateEvent, this),
            o.LayerGroup.prototype.addLayer.call(this, t),
            this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions),
            this.fire("layeradd", {
                layer: t
            }))
        },
        removeLayer: function(t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]),
            "off" in t && t.off(o.FeatureGroup.EVENTS, this._propagateEvent, this),
            o.LayerGroup.prototype.removeLayer.call(this, t),
            this._popupContent && this.invoke("unbindPopup"),
            this.fire("layerremove", {
                layer: t
            })) : this
        },
        bindPopup: function(t, e) {
            return this._popupContent = t,
            this._popupOptions = e,
            this.invoke("bindPopup", t, e)
        },
        openPopup: function(t) {
            for (var e in this._layers) {
                this._layers[e].openPopup(t);
                break
            }
            return this
        },
        setStyle: function(t) {
            return this.invoke("setStyle", t)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var t = new o.LatLngBounds;
            return this.eachLayer(function(e) {
                t.extend(e instanceof o.Marker ? e.getLatLng() : e.getBounds())
            }),
            t
        },
        _propagateEvent: function(t) {
            t = o.extend({
                layer: t.target,
                target: this
            }, t),
            this.fire(t.type, t)
        }
    }),
    o.featureGroup = function(t) {
        return new o.FeatureGroup(t)
    }
    ,
    o.Path = o.Class.extend({
        includes: [o.Mixin.Events],
        statics: {
            CLIP_PADDING: function() {
                var e = o.Browser.mobile ? 1280 : 2e3
                  , i = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
                return Math.max(0, Math.min(.5, i))
            }()
        },
        options: {
            stroke: !0,
            color: "#0033ff",
            dashArray: null ,
            lineCap: null ,
            lineJoin: null ,
            weight: 5,
            opacity: .5,
            fill: !1,
            fillColor: null ,
            fillOpacity: .2,
            clickable: !0
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        onAdd: function(t) {
            this._map = t,
            this._container || (this._initElements(),
            this._initEvents()),
            this.projectLatlngs(),
            this._updatePath(),
            this._container && this._map._pathRoot.appendChild(this._container),
            this.fire("add"),
            t.on({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        onRemove: function(t) {
            t._pathRoot.removeChild(this._container),
            this.fire("remove"),
            this._map = null ,
            o.Browser.vml && (this._container = null ,
            this._stroke = null ,
            this._fill = null ),
            t.off({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        projectLatlngs: function() {},
        setStyle: function(t) {
            return o.setOptions(this, t),
            this._container && this._updateStyle(),
            this
        },
        redraw: function() {
            return this._map && (this.projectLatlngs(),
            this._updatePath()),
            this
        }
    }),
    o.Map.include({
        _updatePathViewport: function() {
            var t = o.Path.CLIP_PADDING
              , e = this.getSize()
              , i = o.DomUtil.getPosition(this._mapPane)
              , n = i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round())
              , s = n.add(e.multiplyBy(1 + 2 * t)._round());
            this._pathViewport = new o.Bounds(n,s)
        }
    }),
    o.Path.SVG_NS = "http://www.w3.org/2000/svg",
    o.Browser.svg = !(!e.createElementNS || !e.createElementNS(o.Path.SVG_NS, "svg").createSVGRect),
    o.Path = o.Path.extend({
        statics: {
            SVG: o.Browser.svg
        },
        bringToFront: function() {
            var t = this._map._pathRoot
              , e = this._container;
            return e && t.lastChild !== e && t.appendChild(e),
            this
        },
        bringToBack: function() {
            var t = this._map._pathRoot
              , e = this._container
              , i = t.firstChild;
            return e && i !== e && t.insertBefore(e, i),
            this
        },
        getPathString: function() {},
        _createElement: function(t) {
            return e.createElementNS(o.Path.SVG_NS, t)
        },
        _initElements: function() {
            this._map._initPathRoot(),
            this._initPath(),
            this._initStyle()
        },
        _initPath: function() {
            this._container = this._createElement("g"),
            this._path = this._createElement("path"),
            this.options.className && o.DomUtil.addClass(this._path, this.options.className),
            this._container.appendChild(this._path)
        },
        _initStyle: function() {
            this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"),
            this._path.setAttribute("stroke-linecap", "round")),
            this.options.fill && this._path.setAttribute("fill-rule", "evenodd"),
            this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents),
            this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"),
            this._updateStyle()
        },
        _updateStyle: function() {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color),
            this._path.setAttribute("stroke-opacity", this.options.opacity),
            this._path.setAttribute("stroke-width", this.options.weight),
            this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"),
            this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap),
            this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"),
            this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color),
            this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
        },
        _updatePath: function() {
            var t = this.getPathString();
            t || (t = "M0 0"),
            this._path.setAttribute("d", t)
        },
        _initEvents: function() {
            if (this.options.clickable) {
                (o.Browser.svg || !o.Browser.vml) && o.DomUtil.addClass(this._path, "leaflet-clickable"),
                o.DomEvent.on(this._container, "click", this._onMouseClick, this);
                for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++)
                    o.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
            }
        },
        _onMouseClick: function(t) {
            this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
        },
        _fireMouseEvent: function(t) {
            if (this._map && this.hasEventListeners(t.type)) {
                var e = this._map
                  , i = e.mouseEventToContainerPoint(t)
                  , n = e.containerPointToLayerPoint(i)
                  , s = e.layerPointToLatLng(n);
                this.fire(t.type, {
                    latlng: s,
                    layerPoint: n,
                    containerPoint: i,
                    originalEvent: t
                }),
                "contextmenu" === t.type && o.DomEvent.preventDefault(t),
                "mousemove" !== t.type && o.DomEvent.stopPropagation(t)
            }
        }
    }),
    o.Map.include({
        _initPathRoot: function() {
            this._pathRoot || (this._pathRoot = o.Path.prototype._createElement("svg"),
            this._panes.overlayPane.appendChild(this._pathRoot),
            this.options.zoomAnimation && o.Browser.any3d ? (o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"),
            this.on({
                zoomanim: this._animatePathZoom,
                zoomend: this._endPathZoom
            })) : o.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"),
            this.on("moveend", this._updateSvgViewport),
            this._updateSvgViewport())
        },
        _animatePathZoom: function(t) {
            var e = this.getZoomScale(t.zoom)
              , i = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
            this._pathRoot.style[o.DomUtil.TRANSFORM] = o.DomUtil.getTranslateString(i) + " scale(" + e + ") ",
            this._pathZooming = !0
        },
        _endPathZoom: function() {
            this._pathZooming = !1
        },
        _updateSvgViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var t = this._pathViewport
                  , e = t.min
                  , i = t.max
                  , n = i.x - e.x
                  , s = i.y - e.y
                  , a = this._pathRoot
                  , r = this._panes.overlayPane;
                o.Browser.mobileWebkit && r.removeChild(a),
                o.DomUtil.setPosition(a, e),
                a.setAttribute("width", n),
                a.setAttribute("height", s),
                a.setAttribute("viewBox", [e.x, e.y, n, s].join(" ")),
                o.Browser.mobileWebkit && r.appendChild(a)
            }
        }
    }),
    o.Path.include({
        bindPopup: function(t, e) {
            return t instanceof o.Popup ? this._popup = t : ((!this._popup || e) && (this._popup = new o.Popup(e,this)),
            this._popup.setContent(t)),
            this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this),
            this._popupHandlersAdded = !0),
            this
        },
        unbindPopup: function() {
            return this._popup && (this._popup = null ,
            this.off("click", this._openPopup).off("remove", this.closePopup),
            this._popupHandlersAdded = !1),
            this
        },
        openPopup: function(t) {
            return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)],
            this._openPopup({
                latlng: t
            })),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        _openPopup: function(t) {
            this._popup.setLatLng(t.latlng),
            this._map.openPopup(this._popup)
        }
    }),
    o.Browser.vml = !o.Browser.svg && function() {
        try {
            var t = e.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var i = t.firstChild;
            return i.style.behavior = "url(#default#VML)",
            i && "object" == typeof i.adj
        } catch (n) {
            return !1
        }
    }(),
    o.Path = o.Browser.svg || !o.Browser.vml ? o.Path : o.Path.extend({
        statics: {
            VML: !0,
            CLIP_PADDING: .02
        },
        _createElement: function() {
            try {
                return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                function(t) {
                    return e.createElement("<lvml:" + t + ' class="lvml">')
                }
            } catch (t) {
                return function(t) {
                    return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        }(),
        _initPath: function() {
            var t = this._container = this._createElement("shape");
            o.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")),
            this.options.clickable && o.DomUtil.addClass(t, "leaflet-clickable"),
            t.coordsize = "1 1",
            this._path = this._createElement("path"),
            t.appendChild(this._path),
            this._map._pathRoot.appendChild(t)
        },
        _initStyle: function() {
            this._updateStyle()
        },
        _updateStyle: function() {
            var t = this._stroke
              , e = this._fill
              , i = this.options
              , n = this._container;
            n.stroked = i.stroke,
            n.filled = i.fill,
            i.stroke ? (t || (t = this._stroke = this._createElement("stroke"),
            t.endcap = "round",
            n.appendChild(t)),
            t.weight = i.weight + "px",
            t.color = i.color,
            t.opacity = i.opacity,
            i.dashArray ? t.dashStyle = o.Util.isArray(i.dashArray) ? i.dashArray.join(" ") : i.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "",
            i.lineCap && (t.endcap = i.lineCap.replace("butt", "flat")),
            i.lineJoin && (t.joinstyle = i.lineJoin)) : t && (n.removeChild(t),
            this._stroke = null ),
            i.fill ? (e || (e = this._fill = this._createElement("fill"),
            n.appendChild(e)),
            e.color = i.fillColor || i.color,
            e.opacity = i.fillOpacity) : e && (n.removeChild(e),
            this._fill = null )
        },
        _updatePath: function() {
            var t = this._container.style;
            t.display = "none",
            this._path.v = this.getPathString() + " ",
            t.display = ""
        }
    }),
    o.Map.include(o.Browser.svg || !o.Browser.vml ? {} : {
        _initPathRoot: function() {
            if (!this._pathRoot) {
                var t = this._pathRoot = e.createElement("div");
                t.className = "leaflet-vml-container",
                this._panes.overlayPane.appendChild(t),
                this.on("moveend", this._updatePathViewport),
                this._updatePathViewport()
            }
        }
    }),
    o.Browser.canvas = function() {
        return !!e.createElement("canvas").getContext
    }(),
    o.Path = o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? o.Path : o.Path.extend({
        statics: {
            CANVAS: !0,
            SVG: !1
        },
        redraw: function() {
            return this._map && (this.projectLatlngs(),
            this._requestUpdate()),
            this
        },
        setStyle: function(t) {
            return o.setOptions(this, t),
            this._map && (this._updateStyle(),
            this._requestUpdate()),
            this
        },
        onRemove: function(t) {
            t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this),
            this.options.clickable && (this._map.off("click", this._onClick, this),
            this._map.off("mousemove", this._onMouseMove, this)),
            this._requestUpdate(),
            this.fire("remove"),
            this._map = null 
        },
        _requestUpdate: function() {
            this._map && !o.Path._updateRequest && (o.Path._updateRequest = o.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
        },
        _fireMapMoveEnd: function() {
            o.Path._updateRequest = null ,
            this.fire("moveend")
        },
        _initElements: function() {
            this._map._initPathRoot(),
            this._ctx = this._map._canvasCtx
        },
        _updateStyle: function() {
            var t = this.options;
            t.stroke && (this._ctx.lineWidth = t.weight,
            this._ctx.strokeStyle = t.color),
            t.fill && (this._ctx.fillStyle = t.fillColor || t.color),
            t.lineCap && (this._ctx.lineCap = t.lineCap),
            t.lineJoin && (this._ctx.lineJoin = t.lineJoin)
        },
        _drawPath: function() {
            var t, e, i, n, s, a;
            for (this._ctx.beginPath(),
            t = 0,
            i = this._parts.length; i > t; t++) {
                for (e = 0,
                n = this._parts[t].length; n > e; e++)
                    s = this._parts[t][e],
                    a = (0 === e ? "move" : "line") + "To",
                    this._ctx[a](s.x, s.y);
                this instanceof o.Polygon && this._ctx.closePath()
            }
        },
        _checkIfEmpty: function() {
            return !this._parts.length
        },
        _updatePath: function() {
            if (!this._checkIfEmpty()) {
                var t = this._ctx
                  , e = this.options;
                this._drawPath(),
                t.save(),
                this._updateStyle(),
                e.fill && (t.globalAlpha = e.fillOpacity,
                t.fill(e.fillRule || "evenodd")),
                e.stroke && (t.globalAlpha = e.opacity,
                t.stroke()),
                t.restore()
            }
        },
        _initEvents: function() {
            this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this),
            this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
        },
        _fireMouseEvent: function(t) {
            this._containsPoint(t.layerPoint) && this.fire(t.type, t)
        },
        _onMouseMove: function(t) {
            this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer",
            this._mouseInside = !0,
            this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "",
            this._mouseInside = !1,
            this.fire("mouseout", t)))
        }
    }),
    o.Map.include(o.Path.SVG && !t.L_PREFER_CANVAS || !o.Browser.canvas ? {} : {
        _initPathRoot: function() {
            var t, i = this._pathRoot;
            i || (i = this._pathRoot = e.createElement("canvas"),
            i.style.position = "absolute",
            t = this._canvasCtx = i.getContext("2d"),
            t.lineCap = "round",
            t.lineJoin = "round",
            this._panes.overlayPane.appendChild(i),
            this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated",
            this.on("zoomanim", this._animatePathZoom),
            this.on("zoomend", this._endPathZoom)),
            this.on("moveend", this._updateCanvasViewport),
            this._updateCanvasViewport())
        },
        _updateCanvasViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var t = this._pathViewport
                  , e = t.min
                  , i = t.max.subtract(e)
                  , n = this._pathRoot;
                o.DomUtil.setPosition(n, e),
                n.width = i.x,
                n.height = i.y,
                n.getContext("2d").translate(-e.x, -e.y)
            }
        }
    }),
    o.LineUtil = {
        simplify: function(t, e) {
            if (!e || !t.length)
                return t.slice();
            var i = e * e;
            return t = this._reducePoints(t, i),
            t = this._simplifyDP(t, i)
        },
        pointToSegmentDistance: function(t, e, i) {
            return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
        },
        closestPointOnSegment: function(t, e, i) {
            return this._sqClosestPointOnSegment(t, e, i)
        },
        _simplifyDP: function(t, e) {
            var n = t.length
              , o = typeof Uint8Array != i + "" ? Uint8Array : Array
              , s = new o(n);
            s[0] = s[n - 1] = 1,
            this._simplifyDPStep(t, s, e, 0, n - 1);
            var a, r = [];
            for (a = 0; n > a; a++)
                s[a] && r.push(t[a]);
            return r
        },
        _simplifyDPStep: function(t, e, i, n, o) {
            var s, a, r, h = 0;
            for (a = n + 1; o - 1 >= a; a++)
                r = this._sqClosestPointOnSegment(t[a], t[n], t[o], !0),
                r > h && (s = a,
                h = r);
            h > i && (e[s] = 1,
            this._simplifyDPStep(t, e, i, n, s),
            this._simplifyDPStep(t, e, i, s, o))
        },
        _reducePoints: function(t, e) {
            for (var i = [t[0]], n = 1, o = 0, s = t.length; s > n; n++)
                this._sqDist(t[n], t[o]) > e && (i.push(t[n]),
                o = n);
            return s - 1 > o && i.push(t[s - 1]),
            i
        },
        clipSegment: function(t, e, i, n) {
            var o, s, a, r = n ? this._lastCode : this._getBitCode(t, i), h = this._getBitCode(e, i);
            for (this._lastCode = h; ; ) {
                if (!(r | h))
                    return [t, e];
                if (r & h)
                    return !1;
                o = r || h,
                s = this._getEdgeIntersection(t, e, o, i),
                a = this._getBitCode(s, i),
                o === r ? (t = s,
                r = a) : (e = s,
                h = a)
            }
        },
        _getEdgeIntersection: function(t, e, i, n) {
            var s = e.x - t.x
              , a = e.y - t.y
              , r = n.min
              , h = n.max;
            return 8 & i ? new o.Point(t.x + s * (h.y - t.y) / a,h.y) : 4 & i ? new o.Point(t.x + s * (r.y - t.y) / a,r.y) : 2 & i ? new o.Point(h.x,t.y + a * (h.x - t.x) / s) : 1 & i ? new o.Point(r.x,t.y + a * (r.x - t.x) / s) : void 0
        },
        _getBitCode: function(t, e) {
            var i = 0;
            return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2),
            t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8),
            i
        },
        _sqDist: function(t, e) {
            var i = e.x - t.x
              , n = e.y - t.y;
            return i * i + n * n
        },
        _sqClosestPointOnSegment: function(t, e, i, n) {
            var s, a = e.x, r = e.y, h = i.x - a, l = i.y - r, u = h * h + l * l;
            return u > 0 && (s = ((t.x - a) * h + (t.y - r) * l) / u,
            s > 1 ? (a = i.x,
            r = i.y) : s > 0 && (a += h * s,
            r += l * s)),
            h = t.x - a,
            l = t.y - r,
            n ? h * h + l * l : new o.Point(a,r)
        }
    },
    o.Polyline = o.Path.extend({
        initialize: function(t, e) {
            o.Path.prototype.initialize.call(this, e),
            this._latlngs = this._convertLatLngs(t)
        },
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        projectLatlngs: function() {
            this._originalPoints = [];
            for (var t = 0, e = this._latlngs.length; e > t; t++)
                this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
        },
        getPathString: function() {
            for (var t = 0, e = this._parts.length, i = ""; e > t; t++)
                i += this._getPathPartStr(this._parts[t]);
            return i
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(t) {
            return this._latlngs = this._convertLatLngs(t),
            this.redraw()
        },
        addLatLng: function(t) {
            return this._latlngs.push(o.latLng(t)),
            this.redraw()
        },
        spliceLatLngs: function() {
            var t = [].splice.apply(this._latlngs, arguments);
            return this._convertLatLngs(this._latlngs, !0),
            this.redraw(),
            t
        },
        closestLayerPoint: function(t) {
            for (var e, i, n = 1 / 0, s = this._parts, a = null , r = 0, h = s.length; h > r; r++)
                for (var l = s[r], u = 1, c = l.length; c > u; u++) {
                    e = l[u - 1],
                    i = l[u];
                    var d = o.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
                    n > d && (n = d,
                    a = o.LineUtil._sqClosestPointOnSegment(t, e, i))
                }
            return a && (a.distance = Math.sqrt(n)),
            a
        },
        getBounds: function() {
            return new o.LatLngBounds(this.getLatLngs())
        },
        _convertLatLngs: function(t, e) {
            var i, n, s = e ? t : [];
            for (i = 0,
            n = t.length; n > i; i++) {
                if (o.Util.isArray(t[i]) && "number" != typeof t[i][0])
                    return;
                s[i] = o.latLng(t[i])
            }
            return s
        },
        _initEvents: function() {
            o.Path.prototype._initEvents.call(this)
        },
        _getPathPartStr: function(t) {
            for (var e, i = o.Path.VML, n = 0, s = t.length, a = ""; s > n; n++)
                e = t[n],
                i && e._round(),
                a += (n ? "L" : "M") + e.x + " " + e.y;
            return a
        },
        _clipPoints: function() {
            var t, e, i, n = this._originalPoints, s = n.length;
            if (this.options.noClip)
                return void (this._parts = [n]);
            this._parts = [];
            var a = this._parts
              , r = this._map._pathViewport
              , h = o.LineUtil;
            for (t = 0,
            e = 0; s - 1 > t; t++)
                i = h.clipSegment(n[t], n[t + 1], r, t),
                i && (a[e] = a[e] || [],
                a[e].push(i[0]),
                (i[1] !== n[t + 1] || t === s - 2) && (a[e].push(i[1]),
                e++))
        },
        _simplifyPoints: function() {
            for (var t = this._parts, e = o.LineUtil, i = 0, n = t.length; n > i; i++)
                t[i] = e.simplify(t[i], this.options.smoothFactor)
        },
        _updatePath: function() {
            this._map && (this._clipPoints(),
            this._simplifyPoints(),
            o.Path.prototype._updatePath.call(this))
        }
    }),
    o.polyline = function(t, e) {
        return new o.Polyline(t,e)
    }
    ,
    o.PolyUtil = {},
    o.PolyUtil.clipPolygon = function(t, e) {
        var i, n, s, a, r, h, l, u, c, d = [1, 4, 2, 8], p = o.LineUtil;
        for (n = 0,
        l = t.length; l > n; n++)
            t[n]._code = p._getBitCode(t[n], e);
        for (a = 0; 4 > a; a++) {
            for (u = d[a],
            i = [],
            n = 0,
            l = t.length,
            s = l - 1; l > n; s = n++)
                r = t[n],
                h = t[s],
                r._code & u ? h._code & u || (c = p._getEdgeIntersection(h, r, u, e),
                c._code = p._getBitCode(c, e),
                i.push(c)) : (h._code & u && (c = p._getEdgeIntersection(h, r, u, e),
                c._code = p._getBitCode(c, e),
                i.push(c)),
                i.push(r));
            t = i
        }
        return t
    }
    ,
    o.Polygon = o.Polyline.extend({
        options: {
            fill: !0
        },
        initialize: function(t, e) {
            o.Polyline.prototype.initialize.call(this, t, e),
            this._initWithHoles(t)
        },
        _initWithHoles: function(t) {
            var e, i, n;
            if (t && o.Util.isArray(t[0]) && "number" != typeof t[0][0])
                for (this._latlngs = this._convertLatLngs(t[0]),
                this._holes = t.slice(1),
                e = 0,
                i = this._holes.length; i > e; e++)
                    n = this._holes[e] = this._convertLatLngs(this._holes[e]),
                    n[0].equals(n[n.length - 1]) && n.pop();
            t = this._latlngs,
            t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
        },
        projectLatlngs: function() {
            if (o.Polyline.prototype.projectLatlngs.call(this),
            this._holePoints = [],
            this._holes) {
                var t, e, i, n;
                for (t = 0,
                i = this._holes.length; i > t; t++)
                    for (this._holePoints[t] = [],
                    e = 0,
                    n = this._holes[t].length; n > e; e++)
                        this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
            }
        },
        setLatLngs: function(t) {
            return t && o.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t),
            this.redraw()) : o.Polyline.prototype.setLatLngs.call(this, t)
        },
        _clipPoints: function() {
            var t = this._originalPoints
              , e = [];
            if (this._parts = [t].concat(this._holePoints),
            !this.options.noClip) {
                for (var i = 0, n = this._parts.length; n > i; i++) {
                    var s = o.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
                    s.length && e.push(s)
                }
                this._parts = e
            }
        },
        _getPathPartStr: function(t) {
            var e = o.Polyline.prototype._getPathPartStr.call(this, t);
            return e + (o.Browser.svg ? "z" : "x")
        }
    }),
    o.polygon = function(t, e) {
        return new o.Polygon(t,e)
    }
    ,
    function() {
        function t(t) {
            return o.FeatureGroup.extend({
                initialize: function(t, e) {
                    this._layers = {},
                    this._options = e,
                    this.setLatLngs(t)
                },
                setLatLngs: function(e) {
                    var i = 0
                      , n = e.length;
                    for (this.eachLayer(function(t) {
                        n > i ? t.setLatLngs(e[i++]) : this.removeLayer(t)
                    }, this); n > i; )
                        this.addLayer(new t(e[i++],this._options));
                    return this
                },
                getLatLngs: function() {
                    var t = [];
                    return this.eachLayer(function(e) {
                        t.push(e.getLatLngs())
                    }),
                    t
                }
            })
        }
        o.MultiPolyline = t(o.Polyline),
        o.MultiPolygon = t(o.Polygon),
        o.multiPolyline = function(t, e) {
            return new o.MultiPolyline(t,e)
        }
        ,
        o.multiPolygon = function(t, e) {
            return new o.MultiPolygon(t,e)
        }
    }(),
    o.Rectangle = o.Polygon.extend({
        initialize: function(t, e) {
            o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
        },
        setBounds: function(t) {
            this.setLatLngs(this._boundsToLatLngs(t))
        },
        _boundsToLatLngs: function(t) {
            return t = o.latLngBounds(t),
            [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    }),
    o.rectangle = function(t, e) {
        return new o.Rectangle(t,e)
    }
    ,
    o.Circle = o.Path.extend({
        initialize: function(t, e, i) {
            o.Path.prototype.initialize.call(this, i),
            this._latlng = o.latLng(t),
            this._mRadius = e
        },
        options: {
            fill: !0
        },
        setLatLng: function(t) {
            return this._latlng = o.latLng(t),
            this.redraw()
        },
        setRadius: function(t) {
            return this._mRadius = t,
            this.redraw()
        },
        projectLatlngs: function() {
            var t = this._getLngRadius()
              , e = this._latlng
              , i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
            this._point = this._map.latLngToLayerPoint(e),
            this._radius = Math.max(this._point.x - i.x, 1)
        },
        getBounds: function() {
            var t = this._getLngRadius()
              , e = this._mRadius / 40075017 * 360
              , i = this._latlng;
            return new o.LatLngBounds([i.lat - e, i.lng - t],[i.lat + e, i.lng + t])
        },
        getLatLng: function() {
            return this._latlng
        },
        getPathString: function() {
            var t = this._point
              , e = this._radius;
            return this._checkIfEmpty() ? "" : o.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(),
            e = Math.round(e),
            "AL " + t.x + "," + t.y + " " + e + "," + e + " 0,23592600")
        },
        getRadius: function() {
            return this._mRadius
        },
        _getLatRadius: function() {
            return this._mRadius / 40075017 * 360
        },
        _getLngRadius: function() {
            return this._getLatRadius() / Math.cos(o.LatLng.DEG_TO_RAD * this._latlng.lat)
        },
        _checkIfEmpty: function() {
            if (!this._map)
                return !1;
            var t = this._map._pathViewport
              , e = this._radius
              , i = this._point;
            return i.x - e > t.max.x || i.y - e > t.max.y || i.x + e < t.min.x || i.y + e < t.min.y
        }
    }),
    o.circle = function(t, e, i) {
        return new o.Circle(t,e,i)
    }
    ,
    o.CircleMarker = o.Circle.extend({
        options: {
            radius: 10,
            weight: 2
        },
        initialize: function(t, e) {
            o.Circle.prototype.initialize.call(this, t, null , e),
            this._radius = this.options.radius
        },
        projectLatlngs: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng)
        },
        _updateStyle: function() {
            o.Circle.prototype._updateStyle.call(this),
            this.setRadius(this.options.radius)
        },
        setLatLng: function(t) {
            return o.Circle.prototype.setLatLng.call(this, t),
            this._popup && this._popup._isOpen && this._popup.setLatLng(t),
            this
        },
        setRadius: function(t) {
            return this.options.radius = this._radius = t,
            this.redraw()
        },
        getRadius: function() {
            return this._radius
        }
    }),
    o.circleMarker = function(t, e) {
        return new o.CircleMarker(t,e)
    }
    ,
    o.Polyline.include(o.Path.CANVAS ? {
        _containsPoint: function(t, e) {
            var i, n, s, a, r, h, l, u = this.options.weight / 2;
            for (o.Browser.touch && (u += 10),
            i = 0,
            a = this._parts.length; a > i; i++)
                for (l = this._parts[i],
                n = 0,
                r = l.length,
                s = r - 1; r > n; s = n++)
                    if ((e || 0 !== n) && (h = o.LineUtil.pointToSegmentDistance(t, l[s], l[n]),
                    u >= h))
                        return !0;
            return !1
        }
    } : {}),
    o.Polygon.include(o.Path.CANVAS ? {
        _containsPoint: function(t) {
            var e, i, n, s, a, r, h, l, u = !1;
            if (o.Polyline.prototype._containsPoint.call(this, t, !0))
                return !0;
            for (s = 0,
            h = this._parts.length; h > s; s++)
                for (e = this._parts[s],
                a = 0,
                l = e.length,
                r = l - 1; l > a; r = a++)
                    i = e[a],
                    n = e[r],
                    i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (u = !u);
            return u
        }
    } : {}),
    o.Circle.include(o.Path.CANVAS ? {
        _drawPath: function() {
            var t = this._point;
            this._ctx.beginPath(),
            this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
        },
        _containsPoint: function(t) {
            var e = this._point
              , i = this.options.stroke ? this.options.weight / 2 : 0;
            return t.distanceTo(e) <= this._radius + i
        }
    } : {}),
    o.CircleMarker.include(o.Path.CANVAS ? {
        _updateStyle: function() {
            o.Path.prototype._updateStyle.call(this)
        }
    } : {}),
    o.GeoJSON = o.FeatureGroup.extend({
        initialize: function(t, e) {
            o.setOptions(this, e),
            this._layers = {},
            t && this.addData(t)
        },
        addData: function(t) {
            var e, i, n, s = o.Util.isArray(t) ? t : t.features;
            if (s) {
                for (e = 0,
                i = s.length; i > e; e++)
                    n = s[e],
                    (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(s[e]);
                return this
            }
            var a = this.options;
            if (!a.filter || a.filter(t)) {
                var r = o.GeoJSON.geometryToLayer(t, a.pointToLayer, a.coordsToLatLng, a);
                return r.feature = o.GeoJSON.asFeature(t),
                r.defaultOptions = r.options,
                this.resetStyle(r),
                a.onEachFeature && a.onEachFeature(t, r),
                this.addLayer(r)
            }
        },
        resetStyle: function(t) {
            var e = this.options.style;
            e && (o.Util.extend(t.options, t.defaultOptions),
            this._setLayerStyle(t, e))
        },
        setStyle: function(t) {
            this.eachLayer(function(e) {
                this._setLayerStyle(e, t)
            }, this)
        },
        _setLayerStyle: function(t, e) {
            "function" == typeof e && (e = e(t.feature)),
            t.setStyle && t.setStyle(e)
        }
    }),
    o.extend(o.GeoJSON, {
        geometryToLayer: function(t, e, i, n) {
            var s, a, r, h, l = "Feature" === t.type ? t.geometry : t, u = l.coordinates, c = [];
            switch (i = i || this.coordsToLatLng,
            l.type) {
            case "Point":
                return s = i(u),
                e ? e(t, s) : new o.Marker(s);
            case "MultiPoint":
                for (r = 0,
                h = u.length; h > r; r++)
                    s = i(u[r]),
                    c.push(e ? e(t, s) : new o.Marker(s));
                return new o.FeatureGroup(c);
            case "LineString":
                return a = this.coordsToLatLngs(u, 0, i),
                new o.Polyline(a,n);
            case "Polygon":
                if (2 === u.length && !u[1].length)
                    throw new Error("Invalid GeoJSON object.");
                return a = this.coordsToLatLngs(u, 1, i),
                new o.Polygon(a,n);
            case "MultiLineString":
                return a = this.coordsToLatLngs(u, 1, i),
                new o.MultiPolyline(a,n);
            case "MultiPolygon":
                return a = this.coordsToLatLngs(u, 2, i),
                new o.MultiPolygon(a,n);
            case "GeometryCollection":
                for (r = 0,
                h = l.geometries.length; h > r; r++)
                    c.push(this.geometryToLayer({
                        geometry: l.geometries[r],
                        type: "Feature",
                        properties: t.properties
                    }, e, i, n));
                return new o.FeatureGroup(c);
            default:
                throw new Error("Invalid GeoJSON object.")
            }
        },
        coordsToLatLng: function(t) {
            return new o.LatLng(t[1],t[0],t[2])
        },
        coordsToLatLngs: function(t, e, i) {
            var n, o, s, a = [];
            for (o = 0,
            s = t.length; s > o; o++)
                n = e ? this.coordsToLatLngs(t[o], e - 1, i) : (i || this.coordsToLatLng)(t[o]),
                a.push(n);
            return a
        },
        latLngToCoords: function(t) {
            var e = [t.lng, t.lat];
            return t.alt !== i && e.push(t.alt),
            e
        },
        latLngsToCoords: function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++)
                e.push(o.GeoJSON.latLngToCoords(t[i]));
            return e
        },
        getFeature: function(t, e) {
            return t.feature ? o.extend({}, t.feature, {
                geometry: e
            }) : o.GeoJSON.asFeature(e)
        },
        asFeature: function(t) {
            return "Feature" === t.type ? t : {
                type: "Feature",
                properties: {},
                geometry: t
            }
        }
    });
    var a = {
        toGeoJSON: function() {
            return o.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    o.Marker.include(a),
    o.Circle.include(a),
    o.CircleMarker.include(a),
    o.Polyline.include({
        toGeoJSON: function() {
            return o.GeoJSON.getFeature(this, {
                type: "LineString",
                coordinates: o.GeoJSON.latLngsToCoords(this.getLatLngs())
            })
        }
    }),
    o.Polygon.include({
        toGeoJSON: function() {
            var t, e, i, n = [o.GeoJSON.latLngsToCoords(this.getLatLngs())];
            if (n[0].push(n[0][0]),
            this._holes)
                for (t = 0,
                e = this._holes.length; e > t; t++)
                    i = o.GeoJSON.latLngsToCoords(this._holes[t]),
                    i.push(i[0]),
                    n.push(i);
            return o.GeoJSON.getFeature(this, {
                type: "Polygon",
                coordinates: n
            })
        }
    }),
    function() {
        function t(t) {
            return function() {
                var e = [];
                return this.eachLayer(function(t) {
                    e.push(t.toGeoJSON().geometry.coordinates)
                }),
                o.GeoJSON.getFeature(this, {
                    type: t,
                    coordinates: e
                })
            }
        }
        o.MultiPolyline.include({
            toGeoJSON: t("MultiLineString")
        }),
        o.MultiPolygon.include({
            toGeoJSON: t("MultiPolygon")
        }),
        o.LayerGroup.include({
            toGeoJSON: function() {
                var e, i = this.feature && this.feature.geometry, n = [];
                if (i && "MultiPoint" === i.type)
                    return t("MultiPoint").call(this);
                var s = i && "GeometryCollection" === i.type;
                return this.eachLayer(function(t) {
                    t.toGeoJSON && (e = t.toGeoJSON(),
                    n.push(s ? e.geometry : o.GeoJSON.asFeature(e)))
                }),
                s ? o.GeoJSON.getFeature(this, {
                    geometries: n,
                    type: "GeometryCollection"
                }) : {
                    type: "FeatureCollection",
                    features: n
                }
            }
        })
    }(),
    o.geoJson = function(t, e) {
        return new o.GeoJSON(t,e)
    }
    ,
    o.DomEvent = {
        addListener: function(t, e, i, n) {
            var s, a, r, h = o.stamp(i), l = "_leaflet_" + e + h;
            return t[l] ? this : (s = function(e) {
                return i.call(n || t, e || o.DomEvent._getEvent())
            }
            ,
            o.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, s, h) : (o.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, s, h),
            "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", s, !1),
            t.addEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? (a = s,
            r = "mouseenter" === e ? "mouseover" : "mouseout",
            s = function(e) {
                return o.DomEvent._checkMouse(t, e) ? a(e) : void 0
            }
            ,
            t.addEventListener(r, s, !1)) : "click" === e && o.Browser.android ? (a = s,
            s = function(t) {
                return o.DomEvent._filterClick(t, a)
            }
            ,
            t.addEventListener(e, s, !1)) : t.addEventListener(e, s, !1) : "attachEvent" in t && t.attachEvent("on" + e, s),
            t[l] = s,
            this))
        },
        removeListener: function(t, e, i) {
            var n = o.stamp(i)
              , s = "_leaflet_" + e + n
              , a = t[s];
            return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, n) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, n) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", a, !1),
            t.removeEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1) : t.removeEventListener(e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a),
            t[s] = null ,
            this) : this
        },
        stopPropagation: function(t) {
            return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
            o.DomEvent._skipped(t),
            this
        },
        disableScrollPropagation: function(t) {
            var e = o.DomEvent.stopPropagation;
            return o.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
        },
        disableClickPropagation: function(t) {
            for (var e = o.DomEvent.stopPropagation, i = o.Draggable.START.length - 1; i >= 0; i--)
                o.DomEvent.on(t, o.Draggable.START[i], e);
            return o.DomEvent.on(t, "click", o.DomEvent._fakeStop).on(t, "dblclick", e)
        },
        preventDefault: function(t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
            this
        },
        stop: function(t) {
            return o.DomEvent.preventDefault(t).stopPropagation(t)
        },
        getMousePosition: function(t, e) {
            if (!e)
                return new o.Point(t.clientX,t.clientY);
            var i = e.getBoundingClientRect();
            return new o.Point(t.clientX - i.left - e.clientLeft,t.clientY - i.top - e.clientTop)
        },
        getWheelDelta: function(t) {
            var e = 0;
            return t.wheelDelta && (e = t.wheelDelta / 120),
            t.detail && (e = -t.detail / 3),
            e
        },
        _skipEvents: {},
        _fakeStop: function(t) {
            o.DomEvent._skipEvents[t.type] = !0
        },
        _skipped: function(t) {
            var e = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1,
            e
        },
        _checkMouse: function(t, e) {
            var i = e.relatedTarget;
            if (!i)
                return !0;
            try {
                for (; i && i !== t; )
                    i = i.parentNode
            } catch (n) {
                return !1
            }
            return i !== t
        },
        _getEvent: function() {
            var e = t.event;
            if (!e)
                for (var i = arguments.callee.caller; i && (e = i.arguments[0],
                !e || t.Event !== e.constructor); )
                    i = i.caller;
            return e
        },
        _filterClick: function(t, e) {
            var i = t.timeStamp || t.originalEvent.timeStamp
              , n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
            return n && n > 100 && 500 > n || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i,
            e(t))
        }
    },
    o.DomEvent.on = o.DomEvent.addListener,
    o.DomEvent.off = o.DomEvent.removeListener,
    o.Draggable = o.Class.extend({
        includes: o.Mixin.Events,
        statics: {
            START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(t, e) {
            this._element = t,
            this._dragStartTarget = e || t
        },
        enable: function() {
            if (!this._enabled) {
                for (var t = o.Draggable.START.length - 1; t >= 0; t--)
                    o.DomEvent.on(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
                this._enabled = !0
            }
        },
        disable: function() {
            if (this._enabled) {
                for (var t = o.Draggable.START.length - 1; t >= 0; t--)
                    o.DomEvent.off(this._dragStartTarget, o.Draggable.START[t], this._onDown, this);
                this._enabled = !1,
                this._moved = !1
            }
        },
        _onDown: function(t) {
            if (this._moved = !1,
            !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (o.DomEvent.stopPropagation(t),
            !o.Draggable._disabled && (o.DomUtil.disableImageDrag(),
            o.DomUtil.disableTextSelection(),
            !this._moving))) {
                var i = t.touches ? t.touches[0] : t;
                this._startPoint = new o.Point(i.clientX,i.clientY),
                this._startPos = this._newPos = o.DomUtil.getPosition(this._element),
                o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
            }
        },
        _onMove: function(t) {
            if (t.touches && t.touches.length > 1)
                return void (this._moved = !0);
            var i = t.touches && 1 === t.touches.length ? t.touches[0] : t
              , n = new o.Point(i.clientX,i.clientY)
              , s = n.subtract(this._startPoint);
            (s.x || s.y) && (o.Browser.touch && Math.abs(s.x) + Math.abs(s.y) < 3 || (o.DomEvent.preventDefault(t),
            this._moved || (this.fire("dragstart"),
            this._moved = !0,
            this._startPos = o.DomUtil.getPosition(this._element).subtract(s),
            o.DomUtil.addClass(e.body, "leaflet-dragging"),
            this._lastTarget = t.target || t.srcElement,
            o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")),
            this._newPos = this._startPos.add(s),
            this._moving = !0,
            o.Util.cancelAnimFrame(this._animRequest),
            this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
        },
        _updatePosition: function() {
            this.fire("predrag"),
            o.DomUtil.setPosition(this._element, this._newPos),
            this.fire("drag")
        },
        _onUp: function() {
            o.DomUtil.removeClass(e.body, "leaflet-dragging"),
            this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"),
            this._lastTarget = null );
            for (var t in o.Draggable.MOVE)
                o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove).off(e, o.Draggable.END[t], this._onUp);
            o.DomUtil.enableImageDrag(),
            o.DomUtil.enableTextSelection(),
            this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest),
            this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            })),
            this._moving = !1
        }
    }),
    o.Handler = o.Class.extend({
        initialize: function(t) {
            this._map = t
        },
        enable: function() {
            this._enabled || (this._enabled = !0,
            this.addHooks())
        },
        disable: function() {
            this._enabled && (this._enabled = !1,
            this.removeHooks())
        },
        enabled: function() {
            return !!this._enabled
        }
    }),
    o.Map.mergeOptions({
        dragging: !0,
        inertia: !o.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        inertiaThreshold: o.Browser.touch ? 32 : 18,
        easeLinearity: .25,
        worldCopyJump: !1
    }),
    o.Map.Drag = o.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new o.Draggable(t._mapPane,t._container),
                this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this),
                t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this),
                t.on("viewreset", this._onViewReset, this),
                t.whenReady(this._onViewReset, this))
            }
            this._draggable.enable()
        },
        removeHooks: function() {
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            var t = this._map;
            t._panAnim && t._panAnim.stop(),
            t.fire("movestart").fire("dragstart"),
            t.options.inertia && (this._positions = [],
            this._times = [])
        },
        _onDrag: function() {
            if (this._map.options.inertia) {
                var t = this._lastTime = +new Date
                  , e = this._lastPos = this._draggable._newPos;
                this._positions.push(e),
                this._times.push(t),
                t - this._times[0] > 200 && (this._positions.shift(),
                this._times.shift())
            }
            this._map.fire("move").fire("drag")
        },
        _onViewReset: function() {
            var t = this._map.getSize()._divideBy(2)
              , e = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = e.subtract(t).x,
            this._worldWidth = this._map.project([0, 180]).x
        },
        _onPreDrag: function() {
            var t = this._worldWidth
              , e = Math.round(t / 2)
              , i = this._initialWorldOffset
              , n = this._draggable._newPos.x
              , o = (n - e + i) % t + e - i
              , s = (n + e + i) % t - e - i
              , a = Math.abs(o + i) < Math.abs(s + i) ? o : s;
            this._draggable._newPos.x = a
        },
        _onDragEnd: function(t) {
            var e = this._map
              , i = e.options
              , n = +new Date - this._lastTime
              , s = !i.inertia || n > i.inertiaThreshold || !this._positions[0];
            if (e.fire("dragend", t),
            s)
                e.fire("moveend");
            else {
                var a = this._lastPos.subtract(this._positions[0])
                  , r = (this._lastTime + n - this._times[0]) / 1e3
                  , h = i.easeLinearity
                  , l = a.multiplyBy(h / r)
                  , u = l.distanceTo([0, 0])
                  , c = Math.min(i.inertiaMaxSpeed, u)
                  , d = l.multiplyBy(c / u)
                  , p = c / (i.inertiaDeceleration * h)
                  , _ = d.multiplyBy(-p / 2).round();
                _.x && _.y ? (_ = e._limitOffset(_, e.options.maxBounds),
                o.Util.requestAnimFrame(function() {
                    e.panBy(_, {
                        duration: p,
                        easeLinearity: h,
                        noMoveStart: !0
                    })
                })) : e.fire("moveend")
            }
        }
    }),
    o.Map.addInitHook("addHandler", "dragging", o.Map.Drag),
    o.Map.mergeOptions({
        doubleClickZoom: !0
    }),
    o.Map.DoubleClickZoom = o.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(t) {
            var e = this._map
              , i = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
            "center" === e.options.doubleClickZoom ? e.setZoom(i) : e.setZoomAround(t.containerPoint, i)
        }
    }),
    o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom),
    o.Map.mergeOptions({
        scrollWheelZoom: !0
    }),
    o.Map.ScrollWheelZoom = o.Handler.extend({
        addHooks: function() {
            o.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this),
            o.DomEvent.on(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault),
            this._delta = 0
        },
        removeHooks: function() {
            o.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll),
            o.DomEvent.off(this._map._container, "MozMousePixelScroll", o.DomEvent.preventDefault)
        },
        _onWheelScroll: function(t) {
            var e = o.DomEvent.getWheelDelta(t);
            this._delta += e,
            this._lastMousePos = this._map.mouseEventToContainerPoint(t),
            this._startTime || (this._startTime = +new Date);
            var i = Math.max(40 - (+new Date - this._startTime), 0);
            clearTimeout(this._timer),
            this._timer = setTimeout(o.bind(this._performZoom, this), i),
            o.DomEvent.preventDefault(t),
            o.DomEvent.stopPropagation(t)
        },
        _performZoom: function() {
            var t = this._map
              , e = this._delta
              , i = t.getZoom();
            e = e > 0 ? Math.ceil(e) : Math.floor(e),
            e = Math.max(Math.min(e, 4), -4),
            e = t._limitZoom(i + e) - i,
            this._delta = 0,
            this._startTime = null ,
            e && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + e) : t.setZoomAround(this._lastMousePos, i + e))
        }
    }),
    o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom),
    o.extend(o.DomEvent, {
        _touchstart: o.Browser.msPointer ? "MSPointerDown" : o.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: o.Browser.msPointer ? "MSPointerUp" : o.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function(t, i, n) {
            function s(t) {
                var e;
                if (o.Browser.pointer ? (_.push(t.pointerId),
                e = _.length) : e = t.touches.length,
                !(e > 1)) {
                    var i = Date.now()
                      , n = i - (r || i);
                    h = t.touches ? t.touches[0] : t,
                    l = n > 0 && u >= n,
                    r = i
                }
            }
            function a(t) {
                if (o.Browser.pointer) {
                    var e = _.indexOf(t.pointerId);
                    if (-1 === e)
                        return;
                    _.splice(e, 1)
                }
                if (l) {
                    if (o.Browser.pointer) {
                        var n, s = {};
                        for (var a in h)
                            n = h[a],
                            "function" == typeof n ? s[a] = n.bind(h) : s[a] = n;
                        h = s
                    }
                    h.type = "dblclick",
                    i(h),
                    r = null 
                }
            }
            var r, h, l = !1, u = 250, c = "_leaflet_", d = this._touchstart, p = this._touchend, _ = [];
            t[c + d + n] = s,
            t[c + p + n] = a;
            var m = o.Browser.pointer ? e.documentElement : t;
            return t.addEventListener(d, s, !1),
            m.addEventListener(p, a, !1),
            o.Browser.pointer && m.addEventListener(o.DomEvent.POINTER_CANCEL, a, !1),
            this
        },
        removeDoubleTapListener: function(t, i) {
            var n = "_leaflet_";
            return t.removeEventListener(this._touchstart, t[n + this._touchstart + i], !1),
            (o.Browser.pointer ? e.documentElement : t).removeEventListener(this._touchend, t[n + this._touchend + i], !1),
            o.Browser.pointer && e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL, t[n + this._touchend + i], !1),
            this
        }
    }),
    o.extend(o.DomEvent, {
        POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: o.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        _pointers: [],
        _pointerDocumentListener: !1,
        addPointerListener: function(t, e, i, n) {
            switch (e) {
            case "touchstart":
                return this.addPointerListenerStart(t, e, i, n);
            case "touchend":
                return this.addPointerListenerEnd(t, e, i, n);
            case "touchmove":
                return this.addPointerListenerMove(t, e, i, n);
            default:
                throw "Unknown touch event type"
            }
        },
        addPointerListenerStart: function(t, i, n, s) {
            var a = "_leaflet_"
              , r = this._pointers
              , h = function(t) {
                "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE && o.DomEvent.preventDefault(t);
                for (var e = !1, i = 0; i < r.length; i++)
                    if (r[i].pointerId === t.pointerId) {
                        e = !0;
                        break
                    }
                e || r.push(t),
                t.touches = r.slice(),
                t.changedTouches = [t],
                n(t)
            }
            ;
            if (t[a + "touchstart" + s] = h,
            t.addEventListener(this.POINTER_DOWN, h, !1),
            !this._pointerDocumentListener) {
                var l = function(t) {
                    for (var e = 0; e < r.length; e++)
                        if (r[e].pointerId === t.pointerId) {
                            r.splice(e, 1);
                            break
                        }
                }
                ;
                e.documentElement.addEventListener(this.POINTER_UP, l, !1),
                e.documentElement.addEventListener(this.POINTER_CANCEL, l, !1),
                this._pointerDocumentListener = !0
            }
            return this
        },
        addPointerListenerMove: function(t, e, i, n) {
            function o(t) {
                if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].pointerId === t.pointerId) {
                            a[e] = t;
                            break
                        }
                    t.touches = a.slice(),
                    t.changedTouches = [t],
                    i(t)
                }
            }
            var s = "_leaflet_"
              , a = this._pointers;
            return t[s + "touchmove" + n] = o,
            t.addEventListener(this.POINTER_MOVE, o, !1),
            this
        },
        addPointerListenerEnd: function(t, e, i, n) {
            var o = "_leaflet_"
              , s = this._pointers
              , a = function(t) {
                for (var e = 0; e < s.length; e++)
                    if (s[e].pointerId === t.pointerId) {
                        s.splice(e, 1);
                        break
                    }
                t.touches = s.slice(),
                t.changedTouches = [t],
                i(t)
            }
            ;
            return t[o + "touchend" + n] = a,
            t.addEventListener(this.POINTER_UP, a, !1),
            t.addEventListener(this.POINTER_CANCEL, a, !1),
            this
        },
        removePointerListener: function(t, e, i) {
            var n = "_leaflet_"
              , o = t[n + e + i];
            switch (e) {
            case "touchstart":
                t.removeEventListener(this.POINTER_DOWN, o, !1);
                break;
            case "touchmove":
                t.removeEventListener(this.POINTER_MOVE, o, !1);
                break;
            case "touchend":
                t.removeEventListener(this.POINTER_UP, o, !1),
                t.removeEventListener(this.POINTER_CANCEL, o, !1)
            }
            return this
        }
    }),
    o.Map.mergeOptions({
        touchZoom: o.Browser.touch && !o.Browser.android23,
        bounceAtZoomLimits: !0
    }),
    o.Map.TouchZoom = o.Handler.extend({
        addHooks: function() {
            o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(t) {
            var i = this._map;
            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                var n = i.mouseEventToLayerPoint(t.touches[0])
                  , s = i.mouseEventToLayerPoint(t.touches[1])
                  , a = i._getCenterLayerPoint();
                this._startCenter = n.add(s)._divideBy(2),
                this._startDist = n.distanceTo(s),
                this._moved = !1,
                this._zooming = !0,
                this._centerOffset = a.subtract(this._startCenter),
                i._panAnim && i._panAnim.stop(),
                o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this),
                o.DomEvent.preventDefault(t)
            }
        },
        _onTouchMove: function(t) {
            var e = this._map;
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = e.mouseEventToLayerPoint(t.touches[0])
                  , n = e.mouseEventToLayerPoint(t.touches[1]);
                this._scale = i.distanceTo(n) / this._startDist,
                this._delta = i._add(n)._divideBy(2)._subtract(this._startCenter),
                1 !== this._scale && (e.options.bounceAtZoomLimits || !(e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1)) && (this._moved || (o.DomUtil.addClass(e._mapPane, "leaflet-touching"),
                e.fire("movestart").fire("zoomstart"),
                this._moved = !0),
                o.Util.cancelAnimFrame(this._animRequest),
                this._animRequest = o.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container),
                o.DomEvent.preventDefault(t))
            }
        },
        _updateOnMove: function() {
            var t = this._map
              , e = this._getScaleOrigin()
              , i = t.layerPointToLatLng(e)
              , n = t.getScaleZoom(this._scale);
            t._animateZoom(i, n, this._startCenter, this._scale, this._delta, !1, !0)
        },
        _onTouchEnd: function() {
            if (!this._moved || !this._zooming)
                return void (this._zooming = !1);
            var t = this._map;
            this._zooming = !1,
            o.DomUtil.removeClass(t._mapPane, "leaflet-touching"),
            o.Util.cancelAnimFrame(this._animRequest),
            o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
            var i = this._getScaleOrigin()
              , n = t.layerPointToLatLng(i)
              , s = t.getZoom()
              , a = t.getScaleZoom(this._scale) - s
              , r = a > 0 ? Math.ceil(a) : Math.floor(a)
              , h = t._limitZoom(s + r)
              , l = t.getZoomScale(h) / this._scale;
            t._animateZoom(n, h, i, l)
        },
        _getScaleOrigin: function() {
            var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
            return this._startCenter.add(t)
        }
    }),
    o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom),
    o.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    }),
    o.Map.Tap = o.Handler.extend({
        addHooks: function() {
            o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(t) {
            if (t.touches) {
                if (o.DomEvent.preventDefault(t),
                this._fireClick = !0,
                t.touches.length > 1)
                    return this._fireClick = !1,
                    void clearTimeout(this._holdTimeout);
                var i = t.touches[0]
                  , n = i.target;
                this._startPos = this._newPos = new o.Point(i.clientX,i.clientY),
                n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"),
                this._holdTimeout = setTimeout(o.bind(function() {
                    this._isTapValid() && (this._fireClick = !1,
                    this._onUp(),
                    this._simulateEvent("contextmenu", i))
                }, this), 1e3),
                o.DomEvent.on(e, "touchmove", this._onMove, this).on(e, "touchend", this._onUp, this)
            }
        },
        _onUp: function(t) {
            if (clearTimeout(this._holdTimeout),
            o.DomEvent.off(e, "touchmove", this._onMove, this).off(e, "touchend", this._onUp, this),
            this._fireClick && t && t.changedTouches) {
                var i = t.changedTouches[0]
                  , n = i.target;
                n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"),
                this._isTapValid() && this._simulateEvent("click", i)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(t) {
            var e = t.touches[0];
            this._newPos = new o.Point(e.clientX,e.clientY)
        },
        _simulateEvent: function(i, n) {
            var o = e.createEvent("MouseEvents");
            o._simulated = !0,
            n.target._simulatedClick = !0,
            o.initMouseEvent(i, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null ),
            n.target.dispatchEvent(o)
        }
    }),
    o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap),
    o.Map.mergeOptions({
        boxZoom: !0
    }),
    o.Map.BoxZoom = o.Handler.extend({
        initialize: function(t) {
            this._map = t,
            this._container = t._container,
            this._pane = t._panes.overlayPane,
            this._moved = !1
        },
        addHooks: function() {
            o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            o.DomEvent.off(this._container, "mousedown", this._onMouseDown),
            this._moved = !1
        },
        moved: function() {
            return this._moved
        },
        _onMouseDown: function(t) {
            return this._moved = !1,
            !t.shiftKey || 1 !== t.which && 1 !== t.button ? !1 : (o.DomUtil.disableTextSelection(),
            o.DomUtil.disableImageDrag(),
            this._startLayerPoint = this._map.mouseEventToLayerPoint(t),
            void o.DomEvent.on(e, "mousemove", this._onMouseMove, this).on(e, "mouseup", this._onMouseUp, this).on(e, "keydown", this._onKeyDown, this))
        },
        _onMouseMove: function(t) {
            this._moved || (this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._pane),
            o.DomUtil.setPosition(this._box, this._startLayerPoint),
            this._container.style.cursor = "crosshair",
            this._map.fire("boxzoomstart"));
            var e = this._startLayerPoint
              , i = this._box
              , n = this._map.mouseEventToLayerPoint(t)
              , s = n.subtract(e)
              , a = new o.Point(Math.min(n.x, e.x),Math.min(n.y, e.y));
            o.DomUtil.setPosition(i, a),
            this._moved = !0,
            i.style.width = Math.max(0, Math.abs(s.x) - 4) + "px",
            i.style.height = Math.max(0, Math.abs(s.y) - 4) + "px"
        },
        _finish: function() {
            this._moved && (this._pane.removeChild(this._box),
            this._container.style.cursor = ""),
            o.DomUtil.enableTextSelection(),
            o.DomUtil.enableImageDrag(),
            o.DomEvent.off(e, "mousemove", this._onMouseMove).off(e, "mouseup", this._onMouseUp).off(e, "keydown", this._onKeyDown)
        },
        _onMouseUp: function(t) {
            this._finish();
            var e = this._map
              , i = e.mouseEventToLayerPoint(t);
            if (!this._startLayerPoint.equals(i)) {
                var n = new o.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint),e.layerPointToLatLng(i));
                e.fitBounds(n),
                e.fire("boxzoomend", {
                    boxZoomBounds: n
                })
            }
        },
        _onKeyDown: function(t) {
            27 === t.keyCode && this._finish()
        }
    }),
    o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom),
    o.Map.mergeOptions({
        keyboard: !0,
        keyboardPanOffset: 80,
        keyboardZoomOffset: 1
    }),
    o.Map.Keyboard = o.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 173]
        },
        initialize: function(t) {
            this._map = t,
            this._setPanOffset(t.options.keyboardPanOffset),
            this._setZoomOffset(t.options.keyboardZoomOffset)
        },
        addHooks: function() {
            var t = this._map._container;
            -1 === t.tabIndex && (t.tabIndex = "0"),
            o.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this),
            this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
        },
        removeHooks: function() {
            this._removeHooks();
            var t = this._map._container;
            o.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this),
            this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var i = e.body
                  , n = e.documentElement
                  , o = i.scrollTop || n.scrollTop
                  , s = i.scrollLeft || n.scrollLeft;
                this._map._container.focus(),
                t.scrollTo(s, o)
            }
        },
        _onFocus: function() {
            this._focused = !0,
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1,
            this._map.fire("blur")
        },
        _setPanOffset: function(t) {
            var e, i, n = this._panKeys = {}, o = this.keyCodes;
            for (e = 0,
            i = o.left.length; i > e; e++)
                n[o.left[e]] = [-1 * t, 0];
            for (e = 0,
            i = o.right.length; i > e; e++)
                n[o.right[e]] = [t, 0];
            for (e = 0,
            i = o.down.length; i > e; e++)
                n[o.down[e]] = [0, t];
            for (e = 0,
            i = o.up.length; i > e; e++)
                n[o.up[e]] = [0, -1 * t]
        },
        _setZoomOffset: function(t) {
            var e, i, n = this._zoomKeys = {}, o = this.keyCodes;
            for (e = 0,
            i = o.zoomIn.length; i > e; e++)
                n[o.zoomIn[e]] = t;
            for (e = 0,
            i = o.zoomOut.length; i > e; e++)
                n[o.zoomOut[e]] = -t
        },
        _addHooks: function() {
            o.DomEvent.on(e, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            o.DomEvent.off(e, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(t) {
            var e = t.keyCode
              , i = this._map;
            if (e in this._panKeys) {
                if (i._panAnim && i._panAnim._inProgress)
                    return;
                i.panBy(this._panKeys[e]),
                i.options.maxBounds && i.panInsideBounds(i.options.maxBounds)
            } else {
                if (!(e in this._zoomKeys))
                    return;
                i.setZoom(i.getZoom() + this._zoomKeys[e])
            }
            o.DomEvent.stop(t)
        }
    }),
    o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard),
    o.Handler.MarkerDrag = o.Handler.extend({
        initialize: function(t) {
            this._marker = t
        },
        addHooks: function() {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new o.Draggable(t,t)),
            this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this),
            this._draggable.enable(),
            o.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this),
            this._draggable.disable(),
            o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onDrag: function() {
            var t = this._marker
              , e = t._shadow
              , i = o.DomUtil.getPosition(t._icon)
              , n = t._map.layerPointToLatLng(i);
            e && o.DomUtil.setPosition(e, i),
            t._latlng = n,
            t.fire("move", {
                latlng: n
            }).fire("drag")
        },
        _onDragEnd: function(t) {
            this._marker.fire("moveend").fire("dragend", t)
        }
    }),
    o.Control = o.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(t) {
            o.setOptions(this, t)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(t) {
            var e = this._map;
            return e && e.removeControl(this),
            this.options.position = t,
            e && e.addControl(this),
            this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(t) {
            this._map = t;
            var e = this._container = this.onAdd(t)
              , i = this.getPosition()
              , n = t._controlCorners[i];
            return o.DomUtil.addClass(e, "leaflet-control"),
            -1 !== i.indexOf("bottom") ? n.insertBefore(e, n.firstChild) : n.appendChild(e),
            this
        },
        removeFrom: function(t) {
            var e = this.getPosition()
              , i = t._controlCorners[e];
            return i.removeChild(this._container),
            this._map = null ,
            this.onRemove && this.onRemove(t),
            this
        },
        _refocusOnMap: function() {
            this._map && this._map.getContainer().focus()
        }
    }),
    o.control = function(t) {
        return new o.Control(t)
    }
    ,
    o.Map.include({
        addControl: function(t) {
            return t.addTo(this),
            this
        },
        removeControl: function(t) {
            return t.removeFrom(this),
            this
        },
        _initControlPos: function() {
            function t(t, s) {
                var a = i + t + " " + i + s;
                e[t + s] = o.DomUtil.create("div", a, n)
            }
            var e = this._controlCorners = {}
              , i = "leaflet-"
              , n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
            t("top", "left"),
            t("top", "right"),
            t("bottom", "left"),
            t("bottom", "right")
        },
        _clearControlPos: function() {
            this._container.removeChild(this._controlContainer)
        }
    }),
    o.Control.Zoom = o.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(t) {
            var e = "leaflet-control-zoom"
              , i = o.DomUtil.create("div", e + " leaflet-bar");
            return this._map = t,
            this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", i, this._zoomIn, this),
            this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", i, this._zoomOut, this),
            this._updateDisabled(),
            t.on("zoomend zoomlevelschange", this._updateDisabled, this),
            i
        },
        onRemove: function(t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        _zoomIn: function(t) {
            this._map.zoomIn(t.shiftKey ? 3 : 1)
        },
        _zoomOut: function(t) {
            this._map.zoomOut(t.shiftKey ? 3 : 1)
        },
        _createButton: function(t, e, i, n, s, a) {
            var r = o.DomUtil.create("a", i, n);
            r.innerHTML = t,
            r.href = "#",
            r.title = e;
            var h = o.DomEvent.stopPropagation;
            return o.DomEvent.on(r, "click", h).on(r, "mousedown", h).on(r, "dblclick", h).on(r, "click", o.DomEvent.preventDefault).on(r, "click", s, a).on(r, "click", this._refocusOnMap, a),
            r
        },
        _updateDisabled: function() {
            var t = this._map
              , e = "leaflet-disabled";
            o.DomUtil.removeClass(this._zoomInButton, e),
            o.DomUtil.removeClass(this._zoomOutButton, e),
            t._zoom === t.getMinZoom() && o.DomUtil.addClass(this._zoomOutButton, e),
            t._zoom === t.getMaxZoom() && o.DomUtil.addClass(this._zoomInButton, e)
        }
    }),
    o.Map.mergeOptions({
        zoomControl: !0
    }),
    o.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new o.Control.Zoom,
        this.addControl(this.zoomControl))
    }),
    o.control.zoom = function(t) {
        return new o.Control.Zoom(t)
    }
    ,
    o.Control.Attribution = o.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(t) {
            o.setOptions(this, t),
            this._attributions = {}
        },
        onAdd: function(t) {
            this._container = o.DomUtil.create("div", "leaflet-control-attribution"),
            o.DomEvent.disableClickPropagation(this._container);
            for (var e in t._layers)
                t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
            return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this),
            this._update(),
            this._container
        },
        onRemove: function(t) {
            t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
        },
        setPrefix: function(t) {
            return this.options.prefix = t,
            this._update(),
            this
        },
        addAttribution: function(t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0),
            this._attributions[t]++,
            this._update(),
            this) : void 0
        },
        removeAttribution: function(t) {
            return t ? (this._attributions[t] && (this._attributions[t]--,
            this._update()),
            this) : void 0
        },
        _update: function() {
            if (this._map) {
                var t = [];
                for (var e in this._attributions)
                    this._attributions[e] && t.push(e);
                var i = [];
                this.options.prefix && i.push(this.options.prefix),
                t.length && i.push(t.join(", ")),
                this._container.innerHTML = i.join(" | ")
            }
        },
        _onLayerAdd: function(t) {
            t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
        },
        _onLayerRemove: function(t) {
            t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
        }
    }),
    o.Map.mergeOptions({
        attributionControl: !0
    }),
    o.Map.addInitHook(function() {
        this.options.attributionControl && (this.attributionControl = (new o.Control.Attribution).addTo(this))
    }),
    o.control.attribution = function(t) {
        return new o.Control.Attribution(t)
    }
    ,
    o.Control.Scale = o.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0,
            updateWhenIdle: !1
        },
        onAdd: function(t) {
            this._map = t;
            var e = "leaflet-control-scale"
              , i = o.DomUtil.create("div", e)
              , n = this.options;
            return this._addScales(n, e, i),
            t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this),
            t.whenReady(this._update, this),
            i
        },
        onRemove: function(t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(t, e, i) {
            t.metric && (this._mScale = o.DomUtil.create("div", e + "-line", i)),
            t.imperial && (this._iScale = o.DomUtil.create("div", e + "-line", i))
        },
        _update: function() {
            var t = this._map.getBounds()
              , e = t.getCenter().lat
              , i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180)
              , n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180
              , o = this._map.getSize()
              , s = this.options
              , a = 0;
            o.x > 0 && (a = n * (s.maxWidth / o.x)),
            this._updateScales(s, a)
        },
        _updateScales: function(t, e) {
            t.metric && e && this._updateMetric(e),
            t.imperial && e && this._updateImperial(e)
        },
        _updateMetric: function(t) {
            var e = this._getRoundNum(t);
            this._mScale.style.width = this._getScaleWidth(e / t) + "px",
            this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
        },
        _updateImperial: function(t) {
            var e, i, n, o = 3.2808399 * t, s = this._iScale;
            o > 5280 ? (e = o / 5280,
            i = this._getRoundNum(e),
            s.style.width = this._getScaleWidth(i / e) + "px",
            s.innerHTML = i + " mi") : (n = this._getRoundNum(o),
            s.style.width = this._getScaleWidth(n / o) + "px",
            s.innerHTML = n + " ft")
        },
        _getScaleWidth: function(t) {
            return Math.round(this.options.maxWidth * t) - 10
        },
        _getRoundNum: function(t) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1)
              , i = t / e;
            return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1,
            e * i
        }
    }),
    o.control.scale = function(t) {
        return new o.Control.Scale(t)
    }
    ,
    o.Control.Layers = o.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0
        },
        initialize: function(t, e, i) {
            o.setOptions(this, i),
            this._layers = {},
            this._lastZIndex = 0,
            this._handlingClick = !1;
            for (var n in t)
                this._addLayer(t[n], n);
            for (n in e)
                this._addLayer(e[n], n, !0)
        },
        onAdd: function(t) {
            return this._initLayout(),
            this._update(),
            t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this),
            this._container
        },
        onRemove: function(t) {
            t.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
        },
        addBaseLayer: function(t, e) {
            return this._addLayer(t, e),
            this._update(),
            this
        },
        addOverlay: function(t, e) {
            return this._addLayer(t, e, !0),
            this._update(),
            this
        },
        removeLayer: function(t) {
            var e = o.stamp(t);
            return delete this._layers[e],
            this._update(),
            this
        },
        _initLayout: function() {
            var t = "leaflet-control-layers"
              , e = this._container = o.DomUtil.create("div", t);
            e.setAttribute("aria-haspopup", !0),
            o.Browser.touch ? o.DomEvent.on(e, "click", o.DomEvent.stopPropagation) : o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
            var i = this._form = o.DomUtil.create("form", t + "-list");
            if (this.options.collapsed) {
                o.Browser.android || o.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
                var n = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
                n.href = "#",
                n.title = "Layers",
                o.Browser.touch ? o.DomEvent.on(n, "click", o.DomEvent.stop).on(n, "click", this._expand, this) : o.DomEvent.on(n, "focus", this._expand, this),
                o.DomEvent.on(i, "click", function() {
                    setTimeout(o.bind(this._onInputClick, this), 0)
                }, this),
                this._map.on("click", this._collapse, this)
            } else
                this._expand();
            this._baseLayersList = o.DomUtil.create("div", t + "-base", i),
            this._separator = o.DomUtil.create("div", t + "-separator", i),
            this._overlaysList = o.DomUtil.create("div", t + "-overlays", i),
            e.appendChild(i)
        },
        _addLayer: function(t, e, i) {
            var n = o.stamp(t);
            this._layers[n] = {
                layer: t,
                name: e,
                overlay: i
            },
            this.options.autoZIndex && t.setZIndex && (this._lastZIndex++,
            t.setZIndex(this._lastZIndex))
        },
        _update: function() {
            if (this._container) {
                this._baseLayersList.innerHTML = "",
                this._overlaysList.innerHTML = "";
                var t, e, i = !1, n = !1;
                for (t in this._layers)
                    e = this._layers[t],
                    this._addItem(e),
                    n = n || e.overlay,
                    i = i || !e.overlay;
                this._separator.style.display = n && i ? "" : "none"
            }
        },
        _onLayerChange: function(t) {
            var e = this._layers[o.stamp(t.layer)];
            if (e) {
                this._handlingClick || this._update();
                var i = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null ;
                i && this._map.fire(i, e)
            }
        },
        _createRadioElement: function(t, i) {
            var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
            i && (n += ' checked="checked"'),
            n += "/>";
            var o = e.createElement("div");
            return o.innerHTML = n,
            o.firstChild
        },
        _addItem: function(t) {
            var i, n = e.createElement("label"), s = this._map.hasLayer(t.layer);
            t.overlay ? (i = e.createElement("input"),
            i.type = "checkbox",
            i.className = "leaflet-control-layers-selector",
            i.defaultChecked = s) : i = this._createRadioElement("leaflet-base-layers", s),
            i.layerId = o.stamp(t.layer),
            o.DomEvent.on(i, "click", this._onInputClick, this);
            var a = e.createElement("span");
            a.innerHTML = " " + t.name,
            n.appendChild(i),
            n.appendChild(a);
            var r = t.overlay ? this._overlaysList : this._baseLayersList;
            return r.appendChild(n),
            n
        },
        _onInputClick: function() {
            var t, e, i, n = this._form.getElementsByTagName("input"), o = n.length;
            for (this._handlingClick = !0,
            t = 0; o > t; t++)
                e = n[t],
                i = this._layers[e.layerId],
                e.checked && !this._map.hasLayer(i.layer) ? this._map.addLayer(i.layer) : !e.checked && this._map.hasLayer(i.layer) && this._map.removeLayer(i.layer);
            this._handlingClick = !1,
            this._refocusOnMap()
        },
        _expand: function() {
            o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
        },
        _collapse: function() {
            this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
        }
    }),
    o.control.layers = function(t, e, i) {
        return new o.Control.Layers(t,e,i)
    }
    ,
    o.PosAnimation = o.Class.extend({
        includes: o.Mixin.Events,
        run: function(t, e, i, n) {
            this.stop(),
            this._el = t,
            this._inProgress = !0,
            this._newPos = e,
            this.fire("start"),
            t.style[o.DomUtil.TRANSITION] = "all " + (i || .25) + "s cubic-bezier(0,0," + (n || .5) + ",1)",
            o.DomEvent.on(t, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this),
            o.DomUtil.setPosition(t, e),
            o.Util.falseFn(t.offsetWidth),
            this._stepTimer = setInterval(o.bind(this._onStep, this), 50)
        },
        stop: function() {
            this._inProgress && (o.DomUtil.setPosition(this._el, this._getPos()),
            this._onTransitionEnd(),
            o.Util.falseFn(this._el.offsetWidth))
        },
        _onStep: function() {
            var t = this._getPos();
            return t ? (this._el._leaflet_pos = t,
            void this.fire("step")) : void this._onTransitionEnd()
        },
        _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
        _getPos: function() {
            var e, i, n, s = this._el, a = t.getComputedStyle(s);
            if (o.Browser.any3d) {
                if (n = a[o.DomUtil.TRANSFORM].match(this._transformRe),
                !n)
                    return;
                e = parseFloat(n[1]),
                i = parseFloat(n[2])
            } else
                e = parseFloat(a.left),
                i = parseFloat(a.top);
            return new o.Point(e,i,!0)
        },
        _onTransitionEnd: function() {
            o.DomEvent.off(this._el, o.DomUtil.TRANSITION_END, this._onTransitionEnd, this),
            this._inProgress && (this._inProgress = !1,
            this._el.style[o.DomUtil.TRANSITION] = "",
            this._el._leaflet_pos = this._newPos,
            clearInterval(this._stepTimer),
            this.fire("step").fire("end"))
        }
    }),
    o.Map.include({
        setView: function(t, e, n) {
            if (e = e === i ? this._zoom : this._limitZoom(e),
            t = this._limitCenter(o.latLng(t), e, this.options.maxBounds),
            n = n || {},
            this._panAnim && this._panAnim.stop(),
            this._loaded && !n.reset && n !== !0) {
                n.animate !== i && (n.zoom = o.extend({
                    animate: n.animate
                }, n.zoom),
                n.pan = o.extend({
                    animate: n.animate
                }, n.pan));
                var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
                if (s)
                    return clearTimeout(this._sizeTimer),
                    this
            }
            return this._resetView(t, e),
            this
        },
        panBy: function(t, e) {
            if (t = o.point(t).round(),
            e = e || {},
            !t.x && !t.y)
                return this;
            if (this._panAnim || (this._panAnim = new o.PosAnimation,
            this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)),
            e.noMoveStart || this.fire("movestart"),
            e.animate !== !1) {
                o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var i = this._getMapPanePos().subtract(t);
                this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
            } else
                this._rawPanBy(t),
                this.fire("move").fire("moveend");
            return this
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"),
            this.fire("moveend")
        },
        _tryAnimatedPan: function(t, e) {
            var i = this._getCenterOffset(t)._floor();
            return (e && e.animate) === !0 || this.getSize().contains(i) ? (this.panBy(i, e),
            !0) : !1
        }
    }),
    o.PosAnimation = o.DomUtil.TRANSITION ? o.PosAnimation : o.PosAnimation.extend({
        run: function(t, e, i, n) {
            this.stop(),
            this._el = t,
            this._inProgress = !0,
            this._duration = i || .25,
            this._easeOutPower = 1 / Math.max(n || .5, .2),
            this._startPos = o.DomUtil.getPosition(t),
            this._offset = e.subtract(this._startPos),
            this._startTime = +new Date,
            this.fire("start"),
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(),
            this._complete())
        },
        _animate: function() {
            this._animId = o.Util.requestAnimFrame(this._animate, this),
            this._step()
        },
        _step: function() {
            var t = +new Date - this._startTime
              , e = 1e3 * this._duration;
            e > t ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1),
            this._complete())
        },
        _runFrame: function(t) {
            var e = this._startPos.add(this._offset.multiplyBy(t));
            o.DomUtil.setPosition(this._el, e),
            this.fire("step")
        },
        _complete: function() {
            o.Util.cancelAnimFrame(this._animId),
            this._inProgress = !1,
            this.fire("end")
        },
        _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    }),
    o.Map.mergeOptions({
        zoomAnimation: !0,
        zoomAnimationThreshold: 4
    }),
    o.DomUtil.TRANSITION && o.Map.addInitHook(function() {
        this._zoomAnimated = this.options.zoomAnimation && o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.android23 && !o.Browser.mobileOpera,
        this._zoomAnimated && o.DomEvent.on(this._mapPane, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
    }),
    o.Map.include(o.DomUtil.TRANSITION ? {
        _catchTransitionEnd: function(t) {
            this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(t, e, i) {
            if (this._animatingZoom)
                return !0;
            if (i = i || {},
            !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
                return !1;
            var n = this.getZoomScale(e)
              , o = this._getCenterOffset(t)._divideBy(1 - 1 / n)
              , s = this._getCenterLayerPoint()._add(o);
            return i.animate === !0 || this.getSize().contains(o) ? (this.fire("movestart").fire("zoomstart"),
            this._animateZoom(t, e, s, n, null , !0),
            !0) : !1
        },
        _animateZoom: function(t, e, i, n, s, a, r) {
            r || (this._animatingZoom = !0),
            o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"),
            this._animateToCenter = t,
            this._animateToZoom = e,
            o.Draggable && (o.Draggable._disabled = !0),
            o.Util.requestAnimFrame(function() {
                this.fire("zoomanim", {
                    center: t,
                    zoom: e,
                    origin: i,
                    scale: n,
                    delta: s,
                    backwards: a
                }),
                setTimeout(o.bind(this._onZoomTransitionEnd, this), 250)
            }, this)
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._animatingZoom = !1,
            o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"),
            o.Util.requestAnimFrame(function() {
                this._resetView(this._animateToCenter, this._animateToZoom, !0, !0),
                o.Draggable && (o.Draggable._disabled = !1)
            }, this))
        }
    } : {}),
    o.TileLayer.include({
        _animateZoom: function(t) {
            this._animating || (this._animating = !0,
            this._prepareBgBuffer());
            var e = this._bgBuffer
              , i = o.DomUtil.TRANSFORM
              , n = t.delta ? o.DomUtil.getTranslateString(t.delta) : e.style[i]
              , s = o.DomUtil.getScaleString(t.scale, t.origin);
            e.style[i] = t.backwards ? s + " " + n : n + " " + s
        },
        _endZoomAnim: function() {
            var t = this._tileContainer
              , e = this._bgBuffer;
            t.style.visibility = "",
            t.parentNode.appendChild(t),
            o.Util.falseFn(e.offsetWidth);
            var i = this._map.getZoom();
            (i > this.options.maxZoom || i < this.options.minZoom) && this._clearBgBuffer(),
            this._animating = !1
        },
        _clearBgBuffer: function() {
            var t = this._map;
            !t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "",
            this._bgBuffer.style[o.DomUtil.TRANSFORM] = "")
        },
        _prepareBgBuffer: function() {
            var t = this._tileContainer
              , e = this._bgBuffer
              , i = this._getLoadedTilesPercentage(e)
              , n = this._getLoadedTilesPercentage(t);
            return e && i > .5 && .5 > n ? (t.style.visibility = "hidden",
            void this._stopLoadingImages(t)) : (e.style.visibility = "hidden",
            e.style[o.DomUtil.TRANSFORM] = "",
            this._tileContainer = e,
            e = this._bgBuffer = t,
            this._stopLoadingImages(e),
            void clearTimeout(this._clearBgBufferTimer))
        },
        _getLoadedTilesPercentage: function(t) {
            var e, i, n = t.getElementsByTagName("img"), o = 0;
            for (e = 0,
            i = n.length; i > e; e++)
                n[e].complete && o++;
            return o / i
        },
        _stopLoadingImages: function(t) {
            var e, i, n, s = Array.prototype.slice.call(t.getElementsByTagName("img"));
            for (e = 0,
            i = s.length; i > e; e++)
                n = s[e],
                n.complete || (n.onload = o.Util.falseFn,
                n.onerror = o.Util.falseFn,
                n.src = o.Util.emptyImageUrl,
                n.parentNode.removeChild(n))
        }
    }),
    o.Map.include({
        _defaultLocateOptions: {
            watch: !1,
            setView: !1,
            maxZoom: 1 / 0,
            timeout: 1e4,
            maximumAge: 0,
            enableHighAccuracy: !1
        },
        locate: function(t) {
            if (t = this._locateOptions = o.extend(this._defaultLocateOptions, t),
            !navigator.geolocation)
                return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }),
                this;
            var e = o.bind(this._handleGeolocationResponse, this)
              , i = o.bind(this._handleGeolocationError, this);
            return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t),
            this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
        },
        _handleGeolocationError: function(t) {
            var e = t.code
              , i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(),
            this.fire("locationerror", {
                code: e,
                message: "Geolocation error: " + i + "."
            })
        },
        _handleGeolocationResponse: function(t) {
            var e = t.coords.latitude
              , i = t.coords.longitude
              , n = new o.LatLng(e,i)
              , s = 180 * t.coords.accuracy / 40075017
              , a = s / Math.cos(o.LatLng.DEG_TO_RAD * e)
              , r = o.latLngBounds([e - s, i - a], [e + s, i + a])
              , h = this._locateOptions;
            if (h.setView) {
                var l = Math.min(this.getBoundsZoom(r), h.maxZoom);
                this.setView(n, l)
            }
            var u = {
                latlng: n,
                bounds: r,
                timestamp: t.timestamp
            };
            for (var c in t.coords)
                "number" == typeof t.coords[c] && (u[c] = t.coords[c]);
            this.fire("locationfound", u)
        }
    })
}(window, document);
+function($) {
    "use strict";
    function getTargetFromTrigger($trigger) {
        var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(target)
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.collapse")
              , options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && "show" == option && (options.toggle = !1),
            data || $this.data("bs.collapse", data = new Collapse(this,options)),
            "string" == typeof option && data[option]()
        })
    }
    var Collapse = function(element, options) {
        this.$element = $(element),
        this.options = $.extend({}, Collapse.DEFAULTS, options),
        this.$trigger = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]'),
        this.transitioning = null ,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    }
    ;
    Collapse.VERSION = "3.3.2",
    Collapse.TRANSITION_DURATION = 350,
    Collapse.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    },
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height"
    }
    ,
    Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (activesData = actives.data("bs.collapse"),
            activesData && activesData.transitioning))) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent),
                !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (Plugin.call(actives, "hide"),
                    activesData || actives.data("bs.collapse", null ));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    }
                    ;
                    if (!$.support.transition)
                        return complete.call(this);
                    var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
                }
            }
        }
    }
    ,
    Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent),
            !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                }
                ;
                return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this)
            }
        }
    }
    ,
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
        }, this)).end()
    }
    ,
    Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen),
        $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen)
    }
    ;
    var old = $.fn.collapse;
    $.fn.collapse = Plugin,
    $.fn.collapse.Constructor = Collapse,
    $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old,
        this
    }
    ,
    $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = getTargetFromTrigger($this)
          , data = $target.data("bs.collapse")
          , option = data ? "toggle" : $.extend({}, $this.data(), {
            trigger: this
        });
        Plugin.call($target, option)
    })
}(jQuery);
+function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)),
            "string" == typeof option && data[option].call($this)
        })
    }
    var dismiss = '[data-dismiss="alert"]'
      , Alert = function(el) {
        $(el).on("click", dismiss, this.close)
    }
    ;
    Alert.VERSION = "3.3.2",
    Alert.TRANSITION_DURATION = 150,
    Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove()
        }
        var $this = $(this)
          , selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"),
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $(selector);
        e && e.preventDefault(),
        $parent.length || ($parent = $this.closest(".alert")),
        $parent.trigger(e = $.Event("close.bs.alert")),
        e.isDefaultPrevented() || ($parent.removeClass("in"),
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement())
    }
    ;
    var old = $.fn.alert;
    $.fn.alert = Plugin,
    $.fn.alert.Constructor = Alert,
    $.fn.alert.noConflict = function() {
        return $.fn.alert = old,
        this
    }
    ,
    $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
}(jQuery);
+function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
              , data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)),
            "string" == typeof option && data[option]()
        })
    }
    var Tab = function(element) {
        this.element = $(element)
    }
    ;
    Tab.VERSION = "3.3.2",
    Tab.TRANSITION_DURATION = 150,
    Tab.prototype.show = function() {
        var $this = this.element
          , $ul = $this.closest("ul:not(.dropdown-menu)")
          , selector = $this.data("target");
        if (selector || (selector = $this.attr("href"),
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")),
        $this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a")
              , hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            });
            if ($previous.trigger(hideEvent),
            hideEvent.isDefaultPrevented())
                return;
            var $target = $(selector);
            return this.deactivate($ul),
            void this.deactivate($target.parent(), function() {
                $previous.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: $this[0]
                })
            })
        }
        if (!$this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a")
              , hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            })
              , showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            if ($previous.trigger(hideEvent),
            $this.trigger(showEvent),
            !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul),
                this.activate($target, $target.parent(), function() {
                    $previous.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }),
                    $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $previous[0]
                    })
                })
            }
        }
    }
    ,
    Tab.prototype.deactivate = function(container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            callback && callback()
        }
        var $active = container.find("> .active")
          , transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(),
        $active.removeClass("in")
    }
    ,
    Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            transition ? (element[0].offsetWidth,
            element.addClass("in")) : element.removeClass("fade"),
            element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            callback && callback()
        }
        var $active = container.find("> .active")
          , transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(),
        $active.removeClass("in")
    }
    ;
    var old = $.fn.tab;
    $.fn.tab = Plugin,
    $.fn.tab.Constructor = Tab,
    $.fn.tab.noConflict = function() {
        return $.fn.tab = old,
        this
    }
    ;
    var clickHandler = function(e) {
        e.preventDefault(),
        Plugin.call($(this), "show")
    }
    ;
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler)
}(jQuery);
+function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap")
          , transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames)
            if (void 0 !== el.style[name])
                return {
                    end: transEndEventNames[name]
                };
        return !1
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1
          , $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = !0
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end)
        }
        ;
        return setTimeout(callback, duration),
        this
    }
    ,
    $(function() {
        $.support.transition = transitionEnd(),
        $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery);
"undefined" == typeof String.prototype.startsWith && (String.prototype.startsWith = function(str) {
    return 0 == this.indexOf(str)
}
),
function($) {
    swr3 = {
        $document: $(document),
        $window: $(window),
        $main: $("main"),
        $body: $("body"),
        metaTagStore: {},
        navigationKeysEnabled: !0,
        KEYS: {
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            TAB: 9
        },
        initialize: function() {
            this.$body.prepend('<div class="loader-container" aria-hidden="true"><div class="loader"></div></div>'),
            this.$document.on("keyup", $.proxy(this.handleKeyDown, this)),
            this.$window.on("resize", $.proxy(this.handleResizeThrottle, this)),
            this.$window.on("resize", $.proxy(this.handleResizeDebounce, this)),
            this.$document.on("pjax:beforeSend", $.proxy(this.showLoader, this)),
            this.$document.on("pjax:complete pjax:popstate", $.proxy(this.removeLoader, this)),
            this.$document.on("shown.bs.collapse", $.proxy(function(event) {
                var top = $(event.target).closest(".panel").offset().top - parseInt($("#oc-wrapper").css("padding-top"), 10) - $(window).height() / 100;
                $("html, body").animate({
                    scrollTop: top
                }, 218, "swing")
            }, this))
        },
        isMobile: function() {
            return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? !0 : !1
        },
        isLargeScreen: function() {
            return window.matchMedia ? window.matchMedia("only screen and (min-device-width: 641px) and (min-width: 641px)").matches : !0
        },
        getOrientation: function() {
            return 0 == window.orientation || 180 == window.orientation ? "portrait" : "landscape"
        },
        isTouch: function() {
            return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
        },
        viewport: {
            getWidth: function() {
                return $(window).width()
            },
            getHeight: function() {
                return $(window).height()
            }
        },
        getViewport: function() {
            return {
                width: this.viewport.getWidth(),
                height: this.viewport.getHeight()
            }
        },
        device: {
            getWidth: function() {
                return window.screen.width
            },
            getHeight: function() {
                return window.screen.height
            }
        },
        getMeta: function(e) {
            return this.metaTagStore[e]
        },
        setMeta: function(e, t, n) {
            this.metaTagStore[e] && n === !1 ? "string" == typeof this.metaTagStore[e] ? (this.metaTagStore[e] = [this.metaTagStore[e]],
            this.metaTagStore[e].push(t)) : this.metaTagStore[e] && this.metaTagStore[e].push(t) : this.metaTagStore[e] = t
        },
        enableNavigationKeys: function() {
            this.navigationKeysEnabled = !0
        },
        disableNavigationKeys: function() {
            this.navigationKeysEnabled = !1
        },
        handleResize: function() {
            this.$window.trigger("swr3:page-resize"),
            this.$window.trigger("swr3:page-viewportchange")
        },
        handleResizeThrottle: _.throttle(function() {
            this.handleResize()
        }, 100),
        handleResizeDebounce: _.debounce(function() {
            this.handleResize(),
            this.$window.trigger("swr3:page-resize-after")
        }, 100),
        handleKeyDown: function(t) {
            var n = t.keyCode
              , i = $(t.target)
              , r = i.is("input, textarea")
              , o = t.shiftKey || t.altKey || t.ctrlKey || t.metaKey
              , a = this.getMeta("mediaViewer-isVisible") || !1;
            switch (n) {
            case this.KEYS.LEFT:
                if (!this.navigationKeysEnabled)
                    break;
                a && !o ? this.$window.trigger("swr3:mediaViewer-left") : r;
                break;
            case this.KEYS.RIGHT:
                if (!this.navigationKeysEnabled)
                    break;
                a && !o ? this.$window.trigger("swr3:mediaViewer-right") : r;
                break;
            case this.KEYS.ESC:
                this.$window.trigger("swr3:page-key-esc", t)
            }
        },
        parseUrl: function(url) {
            var a = document.createElement("a");
            return a.href = url,
            {
                source: url,
                protocol: a.protocol.replace(":", ""),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: function() {
                    for (var s, ret = {}, seg = a.search.replace(/^\?/, "").split("&"), len = seg.length, i = 0; len > i; i++)
                        seg[i] && (s = seg[i].split("="),
                        ret[s[0]] = s[1]);
                    return ret
                }(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
                hash: a.hash.replace("#", ""),
                path: a.pathname.replace(/^([^\/])/, "/$1"),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
                segments: a.pathname.replace(/^\//, "").split("/")
            }
        },
        getShortUrl: function(url) {
            var shortUrl = url;
            return "www.swr3.de" != document.location.hostname.toLowerCase() ? shortUrl : (new Request.JSON({
                url: "/swr3land/services/shorturl.php?url=" + encodeURIComponent(url),
                async: !1,
                onSuccess: function(data) {
                    shortUrl = data.shorturl
                }
            }).send(),
            shortUrl)
        },
        showLoader: function() {
            this.$body.addClass("loading")
        },
        removeLoader: function() {
            this.$body.removeClass("loading")
        }
    },
    swr3.initialize()
}(window.jQuery);
!function($) {
    swr3.Data = {
        feedUrl: "/ext/cf=42/actions/feed/index.json",
        _storage: {},
        initialize: function() {
            setInterval($.proxy(function() {
                this._update()
            }, this), 2e4),
            this._update()
        },
        get: function(key) {
            return this._storage.hasOwnProperty(key) ? this._storage[key] : void 0
        },
        _update: function() {
            $.ajax({
                url: this.feedUrl,
                dataType: "json",
                success: $.proxy(function(data) {
                    data && this._setStorage(data),
                    $(document).trigger("swr3:data-update")
                }, this),
                error: function() {}
            })
        },
        _setStorage: function(data) {
            this._storage = data
        }
    },
    swr3.Data.initialize()
}(window.jQuery);
!function($) {
    swr3.ElementUpdater = {
        initialize: function() {
            $(document).on("swr3:data-update", $.proxy(function() {
                this._update()
            }, this))
        },
        _update: function() {
            var data = swr3.Data.get("update");
            "undefined" != typeof data && $.each(data, $.proxy(function(id, content) {
                $(id).html(content)
            }, this))
        }
    },
    swr3.ElementUpdater.initialize()
}(window.jQuery);
!function($) {
    $(window).on("scroll resize", function() {
        $(window).scrollTop() > 5 ? $("html").addClass("fixed-header") : $("html").removeClass("fixed-header")
    })
}(window.jQuery);
!function($) {
    $(document).on("click", "[data-toggle=navigation], .oc-in #oc-overlay", function() {
        return $("html").toggleClass("oc-in"),
        $("html").hasClass("oc-in") ? void $("html").removeClass("search-in") : ($("#navigation").scrollTop(),
        $("#navigation li.dropdown.active").removeClass("active"),
        void $('#navigation li.dropdown > a[aria-expanded="true"]').attr("aria-expanded", "false"))
    }),
    $(document).on("pjax:complete pjax:popstate", function() {
        $("html").removeClass("oc-in"),
        $("#navigation").scrollTop(),
        $("#navigation li.dropdown.active").removeClass("active"),
        $('#navigation li.dropdown > a[aria-expanded="true"]').attr("aria-expanded", "false")
    })
}(window.jQuery),
function($) {
    $(document).on("click", ".oc-in #navigation li.dropdown > a", function(event) {
        event.preventDefault(),
        $(event.currentTarget).closest("li.dropdown").toggleClass("active").find("> a"),
        $('#navigation li.dropdown > a[aria-expanded="true"]').attr("aria-expanded", "false"),
        $('#navigation li.dropdown.active > a[aria-expanded="false"]').attr("aria-expanded", "true")
    })
}(window.jQuery);
!function($) {
    var $search = $("#headSearch")
      , $searchForm = $search.find("form").first();
    $(document).on("click", 'button[data-toggle="headSearch"]', function(event) {
        event.preventDefault(),
        $("html").addClass("search-in"),
        $("input#s").focus()
    }),
    $(document).on("click", "html.search-in", function(event) {
        0 == $(event.target).closest("input#s, button.btn-search").length && $("html").removeClass("search-in")
    }),
    $(document).on("pjax:complete pjax:popstate", function() {
        $("html").removeClass("search-in"),
        $searchForm.val("")
    })
}(window.jQuery);
!function($) {
    document.createElement("audio");
    swr3.Audioplayer = {
        liveUrl: "http://swr-mp3-m-swr3.akacast.akamaistream.net/7/720/137136/v1/gnl.akacast.akamaistream.net/swr-mp3-m-swr3",
        liveStream: {
            mp3: "http://swr-mp3-m-swr3.akacast.akamaistream.net/7/720/137136/v1/gnl.akacast.akamaistream.net/swr-mp3-m-swr3"
        },
        liveData: {
            title: "SWR3_Webradio_einschalten (Dok.-Id: 3356628)",
            duration: -1,
            contensize: null ,
            format: "mp3"
        },
        allowPI: !0,
        player: null ,
        status: null ,
        timerPlayingNow: null ,
        currentTrack: null ,
        currentData: null ,
        lastOptionButtonSelector: null ,
        cssSelectors: {
            header: "#jp_container_1",
            play: ".jp-play",
            pause: ".jp-pause",
            stop: ".jp-stop",
            live: ".jp-live",
            content: "main",
            playOption: ".jp-option-play",
            stopOption: ".jp-option-pause",
            currentTime: ".jp-current-time",
            add: ".jp-option-add",
            title: ".jp-title",
            bar: ".jp-bar",
            volumeIcon: ".icon-volume"
        },
        initialize: function() {
            this.player = $(".jp-jplayer"),
            this.player.bind($.jPlayer.event.error, function(event) {
                console.log(event.jPlayer.error.message)
            }),
            this.player.bind($.jPlayer.event.play, $.proxy(function() {
                this.allowPI && (this.allowPI = !1,
                $(document).trigger("swr3:pixel:pageview"))
            }, this)),
            this.player.bind($.jPlayer.event.playing, $.proxy(function() {
                "undefined" != typeof this.rmPixelInterval && window.clearInterval(this.rmPixelInterval),
                this.currentData.rmp = Math.floor(this.player.data().jPlayer.status.currentTime),
                $(document).trigger("swr3:pixel:audio", ["play", this.currentData]),
                $(".audio.active").removeClass("active"),
                2 === this.status && $(this.lastOptionButtonSelector).closest(".audio").addClass("active")
            }, this)),
            this.player.bind($.jPlayer.event.pause, $.proxy(function() {
                "undefined" != typeof this.rmPixelInterval && window.clearInterval(this.rmPixelInterval),
                this.currentData.rmp = Math.floor(this.player.data().jPlayer.status.currentTime),
                $(document).trigger("swr3:pixel:audio", ["pause", this.currentData])
            }, this)),
            this.player.bind($.jPlayer.event.ended, $.proxy(function() {
                "undefined" != typeof this.rmPixelInterval && window.clearInterval(this.rmPixelInterval),
                this.currentData.rmp = Math.floor(this.player.data().jPlayer.status.currentTime),
                $(document).trigger("swr3:pixel:audio", ["stop", this.currentData]),
                1 === this.status ? $(this.cssSelectors.live).removeClass("active") : 2 === this.status && ($(this.lastOptionButtonSelector).addClass("jp-option-play"),
                $(this.lastOptionButtonSelector).removeClass("jp-option-pause"),
                $(this.lastOptionButtonSelector).closest(".audio").next(".audio").find(".jp-option-play").click())
            }, this)),
            this.player.jPlayer({
                swfPath: "/static/js/vendor/jplayer/2.9.2/jquery.jplayer.swf",
                solution: "html, flash",
                supplied: "m4a, mp3",
                verticalVolume: !0,
                preload: "none",
                cssSelector: {
                    play: this.cssSelectors.play,
                    pause: this.cssSelectors.pause,
                    stop: this.cssSelectors.stop,
                    currentTime: this.cssSelectors.currentTime
                },
                ready: $.proxy(function() {
                    this.player.jPlayer("setMedia", this.liveStream),
                    this.currentTrack = this.liveUrl,
                    this.currentData = this.liveData,
                    this.status = 1,
                    this.startEventlistener(),
                    this.startNowPlaying(),
                    this.player.jPlayer("volume", $.cookie("audio.volume") || .8)
                }, this),
                volumechange: $.proxy(function(t) {
                    this.changeVolumeIcon(t.jPlayer.options.volume),
                    this.storeVolume(t.jPlayer.options.volume)
                }, this)
            })
        },
        storeVolume: function(volume) {
            $.cookie("audio.volume", volume, {
                path: "/",
                expires: 14
            })
        },
        changeVolumeIcon: function(volume) {
            .25 >= volume ? ($(this.cssSelectors.volumeIcon).addClass("icon-volume-0"),
            $(this.cssSelectors.volumeIcon).removeClass("icon-volume-3 icon-volume-2 icon-volume-1")) : .5 >= volume ? ($(this.cssSelectors.volumeIcon).addClass("icon-volume-1"),
            $(this.cssSelectors.volumeIcon).removeClass("icon-volume-3 icon-volume-2 icon-volume-0")) : .75 >= volume ? ($(this.cssSelectors.volumeIcon).addClass("icon-volume-2"),
            $(this.cssSelectors.volumeIcon).removeClass("icon-volume-3 icon-volume-1 icon-volume-0")) : ($(this.cssSelectors.volumeIcon).addClass("icon-volume-3"),
            $(this.cssSelectors.volumeIcon).removeClass("icon-volume-2 icon-volume-1 icon-volume-0"))
        },
        startEventlistener: function() {
            $(this.cssSelectors.content).on("click", this.cssSelectors.playOption, $.proxy(function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                $(".jp-option-pause").addClass("jp-option-play"),
                $(".jp-option-pause").removeClass("jp-option-pause"),
                $(t.currentTarget).addClass("jp-option-pause"),
                $(t.currentTarget).removeClass("jp-option-play");
                var e = $(t.currentTarget).attr("data-mp3")
                  , s = $(t.currentTarget).attr("data-title");
                this.playNow(2, e, {
                    title: $(t.currentTarget).attr("data-ati-richname") + " (Dok.-Id: " + $(t.currentTarget).attr("data-ati-mediaid") + ")",
                    duration: $(t.currentTarget).attr("data-ati-duration"),
                    contensize: $(t.currentTarget).attr("data-ati-size"),
                    format: "mp3"
                }),
                this.updateTitle('<span class="title--title">' + s + "</span>", null ),
                this.status = 2,
                this.lastOptionButtonSelector = t.currentTarget
            }, this)),
            $(this.cssSelectors.content).on("click", this.cssSelectors.stopOption, $.proxy(function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                $(t.currentTarget).removeClass("jp-option-pause"),
                $(t.currentTarget).addClass("jp-option-play"),
                this.stop()
            }, this)),
            $(this.cssSelectors.header + ",#broadcast").on("click", this.cssSelectors.live, $.proxy(function(t) {
                t.preventDefault(),
                t.stopPropagation(),
                $("main " + this.cssSelectors.stopOption).addClass("jp-option-play"),
                $("main " + this.cssSelectors.stopOption).removeClass("jp-option-pause"),
                this.playNow(1, this.liveUrl, this.liveData),
                null  === this.timerPlayingNow && this.updateTitle("", null ),
                this.status = 1
            }, this)),
            $(this.cssSelectors.header).on("click", this.cssSelectors.play, $.proxy(function() {
                1 === this.status ? ($(this.cssSelectors.live).addClass("active"),
                this.playNow(1, this.liveUrl, this.liveData)) : 2 === this.status && ($(this.lastOptionButtonSelector).removeClass("jp-option-play"),
                $(this.lastOptionButtonSelector).addClass("jp-option-pause"))
            }, this)),
            $(this.cssSelectors.header).on("click", this.cssSelectors.pause, $.proxy(function() {
                1 === this.status ? $(this.cssSelectors.live).removeClass("active") : 2 === this.status && ($(this.lastOptionButtonSelector).addClass("jp-option-play"),
                $(this.lastOptionButtonSelector).removeClass("jp-option-pause")),
                this.stop()
            }, this)),
            $(document).on("swr3:data-update", $.proxy(function() {
                this._update()
            }, this)),
            $(document).on("pjax:complete pjax:popstate", $.proxy(function() {
                this.allowPI = !0
            }, this))
        },
        stopEventlistener: function() {
            $(this.cssSelectors.content).off("click", this.cssSelectors.playOption),
            $(this.cssSelectors.content).off("click", this.cssSelectors.stopOption),
            $(this.cssSelectors.content).off("click", this.cssSelectors.live)
        },
        playNow: function(status, source, data) {
            switch ("undefined" != typeof this.rmPixelInterval && window.clearInterval(this.rmPixelInterval),
            this.currentTrack !== source && this.player.jPlayer("setMedia", {
                mp3: source
            }),
            this.player.jPlayer("play"),
            this.currentTrack = source,
            this.currentData = data,
            status) {
            case 1:
                this.startNowPlaying(),
                $(this.cssSelectors.bar).removeClass("seekable"),
                $(this.cssSelectors.live).addClass("active");
                break;
            case 2:
                this.stopNowPlaying(),
                $(this.cssSelectors.bar).addClass("seekable"),
                $(this.cssSelectors.live).removeClass("active")
            }
        },
        stop: function() {
            "undefined" != typeof this.rmPixelInterval && window.clearInterval(this.rmPixelInterval),
            1 === this.status ? (this.currentData.rmp = Math.floor(this.player.data().jPlayer.status.currentTime),
            this.player.jPlayer("stop"),
            $(document).trigger("swr3:pixel:audio", ["stop", this.currentData]),
            this.player.jPlayer("clearMedia"),
            this.currentTrack = null ,
            this.currentData = null ) : this.player.jPlayer("pause")
        },
        _update: function() {
            var title = swr3.Data.get("title");
            1 === this.status && "undefined" != typeof title && this.updateTitle(title)
        },
        startNowPlaying: function() {
            null  === this.timerPlayingNow && (this._update(),
            this.timerPlayingNow = setInterval($.proxy(function() {
                this._update()
            }, this), 1e4))
        },
        stopNowPlaying: function() {
            null  !== this.timerPlayingNow && (clearInterval(this.timerPlayingNow),
            this.timerPlayingNow = null )
        },
        updateTitle: function(title) {
            $(this.cssSelectors.title).html(title)
        }
    },
    swr3.Audioplayer.initialize()
}(window.jQuery);
!function($) {
    var $main = ($("body"),
    $("#header"),
    $("main"))
      , clickHandlerShow = ($("#contentpane"),
    function() {
        0 != window.pageYOffset && window.swr3.contenpanePixel ? $("body").addClass("fixed-contentpane") : $("body").addClass("contentpane"),
        window.swr3.contentpaneInterval = window.setInterval(function() {
            $main.css("padding-top", $("#contentpane > .active").height())
        }, 50)
    }
    );
    $(document).on("show.bs.tab", '#header [data-toggle="tab"],#header [data-toggle="pill"]', clickHandlerShow);
    var clickHandlerShown = function() {
        1 == $("#contentpane > .active").length && window.swr3.contenpanePixel && $(document).trigger("swr3:pixel:pageview"),
        window.swr3.contenpanePixel = !0
    }
    ;
    $(document).on("shown.bs.tab", '#header [data-toggle="tab"],#header [data-toggle="pill"]', clickHandlerShown);
    var clickHandlerHide = function() {
        $("body").removeClass("fixed-contentpane contentpane"),
        window.clearInterval(window.swr3.contentpaneInterval),
        $main.css("padding-top", "")
    }
    ;
    $(document).on("hide.bs.tab", '#header [data-toggle="tab"],#header [data-toggle="pill"]', clickHandlerHide);
    var clickHandlerHidden = function() {
        0 == $("#contentpane > .active").length && window.swr3.contenpanePixel && $(document).trigger("swr3:pixel:pageview"),
        window.swr3.contenpanePixel = !0
    }
    ;
    $(document).on("hidden.bs.tab", '#header [data-toggle="tab"],#header [data-toggle="pill"]', clickHandlerHidden)
}(window.jQuery),
function($) {
    "" != document.referrer && swr3.parseUrl(document.referrer).host == document.location.hostname || navigator.userAgent.startsWith("SWR3.app") ? window.swr3.contenpanePixel = !0 : window.setTimeout(function() {
        $("#broadcast-tab").click()
    }, 500),
    $(document).on("pjax:complete pjax:popstate", function(event) {
        0 == $(event.relatedTarget).closest("#contentpane").length && (window.swr3.contenpanePixel = !1),
        $('ul.nav.nav-pills a[aria-expanded="true"]').click()
    })
}(window.jQuery),
function($) {
    swr3.Rosarotespony = {
        $elements: $("#rosarotespony > div"),
        _filter: function() {
            return "none" == $(this).css("display") ? !1 : !0
        },
        fadeOptions: {
            duration: 218
        },
        initialize: function() {
            setInterval($.proxy(function() {
                this._update()
            }, this), 1e4),
            this._update()
        },
        _update: function() {
            var rand = Math.floor(Math.random() * this.$elements.length);
            1 == this.$elements.filter(this._filter).length && this.$elements.filter($.proxy(function(index) {
                return index == rand
            }, this)).filter(this._filter) && (rand = Math.floor(Math.random() * this.$elements.length)),
            this.$elements.filter(this._filter).fadeOut(this.fadeOptions),
            this.$elements.filter($.proxy(function(index) {
                return index == rand
            }, this)).fadeIn(this.fadeOptions)
        }
    },
    swr3.Rosarotespony.initialize()
}(window.jQuery);
!function($) {
    $(document).on("scroll resize ready pjax:complete pjax:popstate", function() {
        $(":file").filestyle({
            icon: !1,
            buttonText: "Durchsuchen&nbsp;&hellip;",
            buttonName: "btn-default btn-upload"
        }),
        $(":file").css("left", "-10000px")
    })
}(window.jQuery);
!function($) {
    $(document).on("submit", "form", function() {
        $.each($(this).find("input[type=date]"), function() {
            var date = moment($(this).val(), ["DD-MM-YYYY", "DD-MM", "MM-DD-YYYY", "MM-DD", "YYYY-MM-DD", "YYYY-DD-MM"]);
            date.isValid() ? $(this).val(date.format("YYYY-MM-DD")) : !1
        })
    })
}(window.jQuery);
!function($) {
    $.support.pjax && ($.pjax.defaults.scrollTo = 0,
    $.pjax.defaults.timeout = 2e4,
    $.pjax.defaults.container = $("main"),
    $.pjax.defaults.fragment = "main",
    $(document).on("click", "[data-pjax-reload]", function() {
        $.pjax.reload("main", {
            scrollTo: 0
        })
    }),
    $(document).on("click", "a", function(event) {
        $(event.currentTarget).attr("href") && "#" != $(event.currentTarget).attr("href").charAt(0) && (new RegExp("/export/(rss20|atom10|podcast)/").test($(event.currentTarget).attr("href")) || new RegExp("/cmwebapp/util/(download|redir).jsp").test($(event.currentTarget).attr("href")) || 0 == $(event.currentTarget).closest("article.slideshow").length && 0 == $(event.currentTarget).closest("figure.slideshow").length && 0 == $(event.currentTarget).closest("figure.slideshow").length && ($(event.currentTarget).attr("target") && -1 != $(event.currentTarget).attr("target").indexOf("_blank") || $(event.currentTarget).attr("rel") && -1 != $(event.currentTarget).attr("rel").indexOf("external") || $.pjax.click(event)))
    }),
    $(document).on("submit", "form", function(event) {
        var element = $(event.currentTarget).attr("data-pjax-container")
          , $element = $("undefined" != typeof element ? element : event.target)
          , top = $element.offset().top - .05 * $(window).height();
        0 != $element.closest("#oc-wrapper").length && (top -= parseInt($("#oc-wrapper").css("padding-top"), 10)),
        "undefined" != typeof element ? $.pjax.submit(event, element, {
            fragment: element,
            container: element,
            scrollTo: top,
            push: !1
        }) : $.pjax.submit(event, {
            scrollTo: top
        })
    }),
    $(document).on("pjax:beforeSend", function() {}),
    $(document).on("pjax:send", function() {}),
    $(document).on("pjax:beforeReplace", function(event, contents, options) {
        "MAIN" == options.container.prop("tagName") && options.container.attr("class", "").attr("id", "")
    }),
    $(document).on("pjax:success", function(event, data) {
        var tempDom = $("<output>").append($.parseHTML(data, document));
        data = null ;
        var $linkRelCanonical = tempDom.find("link[rel=canonical]");
        if (tempDom = null ,
        0 != $linkRelCanonical.length && 0 != $("link[rel=canonical]").length) {
            var canonicalUrl = $linkRelCanonical.first().attr("href");
            $("link[rel=canonical]").first().attr("href", canonicalUrl)
        }
    }),
    $(document).on("pjax:timeout", function(event) {
        event.preventDefault()
    }),
    $(document).on("pjax:error", function(event, xhr, textStatus, errorThrown, options) {
        return options.success(xhr.responseText, textStatus, xhr),
        !1
    }),
    $(document).on("pjax:complete pjax:popstate", function() {
        "" != window.location.hash.substr(1) && 0 != $('[name="' + window.location.hash.substr(1) + '"]').length && $("body,html").animate({
            scrollTop: parseInt($('[name="' + window.location.hash.substr(1) + '"]').offset().top) - parseInt($('[name="' + window.location.hash.substr(1) + '"]').css("padding-top"))
        }, 654)
    }),
    $(document).on("pjax:end", function() {}),
    !0)
}(window.jQuery);
!function($) {
    swr3.Embed = {
        elements: {
            twitter: ['a[class^="twitter-"]', 'a[class*=" twitter-"]', 'blockquote[class^="twitter-"]', 'blockquote[class*=" twitter-"]'],
            google: ["g\\:additnow", "g\\:community", "g\\:follow", "g\\:page", "g\\:person", "g\\:plus", "g\\:plusone", 'div[class^="g-"]', 'div[class*=" g-"]'],
            facebook: ["fb\\:activity", "fb\\:comments", "fb\\:friendpile", "fb\\:like", "fb\\:like-box", "fb\\:login-button", "fb\\:name", "fb\\:profile-pic", "fb\\:recommendations", "fb\\:post", 'div[class^="fb-"]', 'div[class*=" fb-"]'],
            scribble: [".scrbbl-embed[data-src]"]
        },
        initialize: function() {
            $(document).on("pjax:complete pjax:popstate swr3:scribblelive:render", $.proxy(this.update, this)),
            this.update()
        },
        update: function() {
            this.youtube(),
            0 != $(this.elements.twitter.join(", ")).length && this.loadTwitterSDK(),
            0 != $(this.elements.google.join(", ")).length && this.loadGoogleSDK(),
            0 != $(this.elements.facebook.join(", ")).length && this.loadFacebookSDK(),
            0 != $(this.elements.scribble.join(", ")).length && this.loadScribbleSDK()
        },
        loadTwitterSDK: function() {
            "undefined" != typeof twttr ? twttr.widgets.load() : $.getScript("https://platform.twitter.com/widgets.js")
        },
        loadGoogleSDK: function() {
            "undefined" != typeof gapi ? gapi.plus.go() : $.getScript("//apis.google.com/js/plusone.js")
        },
        loadFacebookSDK: function() {
            "undefined" != typeof FB ? FB.init({
                status: !1,
                cookie: !1,
                xfbml: !0
            }) : $.getScript("//connect.facebook.net/de_DE/all.js#xfbml=1", function() {
                FB.init({
                    status: !1,
                    cookie: !1,
                    xfbml: !0
                })
            })
        },
        loadScribbleSDK: function() {
            "undefined" != typeof SCRBBL ? SCRBBL.go() : !function(d, s, id) {
                var js, ijs = d.getElementsByTagName(s)[0];
                d.getElementById(id) || (js = d.createElement(s),
                js.id = id,
                js.src = "//embed.scribblelive.com/widgets/embed.js",
                ijs.parentNode.insertBefore(js, ijs))
            }(document, "script", "scrbbl-js")
        },
        youtube: function() {
            $('iframe[src*="//www.youtube.com/embed/"], iframe[src*="//www.youtube-nocookie.com/embed/"]').each($.proxy(function(index, element) {
                var $element = $(element)
                  , url = swr3.parseUrl($element.attr("src"));
                url.host = "www.youtube-nocookie.com";
                var params = $.extend({}, url.params, {
                    wmode: "opaque",
                    hl: "de_DE",
                    rel: 0,
                    modestbranding: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    origin: window.location.protocol + "//" + window.location.host,
                    feature: "player_embedded"
                });
                delete params.wmode,
                $element.attr("src", window.location.protocol + "//" + url.host + url.path + "?wmode=opaque&" + $.param(params)).attr("class", "embed-responsive-item"),
                $element.parent().hasClass("embed-responsive") || $element.wrap('<div class="embed-responsive embed-responsive-16by9 outset"></div>')
            }, this))
        }
    },
    swr3.Embed.initialize()
}(window.jQuery);
!function($) {
    swr3.Pixel = {
        initialize: function() {
            $(document).on("pjax:complete", $.proxy(function() {
                this._pageview()
            }, this)),
            $(document).on("swr3:pixel:pageview shown.bs.collapse pjax:popstate", $.proxy(function(event, options) {
                this._pageview(options)
            }, this)),
            $(document).on("swr3:pixel:click", $.proxy(function(event, options) {
                this._click(options)
            }, this)),
            $(document).on("swr3:pixel:social", $.proxy(function(event, options) {
                this._social(options)
            }, this)),
            $(document).on("swr3:pixel:audio", $.proxy(function(event, action, options) {
                this._audio(action, options)
            }, this))
        },
        _social: function(options) {
            if ("undefined" == typeof options && (options = {}),
            "undefined" != typeof window.ga)
                try {
                    window.ga("send", "social", options.network, options.action, options.title)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            if ("undefined" != typeof window.xt_med)
                try {
                    window.xt_med("C", window.xtn2, options.network + "::" + options.action + "::" + options.title.replace(/[^A-Za-z0-9\.\/\-\_\~\s]/g, "_"), "A")
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
        },
        _click: function(options) {
            if ("undefined" == typeof options && (options = {}),
            "undefined" != typeof window.ga)
                try {
                    window.ga("send", "event", options.category, options.action, options.title)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            if ("undefined" != typeof window.xt_med)
                try {
                    window.xt_med("C", window.xtn2, options.category + "::" + options.action + "::" + options.title.replace(/[^A-Za-z0-9\.\/\-\_\~\s]/g, "_"), "A")
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
        },
        _audio: function(action, options) {
            if ("undefined" == typeof action && (action = "info"),
            "undefined" == typeof options && (options = {
                title: "undefined",
                duration: -1,
                size: null ,
                format: "mp3"
            }),
            "undefined" != typeof window.ga)
                try {
                    -1 == options.duration ? window.ga("send", "event", "Audios", action, options.title) : window.ga("send", "event", "Audios", action, options.title, Math.floor(options.duration / 100 * options.rmp))
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            var data = {
                A: "audio",
                B: 16,
                C: "Level-2-Id 16::" + options.title,
                D: action,
                E: "",
                F: 5,
                G: -1 == options.duration ? "" : options.duration,
                H: "rmp=" + options.rmp + "&rmpf=0&rmbufp=0",
                I: "",
                J: "2",
                K: "int",
                L: -1 == options.duration ? "live" : "clip",
                M: -1 == options.duration ? "" : options.contensize,
                N: "m4a" == options.format ? 5 : 1
            };
            try {
                window.xt_rm(data.A, data.B, data.C, data.D, data.E, data.F, data.G, data.H, data.I, data.J, data.K, data.L, data.M, data.N)
            } catch (e) {
                (console.error || console.log).call(console, e.stack || e)
            }
        },
        _pageview: function(options) {
            if ("undefined" == typeof options && (options = {}),
            "undefined" != typeof window.iom && "undefined" != typeof window.iam_data)
                try {
                    window.iom.c(window.iam_data, 1)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            if ("undefined" != typeof window.pSUPERFLY) {
                var cb = options.cb || {
                    useCanonical: "false" == $("#chartbeat").attr("data-useCanonical") ? !1 : !0,
                    path: $("#chartbeat").attr("data-path") || window.location.pathname,
                    sections: $("#chartbeat").attr("data-sections") || ""
                };
                window._sf_async_config.useCanonical = cb.useCanonical,
                window._sf_async_config.path = cb.path,
                window._sf_async_config.sections = cb.sections;
                try {
                    window.pSUPERFLY.virtualPage(options.url || document.URL, options.title || document.title)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            }
            if ("undefined" != typeof window.ga)
                try {
                    window.ga("send", "pageview", {
                        page: options.url || document.URL,
                        title: options.title || document.title
                    })
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            if ("undefined" != typeof window.xt_med) {
                var ati = options.ati || {
                    xtpage: $("#ati").attr("data-xtpage") || "",
                    xt_pageID: $("#ati").attr("data-xt_pageID") || "",
                    xt_pageDate: $("#ati").attr("data-xt_pageDate") || "",
                    xt_chap: $("#ati").attr("data-xt_chap") || "",
                    xt_multc: $("#ati").attr("data-xt_multc") || "",
                    xt_an: $("#ati").attr("data-xt_an") || "",
                    xt_ac: $("#ati").attr("data-xt_ac") || ""
                };
                try {
                    window.xt_med("F", window.xtn2, ati.xtpage + "&pid=" + ati.xt_pageID + "&pidt=" + ati.xt_pageDate + "&pchap=" + ati.xt_chap + ati.xt_multc + "&an=" + ati.xt_an + "&ac=" + ati.xt_ac)
                } catch (e) {
                    (console.error || console.log).call(console, e.stack || e)
                }
            }
        }
    },
    swr3.Pixel.initialize()
}(window.jQuery);
!function($) {
    swr3.Gallery = {
        initialize: function() {
            this.startEventlistener(),
            this._initialize()
        },
        owlAfterAction: function(elem) {
            $(document).trigger("swr3:pixel:pageview");
            var $container = $(elem).parent()
              , $previous = $container.find(".previous")
              , $next = $container.find(".next")
              , $restart = $container.find(".restart");
            0 == this.currentItem ? $previous.addClass("disabled") : $previous.removeClass("disabled"),
            this.maximumItem == this.currentItem ? ($next.addClass("hidden"),
            $restart.removeClass("hidden")) : ($next.removeClass("hidden"),
            $restart.addClass("hidden"));
            var item = this.$userItems["next" == this.playDirection ? this.currentItem + 1 : this.currentItem - 1] || void 0;
            if ("undefined" != typeof item && "undefined" != typeof $(item).attr("data-mediagallery-url") && $(item).attr("data-mediagallery-url") !== !1) {
                var owl = this;
                if ("localhost" == window.location.hostname)
                    return !0;
                $.ajax({
                    url: $(item).attr("data-mediagallery-url") + "?_gallery=true",
                    dataType: "html",
                    headers: {
                        "X-GALLERY": "true"
                    },
                    success: function(data) {
                        $(item).replaceWith(data),
                        item.removeAttribute("data-mediagallery-url"),
                        owl.autoHeight(),
                        picturefill()
                    },
                    complete: function() {},
                    error: function() {}
                })
            }
            return !0
        },
        _initialize: function() {
            var self = this;
            $(".mediagallery-list").each(function() {
                var owl = $(this)
                  , index = owl.children().index(owl.children().filter(":not([data-mediagallery-url])"));
                owl.owlCarousel({
                    navigation: !1,
                    pagination: !1,
                    slideSpeed: 600,
                    paginationSpeed: 600,
                    singleItem: !0,
                    addClassActive: !0,
                    goToFirstSpeed: 600,
                    autoHeight: !0,
                    afterAction: self.owlAfterAction
                }),
                owl.trigger("owl.jumpTo", index),
                owl.parent().find(".next").off("click.swr3.gallery"),
                owl.parent().find(".next").on("click.swr3.gallery", function() {
                    owl.trigger("owl.next")
                }),
                owl.parent().find(".previous").off("click.swr3.gallery"),
                owl.parent().find(".previous").on("click.swr3.gallery", function() {
                    $(this).hasClass("disabled") || owl.trigger("owl.prev")
                }),
                owl.parent().find(".restart").off("click.swr3.gallery"),
                owl.parent().find(".restart").on("click.swr3.gallery", function() {
                    owl.trigger("owl.goTo", 0)
                })
            })
        },
        startEventlistener: function() {
            $(document).on("pjax:complete pjax:popstate", $.proxy(this._initialize, this))
        }
    },
    swr3.Gallery.initialize()
}(window.jQuery);
!function($) {
    swr3.Copyrights = {
        templates: {},
        initialize: function() {
            this.templates.legal = function(obj) {
                var __p = "";
                Array.prototype.join;
                with (obj || {})
                    __p += '<div id="legal" style="display: none;">\n<h5>Bildrechte auf dieser Seite</h5>\n<ul>\n</ul>\n<p class="pull-right"><a href="#" data-copyright-toggle>Bereich schließen</p>\n</div>';
                return __p
            }
            ,
            this.templates.row = function(obj) {
                var __t, __p = "";
                Array.prototype.join;
                with (obj || {})
                    __p += '<li class="row">\n<div class="col-xs-4 col-sm-3"><img src="' + (null  == (__t = src) ? "" : __t) + '" srcset="' + (null  == (__t = srcset) ? "" : __t) + '" sizes="' + (null  == (__t = sizes) ? "" : __t) + '" alt="" class="img-responsive" /></div>\n<div class="col-xs-8 col-sm-9"> ' + (null  == (__t = text) ? "" : __t) + " </div>\n</li>";
                return __p
            }
            ,
            $(document).on("click", "#showcopyrights, [data-copyright-toggle]", $.proxy(this.handleClick, this)),
            $(document).on("pjax:complete pjax:popstate", $.proxy(this.remove, this))
        },
        render: function() {
            this.$legal = $(this.templates.legal()),
            $("#footer").find(".container").append(this.$legal);
            var $ul = this.$legal.find("ul");
            $("main img").not('[src*="xiti.com/"], [src*="de.ioam.de/"], [src*="ping.chartbeat.net/"], [src*="google-analytics.com/"], [src*="/cmwebapp/"], [src*="/osm/"], [src*="/static/swrplayer"], [src^="data:"]').each($.proxy(function(index, el) {
                0 == $(el).closest(".nocopyright").length && "undefined" != typeof $(el).attr("src") && $ul.append(this.templates.row({
                    src: $(el).attr("src"),
                    srcset: $(el).attr("srcset") || "",
                    sizes: $(el).attr("sizes") || "",
                    text: $(el).attr("alt")
                }))
            }, this)),
            this.$legal.appendTo($("#footer").find(".container").first()).fadeIn(218),
            $.scrollTo("#footer", 218, {
                offsetTop: -1 * $("#header").outerHeight()
            })
        },
        handleClick: function(e) {
            e.preventDefault(),
            $(e.target).blur(),
            $(document).trigger("swr3:pixel:pageview"),
            this.$legal && this.$legal.filter(":visible") ? this.remove() : this.render()
        },
        remove: function() {
            this.$legal && this.$legal.filter(":visible") && (this.$legal.fadeOut(218, function() {
                $(this).remove()
            }),
            this.$legal = void 0)
        }
    },
    swr3.Copyrights.initialize()
}(window.jQuery);
!function($) {
    $("#eilmeldung").on("close.bs.alert", function(e) {
        var a = $(e.target);
        a = 0 < a.length ? a.attr("id").split("-")[1] : !1;
        var ids = $.cookie("eilmeldungen") || "";
        ids = ids ? ids.split(",") : [],
        a && (ids.push(a),
        $.cookie("eilmeldungen", ids.join(","), {
            path: "/"
        }))
    }),
    swr3.Breakingnews = {
        ids: [],
        templates: {},
        initialize: function() {
            this.templates.news = function(obj) {
                var __t, __p = "";
                Array.prototype.join;
                with (obj || {})
                    __p += '<div id="eilmeldung-' + (null  == (__t = id) ? "" : __t) + '" data-cs="' + (null  == (__t = cs) ? "" : __t) + '" class="alert alert-dismissible" role="alert">\n<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>\n<h4>SWR3 Eilmeldung</h4>\n<p>' + (null  == (__t = text) ? "" : __t) + ' <a href="' + (null  == (__t = link) ? "" : __t) + '">Weitere Nachrichten…</a></p>\n</div>';
                return __p
            }
            ;
            var ids = $.cookie("eilmeldungen") || "";
            this.ids = ids ? ids.split(",") : [],
            $(document).on("swr3:data-update", $.proxy(function() {
                this._update()
            }, this))
        },
        _update: function() {
            var data = swr3.Data.get("breakingnews");
            data && this._insert(data)
        },
        _insert: function(data) {
            data && 0 < data.length && $.each(data, $.proxy(function(id, message) {
                var ids = $.cookie("eilmeldungen") || "";
                ids = ids ? ids.split(",") : [],
                -1 === $.inArray(message.id, ids) && -1 === $.inArray(message.id, this.ids) ? ($(this.templates.news({
                    id: message.id,
                    text: message.content,
                    link: message.url,
                    cs: message.cs || ""
                })).appendTo("#eilmeldung"),
                this.ids.push(message.id),
                breakingnews[message.id] = window.setTimeout($.proxy(function() {
                    $("#eilmeldung-" + message.id + " button.close").click()
                }, this), 9e5)) : (null  == message.content && ($("#eilmeldung-" + message.id + " button.close").click(),
                window.clearTimeout(breakingnews[message.id])),
                message.cs != $("#eilmeldung-" + message.id).attr("data-cs") && $("#eilmeldung-" + message.id).replaceWith($(this.templates.news({
                    id: message.id,
                    text: message.content,
                    link: message.url,
                    cs: message.cs || ""
                }))))
            }, this))
        }
    },
    breakingnews = [],
    swr3.Breakingnews.initialize()
}(window.jQuery);
!function($) {
    swr3.Shortnews = {
        initialize: function() {
            this.startEventlistener(),
            this._initialize()
        },
        owlAfterAction: function(elem) {
            var $container = $(elem).parent()
              , $previous = $container.find(".previous")
              , $next = $container.find(".next");
            0 == this.currentItem ? $previous.addClass("disabled") : $previous.removeClass("disabled"),
            this.maximumItem == this.currentItem ? $next.addClass("disabled") : $next.removeClass("disabled");
            var $container = $(elem).closest(".shortnews").find(".nav")
              , $element = $container.find('a[href="#' + $(this.$userItems[this.currentItem]).attr("id") + '"]');
            $container.find(".active").closest("li").removeClass("active"),
            $element.closest("li").addClass("active")
        },
        _initialize: function() {
            var self = this;
            $(".shortnews").each(function() {
                var owl = $(this).find(".tab-content")
                  , items = owl.children();
                owl.owlCarousel({
                    navigation: !1,
                    pagination: !1,
                    slideSpeed: 218,
                    paginationSpeed: 218,
                    singleItem: !0,
                    goToFirstSpeed: 218,
                    autoHeight: !1,
                    afterAction: self.owlAfterAction
                }),
                owl.parent().find(".next").off("click.swr3.shortnews"),
                owl.parent().find(".next").on("click.swr3.shortnews", function() {
                    $(this).hasClass("disabled") || owl.trigger("owl.next")
                }),
                owl.parent().find(".previous").off("click.swr3.shortnews"),
                owl.parent().find(".previous").on("click.swr3.shortnews", function() {
                    $(this).hasClass("disabled") || owl.trigger("owl.prev")
                }),
                $(this).find(".nav").off("click.swr3.shortnews"),
                $(this).find(".nav").on("click.swr3.shortnews", "a", function(event) {
                    if (event.preventDefault(),
                    $(event.target).hasClass("disabled"))
                        return !0;
                    var index = items.index(items.filter($(event.target).attr("href")));
                    owl.trigger("owl.goTo", index),
                    $(document).trigger("swr3:pixel:pageview")
                })
            })
        },
        startEventlistener: function() {
            $(document).on("pjax:complete pjax:popstate", $.proxy(this._initialize, this))
        }
    },
    swr3.Shortnews.initialize()
}(window.jQuery);
!function($) {
    swr3.Share = {
        shares: {
            facebook: 0,
            twitter: 0,
            googleplus: 0,
            pinterest: 0
        },
        initialize: function() {
            this.startEventlistener(),
            this._initialize()
        },
        _initialize: function() {
            return 0 == $("main [data-share]").length ? !1 : (swr3.isMobile() || $(".btn-share-whatsapp").remove(),
            "www.swr3.de" != location.hostname ? !1 : void $.ajax({
                dataType: "json",
                url: "/ext/actions/share",
                data: {
                    url: 0 != $("link[rel=canonical]").length ? $("link[rel=canonical]").first().attr("href") : "http://www.swr3.de"
                },
                success: function(response) {
                    $.each(response, function(service, shares) {
                        0 != shares && $('[data-share="' + service + '"] > span:last-child').text(shares)
                    })
                }
            }))
        },
        startEventlistener: function() {
            $(document).on("pjax:complete pjax:popstate", $.proxy(this._initialize, this)),
            $(document).on("click", "[data-share]", $.proxy(function(event) {
                event.preventDefault();
                var service = $(event.target).closest("[data-share]").data("share");
                this.share(service)
            }, this))
        },
        share: function(service) {
            var url = location.origin + location.pathname;
            switch (service) {
            case "facebook":
                $(document).trigger("swr3:pixel:social", {
                    network: "Facebook",
                    action: "Post",
                    title: document.title
                }),
                window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url + (url.match(/\#/) ? "&" : "#") + "utm_source=Facebook&utm_medium=referral&utm_campaign=SWR3%2Ede%20like"), "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=626,height=436");
                break;
            case "twitter":
                $(document).trigger("swr3:pixel:social", {
                    network: "Twitter",
                    action: "Tweet",
                    title: document.title
                }),
                window.open("https://twitter.com/share?related=SWR3&dnt=true&lang=de&via=SWR3&url=" + encodeURIComponent(url + (url.match(/\#/) ? "&" : "#") + "utm_source=Twitter&utm_medium=referral&utm_campaign=SWR3%2Ede%20like"), "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=550,height=450");
                break;
            case "googleplus":
                $(document).trigger("swr3:pixel:social", {
                    network: "Google",
                    action: "Post",
                    title: document.title
                }),
                window.open("https://plus.google.com/share?url=" + encodeURIComponent(url + (url.match(/\#/) ? "&" : "#") + "utm_source=Google%2B&utm_medium=referral&utm_campaign=SWR3%2Ede%20like") + "&hl=de", "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=600,height=460");
                break;
            case "whatsapp":
                $(document).trigger("swr3:pixel:social", {
                    network: "Whatsapp",
                    action: "Message",
                    title: document.title
                }),
                window.open("whatsapp://send?text=" + url + (url.match(/\#/) ? "&" : "#") + "utm_source=Whatsapp%2B&utm_medium=referral&utm_campaign=SWR3%2Ede%20like", "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=600,height=460");
                break;
            case "pinterest":
                $(document).trigger("swr3:pixel:social", {
                    network: "Pinterest",
                    action: "Pin",
                    title: document.title
                }),
                window.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(url + (url.match(/\#/) ? "&" : "#") + "utm_source=Pinterest&utm_medium=referral&utm_campaign=SWR3%2Ede%20share"), "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=632,height=270");
                break;
            case "tumblr":
                $(document).trigger("swr3:pixel:social", {
                    network: "Tumblr",
                    action: "Post",
                    title: document.title
                }),
                window.open("http://www.tumblr.com/share/photo?click_thru=" + encodeURIComponent(url) + (url.match(/\#/) ? "&" : "#") + "utm_source=Tumblr&utm_medium=referral&utm_campaign=SWR3%2Ede%20share", "", "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=450,height=430");
                break;
            case "email":
                $(document).trigger("swr3:pixel:social", {
                    network: "E-Mail",
                    action: "Send",
                    title: document.title
                }),
                window.setTimeout(function() {
                    window.location.href = "mailto:?subject=" + encodeURIComponent("Schau dir das mal an") + "&body=" + encodeURIComponent("Schau mal, was ich auf SWR3.de gefunden habe:\r\n\r\n<" + url + (url.match(/\#/) ? "&" : "#") + "utm_source=E-Mail&utm_medium=email&utm_campaign=SWR3%2Ede%20like>\r\n\r\n")
                }, 100)
            }
        }
    },
    swr3.Share.initialize()
}(window.jQuery);
!function($) {
    var offset = 300
      , offsetOpacity = 1200
      , scrollTopDuration = 654
      , $backToTop = $(".back-to-top");
    $(window).on("scroll ready pjax:complete pjax:popstate", function() {
        $(this).scrollTop() > offset ? $backToTop.addClass("back-to-top-is-visible") : $backToTop.removeClass("back-to-top-is-visible back-to-top-fade-out"),
        $(this).scrollTop() > offsetOpacity && $backToTop.addClass("back-to-top-fade-out")
    }),
    $backToTop.on("click", function(event) {
        event.preventDefault(),
        $("body,html").animate({
            scrollTop: 0
        }, scrollTopDuration)
    })
}(window.jQuery);
!function($) {
    if (0 != $(".anchor-navigation").length) {
        var $document = $(document)
          , $anchorNav = $(".anchor-navigation")
          , $container = $anchorNav.parent(".container")
          , navHeight = $anchorNav.outerHeight();
        $document.on("scroll resize ready pjax:complete pjax:popstate", function() {
            var headerHeight = $("#header").outerHeight()
              , containerY1 = $container.offset().top - headerHeight
              , containerY2 = containerY1 + $container.height() - navHeight - headerHeight
              , containerY3 = $container.height() - navHeight - headerHeight;
            document.body.scrollTop > containerY1 && document.body.scrollTop < containerY2 ? $anchorNav.css({
                position: "fixed",
                top: headerHeight / 10 + "rem"
            }) : document.body.scrollTop > containerY1 && document.body.scrollTop > containerY2 ? $anchorNav.css({
                position: "absolute",
                top: containerY3 / 10 + "rem"
            }) : $anchorNav.css({
                position: "",
                top: ""
            })
        }),
        $anchorNav.on("click", "a", function(event) {
            event.preventDefault(),
            $("body, html").animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 218)
        })
    }
}(window.jQuery);
!function($) {
    swr3.Traffic = {
        map: void 0,
        options: {
            mapId: "trafficMap",
            tileServerUrl: "http://{s}.swr3.de/osm/{z}/{x}/{y}.png",
            subdomains: ["static-1", "static-2", "static-3", "static-4"],
            attribution: '<a href="//www.swr3.de" target="_top" rel="nofollow">SWR3</a> Verkehrszentrum | &copy; <a href="//www.openstreetmap.org/copyright" target="_blank" rel="nofollow">OpenStreetMap</a>-Mitwirkende',
            boundingBox: !0,
            boundingBoxSouthWestLat: 45.2948954387,
            boundingBoxSouthWestLng: 1.396340847,
            boundingBoxNorthEeastLat: 56.1660648848,
            boundingBoxNorthEastLng: 18.9734954834,
            minZoom: 6,
            maxZoom: 16,
            doubleClickZoom: !0,
            mapControl: !0,
            mapControlOptions: {
                position: "topright",
                controlClass: "map-control",
                closed: !1,
                controlTemplate: '<div class="map-control-burger"><i class="icon-burger"></i></div><div class="map-control-content">{controlGroupList}</div>',
                controlGroupTemplate: '<div class="map-control-group"><h3>{control_group_name}</h3><ul class="filter-list">{filter_list}</ul></div>',
                filterTemplate: '<li class="map-control-filter"><label><input type="checkbox" name="{control_group}" value="{filter}" {selected}> {filter_name}</label>{legend}</li>',
                filterSelectedTemplate: 'checked="checked"',
                burgerClass: "map-control-burger",
                burgerElementClass: "icon-burger",
                groups: {
                    street_type: {
                        name: "Stra&szlig;entyp",
                        filter_type: "properties",
                        filter: {
                            m1road: {
                                name: "Autobahnen"
                            },
                            aroad: {
                                name: "Bundesstra&szlig;en"
                            },
                            street: {
                                name: "Weitere Straße und Stadtgebiete"
                            }
                        }
                    },
                    category_id: {
                        name: "St&ouml;rungsart",
                        filter_type: "layer",
                        filter: {
                            traffic_jam: {
                                name: "Stau",
                                enabled: !0
                            },
                            construction_area: {
                                name: "Baustellen",
                                enabled: !0
                            },
                            warning: {
                                name: "Gefahr",
                                enabled: !1
                            }
                        }
                    }
                }
            },
            layer: {
                warning: {
                    name: "Gefahr",
                    label: "Gefahr",
                    iconUrl: "http://wraps.swr3.de/ext/traffic/img/caution.svg",
                    iconAnchor: [24, 24],
                    style: {
                        color: "#000000",
                        weight: "10",
                        opacity: ".8"
                    }
                },
                traffic_jam: {
                    name: "Stau",
                    label: "Stau",
                    iconUrl: "http://wraps.swr3.de/ext/traffic/img/traffic_jam.svg",
                    iconAnchor: [24, 24],
                    style: {
                        color: "#000000",
                        weight: "10",
                        opacity: ".8"
                    }
                },
                construction_area: {
                    name: "Baustellen",
                    label: "Baustellen",
                    iconUrl: "http://wraps.swr3.de/ext/traffic/img/construction.svg",
                    iconAnchor: [24, 24],
                    style: {
                        color: "#000000",
                        weight: "10",
                        opacity: ".8"
                    }
                }
            },
            defaults: {
                groups: {
                    street_type: {
                        filter: {
                            traffic_jam: {
                                checked: !0
                            }
                        }
                    },
                    category_id: {
                        filter: {
                            m1road: {
                                checked: !0
                            }
                        }
                    },
                    states: {
                        filter: {}
                    }
                }
            }
        },
        initialize: function() {
            this.startEventlistener(),
            this._initialize()
        },
        _initialize: function() {
            return 0 == $("#trafficJSON").length && 0 == $("#" + swr3.Traffic.options.mapId).length ? !1 : (this.layer = new Object,
            this.feature = new Object,
            this.road = [],
            this.visibleFeature = new Object,
            this.roadFilters = [],
            this.firstRun = !0,
            this.busy = !1,
            this._setupMap(),
            void this._updateLayerData())
        },
        startEventlistener: function() {
            $(document).on("pjax:complete pjax:popstate", $.proxy(this._initialize, this)),
            $(document).on("click", "[data-osm-id]", $.proxy(function(event) {
                event.preventDefault(),
                this.showOnMap({
                    id: $(event.currentTarget).attr("data-osm-id"),
                    group: $(event.currentTarget).attr("data-osm-group")
                })
            }, this))
        },
        _updateItems: function() {
            "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this),
            this.options.mapControl && this._updateMapControl(),
            "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this)
        },
        _updateMapControl: function() {
            "undefined" != typeof this.mapControl && this.map.removeControl(this.mapControl),
            this.mapControl = L.Control.extend({
                options: {
                    position: this.options.mapControlOptions.position
                },
                onAdd: $.proxy(function() {
                    var control = L.DomUtil.create("div", this.options.mapControlOptions.controlClass)
                      , controlGroup = new Object
                      , controlGroupList = "";
                    return $.each(this.options.mapControlOptions.groups, $.proxy(function(key, group) {
                        controlGroup = this.options.mapControlOptions.controlGroupTemplate;
                        var controlFilter = new Object
                          , filterList = "";
                        $.each(group.filter, $.proxy(function(filterKey, filter) {
                            var selected = "";
                            "undefined" != typeof this.options.defaults.groups[key] && "undefined" != typeof this.options.defaults.groups[key].filter[filterKey] && "undefined" != typeof this.options.defaults.groups[key].filter[filterKey].checked && 1 == this.options.defaults.groups[key].filter[filterKey].checked && (selected = this.options.mapControlOptions.filterSelectedTemplate),
                            (filter.enabled === !0 || "undefined" == typeof filter.enabled) && ("undefined" == typeof filter.legend && (filter.legend = ""),
                            controlFilter = this.options.mapControlOptions.filterTemplate,
                            controlFilter = controlFilter.replace(/{legend}/g, filter.legend),
                            controlFilter = controlFilter.replace(/{filter_name}/g, filter.name),
                            controlFilter = controlFilter.replace(/{filter}/g, filterKey),
                            controlFilter = controlFilter.replace(/{selected}/g, selected),
                            filterList += controlFilter)
                        }, this)),
                        controlGroup = controlGroup.replace(/{filter_list}/g, filterList),
                        controlGroup = controlGroup.replace(/{control_group_name}/g, group.name),
                        controlGroup = controlGroup.replace(/{control_group}/g, key),
                        controlGroupList += controlGroup
                    }, this)),
                    control.innerHTML = this.options.mapControlOptions.controlTemplate.replace(/{controlGroupList}/g, controlGroupList),
                    L.DomEvent.addListener(control, "click", $.proxy(function(e) {
                        var control = this
                          , target = e.target || e.srcElement;
                        if ($(target).data("triggered") !== !0) {
                            var textfilter = $("#street_traffic_filter").find('input[type="checkbox"][value="' + $(target).attr("value") + '"]');
                            textfilter.data("triggered", !0),
                            textfilter.trigger("click")
                        }
                        if ($(target).data("triggered", !1),
                        $("." + this.options.mapControlOptions.controlClass).hasClass("trigger"))
                            $("." + this.options.mapControlOptions.controlClass).removeClass("trigger");
                        else {
                            var target = e.target || e.srcElement;
                            ($(target).hasClass(this.options.mapControlOptions.burgerClass) || $(target).hasClass(this.options.mapControlOptions.burgerElementClass) || $(target).closest(".leaflet-control").hasClass("closed")) && $(target).closest(".leaflet-control").toggleClass("closed")
                        }
                        $.each(this.options.mapControlOptions.groups, $.proxy(function(key) {
                            $(control).find("input[name=" + key + "]").each($.proxy(function(inputKey, input) {
                                $(input).is(":checked") ? this.options.mapControlOptions.groups[key].filter[$(input).val()].checked = !0 : this.options.mapControlOptions.groups[key].filter[$(input).val()].checked = !1
                            }, this))
                        }, this)),
                        this._updateLayerData()
                    }, this)),
                    control
                }, this)
            }),
            this.map.addControl(new this.mapControl),
            this.options.mapControlOptions.closed === !0 && $(".leaflet-control.map-control").addClass("closed")
        },
        _updateLayerData: function() {
            var jsonString = $("#trafficJSON").get(0).innerHTML;
            this.geoJson = $.parseJSON(jsonString),
            this.layerData = new Object,
            this.layerData.features = new Object;
            var id = 0;
            if ($.each(this.geoJson.features, $.proxy(function(key, feature) {
                this.layerData.features[id] = feature,
                id += 1
            }, this)),
            this._clearLayerGroups(),
            this._prepareGeoJsonLayer(),
            this._addGeoJsonLayer(),
            "undefined" != typeof this.layersControl)
                try {
                    this.layersControl.removeFrom(this.map)
                } catch (e) {}
            if (!("traffic_jam" in this.layer)) {
                var layerGroup = new L.LayerGroup;
                this.layer.traffic_jam = {
                    layerGroup: layerGroup,
                    name: "Staus"
                }
            }
            if (!("construction_area" in this.layer)) {
                var layerGroup = new L.LayerGroup;
                this.layer.construction_area = {
                    layerGroup: layerGroup,
                    name: "Baustellen"
                }
            }
            this.layersControl = L.control.layers(null , {
                '<img src="http://wraps.swr3.de/ext/traffic/img/traffic_jam.svg" title="" alt="" class="nocopyright"> Staus': this.layer.traffic_jam.layerGroup,
                '<img src="http://wraps.swr3.de/ext/traffic/img/construction.svg" title="" alt="" class="nocopyright"> Baustellen': this.layer.construction_area.layerGroup
            }, {
                collapsed: !1
            }),
            this.layersControl.addTo(this.map)
        },
        _clearLayerGroups: function() {
            $.each(this.layer, function(key, layer) {
                layer.layerGroup.clearLayers()
            }),
            this.layer = new Object,
            this.feature = new Object,
            this.visibleFeature = new Object,
            this.roadFilters = [],
            this.road = []
        },
        _prepareGeoJsonLayer: function() {
            $.each(this.layerData.features, $.proxy(function(key, data) {
                if ("undefined" == typeof data.properties.key && (data.properties.key = this.options.featureKey),
                "undefined" == typeof this.layer[data.properties[data.properties.key]]) {
                    if ("undefined" != typeof this.options.layer[data.properties[data.properties.key]])
                        var iconUrl = this.options.layer[data.properties[data.properties.key]].iconUrl
                          , iconAnchor = this.options.layer[data.properties[data.properties.key]].iconAnchor
                          , style = this.options.layer[data.properties[data.properties.key]].style;
                    else
                        var iconUrl = !1
                          , iconAnchor = !1
                          , style = {};
                    if ("undefined" != typeof this.options.layer[data.properties[data.properties.key]]) {
                        if ("undefined" != typeof this.options.layer[data.properties[data.properties.key]].awesomeIcon)
                            var awesomeIcon = this.options.layer[data.properties[data.properties.key]].awesomeIcon
                    } else
                        var awesomeIcon = !1;
                    this._addLayer({
                        key: data.properties[data.properties.key],
                        name: data.properties.category,
                        state: data.properties.states,
                        data: new Array,
                        iconAnchor: iconAnchor,
                        iconUrl: iconUrl,
                        awesomeIcon: awesomeIcon,
                        style: style
                    })
                }
                "undefined" != typeof data.geometry && this.layer[data.properties[data.properties.key]].data.push(data)
            }, this))
        },
        _addLayer: function(options) {
            if (0 != options.awesomeIcon && "undefined" != typeof options.awesomeIcon)
                var icon = L.AwesomeMarkers.icon(options.awesomeIcon);
            else
                var icon = L.icon({
                    iconAnchor: options.iconAnchor,
                    iconUrl: options.iconUrl,
                    className: options.key
                });
            var layerGroup = new L.LayerGroup;
            this.layer[options.key] = {
                layerGroup: layerGroup,
                name: options.name,
                state: options.state,
                data: options.data,
                icon: icon,
                style: options.style
            },
            "construction_area" != options.key && this.layer[options.key].layerGroup.addTo(this.map)
        },
        _addGeoJsonLayer: function() {
            var messageElementTemplate = "<p>{element_text} <br /><small>&mdash; seit {created_at}&nbsp;Uhr</small></p>";
            $.each(this.layer, $.proxy(function(key, layer) {
                if (layer.data.length > 0 && "undefined" != typeof layer.data[0].geometry) {
                    var geoJsonLayer = L.geoJson(layer.data, {
                        pointToLayer: function(feature, latLng) {
                            "undefined" != typeof feature.properties.icon_url && (layer.icon.options.iconUrl = feature.properties.icon_url),
                            "undefined" != typeof feature.properties.icon_anchor && (layer.icon.options.iconAnchor = feature.properties.icon_anchor);
                            var marker = new L.Marker(latLng,{
                                icon: layer.icon
                            });
                            return marker
                        },
                        style: function(feature) {
                            var style = layer.style;
                            return "undefined" != typeof feature.properties.color && ($.extend(style, {}, {
                                className: feature.properties.street_type + " road_" + feature.properties.street_name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
                            }),
                            $.extend(style, {}, {
                                color: feature.properties.color
                            })),
                            style
                        },
                        onEachFeature: $.proxy(function(feature, layer) {
                            var messageElement = messageElementTemplate;
                            if (messageElement = this._addTrafficElement(messageElement, /{street_name}/g, feature.properties.street_name),
                            messageElement = this._addTrafficElement(messageElement, /{element_text}/g, feature.properties.description),
                            messageElement = this._addTrafficElement(messageElement, /{created_at}/g, feature.properties.created_at),
                            layer.bindPopup(messageElement),
                            "LineString" == layer.feature.geometry.type || "MultiLineString" == layer.feature.geometry.type) {
                                if (latLngs = "MultiLineString" == layer.feature.geometry.type ? layer.getLatLngs()[Math.round(layer.getLatLngs().length / 2)] : layer.getLatLngs(),
                                markerId = Math.round($(latLngs).length / 2),
                                "undefined" != typeof this.layer[layer.feature.properties[layer.feature.properties.key]].icon.options.iconUrl && 0 != this.layer[layer.feature.properties[layer.feature.properties.key]].icon.options.iconUrl)
                                    var icon = this.layer[layer.feature.properties[layer.feature.properties.key]].icon
                                      , marker = L.marker([latLngs[markerId].lat, latLngs[markerId].lng], {
                                        icon: icon
                                    });
                                else
                                    var marker = L.marker([latLngs[markerId].lat, latLngs[markerId].lng]);
                                "undefined" != typeof feature.properties.description && marker.bindPopup(messageElement),
                                this.layer[key].layerGroup.addLayer(marker)
                            }
                        }, this)
                    });
                    layer.layerGroup.addLayer(geoJsonLayer)
                }
            }, this))
        },
        _addTrafficElement: function(messageElement, key, data, spacer) {
            if ("undefined" != typeof data) {
                if (data instanceof Array) {
                    var values = "";
                    $.each(data, function(key, value) {
                        values = values + spacer + value
                    }),
                    data = values
                }
            } else
                data = "";
            return messageElement.replace(key, data)
        },
        _setupMap: function() {
            if (this.options.boundingBox === !0)
                var southWestBound = L.latLng(this.options.boundingBoxSouthWestLat, this.options.boundingBoxSouthWestLng)
                  , northEastBound = L.latLng(this.options.boundingBoxNorthEeastLat, this.options.boundingBoxNorthEastLng)
                  , bounds = L.latLngBounds(southWestBound, northEastBound);
            else
                var bounds = !1;
            if (this.options.center === !0)
                var center = [this.options.centerLat, this.options.centerLng];
            else
                var center = !1;
            var subdomains = [];
            if ($.each(this.options.subdomains, function(key, value) {
                subdomains.push(value)
            }),
            this.map = L.map(this.options.mapId, {
                center: center,
                maxBounds: bounds,
                zoom: this.options.maxZoom,
                minZoom: this.options.minZoom,
                maxZoom: this.options.maxZoom,
                doubleClickZoom: this.options.doubleClickZoom,
                scaleControl: !1,
                attributionControl: !1,
                layers: [L.tileLayer(this.options.tileServerUrl, {
                    reuseTiles: !0,
                    unloadInvisibleTiles: !0,
                    attribution: this.options.attribution,
                    subdomains: subdomains
                })]
            }),
            L.control.attribution({
                prefix: !1
            }).addTo(this.map),
            $("#trafficMap").attr("data-osm-bbox")) {
                var initialBoundingBox = $.parseJSON($("#trafficMap").attr("data-osm-bbox") || "{}");
                if (4 != initialBoundingBox.length)
                    return !1;
                var southWest = L.latLng(initialBoundingBox[1], initialBoundingBox[0])
                  , northEast = L.latLng(initialBoundingBox[3], initialBoundingBox[2])
                  , bounds = L.latLngBounds(southWest, northEast);
                this.map.fitBounds(bounds)
            }
            this.map.on("popupopen", $.proxy(function() {
                this._pixel("Map popupopen")
            }, this)),
            this.map.on("popupclose", $.proxy(function() {
                this._pixel("Map popupclose")
            }, this)),
            this.map.on("dragend", $.proxy(function() {
                this._pixel("Map dragend")
            }, this)),
            this.map.on("zoomend", $.proxy(function() {
                this._pixel("Map zoomend")
            }, this))
        },
        _pixel: function() {
            if (1 == this.pixelBusy)
                return !1;
            this.pixelBusy = !0;
            try {
                $(document).trigger("swr3:pixel:pageview")
            } catch (e) {}
            window.setTimeout($.proxy(function() {
                this.pixelBusy = !1
            }, this), 500)
        },
        afterUpdate: function() {},
        afterMapMove: function() {},
        showOnMap: function(options) {
            var self = this;
            return options.group && self.layer.hasOwnProperty(options.group) && !self.layer[options.group].layerGroup._map && self.layer[options.group].layerGroup.addTo(self.map),
            self.displayOnMapHandler = window.setInterval(function() {
                window.clearInterval(self.displayOnMapHandler),
                $.each(self.map._layers, function(key, layer) {
                    if ("undefined" != typeof layer.feature && "undefined" != typeof options.id && "undefined" != typeof layer.feature.id && options.id.replace(/[^a-zA-Z0-9]/g, "_") == layer.feature.id.replace(/[^a-zA-Z0-9]/g, "_")) {
                        var top = $("#" + self.options.mapId).offset().top - parseInt($("#oc-wrapper").css("padding-top"), 10) - $(window).height() / 100;
                        $("html, body").animate({
                            scrollTop: top
                        }, 218, "swing", function() {
                            "function" == typeof layer.getBounds ? self.map.fitBounds(layer.getBounds()) : "function" == typeof layer.getLatLng && (self.map.setZoom(self.options.minZoom + 1, {
                                animate: !0
                            }),
                            window.setTimeout(function() {
                                self._pixel(),
                                self.map.setView(layer.getLatLng(), 16, {
                                    zoom: {
                                        animate: !0
                                    },
                                    pan: {
                                        animate: !0
                                    }
                                })
                            }, 218))
                        })
                    }
                })
            }, 5),
            !0
        }
    },
    swr3.Traffic.initialize()
}(window.jQuery);
!function($) {
    swr3.Scribblelive = {
        initialize: function() {
            this.startEventlistener(),
            this._initialize()
        },
        _initialize: function() {
            if (this.posts = "[]",
            this.currentPost = 0,
            0 != $("#scribblelive").length) {
                var $blog = $("#scribblelive");
                this.$post = $("#scribblelive-posts"),
                this.posts = $.parseJSON($blog.find("script").get(0).innerHTML || "[]"),
                0 != this.posts.length && this._renderPost()
            }
        },
        startEventlistener: function() {
            $(document).on("pjax:complete pjax:popstate", $.proxy(this._initialize, this)),
            $(document).on("click", '[data-toggle="scribblelive-prev"]', $.proxy(function(event) {
                event.preventDefault(),
                this._previousPost()
            }, this)),
            $(document).on("click", '[data-toggle="scribblelive-next"]', $.proxy(function(event) {
                event.preventDefault(),
                this._nextPost()
            }, this)),
            $(document).on("click", "#scribblelive-posts a[href]", $.proxy(function(event) {
                var $element = $(event.currentTarget);
                $element.attr("href").indexOf("www.swr3.de") < 0 && "#" != $element.attr("href") && (event.preventDefault(),
                window.open($element.attr("href")))
            }, this))
        },
        _setupJWPlayer: function(options) {
            var jwplayer_ScibbleLive = function() {
                ("undefined" == typeof jwplayer.key || "" == jwplayer.key) && (jwplayer.key = "KnSMJe5vrsOSK5ycUPCv0OU6J9zTtSr5azwqo8Iwdg4xPdRB"),
                jwplayer("flashPlayerScibbleLive").setup(jQuery.extend(!0, {}, options))
            }
            ;
            "undefined" == typeof jwplayer ? "undefined" != typeof document.jwplayersPending ? document.jwplayersPending.push(jwplayer_ScibbleLive) : console.error("could neither determine jwplayer-javascript-url from viewer nor was the jwplayer-object initialized by the page") : (jwplayer_ScibbleLive(),
            0 != $("#flashPlayerScibbleLiveChapterDiv").length && $("#flashPlayerScibbleLiveChapterDiv").css("visibility", "visible"))
        },
        _renderPost: function() {
            var post = this.posts[this.currentPost];
            this.$post.html(post.html),
            "undefined" != typeof post.movieOptions && 0 != $("#flashPlayerScibbleLive").length && this._setupJWPlayer(post.movieOptions),
            $(document).trigger("swr3:scribblelive:render")
        },
        _previousPost: function() {
            0 != this.posts.length && (this.currentPost -= 1,
            this.currentPost < 0 && (this.currentPost = this.posts.length - 1),
            this._renderPost(),
            $(document).trigger("swr3:pixel:pageview"))
        },
        _nextPost: function() {
            0 != this.posts.length && (this.currentPost += 1,
            this.currentPost >= this.posts.length && (this.currentPost = 0),
            this._renderPost(),
            $(document).trigger("swr3:pixel:pageview"))
        }
    },
    swr3.Scribblelive.initialize()
}(window.jQuery);
!function($) {
    swr3.gaOptout = function() {
        $.cookie(disableStr, !0, {
            path: "/",
            expires: new Date(2099,12,31,23,59,59)
        }),
        window[disableStr] = !0
    }
}(window.jQuery),
function() {
    return "undefined" == typeof webshims ? !1 : (webshims.setOptions("basePath", "/static/js/vendor/js-webshim/minified/shims/"),
    webshims.setOptions("waitReady", !1),
    webshims.setOptions("forms-ext", {
        types: "date"
    }),
    void webshim.polyfill("forms-ext picture"))
}(window.jQuery),
function($) {
    var owl = $("#owl_weather_forecast_cities");
    owl.owlCarousel({
        items: 4,
        itemsDesktop: [1200, 4],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsMobile: !1,
        slideSpeed: 218,
        autoPlay: !0,
        pagination: !1
    })
}(window.jQuery),
function($) {
    $(document).on("ready pjax:complete pjax:popstate", function() {
        $("form").filter('[action=""]').attr("action", window.location.href.replace(/\?.*/, "")).attr("action")
    })
}(window.jQuery),
function($) {
    $(document).on("ready pjax:complete pjax:popstate swr3:scribblelive:render", function() {
        window.setTimeout(picturefill, 500)
    })
}(window.jQuery),
function($) {
    $(document).on("click", "a", function(event) {
        (new RegExp("/export/(rss20|atom10|podcast)/").test($(event.currentTarget).attr("href")) || new RegExp("/cmwebapp/util/(download|redir).jsp").test($(event.currentTarget).attr("href")) || $(event.currentTarget).attr("rel") && -1 != $(event.currentTarget).attr("rel").indexOf("external")) && (event.preventDefault(),
        event.stopPropagation(),
        window.open($(event.currentTarget).attr("href"), "_blank"))
    })
}(window.jQuery),
function($) {
    swr3.isMobile() || $(document).on("ready pjax:complete pjax:popstate", function() {
        $('<iframe id="adventskalender" src="http://wraps.swr3.de/res/adventskalender/"/>').appendTo("#article-3605186.detail .jumbotron header > .image")
    })
}(window.jQuery);
//# sourceMappingURL=scripts.min.js.map
