var myRouter = new VueRouter({
    routes: [
		{
			path:'/',
			component: function(resolve, reject) {
				$.get('/search.html', function(htmlFromServer) {
					var newComponent = {
						template: htmlFromServer,
						data: function() {
							return {
								userSavedAreas:null,
							}
						},
						created: function(){
							console.log('created the search page')
						},
						destroyed: function(){console.log('destroyed the search page')},
					}
					resolve(newComponent)
				})
			}
		},
		{
		path: '/skiArea/:location',
		component: function(resolve, reject) {
			$.get('/skiarea.html', function(htmlFromServer){
				var newComponent = {
					template: htmlFromServer,
					data: function(){
						return {
							requestedLocation:'',
							listofskiareas: [],
							requestedLat:0,
							requestedLng:0,
							requestedliftieName:'',
							requestedFSID:'',
							summary:'',
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
							lifts:null,
							liftsOpen:null,
							liftsClosed:null,
							snowdepth:null,
							facebook:null,
							day:'',
							snowfall:0,
							fourSquareVisits:null,
							nameForReport:'',
						}
					},
					methods: {
						saveArea: function(event) {
							$.post('/saveArea', {name: this.$route.params.location}, (data) =>{
								this.savedAreas = data
							})
						},
					},
					created: function(){
						console.log('created the ski area component')
						if(this.$route.params.location === 'wolfcreek'){
							this.requestedLocation = 'alta';
						}
						else if(this.$route.params.location === 'purgatory'){
							this.requestedLocation = 'boreal';
						}
						else if(this.$route.params.location === 'howelsen'){
							this.requestedLocation = 'brighton';
						}
						else if(this.$route.params.location === 'eldora'){
							this.requestedLocation = 'cannon';
						}
						else {
							this.requestedLocation = this.$route.params.location;
						}
						if(this.$route.params.location === 'beavercreek'){
							this.nameForReport = 'Beaver Creek';
						}
						if(this.$route.params.location === 'breck'){
							this.nameForReport = 'Breckenridge';
						}
						if(this.$route.params.location === 'abasin'){
							this.nameForReport = 'Arapahoe Basin';
						}
						if(this.$route.params.location === 'winter-park'){
							this.nameForReport = 'Winter Park';
						}
						if(this.$route.params.location === 'steamboat'){
							this.nameForReport = 'Steamboat Springs';
						}
						if(this.$route.params.location === 'aspen-highlands'){
							this.nameForReport = 'Aspen Highlands';
						}
						if(this.$route.params.location === 'aspen-mountain'){
							this.nameForReport = 'Aspen Mountain';
						}
						if(this.$route.params.location === 'copper'){
							this.nameForReport = 'Copper Mountain';
						}
						if(this.$route.params.location === 'crested-butte'){
							this.nameForReport = 'Crested Butte';
						}
						if(this.$route.params.location === 'wolfcreek'){
							this.nameForReport = 'Wolf Creek';
						}
						if(this.$route.params.location === 'howelsen'){
							this.nameForReport = 'Howelsen Hill';
						}
						if(this.$route.params.location === 'vail'){
							this.nameForReport = 'Vail';
						}
						if(this.$route.params.location === 'eldora'){
							this.nameForReport = 'Eldora Mountain';
						}
						if(this.$route.params.location === 'telluride'){
							this.nameForReport = 'Telluride';
						}
						if(this.$route.params.location === 'loveland'){
							this.nameForReport = 'Loveland';
						}
						if(this.$route.params.location === 'snowmass'){
							this.nameForReport = 'Snowmass';
						}
						if(this.$route.params.location === 'keystone'){
							this.nameForReport = 'Keystone';
						}
						if(this.$route.params.location === 'purgatory'){
							this.nameForReport = 'Purgatory';
						}

						$.get('/getsSkiAreas', (skiAreasFromServer) => {
							// console.log('created the register page')
							this.listofskiareas = skiAreasFromServer;

							for(var i = 0; i < this.listofskiareas.length; i++) {
								if(this.requestedLocation === this.listofskiareas[i].liftieName){
									var a = this.listofskiareas[i].lat;
									var b = this.listofskiareas[i].lng;
									var c = this.listofskiareas[i].liftieName;
									var d = this.listofskiareas[i].fourSquareID;
									$.get('/getdata', {lat: a, lng: b, liftieName: c, fsid: d}, (fullData) => {

										// console.log(fullData)
										this.day = new Date(fullData.day)
										this.firstDay.day = (moment.unix(fullData.forecast.firstDay.day).format('dddd'));
										this.firstDay.icon = fullData.forecast.firstDay.icon
										this.firstDay.lowTemp = fullData.forecast.firstDay.lowTemp
										this.firstDay.highTemp = fullData.forecast.firstDay.highTemp
										//secondDay
										this.secondDay.day = (moment.unix(fullData.forecast.secondDay.day).format('dddd'));
										this.secondDay.icon = fullData.forecast.secondDay.icon
										this.secondDay.lowTemp = fullData.forecast.secondDay.lowTemp
										this.secondDay.highTemp = fullData.forecast.secondDay.highTemp
										//thirdDay
										this.thirdDay.day = (moment.unix(fullData.forecast.thirdDay.day).format('dddd'));
										this.thirdDay.icon = fullData.forecast.thirdDay.icon
										this.thirdDay.lowTemp = fullData.forecast.thirdDay.lowTemp
										this.thirdDay.highTemp = fullData.forecast.thirdDay.highTemp
										//fourthDay
										this.fourthDay.day = (moment.unix(fullData.forecast.fourthDay.day).format('dddd'));
										this.fourthDay.icon = fullData.forecast.fourthDay.icon
										this.fourthDay.lowTemp = fullData.forecast.fourthDay.lowTemp
										this.fourthDay.highTemp = fullData.forecast.fourthDay.highTemp
										//fifthDay
										this.fifthDay.day = (moment.unix(fullData.forecast.fifthDay.day).format('dddd'));
										this.fifthDay.icon = fullData.forecast.fifthDay.icon
										this.fifthDay.lowTemp = fullData.forecast.fifthDay.lowTemp
										this.fifthDay.highTemp = fullData.forecast.fifthDay.highTemp
										// console.log(this.day)
										this.summary = fullData.forecast.summary
										//lifitie data
										if(fullData.liftieName === 'alta'){
											this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<p>Lift information is unavailable for this mountain</p>'
											this.liftsOpen = document.getElementById('liftsClosedId').innerHTML = ''
										}
										else if(fullData.liftieName === 'boreal'){
											this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<p>Lift information is unavailable for this mountain</p>'
											this.liftsOpen = document.getElementById('liftsClosedId').innerHTML = ''
										}
										else if(fullData.liftieName === 'brighton'){
											this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<p>Lift information is unavailable for this mountain</p>'
											this.liftsOpen = document.getElementById('liftsClosedId').innerHTML = ''
										}
										else if(fullData.liftieName === 'cannon'){
											this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<p>Lift information is unavailable for this mountain</p>'
											this.liftsOpen = document.getElementById('liftsClosedId').innerHTML = ''
										}
										else {
										// this.lifts = "There are " + fullData.lifts.open + " lifts open and  " + fullData.lifts.closed +" closed";
										var open ='opens';

										this.liftsOpen = fullData.lifts.open;
										// this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<h4>OPEN</h4>';
										this.liftsClosed = fullData.lifts.closed;
										}
										//snowfall
										if(fullData.snowfall === 0){
											console.log('SNOWFALL WAS ZERO')
										}
										else {
											console.log('not zero')
										}
										this.snowfall = fullData.snowfall
										//foursquare visit counter
										this.fourSquareVisits = fullData.fourSquareVisits
										// console.log(this.fourSquareVisits)
										// console.log(this.fifthDay)
									})
								}
							}
						})
						},
						destroyed: function(){ console.log('destroyed the ski area component')}
					}
					resolve(newComponent)
				})
			}
		},
		// {
		// 	path:'/epic',
		// 	component: function(resolve, reject) {
		// 		$.get('/epicPass.html', function(htmlFromServer) {
		// 			var newComponent = {
		// 				template: htmlFromServer,
		// 				data: function() {
		// 					return {
		// 						requestedLocation:'',
		// 						listofskiareas: [],
		// 						requestedLat:0,
		// 						requestedLng:0,
		// 						requestedliftieName:'',
		// 						requestedFSID:'',
		// 						summary:'',
		// 						firstDay:{
		// 							day:'',
		// 							icon:'',
		// 							lowTemp:'',
		// 							highTemp:'',
		// 						},
		// 						secondDay:{
		// 							day:'',
		// 							icon:'',
		// 							lowTemp:'',
		// 							highTemp:'',
		// 						},
		// 						thirdDay:{
		// 							day:'',
		// 							icon:'',
		// 							lowTemp:'',
		// 							highTemp:'',
		// 						},
		// 						fourthDay:{
		// 							day:'',
		// 							icon:'',
		// 							lowTemp:'',
		// 							highTemp:'',
		// 						},
		// 						fifthDay:{
		// 							day:'',
		// 							icon:'',
		// 							lowTemp:'',
		// 							highTemp:'',
		// 						},
		// 						lifts:null,
		// 						liftsOpen:null,
		// 						liftsClosed:null,
		// 						snowdepth:null,
		// 						facebook:null,
		// 						day:'',
		// 						snowfall:0,
		// 						fourSquareVisits:null,
		// 						nameForReport:'',
		// 					},
		// 				},
		// 				created: function(){
		// 					console.log('created the epic pass page')
		// 					$.get('/getsSkiAreas', (skiAreasFromServer) => {
		// 						this.listofskiareas = skiAreasFromServer;
		// 						console.log(this.listofskiareas)
		// 						for(var i = 0; i < this.listofskiareas.length; i++) {
		// 							if('breck' === this.listofskiareas[i].liftieName){
		// 								var a = this.listofskiareas[i].lat;
		// 								var b = this.listofskiareas[i].lng;
		// 								var c = this.listofskiareas[i].liftieName;
		// 								var d = this.listofskiareas[i].fourSquareID;
		// 								// var epicAreas = [
		// 								// 	{
		// 								// 		breck: {
		// 								// 			a:'',
		// 								// 			b:'',
		// 								// 			c:'',
		// 								// 			d:'',
		// 								// 		},
		// 								// 		beaverCreak: {
		// 								// 			a:'',
		// 								// 			b:'',
		// 								// 			c:'',
		// 								// 			d:'',
		// 								// 		},
		// 								// 		vail: {
		// 								// 			a:'',
		// 								// 			b:'',
		// 								// 			c:'',
		// 								// 			d:'',
		// 								// 		},
		// 								// 		abasin: {
		// 								// 			a:'',
		// 								// 			b:'',
		// 								// 			c:'',
		// 								// 			d:'',
		// 								// 		},
		// 								// 		keystone: {
		// 								// 			a:'',
		// 								// 			b:'',
		// 								// 			c:'',
		// 								// 			d:'',
		// 								// 		},
		// 								// ],
		// 								$.get('/getdata', {lat: a, lng: b, liftieName: c, fsid: d}, (fullData) => {
		//
		// 									console.log(fullData)
		// 									this.day = new Date(fullData.day)
		// 									this.firstDay.day = (moment.unix(fullData.forecast.firstDay.day).format('dddd'));
		// 									this.firstDay.icon = fullData.forecast.firstDay.icon
		// 									this.firstDay.lowTemp = fullData.forecast.firstDay.lowTemp
		// 									this.firstDay.highTemp = fullData.forecast.firstDay.highTemp
		// 									//secondDay
		// 									this.secondDay.day = (moment.unix(fullData.forecast.secondDay.day).format('dddd'));
		// 									this.secondDay.icon = fullData.forecast.secondDay.icon
		// 									this.secondDay.lowTemp = fullData.forecast.secondDay.lowTemp
		// 									this.secondDay.highTemp = fullData.forecast.secondDay.highTemp
		// 									//thirdDay
		// 									this.thirdDay.day = (moment.unix(fullData.forecast.thirdDay.day).format('dddd'));
		// 									this.thirdDay.icon = fullData.forecast.thirdDay.icon
		// 									this.thirdDay.lowTemp = fullData.forecast.thirdDay.lowTemp
		// 									this.thirdDay.highTemp = fullData.forecast.thirdDay.highTemp
		// 									//fourthDay
		// 									this.fourthDay.day = (moment.unix(fullData.forecast.fourthDay.day).format('dddd'));
		// 									this.fourthDay.icon = fullData.forecast.fourthDay.icon
		// 									this.fourthDay.lowTemp = fullData.forecast.fourthDay.lowTemp
		// 									this.fourthDay.highTemp = fullData.forecast.fourthDay.highTemp
		// 									//fifthDay
		// 									this.fifthDay.day = (moment.unix(fullData.forecast.fifthDay.day).format('dddd'));
		// 									this.fifthDay.icon = fullData.forecast.fifthDay.icon
		// 									this.fifthDay.lowTemp = fullData.forecast.fifthDay.lowTemp
		// 									this.fifthDay.highTemp = fullData.forecast.fifthDay.highTemp
		// 									// console.log(this.day)
		// 									this.summary = fullData.forecast.summary
		// 									//lifitie data
		// 									if(fullData.liftieName === 'alta'){
		// 										this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<p>Lift information is unavailable for this mountain</p>'
		// 										this.liftsOpen = document.getElementById('liftsClosedId').innerHTML = ''
		// 									}
		// 									else if(fullData.liftieName === 'boreal'){
		// 										this.lifts = "Lift data is unavailable for this ski area at the time";
		// 									}
		// 									else if(fullData.liftieName === 'brighton'){
		// 										this.lifts = "Lift data is unavailable for this ski area at the time";
		// 									}
		// 									else if(fullData.liftieName === 'cannon'){
		// 										this.lifts = "Lift data is unavailable for this ski area at the time";
		// 									}
		// 									else {
		// 									// this.lifts = "There are " + fullData.lifts.open + " lifts open and  " + fullData.lifts.closed +" closed";
		// 									var open ='opens';
		//
		// 									this.liftsOpen = fullData.lifts.open;
		// 									// this.liftsOpen = document.getElementById('liftsOpen').innerHTML = '<h4>OPEN</h4>';
		// 									this.liftsClosed = fullData.lifts.closed;
		// 									}
		// 									//snowfall
		// 									if(fullData.snowfall === 0){
		// 										console.log('SNOWFALL WAS ZERO')
		// 									}
		// 									else {
		// 										console.log('not zero')
		// 									}
		// 									this.snowfall = fullData.snowfall
		// 									//foursquare visit counter
		// 									this.fourSquareVisits = fullData.fourSquareVisits
		// 									// console.log(this.fourSquareVisits)
		// 									// console.log(this.fifthDay)
		// 								})
		// 							}
		// 						}
		// 					// })
		// 				},
		//
		// 				destroyed: function(){console.log('destroyed the epic pass page')},
		// 			}
		// 			resolve(newComponent)
		// 		})
		// 	}
		// },
	]
})

var mainVm = new Vue({
    el: '#app',
	router: myRouter,

	methods: {

	}
})
