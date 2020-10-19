//console.log('hi')
const API_KEY = '904c35a6b39d4ca89d685b8e6c5d2716'
const STATS_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/2020REG/7?key=${API_KEY}`

const getStats = async() => {
    try{
        const response = await axios.get(STATS_URL)
        //console.log(response)
        buildDropdown(response.data)
    } catch(error) {
        console.log(error)
    }
}

const buildDropdown = (data) => {
    const dropdownDiv = document.querySelector('.dropdown')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getStatInfo)
    //console.log(data)
    data.forEach(player => {
        //console.log(player)
        let optionElement = document.createElement('option')
        optionElement.innerText = `${player.Name} ${player.Team} ${player.FantasyPosition}`
        optionElement.setAttribute('value', player.Name)
        //console.log(optionElement)
        dropdown.appendChild(optionElement)
    })
    dropdownDiv.appendChild(dropdown)
}

const getStatInfo = async (event) => {
    let searchBox = document.querySelector('.search')
    //console.log(event.target.value)
    const STATS_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/2020REG/7?key=${API_KEY}`
    try {
        const response = await axios.get(STATS_URL)
        let statInfo = response.data
        let newStat = {
            

        }
        //console.log(response)
    } catch(error){
        console.log(error)
    }
}

const showStats = (statInfo) => {
    let searchBox = document.querySelector('.search')
    let resultBox = document.createElement('div')
    resultBox.className = 'change-result'
    let resultHeader = document.createElement('h1')
    resultHeader.innerText = 
}

window.onload = getStats