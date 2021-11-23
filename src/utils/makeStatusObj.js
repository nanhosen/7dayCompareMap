import breakpoints from '../data/breakpoints'

const makeStatusObj = (model, data, config) =>{
	const statusObj = {}
	// console.log('config from input', config)
	// console.log('data from makeStatusObj', data)
	for(var psa in data){
		// console.log('psa', psa, 'model', model)
		const currData = data[psa]
		const psaConfig = config[psa]
		// console.log('psaConfig', psaConfig)
		// console.log('breakpoints', breakpoints)
		// const psaBreaks = breakpoints[psa.toLowerCase()]
		// const psaBreaks = psaConfig.legacyBreakpoints
		// console.log('psaBreaks', psaBreaks)
		// if(psaBreaks){

		// const parameters = Object.keys(psaBreaks.originalBreakpoints)
		const parameters = [psaConfig.parameter1, psaConfig.parameter2]
		const currBreakpoints = model == 'G' ? psaConfig['legacyBreakpoints'] : psaConfig['newBreakpoints']
		if(currBreakpoints){
			
			statusObj[psa]={breakpoints: currBreakpoints}
			for(var date in currData){
				// console.log('date', date)
				const dateData = currData[date]
				const params = Object.keys(currData[date])
				// if(!statusObj[psa][date]){
				// 	statusObj[psa][date]={
				// 		[params[0]]:null,
				// 		[params[1]]:null
				// 	}
				// }
				const param1Val = dateData[params[0]]
				const param1BreakPoint = currBreakpoints.parameter1

				const param2Val = dateData[params[1]]
				const param2BreakPoint = currBreakpoints.parameter2

				const param1Category = findCategory(param1Val, param1BreakPoint, psaConfig.parameter1)
				const param2Category = findCategory(param2Val, param2BreakPoint, psaConfig.parameter2)
				const psaStatus = param1Category.status < param2Category.status ? param1Category.status : param2Category.status
			// console.log('param1Category', param1Category, 'param2Category', param2Category, 'psaStatus', psaStatus)	
			// console.log(model, 'statusObj higher', statusObj, 'param1Val', param1Val, 'param1BreakPoint', param1BreakPoint, 'dateData', dateData, 'currData', currData)

				statusObj[psa][date] = {
						[params[0]]:param1Category,
						[params[1]]:param2Category,
						psaStatus,
						percentiles: psaConfig.percentiles
					}
		}

			// console.log('statusObjjjj', statusObj)	
		}
		else{
			// console.log('no psa breakpoints', psa, psaConfig)
		}
		// console.log(model, 'currBreakpoints', currBreakpoints)

		// }


		// console.log( psa ,'y', data['16Y'][psa], 'g', data['G'][psa])
	}
		return statusObj
		// console.log('statusObjjjj', statusObj, model)
}

export default makeStatusObj

// temp 44



const findCategory = (inval, breakpoints, element) =>{
	// console.log('inval, breakpoints, element', inval, breakpoints, element)
	const isBackwards = element == 'F10' || element == 'FM10' || element == 'F100' || element == 'F1000'  || element == 'MinT' ? true : false
	const val = parseFloat(inval)
	const {dry, veryDry} = breakpoints
	const returnObj = {val}
	// console.log(`${element}' isBackwards'`, isBackwards)
	// console.log('dry', 'veryDry', dry, veryDry)

	if(isBackwards){
		if(val > dry){
			returnObj.status = 1
		}
		else if(val<= dry && val > veryDry){
			returnObj.status = 2
		}
		else if(val <= veryDry){

			returnObj.status = 3
		}
		else{
			returnObj.status = 'fuuuuu'

		}

	}
	else{
		if(val < dry){
			returnObj.status = 1
		}
		else if(val>= dry && val< veryDry){
			returnObj.status = 2
		}
		else if(val >= veryDry){

			returnObj.status = 3
		}
		else{
			returnObj.status = 'fuuu'
		}

	}
	if(!inval || !breakpoints || !element || val == NaN){
		returnObj.status = 'error'
	}
	// console.log('val, breakpoints, element, returnObj', val, breakpoints, element, returnObj)
	return returnObj
}