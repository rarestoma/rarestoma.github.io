$(document).ready(function(){
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 200;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #ff006c; padding:0px; }";
    document.body.appendChild(css);
  };

  $(window).scroll(function(e){
  	parallaxScroll();
	});

	function parallaxScroll(){
		var scrolled = $(window).scrollTop();
		$('#parallax-1').css('top',(0-(scrolled*.25))+'px');
	  $('#parallax-2').css('top',(0-(scrolled*.4))+'px');
	}

  $('[data-toggle="tooltip"]').tooltip()

  $('#twitter').sharrre({
   share: {
     twitter: true
   },
   enableHover: false,
   enableTracking: false,
   buttons: { twitter: {}},
   click: function(api, options){
     api.simulateClick();
     api.openPopup('twitter');
   },
   template:'<i class="fa fa-twitter"></i>',
   url: 'http://galio.io'
 });

 $('#facebook').sharrre({
   share: {
     facebook: true
   },
   buttons: {
     facebook: {}
   },
   enableHover: false,
   enableTracking: false,
   click: function(api, options){
     api.simulateClick();
     api.openPopup('facebook');
   },
   template: '<i class="fa fa-facebook"></i>',
   url: ' http://galio.io'
 });

});
