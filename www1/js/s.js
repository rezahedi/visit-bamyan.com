function docReady(fn){
  if(document.readyState==='complete' || document.readyState==='interactive'){
    setTimeout(fn, 1)
  }else{
    document.addEventListener("DOMContentLoaded", fn)
  }
}

docReady(function(){
  h = document.getElementsByTagName('header')[0]

  // Sticky Header
  document.body.onscroll = function(){
    if(this.scrollY > 100) {
      h.classList.add('hide')
      // h.classList.remove('fixed')
      if(this.oldpos > this.scrollY)
        h.classList.add('fixed')
      else
        h.classList.remove('fixed')
    } else {
      h.classList.remove('hide')
      h.classList.remove('fixed')
      h.style.position='fixed'
    }
    this.oldpos = this.scrollY
  }
  
  // menu toggle
  n = document.getElementsByTagName('nav')[0]
  document.getElementById('burger').onclick = function(){
    if( n.classList.contains('sh') ) {
      document.body.style.overflow = 'auto'
      // n.style.display = 'none'
      n.classList.remove('sh')
      this.classList.remove('x')
    } else {
      document.body.style.overflow = 'hidden'
      // n.style.display = 'block'
      n.classList.add('sh')
      this.classList.add('x')
    }
  }

  document.querySelectorAll(".menu .sub").forEach((o)=>{
    if(document.body.offsetWidth <= 1024)
      o.addEventListener('click', (e) => {
        //e.preventDefault();
        e.currentTarget.classList.toggle('s')
      }, false)
    else {
      o.addEventListener('click', (e) => {
        //e.preventDefault();
      }, false)
      o.addEventListener('mouseover', (e) => {
        e.currentTarget.classList.add('s')
      }, false)
      o.addEventListener('mouseout', (e) => {
        e.currentTarget.classList.remove('s')
      }, false)
    }
  })
  

  // Share navigator
  if(!navigator.share) {
    let share = document.querySelector('.content .social .share');
    if( share )
      share.style.display = 'none'
  }

  // clone share to end of article
  let shareBtn = document.querySelector('#sharebtn');
  if( shareBtn )
    shareBtn.appendChild(
      document.querySelector('.content .social').cloneNode(1)
    )

  // share click event
  document.querySelectorAll('.content .social a').forEach((o)=>{
    o.addEventListener('click', (e) => {
      e.preventDefault()
      mclick(e.currentTarget)
    })
  })
})

function mclick(o){
  const t = document.title;
  const l = window.location.href
  
	switch ( o.classList[0] ) {
		case "ic-facebook":
			window.open( "https://facebook.com/sharer.php?u=uuu&quote=ttt".replaceAll(l, t), "_blank", "width=600,height=400" );
		break;
		case "ic-twitter":
			window.open( "https://twitter.com/intent/tweet?url=uuu&text=ttt&via=visitbamyan".replaceAll(l, t), "_blank", "width=600,height=400" );
		break;
		case "ic-whatsapp":
      window.location.href = "https://wa.me/?text=ttt: uuu".replaceAll(l, t);
		break;
		case "ic-mail":
			window.location.href = "mailto:?&subject=ttt&body=ttt%0A%0Auuu".replaceAll(l, t);
		break;
		case "ic-share":
			navigator.share({
				title: 'Web Fundamentals',
				text: t,
				url: l
			});
		break;
	}
}
String.prototype.replaceAll = function(link, title){
	var str = this;
	str = str.replace(/uuu/g, link);
	str = str.replace(/ttt/g, title);
	return str;
}


// home slideshow
let hSlides = {};
hSlides.slides = document.querySelectorAll(".hslider .slide");
hSlides.cur = 0;
hSlides.hst;
function next(s){
  hSlides.slides[ hSlides.cur ].classList.remove("show")
  hSlides.cur += s;
  if( hSlides.cur > hSlides.slides.length-1 )
    hSlides.cur = 0;
  else if( hSlides.cur < 0 )
    hSlides.cur = hSlides.slides.length-1;
  hSlides.slides[ hSlides.cur ].classList.add("show")
  hSlides.hst = setTimeout('next(1)', 5000);
}

if( hSlides.slides.length > 0 ) {
  hSlides.hst = setTimeout('next(0)', 0);
  document.querySelector('.hslider .next').addEventListener('click', () => { clearTimeout(hSlides.hst); next(1) });
  document.querySelector('.hslider .prev').addEventListener('click', () => { clearTimeout(hSlides.hst); next(-1) });
}

