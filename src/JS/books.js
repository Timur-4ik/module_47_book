
class Books {
	
	constructor(list) {
		
			this.loadindex = 0 
			this.key = "AIzaSyCyDsw_qgyNBy67PVzdju5YEq2ItKvhPGE"
			this.contentCategories = document.querySelector(".content__categories")
			this.containerBookCards = document.querySelector(".content__container--book-cards")
			this.headerContainerIconBasket = document.querySelector(".header__container--icon-basket")
			this.headerContainerBasketNav = document.querySelector(".header__container--basket-nav")
			this.loader = document.querySelector(".loader")
			this.buttonLoadMore = document.querySelector(".button__load-more")
			this.categorySearch = ""
			this.categories = list
			this.localStorage = new Array
			this.addCategoriesToHtml()
		}

		async fetchData() {
			try {
				this.removeErrorWinodw()
				this.loader.style.display = "block"

				this.data = await fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${this.categorySearch}"&key=${this.key}&printType=books&startIndex=${this.loadindex}&maxResults=6&langRestrict=en`);
				this.response = await this.data.json();
				if (!this.response.error) {
					for (let book of this.response.items) {
						this.addBookCards(book)
					}
					this.loadindex += 6

				} else {
					 throw new Error(`Что-то пошло не так: Код: ${this.response.error.code}, message: ${this.response.error.message}`)
				}
					
			} 
			catch (err) {this.createErrorWinodw()}
			finally {
				this.loader.style.display = "none"
				this.addButtonLoadMore()
			}}
		

		createErrorWinodw() {
			let contentContainerError = document.createElement("div")
			contentContainerError.classList.add("content__container", "content__container--error")
			let errorIMG = document.createElement("img")
			errorIMG.src = "../src/img/error.png"
			errorIMG.alt = "error"
			let errorMessage = document.createElement("span")
			errorMessage.classList.add("content__error")
			errorMessage.textContent = "Sorry, something went wrong."
			contentContainerError.appendChild(errorIMG)
			contentContainerError.appendChild(errorMessage)
			this.containerBookCards.appendChild(contentContainerError)
		}

		removeErrorWinodw() {
			let contentContainerError = document.querySelector(".content__container--error")
			if (contentContainerError){
				contentContainerError.remove()
			}
		}

		addButtonLoadMore(){
			let ContainerButton = document.querySelector(".content__container--button")
			if (ContainerButton) {
				ContainerButton.remove()
			}

			let contentContainerButton = document.createElement("div")
			contentContainerButton.classList.add("content__container", "content__container--button")
			let buttonLoadMore = document.createElement("button")
			buttonLoadMore.classList.add("button", "button__load-more")
			buttonLoadMore.textContent = "load more"
			buttonLoadMore.addEventListener("click", () => {
			this.fetchData()})

			contentContainerButton.appendChild(buttonLoadMore)
			this.containerBookCards.appendChild(contentContainerButton)
		}
			
		addCategoriesToHtml() {	
			
			for (let category of this.categories) {
				
				let elem = document.createElement("li")
				elem.dataset.id = category
				elem.classList.add("content__item")
				elem.textContent = category

				elem.addEventListener("click", (event)=>{this.setActiveCategories(event.currentTarget.dataset.id)})

				this.contentCategories.appendChild(elem)

			}

			this.setActiveCategories(this.categories[0])
			}

		setActiveCategories(category) {
			for (let cat of this.contentCategories.querySelectorAll(".content__item")) {
				cat.classList.remove("content__item--active")
			}
			let activeCategory = this.contentCategories.querySelector(`[data-id="${category}"`)
			activeCategory.classList.add("content__item--active")
			this.categorySearch = category
			this.loadindex = 0
			this.containerBookCards.innerHTML = ""
			this.fetchData()
			}

