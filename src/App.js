import  { Suspense, lazy, useEffect, useState } from 'react'; 
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import logo from './logo.svg';
import './App.css';

const Navbar = lazy(() => import('./components/Navbar'))
const Main = lazy(() => import('./components/Main'))
const ModelProvider = lazy(() => import('./providers/ModelProvider'))

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight - 450)

  useEffect(() => {
    // console.log('height', height, width)
  },[height, width])

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 450)
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)

    }
  })
  return (
    <div className="h-100 App" style={{ width: '100%', height: '100%', backgroundColor:'#F5F5F5' }}>
      <Suspense fallback={<div>Loading...</div>}>
          {/*<Container fluid>*/}
          <Container maxWidth={false}>
            <Navbar />
            <ModelProvider>
              <Main  height = {height} width={width} />
            </ModelProvider>
{/*        <MoistureProvider>
        <ThemeProvider theme={theme}>
            <Box sx={{pt:'10px'}}><Main height = {height} width={width}/></Box>
        </ThemeProvider>
        </MoistureProvider>*/}
          </Container>
      </Suspense>
    </div>
  );
}

export default App;

