import { Suspense, lazy, useState,   useContext, useEffect } from 'react';
import '../App.css'
import {Box, Grid, Paper, Card, Typography, CardContent, Slider, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ModelContext } from '../contexts/ModelContext'
import PsaInfoSingle from './PsaInfoSingle'
import previousState from '../hooks/previousState'


const darkCellStyle = {backgroundColor:'#3c403d', color:'white', p:1, m:1}
const obsCellStyle = {backgroundColor:'#295d3652', color:'white', p:1, m:1}
const lightCellStyle = {backgroundColor:'#d0d0d0', color:'black', p:1, m:1}

const getStatusColor = (status) => {
  var color 

  if(status == 1){
    color = '#00800099' //green
  }
  else if(status == 2){
    color = '#ffff009c' //yellow
  }
  else if(status == 3){
    color = '#a59178' //brown
  }

  return color
}

const getData = (psaInfo, modelData, psaCode, displayDate) =>{
	// console.log('psaInfo', psaInfo, 'modelData', modelData, 'psaCode', psaCode, 'displayDate', displayDate)
	var textString
	if(modelData){
		const statusInfo = modelData ? modelData[displayDate] : null
		const elementAr = statusInfo ? Object.keys(statusInfo) : null
		textString = `PSA: ${psaCode}, PSA Name: psaInfo.psaName, GACC: ${psaInfo.GACC}, NFDRS Breakpoint Elements: ${elementAr[0]}, ${elementAr[1]}, Breakpoint Thresholds: ${elementAr[0]} Dry: ${modelData['breakpoints']?.[elementAr[0]]?.['dry']}, Very Dry: ${modelData['breakpoints']?.[elementAr[0]]?.['veryDry']}`
	}
	else{
		textString = `PSA: ${psaCode}, PSA Name: ${psaInfo.psaName}, GACC: ${psaInfo.GACC}`
	}
	return textString

} 
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function PsaInfoArea(props){
	const model = props.model
	const context = useContext(ModelContext)
	const [psaStatus, setPsaStatus] = useState({})
  const [displayInfo, setDisplayInfo] = useState({})
  const [cellColors, setCellColors] = useState({})
	const [cellVals, setCellVals] = useState({})
  const [allPsaCellInfo, setAllPsaCellInfo] = useState({})
  const [key, setKey] = useState(0)
  const [psaInfoArray, setPsaInfoArray] = useState([])
  const prevDisplayDate = previousState(context.displayDate)

  const dlHeadings = {h1: 'Dry', h2: 'VeryDry'}
  const obsHeadings = {h1: 'ERC', h2: 'F100'}
  const headings = {dlHeadings, obsHeadings}

  useEffect(() =>{
    console.log('displayInfo', displayInfo)
    console.log('psaStatus', psaStatus)
    console.log('allPsaCellInfo', allPsaCellInfo)
    console.log('truthry', Object.keys(displayInfo).length > 0 ,Object.keys(psaStatus).length > 0 , Object.keys(allPsaCellInfo).length > 0)
    const newAr = []
    if(Object.keys(displayInfo).length > 0 && Object.keys(psaStatus).length > 0 && Object.keys(allPsaCellInfo).length > 0){
      for(var psa in displayInfo){
        const psaDisplayInfo = displayInfo[psa]
        // console.log('this is what is going in props',  psaDisplayInfo, allPsaCellInfo[psa])
        newAr.push({psa, displayInfo: psaDisplayInfo, cellInfo: allPsaCellInfo[psa]})
      }
      console.log('newAr', newAr)
      setPsaInfoArray(newAr)
    } 
  },[displayInfo, psaStatus, allPsaCellInfo])



  //// move this out
  const statusFn = (psaStatusInfo) =>{
    const colorObj = {}
    const valueObj = {}
    for(var fuelModel in psaStatusInfo){
      const modelData = psaStatusInfo[fuelModel]
      // console.log('psaStatusInfo', psaStatusInfo, 'modelData', modelData)
      const elems = modelData ? Object.keys(modelData) : undefined
      if(elems)(elems.map((currelem, i) =>{
        if(i<2){
          colorObj[`${fuelModel}${i}`] = getStatusColor(modelData[currelem]?.['status'])
          valueObj[`${fuelModel}${i}`] = Math.round(modelData[currelem]?.['val'])
        }
      }))
    }
    return {colorObj, valueObj}
  }

	useEffect(()=>{
    // console.log('psaStatus #################', psaStatus)
    if(psaStatus){    
      if(Object.keys(psaStatus).length > 0){
        const newStuff = {}
        for(var psa in psaStatus){
          newStuff[psa] = statusFn(psaStatus[psa])
          var psaCellInfo = statusFn(psaStatus[psa])
          // setCellVals({...cellVals, [psa]:psaCellInfo.valueObj})
          // setCellColors({...cellColors, [psa]:psaCellInfo.colorObj})
        }
        // console.log('newStuff &*&*&*&*&**&', newStuff)
        setAllPsaCellInfo({...newStuff})
      }
      const newCellInfo = statusFn(psaStatus)
      // const setColorObj = {}
      // const setValueObj = {}
      // for(var fuelModel in psaStatus){
      //   const modelData = psaStatus[fuelModel]
      //   // console.log('psaStatus', psaStatus, 'modelData', modelData)
      //   const elems = modelData ? Object.keys(modelData) : undefined
      //   if(elems)(elems.map((currelem, i) =>{
      //     if(i<2){
      //       setColorObj[`${fuelModel}${i}`] = getStatusColor(modelData[currelem]?.['status'])
      //       setValueObj[`${fuelModel}${i}`] = Math.round(modelData[currelem]?.['val'])
      //     }
      //   }))
      // }
      // setCellColors({...setColorObj})
      // setCellVals({...setValueObj})
      // console.log('setColorObj', setColorObj, 'setValueObj', setValueObj)
    }

  },[psaStatus])

  useEffect(()=>{
    // console.log('this stuf', context.statusG, context.statusY, context.clickInfo)
    if(context?.clickInfo?.psaCode && context.displayDate){
      const psa = context?.clickInfo?.psaCode
      const G = context.statusG && context.statusG[context.clickInfo.psaCode.toUpperCase()] ? context.statusG[context.clickInfo.psaCode.toUpperCase()]?.[context.displayDate] : null
      const Y = context.statusY && context.statusY[context.clickInfo.psaCode.toUpperCase()] ? context.statusY[context.clickInfo.psaCode.toUpperCase()]?.[context.displayDate] : null
      setPsaStatus({...psaStatus, [psa]:{G, Y}})
      // setCellColors
    }
  },[context.statusG, context.statusY, context.clickInfo, context.displayDate])

  // useEffect(() =>{
  //   console.log('cellColors########', cellColors)
  //   console.log('cellVals########', cellVals)
  // },[cellColors, cellVals])

  // useEffect(() =>{
  //   console.log('context', context)
  //   // console.log('currDisplayDate', context.displayDate)
  //   // console.log('prevDisplayDate', prevDisplayDate)
  //   if(context.displayDate !== prevDisplayDate){
  //     // console.log('date has changed')
  //   }
  //   else if(context.displayDate === prevDisplayDate){
  //     // console.log('date has nott changed')
  //   }
  // },[context])

  // useEffect(() =>{
  //   // console.log('cellVals info chaged', cellVals)
  // },[cellVals])

  // useEffect(() =>{
  //   // console.log('cellVals info chaged', cellVals)
  // },[context.displayDate])






	useEffect(()=>{
    // console.log('i noticed a change', 'context.clickInfo && context[`status${model}`] && context.displayDate && context.breakpoints', context.clickInfo , context[`status${model}`] , context.displayDate , context.breakpoints)
		if(context.clickInfo && context[`status${model}`] && context.displayDate && context.breakpoints){
      // console.log('this is all here am i doing anything')
			const psaCode = context.clickInfo.psaCode
			const modelData = context[`status${model}`]?.[psaCode]
			const displayData = getData(context.clickInfo, modelData, psaCode, context.displayDate)
			// const currGaccConfig = context.swccConfig.swcc
			const currPsaConfig = context.breakpoints?.[psaCode]
      // console.log('currPsaConfig', currPsaConfig, context.breakpoints)
      const parameters = currPsaConfig && currPsaConfig.newBreakpoints ? Object.keys(currPsaConfig.newBreakpoints) : null
      const percentilesDecimal = currPsaConfig?.percentiles
      if(percentilesDecimal){
        // if(Math.round(currPsaConfig?.['percentiles']?.[`${parameters?.[0]}BP1`] * 100) == NaN){
          // console.log('why naan', currPsaConfig?.['percentiles'])
        // }

        const percentiles = {
          e1p1: Math.round(currPsaConfig?.['percentiles']?.[`${parameters?.[0]}BP1`] * 100),
          e1p2: Math.round(currPsaConfig?.['percentiles']?.[`${parameters?.[0]}BP2`] * 100),
          e2p1: Math.round(currPsaConfig?.['percentiles']?.[`${parameters?.[1]}BP1`] * 100),
          e2p2: Math.round(currPsaConfig?.['percentiles']?.[`${parameters?.[1]}BP2`] * 100),
        }
        currPsaConfig['percentilesWhole'] = percentiles
      }
      const newObj = parameters ? {...context.clickInfo, ...currPsaConfig, parameters} : {...context.clickInfo, ...currPsaConfig}
      // console.log('displayInfo is this%%%%%%%#######', {...newObj})

			// setDisplayText(displayData)
			// console.log('context.', context)
      // setDisplayInfo({...newObj})
      const nextState = context.displayDate === prevDisplayDate 
        ?  {...displayInfo, [psaCode]: newObj}
        : {...displayInfo, [psaCode]: newObj}
      setDisplayInfo({...nextState})
			// setDisplayInfo({...displayInfo, [psaCode]: newObj})


		}
	},[context.clickInfo, context[`status${model}`], context.displayDate, context.breakpoints])


  // console.log('&&&&&&&&&&&&&&##################')




  // const AllRows = <>
  //           <PsaInfoSingle fuuuuu={'fuuuuuuu'} displayInfo = {displayInfo} key={0} cellInfo = {allPsaCellInfo[psa]}/>
  //           <hr />
  //           <PsaInfoSingle fuuuuu={'fuuuuuuu'} displayInfo = {displayInfo} key={1} cellInfo = {allPsaCellInfo[psa]} />
  //         </> 


	return(
		<>
			{
        psaInfoArray.length > 0 && 
          
          psaInfoArray.map((curr,i)=> <><PsaInfoSingle fuuuuu={'fuuuuuuu'} displayInfo = {curr.displayInfo} index={0} cellInfo = {curr.cellInfo} />< hr /></>)
      }
{/*	ACC: "USNMSWC"
climoYears: (2) [2002, 2016]
fireSeason: {startMonth: 5, startDay: 1, endMonth: 7, endDay: 31}
models: (2) ['G', 'Y']
parameters: (2) ['ERC', 'F100']
psaCode: "sw07"
psaName: "Northwest NM Mtns."
stations: (3) [290702, 200801, 291302]
thresholds:
ERC: {dry: 50, veryDry: 70}
F100: {dry: 10, veryDry: 7}*/}

	  </>          		
	)
}

export default PsaInfoArea;

