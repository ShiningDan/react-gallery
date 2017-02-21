import React from "react";
import photoImage from "./image/1.jpg";
import "./style/GalleryPhoto.css";

export default class GalleryPhoto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photoFB: "photo-f",
			photoCenter: "",
			photoStyle: {},
		};
	}
	getFront(src, title) {
		return (
			<div className="side-front">
				<img src={src} alt=""/>
				<p>{title}</p>
			</div>
		);
	}

	getBack(desc) {
		return (
			<div className="side-back">
				<p>{desc}</p>
			</div>
		);
	}
	handleClick(event) {
		if (this.state.photoCenter !== " photo-center") {
			let index = this.props.id.slice(6);
			this.props.handlePhotoClick(index);
		} else {
			if (this.state.photoFB === "photo-f") {
				this.setState({
					photoFB: "photo-b",
				})
			}
			else {
				this.setState({
					photoFB: "photo-f",
				});
			}
		}
	}

	setCenter(style) {
		this.setState({
			photoFB: "photo-f",
			photoCenter: " photo-center",
			photoStyle: style,
		});
	}
	removeCenter() {
		this.setState({
			photoFB: "photo-f",
			photoCenter: "",
		});
	}
	setLeftRightRoll(style) {
		this.setState({
			photoFB: "photo-f",
			photoCenter: "",
			photoStyle: style,
		})
	}

	getPhotoWrap(src, title, desc) {
		return (
			<div className={"photo-wrap " + this.state.photoFB} onClick={this.handleClick.bind(this)}>
				{this.getFront(src, title)}
				{this.getBack(desc)}
			</div>
		);
	}

	render() {
		return (
			<div className={"photo" + this.state.photoCenter} style={this.state.photoStyle}>
				{this.getPhotoWrap(this.props.imgSrc, this.props.imgTitle, this.props.imgDesc)}
			</div>
		);
	}
}