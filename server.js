const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cheerio = require('cheerio')
const app = express()
const moment = require('moment')
const secrets = require('./secrets.js')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//cookies from mozilla... chocolate chip cookies
var sessionsModule = require('client-sessions')
//connect to mongoose
mongoose.connect('mongodb://localhost:27017/peakchoice')

var sessionsMiddleware = sessionsModule({

    cookieName: 'in-class-auth-demo-cookie',
    secret: 'peakchoice8080',
    requestKey: 'session',
    duration: 86400 * 1000 * 7,
    cookie: {
        httpOnly: true,
        secure: false,
    }
})
app.use(sessionsMiddleware)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//this is where the user login is defined
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: function(){ return new Date()}
    },
	savedAreas: {
		type: Array,
		required: false,
	}
})
var User = mongoose.model('User', UserSchema)

app.use(express.static('./public'))
app.use(express.static('./'))

var checkIfLoggedIn = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in. proceeding to next route handler")
        next()
    }
    else {
        res.redirect('/register')
    }
}

app.get('/', function(req, res){
	res.sendFile('./public/index.html', {root:'./'})
})
app.get('/register', function(req, res){
    res.sendFile('./public/register.html', {root: './'})
})
//-----Register logic------//
app.post('/register', function(req, res){

    var newUser = new User(req.body)
    bcrypt.genSalt(11, function(saltErr, salt) {
        if (saltErr) { console.log(saltErr)}
        console.log('salt? ', salt)
        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if (hashErr) { console.log(hashErr) }
            newUser.password = hashedPassword
            newUser.save(function(err){
                if (err) { console.log('failed to save user')}
                else {
                    req.session._id = newUser._id
                    res.send({success:'success'})
                }
            })
        })
    })
})


//------ Login Logic -------//
app.post('/login', function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
        if ( err ) {
            console.log('failed to find user')
            res.send({failure:'failure'})
        }
        else if ( !user ) {
            res.send({failure:'failure'})
        }
        // this person is trying to log in as a user who DOES exist in our database,
        // but do the passwords match?
        else {
            bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                if (bcryptErr) {
                    console.log(bcryptErr)
                    res.send({failure:'failure'})
                }
                else if ( !matched ) {
                    console.log('passwords dont match')
                    res.send({failure:'failure'})
                }
                else if ( matched ) {
                    req.session._id = user._id
                    res.send({success:'success'})
                }
            })
        }

    })
})
app.get('/search', checkIfLoggedIn, function(req, res){
    res.sendFile('./public/search.html', {root:'./'})
})


//This is where the ski area is defined
let skiAreaSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lat: Number,
	lng: Number,
	fourSquareID:{ type: String, required: true },
	liftieName: { type: String, reuired: false},
});

let skiAreaModel = mongoose.model('SkiArea', skiAreaSchema);


