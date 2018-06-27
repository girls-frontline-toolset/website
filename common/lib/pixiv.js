/**
 * @author <a href="https://www.pixiv.net/">pixiv</a>
 * @example
 * 1.
 * <script src="https://source.pixiv.net/source/embed.js" data-id="embedId" data-size="small|medium|large" data-border="on|off" charset="utf-8"></script>
 *
 * 2.
 * <div class="pixiv-embed" data-id="embedId" data-size="small|medium|large" data-border="on|off"></div>
 * ...
 * <script src="https://source.pixiv.net/source/embed.js" data-id="embedId" data-size="small|medium|large" data-border="on|off" charset="utf-8"></script>
 */
(function(w, d) {


    var __pixiv__ = w.__pixiv__ = w.__pixiv__ || {};

    if (__pixiv__.embed) {
        _makeContainer();

        return;
    }


    __pixiv__.embed = embed;

    var _url = 'https://embed.pixiv.net',
        _sizes = {
            large : [670, 550],
            medium: [360, 300],
            small : [190, 250]
        };

    function embed(target, options) {
        if (!target) {
            _load();
        }
        else {

            options = options || _getOption(target);

            options.border === 'on' ?
                _showEmbedBorder(target, options) :
                _showEmbed(target, options);
        }
    }

    function _initialize() {
        var handler = function(e) {
            var data, id, height;

            if (e.origin !== _url) {
                return;
            }
            try {
                data = JSON.parse(e.data);
                id = data[0];
                height = data[1];
                d.getElementById(id).height = height;
            }
            catch (error) {}
        };
        w.addEventListener && w.addEventListener('message', handler, false) ||
        w.attachEvent && w.attachEvent('onmessage', handler);

        __pixiv__.initialized = true;
    }

    function _load() {
        var targets = d.getElementsByTagName('div'),
            i = 0, target, options;
        for (; target = targets[i]; ++i) {
            if (
                target.className.indexOf('pixiv-embed') != -1 &&
                (options = _getOption(target)) &&
                options.done != 1
            ) {
                embed(target, options);
            }
        }
    }

    function _showEmbedBorder(target, options) {
        var iframe, size, id = _makeId();

        iframe = d.createElement('iframe');
        iframe.id = id;
        iframe.name = id;
        iframe.src = _url + '/embed_mk2.php?' + _param(options);
        size = _sizes[options.size];
        iframe.width = size[0] + (options.border == 'on' ? 30 : 0);
        iframe.height = size[1];
        iframe.frameBorder = 0;
        iframe.style.border = 'none';

        target.appendChild(iframe);
        target.setAttribute('data-done', 1);

        iframe.contentWindow.name = id; // IE7
    }

    function _showEmbed(target, options) {
        var script = d.createElement('script'),
            id = _makeId(),
            q = {
                callback : '__pixiv__["' + id + '"]',
                id       : options.id,
                size     : options.size
            };
        script.src = _url + '/embed_json.php?' + _param(q);
        script.charset = 'utf-8';
        d.getElementsByTagName('head')[0].appendChild(script);
        target.setAttribute('data-done', 1);

        __pixiv__[id] = function(data) {
            var url = _url + '/embed_mk2.php?' + _param(options),
                width = data.img_w + 10;

            target.innerHTML = [
                '<p class="pixiv-embed-illust" style="width:', width, 'px; margin: 0 auto; padding:5px 0; text-align:center; background-color:#dde6ee;">',
                '<iframe src="', url, '" width="', data.img_w, '" height="', data.img_h, '" frameborder="0" style="vertical-align:middle; border:none;"></iframe>',
                '</p>',
                '<p class="pixiv-embed-title" style="margin:0;">',
                '<a href="https://www.pixiv.net/member_illust.php?mode=medium&amp;illust_id=', data.img_id, '" target="_blank">',
                data.title,
                '</a>',
                '</p>',
                '<p class="pixiv-embed-meta" style="margin:0; font-size:85%;">',
                '<span class="pixiv-embed-author">',
                'by <a href="https://www.pixiv.net/member.php?id=', data.user_id, '" target="_blank">',
                data.user,
                '</a> ',
                '</span>',
                '<span class="pixiv-embed-datetime">', _escapeHTML(data.update), '</span> ',
                'on <a href="https://www.pixiv.net/" target="_blank">pixiv</a>',
                '</p>'
            ].join('');

            delete __pixiv__[id];
        };
    }

    function _makeContainer() {
        var script, div, options;

        script = d.getElementsByTagName('script');
        script = script[script.length - 1];
        if (!(options = _getOption(script))) {
            return;
        }

        div = d.createElement('div');
        div.className = 'pixiv-embed';
        div.setAttribute('data-id', options.id);
        div.setAttribute('data-size', options.size);
        div.setAttribute('data-border', options.border);

        script.parentNode.insertBefore(div, script);
    }

    function _makeId() {
        return 'pixiv-embed-' + Math.random();
    }

    function _getOption(target) {
        var id     = target.getAttribute('data-id'),
            size   = target.getAttribute('data-size'),
            border = target.getAttribute('data-border'),
            done   = target.getAttribute('data-done');
        return id && size && border ?
            {
                id    : id,
                size  : size,
                border: border,
                done  : done
            } :
            false;
    }

    function _param(queries) {
        var k, ret = [];
        for (k in queries) {
            ret.push(k + '=' + queries[k]);
        }
        return ret.join('&');
    }

    function _escapeHTML(str) {
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }


    _makeContainer();
    _initialize();

    w.addEventListener && w.addEventListener('load', _load, false) ||
    w.attachEvent && w.attachEvent('onload', _load);


})(this, document);