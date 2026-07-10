class Slider {
		
	constructor(list) {
		this.imageCount = 0 
		this.list = list
		this.startAutoScroll = null
		this.timer = 5000
		this.contentImgBanner = document.querySelector(".content__container--img-slider")
		
		this.contentContainerMarkers = document.querySelector(".content__container--markers")
		this.addMarkersToHtml()
		this.startScroll()
	}

	setCount(count) {	
		this.imageCount = count

	}

	getCount(){
		return this.imageCount
	}

	setTimer(count){
		this.timer = count 
	}


	addActiveMarker (dataSetId) {
		this.contentMarker = document.querySelectorAll(".content__marker")
		for (let elem of this.contentMarker) {
			elem.classList.remove("content__marker--active")
			if (elem.dataset.id === dataSetId) {
				elem.classList.add("content__marker--active")
			}
		}
	}


	addBannerToHtml(count) {
	
		this.contentImgBanner.innerHTML = `<img class="content__img content__img--banner" src=${this.list[count]} alt="Фото">`

		this.addActiveMarker(String(count))
    	
	}



	addMarkersToHtml() {

	for (let i = 0; i < this.list.length; i++) {
		
				let marker = document.createElement("div")
				marker.dataset.id = i
				marker.classList.add("content__marker")

				marker.addEventListener("click", (event)=>{
					let id = event.currentTarget.dataset.id
										
					this.addBannerToHtml(Number(id))
					this.setCount(Number(id))
					this.startScroll()
				})

				this.contentContainerMarkers.appendChild(marker)

		}

    	this.addBannerToHtml(0)
    
	}

	Scroll() {
		this.imageCount += 1
		if (this.imageCount < this.list.length) {
			this.addBannerToHtml(this.imageCount)

		} else {
			this.imageCount = 0
			this.addBannerToHtml(this.imageCount)
		}
	}

	startScroll() {
		if (this.startAutoScroll) {
			clearInterval(this.startAutoScroll)
			} 

			this.startAutoScroll = setInterval(this.Scroll.bind(this), this.timer)
		}
	}


export {Slider}