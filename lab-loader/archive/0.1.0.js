$(function () {
    /**
     * main function
     * this function does the following in order
     * 1. setup the visual interface (DOM structure)
     * 2. initialize the processing model (LC-3 object)
     * 3. bind visual object with processing model
     */
    var mainQueue = PQUEUE(null, [
        function initialize(queue, heap) {
            // debug options
            heap.skip_animation = false;
        },
        function framework_setup(queue, heap) {
            heap.fw = {
                hidden        : {
                                    element   : $('<div class="fw_hidden">')
                                },
                background    : {
                                    element   : $('<div class="fw_background">').addClass('fw_fixFullWindow').hide()
                                },
                body          : {
                                    element   : $('<div class="fw_body">').addClass('fw_fixFullWindow').hide()
                                },
                cover         : {
                                    element   : $('<div class="fw_cover">').addClass('fw_fixFullWindow').hide(),
                                    logo      : {
                                                    element   : $('<div class="fw_cover_logo">').hide(),
                                                    img       : {
                                                                    element : $('<img class="fw_cover_logo_img">').hide()
                                                                }
                                                },
                                    statusBar : {
                                                    element   : $('<div class="fw_cover_statusbar">').hide(),
                                                    text      : {
                                                                    element : $('<label class="fw_cover_statusbar_label">').hide()
                                                                },
                                                    dots      : [
                                                                    {
                                                                        element   : $('<label class="fw_cover_statusbar_label">').hide().text('.')
                                                                    },
                                                                    {
                                                                        element   : $('<label class="fw_cover_statusbar_label">').hide().text('.')
                                                                    },
                                                                    {
                                                                        element   : $('<label class="fw_cover_statusbar_label">').hide().text('.')
                                                                    }
                                                                ]
                                                }
                                }
            };
            
            // build structure
            $(window.document.body).append(
                heap.fw.hidden.element,
                heap.fw.background.element,
                heap.fw.body.element,
                heap.fw.cover.element.append(
                    heap.fw.cover.logo.element.append(
                        heap.fw.cover.logo.img.element
                    ),
                    heap.fw.cover.statusBar.element.append(
                        heap.fw.cover.statusBar.text.element,
                        heap.fw.cover.statusBar.dots[0].element,
                        heap.fw.cover.statusBar.dots[1].element,
                        heap.fw.cover.statusBar.dots[2].element
                    )
                )
            );
            // create private apis
            heap.fw.cover.statusBar.dots.jump = function() {
                heap.fw.cover.statusBar.dots[0].element
                    .delay(300)
                    .animate({top: '-12px'}, 200)
                    .animate({top: '0'}, 150);
                heap.fw.cover.statusBar.dots[1].element
                    .delay(400)
                    .animate({top: '-12px'}, 200)
                    .animate({top: '0'}, 150);
                heap.fw.cover.statusBar.dots[2].element
                    .delay(500)
                    .animate({top: '-12px'}, 200)
                    .animate({top: '0'}, 150);
            };
            // framework apis
            heap.fw.loadingDotsJumpTimer = null;
            heap.fw.makeLoadingDotsJump = function() {
                heap.fw.loadingDotsJumpTimer = window.setInterval(heap.fw.cover.statusBar.dots.jump, 2000);
            };
            heap.fw.makeLoadingDotsStop = function() {
                window.clearInterval(heap.fw.loadingDotsJumpTimer);
            };
        },
        function framework_fadeInBackground(queue, heap) {
            if (heap.skip_animation === true) {
                heap.fw.background.element.show();
            } else {
                queue.pause();
                heap.fw.background.element.fadeIn(300, queue.resume);
            }
        },
        function framework_showCover(queue, heap) {
            if (heap.skip_animation === true) {
                heap.fw.cover.element.show();
            } else {
                queue.pause();
                heap.fw.cover.element.fadeIn(300, queue.resume);
            }
        },
        function framework_loadSiteLogo(queue, heap) {
            queue.pause();
            heap.fw.cover.logo.img.element.load(queue.resume);
            heap.fw.cover.logo.img.element.attr('src', './img/icradle.net.lc3.png');
        },
        function framework_adjustSiteLogo(queue, heap)
        {
            heap.fw.cover.logo.img.element.show();
            var logo_css = {
                height: '124px',
                marginTop: '-62px'
            };
            if (heap.skip_animation === true) {
                heap.fw.cover.element.css(logo_css);
            } else {
                queue.pause();
                heap.fw.cover.logo.element
                    .fadeIn(300)
                    .delay(1000)
                    .animate(logo_css, 300, queue.resume);
            }
        },
        function framework_showStatusBar(queue, heap)
        {
            heap.fw.cover.statusBar.text.element.text('starting').show();
            heap.fw.cover.statusBar.dots[0].element.show();
            heap.fw.cover.statusBar.dots[1].element.show();
            heap.fw.cover.statusBar.dots[2].element.show();
            heap.fw.cover.statusBar.element.fadeIn(300);
        },
        function framework_makeLoadingDotsJump(queue, heap) {
            heap.fw.makeLoadingDotsJump();
        },
        function initializeDOM(queue, heap) {
            if (typeof getDOM !== 'function') {
                console.warn('Unable to init dom: getDOM undefined.');
            } else {
                heap.dom = getDOM(heap.fw.body.element);
                heap.dom_setup_feedback = function (message) {
                    heap.fw.cover.statusBar.text.element.text('setting up dom: ' + message);
                };
                queue.pause();
                heap.dom.setup(queue.resume, heap.dom_setup_feedback);
            }
        },
        function initializeLogic(queue, heap) {
            if (typeof getLogic !== 'function') {
                console.warn('Unable to init logic: getLogic undefined.');
            } else {
                heap.logic = getLogic();
                heap.logic_setup_feedback = function (message) {
                    heap.fw.cover.statusBar.text.element.text('setting up logic: ' + message);
                };
                queue.pause();
                heap.logic.setup(queue.resume, heap.logic_setup_feedback);
            }
        },
        function bindDOMtoLogic(queue, heap) {
            if (typeof heap.logic === 'undefined') {
                console.warn('Unable to bind dom to logic: missing logic.');
            } else if (typeof heap.dom === 'undefined') {
                console.warn('Unable to bind dom to logic: missing dom.');
            } else {
                heap.fw.cover.statusBar.text.element.text('finalizing setup');
                heap.logic.bind(heap.dom);
            }
        },
        function startLogic(queue, heap) {
            if (typeof heap.logic === 'undefined') {
                console.warn('Unable to start logic: missing logic.');
            } else {
                heap.fw.cover.statusBar.text.element.text('initializing content');
                heap.logic.start();
            }
        },
        function framework_showBody(queue, heap) {
            heap.fw.body.element.show();
        },
        function framework_makeLoadingDotsStop(queue, heap) {
            heap.fw.makeLoadingDotsStop();
        },
        function framework_hideStatusBar(queue, heap)
        {
            heap.fw.cover.statusBar.text.element.text('').hide();
            heap.fw.cover.statusBar.dots[0].element.hide();
            heap.fw.cover.statusBar.dots[1].element.hide();
            heap.fw.cover.statusBar.dots[2].element.hide();
            heap.fw.cover.statusBar.element.hide();
        },
        function framework_hideCover(queue, heap) {
            if (heap.skip_animation === true) {
                heap.fw.cover.element.hide();
            } else {
                queue.pause();
                heap.fw.cover.element.fadeOut(300, queue.resume);
            }
        },
        PQUEUE_HALT
    ], 0, 'main').boot();
});