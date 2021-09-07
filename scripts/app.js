//Module Hero
function Hero(props) {
    return (
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Hoteles</h1>

                    <h2 className="subtitle">
                        desde el <strong>{props.filters.dateFrom.toLocaleDateString()}</strong> hasta el <strong>{props.filters.dateTo.toLocaleDateString()} </strong>
                        <strong>
                            {props.filters.country !== '' && `en ${props.filters.country} `}
                        </strong>
                        <strong>
                            {props.filters.price > 0 && `por $${props.filters.price} `}
                        </strong>
                        <strong>
                            {props.filters.rooms > 0 && `de hasta ${props.filters.rooms} habitaciones`}
                        </strong>

                    </h2>
                </div>
            </div>
        </section>
    )
}


//Module OptionsFilter
class OptionsFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterChange = this.handleFilterChange.bind(this)

    }

    handleFilterChange(event) {
        this.props.onFilterChange(event)
    }


    render() {
        let options = this.props.options
        let icon = this.props.icon

        return (
            <div className="field">
                <div className="control has-icons-left">
                    <div className="select" style={{ width: '100%' }}>
                        <select style={{ width: '100%' }} onChange={this.handleFilterChange} value={this.props.selected} name={this.props.name}>
                            {this.optionList = options.map((option, index) => {
                                return (
                                    <option key={index} value={option.value === undefined ? '' : option.value}>{option.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="icon is-small is-left">
                        <i className={`fas fa-${icon}`}></i>
                    </div>
                </div>
            </div>
        )
    }
}

//Module DateFilter
class DateFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(event) {
        this.props.onDateChange(event)
    }

    render() {
        let icon = this.props.icon
        let date = `${this.props.date.getFullYear()}-${String(this.props.date.getMonth() + 1).padStart(2, 0)}-${String(this.props.date.getDate()).padStart(2, 0)}`
        //let date = this.props.date


        return (
            <div className="field">
                <div className="control has-icons-left">
                    <input className="input" type="date" onChange={this.handleDateChange} value={date} name={this.props.name} />
                    <span className="icon is-small is-left">
                        <i className={`fas fa-${icon}`}></i>
                    </span>
                </div>
            </div>
        )
    }
}

//Module Filters
class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(event) {
        let payload = this.props.filters
        payload[event.target.name] = new Date(event.target.value)
        if (payload['dateFrom'].valueOf() >= payload['dateTo'].valueOf()) {
            payload['dateTo'] = new Date(payload['dateFrom'].valueOf() + 86400000)
        } else if (payload['dateTo'].valueOf() > payload['dateFrom'].valueOf() + 2592000000) {
            payload['dateTo'] = new Date(payload['dateFrom'].valueOf() + 2592000000)
        }
        this.props.onFilterChange(payload)
    }

    handleOptionChange(event) {
        let payload = this.props.filters
        payload[event.target.name] = event.target.value

        this.props.onFilterChange(payload)
    }

    render() {
        return (
            <nav className="navbar is-info" style={{ justifyContent: 'center' }}>
                <div className="navbar-item">
                    <DateFilter
                        date={this.props.filters.dateFrom}
                        icon="sign-in-alt"
                        onDateChange={this.handleDateChange}
                        name="dateFrom"
                    />
                </div>
                <div className="navbar-item">
                    <DateFilter
                        date={this.props.filters.dateTo}
                        icon="sign-out-alt"
                        onDateChange={this.handleDateChange}
                        name="dateTo"
                    />
                </div>
                <div className="navbar-item">
                    <OptionsFilter
                        options={[{ value: undefined, name: 'Todos los países' }, { value: 'Argentina', name: 'Argentina' }, { value: 'Brasil', name: 'Brasil' }, { value: 'Chile', name: 'Chile' }, { value: 'Uruguay', name: 'Uruguay' }]}
                        selected={this.props.filters.country}
                        icon="globe"
                        onFilterChange={this.handleOptionChange}
                        name="country"
                    />

                </div>
                <div className="navbar-item">
                    <OptionsFilter
                        options={[{ value: undefined, name: 'Cualquier precio' }, { value: 1, name: '$' }, { value: 2, name: '$$' }, { value: 3, name: '$$$' }, { value: 4, name: '$$$$' }]}
                        selected={this.props.filters.price}
                        icon="dollar-sign"
                        onFilterChange={this.handleOptionChange}
                        name="price"
                    />
                </div>
                <div className="navbar-item">
                    <OptionsFilter
                        options={[{ value: undefined, name: 'Cualquier tamaño' }, { value: 10, name: 'Hotel pequeño' }, { value: 20, name: 'Hotel mediano' }, { value: 30, name: 'Hotel grande' }]}
                        selected={this.props.filters.rooms}
                        icon="bed"
                        onFilterChange={this.handleOptionChange}
                        name="rooms"
                    />
                </div>
            </nav>

        )
    }
}

function Hotel(props) {

    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={props.children.photo} alt={props.children.name} />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{props.children.name}</p>
                <p style={{ marginBottom: '1rem' }}>{props.children.description}</p>
                <div className="field is-grouped is-grouped-multiline mt-auto">
                   
                    <DataTag icon='map-marker'>{`${props.children.city}, ${props.children.country}`}</DataTag>
                    <DataTag icon='bed'>{props.children.rooms}</DataTag>
                    <PriceTag count={props.children.price}/>

                </div>
            </div>
            <div className="card-footer">
                <a href="javascript:alert('No implementamos esto aún :(')" className="card-footer-item has-background-primary has-text-white has-text-weight-bold">Reservar</a>
            </div>
        </div>

    )
}

function DataTag(props) {
    return (
        <div className="control">
            <div className="tags has-addons">
                <span className="tag is-medium is-info"><i className={`fas fa-${props.icon}`}></i></span>
                <span className="tag is-medium">{props.children}</span>
            </div>
        </div>
    )
}
function PriceTag(props) {
    let icons = []
    for(let i=0; i < 4; i++){
        var style = {margin: '0 .125em'}
        if(i >= props.count){
            style.opacity = '0.25'
        }
        icons.push(<i className="fas fa-dollar-sign" style={style} key={i}></i>)
    }
    return (
        <div className="control">
            <div className="tags">
                <span className="tag is-medium is-info">
                   {icons}
                </span>
            </div>
        </div>
    )
}
function Hotels(props) {
    return (
        <section className="section" style={{ marginTop: '3em' }}>
            <div className="container">
                <div className="columns is-multiline">
                    {props.children.length ? props.children.map((hotel) => (
                        <div className="column is-one-third" key={hotel.slug}>
                            <Hotel>{hotel}</Hotel>
                        </div>
                    )) : (
                        <article className="message is-warning">
                            <div className="message-body">
                                No se han encontrado hoteles que coincidan con los parámetros de búsqueda.
                            </div>
                        </article>
                    )
                    }
                </div>
            </div>
        </section>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: {
                dateFrom: today, // Proviene del archivo data.js
                dateTo: new Date(today.valueOf() + 86400000),
                country: '',
                price: undefined,
                rooms: undefined
            },
            hotels: hotelsData
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }
    handleFilterChange(payload) {
        this.setState({
            filters: payload
        })
    }
    //Return APP
    render() {
        const hotels = this.state.hotels.filter(hotel => this.state.filters.dateFrom <= hotel.availabilityFrom && this.state.filters.dateTo <= hotel.availabilityTo && (this.state.filters.country ? hotel.country === this.state.filters.country : true) && (this.state.filters.price ? hotel.price <= this.state.filters.price : true) && (this.state.filters.rooms ? hotel.rooms <= this.state.filters.rooms : true))

        return (
            <div>
                <Hero filters={this.state.filters} />
                <Filters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
                <Hotels>
                    {hotels}
                </Hotels>



            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))