app.get('/getsSkiAreas', function(req, res) {
	skiAreaModel.find(
		{},
		function(err, allskiareas) {
			if(err) {
				res.status(500).send(err)
				return console.log(err)
			}
			// console.log(allskiareas)
			res.status(200).send(allskiareas)
		}
	)
})
// where the calls start
app.get('/getdata', function(req, res){
	// console.log(req.query.lat)
	skiAreaModel.find(
		{_id:req.query},
		function(err, area) {
			if(err) {
				// res.sendSt(500).send(err)
				return console.log(err)
			}
			res.status(200).send(area)
		}
	)

	// console.log(req.query.liftieName)
	var darksky = `https://api.darksky.net/forecast/${secrets.dks}/${req.query.lat},${req.query.lng}`;
	var liftie = `https://liftie.info/api/resort/${req.query.liftieName}`;
	// var facebook = 'https://graph.facebook.com/v2.9/105551316143942/insights/page_places_checkin_total&access_token=193618711200710|6e3f49b536d12f9e19ebc590cc47cbd1'
    // var facebook = `https://graph.facebook.com/v2.9/105551316143942/insights/page_places_checkin_total_unique?access_token=EAACEdEose0cBANxPlLxo6YC3ZCg0vDl9RdWjIBJXbsOZAZBMLXMR6vsIRr8FN9gMfLrMPFmuiNZAJr3S6TxoxvtVB6tQmwt1pEoW0d7G8tSQPsXhCOujTQ2IeZBDcnUe5oaQjlxo8YmInUKTIUJZAZCcLRoxwniaFOhdHasnEp6mkxWHcPTEtHDAntVDZBNwgukZD`
	// var facebook = `https://graph.facebook.com/v2.11/search?type=place&center=39.1911,106.8175&distance=1&fields=name,checkins&date_preset=last_14d,location&access_token=193618711200710|6e3f49b536d12f9e19ebc590cc47cbd1`
	// search?type=place&center=39.7392,104.9903&distance=3000&date_preset=yesterday&fields=name,checkins
	// var foursquare =`https://api.foursquare.com/v2/venues/timeseries?49da5cd2f964a5207b5e1fe3&1512410153000&1512496553000&totalCheckins&client_id=J0XJEGV1NLXEYXVMHGYUDFRKIPQP2SR4YYQPDJMTNMCLCSFH&client_secret=2CPHNEM0ATCF5S1DMGEHKF4Y5H2KGOXUSITVM313XAPY0ECH&v=20171205`
	var foursquare = `https://api.foursquare.com/v2/venues/${req.query.fsid}?client_id=J0XJEGV1NLXEYXVMHGYUDFRKIPQP2SR4YYQPDJMTNMCLCSFH&client_secret=${secrets.fsq}&v=20171205`
	var fullData = {
		forecast: {
			firstDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			secondDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			thirdDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			fourthDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
			fifthDay:{
				day:'',
				icon:'',
				lowTemp:'',
				highTemp:'',
			},
		},
		snowfall:0,
		lifts: '',
		liftieName:'',
		fourSquareVisits:0,
	};
	//DarkSky Request

	request(darksky, function(err, response, darkskydata){
		var cleanDarkSkyData = JSON.parse(darkskydata);
		//firstDay
		fullData.forecast.firstDay.day = cleanDarkSkyData.daily.data[0].time;
		fullData.forecast.firstDay.icon = cleanDarkSkyData.daily.data[0].icon;
		fullData.forecast.firstDay.lowTemp = cleanDarkSkyData.daily.data[0].temperatureLow;
		fullData.forecast.firstDay.highTemp = cleanDarkSkyData.daily.data[0].temperatureHigh;
		//secondDay
		fullData.forecast.secondDay.day = cleanDarkSkyData.daily.data[1].time;
		fullData.forecast.secondDay.icon = cleanDarkSkyData.daily.data[1].icon;
		fullData.forecast.secondDay.lowTemp = cleanDarkSkyData.daily.data[1].temperatureLow;
		fullData.forecast.secondDay.highTemp = cleanDarkSkyData.daily.data[1].temperatureHigh;
		//thirdDay
		fullData.forecast.thirdDay.day = cleanDarkSkyData.daily.data[2].time;
		fullData.forecast.thirdDay.icon = cleanDarkSkyData.daily.data[2].icon;
		fullData.forecast.thirdDay.lowTemp = cleanDarkSkyData.daily.data[2].temperatureLow;
		fullData.forecast.thirdDay.highTemp = cleanDarkSkyData.daily.data[2].temperatureHigh;
		//fourthDay
		fullData.forecast.fourthDay.day = cleanDarkSkyData.daily.data[3].time;
		fullData.forecast.fourthDay.icon = cleanDarkSkyData.daily.data[3].icon;
		fullData.forecast.fourthDay.lowTemp = cleanDarkSkyData.daily.data[3].temperatureLow;
		fullData.forecast.fourthDay.highTemp = cleanDarkSkyData.daily.data[3].temperatureHigh;
		//fifthDay
		fullData.forecast.fifthDay.day = cleanDarkSkyData.daily.data[4].time;
		fullData.forecast.fifthDay.icon = cleanDarkSkyData.daily.data[4].icon;
		fullData.forecast.fifthDay.lowTemp = cleanDarkSkyData.daily.data[4].temperatureLow;
		fullData.forecast.fifthDay.highTemp = cleanDarkSkyData.daily.data[4].temperatureHigh;
		// fullData.snowfall = cleanDarkSkyData.daily.data[1].precipAccumulation;
		if (cleanDarkSkyData.daily.data[1].precipProbability === 0) {
			fullData.snowfall = 0;
		}
		else 	{
			fullData.snowfall = cleanDarkSkyData.daily.data[1].precipAccumulation
		}

		// console.log('Dark Sky Api call worked');
		//lift request
		request(liftie, function(err, response, liftieData){
			var cleanLiftieData = JSON.parse(liftieData);
			fullData.liftieName = cleanLiftieData.id
			fullData.lifts = cleanLiftieData.lifts.stats;
			// console.log('Liftie api call worked');

			request(foursquare, function(err, response, fourSquareData){
				var cleanFourSquareData = JSON.parse(fourSquareData);
				fullData.fourSquareVisits = cleanFourSquareData.response.venue.stats.visitsCount;
				// console.log(cleanFourSquareData.response.venue)
				// console.log(fullData.fourSquareVisits)
				// console.log(fourSquareData)
				res.send(fullData)
			})
		})
	})
})
app.post('/saveArea', function(req, res){
	// console.log(req.body)
	let saveArea = req.body;
	// console.log(req.session._id)
	User.findOneAndUpdate(
		{_id:req.session._id},
		{$push: {savedAreas: req.body}},
		function(err, data){
			if(err){
				console.log(err)
			}
			// console.log(data);
		});
})
app.get('/getSavedAreas', function(req, res) {
	User.find({_id:req.session._id}, function(err, user){
		if(err){
			console.log(err)
		}
		console.log(user)
		res.send(user)
	})
})


app.listen(80, function(){
    console.log('server listening on port 8083')
})
