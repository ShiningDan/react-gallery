import React from "react";
import "./style/GalleryIcon.css";

export default class GalleryIcon extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			navCurrent: "",
		}
	}

	setCurrent() {
		this.setState({
			navCurrent: "nav-current",
		});
	}

	removeCurrent() {
		this.setState({
			navCurrent: "",
		});
	}

	handleClick(event) {
		let index = this.props.id.slice(4);
		this.props.handleNavIconClick(index);
	}

	render() {
		return (
			<i className={"nav-i " + this.state.navCurrent} onClick={this.handleClick.bind(this)}></i>
		);
	}
}