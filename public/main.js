var myRouter = new VueRouter({
    routes: [
		{
			path:'/',
			component: function(resolve, reject) {
				$.get('/register.html', function(htmlFromServer){
					var newComponent = {
						template: htmlFromServer,
						data: function(){
							return {
								registerForm: {
						            username: '',
						            password: '',
						        },
								loginForm: {
						            username: '',
						            password: '',
						        },
								clicked: false,
								isOpen: false,
							}
						},
						methods: {
							toggle: function() {
								this.clicked = !this.clicked;
								this.isOpen = !this.isOpen
							},
							login : function() {
								$.post('/login', this.loginForm, (dataFromServer) => {
									if(dataFromServer.success) {
										console.log(this.$router)
										this.$router.push({ path: `/search` })
									}
							register : function() {
								// console.log(this.registerForm.password)
								$.post('/register', this.registerForm, (dataFromServer) => {
									if(dataFromServer.success) {
										// console.log(VueRouter)
										this.$router.push({ path: `/search` })
									}
									console.log(dataFromServer)
								})
							},
						},
						created: function(){ console.log('created the register page')},
						destroyed: function(){ console.log('destroyed the register page')},
					}
					resolve(newComponent)
				})
			}
		},
		{
			path:'/search',
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
							$.get('/getSavedAreas', (savedAreas) => {
								console.log(savedAreas)
								for(var i = 0; i < savedAreas[0].savedAreas.length; i++) {
										console.log(savedAreas[0].savedAreas[i].name)
										this.userSavedAreas = savedAreas[0].savedAreas[i]
								}
								// this.userSavedAreas = savedAreas[0].savedAreas
								console.log(this.userSavedAreas)
							})
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

										console.log(fullData)
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
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'boreal'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'brighton'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else if(fullData.liftieName === 'cannon'){
											this.lifts = "Lift data is unavailable for this ski area at the time";
										}
										else{
										this.lifts = "There are " + fullData.lifts.open + " lifts open and  " + fullData.lifts.closed +" closed";
										this.liftsOpen = fullData.lifts.open;
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
		}
	]
})

var mainVm = new Vue({
    el: '#app',
	router: myRouter,

	methods: {

	}
})
