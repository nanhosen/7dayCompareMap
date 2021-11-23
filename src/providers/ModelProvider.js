

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
  const [psaInfo, setPsaInfo] = useState()
  const [dateArray, setDateArray] = useState()
  const [configFile, setConfigFile] = useState()
  const [gaccStatusObj, setGaccStatusObj] = useState()
  const [forecastRequestStatus, setForecastRequestStatus] = useState({requested:false, completed: false})

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
  		// const urlG = `https://7daydata.s3.us-east-2.amazonaws.com/eacc-7G-jsonTest.json`
  		// const urlY = `https://7daydata.s3.us-east-2.amazonaws.com/eacc-16Y-jsonTest.json`
  		// const fcstDat = {
  		// 	'16Y': await axios.get(urlY),
  		// 	'G': await axios.get(urlG)
  		// }
    //   console.log('fcstDat', fcstDat)
  		// const fcstAverages = {
  		// 	'16Y': fcstDat['16Y'].data ? makePsaAvg(fcstDat['16Y'].data) : null,
  		// 	'G': fcstDat['G'].data ? makePsaAvg(fcstDat['G'].data) : null,
  		// }
  		// // console.log('fcstAverages', fcstAverages)
  		// const statusObjY = makeStatusObj('16Y', fcstAverages['16Y'])
  		// const statusObjG = makeStatusObj('G', fcstAverages['G'])
  		// setStatusG(statusObjG)
  		// setStatusY(statusObjY)
  		// console.log('statusObjG', statusObjG, 'statusObjY', statusObjY)

  		// setForecastData(fcstAverages)
  	}
  	getBoundaries()

    

    const getConfig = async() =>{
      const configFileGet = await axios.get('https://7daydata.s3.us-east-2.amazonaws.com/GtoY/allGacConfig.json')
      // setPsaInfo(configFile.data)
      setConfigFile(configFileGet.data)
      console.log('configFile', configFileGet.data)
      if(!configFileGet.data){
        return {error: 'config file error'}
      }



    }

    getConfig()

  },[])

  useEffect(()=>{
    if(!configFile){
      console.log('no conifg file not doing anythin for data')
      return
    }
    const getFcstData = async()=>{
      // console.log('in get fcst data config file', configFile)
      if(configFile){

        const gaccArray = Object.keys(configFile)
        var gaccData = {}
        const allPsaDataObject = {gData:{}, yData:{}}
        var gData = {}
        var yData = {}
        setForecastRequestStatus({requested:true, completed: false})
        try{

          for await(const gacc of gaccArray){
            // console.log('making forecast data')
            const gaccForecastData = await getGaccFcstData(gacc, configFile[gacc])
            // const origGaccData = {...gaccData}

            // console.log('gaccForecastData', gacc, gaccForecastData)
            gaccData[gacc]=gaccForecastData
            const currGData = gaccForecastData?.statusObjG ?? {}
            const currYData = gaccForecastData?.statusObjY ?? {}
            allPsaDataObject.gData = {...allPsaDataObject.gData, ...currGData}
            allPsaDataObject.yData = {...allPsaDataObject.yData, ...currYData}
          }
            // console.log('gaccDataFulllllll', gaccData)
            // console.log('gaccDataFulllllll spread', {...gaccData})
            // for(var gacc in gaccData){
            //   const currData = gaccData[gacc]
            //   if(currData){
            //     const currGData = currData.statusObjG
            //     const currYData = currData.statusObjY
            //     allPsaDataObject.gData = {...allPsaDataObject.gData, ...currGData}
            //     allPsaDataObject.yData = {...allPsaDataObject.yData, ...currYData}
            //   }
            // }
            // console.log('whaaa t about this g', gData)
            // console.log('setting forecast data')
            setStatusG(allPsaDataObject.gData)
            setStatusY(allPsaDataObject.yData)
            // console.log('whaaa t about this y', allPsaDataObject)
            setGaccStatusObj(gaccData)
            setForecastRequestStatus({requested:true, success:true, completed: true})
        }
        catch(e){
          setForecastRequestStatus({requested:true, success:false, completed: true, error:JSON.stringify(e)})
          // console.log('rrequsting forecast error', e)
        }

      }
    }

   getFcstData() 
  },[configFile])

  const getGaccFcstData = async(gacc, gaccConfig) =>{
      // console.log('gacc', gacc)
      const urlG = `https://7daydata.s3.us-east-2.amazonaws.com/${gacc.toLowerCase()}-7G-json.json`
      const urlY = `https://7daydata.s3.us-east-2.amazonaws.com/${gacc.toLowerCase()}-16Y-json.json`
      try{
        const fcstDat = {
          '16Y': await axios.get(urlY),
          'G': await axios.get(urlG)
        }
        // console.log('fcstDa!!!!!!!!!!!!!!!!!!!!!!!t', fcstDat)
        const fcstAverages = {
          '16Y': fcstDat['16Y'].data ? makePsaAvg(fcstDat['16Y'].data, gaccConfig) : null,
          'G': fcstDat['G'].data ? makePsaAvg(fcstDat['G'].data, gaccConfig) : null,
        }
        // console.log('fcstAverages', fcstAverages)
        const statusObjY = makeStatusObj('16Y', fcstAverages['16Y'], gaccConfig)
        const statusObjG = makeStatusObj('G', fcstAverages['G'], gaccConfig)
        // console.log('hiiiii', {statusObjG, statusObjY})
        return {statusObjG, statusObjY}

      }
      catch(e){
        console.log('error getting forecast data', gacc, e)
    }
  }

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
    <ModelContext.Provider value={{forecastRequestStatus, windowHeight, psaInfo, psaJson, forecastData, statusG, statusY, displayDate, setDisplayDate, clickInfo, setClickInfo, swccConfig, pixel, setPixel, configFile, gaccStatusObj}}>
          {children}
    </ModelContext.Provider>
  );
}





