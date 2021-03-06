/*!
 * storyrevealer.js
 * MIT licensed
 *
 * Copyright (C) 2017 Pierre M
 */
var MovingLetters = window.MovingLetters || (function(){
	
	var TEMPLATES = {
		"thursday": "<h1 class='ml1'><span class='text-wrapper'><span class='line line1'></span><span class='letters'>{{0}}</span><span class='line line2'></span></span></h1>",
		"slow-mornings": "<h1 class='ml2'>{{0}}</h1>",
		"great-thinker": "<h1 class='ml3'>{{0}}</h1>",
		"ready": "<h1 class='ml4'><span class='letters letters-1'>{{0}}</span><span class='letters letters-2'>{{1}}</span><span class='letters letters-3'>{{2}}</span></h1>",
		"signal-and-noise": "<h1 class='ml5'><span class='text-wrapper'><span class='line line1'></span><span class='letters letters-left'>{{0}}</span><span class='letters ampersand'>&amp;</span><span class='letters letters-right'>{{1}}</span><span class='line line2'></span></span></h1>",
		"beautiful-question": "<h1 class='ml6'><span class='text-wrapper'><span class='letters'>{{0}}</span></span></h1>",
		"reality-is-broken": "<h1 class='ml7'><span class='text-wrapper'><span class='letters'>{{0}}</span></span></h1>",
		"hey": "<h1 class='ml8'><span class='letters-container'><span class='letters letters-left'>{{0}}</span><span class='letters bang'>{{1}}</span></span><span class='circle circle-white'></span><span class='circle circle-dark'></span><span class='circle circle-container'><span class='circle circle-dark-dashed'></span></span></h1>",
		"coffee-morning": "<h1 class='ml9'><span class='text-wrapper'><span class='letters'>{{0}}</span></span></h1>",
		"domino-dreams": "<h1 class='ml10'><span class='text-wrapper'><span class='letters'>{{0}}</span></span></h1>",
		"hello-goodbye": "<h1 class='ml11'><span class='text-wrapper'><span class='line line1'></span><span class='letters'>{{0}}</span></span></h1>",
		"a-new-production": "<h1 class='ml12'>{{0}}</h1>",
		"rising-strong": "<h1 class='ml13'>{{0}}</h1>",
		"finding-your-element": "<h1 class='ml14'><span class='text-wrapper'><span class='letters'>{{0}}</span><span class='line'></span></span></h1>",
		"out-now": "<h1 class='ml15'><span class='word'>{{0}}</span><span class='word'>{{1}}</span></h1>",
		"made-with-love": "<h1 class='ml16'>{{0}}</h1>"
	}

	function install_template(container, animation, sep) {
		var template = TEMPLATES[animation]
		var text = container.innerHTML
		var newtext = Mustache.render(template, text.split(sep))
		container.innerHTML = newtext
	}

	function isolateLetters(selector) {
		var done = document.querySelector(selector)
		if(! done.getAttribute('data-ml-spaced') ) {
			var nodeList = document.querySelectorAll(selector)
			for (var i = 0; i < nodeList.length; ++i) {
			  nodeList[i].innerHTML = nodeList[i].innerHTML.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
			}
			done.setAttribute('data-ml-spaced', true)
		}
	}
	
	return {
		install_animation: function(container) {
			var animation = container.getAttribute('data-moving-letters')
			var loop = container.getAttribute('data-animation-loop') == 'true'
			var sep = container.getAttribute('data-animation-separator') || ','

			var id = container.getAttribute("id")
			if(! id) {
				id = StoryrevealerAnimation.generateId()
				container.setAttribute("id", id)
			}

			if(! StoryrevealerAnimation.exists(id)) {
				var animation_code = null
				var this_anim_sel = '#'+id+' ';

				install_template(container, animation, sep)

				switch(animation) {
					case 'thursday':
					/* template:
				    <h1 class="ml1">
						<span class="text-wrapper">
						<span class="line line1"></span>
						<span class="letters">THURSDAY</span>
						<span class="line line2"></span>
						</span>
					</h1>
					*/
						isolateLetters(this_anim_sel+'.ml1 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml1 .letter',
						    scale: [0.3,1],
						    opacity: [0,1],
						    translateZ: 0,
						    easing: "easeOutExpo",
						    duration: 600,
						    delay: function(el, i) {
						      return 70 * (i+1)
						    }
						  }).add({
						    targets: this_anim_sel+'.ml1 .line',
						    scaleX: [0,1],
						    opacity: [0.5,1],
						    easing: "easeOutExpo",
						    duration: 700,
						    offset: '-=875',
						    delay: function(el, i, l) {
						      return 80 * (l - i);
						    }
						  }).add({
						    targets: this_anim_sel+'.ml1',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break


					case "slow-mornings":
					/*
					<h1 class="ml2">Sunny mornings</h1>
					*/
						isolateLetters(this_anim_sel+'.ml2')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml2 .letter',
						    scale: [4,1],
						    opacity: [0,1],
						    translateZ: 0,
						    easing: "easeOutExpo",
						    duration: 950,
						    delay: function(el, i) {
						      return 70*i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml2',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break


					case "great-thinker":
					/*
					<h1 class="ml3">Great Thinkers</h1>
					*/
						isolateLetters(this_anim_sel+'.ml3')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml3 .letter',
						    opacity: [0,1],
						    easing: "easeInOutQuad",
						    duration: 2250,
						    delay: function(el, i) {
						      return 150 * (i+1)
						    }
						  }).add({
						    targets: this_anim_sel+'.ml3',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break


					case "ready":
					/*
					<h1 class="ml4">
						<span class="letters letters-1">Ready</span>
						<span class="letters letters-2">Set</span>
						<span class="letters letters-3">Go!</span>
					</h1>
					*/
						var ml4 = {};
						ml4.opacityIn = [0,1];
						ml4.scaleIn = [0.2, 1];
						ml4.scaleOut = 3;
						ml4.durationIn = 800;
						ml4.durationOut = 600;
						ml4.delay = 500;

						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml4 .letters-1',
						    opacity: ml4.opacityIn,
						    scale: ml4.scaleIn,
						    duration: ml4.durationIn
						  }).add({
						    targets: this_anim_sel+'.ml4 .letters-1',
						    opacity: 0,
						    scale: ml4.scaleOut,
						    duration: ml4.durationOut,
						    easing: "easeInExpo",
						    delay: ml4.delay
						  }).add({
						    targets: this_anim_sel+'.ml4 .letters-2',
						    opacity: ml4.opacityIn,
						    scale: ml4.scaleIn,
						    duration: ml4.durationIn
						  }).add({
						    targets: this_anim_sel+'.ml4 .letters-2',
						    opacity: 0,
						    scale: ml4.scaleOut,
						    duration: ml4.durationOut,
						    easing: "easeInExpo",
						    delay: ml4.delay
						  }).add({
						    targets: this_anim_sel+'.ml4 .letters-3',
						    opacity: ml4.opacityIn,
						    scale: ml4.scaleIn,
						    duration: ml4.durationIn
						  }).add({
						    targets: this_anim_sel+'.ml4 .letters-3',
						    opacity: 0,
						    scale: ml4.scaleOut,
						    duration: ml4.durationOut,
						    easing: "easeInExpo",
						    delay: ml4.delay
						  }).add({
						    targets: this_anim_sel+'.ml4',
						    opacity: 0,
						    duration: 500,
						    delay: 500
						  })
						break
						
						
					case "signal-and-noise":
					/*
				    <h1 class="ml5">
					  <span class="text-wrapper">
					    <span class="line line1"></span>
					    <span class="letters letters-left">Signal</span>
					    <span class="letters ampersand">&amp;</span>
					    <span class="letters letters-right">Noise</span>
					    <span class="line line2"></span>
					  </span>
					</h1>
					*/
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml5 .line',
						    opacity: [0.5,1],
						    scaleX: [0, 1],
						    easing: "easeInOutExpo",
						    duration: 700
						  }).add({
						    targets: this_anim_sel+'.ml5 .line',
						    duration: 600,
						    easing: "easeOutExpo",
						    translateY: function(e, i, l) {
						      var offset = -0.625 + 0.625*2*i;
						      return offset + "em";
						    }
						  }).add({
						    targets: this_anim_sel+'.ml5 .ampersand',
						    opacity: [0,1],
						    scaleY: [0.5, 1],
						    easing: "easeOutExpo",
						    duration: 600,
						    offset: '-=600'
						  }).add({
						    targets: this_anim_sel+'.ml5 .letters-left',
						    opacity: [0,1],
						    translateX: ["0.5em", 0],
						    easing: "easeOutExpo",
						    duration: 600,
						    offset: '-=300'
						  }).add({
						    targets: this_anim_sel+'.ml5 .letters-right',
						    opacity: [0,1],
						    translateX: ["-0.5em", 0],
						    easing: "easeOutExpo",
						    duration: 600,
						    offset: '-=600'
						  }).add({
						    targets: this_anim_sel+'.ml5',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break

					
					case "beautiful-question":
					/*
					<h1 class="ml6">
					  <span class="text-wrapper">
					    <span class="letters">Beautiful Questions</span>
					  </span>
					</h1>
					*/
						isolateLetters(this_anim_sel+'.ml6 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml6 .letter',
						    translateY: ["1.2em", 0],
						    translateZ: 0,
						    duration: 750,
						    delay: function(el, i) {
						      return 50 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml6',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					case "reality-is-broken":
					/*
					<h1 class="ml7">
					  <span class="text-wrapper">
					    <span class="letters">Reality is broken</span>
					  </span>
					</h1>
					*/
						isolateLetters(this_anim_sel+'.ml7 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml7 .letter',
						    translateY: ["1.1em", 0],
						    translateX: ["0.55em", 0],
						    translateZ: 0,
						    rotateZ: [180, 0],
						    duration: 750,
						    easing: "easeOutExpo",
						    delay: function(el, i) {
						      return 50 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml7',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  });
						break
							
					
					case "hey":
					/*
					<h1 class="ml8">
					  <span class="letters-container">
					    <span class="letters letters-left">Hi</span>
					    <span class="letters bang">!</span>
					  </span>
					  <span class="circle circle-white"></span>
					  <span class="circle circle-dark"></span>
					  <span class="circle circle-container"><span class="circle circle-dark-dashed"></span></span>
					</h1>
					*/
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml8 .circle-white',
						    scale: [0, 3],
						    opacity: [1, 0],
						    easing: "easeInOutExpo",
						    rotateZ: 360,
						    duration: 1100
						  }).add({
						    targets: this_anim_sel+'.ml8 .circle-container',
						    scale: [0, 1],
						    duration: 1100,
						    easing: "easeInOutExpo",
						    offset: '-=1000'
						  }).add({
						    targets: this_anim_sel+'.ml8 .circle-dark',
						    scale: [0, 1],
						    duration: 1100,
						    easing: "easeOutExpo",
						    offset: '-=600'
						  }).add({
						    targets: this_anim_sel+'.ml8 .letters-left',
						    scale: [0, 1],
						    duration: 1200,
						    offset: '-=550'
						  }).add({
						    targets: this_anim_sel+'.ml8 .bang',
						    scale: [0, 1],
						    rotateZ: [45, 15],
						    duration: 1200,
						    offset: '-=1000'
						  }).add({
						    targets: this_anim_sel+'.ml8',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1400
						  })

						anime({
						  targets: this_anim_sel+'.ml8 .circle-dark-dashed',
						  rotateZ: 360,
						  duration: 8000,
						  easing: "linear",
						  loop: true
						})
						break
					
					
					case "coffee-morning":
					/*
					<h1 class="ml9">
					  <span class="text-wrapper">
					    <span class="letters">Coffee mornings</span>
					  </span>
					</h1>
					*/
						isolateLetters(this_anim_sel+'.ml9 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml9 .letter',
						    scale: [0, 1],
						    duration: 1500,
						    elasticity: 600,
						    delay: function(el, i) {
						      return 45 * (i+1)
						    }
						  }).add({
						    targets: this_anim_sel+'.ml9',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					case "domino-dreams":
					/*
					<h1 class="ml10">
					  <span class="text-wrapper">
					    <span class="letters">Domino Dreams</span>
					  </span>
					</h1>
					*/
						isolateLetters(this_anim_sel+'.ml10 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml10 .letter',
						    rotateY: [-90, 0],
						    duration: 1300,
						    delay: function(el, i) {
						      return 45 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml10',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					case "hello-goodbye":
					/*
					*/
						isolateLetters(this_anim_sel+'.ml11 .letters')
						//console.log("width", document.querySelector(".ml11 .letters").getBoundingClientRect() )
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml11 .line',
						    scaleY: [0,1],
						    opacity: [0.5,1],
						    easing: "easeOutExpo",
						    duration: 700
						  })
						  .add({	// see: https://stackoverflow.com/questions/21990857/d3-js-how-to-get-the-computed-width-and-height-for-an-arbitrary-element
						    targets: this_anim_sel+'.ml11 .line',
						    translateX: [0,document.querySelector(".ml11 .letters").getBoundingClientRect().width],
						    easing: "easeOutExpo",
						    duration: 700,
						    delay: 100
						  }).add({
						    targets: this_anim_sel+'.ml11 .letter',
						    opacity: [0,1],
						    easing: "easeOutExpo",
						    duration: 600,
						    offset: '-=775',
						    delay: function(el, i) {
						      return 34 * (i+1)
						    }
						  }).add({
						    targets: this_anim_sel+'.ml11',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					case "a-new-production":
					/*
					*/
						isolateLetters(this_anim_sel+'.ml12')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml12 .letter',
						    translateX: [40,0],
						    translateZ: 0,
						    opacity: [0,1],
						    easing: "easeOutExpo",
						    duration: 1200,
						    delay: function(el, i) {
						      return 500 + 30 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml12 .letter',
						    translateX: [0,-30],
						    opacity: [1,0],
						    easing: "easeInExpo",
						    duration: 1100,
						    delay: function(el, i) {
						      return 100 + 30 * i;
						    }
						  })
						break
					
					
					case "rising-strong":
					/*
					*/
						isolateLetters(this_anim_sel+'.ml13')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml13 .letter',
						    translateY: [100,0],
						    translateZ: 0,
						    opacity: [0,1],
						    easing: "easeOutExpo",
						    duration: 1400,
						    delay: function(el, i) {
						      return 300 + 30 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml13 .letter',
						    translateY: [0,-100],
						    opacity: [1,0],
						    easing: "easeInExpo",
						    duration: 1200,
						    delay: function(el, i) {
						      return 100 + 30 * i;
						    }
						  })
						break
					
					
					case "finding-your-element":
					/*
					*/
						isolateLetters(this_anim_sel+'.ml14 .letters')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml14 .line',
						    scaleX: [0,1],
						    opacity: [0.5,1],
						    easing: "easeInOutExpo",
						    duration: 900
						  }).add({
						    targets: this_anim_sel+'.ml14 .letter',
						    opacity: [0,1],
						    translateX: [40,0],
						    translateZ: 0,
						    scaleX: [0.3, 1],
						    easing: "easeOutExpo",
						    duration: 800,
						    offset: '-=600',
						    delay: function(el, i) {
						      return 150 + 25 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml14',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					case "out-now":
					/*
					*/
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml15 .word',
						    scale: [14,1],
						    opacity: [0,1],
						    easing: "easeOutCirc",
						    duration: 800,
						    delay: function(el, i) {
						      return 800 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml15',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					case "made-with-love":
					/*
					*/
						isolateLetters(this_anim_sel+'.ml16')
						animation_code = anime.timeline({loop: loop})
						  .add({
						    targets: this_anim_sel+'.ml16 .letter',
						    translateY: [-100,0],
						    easing: "easeOutExpo",
						    duration: 1400,
						    delay: function(el, i) {
						      return 30 * i;
						    }
						  }).add({
						    targets: this_anim_sel+'.ml16',
						    opacity: 0,
						    duration: 1000,
						    easing: "easeOutExpo",
						    delay: 1000
						  })
						break
					
					
					
					default:
						console.log('MovingLetters::install_animation: animation type not found', animation)
						break;
				}
				if(animation_code) {
					StoryrevealerAnimation.register(id, animation_code)
					//console.log('MovingLetters::install_animation: installed', animation)
				}
			} else {
				StoryrevealerAnimation.play(id)
				//console.log('MovingLetters::install_animation: started', animation)
			}
		}

	}

})();