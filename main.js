var GetWeatherButton = document.querySelector('#GetWeatherButton');
var TownNameText = document.querySelector('#TownNameText');
var bodyStyle = document.querySelector('#bodyStyle');
var FavTownLS = null;
var DegreesToInt = null;

var dt = null;
var sunrise = null;
var sunset = null;

TownNameText.addEventListener("keyup", function(event)
{
    if (event.keyCode === 13)
    {
        event.preventDefault();
        document.getElementById("GetWeatherButton").click();
    }
});

document.body.onload = function()
{
    // First time launch
    if (localStorage.getItem("LastTown") == null)
    {
        localStorage.setItem("MetImp", 0);

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Prague&units=metric&APPID=780a110e45934ac50f836e321b49e06f",
        function(data)
        {
            // console.log(data);

            document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

            // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
            document.getElementById("TownNameDisplay").innerHTML = data.name;
            document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

            FavTownLS = data.name;
            localStorage.setItem("LastTown", data.name);

            document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

            document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °C";
            document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °C" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °C";
            document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °C";

            document.getElementById("VisibilityDisplay").innerHTML = data.visibility + " m";
            document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
            document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

            dt = new Date(data.dt * 1000);
            sunrise = new Date(data.sys.sunrise * 1000);
            sunset = new Date(data.sys.sunset * 1000);

            if (data.timezone == 0)
            {
            }
            else
            {
                sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                sunset.setHours(sunset.getHours() + (data.timezone / 3600));
            }

            document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

            if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
            else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
            if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
            else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

            DegreesToInt = parseInt(data.wind.deg, 10);
            switch(true)
            {
                case (DegreesToInt == 0):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡩 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt > 0 && DegreesToInt < 90):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡥 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt == 90):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡢 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt > 90 && DegreesToInt < 180):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡮 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt == 180):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡣 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt > 180 && DegreesToInt < 270):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡧 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt == 270):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡠 " + data.wind.deg + "°";
                    break;
                case (DegreesToInt > 270 || DegreesToInt < 360):
                    document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡤 " + data.wind.deg + "°";
                    break;
                default:
                    document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                    break;
            }

            switch(data.weather[0].main)
            {
                case "Clear":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                    break;
                case "Clouds":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                    break;
                case "Drizzle":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                    break;
                case "Rain":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                    break;
                case "Thunderstorm":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                    break;
                case "Mist":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Smoke":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Haze":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Dust":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Fog":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Sand":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Ash":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Squall":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Tornado":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                    break;
                case "Snow":
                    document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                    document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                    break;
                default:
                    break;
            }
        });
    }
    // Launch on last town (when switching systems) or with no favourite set
    else if ((localStorage.getItem("StartOnLastTown") == 1 && localStorage.getItem("LastTown") != localStorage.getItem("FavTown")) ||
            (localStorage.getItem("FavTown") == null && localStorage.getItem("LastTown") != null))
    {
        localStorage.setItem("StartOnLastTown", 0);

        if (localStorage.getItem("MetImp") == 0)
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("LastTown") + "&units=metric&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                // document.getElementById("SetFavTownButton").innerHTML = "✓ Saved";
                // document.getElementById("SetFavTownButton").innerHTML = "♥";

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °C";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °C" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °C";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °C";

                document.getElementById("VisibilityDisplay").innerHTML = data.visibility + " m";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
        else
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("LastTown") + "&units=imperial&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                // document.getElementById("SetFavTownButton").innerHTML = "✓ Saved";
                // document.getElementById("SetFavTownButton").innerHTML = "♥";

                document.getElementById("ImperialSysRadio").checked = true;

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °F";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °F" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °F";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °F";

                document.getElementById("VisibilityDisplay").innerHTML = parseFloat(data.visibility * 3.28).toFixed(0) + " ft";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
    }
    // Launch on favourite
    else
    {
        if (localStorage.getItem("MetImp") == 0)
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("FavTown") + "&units=metric&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                // document.getElementById("SetFavTownButton").innerHTML = "✓ Saved";
                document.getElementById("SetFavTownButton").innerHTML = "♥";

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °C";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °C" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °C";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °C";

                document.getElementById("VisibilityDisplay").innerHTML = data.visibility + " m";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
        else
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("FavTown") + "&units=imperial&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                // document.getElementById("SetFavTownButton").innerHTML = "✓ Saved";
                document.getElementById("SetFavTownButton").innerHTML = "♥";

                document.getElementById("ImperialSysRadio").checked = true;

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °F";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °F" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °F";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °F";

                document.getElementById("VisibilityDisplay").innerHTML = parseFloat(data.visibility * 3.28).toFixed(0) + " ft";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
    }
}

SetFavTownButton.onclick = function ()
{
    localStorage.setItem("FavTown", FavTownLS);

    localStorage.setItem("StartOnLastTown", 0);

    document.getElementById("SetFavTownButton").innerHTML = "♥";
}

// Metric - 0, Imperial - 1

MetricSysRadio.onclick = function ()
{
    localStorage.setItem("MetImp", 0);

    localStorage.setItem("StartOnLastTown", 1);

    location.reload();
}

