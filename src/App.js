import React, {useEffect, useState} from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './components/infoboxs/InfoBox';
import Map from './components/maps/Map';
import Table from './components/table/Table';
import './App.css';
import { sortData, prettyPrintStat } from './components/utils/util';
import 'leaflet/dist/leaflet.css';
import Chart from './components/ChartGraph/Chart';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, long: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  

  // STATE = How to write a varaible in React <<<<

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT Runs a piece of code
  //based on a given condition

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);

      // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      // setMapZoom(4);
    });
  },[]);

  useEffect(() => {
    // The code inside here will run once
    // when the component load and not again
    // async --> send a request, wait for it, do something with

    const getCountriesData = async () => {
     await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // United state, United Kingdom
            value: country.countryInfo.iso2, // UK, USA, FR
          }
        ));
        let sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);
  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log('YOOOO >>>>', countryCode);

    

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : ` https://disease.sh/v3/covid-19/countries/${countryCode}`;
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // setCountry(countryCode);
      setInputCountry(countryCode);
      // All of the data from the country response
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
    
  };

  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            {/* Loop through all countries and showe the drop down list of the options */}

              <MenuItem value='worldwide'>Worldwide</MenuItem>
            {
              countries.map((country) =>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            
          </Select>

          </FormControl>
        </div>
      

        {/* Header */}
        {/* Title + select input dropdrow field */}
      
        <div className='app__stats'>
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')} 
            title='Coronavirus Cases' cases={prettyPrintStat(countryInfo.todayCase)} total={prettyPrintStat(countryInfo.cases)} />
        
          <InfoBox
            active={casesType === 'recovered'} 
            onClick={(e) => setCasesType('recovered')} 
            title='Recovered' cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>

          <InfoBox
            isRed
            active={casesType === 'deaths'} 
            onClick={(e) => setCasesType('deaths')} 
            title='Deaths' cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.Death)}/>
        
          {/* InfoBoxs title='Coronavirus cases' */}
        </div>
        {/* Map */}
        <Map 
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter} 
          zoom={mapZoom} 
        />
    
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          <h3 className='app__graphTitle'>Worldwide new {casesType}</h3>
          {/* Graph */}
          <Chart />
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
