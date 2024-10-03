import ModalAsteroid from "./specific/ModalAsteroid";
import ModalFight from "./specific/ModalFight"
import ModalFleet from "./specific/ModalFleet/ModalFLeet"
import ModalPirate from "./specific/ModalPirate";
import ModalPlanet from "./specific/ModalPlanet";
import ModalSendPosition from "./specific/ModalSendPosition";
import ModalShip from "./specific/ModalShip";

const Modals = () => {
	return (
		<>
			<ModalPlanet />
			<ModalFleet />
			<ModalSendPosition />
			<ModalAsteroid />
			<ModalPirate />
			<ModalShip />
			<ModalFight />
		</>
	)
};

export default Modals;
