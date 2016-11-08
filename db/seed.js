const db = require('APP/db');
const Chance = require('chance');
const chance = new Chance(Math.random);

// arrays for ENUM
const productType = ['chair', 'table', 'bed', 'closet', 'sofa', 'desk'],
	productCategory = ['bedroom', 'livingroom', 'kitchen', 'office', 'bath', 'dining'],
	orderStatus = ['created', 'processing', 'cancelled', 'completed'],
	cardType = ['visa', 'amex', 'mastercard'];

// create methods generating random object
chance.mixin({
	// addresses: () => {
	// 	return {
	// 		street1: chance.address(),
	// 		street2: chance.areacode(),
	// 		city: chance.city(),
	// 		state: chance.state(),
	// 		zip: chance.zip()
	// 	};
	// },
	cartProducts: () => {
		return {
			sessionId: chance.string(),
			quantity: chance.natural({max:100}),
			product_id: chance.natural({min:1, max:5}),
		}
	},
	creditCards: () => {
		return {
			number: chance.cc(),
			expiry_date: chance.exp(),
			security_code: chance.natural({min: 100, max: 999}),
			user_id: chance.natural({min:1, max:5}),
			card_type: chance.pickone(cardType)
		};
	},
	lineItems: () => {
		return {
			quantity: chance.natural({min:1, max:8}),
			price: chance.floating({min: 10, max: 200, fixed: 2}),
			order_id: chance.natural({min:1, max:5}),
			product_id: chance.natural({min:1, max:5})
		}
	},
	orders: () => {
		return {
			confirmation_number: chance.string(),
			status: chance.pickone(orderStatus),
			order_date: chance.date(),
			user_id: chance.natural({min:1, max:5}),
			shipping_address_id: chance.natural({min:1, max:5}),
			billing_address_id: chance.natural({min:1, max:5}),
			credit_card_id: chance.natural({min:1, max:5}),
		}
	},
	// products: () => {
	// 	const thisType = chance.pickone(productType)
	// 	return {
	// 		name: chance.first() + ' ' + thisType,
	// 		price: chance.floating({min: 10, max: 200, fixed: 2}),
	// 		description: chance.paragraph({sentences: 1}),
	// 		quantity: chance.natural({max:100}),
	// 		type: thisType,
	// 		color: chance.color({format: 'hex'}),
	// 		style: chance.pickone(productStyle),
	// 		category: chance.pickone(productCategory),
	// 		material: chance.pickone(productMaterial),
	// 		images: ["https://dummyimage.com/320x150/ddd/fff.jpg&text=1", "https://dummyimage.com/320x150/ddd/fff.jpg&text=2", "https://dummyimage.com/320x150/ddd/fff.jpg&text=3"]
	// 	};
	// },
	// reviews: () => {
	// 	return {
	// 		rating: Math.floor(Math.random() * 5) + 1,
	// 		comment: chance.paragraph({sentences: 1}),
	// 		product_id: chance.natural({min:1, max:5}),
	// 		user_id: chance.natural({min:1, max:5})
	// 	};
	// },
	// users: () => {
	// 	return {
	// 		first_name: chance.first(),
	// 		last_name: chance.last(),
	// 		email: chance.email(),
	// 		isAdmin: chance.bool({likelihood: 20}),
	// 		password: '123123',
	// 		shipping_address_id: chance.natural({min:1, max:5}),
	// 		billing_address_id: chance.natural({min:1, max:5})
	// 	};
	// },
})

