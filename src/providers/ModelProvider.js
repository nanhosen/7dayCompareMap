

import React, { useState, useEffect } from 'react'
import { ModelContext } from '../contexts/ModelContext'
import axios from 'axios'
import makePsaAvg from '../utils/makeAvg'
import makeStatusObj from '../utils/makeStatusObj'
import swccConfig from '../data/psaConfig'
import breakpoints from '../data/breakpoints'


// const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some css that access to theme
//   }
// });

export default function MoistureProvider({ children }) {
	const [map, setMap] = useState()
  const [windowHeight, setWindowHeight] = useState(window.innerHeight-55)
  const [psaJson, setPsaJson] = useState(null)
  const [forecastData, setForecastData] = useState({})
  const [statusG, setStatusG] = useState()
  const [statusY, setStatusY] = useState()
  // const [displayDate, setDisplayDate] = useState('10/13/2021')
  const [displayDate, setDisplayDate] = useState()
  const [clickInfo, setClickInfo] = useState()
  const [pixel, setPixel] = useState()

  const models = ['G', '16Y']

  const getAndSetAsyncForecast = async(url, setter, model, origState)=>{
  	const returned = await axios.get(url)
  	if(returned.data){

  		setter({...origState, [model]:returned.data})
  	}
  }

  useEffect(()=>{
  	const getBoundaries = async() =>{
  		const psaBoundaries = await axios.get('https://opendata.arcgis.com/datasets/e580f3fd4d644366b121676714d69c2d_0.geojson')
  		// console.log('psaBoundaries', psaBoundaries)
  		setPsaJson(psaBoundaries.data)
  		// for await(var model of models){
  		// 	const urlModel = model == 'G' ? '7G' : '16Y'
  		// 	const url = `https://7daydata.s3.us-east-2.amazonaws.com/swcc-${urlModel}-jsonTest.json`
  			
  		// }
  		const urlG = `https://7daydata.s3.us-east-2.amazonaws.com/swcc-7G-jsonTest.json`
  		const urlY = `https://7daydata.s3.us-east-2.amazonaws.com/swcc-16Y-jsonTest.json`
  		const fcstDat = {
  			'16Y': await axios.get(urlY),
  			'G': await axios.get(urlG)
  		}
  		const fcstAverages = {
  			'16Y': fcstDat['16Y'].data ? makePsaAvg(fcstDat['16Y'].data) : null,
  			'G': fcstDat['G'].data ? makePsaAvg(fcstDat['G'].data) : null,
  		}
  		// console.log('fcstAverages', fcstAverages)
  		const statusObjY = makeStatusObj('16Y', fcstAverages['16Y'])
  		const statusObjG = makeStatusObj('G', fcstAverages['G'])
  		setStatusG(statusObjG)
  		setStatusY(statusObjY)
  		// console.log('statusObjG', statusObjG, 'statusObjY', statusObjY)

  		setForecastData(fcstAverages)
  	}
  	getBoundaries()

  },[])

  // useEffect(()=>{
  // 	const getData = async(model) =>{

  // 		const psaBoundaries = await axios.get(`https://7daydata.s3.us-east-2.amazonaws.com/swcc-${model}-jsonTest.json`)
  // 		setter(psaBoundaries.data)
  // 	}
  // 	getData('7G')
  // 	setForecastData({...forecastData, })
  // 	getData('16Y')

  // },[])

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
      setWindowHeight(window.innerHeight-55)
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return (
    <ModelContext.Provider value={{windowHeight, psaJson, forecastData, statusG, statusY, displayDate, setDisplayDate, clickInfo, setClickInfo, swccConfig, breakpoints, pixel, setPixel}}>
          {children}
    </ModelContext.Provider>
  );
}





