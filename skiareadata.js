const mongoose = require('mongoose')

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/peakchoice')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
  // we're connected!


let skiAreaSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lat: Number,
	lng: Number,
	fourSquareID:{ type: String, required:true},
	liftieName: { type: String, required: false},
});

// let skiAreaModel = mongoose.model('SkiArea', skiArea);

var skiArea = mongoose.model('skiArea', skiAreaSchema);


var breck = new skiArea({
	   "name" : "Breckenridge",
	   "lat" : 39.4817,
	   "lng" : 106.0384,
	   "fourSquareID" : "49da5cd2f964a5207b5e1fe3",
	   "liftieName": 'breck',
})
var abasin = new skiArea({
	   "name" : "Arapahoe Basin",
	   "lat" : 39.6423,
	   "lng" : 105.8717,
	   "fourSquareID" : "4acf609ef964a5204cd320e3",
	   "liftieName": 'abasin',
})
var winterpark = new skiArea({
	   "name" : "Winter Park",
	   "lat" : 39.8917,
	   "lng" : 105.7631,
	   "fourSquareID" : "4b3397c5f964a5202f1b25e3",
	   "liftieName": 'winter-park',
})
var steamboat = new skiArea({
	   "name" : "Steamboat Springs",
	   "lat" : 40.4850,
	   "lng" : 106.8317,
	   "fourSquareID" : "4b7712e7f964a520967a2ee3",
	   "liftieName": 'steamboat',
})
var keystone = new skiArea({
	   "name" : "Keystone",
	   "lat" : 39.5792,
	   "lng" : 105.9347,
	   "fourSquareID" : "4ac764c5f964a52003b720e3",
	   "liftieName": 'keystone',
})
var eldora = new skiArea({
	   "name" : "Eldora",
	   "lat" : 39.4817,
	   "lng" : 106.0384,
	   "fourSquareID" : "4b9bf47bf964a520283a36e3",
	   "liftieName": 'null',
})
var loveland = new skiArea({
	   "name" : "Loveland",
	   "lat" : 39.6800,
	   "lng" : 105.8979,
	   "fourSquareID" : "4b92bc4af964a520a21634e3",
	   "liftieName": 'loveland',
})
var aspenHighlands = new skiArea({
	   "name" : "Aspen Highlands",
	   "lat" : 39.1911,
	   "lng" : 106.8175,
	   "fourSquareID" : "4a91b9c7f964a5208b1b20e3",
	   "liftieName": 'aspen-highlands',
})
var aspen = new skiArea({
	   "name" : "Aspen",
	   "lat" : 39.1911,
	   "lng" : 106.8175,
	   "fourSquareID" : "4b64da29f964a52004d52ae3",
	   "liftieName": 'aspen-mountain',
})
var snowmass = new skiArea({
	   "name" : "Snowmass",
	   "lat" : 39.3310,
	   "lng" : 106.9848,
	   "fourSquareID" : "4deacf6488774880e3276eb1",
	   "liftieName": 'snowmass',
})
var copper = new skiArea({
	   "name" : "Copper Mountain",
	   "lat" : 39.4984,
	   "lng" : 106.1511,
	   "fourSquareID" : "4ae47be5f964a520dc9a21e3",
	   "liftieName": 'copper',
})
var beavercreek = new skiArea({
	   "name" : "Beaver Creek",
	   "lat" : 39.6042,
	   "lng" : 106.5165,
	   "fourSquareID" : "52960f9311d283044483fa63",
	   "liftieName": 'beavercreek',
})
var monarch = new skiArea({
	   "name" : "Monarch",
	   "lat" : 38.5114,
	   "lng" : 106.3330,
	   "fourSquareID" : "4b4b8319f964a520b19e26e3",
	   "liftieName": 'monarch',
})
var vail = new skiArea({
	   "name" : "Vail",
	   "lat" : 39.6403,
	   "lng" : 106.3742,
	   "fourSquareID" : "4b51ea24f964a520195b27e3",
	   "liftieName": 'vail',
})
var crestedButte = new skiArea({
	   "name" : "Crested Butte",
	   "lat" : 38.8697,
	   "lng" : 106.9878,
	   "fourSquareID" : "4b3bfeecf964a520018025e3",
	   "liftieName": 'crested-butte',
})
var wolf = new skiArea({
	   "name" : "Wolf Creek",
	   "lat" : 37.4748,
	   "lng" : 106.7936,
	   "fourSquareID" : "4b5c6b24f964a520ed2e29e3",
	   "liftieName": 'null',
})
var purgatory = new skiArea({
	   "name" : "Purgatory",
	   "lat" : 37.6303,
	   "lng" : 107.8140,
	   "fourSquareID" : "4d10e6047177b1f7d1445422",
	   "liftieName": 'null',
})
var telluride = new skiArea({
	   "name" : "Telluride",
	   "lat" : 37.9375,
	   "lng" : 107.8123,
	   "fourSquareID" : "4bafae4bf964a52007173ce3",
	   "liftieName": 'telluride',
})
var howelsen = new skiArea({
	   "name" : "Howelsen Hill",
	   "lat" : 40.4834,
	   "lng" : 106.8380,
	   "fourSquareID" : "4b96e2cbf964a5205deb34e3",
	   "liftieName": 'null',
})

breck.save(function (err, breck){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
abasin.save(function (err, abasin){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
winterpark.save(function (err, winterpark){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
steamboat.save(function (err, steamboat){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
keystone.save(function (err, keystone){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
eldora.save(function (err, eldora){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
loveland.save(function (err, loveland){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
aspenHighlands.save(function (err, aspenHighlands){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
aspen.save(function (err, aspen){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
snowmass.save(function (err, snowmass){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
copper.save(function (err, copper){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
beavercreek.save(function (err, beavercreek){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
monarch.save(function (err, monarch){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
vail.save(function (err, vail){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
crestedButte.save(function (err, crestedButte){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
wolf.save(function (err, wolf){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
purgatory.save(function (err, purgatory){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
telluride.save(function (err, telluride){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})
howelsen.save(function (err, howelsen){
	if(err) {
		console.log(err)
	}
	console.log(breck)
})



db.close();