const productlist = [{name: "Felix Living Room Set", price: "1545.00", description: "-Essential living room set delivered to your door\n-Boxes fit through standard doorways, stairs, and elevators\n-No tools required for assembly", quantity: 10, type: "sofa", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/living-room-main_e7562283-acc4-4e1f-83ab-693b13e0b33d_large.jpg?v=1478447772"]},
{name: "Felix Sectional", price: "1015.00", description: "-Memory foam in seat evenly distributes body weight\n-Polyurethane foam in seat adds support and durability\n-Fiber fill foam in pillows is soft and fluffy\n-No tools required for assembly\n-Machine washable slipcovers", quantity: 5, type: "sofa", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/sectional-main_large.jpg?v=1478289506"]},
{name: "Felix Sofa", price: "645.00", description: "-Memory foam in seat evenly distributes body weight\n-Polyurethane foam in seat adds support and durability\n-Fiber fill foam in pillows is soft and fluffy\n-No tools required for assembly\n-Machine washable slipcovers", quantity: 5, type: "sofa", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/Product_Sofa_large.jpg?v=1478446431"]},
{name: "Felix Chaise", price: "375.00", description: "-Memory foam in seat evenly distributes body weight\n-Polyurethane foam in seat adds support and durability\n-Fiber fill foam in pillows is soft and fluffy\n-No tools required for assembly\n-Machine washable slipcovers", quantity: 5, type: "sofa", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/chaise-gallery01_large.jpg?v=1478446448"]},
{name: "Felix Coffee Table", price: "185.00", description: "-Ash hardwood dowels are firm and high load-bearing\n-Baltic birch plywood panel is durable and warp resistant\n-Powder coated steel reduces scratching and staining\n-No tools required for assembly\n-Height compliments the sofa and chaise", quantity: 10, type: "table", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/coffee-table-gallery01_large.jpg?v=1478451747"]},
{name: "Felix Bookshelf", price: "175.00", description: "-Ash hardwood dowels are firm and high load-bearing\n-Baltic birch plywood panel is durable and warp resistant\n-No tools required for assembly", quantity: 10, type: "closet", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/bookshelf-gallery01_large.jpg?v=1478451362"]},
{name: "Felix Side Table", price: "125.00", description: "-Proudly hold the airiest popcorn and heaviest drinks\n-Ash hardwood dowels are firm and high load-bearing\n-Powder coated steel reduces scratching and staining\n-No tools required for assembly\n-Height compliments the sofa and chaise", quantity: 10, type: "table", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/side-table-main_large.jpg?v=1478449109"]},
{name: "Felix Slipcovers", price: "100.00", description: "-For when your pet tears apart your first set or need a new look\n-Machine washable slipcovers\n-Compatible with the sofa and chaise\n-Ships in one manageable-sized box", quantity: 5, type: "sofa", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/slipcovers-gallery01_large.jpg?v=1476472238"]},
{name: "Brooks Folding Table", price: "225.00", description: "Brooks is a high-quality collection of solid wood pieces that unfold in seconds.\n They ship in a box, direct to your door. Limited availability.", quantity: 15, type: "table", category: "livingroom", images: ["//cdn.shopify.com/s/files/1/0338/3945/products/WOTable1_large.jpg?v=1478019397"]},
{name: "Campaign Chair", price: "495.00", description: "-Laser-cut, powder-coated steel frames, and solid hardwood legs\n-Designed to move, packs perfectly into 2 boxes\n-No tools required for assembly", quantity: 5, type: "chair", category: "livingroom", images: ["http://www.campaignliving.com/images/products/seat-1-blue.jpg"]},
{name: "Campaign Seat", price: "745.00", description: "-Laser-cut, powder-coated steel frames, and solid hardwood legs\n-Designed to move, packs perfectly into 2 boxes\n-No tools required for assembly", quantity: 5, type: "sofa", category: "livingroom", images: ["http://www.campaignliving.com/images/products/seat-2-blue.jpg"]},
{name: "Campaign Sofa", price: "995.00", description: "-Laser-cut, powder-coated steel frames, and solid hardwood legs\n-Designed to move, packs perfectly into 2 boxes\n-No tools required for assembly", quantity: 5, type: "sofa", category: "livingroom", images: ["http://www.campaignliving.com/images/products/seat-3-blue.jpg"]},
{name: "Buckley Credenza", price: "200.00", description: "-Unique and eye-catching, this credenza packs vintage details into an endlessly functional storage space.", quantity: 5, type: "table", category: "livingroom", images: ["https://joybird2.imgix.net/image_1922_109.jpg"]},
{name: "Webb Coffee Table", price: "150.00", description: "Never sacrifice storage for style - you can have it all in a high-quality, handcrafted hardwood frame.", quantity: 5, type: "table", category: "livingroom", images: ["https://joybird2.imgix.net/image_902_109.jpg"]},
{name: "Stern End Table ", price: "100.00", description: "With each curve of its Space Age silhouette, this nouveau-retro end table refuses to fade into history.", quantity: 5, type: "table", category: "livingroom", images: ["https://joybird2.imgix.net/image_6391_109.jpg"]}
]

const reviewlist = [{id:1,rating:5,comment: "The living room set is great", product_id: 1, user_id: 1},
{id:2,rating:4,comment: "Overall great, I have no problems with fully recommending them for your furniture needs!", product_id: 1, user_id: 2},
{id:3,rating:5,comment: "Great quality materials, easy to assemble, nice aesthetics. The couch pillows are a little small and the arm doesn't attach to the chaise (when combined with the couch) are two rather nitpicky observations I had, but otherwise extremely satisfied and would recommend to others.", product_id: 1, user_id: 3},
{id:4,rating:4,comment: "Different than the rest. I really like the furniture, setup, and company (customer service, marketing, shipping experience, etc.). I think it is great for a smaller apartment.", product_id: 1, user_id: 4},
{id:5,rating:5,comment: "Great design.Simple furniture. Easy to assemble. Fast shipping. Decently priced. Good customer service.", product_id: 2, user_id: 5},
{id:6,rating:5,comment: "Superior. Cost, design, and shipping. Easy to assemble, high quality materials, great packaging.", product_id: 2, user_id: 6},
{id:7,rating:5,comment: "Enjoyable to assemble. The Felix sectional that we purchased is beautiful, durable, comfortable and affordable ", product_id: 2, user_id: 7},
{id:8,rating:5,comment: "Very surprised. I was very pleasantly surprised how east they were to assemble. The sofa is super comfortable, and very stylish. If I could give them 6 stars, I would.", product_id: 3, user_id: 8},
{id:9,rating:5,comment: "Awesome furniture, clean lines and great customer service. Beautiful and minimalist.", product_id: 3, user_id: 9},
{id:10,rating:5,comment: "Exceeded our expectations.The end-to-end process of getting furniture defied every normal expectation of what it normally takes to get an apartment set-up. Assembling our Felix couch was basically less hassle than getting our coffee machine loaded and going in the morning.", product_id: 3, user_id: 10},
{id:11,rating:5,comment: "Good design. Fast shipping, easy assembly, good quality", product_id: 4, user_id: 1},
{id:12,rating:5,comment: "Happy with the experience. Convenience, Appearance, Durability, Innovation", product_id: 4, user_id: 2},
{id:13,rating:5,comment: "Amazing. The smart design of the product. The ease of assembly. The excellent packaging. The illustrations in the instructions. The quality of the customer service.", product_id: 4, user_id: 3},
{id:14,rating:4,comment: "Look was great but it was a bit pricey", product_id: 5, user_id: 4},
{id:15,rating:3,comment: "Issues with the product but customer service was good", product_id: 5, user_id: 5},
{id:16,rating:3,comment: "Simple but expensive", product_id: 5, user_id: 6},
{id:17,rating:5,comment: "Well made, great value.The bookshelf is sturdy and good looking. I think that JustHome products are very well made and a great value. They were super knowledgeable about their products, and very nice to do business with.", product_id: 6, user_id: 7},
{id:18,rating:5,comment: "Excellent products and pricing. It's easy to assemble, convenient, and decently priced.", product_id: 6, user_id: 8},
{id:19,rating:5,comment: "Simple. Ease of assembly. Great design, great value!", product_id: 6, user_id: 9},
{id:20,rating:5,comment: "Great Product. A clean, minimalist design and so easy to put together. They also had the friendliest customer service.", product_id: 6, user_id: 10},
{id:21,rating:4,comment: "Very stylish.Great customer service. Easy to assemble.", product_id:7, user_id: 1},
{id:22,rating:3,comment: "Furniture is basic. Decent quality but unremarkable", product_id: 7, user_id: 2},
{id:23,rating:4,comment: "Does the job.Satisfied with product and service", product_id: 7, user_id: 3},
{id:24,rating:4,comment: "Good compliment with the sofa and chaise", product_id: 8, user_id: 4},
{id:25,rating:5,comment: "Great for portability and stylish", product_id: 9, user_id: 5},
{id:26,rating:5,comment: "Obsessed.This chair is beyond my expectation! It's perfect for my sunroom!", product_id: 10, user_id: 6},
{id:27,rating:5,comment: "This chair is beautiful. I get compliments from everyone that enters about the awesome chair I have in the den. It is soft to the touch, the recline is relaxing", product_id: 10, user_id: 7},
{id:28,rating:4,comment: "Gorgeous, Well-Made Chair. They have good comfy firm cushions (no getting swallowed up in these chairs!) and are beautiful. The styling is just lovely", product_id: 10, user_id: 8},
{id:29,rating:5,comment: "Great design.Simple furniture. Easy to assemble. Fast shipping. Decently priced. Good customer service.", product_id: 11, user_id: 9},
{id:30,rating:4,comment: "Superior. Cost, design, and shipping. Easy to assemble, high quality materials, great packaging.", product_id: 11, user_id: 10},
{id:31,rating:5,comment: "Enjoyable to assemble. The Campaign Seat that we purchased is beautiful, durable, comfortable and affordable ", product_id: 11, user_id: 1},
{id:32,rating:5,comment: "Very surprised. I was very pleasantly surprised how east they were to assemble. The sofa is super comfortable, and very stylish. If I could give them 6 stars, I would.", product_id: 12, user_id: 2},
{id:33,rating:5,comment: "Awesome furniture, clean lines and great customer service. Beautiful and minimalist.", product_id: 12, user_id: 3},
{id:34,rating:5,comment: "Exceeded our expectations.The end-to-end process of getting furniture defied every normal expectation of what it normally takes to get an apartment set-up. Assembling our Felix couch was basically less hassle than getting our coffee machine loaded and going in the morning.", product_id: 12, user_id: 4},
{id:35,rating:5,comment: "Gorgeous. The quality on this piece is breathtaking. The craftsmanship is outstanding!", product_id: 13, user_id: 5},
{id:36,rating:5,comment: "Beautiful table! I absolutely love my new coffee table! It is so solid and beautiful! It looks wonderful in my living room. I love the storage it provides for all my unread magazines without looking cluttered too! The whole process from order to delivery went very smoothly too!", product_id: 14, user_id: 6},
{id:37,rating:4,comment: "Very pleased. The construction is solid, definitely a quality piece. The only reason I gave it 4 instead of 5 stars is because the finish on the table is very soft.", product_id: 14, user_id: 7},
{id:38,rating:5,comment: "Perfect Mid Century Side Table.This is one of the best purchases we have made. This table is the perfect addition to our lounge space that includes two mid century lounge chairs and now this beautiful table. The table is the perfect height and the walnut wood finish is outstanding. The curvature of the base makes this piece very unique and we are always receiving compliments on it.", product_id: 15, user_id: 8}
]

const userlist = [
{"id":1,"first_name":"Dan","last_name":"Adams","email":"dan@jh.com","password":"1234","shipping_address_id":10,"billing_address_id":1},
{"id":2,"first_name":"Ben","last_name":"Parker","email":"ben@jh.com","password":"1234","shipping_address_id":9,"billing_address_id":2},
{"id":3,"first_name":"Ethen","last_name":"Ellis","email":"ethen@jh.com","password":"1234","shipping_address_id":8,"billing_address_id":3},
{"id":4,"first_name":"Jake","last_name":"Wright","email":"jake@jh.com","password":"1234","shipping_address_id":7,"billing_address_id":4},
{"id":5,"first_name":"John","last_name":"Bates","email":"john@jh.com","password":"1234","shipping_address_id":6,"billing_address_id":5},
{"id":6,"first_name":"Sam","last_name":"Smith","email":"sam@jh.com","password":"1234","shipping_address_id":5,"billing_address_id":6},
{"id":7,"first_name":"Jisoo","last_name":"Burke","email":"jisoo@jh.com","password":"1234","shipping_address_id":4,"billing_address_id":7},
{"id":8,"first_name":"Mason","last_name":"Sanders","email":"mason@jh.com","password":"1234","shipping_address_id":3,"billing_address_id":8},
{"id":9,"first_name":"Charles","last_name":"Sparks","email":"charles@jh.com","password":"1234","shipping_address_id":2,"billing_address_id":9},
{"id":10,"first_name":"Blanche","last_name":"Steele","email":"blanche@jh.com","password":"1234","shipping_address_id":1,"billing_address_id":10},
{"id":11,"first_name":"admin","last_name":"admin","email":"admin@jh.com","isAdmin":"true", "password":"admin","shipping_address_id":11,"billing_address_id":11}
]

const addresslist = [
{"id":1,"street1":"399 Ujalap Highway","street2":"(242)","city":"Ibkozbe","state":"NJ","zip":"87406"},
{"id":2,"street1":"1396 Fadij Loop","street2":"(631)","city":"Eridije","state":"SD","zip":"62024"},
{"id":3,"street1":"1833 Muwa Drive","street2":"(627)","city":"Waijhic","state":"ID","zip":"64604"},
{"id":4,"street1":"978 Vapil Terrace","street2":"(310)","city":"Doluca","state":"NJ","zip":"74281"},
{"id":5,"street1":"876 Edhe Pass","street2":"(624)","city":"Devkakof","state":"KY","zip":"81069"},
{"id":6,"street1":"238 Vifuke Way","street2":"(962)","city":"Akjemuc","state":"CT","zip":"71661"},
{"id":7,"street1":"1994 Duni Street","street2":"(231)","city":"Uluuzireh","state":"VA","zip":"05760"},
{"id":8,"street1":"398 Nurho Way","street2":"(882)","city":"Pakedook","state":"IL","zip":"30228"},
{"id":9,"street1":"537 Fenal Center","street2":"(643)","city":"Peslafle","state":"IA","zip":"82656"},
{"id":10,"street1":"102 Ivtik Square","street2":"(950)","city":"Ticoowe","state":"OH","zip":"59102"},
{"id":11,"street1":"1 Hanover Square","street2":"(950)","city":"New York","state":"NY","zip":"59102"}
]

// arrays consist of random objects
// for db.Promise.map(array, fn)
const addressArr = addresslist, 
	cartProductArr = [],
	creditcardArr = [],
	lineItemArr = [],
	orderArr = [],
	productArr = productlist,
	reviewArr = reviewlist,
	userArr = userlist,

	// table that associates
	// 'db model': array of random objects
	tables = {
		'addresses': addressArr,
		'cartProducts': cartProductArr,
		'creditCards': creditcardArr,
		'lineItems': lineItemArr,
		'orders': orderArr,
		'products': productArr,
		'reviews': reviewArr,
		'users': userArr,
	}


for (let i = 0; i < 30; i++) {
	//addressArr.push(chance.addresses());
	cartProductArr.push(chance.cartProducts());
	creditcardArr.push(chance.creditCards());
	orderArr.push(chance.orders());
	lineItemArr.push(chance.lineItems());
	//productArr.push(chance.products());
	//reviewArr.push(chance.reviews());
	//userArr.push(chance.users());
}


// helper function for create data to tatabase
const seedFunc = function(dbName) {
	return () => db.Promise.map(tables[dbName], result => db.model(dbName).create(result))
}

// function for seeding data
const seedUsers = seedFunc('users');
const seedAddresses = seedFunc('addresses');
const seedCreditcards = seedFunc('creditCards');
const seedProducts = seedFunc('products');
const seedReviews = seedFunc('reviews');
const seedOrders = seedFunc('orders');
const seedCartProducts = seedFunc('cartProducts');
const seedLineItmes = seedFunc('lineItems');


db.didSync
	.then(() => db.sync({force: true}))
	.then(seedAddresses)
	.then(seedProducts)
	.then(seedUsers)
	.then(seedCreditcards)
	.then(seedReviews)
	.then(seedOrders)
	.then(seedCartProducts)
	.then(seedLineItmes)
	.then(() => console.log(`Seeded OK`))
	.catch(error => console.error(error))    
	.finally(() => db.close())