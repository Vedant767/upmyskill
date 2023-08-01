var properties = ["name", "wins", "draws", "losses", "total"];

$.each(properties, function (i, val) {
	var orderClass = "";

	$("#" + val).click(function (e) {
		e.preventDefault();
		$(".filter__link.filter__link--active")
			.not(this)
			.removeClass("filter__link--active");
		$(this).toggleClass("filter__link--active");
		$(".filter__link").removeClass("asc desc");

		if (orderClass == "desc" || orderClass == "") {
			$(this).addClass("asc");
			orderClass = "asc";
		} else {
			$(this).addClass("desc");
			orderClass = "desc";
		}

		var parent = $(this).closest(".header__item");
		var index = $(".header__item").index(parent);
		var $table = $(".table-content");
		var rows = $table.find(".table-row").get();
		var isSelected = $(this).hasClass("filter__link--active");
		var isNumber = $(this).hasClass("filter__link--number");

		rows.sort(function (a, b) {
			var x = $(a).find(".table-data").eq(index).text();
			var y = $(b).find(".table-data").eq(index).text();

			if (isNumber == true) {
				if (isSelected) {
					return x - y;
				} else {
					return y - x;
				}
			} else {
				if (isSelected) {
					if (x < y) return -1;
					if (x > y) return 1;
					return 0;
				} else {
					if (x > y) return -1;
					if (x < y) return 1;
					return 0;
				}
			}
		});

		$.each(rows, function (index, row) {
			$table.append(row);
		});

		return false;
	});
});





TweenLite.defaultEase = Linear.easeNone;

var header     = document.querySelector("#app-header");
var bgBack     = document.querySelector("#background-back");
var bgFront    = document.querySelector("#background-front");
var toolbar    = document.querySelector("#small-toolbar");
var largeTitle = document.querySelector("#large-title");
var smallTitle = document.querySelector("#small-title");

var deltaHeight = header.offsetHeight - toolbar.offsetHeight;

var rect1 = smallTitle.getBoundingClientRect();
var rect2 = largeTitle.getBoundingClientRect();

var scale = rect1.height / rect2.height;
var x = rect1.left - rect2.left;
var y = rect1.top  - rect2.top;

var headerAnimation = new TimelineLite({ paused: true })
  .to(largeTitle, 1, { scale: scale, x: x, y: deltaHeight + y }, 0)
  .to(header,  1, { y: -deltaHeight }, 0)
  .to(toolbar, 1, { y: deltaHeight }, 0)
  .to(bgBack,  1, { y: deltaHeight / 2 }, 0)
  .to(bgFront, 1, { y: deltaHeight / 2 }, 0)
  .to(bgBack,  1, { alpha: 1 }, 0)
  .to(bgFront, 1, { alpha: 0 }, 0)
  .set(smallTitle, { alpha: 1 }, 1)
  .set(largeTitle, { alpha: 0 }, 1);

var shadowAnimation = TweenLite.to(header, 0.4, { 
  boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
  ease: Power1.easeOut
}).reverse();

var progress  = 0;
var requestId = null;
var reversed  = true;

cloneCards(25);
update();
window.addEventListener("scroll", requestUpdate);

function requestUpdate() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
}

function update() {
  
  var scroll = window.pageYOffset;
  
  if (scroll < deltaHeight) {   
    progress = scroll < 0 ? 0 : scroll / deltaHeight;
    reversed = true;
  } else {
    progress = 1;
    reversed = false;
  }
  
  headerAnimation.progress(progress);
  shadowAnimation.reversed(reversed);
  
  requestId = null;
}

function cloneCards(count) {
  
  var main = document.querySelector("main");
  var card = document.querySelector(".card");
  
  for (var i = 0; i < count; i++) {
    main.appendChild(card.cloneNode(true));
  }  
}