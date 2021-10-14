import { Suspense, lazy, useState,   useContext, useEffect } from 'react';
import '../App.css'
import {Box, Grid, Paper, Card, Typography, CardContent, Slider, IconButton} from '@mui/material';
import { ModelContext } from '../contexts/ModelContext'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function DumbSlider(props){
	const {defaultValue, step, marks, min, max, handleChange, handleClickBack, handleClickForward, sliderValue} = props
	// console.log('handleClickBack', props)
	return(
		<>
			<Box fluid sx={{pl:2, pr:2}} >
				<Grid container spacing={0} sx={{pl:2, pr:2}}>
					<Grid item md={2} sx={{pl:2, pr:2}}>
				    	<IconButton onClick = {() =>{handleClickBack()}}><ArrowBackIosIcon /></IconButton>
				  </Grid>
				  <Grid item md={8} sx={{pl:2, pr:2}}>
				    	<Slider 
				  			step={step} 
				  			marks = {marks}
				  			min={min} 
				  			max={max}
				  			onChange={handleChange}
				  			value = {sliderValue}
				  		/>
				  </Grid>
				  <Grid item md={2} sx={{pl:2, pr:2}}>
				    	<IconButton onClick = {() =>{handleClickForward()}}><ArrowForwardIosIcon /></IconButton>
				  </Grid>

				</Grid>
				
				
				

			  		
				
			</Box>


	  </>          		
	)
}

export default DumbSlider;

