$(function () {
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
            heap.fw = {
                hidden        : {
                                    element   : $('<div class="xhll_fw_hidden">')
                                },
                background    : {
                                    element   : $('<div class="xhll_fw_background">').addClass('xhll_fw_fixFullWindow').hide()
                                },
                body          : {
                                    element   : $('<div class="xhll_fw_body">').addClass('xhll_fw_fixFullWindow').hide()
                                },
                cover         : {
                                    element   : $('<div class="xhll_fw_cover">').addClass('xhll_fw_fixFullWindow').hide(),
                                    logo      : {
                                                    element   : $('<div class="xhll_fw_cover_logo">').hide(),
                                                    img       : {
                                                                    element : $('<img class="xhll_fw_cover_logo_img">').hide()
                                                                }
                                                },
                                    statusBar : {
                                                    element   : $('<div class="xhll_fw_cover_statusbar">').hide(),
                                                    text      : {
                                                                    element : $('<label class="xhll_fw_cover_statusbar_label">').hide()
                                                                },
                                                    dots      : [
                                                                    {
                                                                        element   : $('<label class="xhll_fw_cover_statusbar_label">').hide().text('.')
                                                                    },
                                                                    {
                                                                        element   : $('<label class="xhll_fw_cover_statusbar_label">').hide().text('.')
                                                                    },
                                                                    {
                                                                        element   : $('<label class="xhll_fw_cover_statusbar_label">').hide().text('.')
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
            heap.fw.cover.logo.img.element
                .error(function () {
                    alert('logo failed to load');
                })
                .load(queue.resume)
                .attr('src', './img/xhll_fw_logo.png');
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
        function loadModel(queue, heap) {
            if (typeof theModel !== 'function') {
                console.warn('Unable to load model: theModel undefined.');
            } else {
                heap.model = theModel(heap.fw.body.element);
                heap.model_setup_feedback = function (message) {
                    heap.fw.cover.statusBar.text.element.text('loading model: ' + message);
                };
                queue.pause();
                heap.model.setup(queue.resume, heap.model_setup_feedback);
            }
        },
        function loadView(queue, heap) {
            if (typeof theView !== 'function') {
                console.warn('Unable to load view: theView undefined.');
            } else {
                heap.view = theView(heap.fw.body.element);
                heap.view_setup_feedback = function (message) {
                    heap.fw.cover.statusBar.text.element.text('loading view: ' + message);
                };
                queue.pause();
                heap.view.setup(queue.resume, heap.view_setup_feedback);
            }
        },
        function loadControl(queue, heap) {
            if (typeof theControl !== 'function') {
                console.warn('Unable to load control: theControl undefined.');
            } else {
                heap.control = theControl(heap.fw.body.element);
                heap.control_setup_feedback = function (message) {
                    heap.fw.cover.statusBar.text.element.text('loading control: ' + message);
                };
                queue.pause();
                heap.control.setup(queue.resume, heap.control_setup_feedback);
            }
        },
        function connectMVC(queue, heap) {
            if (typeof heap.control === 'undefined') {
                heap.connectMVC_error = 'Critical error: missing control.';
                console.warn(heap.connectMVC_error);
            } else if (typeof heap.model === 'undefined') {
                heap.connectMVC_error = 'Critical error: missing model.';
                console.warn(heap.connectMVC_error);
            } else if (typeof heap.view === 'undefined') {
                heap.connectMVC_error = 'Critical error: missing view.';
                console.warn(heap.connectMVC_error);
            } else {
                queue.pc.goto(queue.pc.locate('initializeApplication'));
                heap.fw.cover.statusBar.text.element.text('finalizing setup');
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
            heap.fw.cover.statusBar.text.element.text('initializing application');
            heap.control.triggerEvent('loaded');
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
        function startApplication(queue, heap) {
            heap.control.triggerEvent('displayed');
        },
        PQUEUE_HALT
    ], 0, 'main').boot();
});