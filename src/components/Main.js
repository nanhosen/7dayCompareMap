import { Suspense, lazy, useRef,   useContext, useEffect } from 'react';
import '../App.css'
import {Box, Grid, Paper, Card, Typography, CardContent, Slider} from '@mui/material';
import { ModelContext } from '../contexts/ModelContext'
const ComparionMapG = lazy(() => import('./ComparionMapG'))
const ComparionMapY = lazy(() => import('./ComparionMapY'))
const TimeSlider = lazy(() => import('./TimeSlider'))
// const PsaInfoArea = lazy(() => import('./PsaInfoArea'))
const PsaInfoArea = lazy(() => import('./PsaInfoMultiple'))



function Main(props){
	const context = useContext(ModelContext)
	const windowHeight = props.height
	return(
		<>
			<Box fluid  >
				<Grid container spacing={1} >
          <Grid item md={6} >
            <Paper>
            	<Suspense fallback={<div>Loading...</div>}>
	            	<Typography variant="h3"  component="div">
					        Fuel Model G 
					      </Typography>
					      <Typography variant="h6"  component="div">
					        {context.displayDate}
					      </Typography>
					      {context.statusG
            			? <ComparionMapG height={windowHeight}  width={props.width} className="h-100"  ></ComparionMapG>
            			: <>Loading Data...</>
					      }
              </Suspense>
            </Paper>
{/*            <Paper>
            	<PsaInfoArea model={'G'}/>
            </Paper>*/}
          </Grid>
          <Grid item md={6}>
            <Paper>
              <Suspense fallback={<div>Loading...</div>}>
                <Typography variant="h3"  component="div">
					        Fuel Model Y
					      </Typography>
					      <Typography variant="h6"  component="div">
					        {context.displayDate}
					      </Typography>
            		{context.statusY
            			? <ComparionMapY height={windowHeight}  width={props.width} className="h-100"  ></ComparionMapY>
            			: <>Loading Data...</>
					      }
              </Suspense>
              </Paper>
{/*              <Paper>
	            	<PsaInfoArea model={'Y'}/>
	            </Paper>*/}
            </Grid>
            <Grid item md={12}>
	            <Card>
	            	<CardContent>
						      <Suspense fallback={<div>Loading...</div>}>
						      	<Paper>
				            	<PsaInfoArea model={'G'}/>
				            </Paper>
		            		<TimeSlider />
		            	</Suspense>	
	            	</CardContent>
	            </Card>   
            </Grid>
        </Grid>
			</Box>
		</>
	)
}

export default Main;