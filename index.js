window.onload = onReady;

function onReady() {
	(function() {
		var accordionComponent = {
			init: function() {
				this.componentClassSelector = '.component-accordion';
				this.parentClassSelector = '.role-parent';
				this.contentClassSelector = '.role-content';
				this.tabClassSelector = '.role-tab';
				this.tabClass = 'role-tab';
				this.activeClass = "active";
				this.components = document.querySelectorAll(this.componentClassSelector);

				if(this.components.length) {
					this.attachEvents();
				}
			},
			onTabClick: function(event) {
				var target = event.target,
					currTarget = event.currentTarget,
					accordionType = currTarget.getAttribute('data-type') || 'single',
					parentLi,
					contentElem,
					parentElems,
					currentParentElem;

				if(target.classList.contains(this.tabClass)) {
					event.preventDefault();

					parentLi = target.parentNode;
					contentElem = parentLi.querySelector(this.contentClassSelector);

					target.setAttribute("aria-expanded", true);
					contentElem.setAttribute("aria-hidden", false);
					parentLi.classList.toggle(this.activeClass);

					if(accordionType === 'single') {
						parentElems = currTarget.querySelectorAll(this.parentClassSelector);
						for(var i=0; i<parentElems.length; i++) {
							currentParentElem = parentElems[i];
							if(currentParentElem != parentLi) {
								currentParentElem.querySelector(this.tabClassSelector).setAttribute("aria-expanded", false);
								currentParentElem.querySelector(this.contentClassSelector).setAttribute("aria-hidden", true);
								currentParentElem.classList.remove(this.activeClass);
							}
						}
					}
				}
			},
			attachEvents: function() {
				for(var i = 0; i< this.components.length; i++) {
					this.components[i].addEventListener('click', this.onTabClick.bind(this));
				}
			}
		};
		accordionComponent.init();
	})();
}