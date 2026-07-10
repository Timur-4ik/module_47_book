	import { Slider } from "./slider"
	import { Books } from "./books"
	import "../sass/style.scss"

	
	
	let imageList = ["../src/img/banner.png", "../src/img/banner2.png", "../src/img/banner3.png"]


    let categoryesList = ["Architecture", "Art & Fashion", "Biography", "Business",
	"Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", 
	"History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", 
	"Travel & Maps"]
	


	
let books = new Books(categoryesList)
let slider = new Slider(imageList)

