import { MapContainer, TileLayer } from "react-leaflet"

interface Props {
    currentCountry: any;
}

const Map: React.FC<Props> = (props) => {
    const { currentCountry } = props
    return (
        <MapContainer center={currentCountry[0].latlng} zoom={7}>
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )
}

export default Map
