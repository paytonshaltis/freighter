!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Freighter=e():t.Freighter=e()}(this,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{default:()=>o});class i{constructor(t,e,s,r){this.carouselContainerConfigured=!1,this.carouselItemsConfigured=!1,this.isHovering=!1,this.transitionEndEventListener=t=>{},this.leftButtonClickListener=t=>{},this.rightButtonClickListener=t=>{},this.leftButtonMouseEnterListener=t=>{},this.leftButtonMouseLeaveListener=t=>{},this.rightButtonMouseEnterListener=t=>{},this.rightButtonMouseLeaveListener=t=>{},this.containerMouseEnterListener=t=>{this.isHovering=!0,clearTimeout(this.autoScrollTimeout)},this.containerMouseLeaveListener=t=>{this.isHovering=!1,this.autoScroll&&this.startAutoScrollTimeout()},this.parentResizeObserver=new ResizeObserver((()=>{})),this.autoScrollTimeout=-1;const o=void 0!==t.carouselID,n=o?t:Object.assign({containerID:e,resizingMethod:s,wrappingMethod:r},t);this.resizingMethod="stretch-populate"===n.resizingMethod?"stretch-gap":n.resizingMethod?n.resizingMethod:"none",this.wrappingMethod=n.wrappingMethod?n.wrappingMethod:"none",this.itemWidth=void 0!==n.itemWidth?n.itemWidth:225,this.itemHeight=void 0!==n.itemHeight?n.itemHeight:150,this.itemSpacing=void 0!==n.itemSpacing?n.itemSpacing:0,this.buttonStyles=Object.assign({width:"25px",height:"80%",position:"center",borderTop:"none",borderRight:"none",borderBottom:"none",borderLeft:"none",backgroundColor:"rgba(100, 100, 100, 0.5)",color:"rgba(50, 50, 50, 0.75)",cursor:"pointer",transition:"all 200ms ease"},n.buttonStyles),this.buttonHoverStyles=Object.assign({backgroundColor:"rgba(100, 100, 100, 0.8)",transition:"all 200ms ease"},n.buttonHoverStyles),this.leftButtonStyles=Object.assign({borderTopRightRadius:"5px",borderBottomRightRadius:"5px"},n.leftButtonStyles),this.leftButtonHoverStyles=void 0!==n.leftButtonHoverStyles?n.leftButtonHoverStyles:{},this.rightButtonStyles=Object.assign({borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px"},n.rightButtonStyles),this.rightButtonHoverStyles=void 0!==n.rightButtonHoverStyles?n.rightButtonHoverStyles:{},this.scrollable=void 0===n.scrollable||n.scrollable,this.autoScroll=void 0!==n.autoScroll&&n.autoScroll,this.autoScrollInterval=void 0!==n.autoScrollInterval?n.autoScrollInterval:1e3,this.autoScrollDirection=void 0!==n.autoScrollDirection?n.autoScrollDirection:"right",this.autoScrollPauseOnHover=!!n.autoScrollPauseOnHover&&n.autoScrollPauseOnHover,this.scrollBy=void 0!==n.scrollBy?n.scrollBy:1,this.numItemsVisible=void 0!==n.numItemsVisible?n.numItemsVisible:1,this.syncScrollWithVisibility=void 0!==n.syncScrollWithVisibility&&n.syncScrollWithVisibility,this.transitionDuration=void 0!==n.transitionDuration?n.transitionDuration:500,this.transitionDelay=void 0!==n.transitionDelay?n.transitionDelay:0,this.transitionTimingFunction=void 0!==n.transitionTimingFunction?n.transitionTimingFunction:"ease-in-out",this.transition=`transform \n        ${this.transitionDuration}ms \n        ${this.transitionTimingFunction} \n        ${this.transitionDelay}ms`,this.itemAspectRatio=this.itemHeight/this.itemWidth,this.originalItemHeight=this.itemHeight,this.originalItemWidth=this.itemWidth,this.originalScrollBy=this.scrollBy,this.scrollBy=this.syncScrollWithVisibility?this.numItemsVisible:this.scrollBy,this.currentScrollBy=this.scrollBy,this.carouselID=o?n.carouselID:++i.maxID,this.carouselContainer=this.configureCarouselContainer(n.containerID,n.carouselItems);try{this.carouselItemContainer=this.carouselContainer.children[0].children[0]}catch(t){console.log("Tried getting the carousel item container from the configured carousel container, caught the following exception:",t),this.carouselItemContainer=document.createElement("div")}this.allItems=this.configureCarouselItems(),"wrap-smart"===this.wrappingMethod&&this.numItemsVisible>this.allItems.length&&(console.warn(`Carousel ID "${n.containerID}": Cannot allow smart wrapping if the carousel has fewer items than items visible. Setting wrapping method to 'wrap-simple'.`),this.wrappingMethod="wrap-simple");const l=this.configureCarouselButton("left"),a=this.configureCarouselButton("right");this.scrollable&&(this.carouselContainer.prepend(l),this.carouselContainer.append(a)),this.leftCarouselPointer=o?n.leftCarouselPointer:0,this.rightCarouselPointer=this.numItemsVisible+this.leftCarouselPointer,this.canScrollLeft=("none"!==this.wrappingMethod||0!==this.leftCarouselPointer)&&this.allItems.length>0,this.canScrollRight=("none"!==this.wrappingMethod||!(this.allItems.length<=this.numItemsVisible||this.rightCarouselPointer===this.allItems.length))&&this.allItems.length>0,this.isScrolling=!1,this.prevScroll="",this.usingBezierTransition=!!n.transitionTimingFunction&&n.transitionTimingFunction.startsWith("cubic-bezier"),this.applyStyles(),this.initializeCarousel(),this.resizeCarousel(),this.resizeCarouselItemContainer(),this.resizeCarouselItemContainer(),o&&this.transitionEndEventListener(new Event("transitionend")),"stretch-gap"===this.resizingMethod?(this.parentResizeObserver=new ResizeObserver((()=>{this.isScrolling||this.resizeGap()})),this.parentResizeObserver.observe(this.carouselContainer.parentElement)):"stretch"!==this.resizingMethod&&"stretch-scale"!==this.resizingMethod||(this.parentResizeObserver=new ResizeObserver((()=>{this.isScrolling||this.resizeScale()})),this.parentResizeObserver.observe(this.carouselContainer.parentElement)),this.autoScroll&&!this.isHovering&&this.startAutoScrollTimeout()}configureCarouselContainer(t,e){const i=document.getElementById(t);if(!i)throw new Error(`Carousel container with ID ${t} not found.`);const s=e||Array.from(i.children);i.innerHTML="";const r=document.createElement("div");return r.id=`freighter-carousel-container-${this.carouselID}`,i.appendChild(r),r.classList.add("freighter-carousel-container"),this.autoScrollPauseOnHover&&(r.addEventListener("mouseenter",this.containerMouseEnterListener),r.addEventListener("mouseleave",this.containerMouseLeaveListener)),r.appendChild(this.configureCarouselItemContainerWrapper(s)),this.carouselContainerConfigured=!0,r}configureCarouselItemContainerWrapper(t){const e=document.createElement("div");return e.classList.add("freighter-carousel-item-container-wrapper"),e.id=`freighter-carousel-item-container-wrapper-${this.carouselID}`,e.appendChild(this.configureCarouselItemContainer(t)),e}configureCarouselItemContainer(t){const e=document.createElement("div");return e.classList.add("freighter-carousel-item-container"),e.id=`freighter-carousel-item-container-${this.carouselID}`,t.forEach((t=>{e.appendChild(t)})),this.transitionEndEventListener=t=>{if(t.target!==this.carouselItemContainer)return;const i=e.children.length;if("left"===this.prevScroll){for(let t=i-1;t>i-1-2*this.currentScrollBy;t--)e.children[t].remove();this.transformCarouselItems(0)}else if("right"===this.prevScroll){for(let t=0;t<2*this.currentScrollBy;t++)e.children[0].remove();this.transformCarouselItems(0)}this.resizeCarousel(),this.isScrolling=!1,this.autoScroll&&!this.isHovering&&this.startAutoScrollTimeout()},e.addEventListener("transitionend",this.transitionEndEventListener),e}configureCarouselButton(t){const e=document.createElement("button");return e.classList.add(`freighter-carousel-arrow-${t}`),e.id=`freighter-carousel-arrow-${t}-${this.carouselID}`,"left"===t?(this.leftButtonClickListener=()=>{if(!this.isScrolling&&this.canScrollLeft){clearTimeout(this.autoScrollTimeout);const e=!(!this.usingBezierTransition||"none"!==this.wrappingMethod||this.canScrollRight);this.prevScroll="left",this.adjustPointers(t),this.carouselItemContainer.prepend(...this.getCarouselItems(this.currentScrollBy,this.leftCarouselPointer));const i=this.getCarouselItems(this.currentScrollBy,this.usingBezierTransition?this.rightCarouselPointer+this.currentScrollBy:0,this.usingBezierTransition);i.forEach((t=>{t.classList.add("frieght-carousel-item-dummy"),e&&(t.style.visibility="hidden")})),this.carouselItemContainer.append(...i),this.transformCarouselItems(-1),this.isScrolling=!0}},e.addEventListener("click",this.leftButtonClickListener)):"right"===t&&(this.rightButtonClickListener=()=>{if(!this.isScrolling&&this.canScrollRight){for(;this.rightCarouselPointer>=this.allItems.length;)this.rightCarouselPointer-=this.allItems.length;const e=!(!this.usingBezierTransition||"none"!==this.wrappingMethod||this.canScrollLeft);clearTimeout(this.autoScrollTimeout),this.prevScroll="right",this.adjustPointers(t),this.carouselItemContainer.append(...this.getCarouselItems(this.currentScrollBy,this.rightCarouselPointer-this.currentScrollBy));const i=this.getCarouselItems(this.currentScrollBy,this.usingBezierTransition?this.leftCarouselPointer-2*this.currentScrollBy:0,this.usingBezierTransition);i.forEach((t=>{t.classList.add("frieght-carousel-item-dummy"),e&&(t.style.visibility="hidden")})),this.carouselItemContainer.prepend(...i),this.transformCarouselItems(1),this.isScrolling=!0}},e.addEventListener("click",this.rightButtonClickListener)),e}configureCarouselItems(){if(!this.carouselContainerConfigured)throw new Error("The carousel container must be configured before the carousel items can \n        be configured. This is likely an error with the order in which methods are \n        being called in the constructor.");const t=Array.from(this.carouselItemContainer.children);let e=[];t.forEach((t=>{t.classList.contains("freighter-carousel-item")?e.push(t.children[0]):e.push(t)}));const i=[];return e.forEach(((t,e)=>{const s=document.createElement("div");s.classList.add("freighter-carousel-item"),s.id=`freighter-carousel-item-${this.carouselID}-${e}`,s.append(t),i.push(s)})),this.carouselItemsConfigured=!0,i}applyStyles(){if(!this.carouselContainerConfigured||!this.carouselItemsConfigured)throw new Error("The carousel container and items must be configured before the styles\n        can be applied. This is likely an error with the order in which methods are\n        being called in the constructor.");this.applyCarouselContainerStyles(),this.applyCarouselItemContainerWrapperStyles(),this.applyCarouselItemContainerStyles(),this.applyCarouselItemStyles(),this.scrollable&&(this.applyCarouselButtonStyles("left"),this.applyCarouselButtonStyles("right"))}applyCarouselContainerStyles(){this.carouselContainer.style.width="none"===this.resizingMethod?"fit-content":"100%",this.carouselContainer.style.margin="none"===this.resizingMethod?"0 auto":"0",this.carouselContainer.style.position="relative",this.carouselContainer.style.display="flex",this.carouselContainer.style.flexDirection="column",this.carouselContainer.style.justifyContent="center"}applyCarouselItemContainerWrapperStyles(){this.carouselContainer.querySelector(`.freighter-carousel-item-container-wrapper#freighter-carousel-item-container-wrapper-${this.carouselID}`).style.overflow="hidden"}applyCarouselItemContainerStyles(){const t=this.carouselContainer.querySelector(`.freighter-carousel-item-container#freighter-carousel-item-container-${this.carouselID}`);t.style.display="flex",t.style.justifyContent="center",t.style.gap=`${this.itemSpacing}px`,"none"===this.resizingMethod?t.style.width=this.itemWidth*this.numItemsVisible+this.itemSpacing*(this.numItemsVisible-1)+"px":t.style.width="100%",t.style.transition=this.transition}applyCarouselItemStyles(){this.allItems.forEach((t=>{t.style.width=`${this.itemWidth}px`,"stretch-scale"!==this.resizingMethod&&(t.style.height=`${this.itemHeight}px`),t.style.flexShrink="0"}))}applyCarouselButtonStyles(t){const e=this.carouselContainer.querySelector(`.freighter-carousel-arrow-${t}#freighter-carousel-arrow-${t}-${this.carouselID}`);e.style.zIndex="1",e.style.padding="1px 6px",e.style.margin="0",e.innerHTML=`\n    <svg\n      fill="black"\n      style="max-width: 60%; max-height: 60%;"\n      viewBox="0 0 46.001 85.999"\n    >\n      ${"right"===t?'<path d="M1.003,80.094c-1.338,1.352-1.338,3.541,0,4.893c1.337,1.35,3.506,1.352,4.845,0l39.149-39.539  c1.338-1.352,1.338-3.543,0-4.895L5.848,1.014c-1.339-1.352-3.506-1.352-4.845,0c-1.338,1.352-1.338,3.541-0.001,4.893L36.706,43 L1.003,80.094z"/>':'<path d="M44.998,80.094c1.338,1.352,1.338,3.541,0,4.893c-1.336,1.35-3.506,1.352-4.844,0L1.003,45.447  c-1.338-1.352-1.338-3.543,0-4.895l39.15-39.539c1.338-1.352,3.506-1.352,4.844,0S46.335,4.555,45,5.906L9.294,43L44.998,80.094z"/>'}\n    </svg>`;let i=this.buttonStyles.color;"left"===t&&this.leftButtonStyles.color&&(i=this.leftButtonStyles.color),"right"===t&&this.rightButtonStyles.color&&(i=this.rightButtonStyles.color);let s=void 0!==this.buttonHoverStyles.color?this.buttonHoverStyles.color:i;"left"===t&&this.leftButtonHoverStyles.color&&(s=this.leftButtonHoverStyles.color),"right"===t&&this.rightButtonHoverStyles.color&&(s=this.rightButtonHoverStyles.color);const r=["width","height","borderTop","borderBottom","borderLeft","borderRight","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius","backgroundColor","cursor","transition"];this.applyMassButtonStyles(e,t,r,this.buttonStyles,this.leftButtonStyles,this.rightButtonStyles,i);const o=()=>{this.applyMassButtonStyles(e,t,r,this.buttonHoverStyles,this.leftButtonHoverStyles,this.rightButtonHoverStyles,s)},n=()=>{this.applyMassButtonStyles(e,t,r,this.buttonStyles,this.leftButtonStyles,this.rightButtonStyles,i)};switch(e.addEventListener("mouseenter",o),e.addEventListener("mouseleave",n),"left"===t?(this.leftButtonMouseEnterListener=o,this.leftButtonMouseLeaveListener=n):(this.rightButtonMouseEnterListener=o,this.rightButtonMouseLeaveListener=n),e.style.position="absolute","left"===t?this.leftButtonStyles.position:this.rightButtonStyles.position){case"top":e.style.top="0";break;case"bottom":e.style.bottom="0";break;case"center":e.style.bottom="50%",e.style.transform="translateY(50%)"}"left"===t&&(e.style.left="0"),"right"===t&&(e.style.right="0")}applyMassButtonStyles(t,e,i,s,r,o,n){i.forEach((e=>{t.style[e]=s[e],"transition"===e&&(t.children[0].children[0].style.transition=s.transition)})),i.forEach((i=>{"left"===e&&r[i]&&(t.style[i]=r[i],"transition"===i&&(t.children[0].children[0].style.transition=r.transition)),"right"===e&&o[i]&&(t.style[i]=o[i],"transition"===i&&(t.children[0].children[0].style.transition=o.transition))})),t.children[0].children[0].setAttribute("fill",n)}resizeGap(){const t=(parseFloat(getComputedStyle(this.carouselItemContainer).width)-this.itemWidth*this.numItemsVisible)/(this.numItemsVisible-1);this.carouselItemContainer.style.gap=t>this.itemSpacing?t+"px":this.itemSpacing+"px"}resizeScale(){for(let t=0;t<this.carouselItemContainer.children.length;t++)this.carouselItemContainer.children[t].style.flexGrow="1",this.carouselItemContainer.children[t].style.flexShrink="1";setTimeout((()=>{if(0!==this.carouselItemContainer.children.length)try{this.itemWidth=parseFloat(getComputedStyle(this.carouselItemContainer.children[0]).width)}catch(t){console.log("Tried getting the computed style for a carousel item, caught the following exception:",t)}else this.itemWidth=this.originalItemWidth;const t="stretch-scale"===this.resizingMethod?this.itemAspectRatio*this.itemWidth:this.itemHeight;for(let e=0;e<this.carouselItemContainer.children.length;e++)this.carouselItemContainer.children[e].style.width=this.itemWidth+"px",this.carouselItemContainer.children[e].style.height=t+"px",this.carouselItemContainer.children[e].style.flexGrow="0",this.carouselItemContainer.children[e].style.flexShrink="0";this.allItems.forEach((e=>{e.style.width=`${this.itemWidth}px`,e.style.height=`${t}px`,e.style.flexGrow="0",e.style.flexShrink="0"})),setTimeout((()=>{var t,e,i;this.resizeCarouselItemContainer(),((null===(t=this.buttonStyles.height)||void 0===t?void 0:t.includes("%"))||(null===(e=this.leftButtonStyles.height)||void 0===e?void 0:e.includes("%"))||(null===(i=this.rightButtonStyles.height)||void 0===i?void 0:i.includes("%")))&&setTimeout((()=>{this.carouselContainer.style.height=`${parseFloat(getComputedStyle(this.carouselItemContainer).height)}px`}),0)}),0)}),0)}getCarouselItems(t,e,i=!0){var s;const r=this.allItems.length,o=[];for(;e<0;)e=r+e;for(let n=e;n<e+t;n++)o.push(null===(s=this.allItems[n%r])||void 0===s?void 0:s.cloneNode(i));return o}initializeCarousel(){const t=[];let e=0,i=!0;for(let s=0;s<this.numItemsVisible;s++){const r=this.allItems[(s+this.leftCarouselPointer)%this.allItems.length];if((s+this.leftCarouselPointer)%this.allItems.length!=0||i||e++,"none"==this.wrappingMethod&&e>0){const e=document.createElement("div");e.classList.add("freighter-carousel-item"),e.classList.add("frieght-carousel-item-dummy"),e.style.width=`${this.itemWidth}px`,e.style.height=`${this.itemHeight}px`,t.push(e)}else s<this.numItemsVisible&&r&&t.push(r.cloneNode(!0));i=!1}this.carouselItemContainer.replaceChildren(...t)}transformCarouselItems(t){0===t&&(this.carouselItemContainer.style.transition="none");const e="stretch-gap"===this.resizingMethod?parseFloat(getComputedStyle(this.carouselItemContainer).gap):this.itemSpacing;this.carouselItemContainer.style.transform=`translateX(${-1*t*((this.itemWidth+e)*this.currentScrollBy)}px)`,0===t&&setTimeout((()=>{this.carouselItemContainer.style.transition=this.transition}),0)}resizeCarousel(){"stretch-gap"===this.resizingMethod?this.resizeGap():"stretch"!==this.resizingMethod&&"stretch-scale"!==this.resizingMethod||this.resizeScale()}resizeCarouselItemContainer(){let t;if(this.scrollable)try{t=Math.max(parseFloat(getComputedStyle(this.carouselContainer.children[0]).height),parseFloat(getComputedStyle(this.carouselItemContainer).height),parseFloat(getComputedStyle(this.carouselContainer.children[2]).height))}catch(e){console.log("Tried getting the computed style of a carousel item, caught the following exception:",e),t=0}else t=parseFloat(getComputedStyle(this.carouselItemContainer).height);this.carouselContainer.style.height=`${t}px`}adjustPointers(t){for("wrap-smart"!==this.wrappingMethod&&"none"!==this.wrappingMethod||(this.currentScrollBy=this.scrollBy,this.canScrollLeft=!0,this.canScrollRight=!0,this.allItems.length===this.numItemsVisible?this.currentScrollBy=this.numItemsVisible:"left"===t?0===this.leftCarouselPointer?this.currentScrollBy=this.numItemsVisible:this.leftCarouselPointer<this.scrollBy?this.currentScrollBy=this.leftCarouselPointer:(this.leftCarouselPointer,this.scrollBy):"right"===t&&(0===this.rightCarouselPointer?this.currentScrollBy=this.numItemsVisible:this.scrollBy+this.rightCarouselPointer>this.allItems.length?this.currentScrollBy=this.allItems.length-this.rightCarouselPointer:(this.scrollBy,this.rightCarouselPointer,this.allItems.length))),this.currentScrollBy<0&&(this.currentScrollBy=this.numItemsVisible+this.currentScrollBy),"left"===t?(this.leftCarouselPointer-=this.currentScrollBy,this.rightCarouselPointer-=this.currentScrollBy):"right"===t&&(this.leftCarouselPointer+=this.currentScrollBy,this.rightCarouselPointer+=this.currentScrollBy);this.leftCarouselPointer>=this.allItems.length;)this.leftCarouselPointer-=this.allItems.length;for(;this.rightCarouselPointer>=this.allItems.length;)this.rightCarouselPointer-=this.allItems.length;for(;this.leftCarouselPointer<0;)this.leftCarouselPointer+=this.allItems.length;for(;this.rightCarouselPointer<0;)this.rightCarouselPointer+=this.allItems.length;"none"===this.wrappingMethod&&0===this.leftCarouselPointer&&(this.canScrollLeft=!1),"none"===this.wrappingMethod&&0===this.rightCarouselPointer&&(this.canScrollRight=!1)}getCurrentState(){return{itemWidth:this.originalItemWidth,itemHeight:this.originalItemHeight,itemSpacing:this.itemSpacing,buttonStyles:this.buttonStyles,buttonHoverStyles:this.buttonHoverStyles,leftButtonStyles:this.leftButtonStyles,leftButtonHoverStyles:this.leftButtonHoverStyles,rightButtonStyles:this.rightButtonStyles,rightButtonHoverStyles:this.rightButtonHoverStyles,numItemsVisible:this.numItemsVisible,scrollBy:this.originalScrollBy,containerID:this.carouselContainer.parentElement.id,transitionDuration:this.transitionDuration,transitionDelay:this.transitionDelay,transitionTimingFunction:this.transitionTimingFunction,resizingMethod:this.resizingMethod,carouselID:this.carouselID,carouselItems:this.allItems,leftCarouselPointer:this.leftCarouselPointer,scrollable:this.scrollable,autoScroll:this.autoScroll,autoScrollInterval:this.autoScrollInterval,autoScrollDirection:this.autoScrollDirection,autoScrollPauseOnHover:this.autoScrollPauseOnHover,wrappingMethod:this.wrappingMethod,carouselContainer:this.carouselContainer,syncScrollWithVisibility:this.syncScrollWithVisibility}}startAutoScrollTimeout(){this.autoScrollTimeout=window.setTimeout((()=>{const t=this.scrollable;switch(this.autoScrollDirection){case"left":this.scrollable=!0,this.leftButtonClickListener(new Event("click")),this.scrollable=t;break;case"right":this.scrollable=!0,this.rightButtonClickListener(new Event("click")),this.scrollable=t}}),this.autoScrollInterval)}removeAllEventListeners(){if(this.scrollable)try{this.carouselContainer.children[0].removeEventListener("click",this.leftButtonClickListener),this.carouselContainer.children[2].removeEventListener("click",this.rightButtonClickListener)}catch(t){console.log("Tried removing event listeners from carousel buttons, caught the following exception:",t)}try{this.carouselContainer.removeEventListener("mouseenter",this.containerMouseEnterListener),this.carouselContainer.removeEventListener("mouseleave",this.containerMouseLeaveListener)}catch(t){console.log("Tried removing event listeners from carousel container, caught the following exception:",t)}if(this.scrollable)try{this.carouselContainer.children[0].removeEventListener("mouseenter",this.leftButtonMouseEnterListener),this.carouselContainer.children[0].removeEventListener("mouseleave",this.leftButtonMouseLeaveListener),this.carouselContainer.children[2].removeEventListener("mouseenter",this.rightButtonMouseEnterListener),this.carouselContainer.children[2].removeEventListener("mouseleave",this.rightButtonMouseLeaveListener)}catch(t){console.log("Tried removing event listeners from carousel buttons, caught the following exception:",t)}this.carouselItemContainer.removeEventListener("transitionend",this.transitionEndEventListener),this.parentResizeObserver.disconnect(),clearTimeout(this.autoScrollTimeout)}}function s(t,e){return t.width===e.width&&t.height===e.height&&t.position===e.position&&t.borderTop===e.borderTop&&t.borderRight===e.borderRight&&t.borderBottom===e.borderBottom&&t.borderLeft===e.borderLeft&&t.borderTopLeftRadius===e.borderTopLeftRadius&&t.borderTopRightRadius===e.borderTopRightRadius&&t.borderBottomRightRadius===e.borderBottomRightRadius&&t.borderBottomLeftRadius===e.borderBottomLeftRadius&&t.backgroundColor===e.backgroundColor&&t.color===e.color&&t.cursor===e.cursor&&t.transition===e.transition}function r(t){if(void 0!==(null==t?void 0:t.position)&&"top"!==(null==t?void 0:t.position)&&"center"!==(null==t?void 0:t.position)&&"bottom"!==(null==t?void 0:t.position))throw new Error("Button position must be one of the following: 'top', 'center', 'bottom'.")}i.maxID=-1;class o{constructor(t,e,i,s){if(!s)throw new Error("Carousel properties must be provided.");this.populateResizeObserver=null,this.carousel=this.changeCarouselOptions(Object.assign({containerID:t,resizingMethod:e,wrappingMethod:i},s))}setCarouselProperties(t){const e=this.carousel.getCurrentState();this.changeCarouselOptions(Object.assign(Object.assign(Object.assign({},e),t),{buttonStyles:Object.assign(Object.assign({},e.buttonStyles),t.buttonStyles),buttonHoverStyles:Object.assign(Object.assign({},e.buttonHoverStyles),t.buttonHoverStyles),leftButtonStyles:Object.assign(Object.assign({},e.leftButtonStyles),t.leftButtonStyles),leftButtonHoverStyles:Object.assign(Object.assign({},e.leftButtonHoverStyles),t.leftButtonHoverStyles),rightButtonStyles:Object.assign(Object.assign({},e.rightButtonStyles),t.rightButtonStyles),rightButtonHoverStyles:Object.assign(Object.assign({},e.rightButtonHoverStyles),t.rightButtonHoverStyles)}))}getCarouselState(){return this.carousel.getCurrentState()}addCarouselItems(t,e){void 0!==t.length?this.addCarouselItemsHelper(t,e):this.addCarouselItemsHelper([t],e)}removeCarouselItems(t,e=1){const i=this.carousel.getCurrentState();if(!i.numItemsVisible)throw new Error("Number of items visible is undefined, but required for 'stretch-populate' recalculations.");if("none"===i.wrappingMethod||"wrap-smart"===i.wrappingMethod){for(i.leftCarouselPointer+i.numItemsVisible===i.carouselItems.length&&(i.leftCarouselPointer-=e);i.leftCarouselPointer+i.numItemsVisible-1>=i.carouselItems.length-e;)i.leftCarouselPointer-=e;i.leftCarouselPointer<0&&(i.leftCarouselPointer=0)}i.carouselItems.splice(t,e),this.changeCarouselOptions(Object.assign(Object.assign({},i),{carouselItems:[...i.carouselItems]}))}changeCarouselOptions(t){var e,o,n;return this.carousel&&(o=t,n=this.carousel.getCurrentState(),o.containerID===n.containerID&&o.itemWidth===n.itemWidth&&o.itemHeight===n.itemHeight&&o.itemSpacing===n.itemSpacing&&o.numItemsVisible===n.numItemsVisible&&o.scrollBy===n.scrollBy&&o.transitionDuration===n.transitionDuration&&o.transitionDelay===n.transitionDelay&&o.transitionTimingFunction===n.transitionTimingFunction&&o.scrollable===n.scrollable&&o.autoScroll===n.autoScroll&&o.autoScrollInterval===n.autoScrollInterval&&o.autoScrollDirection===n.autoScrollDirection&&o.autoScrollPauseOnHover===n.autoScrollPauseOnHover&&o.syncScrollWithVisibility===n.syncScrollWithVisibility&&o.resizingMethod===n.resizingMethod&&o.wrappingMethod===n.wrappingMethod&&s(o.buttonStyles,n.buttonStyles)&&s(o.buttonHoverStyles,n.buttonHoverStyles)&&s(o.leftButtonStyles,n.leftButtonStyles)&&s(o.leftButtonHoverStyles,n.leftButtonHoverStyles)&&s(o.rightButtonStyles,n.rightButtonStyles)&&s(o.rightButtonHoverStyles,n.rightButtonHoverStyles)&&o.carouselItems===n.carouselItems)?(console.warn("The new Carousel options are the same as the current ones."),this.carousel):(this.populateResizeObserver="stretch-populate"===t.resizingMethod?new ResizeObserver(this.recalculateCarouselPopulation.bind(this)):null,function(t){if(!t.containerID||0===t.containerID.length)throw new Error("containerID must be a non-empty string.");if(t.resizingMethod&&"none"!==t.resizingMethod&&"stretch"!==t.resizingMethod&&"stretch-gap"!==t.resizingMethod&&"stretch-scale"!==t.resizingMethod&&"stretch-populate"!==t.resizingMethod)throw new Error("resizingMethod must be one of the following: 'none', 'stretch', 'stretch-gap', 'stretch-scale'.");if(t.wrappingMethod&&"wrap-simple"!==t.wrappingMethod&&"wrap-smart"!==t.wrappingMethod&&"none"!==t.wrappingMethod)throw new Error("wrappingMethod must be one of the following: 'none', 'wrap-simple', 'wrap-smart'.");if(void 0!==t.itemSpacing&&t.itemSpacing<0)throw new Error("itemSpacing must be a positive number or 0.");if(void 0!==t.scrollBy&&(t.scrollBy<1||t.scrollBy%1!=0))throw new Error("scrollBy must be a positive integer greater than 1.");if(void 0!==t.numItemsVisible&&(t.numItemsVisible<1||t.numItemsVisible%1!=0))throw new Error("numItemsVisible must be a positive integer greater than 0.");if(void 0!==t.transitionDuration&&t.transitionDuration<0)throw new Error("transitionDuration must be a positive number or 0.");if(null!=t.transitionDelay&&t.transitionDelay<0)throw new Error("transitionDelay must be a positive number or 0.");if(null!=t.transitionTimingFunction&&0===t.transitionTimingFunction.length)throw new Error("transitionTimingFunction must be a non-empty string.");r(t.buttonStyles),r(t.buttonHoverStyles),r(t.leftButtonStyles),r(t.leftButtonHoverStyles),r(t.rightButtonStyles),r(t.rightButtonHoverStyles)}(t),function(t){0==t.transitionDuration&&(t.transitionDuration=1)}(t),this.carousel&&this.carousel.removeAllEventListeners(),null===(e=this.populateResizeObserver)||void 0===e||e.disconnect(),this.carousel=new i(t),this.populateResizeObserver&&(this.populateResizeObserver.observe(this.carousel.getCurrentState().carouselContainer.parentElement),this.recalculateCarouselPopulation()),this.carousel)}recalculateCarouselPopulation(){for(;this.recalculateCarouselPopulationHelper(););}recalculateCarouselPopulationHelper(){const t=this.carousel.getCurrentState();let e=!1;if(!t.itemWidth)throw new Error("Item width is undefined, but required for 'stretch-populate' recalculations.");if(!t.itemSpacing)throw new Error("Item spacing is undefined, but required for 'stretch-populate' recalculations.");if(!t.numItemsVisible)throw new Error("Number of items visible is undefined, but required for 'stretch-populate' recalculations.");const i=parseFloat(getComputedStyle(t.carouselContainer).width)-t.numItemsVisible*t.itemWidth;return i>t.itemWidth+(t.numItemsVisible+1)*t.itemSpacing?("none"!==t.wrappingMethod&&"wrap-smart"!==t.wrappingMethod||(t.leftCarouselPointer+t.numItemsVisible===t.carouselItems.length&&t.leftCarouselPointer--,t.leftCarouselPointer<0&&(t.leftCarouselPointer=0)),"none"===t.wrappingMethod&&t.numItemsVisible>t.carouselItems.length||(this.changeCarouselOptions(Object.assign(Object.assign({},t),{numItemsVisible:t.numItemsVisible+1})),e=!0)):i<t.numItemsVisible*t.itemSpacing&&t.numItemsVisible>1&&(this.changeCarouselOptions(Object.assign(Object.assign({},t),{numItemsVisible:t.numItemsVisible-1})),e=!0),e}addCarouselItemsHelper(t,e){const i=this.carousel.getCurrentState();void 0!==e?i.carouselItems.splice(e,0,...t):i.carouselItems.push(...t),this.changeCarouselOptions(Object.assign(Object.assign({},i),{carouselItems:[...i.carouselItems]}))}}return e.default})()));