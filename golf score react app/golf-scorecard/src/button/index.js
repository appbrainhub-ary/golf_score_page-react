function Button(props) {
	return (
		<div className='btn'>
			<button onClick={(evt) => props.click(evt, props.item)} disabled={props.disabled}>
				{props.icon && <span className={props.icon}></span>}
				<span className="btn-text">{props.label}</span>
			</button>
		</div>
	)
}

export default Button;