// instagram slideshow!
let instas = {};
instas.slides = document.querySelectorAll("#i1>div");
instas.cur = 0;
instas.hst;
function nexti(s){
  instas.slides[ instas.cur ].classList.remove("hover")
  instas.cur += s;
  if( instas.cur > instas.slides.length-1 || ( document.body.offsetWidth <= 425 && instas.cur > 5 ) )
    instas.cur = 0;
  else if( instas.cur < 0 )
    instas.cur = instas.slides.length-1;
  instas.slides[ instas.cur ].classList.add("hover")
  instas.hst = setTimeout('nexti(1)', 3000);
}
if( instas.slides.length > 0 ) {
  instas.hst = setTimeout('nexti(0)', 0);
  document.getElementById('i1').onmouseover = function(){
    clearTimeout(instas.hst)
    instas.slides[ instas.cur ].classList.remove("hover")
  }
  document.getElementById('i1').onmouseout = function(){
    instas.hst = setTimeout('nexti(1)', 1000);
  }
}


if( document.getElementsByClassName("routes-slider").length){
  const rslider = new Siema({
    selector: '.routes-slider',
    duration: 200,
    easing: 'ease-out',
    perPage: {
      1024: 3,
      425: 1
    },
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20
  });
  document.querySelector('.routes .prev').addEventListener('click', () => rslider.prev());
  document.querySelector('.routes .next').addEventListener('click', () => rslider.next());
}
if( document.getElementsByClassName("stories-slider").length){
  const sslider = new Siema({
    selector: '.stories-slider',
    duration: 200,
    easing: 'ease-out',
    perPage: {
      1024: 3,
      425: 1
    },
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20
  });
  document.querySelector('.stories .prev').addEventListener('click', () => sslider.prev());
  document.querySelector('.stories .next').addEventListener('click', () => sslider.next());
}
if( document.body.offsetWidth <= 768 && document.getElementsByClassName("tourguide-slider").length) {
  const tslider = new Siema({
    selector: '.tourguide-slider',
    duration: 200,
    easing: 'ease-out',
    perPage: {
      1024: 3,
      425: 1
    },
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20
  });
  document.querySelector('.tourguide .prev').addEventListener('click', () => tslider.prev());
  document.querySelector('.tourguide .next').addEventListener('click', () => tslider.next());
}

// Map scroll horizontally in mobile view!
document.getElementsByClassName('map').length && document.getElementsByClassName('map')[0].scrollTo(500, 0)

// subscribe modal
let moc = document.querySelectorAll('.mo, .moi');
if(moc){
  let modhtml = '<div class=mod><div><span class="clx ic-close"></span><div class=c></div></div></div>'
  document.body.insertAdjacentHTML( 'beforeend', modhtml );
  m = document.getElementsByClassName("mod")[0];

  // click event
  moc.forEach((o)=>{
    o.onclick = function(e){
      e.preventDefault()
      // image popup
      if( o.classList.contains('moi') ){
        document.querySelector('.mod .c').innerHTML = "<img src='" + o.href + "'/>"
      } else {
        aa = document.querySelector('.mod .c').innerHTML = '<form class=ss action="https://visit-bamyan.us10.list-manage.com/subscribe/post?u=fce3b4a4cf5f33c6f18d0c9c7&amp;id=4d3b73faaa" method="post" name="mc-embedded-subscribe-form" target="_blank">\
<h2>Subscribe For Latest Updates</h2>\
<input type="text" name="FNAME" placeholder="Name">\
<input type="email" name="EMAIL" placeholder="Email Address" required>\
<div style="position:absolute;left:-5000px" aria-hidden="true"><input type="text" name="b_fce3b4a4cf5f33c6f18d0c9c7_4d3b73faaa" tabindex="-1"></div>\
<input type="hidden" value="Subscribe" name="subscribe">\
<button type="submit">Sign Me Up</button>\
</form>';
      }
      m.style.display='block'
      document.body.style.overflow = 'hidden'
    }
  })

  document.querySelectorAll(".clx").forEach((o)=>{
    o.onclick = function(){
      m.style.display = "none";
      document.body.style.overflow = 'auto'
    }
  })
  window.onclick = function(event) {
    if (event.target == m) {
      m.style.display = "none";
      document.body.style.overflow = 'auto'
    }
  }
}
