import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent, TextField } from '@material-ui/core'
import { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Table from './Table';
import { sortData } from './util'
import { DailyCases } from './DailyCases';
import Particles from 'react-particles-js';
function App() {
  //https://disease.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [input, setInput] = useState('10');
  const [dailyData, setdailyData] = useState([]);
  let dailyData1 = [];

  const particlesEffect = {
    particles: {
      number: {
        value: 10,
        density: {
          enable: true,
          value_area: 100
        }
      }
    }
  }


  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/${country === 'worldwide' ? 'all' : 'all'}?lastdays=${input}`)
      .then(res => res.json())
      .then(data => {
        for (let dat in data.cases) {

          let da = {
            adate: dat,
            cases: data.cases[dat],
            deaths: data.deaths[dat],
            recovered: data.recovered[dat],
          }
          dailyData1.push(da)
        }
        setdailyData(dailyData1)
        // Object.keys(data.cases).map((key, i) => (
        //     dailyData.push({ value: data.cases[key] })

        // ))
        // console.log(data)
        console.log(dailyData)

      });

  }, [input])


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then(data => { setCountryInfo(data) })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          const sortedData = sortData(data);

          setTableData(sortedData)
          setCountries(countries)
        });
    };
    getCountriesData();
  }, [])



  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        //    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        //  setMapZoom(4);
      });
  };
  console.log(countryInfo)
  return (
    <div className="app">
      <Particles params={particlesEffect} className="particles"></Particles>
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-Tracker</h1>
          <FormControl className="app__dropdown">
            <Select onChange={onCountryChange} variant="outlined" value={country} >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Dedth" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <CardContent>

          <br />
          <h2>Check Daily Cases</h2>
          <hr />
          <div className="daily__appbar">
            <h3 >Enter Day duration</h3>
            <TextField placeholder='Max 360 Day' value={input} onChange={event => setInput(event.target.value.replace(/\D/, ''))} />
            {/* <button onClick={fetchData}> click me   </button> */}
          </div>
          {/* {console.log('data>>>' + dailyData)} */}
          <DailyCases dailyData={dailyData} />
        </CardContent>
        {/* <Map /> */}
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Case By Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new Cases</h3>
          {/* <LineGraph  /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
