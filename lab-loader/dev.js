//-- code clip for google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-34856732-1']);
_gaq.push(['_setDomainName', 'icradle.net']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
// code clip for google analytics --//

(function (window, document, console, undefined) {
    $(function () {
        //-- helper functions
        // this function generates unique name strings by adding a prefix
        var _u = UNIQIT_GEN('xhll_');
        // helper functions --//

        /**
         * main function
         * this function does the following in order
         * 1. setup the visual interface (DOM structure)
         * 2. initialize the processing model (LC-3 object)
         * 3. bind visual object with processing model
         */
        var mainQueue = PQUEUE(null, [
            function config(queue, heap) {
                // debug options
                heap.skip_animation = false;
            },
            function framework_setup(queue, heap) {
                /* log container */
                var logCTNR = $('<div class="xhll_fw_logCTNR">').addClass('xhll_fw_fixFullWindow'),
                /* off-document container */
                    ofdCTNR = $('<div class="xhll_fw_ofdCTNR">').addClass('xhll_fw_fixFullWindow');
                
                heap.fw = {
                    version : '0.2.1',
                    /* hidden container */
                    hidden : {
                        container : $('<div class="xhll_fw_hidCTNR">')
                    },
                    /* background container */
                    background : {
                        container : $('<div class="xhll_fw_bkgCTNR">').addClass('xhll_fw_fixFullWindow').hide()
                    },
                    /* body container */
                    body : {
                        container : $('<div class="xhll_fw_bdyCTNR">').addClass('xhll_fw_fixFullWindow').hide()
                    },
                    /* cover container */
                    cover : {
                        container : $('<div class="xhll_fw_cvrCTNR">').addClass('xhll_fw_fixFullWindow').hide(),
                        logo : {
                            container : $('<div class="xhll_fw_cvr_logo">').hide(),
                            img : $('<img class="xhll_fw_cvr_logo_img">').hide()
                        },
                        statusBar : {
                            container : $('<div class="xhll_fw_cvr_statusbar">').hide(),
                            text : $('<label class="xhll_fw_cvr_statusbar_label">').hide(),
                            dots : [
                                $('<label class="xhll_fw_cvr_statusbar_label">').hide().text('.'),
                                $('<label class="xhll_fw_cvr_statusbar_label">').hide().text('.'),
                                $('<label class="xhll_fw_cvr_statusbar_label">').hide().text('.')
                            ]
                        }
                    }
                };
                
                /* build structure */
                $(window.document.body).append(
                    logCTNR,
                    heap.fw.hidden.container,
                    heap.fw.background.container,
                    heap.fw.body.container,
                    heap.fw.cover.container.append(
                        heap.fw.cover.logo.container.append(
                            heap.fw.cover.logo.img
                        ),
                        heap.fw.cover.statusBar.container.append(
                            heap.fw.cover.statusBar.text,
                            heap.fw.cover.statusBar.dots[0],
                            heap.fw.cover.statusBar.dots[1],
                            heap.fw.cover.statusBar.dots[2]
                        )
                    )
                );
                /* create private apis */
                heap.fw.cover.statusBar.dots.jump = function() {
                    heap.fw.cover.statusBar.dots[0]
                        .delay(300)
                        .animate({top: '-12px'}, 200)
                        .animate({top: '0'}, 150);
                    heap.fw.cover.statusBar.dots[1]
                        .delay(400)
                        .animate({top: '-12px'}, 200)
                        .animate({top: '0'}, 150);
                    heap.fw.cover.statusBar.dots[2]
                        .delay(500)
                        .animate({top: '-12px'}, 200)
                        .animate({top: '0'}, 150);
                };
                /* framework apis */
                heap.fw.loadingDotsJumpTimer = null;
                heap.fw.makeLoadingDotsJump = function() {
                    heap.fw.loadingDotsJumpTimer = window.setInterval(heap.fw.cover.statusBar.dots.jump, 2000);
                };
                heap.fw.makeLoadingDotsStop = function() {
                    window.clearInterval(heap.fw.loadingDotsJumpTimer);
                };
                
                /* log apis */
                heap.fw.console = {
                    log_base : function (msg, className, css) {
                        var newLog = $('<p>').text(msg);
                        if (className != undefined)
                            newLog.attr('class', className);
                        if (css != undefined)
                            newLog.css(css);
                        newLog.appendTo(logCTNR);
                    },
                    log : function (msg) {
                        heap.fw.console.log_base(msg, 'log');
                        console.log(msg);
                    },
                    warn : function (msg) {
                        heap.fw.console.log_base(msg, 'warn');
                        console.warn(msg);
                    }
                };
                heap.fw.console.log('iCradle Laboratory Loader version: ' + heap.fw.version);
                heap.fw.console.warn('Dummy Warning: Hello World!');
            },
            function framework_fadeInBackground(queue, heap) {
                if (heap.skip_animation === true) {
                    heap.fw.background.container.show();
                } else {
                    queue.pause();
                    heap.fw.background.container.fadeIn(300, queue.resume);
                }
            },
            function framework_showCover(queue, heap) {
                if (heap.skip_animation === true) {
                    heap.fw.cover.container.show();
                } else {
                    queue.pause();
                    heap.fw.cover.container.fadeIn(300, queue.resume);
                }
            },
            function framework_loadSiteLogo(queue, heap) {
                queue.pause();
                heap.fw.cover.logo.img
                    .error(function () {
                        heap.fw.console.warn('logo failed to load');
                    })
                    .load(queue.resume)
                    .attr('src', './img/xhll_fw_logo.png');
            },
            function framework_adjustSiteLogo(queue, heap)
            {
                heap.fw.cover.logo.img.show();
                var logo_css = {
                    height: '124px',
                    marginTop: '-62px'
                };
                if (heap.skip_animation === true) {
                    heap.fw.cover.css(logo_css);
                } else {
                    queue.pause();
                    heap.fw.cover.logo.container
                        .fadeIn(300)
                        .delay(1000)
                        .animate(logo_css, 300, queue.resume);
                }
            },
            function framework_showStatusBar(queue, heap)
            {
                heap.fw.cover.statusBar.text.text('starting').show();
                heap.fw.cover.statusBar.dots[0].show();
                heap.fw.cover.statusBar.dots[1].show();
                heap.fw.cover.statusBar.dots[2].show();
                heap.fw.cover.statusBar.container.fadeIn(300);
            },
            function framework_makeLoadingDotsJump(queue, heap) {
                heap.fw.makeLoadingDotsJump();
            },
            function loadModel(queue, heap) {
                if (typeof theModel !== 'function') {
                    heap.fw.console.warn('Unable to load model: theModel undefined.');
                } else {
                    heap.model = theModel(heap.fw.body.container, heap.fw.console);
                    heap.model_setup_feedback = function (message) {
                        heap.fw.cover.statusBar.text.text('loading model: ' + message);
                    };
                    queue.pause();
                    heap.model.setup(queue.resume, heap.model_setup_feedback);
                }
            },
            function loadView(queue, heap) {
                if (typeof theView !== 'function') {
                    heap.fw.console.warn('Unable to load view: theView undefined.');
                } else {
                    heap.view = theView(heap.fw.body.container, heap.fw.console);
                    heap.view_setup_feedback = function (message) {
                        heap.fw.cover.statusBar.text.text('loading view: ' + message);
                    };
                    queue.pause();
                    heap.view.setup(queue.resume, heap.view_setup_feedback);
                }
            },
            function loadControl(queue, heap) {
                if (typeof theControl !== 'function') {
                    heap.fw.console.warn('Unable to load control: theControl undefined.');
                } else {
                    heap.control = theControl(heap.fw.body.container, heap.fw.console);
                    heap.control_setup_feedback = function (message) {
                        heap.fw.cover.statusBar.text.text('loading control: ' + message);
                    };
                    queue.pause();
                    heap.control.setup(queue.resume, heap.control_setup_feedback);
                }
            },
            function connectMVC(queue, heap) {
                if (typeof heap.control === 'undefined') {
                    heap.connectMVC_error = 'Critical error: missing control.';
                    heap.fw.console.warn(heap.connectMVC_error);
                } else if (typeof heap.model === 'undefined') {
                    heap.connectMVC_error = 'Critical error: missing model.';
                    heap.fw.console.warn(heap.connectMVC_error);
                } else if (typeof heap.view === 'undefined') {
                    heap.connectMVC_error = 'Critical error: missing view.';
                    heap.fw.console.warn(heap.connectMVC_error);
                } else {
                    queue.pc.goto(queue.pc.locate('initializeApplication'));
                    heap.fw.cover.statusBar.text.text('finalizing setup');
                    heap.control.connectModel(heap.model);
                    heap.control.connectView(heap.view);
                }
            },
            function connectMVC_displayError(queue, heap) {
                queue.pause();
                alert(heap.connectMVC_error);
            },
            PQUEUE_BARRIER,
            function initializeApplication(queue, heap) {
                heap.fw.cover.statusBar.text.text('initializing application');
                heap.control.triggerEvent('loaded');
            },
            function framework_showBody(queue, heap) {
                heap.fw.body.container.show();
            },
            function framework_makeLoadingDotsStop(queue, heap) {
                heap.fw.makeLoadingDotsStop();
            },
            function framework_hideStatusBar(queue, heap)
            {
                heap.fw.cover.statusBar.text.text('').hide();
                heap.fw.cover.statusBar.dots[0].hide();
                heap.fw.cover.statusBar.dots[1].hide();
                heap.fw.cover.statusBar.dots[2].hide();
                heap.fw.cover.statusBar.container.hide();
            },
            function framework_hideCover(queue, heap) {
                if (heap.skip_animation === true) {
                    heap.fw.cover.container.hide();
                } else {
                    queue.pause();
                    heap.fw.cover.container.fadeOut(300, queue.resume);
                }
            },
            function startApplication(queue, heap) {
                heap.control.triggerEvent('displayed');
            },
            PQUEUE_HALT
        ], 0, 'main').boot();
    });
})(window, window.document, console);