import React from "react";
import GalleryIcon from "./GalleryIcon.js"
import "./style/GalleryNavbar.css"

export default class GalleryNavbar extends React.Component {
	render() {
		let icons = [];
		for (let i = 0; i < this.props.navLength; i++) {
			icons.push(< GalleryIcon key={"nav-"+i} id={"nav-"+i} ref={"nav-"+i} handleNavIconClick={this.props.handleNavIconClick}/>);
		}
		return (
			<div className="nav">{icons}</div>		
		);
	}
}