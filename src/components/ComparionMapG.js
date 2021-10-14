import { useRef, useEffect, useContext, useState } from 'react';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector.js'
import GeoJSON from 'ol/format/GeoJSON';
import View from 'ol/View';
import Map from 'ol/Map';
import {Circle as CircleStyle, Icon, Text, Fill, Stroke, Style } from 'ol/style.js'
import '../App.css'
import { ModelContext } from '../contexts/ModelContext'
import makePsaAvg from '../utils/makeAvg'


var mapboxLayer = new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
    // url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
  })
})

const highlightStyle = new Style({
  stroke: new Stroke({
    color: 'red',
    width: 3,
  }),
  // fill: new Fill({
  //   color: 'rgba(255,0,0,0.1)',
  // }),
  // text: new Text({
  //   font: '12px Calibri,sans-serif',
  //   fill: new Fill({
  //     color: '#000',
  //   }),
  //   stroke: new Stroke({
  //     color: '#f00',
  //     width: 3,
  //   }),
  // }),
});

let highlight;
const displayFeatureInfo = function (pixel, vectorLayer, featureOverlay) {
  vectorLayer.getFeatures(pixel).then(function (features) {
    const feature = features.length ? features[0] : undefined;
    // console.log('highlight high', highlight)
    // const info = document.getElementById('info');
    // console.log('featureOverlay',featureOverlay,  'vectorLayer', vectorLayer, 'source', featureOverlay.getSource(), 'pixel', pixel, 'features', features)
    // if (features.length) {
    //   info.innerHTML = feature.getId() + ': ' + feature.get('name');
    // } else {
    //   info.innerHTML = '&nbsp;';
    // }

    if (feature !== highlight) {
      if (highlight) {
        // console.log('there is a highlight', highlight, 'feature', feature)
        // console.log('feature overlay', featureOverlay)
        // console.log('there is a highlight source', featureOverlay.getSource())
        // console.log('there is a highlight get ', featureOverlay.getSource().getFeatures())
        if(featureOverlay.getSource()?.getFeatures().length > 0 ){

          featureOverlay.getSource().removeFeature(highlight);
        }
        
      }
      if (feature) {
        featureOverlay.getSource().addFeature(feature);
        // console.log('there is a feature', feature)
      }
      highlight = feature;
    }
  });
};

const makeFeatureLayer = () =>{
  const featureOverlay = new VectorLayer({
    source: new VectorSource(),
    className: 'featureClickOverlay',
    style: function (feature) {
      // highlightStyle.getText().setText(feature.get('name'));
      return highlightStyle;
    },
  });
  return featureOverlay
}

const addPsaLayer = (layerInfo, modelStatus, displayDate) =>{
	// console.log('layerInfo, modelStatus, displayDate', layerInfo, modelStatus, displayDate)
  const styleFunction = (feature) =>{
  	var color = '#ffffff66'
		// console.log('feature', feature.get('PSANationalCode').toLowerCase())
		const lowerPSA = feature.get('PSANationalCode').toLowerCase()
		const upperPSA = feature.get('PSANationalCode')
		if(modelStatus){
			// console.log('modelStatus', modelStatus)
			if(modelStatus[upperPSA] && modelStatus[upperPSA][displayDate] && modelStatus[upperPSA][displayDate]['psaStatus']){
				const vall = modelStatus[upperPSA][displayDate]['psaStatus']
				// console.log('^^^^^^^&^&^&^&^', vall.status)
				if(vall == 1){
          color = '#8bc56c'
        }
        else if(vall == 2){
          color = '#fbfa73'
        }
        else if(vall == 3){
          color = '#e1c694'
        }

			}

				// console.log('feature!!!!!!!!', upperPSA ,modelStatus)
		}
		return new 
      Style
        ({
			    stroke: new Stroke({
			      color: 'black',
			      width: 1
			    }),
			    fill: new Fill({
		      color: color
		      }),
          text: new Text({
            text: feature.get('PSANationalCode'),
            font: '14px Calibri,sans-serif',
            fill: new Fill({
              color: '#000',
            }),
            stroke: new Stroke({
              color: '#fff',
              width: 1.5,
            }),
          }),
			  })
	}
	var boundarySource = new VectorSource({
  features: (new GeoJSON()).readFeatures(layerInfo, {
    dataProjection : 'EPSG:4326', 
    featureProjection: 'EPSG:3857'
  })  
});

var boundaryLayer = new VectorLayer({
	  source: boundarySource,
	  style:  styleFunction,
    className: 'psas'
	});

	return boundaryLayer
}



var olMap = new Map({
  layers: [
    mapboxLayer,
  ],
  target: null,
  view: new View({
    center: [-12234816.495438, 4522626.089577], //coordinates in EPSG3857 (x, y). Get new ones here: https://epsg.io/map#srs=3857&x=-12578783.122722&y=4902242.944054&z=10&layer=streets
    zoom: 5,
    projection: 'EPSG:3857'
  })
})



