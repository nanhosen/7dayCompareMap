import { Suspense, lazy, useState,   useContext, useEffect } from 'react';
import '../App.css'
import {Box, Grid, Paper, Card, Typography, CardContent, Slider} from '@mui/material';
import { ModelContext } from '../contexts/ModelContext'
import DumbSlider from './DumbSlider'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const makeMarks = (dateArray) =>{
	return dateArray.map((currDate,i)=>({
		value: i,
		label: `${new Date(currDate).getMonth() + 1}/${new Date(currDate).getDate()}`
		}))
}



function TimeSlider(props){
	const context = useContext(ModelContext)
	const [dateArray, setDateArray] = useState([])
	const [visibleDate, setVisibleDate] = useState()
	const [marks, setMarks] = useState()
	const [hasRender, setHasRender] = useState(false)
	const [sliderValue, setSliderValue] = useState(0)
	const [sliderMinMax, setSliderMinMax] = useState([0,dateArray.length - 1])

	useEffect(() =>{
		setSliderMinMax([0,dateArray.length - 1])
	},[dateArray])

	useEffect(() =>{
		// console.log('marks', marks)
		if(marks && dateArray && context.statusG && context.statusY && context.displayDate){
			setHasRender(true)
		}
		else{
			setHasRender(false)
		}
	},[marks, dateArray, context.statusG, context.statusY, context.displayDate])

	useEffect(()=>{
		if(dateArray){
			context.setDisplayDate(dateArray[0])
		}
	},[dateArray])

	useEffect(() =>{
		if(context.statusG){
			// console.log('keys', Object.keys(context.statusG))
			const psas = Object.keys(context.statusG)
			if(psas.length > 0){
				const firstPsaData = context.statusG[psas[0]]
				const dateArray = Object.keys(firstPsaData)
				const newDateArray = []
				dateArray.map(currDate=>{
					const newDate = new Date(currDate)
					const isDate = Number.isFinite(newDate.getDate())
					if(isDate){
						newDateArray.push(currDate)
					}
				})
				setDateArray(newDateArray)
				setMarks(makeMarks(newDateArray))
			}
		}
	},[context.statusG])

	const handleChange = (event, newValue) =>{
		console.log('event', event, 'newValue', newValue, dateArray[newValue])
		if(dateArray[newValue]){
			context.setDisplayDate(dateArray[newValue])
		}
		setSliderValue(newValue)
	}

	const clickForward = () =>{
		console.log('clicked')
		if(sliderValue + 1 <= sliderMinMax[1]){
			setSliderValue(sliderValue + 1)
			context.setDisplayDate(dateArray[sliderValue + 1])
		}
	}

	const clickBack = () =>{
		console.log('clicked')
		if(sliderValue -1 >= sliderMinMax[0]){
			setSliderValue(sliderValue - 1)
			context.setDisplayDate(dateArray[sliderValue - 1])
			}
	}

	const handleClick = (direction) =>{
		console.log('clicked', direction)
		if(direction == 'forward'){
			if(sliderValue + 1 <= sliderMinMax[1]){
				setSliderValue(sliderValue + 1)
				context.setDisplayDate(dateArray[sliderValue + 1])
			}
		}
		else if(direction == 'back'){
			if(sliderValue -1 >= sliderMinMax[0]){
			setSliderValue(sliderValue - 1)
			context.setDisplayDate(dateArray[sliderValue - 1])
			}
		}
		else{

		}
	}



	return(
		<>
			<Box fluid sx={{pl:5, pr:5}} >
				{ hasRender 
					? <DumbSlider 
			  			defaultValue={0} 
			  			step={1} 
			  			marks = {marks}
			  			min={sliderMinMax[0]} 
			  			max={sliderMinMax[1]}
			  			handleChange={handleChange}
			  			handleClickForward = {clickForward}
			  			handleClickBack = {clickBack}
			  			sliderValue = {sliderValue}
			  		/>
			  	: <>Loading...</>	
				}
			</Box>


	  </>          		
	)
}

export default TimeSlider;

				// {

			 //  		hasRender && <Slider 
			 //  			defaultValue={0} 
			 //  			step={1} 
			 //  			marks = {marks}
			 //  			min={0} 
			 //  			max={dateArray.length - 1}
			 //  			onChange={handleChange}
			 //  		/>
				// }