ImperialSysRadio.onclick = function ()
{
    localStorage.setItem("MetImp", 1);

    localStorage.setItem("StartOnLastTown", 1);

    location.reload();
}

// Search

GetWeatherButton.onclick = function ()
{
    if(TownNameText.value == "")
	{ 	
		window.alert("The input field is empty");
	}
    else
    {
        if (localStorage.getItem("MetImp") == 0)
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+ TownNameText.value + "&units=metric&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                if (data.name == localStorage.getItem("FavTown")) document.getElementById("SetFavTownButton").innerHTML = "♥";
                else document.getElementById("SetFavTownButton").innerHTML = "Save as favourite";

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °C";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °C" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °C";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °C";

                document.getElementById("VisibilityDisplay").innerHTML = data.visibility + " m";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " m/s<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }
                

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
        else
        {
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+ TownNameText.value + "&units=imperial&APPID=780a110e45934ac50f836e321b49e06f",
            function(data)
            {
                // console.log(data);
                if (data.name == localStorage.getItem("FavTown")) document.getElementById("SetFavTownButton").innerHTML = "♥";
                else document.getElementById("SetFavTownButton").innerHTML = "Save as favourite";

                document.getElementById("ImperialSysRadio").checked = true;

                document.getElementById("FlagDisplay").src = "https://www.countryflags.io/" + data.sys.country +"/shiny/64.png";

                // document.getElementById("TownNameDisplay").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("TownNameDisplay").innerHTML = data.name;
                document.getElementById("TownCoordinatesDisplay").innerHTML = data.coord.lat + " N" + ", " + data.coord.lon + " E";

                FavTownLS = data.name;
                localStorage.setItem("LastTown", data.name);

                document.getElementById("WeatherDisplay").innerHTML = data.weather[0].main;

                document.getElementById("TemperatureDisplay").innerHTML = parseFloat(data.main.temp).toFixed(0) + " °F";
                document.getElementById("MaxMinTempDisplay").innerHTML = "↑ " + parseFloat(data.main.temp_max).toFixed(0) + " °F" + " ↓ " + parseFloat(data.main.temp_min).toFixed(0) + " °F";
                document.getElementById("FeelTempDisplay").innerHTML = parseFloat(data.main.feels_like).toFixed(0) + " °F";

                document.getElementById("VisibilityDisplay").innerHTML = (data.visibility * 3.28) + " ft";
                document.getElementById("PressureDisplay").innerHTML = data.main.pressure + " hPa";
                document.getElementById("HumidityDisplay").innerHTML = data.main.humidity + " %";

                dt = new Date(data.dt * 1000);
                sunrise = new Date(data.sys.sunrise * 1000);
                sunset = new Date(data.sys.sunset * 1000);

                if (data.timezone == 0)
                {
                }
                else
                {
                    sunrise.setHours(sunrise.getHours() + (data.timezone / 3600));
                    sunset.setHours(sunset.getHours() + (data.timezone / 3600));
                }

                document.getElementById("TimeOfLastUpdate").innerHTML = "Last updated: " + dt.toTimeString().split(' ')[0];

                if (sunrise.getUTCMinutes() <= 9) document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":0" + sunrise.getUTCMinutes();
                else document.getElementById("SunriseDisplay").innerHTML = sunrise.getUTCHours() + ":" + sunrise.getUTCMinutes();
                if (sunset.getUTCMinutes() <= 9) document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":0" + sunset.getUTCMinutes();
                else document.getElementById("SunsetDisplay").innerHTML = sunset.getUTCHours() + ":" + sunset.getUTCMinutes();

                DegreesToInt = parseInt(data.wind.deg, 10);
                switch(true)
                {
                    case (DegreesToInt == 0):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡩 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 0 && DegreesToInt < 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡥 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 90):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡢 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 90 && DegreesToInt < 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡮 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 180):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡣 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 180 && DegreesToInt < 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡧 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt == 270):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡠 " + data.wind.deg + "°";
                        break;
                    case (DegreesToInt > 270 || DegreesToInt < 360):
                        document.getElementById("WindInfoDisplay").innerHTML = data.wind.speed + " mph<br>" + "🡤 " + data.wind.deg + "°";
                        break;
                    default:
                        document.getElementById("WindInfoDisplay").innerHTML = "ERROR";
                        break;
                }

                switch(data.weather[0].main)
                {
                    case "Clear":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/clear.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/clear.jpg)";
                        break;
                    case "Clouds":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/cloud.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/cloud.jpg)";
                        break;
                    case "Drizzle":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/drizzle.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Rain":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/rain.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Thunderstorm":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/thunderstorm.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/rain.jpg)";
                        break;
                    case "Mist":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Smoke":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Haze":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Dust":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Fog":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Sand":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Ash":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Squall":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Tornado":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/mist.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/mist.jpg)";
                        break;
                    case "Snow":
                        document.getElementById("WeatherImageDisplay").src = "Images/WeatherIcons/snow.png";
                        document.getElementById("bodyStyle").style.backgroundImage = "url(Images/Backgrounds/snow.jpg)";
                        break;
                    default:
                        break;
                }
            });
        }
    }
}