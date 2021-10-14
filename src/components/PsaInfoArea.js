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
	const [psaStatus, setPsaStatus] = useState()
  const [displayInfo, setDisplayInfo] = useState()
  const [cellColors, setCellColors] = useState()
	const [cellVals, setCellVals] = useState()
  const [key, setKey] = useState(0)

  const dlHeadings = {h1: 'Dry', h2: 'VeryDry'}
  const obsHeadings = {h1: 'ERC', h2: 'F100'}

  useEffect(() =>{
    console.log('displayInfo', displayInfo)
  },[displayInfo])


	useEffect(()=>{
    console.log('psaStatus #################', psaStatus)
    if(psaStatus){    
      const setColorObj = {}
      const setValueObj = {}
      for(var fuelModel in psaStatus){
        const modelData = psaStatus[fuelModel]
        // console.log('psaStatus', psaStatus, 'modelData', modelData)
        const elems = modelData ? Object.keys(modelData) : undefined
        if(elems)(elems.map((currelem, i) =>{
          if(i<2){
            setColorObj[`${fuelModel}${i}`] = getStatusColor(modelData[currelem]?.['status'])
            setValueObj[`${fuelModel}${i}`] = Math.round(modelData[currelem]?.['val'])
          }
        }))
      }
      setCellColors({...setColorObj})
      setCellVals({...setValueObj})
      // console.log('setColorObj', setColorObj, 'setValueObj', setValueObj)
    }

  },[psaStatus])

  useEffect(()=>{
    console.log('this stuf', context.statusG, context.statusY, context.clickInfo)
    if(context?.clickInfo?.psaCode && context.displayDate){
      const G = context.statusG && context.statusG[context.clickInfo.psaCode.toUpperCase()] ? context.statusG[context.clickInfo.psaCode.toUpperCase()]?.[context.displayDate] : null
      const Y = context.statusY && context.statusY[context.clickInfo.psaCode.toUpperCase()] ? context.statusY[context.clickInfo.psaCode.toUpperCase()]?.[context.displayDate] : null
      setPsaStatus({G, Y})
    }
  },[context.statusG, context.statusY, context.clickInfo, context.displayDate])

  // useEffect(() =>{
  //   console.log('cellColors########', cellColors)
  //   console.log('cellVals########', cellVals)
  // },[cellColors, cellVals])

  useEffect(() =>{
    console.log('context', context)
  },[context])

  useEffect(() =>{
    console.log('cellVals info chaged', cellVals)
  },[cellVals])






	useEffect(()=>{
    console.log('i noticed a change', 'context.clickInfo && context[`status${model}`] && context.displayDate && context.breakpoints', context.clickInfo , context[`status${model}`] , context.displayDate , context.breakpoints)
		if(context.clickInfo && context[`status${model}`] && context.displayDate && context.breakpoints){
      console.log('this is all here am i doing anything')
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
			setDisplayInfo({...newObj})


		}
	},[context.clickInfo, context[`status${model}`], context.displayDate, context.breakpoints])

	const rows = [
	  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	  createData('Eclair', 262, 16.0, 24, 6.0),
	  createData('Cupcake', 305, 3.7, 67, 4.3),
	  createData('Gingerbread', 356, 16.0, 49, 3.9),
	];


	return(
		<>
			{displayInfo &&  <TableContainer component={Paper}>
      <Table sx={{}} size="small" aria-label="a dense table" key = {key}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={darkCellStyle}>GACC</TableCell>
            <TableCell align="center" sx={lightCellStyle}>PSA ID</TableCell>
            <TableCell align="center" sx={darkCellStyle}>PSA Name</TableCell>
            <TableCell align="center" sx={lightCellStyle}>Element 1</TableCell>
            <TableCell align="center" sx={darkCellStyle}>Element 2</TableCell>
            <TableCell align="center" sx={lightCellStyle}>{displayInfo?.parameters?.[0]} G Breakpoints</TableCell>
            <TableCell align="center" sx={darkCellStyle}>{displayInfo?.parameters?.[0]} Percentiles</TableCell>
            <TableCell align="center" sx={lightCellStyle}>{displayInfo?.parameters?.[0]} Y Breakpoints</TableCell>
            <TableCell align="center" sx={darkCellStyle}>{displayInfo?.parameters?.[1]} G Breakpoints</TableCell>
            <TableCell align="center" sx={lightCellStyle}>{displayInfo?.parameters?.[1]} Percentiles</TableCell>
            <TableCell align="center" sx={darkCellStyle} >{displayInfo?.parameters?.[1]} Y Breakpoints</TableCell>
            <TableCell align="center" sx={{backgroundColor:'#295d3652', color:'black'}} >Fuel Model G Obs: {context.displayDate}</TableCell>
            <TableCell align="center" sx={{backgroundColor:'#295d3652', color:'black'}} >Fuel Model Y Obs: {context.displayDate}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={darkCellStyle}>
                {displayInfo.GACC}
              </TableCell>
              <TableCell align="center" sx={lightCellStyle}>
                {displayInfo.psaCode}
              </TableCell>
              <TableCell align="center" sx={darkCellStyle}>
                {displayInfo.psaName}
              </TableCell>
              <TableCell align="center" sx={lightCellStyle}>{displayInfo?.parameters?.[0]}</TableCell>
              <TableCell align="center"sx={darkCellStyle}>
                {displayInfo?.parameters?.[1]}
              </TableCell>
              <TableCell align="center" sx={lightCellStyle}>
                <InnerTable 
                  headings={dlHeadings}
                  dry={displayInfo?.originalBreakpoints?.[displayInfo?.parameters?.[0]]?.['dry']} 
                  veryDry={displayInfo?.originalBreakpoints?.[displayInfo?.parameters?.[0]]?.['veryDry']} />
              </TableCell>
              <TableCell align="center" sx={darkCellStyle}>
                <InnerTable 
                  color={'white'}
                  headings={dlHeadings}
                  dry={displayInfo?.['percentilesWhole']?.[`e1p1`]} 
                  veryDry={displayInfo?.['percentilesWhole']?.[`e1p2`]}
                />
              </TableCell>
              <TableCell align="center" sx={lightCellStyle}>
                <InnerTable
                headings={dlHeadings}
                  dry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[0]]?.['dry']} 
                  veryDry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[0]]?.['veryDry']}/>
                </TableCell>
              <TableCell align="center" sx={darkCellStyle}>
                <InnerTable 
                  color={'white'}
                  headings={dlHeadings}
                  dry={displayInfo?.['originalBreakpoints']?.[displayInfo?.parameters?.[1]]?.['dry']} 
                  veryDry={displayInfo?.['originalBreakpoints']?.[displayInfo?.parameters?.[1]]?.['veryDry']} />
                </TableCell>
              <TableCell align="center" sx={lightCellStyle}>
                <InnerTable
                headings={dlHeadings}
                  dry={displayInfo?.['percentilesWhole']?.[`e2p1`]} 
                  veryDry={displayInfo?.['percentilesWhole']?.[`e2p2`]}
                />
              </TableCell>
              <TableCell align="center" sx={darkCellStyle}>
                <InnerTable
                  color={'white'} 
                  headings={dlHeadings}
                  dry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[1]]?.['dry']} 
                  veryDry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[1]]?.['veryDry']}
                 />
              </TableCell>
              <TableCell align="center" sx={obsCellStyle}> 
                <InnerTable
                  headings={{h1: displayInfo?.parameters?.[0] ?? 'missing', h2: displayInfo?.parameters?.[1] ?? 'missing'}}
                  dry={'Missing'} 
                  veryDry={'Missing'}
                  innerColors = {{...cellColors}}
                  innerVals = {{...cellVals}}
                  model = {'G'}
                 />
              </TableCell>
              <TableCell align="center" sx={obsCellStyle} >
                <InnerTable
                  headings={{h1: displayInfo?.parameters?.[0] ?? 'missing', h2: displayInfo?.parameters?.[1] ?? 'missing'}}
                  dry={'Missing'} 
                  veryDry={'Missing'}
                  innerColors = {{...cellColors}}
                  innerVals = {{...cellVals}}
                  model = {'Y'}
                 />
              </TableCell>

            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>}
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

const InnerTable = (props) =>{
  // console.log('inner table props', props)
  // const colors = {
  //   c1: props.innerColors && props.innerColors.c1 ? props.innerColors.c1 : 'grey',
  //   c2: props.innerColors && props.innerColors.c2 ? props.innerColors.c2 : 'grey'
  // }
  const cellColors = props.innerColors
  const cellVals = props.innerVals
  const model = props.model
  const color = props?.color ?? 'black'

	return(
		<Table  size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{color: color}} >{props.headings.h1}</TableCell>
          <TableCell align="center" sx={{color: color}} >{props.headings.h2}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          <TableRow
            key={1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" sx={{color: color, backgroundColor:cellColors?.[`${model}0`] ?? '#295d3600'}} >{cellVals?.[`${model}0`] ?? props.dry}</TableCell>
            <TableCell align="center" sx={{color: color, backgroundColor:cellColors?.[`${model}1`] ?? '#295d3600'}} >{cellVals?.[`${model}1`] ?? props.veryDry}</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
	)
}