const stnAr = [24513, 2432, 21475]
const fuelModelAr = ['Y','V','W','X','Z']
const date1 = new Date('1/1/2001')
const date2 = new Date('12/31/2002')
const obAr = []
const msHour = 60000 * 60
const msDay = msHour * 24
stnAr.map(currStn => {
	fuelModelAr.map(currModel => {
		let date = new Date('1/1/2001')
		// let lastDateMs = new Date('1/6/2001').getTime()
		let lastDateMs = new Date('12/31/2002').getTime()
		let currDayMs = new Date(date).getTime() 
		while(currDayMs <= lastDateMs){
			let hr = 0
			while(hr < 24){
				var currMonth = new Date(date).getMonth() + 1
				var currDay = new Date(date).getDate()
				var currYear = new Date(date).getFullYear()
				const ojbDate = `${currMonth}/${currDay}/${currYear}`
				// console.log(currMonth, currDay, hr, new Date(currDayMs))
				const pushObj = {
			    "station_id": currStn,
			    "nfdr_date": ojbDate,
			    "nfdr_time": hr,
			    "nfdr_type": "R",
			    "fuel_model": "V",
			    "fuel_model_version": 4,
			    "kbdi": 100 + hr + currMonth + currDay,
			    "one_hr_tl_fuel_moisture": 18.02 + hr + currMonth + currDay,
			    "ten_hr_tl_fuel_moisture": 19.92 + hr + currMonth + currDay,
			    "hun_hr_tl_fuel_moisture": 20 + hr + currMonth + currDay,
			    "thou_hr_tl_fuel_moisture": 20 + hr + currMonth + currDay,
			    "ignition_component": 0 + hr + currMonth + currDay,
			    "spread_component": 0 + hr + currMonth + currDay,
			    "energy_release_component": 0 + hr + currMonth + currDay,
			    "burning_index": 0 + hr + currMonth + currDay,
			    "herbaceous_lfi_fuel_moisture": 30 + hr + currMonth + currDay,
			    "woody_lfi_fuel_moisture": 60 + hr + currMonth + currDay,
			    "gsi": 0 + hr + currMonth + currDay
			  }
			  obAr.push(pushObj)
			  // date = date+ msDay
			  hr++
			}
			currDayMs = currDayMs + msDay
		}
	})


})


console.log(JSON.stringify(obAr))