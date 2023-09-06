import Button from "./button";
import { digitVal } from './modules/common';

function HoleScore(props) {
	const bunkerName = `bunker_${props.item.number}`;
	const fairwayName = `fairway_${props.item.number}`;
	const girName = `gir_${props.item.number}`;
	const penaltyName = `penalty_${props.item.number}`;
	const puttsName = `putts_${props.item.number}`;
	const strokesName = `strokes_${props.item.number}`;

	const hole = document.querySelector(`.hole[data-hole="${props.item.number}"]`);
	const girInput = (hole) ? hole.querySelector(`input[name="${girName}"]`) : null;
	const puttsInput = (hole) ? hole.querySelector(`input[name="${puttsName}"]`) : null;
	const strokesInput = (hole) ? hole.querySelector(`input[name="${strokesName}"]`) : null;

	let contentLabels,
		contentOut,
		contentIn,
		contentTotal,
		labels = false,
		sum = false;

	function checkGir(par, strokes, putts) {
		const diff = strokes - putts;
		const girDiff = par - 2;

		// needed to change girInput value and then dispatchEvent manually so onChange event is fired for girInput
		var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

		if (diff <= girDiff ) {
			nativeInputValueSetter.call(girInput, 1);
			girInput.closest('div').classList.add('gir');
		} else {
			nativeInputValueSetter.call(girInput, '');
			girInput.closest('div').classList.remove('gir');
		}

		const evt = new Event('change', { bubbles: true});
		girInput.dispatchEvent(evt);
	}

	function scoreChange(evt) {
		if (evt.target.name.startsWith('strokes_')) {

			// check for putts
			if (puttsInput !== null && digitVal(puttsInput) > 0) {
				checkGir(hole.dataset.par, digitVal(evt.target), digitVal(puttsInput));
			}
		}
		if (evt.target.name.startsWith('putts_')) {
			checkGir(hole.dataset.par, digitVal(strokesInput), digitVal(evt.target));
		}

		props.scoreChange(evt);
	}

	if (props.index == 0 || props.index == 9) {
		contentLabels =
			<div className="label-wrap">
				<div>&nbsp;</div>
				<div>Yards</div>
				<div>Par</div>
				<div className="label">Strokes</div>
				<div className="adv-toggle">
					<Button click={props.advToggle} label="adv" />
				</div>
				<div className="label adv">Putts</div>
				<div className="label adv">Fairway</div>
				<div className="label adv">Bunker</div>
				<div className="label adv">Penalty</div>
				<div className="label adv">GIR</div>
			</div>;
		labels = true;
	} else if (props.index == 8) {
		contentOut =
			<div className="out">
				<div>OUT</div>
				<div className="yards">{props.yardsOut}</div>
				<div>{props.parOut}</div>
				<div className="label strokes">{props.strokesOut}</div>
				<div>Hcp.</div>
				<div className="label adv putts">{props.puttsOut}</div>
				<div className="label adv fairway">{props.fairwayOut}</div>
				<div className="label adv bunker">{props.bunkerOut}</div>
				<div className="label adv penalty">{props.penaltyOut}</div>
				<div className="label adv">{props.girOut}</div>
			</div>;
		sum = true;
	} else if (props.index == 17) {
		contentIn =
			<div className="in">
				<div>IN</div>
				<div className="yards">{props.yardsIn}</div>
				<div>{props.parIn}</div>
				<div className="label strokes">{props.strokesIn}</div>
				<div>Hcp.</div>
				<div className="label adv putts">{props.puttsIn}</div>
				<div className="label adv fairway">{props.fairwayIn}</div>
				<div className="label adv bunker">{props.bunkerIn}</div>
				<div className="label adv penalty">{props.penaltyIn}</div>
				<div className="label adv">{props.girIn}</div>
			</div>;
		contentTotal =
		<div className="total">
				<div>&nbsp;</div>
				<div className="yards">{props.yards}</div>
				<div>{props.par}</div>
				<div className="label strokes">{props.strokesTotal}</div>
				<div>&nbsp;</div>
				<div className="label adv putts">{props.puttsTotal}</div>
				<div className="label adv fairway">{props.fairwayTotal}</div>
				<div className="label adv bunker">{props.bunkerTotal}</div>
				<div className="label adv penalty">{props.penaltyTotal}</div>
				<div className="label adv">{props.girTotal}</div>
			</div>;
		sum = true;
	}

	return (
		<div className={`hole${sum = sum ? ' sum' : ''}${labels = labels ? ' labels' : ''}`}
			data-hole={props.item.number}
			data-par={props.item.par}>
			{contentLabels}
			<div>
				<div>{props.item.number}</div>
				<div className="yards">{props.item.yards}</div>
				<div>{props.item.par}</div>
				<div><input name={strokesName} type="tel" required="" aria-required="true" onChange={scoreChange} maxLength="2" defaultValue={props.item.strokes} readOnly={props.locked} /></div>
				<div>{props.item.handicap}</div>
				<div className="adv"><input name={puttsName} type="tel" required="" aria-required="false" onChange={scoreChange} maxLength="1" defaultValue={props.item.putts} readOnly={props.locked} /></div>
				<div className="adv"><input name={fairwayName} type="text" required="" aria-required="false" maxLength="1" defaultValue={props.item.fairway} readOnly={props.locked} /></div>
				<div className="adv"><input name={bunkerName} type="tel" required="" aria-required="false" onChange={props.scoreChange} maxLength="1" defaultValue={props.item.bunker} readOnly={props.locked} /></div>
				<div className="adv"><input name={penaltyName} type="tel" required="" aria-required="false" onChange={props.scoreChange} maxLength="1" defaultValue={props.item.penalty} readOnly={props.locked} /></div>
				<div className="adv"><input name={girName} type="tel" required="" aria-required="false" onChange={props.scoreChange} maxLength="1" defaultValue={props.item.gir} /></div>
			</div>
			{contentOut}
			{contentIn}
			{contentTotal}
		</div>
	);

}

export default HoleScore;