		addBookCards (object) {
			//создаем главный блок карточки книги
			let bookCards = document.createElement("div")
			bookCards.classList.add("book-cards")

			let urlImg =""
			
			//проверем есть ли у книги изображение, если изображение есть используем его, если нет ставим дефолтное
			if (object.volumeInfo.imageLinks.thumbnail) {
				urlImg = object.volumeInfo.imageLinks.thumbnail;
			} else {
				urlImg = "../src/img/book.png";
			}
			//создаем элемент изображения и добавляем в карточку

			let bookCardsImg = document.createElement("img")
			bookCardsImg.src = urlImg
			bookCardsImg.alt = "Foto book"
			bookCardsImg.classList.add("book-cards__img")

			bookCards.appendChild(bookCardsImg)

			//создаем блок с информацией о книге
			
			let bookCardsInfo = document.createElement("div")
			bookCardsInfo.classList.add("book-cards__info")
			
			//добавляем в карточку авторов книги
			
			let bookCardsAuthors = document.createElement("span")
			bookCardsAuthors.classList.add("book-cards__authors")
			bookCardsAuthors.textContent = object.volumeInfo.authors.join(', ');
			bookCardsInfo.appendChild(bookCardsAuthors)

			//добавляем в карточку назваине книги
			let bookCardsTitle = document.createElement("span")
			bookCardsTitle.classList.add("book-cards__title")
			bookCardsTitle.textContent = object.volumeInfo.title;
			bookCardsInfo.appendChild(bookCardsTitle)
			
			//проверяем есть ли у книги рейтинг, если есть добавляем в карточку
			
			if (object.volumeInfo.averageRating) {
				
				let bookCardsRating = document.createElement("div")
				bookCardsRating.classList.add("book-cards__rating")

				let bookCardsAverageRating = document.createElement("div")
				bookCardsAverageRating.classList.add("book-cards__average-rating")

				let rating = object.volumeInfo.averageRating
			 
			for (let i=1; i <= 5; i++) {
				let x = 0
		
				if (i <= Math.floor(rating)) {
					x = 100				
				}

				if(i === (Math.floor(rating)+1)){
					x = Math.floor((rating % 1) * 100)
				}

				if(i > (Math.floor(rating)+1)){
					x = 0					
				}
				
				let svgStar = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<mask id="half_${i}">
									<rect x="0" y="0" width="12" height="11" fill="white" />
									<rect x="${x}%" y="0" width="12" height="11" fill="black" />
								</mask>
								<mask id="halfa_${i}">
									<rect x="0" y="0" width="12" height="11" fill="black" />
									<rect x="${x}%" y="0" width="12" height="11" fill="white" />
								</mask>

								<symbol viewBox="0 0 12 11" id="star">
									<path d="M5.70633 0L7.51201 3.5147L11.4127 4.1459L8.62798 6.9493L9.23304 10.8541L5.70633 9.072L2.17962 10.8541L2.78468 6.9493L-9.53674e-06 4.1459L3.90065 3.5147L5.70633 0Z"/>
								</symbol>


								</defs>
									<use xlink:href="#star" mask="url(#half_${i})" fill="#F2C94C"></use>
									<use xlink:href="#star" mask="url(#halfa_${i})" fill="#EEEDF5"></use>
								</svg>`
						
				bookCardsAverageRating.innerHTML += svgStar
			}

				bookCardsRating.appendChild(bookCardsAverageRating)


				let bookCardsRatingsCount = document.createElement("span")
				bookCardsRatingsCount.classList.add("book-cards__ratings-count")
				bookCardsRatingsCount.textContent = object.volumeInfo.ratingsCount + " review"

				bookCardsRating.appendChild(bookCardsRatingsCount)

				bookCardsInfo.appendChild(bookCardsRating)
			}


			//проверяем есть ли у книги описание, если есть добавляем в карточку
						
			let description = "";

			if (object.volumeInfo.description) {
				description = object.volumeInfo.description
			} else {
				description = "not description"
			}

			let bookCardsDescription = document.createElement("span")
			bookCardsDescription.classList.add("book-cards__description")
			bookCardsDescription.textContent = description
			bookCardsInfo.appendChild(bookCardsDescription)


			// проверям продается ли книга, в зависимости от результата стилизуем кнопку и добавляем цену на книгу в карточку
            let sale = object.saleInfo.saleability
			
			let price = ""
            let buttonClass = ""
            let buttonBody = ""
			if (sale === "FOR_SALE") {
				if (object.saleInfo.retailPrice.currencyCode === "RUB") {
					price = `${object.saleInfo.retailPrice.amount} ${object.saleInfo.retailPrice.currencyCode}`
				} else {
					price = `${object.saleInfo.retailPrice.currencyCode} ${object.saleInfo.retailPrice.amount}`
				}
				
                buttonClass = "button__book-cards"
                buttonBody = "buy now"
			}

            if (sale === "FREE") {
                price = "FREE"
				buttonClass = "button__book-cards"
                buttonBody = "buy now"
			}
            
            if (sale === "NOT_FOR_SALE") {
                 buttonClass = "button__book-cards--not-sale"
                 buttonBody = "not sale"
            }


			let bookCardsPrice = document.createElement("span")
			bookCardsPrice.classList.add("book-cards__price")
			bookCardsPrice.textContent = price
			bookCardsInfo.appendChild(bookCardsPrice)

			let button = document.createElement("button")
			button.dataset.id = object.id
			button.classList.add("button", "button__book-cards" ,`${buttonClass}`)
			button.textContent = buttonBody

			button.addEventListener("click", (event)=>{this.addRemovInBasket(event)})

			bookCardsInfo.appendChild(button)

			bookCards.appendChild(bookCardsInfo)
				
			this.containerBookCards.appendChild(bookCards)
			}

		addRemovInBasket(event) {
			//добавить/удалить книгу из корзины
			let btn = event.currentTarget
			if(!btn.classList.contains("button__book-cards--not-sale")){
				if (!btn.classList.contains("button__book-cards--active")) {
					btn.classList.add("button__book-cards--active")
					btn.textContent = "in the cart"
					this.localStorage.push(btn.dataset.id)

				} else {
					btn.classList.remove("button__book-cards--active")
					this.localStorage.splice(this.localStorage.indexOf(btn.dataset.id))
					btn.textContent = "buy now"
				}

				if (this.localStorage.length != 0) {

					this.headerContainerIconBasket.textContent = this.localStorage.length
					this.headerContainerIconBasket.style.display = "flex"

					this.headerContainerBasketNav.textContent = this.localStorage.length
					this.headerContainerBasketNav.style.display = "flex"

				} else {

					this.headerContainerIconBasket.textContent = ""
					this.headerContainerIconBasket.style.display = "none"

					this.headerContainerBasketNav.textContent = ""
					this.headerContainerBasketNav.style.display = "none"
				}
			}
			}

}


export {Books}