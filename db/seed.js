const db = require('APP/db');
const Chance = require('chance');
const chance = new Chance(Math.random);

// arrays for ENUM
const productType = ['chair', 'table', 'bed', 'closet', 'sofa', 'desk']
const productStyle = ['Coastal', 'Contemporary', 'Traditional', 'modern', 'gothic'];
const productMaterial = ['wood', 'plastic', 'MDF', 'Mild steel', 'Cast iron', 'Synthetic leather', 'Poly urethane', 'Leather', 'Fabric', 'Acrylic', 'Stainless steel']

// create methods generating random object
chance.mixin({
	'users': () => {
		return {
			first_name: chance.first(),
			last_name: chance.last(),
			email: chance.email(),
			password: 123123
		};
	},
	'creditcards': () => {
		return {
			number: chance.cc(),
			expiry_date: chance.exp(),
			security_code: chance.natural({min: 100, max: 999})
		};
	},
	'products': () => {
		return {
			name: chance.cc(),
			price: chance.floating({min: 10, max: 200, fixed: 2}),
			description: chance.paragraph({sentences: 5}),
			quantity: chance.natural({max:100}),
			type: chance.pickone(productType),
			style: chance.pickone(productStyle),
			color: chance.color(),
			material: chance.pickone(productMaterial)
		}
	},
	'addresses': () => {
		return {
			street1: chance.address(),
			street2: chance.areacode(),
			city: chance.city(),
			state: chance.state(),
			zip: chance.zip()
		}
	}
})

// arrays consist of random objects
// for db.Promise.map(array, fn)
const addressArr = [], 
	cartArr = [],
	creditcardArr = [],
	lineItemArr = [],
	orderArr = [],
	productArr = [],
	reviewArr = [],
	userArr = [],

	// table that associates
	// 'db model': array of random objects
	tables = {
		'addresses': addressArr,
		'carts': cartArr,
		'creditcards': creditcardArr,
		'lineItems': lineItemArr,
		'orders': orderArr,
		'products': productArr,
		'reviews': reviewArr,
		'users': userArr,
	}


for (let i = 0; i < 30; i++) {
	addressArr.push(chance.addresses());
	// cartArr.push(chance.);
	creditcardArr.push(chance.creditcards());
	// lineItemArr.push(chance.);
	// orderArr.push(chance.);
	productArr.push(chance.products());
	// reviewArr.push(chance.);
	userArr.push(chance.users());
}


// helper function for create data to tatabase
const seedFunc = function(dbName) {
	return () => db.Promise.map(tables[dbName], result => db.model(dbName).create(result))
}

// function for seeding data
const seedUsers = seedFunc('users')
const seedAddresses = seedFunc('addresses')
const seedCreditcards = seedFunc('creditcards')
const seedProducts = seedFunc('products')


db.didSync
	.then(() => db.sync({force: true}))
	.then(seedUsers)
	.then(seedAddresses)
	.then(seedCreditcards)
	.then(seedProducts)
	.then(() => console.log(`Seeded OK`))
	.catch(error => console.error(error))    
	.finally(() => db.close())

















/* chance library

http://chancejs.com/


chance.floating({min: 0, max: 100, fixed: 8});
=> 45.92367599

chance.integer({min: -20, max: 20});
=> -7

chance.natural({min: 1, max: 20});
=> 14

chance.string({length: 5, pool: 'abcde'});
=> 'cbbdc'

chance.paragraph({sentences: 1});
	=> 'Idefeulo foc omoemowa wahteze liv juvde puguprof epehuji upuga zige odfe igo sit pilamhul oto ukurecef.'

chance.sentence({words: 5});
	=> 'Waddik jeasmov cakgilta ficub up.'

chance.word({syllables: 3});
	=> 'tavnamgi'

	chance.word({length: 5});
	=> 'ralve'

chance.birthday();
=> Fri Aug 16 1985 00:00:00 GMT-0400 (EDT)

chance.birthday({string: true});
=> '4/1/1968'

Chance.first({ gender: "female" });
=> 'Emma'

Chance.last();
=> 'Mago'

chance.name();
	=> 'Dafi Vatemi'

chance.email({domain: 'example.com'})
=> 'giigjom@example.com'

chance.address();
=> '5447 Bazpe Lane'

chance.phone({ formatted: false })

chance.state({ full: true });
	=> 'Florida'

chance.street();
=> 'Tesca Circle'

chance.zip();
	=> '90210'

chance.cc({type: 'mc'});
	=> '5103820202214116'

chance.cc({type: 'Mastercard'});
	=> '5171206237468496'

chance.cc_type();
	=> 'Visa'

chance.dollar({max: 250}) 

chance.exp();
	=> '10/2020'


chance.mixin({
		'user': function() {
				return {
						first: chance.first(),
						last: chance.last(),
						email: chance.email()
				};
		}
});

// Then you can call your mixin
chance.user();

=> {first: 'Eli', last: 'Benson', email: 'gembibuj@dugesan.com'}



chance.mixin({
	'user': function () {
		return {
			first: chance.first(),
			last: chance.last(),
			email: chance.email()
		};
	},
	'social_user': function () {
		var user = chance.user();
		user.network = chance.pick(['facebook', 'twitter']);
		return user;
	}
});


chance.pickone(['alpha', 'bravo', 'charlie', 'delta', 'echo']);
	=> 'delta'


chance.pickset(['alpha', 'bravo', 'charlie', 'delta', 'echo'], 3);
	=> ['echo', 'alpha', 'bravo']

chance.unique(chance.state, 5);
=> ["SC", "WA", "CO", "TX", "ND"]



chance.url({domain: 'www.socialradar.com'})
=> 'http://www.socialradar.com/hob'
Optionally specify a path and it will be obeyed.

chance.url({path: 'images'})
=> 'http://tainvoz.net/images'
Optionally specify an array of extensions and one will be picked at random.

chance.url({extensions: ['gif', 'jpg', 'png']})
=> 'http://vagjiup.gov/udmopke.png'

*/