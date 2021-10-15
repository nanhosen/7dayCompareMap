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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';


const darkCellStyle = {backgroundColor:'#3c403d', color:'white', p:1, m:1}
const obsCellStyle = {backgroundColor:'#295d3652', color:'white', p:1, m:1}
const lightCellStyle = {backgroundColor:'#d0d0d0', color:'black', p:1, m:1}

const dlHeadings = {h1: 'Dry', h2: 'VeryDry'}
const obsHeadings = {h1: 'ERC', h2: 'F100'}


function PsaInfoSingle(props){
  // console.log('single props', props)
	const displayInfo = props?.displayInfo
  const key = displayInfo.psaCode ? displayInfo.psaCode : 0
  const displayDate = props?.displayDate
  const cellColors = props.cellInfo?.colorObj
  const cellVals = props.cellInfo?.valueObj
  const headings = {dlHeadings, obsHeadings}
  const buttonAction = props.deleter


	return(
		<>
			{displayInfo &&  
          <>
              <TableRow>
                <TableCell align="center" sx={{backgroundColor:'#E35239'}}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => buttonAction(key)}
                  >
                    {<CloseIcon />}
                  </IconButton>
                </TableCell>
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
                <TableCell align="center" sx={{backgroundColor:'#295d3652', color:'black'}} >Fuel Model G Obs: {displayDate}</TableCell>
                <TableCell align="center" sx={{backgroundColor:'#295d3652', color:'black'}} >Fuel Model Y Obs: {displayDate}</TableCell>

              </TableRow>
              
                <TableRow
                  key={1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" sx={lightCellStyle}>
                    
                  </TableCell>
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
                      headings={headings?.dlHeadings}
                      dry={displayInfo?.originalBreakpoints?.[displayInfo?.parameters?.[0]]?.['dry']} 
                      veryDry={displayInfo?.originalBreakpoints?.[displayInfo?.parameters?.[0]]?.['veryDry']} />
                  </TableCell>
                  <TableCell align="center" sx={darkCellStyle}>
                    <InnerTable 
                      color={'white'}
                      headings={headings?.dlHeadings}
                      dry={displayInfo?.['percentilesWhole']?.[`e1p1`]} 
                      veryDry={displayInfo?.['percentilesWhole']?.[`e1p2`]}
                    />
                  </TableCell>
                  <TableCell align="center" sx={lightCellStyle}>
                    <InnerTable
                    headings={headings?.dlHeadings}
                      dry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[0]]?.['dry']} 
                      veryDry={displayInfo?.['newBreakpoints']?.[displayInfo?.parameters?.[0]]?.['veryDry']}/>
                    </TableCell>
                  <TableCell align="center" sx={darkCellStyle}>
                    <InnerTable 
                      color={'white'}
                      headings={headings?.dlHeadings}
                      dry={displayInfo?.['originalBreakpoints']?.[displayInfo?.parameters?.[1]]?.['dry']} 
                      veryDry={displayInfo?.['originalBreakpoints']?.[displayInfo?.parameters?.[1]]?.['veryDry']} />
                    </TableCell>
                  <TableCell align="center" sx={lightCellStyle}>
                    <InnerTable
                    headings={headings?.dlHeadings}
                      dry={displayInfo?.['percentilesWhole']?.[`e2p1`]} 
                      veryDry={displayInfo?.['percentilesWhole']?.[`e2p2`]}
                    />
                  </TableCell>
                  <TableCell align="center" sx={darkCellStyle}>
                    <InnerTable
                      color={'white'} 
                      headings={headings?.dlHeadings}
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
              
          </>
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

export default PsaInfoSingle;

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
          <TableCell align="center" sx={{color: color}} >{props.headings?.h1}</TableCell>
          <TableCell align="center" sx={{color: color}} >{props.headings?.h2}</TableCell>
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