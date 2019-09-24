import React, { Component } from "react";
import styled from "styled-components";
const StyledButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 50px;
  height: 30px;
  margin-right: 10px;
`;
const StyledContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: lightgrey;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  height: 30px;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
`;

class WeatherWidget extends Component {
  constructor() {
    super();
    this.state = {
      coord: "52.229676,21.012229",
      data: null,
      error: ""
    };
  }

  componentDidMount() {
    this.getWeather(this.state.coord);
  }

  getWeather(coord) {
    let urlAPI = `https://api.darksky.net/forecast/ecf36338ca3e63e62b57a1d409a3e9a7/${coord}?lang=pl&units=ca`;
    fetch("https://cors-anywhere.herokuapp.com/" + urlAPI)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Wystąpił błąd");
        }
      })
      .then(data => {
        this.setState({ data });
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  }

  handleChange(event) {
    this.setState({ coord: event.target.value });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getWeather(this.state.coord);
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return <h1>Wystąpił błąd</h1>;
    } else {
      return (
        <StyledContainer>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label>
              <StyledSelect
                value={this.state.coords}
                onChange={value => this.handleChange(value)}
              >
                <option value='52.229676,21.012229'>Warsaw</option>
                <option value='54.35205,18.64637'>Gdansk</option>
                <option value='50.06143,19.93658'>Krakow</option>
                <option value='51.1,17.03333'>Wroclaw</option>
              </StyledSelect>
            </label>
            <StyledButton type='submit'>Go!</StyledButton>
          </form>
          <WeatherInfo>
            {!this.state.data ? (
              <h1>Select the city</h1>
            ) : (
              <>
                <h1>{data.currently.apparentTemperature.toFixed(1)}&deg;C </h1>
                <p>{data.currently.summary}</p>
              </>
            )}
          </WeatherInfo>
        </StyledContainer>
      );
    }
  }
}

export default WeatherWidget;
