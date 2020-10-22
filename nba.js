//console.log('hi')
const API_KEY = 'f8b3aaa0a3e04463a8de01381f663467'
const NBA_STATS_URL = `https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStats/2020REG?key=${API_KEY}`

const getStats = async() => {
    try{
        const response = await axios.get(NBA_STATS_URL)
        buildDropdown(response.data)
    } catch(error) {
        console.log(error)
    }
}

const buildDropdown = (data) => {
    const dropdownDiv = document.querySelector('.dropdown2')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getStatInfo)
    
    data.forEach(player => {
        let optionElement = document.createElement('option')
        optionElement.innerText = `${player.Name} ${player.Team} ${player.Position}`
        optionElement.setAttribute('value', player.PlayerID)
        //console.log(optionElement)
        dropdown.appendChild(optionElement)
    })
    dropdownDiv.appendChild(dropdown)
}

const getStatInfo = async(event) => {
    let player = event.target.value
    const GET_STAT_URL = `https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStatsByPlayer/2020REG/${player}?key=${API_KEY}`
    try{
        const response = await axios.get(GET_STAT_URL)
        let statData = response.data
        let myData = {
            playerName: statData.Name,
            playerTeam: statData.Team,
            playerPosition: statData.Position,
            playerFG: statData.FieldGoalsPercentage,
            playerFT: statData.FreeThrowsPercentage,
            playerThree: statData.ThreePointersMade,
            playerRebound: statData.Rebounds,
            playerAssist: statData.Assists,
            playerSteal: statData.Steals,
            playerBlock: statData.BlockedShots,
            playerTurnover: statData.Turnovers,
            playerPoints: statData.Points
        }
        displayStatInfo(myData)
        let name = document.querySelector('.name')
        name.innerHTML = `Name: ${myData.playerName}`
        let team = document.querySelector('.team')
        team.innerHTML = `Team: ${myData.playerTeam}`
        let position = document.querySelector('.position')
        position.innerHTML = `Position ${myData.playerPosition}`
        let fieldGoal = document.querySelector('.fieldgoal')
        fieldGoal.innerHTML = `Field Goal %: ${myData.playerFG}`
        let freeThrow = document.querySelector('.freethrow')
        freeThrow.innerHTML = `Free Throw %: ${myData.playerFT}`
        let three = document.querySelector('.threept')
        three.innerHTML = `Three Pt Made ${myData.playerThree}`
        let rebound = document.querySelector('.rebound')
        rebound.innerHTML = `Rebounds: ${myData.playerRebound}`
        let assist = document.querySelector('.assist')
        assist.innerHTML = `Assist: ${myData.playerAssist}`
        let steal = document.querySelector('.steals')
        steal.innerHTML = `Steals: ${myData.playerSteal}`
        let block = document.querySelector('.blocks')
        block.innerHTML = `Blocks: ${mydata.playerBlock}`
        let turnover = document.querySelector('.turnover')
        turnover.innerHTML = `Turnovers: ${myData.playerTurnover}`
        let points = document.querySelector('.points')
        points.innerHTML =`Points: ${myData.playerPoints}`

    } catch(error) {
        console.log(error)
    }
}

const displayStatInfo = (statData) => {
    let searchArea = document.querySelector('.search')
    let result = document.createElement('div')
    result.className = 'search-result'
    let name = document.createElement('h3')
    name.innerText = statData.playerName
    let team = document.createElement('h4')
    team.innerText = `Team: ${statData.playerTeam}`
    let position = document.createElement('h4')
    position.innerText = `Position: ${statData.playerPosition}`
    let fieldGoal = document.createElement('h4')
    fieldGoal.innerText = `FG Percent: ${statData.playerFG}`
    let freeThrow = document.createElement('h4')
    freeThrow.innerText = `FT Percent: ${statData.playerFT}`
    let threePT = document.createElement('h4')
    threePT.innerText = `3PT Made: ${statData.playerThree}`
    let rebound = document.createElement('h4')
    rebound.innerText = `Rebounds: ${statData.playerRebound}`
    let assist = document.createElement('h4')
    assist.innerText = `Assist: ${statData.playerAssist}`
    let steal = document.createElement('h4')
    steal.innerText = `Steals: ${statData.playerSteal}`
    let block = document.createElement('h4')
    block.innerText = `Blocks: ${statData.playerBlock}`
    let turnover = document.createElement('h4')
    turnover.innerText = `Turnovers: ${statData.playerTurnover}`
    let points = document.createElement('h4')
    points.innerText = `Points: ${statData.playerPoints}`

}
window.onload = getStats