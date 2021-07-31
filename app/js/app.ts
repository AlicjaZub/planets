let planets

    async function getData() {
    let response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,neq,0&data=englishName,gravity,isPlanet,density,discoveryDate,discoveredBy')
    return await response.json()
}

(async () => {
    planets = await getData()
    console.log(planets)
    console.log(planets.bodies.discoveryDate)
    planets.bodies = planets.bodies.filter(planet => {
        return isNaN(planet.englishName[0])
    })

    planets.bodies.forEach((planet, key) => {
        planet.noDate = (planets.bodies.discoveryDate !== planets.bodies.discoveredBy)
        planet.key = key
        if (key === 0) {
            planet.isFirst = true
        }

    })
    console.log(planets)

    const source = document.querySelector('#planets').innerHTML
    const template = Handlebars.compile(source)
    const target = document.querySelector('.row')
    target.innerHTML += template(planets.bodies[0])


    const source_nav = document.querySelector('#navbar').innerHTML
    const template_nav = Handlebars.compile(source_nav)
    const target_nav = document.querySelector('ul')


    target_nav.innerHTML += template_nav(planets)

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            document.querySelector('.active').classList.remove('active')
            link.classList.add('active')
            console.log(e.target.dataset.id)
            target.innerHTML = template(planets.bodies[e.target.dataset.id])

        })
    })


})()