function MoistureMap(props){
	// console.log('mapProps', props)
  const mapContainer = useRef(null)

  const context = useContext(ModelContext)
  // console.log('context', context)

  const [psaAvg, setPsaAvg] = useState()
  const [psaStuff, setPsaStuff] = useState()
  const [featureStuff, setFeatureStuff] = useState(context.featureLayer)



  useEffect(()=>{
      // console.log('clicked on the map', evt)
      if(context.pixel){

        const features = olMap.getFeaturesAtPixel(context.pixel)
        const psaLayer = olMap.getLayers().array_.filter(currLyr => currLyr.className_ == 'psas')
        const featureOverlay = olMap.getLayers().array_.filter(currLyr => currLyr.className_ == 'featureClickOverlay')
        // console.log('all layers', olMap.getLayers())
        if(features){
          displayFeatureInfo(context.pixel, psaLayer[0], featureOverlay[0]);
          // context.setFeature({pixel: evt.pixel, plaLayer: psaLayer[0], overlay: featureOverlay[0]})
          // // console.log( properties, 'features', features, psaCode, psaCodeLowerCase)

        }
      }
      // if(features){
      //   // console.log('found features!', features)
      //   const names = features.map(currFeature =>{
      //     return currFeature.get('name') ? currFeature.get('name') : 'no name'
      //   })
      //   // console.log('names', names)
      //   context.setSelection(names && names.length>0 ? names : null)
      // }
    },[context.pixel])
  useEffect(() => {
    // console.log('mapRef', mapContainer)
    // console.log('mapRef', mapContainer.current)
    olMap.setTarget(mapContainer.current)
    olMap.on('click', evt => {
      // console.log('clicked on the map', evt)
      const features = olMap.getFeaturesAtPixel(evt.pixel)
      const psaLayer = olMap.getLayers().array_.filter(currLyr => currLyr.className_ == 'psas')
      const featureOverlay = olMap.getLayers().array_.filter(currLyr => currLyr.className_ == 'featureClickOverlay')
      // console.log('all layers', olMap.getLayers())
      if(features){
        displayFeatureInfo(evt.pixel, psaLayer[0], featureOverlay[0]);
        // context.setFeature({pixel: evt.pixel, plaLayer: psaLayer[0], overlay: featureOverlay[0]})
        context.setPixel(evt.pixel)
      	const properties = features[0]['values_']
      	const psaCode = properties.PSANationalCode
      	const psaCodeLowerCase = psaCode.toLowerCase()
      	// console.log( properties, 'features', features, psaCode, psaCodeLowerCase)
      	context.setClickInfo({
      		GACC: properties.GACCUnitID,
      		psaName: properties.PSANAME,
      		psaCode: psaCodeLowerCase
      	})
      }
      // if(features){
      //   // console.log('found features!', features)
      //   const names = features.map(currFeature =>{
      //     return currFeature.get('name') ? currFeature.get('name') : 'no name'
      //   })
      //   // console.log('names', names)
      //   context.setSelection(names && names.length>0 ? names : null)
      // }
    })

    

  }, [])

  // useEffect(() =>{
  //   console.log('olMap changed', olMap.getLayers())
  // },[olMap])

  useEffect(() =>{
  	// console.log('psajsons', context)
  	if(context.psaJson && context.statusG && context.displayDate){
  		// console.log('psajson hwer', context)
  		const vectorSource = new VectorSource({
			  features: new GeoJSON().readFeatures(context.psaJson),
			});
			const vectorLayer = new VectorLayer({
			  source: vectorSource,
			  className: 'psas' 	
			});
			// console.log('here json', context)
      const currLayers = olMap.getLayers()
      // console.log('currLyaers', currLayers)
      const layerArray = [...currLayers.array_]
      // console.log('layerArray', layerArray)
      layerArray.map((currLyr, i) =>{
        // console.log('currlayer', i, currLyr.className_, currLyr)
        if(currLyr.className_ == 'psas'){
          // console.log('removingLayer')
          olMap.removeLayer(currLyr)
        }
        else if(currLyr.className_ == 'featureClickOverlay'){
          // console.log('removingLayer feature click one')
          olMap.removeLayer(currLyr)
        }
      })
			const createLayer = addPsaLayer(context.psaJson, context.statusG, context.displayDate)
      olMap.addLayer(createLayer)
      olMap.addLayer(makeFeatureLayer())
			// olMap.addLayer(newFeatureLayer)
			// console.log('layer added')
      console.log('layers at bottom', olMap.getLayers())
  	}
  },[context.psJson, context.statusG, context.displayDate])

  // useEffect(()=>{
  // 	if(context){
  // 		// console.log(context)
  // 	}
  // },[context])

  return (
    // <Container fluid style={{ height: `${props.height}px` }} className="noPadding">
    <>
      <div id="map" ref={mapContainer} style={{ height: `${props.height}px`}}></div>
    </>
    // </Container>
  )
}

export default MoistureMap