import swccConfig from '../data/psaConfig'
import parameterNameCrosswalk from '../data/parameterNameCrosswalk'
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
const average = (array) => array.reduce((a, b) => parseFloat(a) + parseFloat(b)) / array.length;

const makePsaAvg = (data, gaccConfig) =>{	
	// const useConfig = swccConfig['eacc']
	if(!gaccConfig){
		console.log('cant do anything no gacc config', data)
		return
	}
	const useConfig = gaccConfig
	// const useConfig = swccConfig['swcc']
	// console.log('in  makePsaAvg','data', data, 'gaccConfig', gaccConfig)
	const psaAverageObj = {}
	const psaArray = Object.keys(gaccConfig)
	const avgAr = []
	const avgObj = {}
	// console.log('psaArray', psaArray)

	psaArray.map(currPsa=>{
		// console.log('currPsa', currPsa, gaccConfig[currPsa])	
		const {stations, parameter1, parameter2} = gaccConfig[currPsa]
		const parameters = [parameter1, parameter2]
		// console.log('parameters', parameters)
		avgObj[currPsa]={}
		stations.map(currStn=>{
			const stnData = data[currStn]
			if(stnData){
				const dates = Object.keys(stnData)
				dates.map(currDate=>{

					// const day2 = dates[3]
					if(!avgObj[currPsa][currDate]){
						avgObj[currPsa][currDate]={
							[parameter1]:[],
							[parameter2]:[]
						}
					}
					const testData = stnData[currDate]
					parameters.map(currParam=>{
						const dataName = parameterNameCrosswalk[currParam]
						avgObj[currPsa][currDate][currParam].push(testData[dataName])

						// console.log('station data date',currStn,'date', currDate, dataName, testData[dataName])
					})
				})
			}
			else{
				// console.log('no data for this station', currStn)
			}
		})
		psaAverageObj[currPsa]={}
		for(var date in avgObj[currPsa]){
			// console.log('date', date, 'parameter 1 array', currPsa, avgObj[currPsa][date][parameters[0]])
			// console.log('date', date, 'parameter 2 array', currPsa, avgObj[currPsa][date][parameters[1]])
			const param1ValArray = avgObj[currPsa][date][parameters[0]].filter(currVal=>{
				if(typeof currVal == 'number' || isNumeric(currVal)){
					return parseFloat(currVal)
				}
			})
			const param2ValArray = avgObj[currPsa][date][parameters[1]].filter(currVal=>{
				if(typeof currVal == 'number' || isNumeric(currVal)){
					return parseFloat(currVal)
				}
			})
			psaAverageObj[currPsa][date] = {
					[parameters[0]]:param1ValArray.length > 0 ? average(param1ValArray) : false,
					[parameters[1]]:param2ValArray.length > 0 ? average(param2ValArray) : false,
				}
			// console.log('param 1 average', average(avgObj[currPsa][date][parameters[0]]))	
			// console.log('param 2 average', average(avgObj[currPsa][date][parameters[1]]))	
		}
		// console.log('psaAverageObj', psaAverageObj)
	})
	// for(var psa in useConfig){
	// 	const avgObj = {[psa]:{}}d
	// 	const psaStations = useConfig[psa]['stations']
	// 	// console.log('psastations, psa', psa, psaStations)
	// 	const parameters = useConfig[psa]['parameters']
	// 	// avgObj[psa] = {}
	// 	psaStations.map(currStn =>{
	// 		const stnData = data[currStn]
	// 		// console.log('stnData', stnData)
	// 		if(stnData){
	// 			const dates = Object.keys(stnData)
	// 			dates.map(currDate=>{

	// 				// const day2 = dates[3]
	// 				if(!avgObj[psa][currDate]){
	// 					avgObj[psa][currDate]={
	// 						[parameters[0]]:[],
	// 						[parameters[1]]:[]
	// 					}
	// 				}
	// 				const testData = stnData[currDate]
	// 				parameters.map(currParam=>{
	// 					const dataName = parameterNameCrosswalk[currParam]
	// 					avgObj[psa][currDate][currParam].push(testData[dataName])

	// 					// console.log('stndat',currStn, dataName, testData[dataName])
	// 				})
	// 			})
	// 		}
	// 		else{
	// 			console.log('no data for this station', currStn)
	// 		}
	// 	})
	// 	// console.log(avgObj, avgObj)
	// 	psaAverageObj[psa]={}
	// 	for(var date in avgObj[psa]){
	// 		// console.log(avgObj[psa][date][parameters[0]])
	// 		psaAverageObj[psa][date] = {
	// 				[parameters[0]]:average(avgObj[psa][date][parameters[0]]),
	// 				[parameters[1]]:average(avgObj[psa][date][parameters[1]])
	// 			}
	// 	}
	// }
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