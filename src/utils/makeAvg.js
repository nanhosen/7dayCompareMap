import swccConfig from '../data/psaConfig'
import parameterNameCrosswalk from '../data/parameterNameCrosswalk'
const average = (array) => array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / array.length;

const makePsaAvg = (data, gacc) =>{	
	const useConfig = swccConfig['swcc']
	// console.log('data', data)
	const psaAverageObj = {}
	for(var psa in useConfig){
		const avgObj = {[psa]:{}}
		const psaStations = useConfig[psa]['stations']
		// console.log('psastations, psa', psa, psaStations)
		const parameters = useConfig[psa]['parameters']
		// avgObj[psa] = {}
		psaStations.map(currStn =>{
			const stnData = data[currStn]
			// console.log('stnData', stnData)
			if(stnData){
				const dates = Object.keys(stnData)
				dates.map(currDate=>{

					// const day2 = dates[3]
					if(!avgObj[psa][currDate]){
						avgObj[psa][currDate]={
							[parameters[0]]:[],
							[parameters[1]]:[]
						}
					}
					const testData = stnData[currDate]
					parameters.map(currParam=>{
						const dataName = parameterNameCrosswalk[currParam]
						avgObj[psa][currDate][currParam].push(testData[dataName])

						// console.log('stndat',currStn, dataName, testData[dataName])
					})
				})
			}
			else{
				console.log('no data for this station', currStn)
			}
		})
		// console.log(avgObj, avgObj)
		psaAverageObj[psa]={}
		for(var date in avgObj[psa]){
			// console.log(avgObj[psa][date][parameters[0]])
			psaAverageObj[psa][date] = {
					[parameters[0]]:average(avgObj[psa][date][parameters[0]]),
					[parameters[1]]:average(avgObj[psa][date][parameters[1]])
				}
		}
	}
		// console.log('agg', 'psaAverageObj', psaAverageObj)
		return psaAverageObj
}

export default makePsaAvg


// const swccConfig = {
// 	swcc:{
// 		sw01:{
// 			stations: [20207, 20212, 20213],
// 			thresholds: {ERC: {dry: 45, veryDry: 70}, MinT:{dry: 40, veryDry: 50}},
// 			parameters: ['ERC', 'MinT'],
// 			models: ['G', 'Y'],
// 			fireSeason:{startMonth:5, startDay:1, endMonth:7, endDay:31},
// 			climoYears:[2002, 2016]
// 		},
// 		sw02:{