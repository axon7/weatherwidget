import React, { Component } from "react";
import styled from "styled-components";
import Skycons from "react-skycons";

const StyledContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  background-color: lightblue;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledSelect = styled.select`
  height: 30px;
  border: none;
  background-color: lightseagreen;
  color: white;
  padding: 5px;
  border-radius: 10px;
  outline: none;
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
    this.setState({ coord: event.target.value }, () => {
      this.getWeather(this.state.coord);
    });

    console.log(this.state);
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return <h1>Wystąpił błąd</h1>;
    } else {
      return (
        <StyledContainer>
          <form>
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
          </form>
          <WeatherInfo>
            {!this.state.data ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <h1>{data.currently.apparentTemperature.toFixed(1)}&deg;C </h1>
                <p>{data.currently.summary}</p>
                <Skycons
                  color='white'
                  icon={data.currently.icon.replace(/-/g, "_").toUpperCase()}
                  autoplay={true}
                  style={{ maxWidth: "400px" }}
                />
              </>
            )}
          </WeatherInfo>
        </StyledContainer>
      );
    }
  }
}

export default WeatherWidget;
