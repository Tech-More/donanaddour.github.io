//swiper

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});


          
//cursor    
const PX_RATIO = window.devicePixelRatio;

Math.dist = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Cursor {
    constructor() {
        this.container = window["cursor"];
        this.shape = window["cursor-shape"];
        this.translation = {x:1,y:1};
        this.mouse =  {x:window.innerWidth/2,y:window.innerHeight/2};
        this.precision = 2;
        this.scale = 1;
        this.rotation = 1;
        this.friction = 0.1;
        this.animate();
        this.events();
    }

    events() {
        document.addEventListener('mousemove', (e) => {
					this.mouse.x = e.clientX * PX_RATIO;
					this.mouse.y = e.clientY * PX_RATIO;
				}, false);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    speed_morph() {
        const dist = Math.dist(this.dx, this.dy);
        const min = 0.3;
        const max_distance = 500;
        const total = dist / max_distance;
        return Number(Math.min(total, min).toFixed(2));
    }

    update() {
        const speed_morph = this.speed_morph(this.dx, this.dy);
        this.scale += (speed_morph - this.scale) * this.friction;

        this.translation.x += this.dx * this.friction;
        this.translation.y += this.dy * this.friction;

        this.rotation = Math.atan2(this.dy, this.dx) * 180 / Math.PI;

    }

    render() {
        this.update();
        this.container.style.transform = 'translate3d(' + this.translation.x.toFixed(this.precision) + 'px ,' + this.translation.y.toFixed(this.precision) + 'px, 0)';
        this.shape.style.transform = 'rotate(' + this.rotation.toFixed(this.precision) + 'deg) ' + 'scale(' + (1 + this.scale) + ', ' + (1 - this.scale) + ')';
    }

    get dx() {
        return this.mouse.x - this.translation.x;
    }

    get dy() {
        return this.mouse.y - this.translation.y;
    }
}

const _cursor = new Cursor();




//circle counter
$(window).scroll(function() {

$('.pie').each(function(){

let percent = $(this).data('percent');
let bar = $(this).find('.bar');
let r = bar.attr('r');
let c = Math.PI * (r * 2);
let range = (100 - percent) / 100 * c;
bar.css({
 'stroke-dashoffset': c,
 'stroke-dasharray': c 
});
bar.animate({ strokeDashoffset: range }, 3000, 'linear');

$(this).prev().prop('Counter', 0).animate({ 
   Counter: percent 
 },                                 {
   duration: 3000,
   step: function (now) {
     return $(this).text(Math.ceil(now) + '%');
   }
 });  
})
}).call(this);