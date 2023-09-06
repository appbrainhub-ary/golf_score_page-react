import axios from 'axios';
import Button from "./button";
import { useState, useEffect } from 'react';
import useModal from './modal/use';
import Modal from "./modal";
import Hole from './hole'
import Score from './score';
import './app.scss';

function App() {
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState(null);
	const [modalClass, setModalClass] = useState(null);
	const [modalContent, setModalContent] = useState(null);
	const { modalView, modalToggle } = useModal();

	let content = {};

	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = async () => {

		const TEE_SVC_URL = 'tees.json';

		try {
			setLoading(true);
			const response = await axios.get(TEE_SVC_URL);
			const data = response.data
			setCourse(data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}

	function handleScoreClick(evt, item) {
		let action = 'create';
		let sessionItem = JSON.parse(sessionStorage.getItem('golf_scorecard'));
		if (sessionItem && sessionItem.tee_id == item.tee_id) {
			item = sessionItem;
			action = 'update';
		}

		try {
			item['course'] = course.name;
			item['location'] = course.location;

			setModalClass("fullscreen edit");
			setModalContent({
				"heading": `${course.name}, ${course.location}`,
				"body": <Score content={item} action={action} />
			});

			modalToggle();
		} catch (e) {
			console.log(e);
		}
	}

	if (loading || course == null) {
		content.list = <div>Loading...</div>;
	} else {
		let yardsOut,
			yardsIn,
			yards,
			parOut,
			parIn,
			par;

		content.list = course.tees.map((item) => {
			yardsOut = 0;
			yardsIn = 0;
			yards = 0;
			parOut = 0;
			parIn = 0;
			par = 0;
			return (
				<div className="tee-container">
					<div className="scorecard">
						<div className="header">
							<div className="tee">{item.tee} {item.gender}</div>
							<Button item={item} click={handleScoreClick} label='score' />
						</div>
						{item.holes.map((hole, i) => {
							yards = yards + Number(hole.yards);
							par = par + Number(hole.par);
							if (i < 9) {
								yardsOut = yardsOut + Number(hole.yards);
								parOut = parOut + Number(hole.par);
							}
							if (i > 8) {
								yardsIn = yardsIn + Number(hole.yards);
								parIn = parIn + Number(hole.par);
							}
							return (
								<Hole index={i} item={hole} yardsOut={yardsOut} yardsIn={yardsIn} yards={yards} parOut={parOut} parIn={parIn} par={par} />
							);
						})}
						<div className="footer">
							<div>Slope {item.slope}</div>
							<div>Rating {item.rating}</div>
						</div>
					</div>
				</div>
			);
		});
	}

	return (
		<div className="course">
			{content.list}
			<Modal modalView={modalView} hide={modalToggle} content={modalContent} classes={modalClass} />
		</div>
	)
}

export default App;
