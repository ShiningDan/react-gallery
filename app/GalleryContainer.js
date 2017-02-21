import React from "react";
import "./style/GalleryContainer.css";
import GalleryPhoto from "./GalleryPhoto.js";
import GalleryNavbar from "./GalleryNavbar.js"
const requireContext = require.context("./image", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

export default class GalleryContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			range: {
				left: {
					x: [-80, 240],
					y: [-95, 305],
				},
				right: {
					x: [480, 720],
					y: [-95, 305],
				}
			}
		};
	}

	setCenter(index){
    	for (let i = 0; i <  images.length; i++) {
    		this.refs["photo-"+i].removeCenter()
    	}
    	let style = {
    		left: "",
    		top: "",
    		transform: "rotateY(0deg)",
    	};
    	this.refs["photo-"+index].setCenter(style);
    }

	randomInt(min, max){
        let diff = max-min+1;
        return Math.ceil(Math.random()*diff + min - 1);
    }

    randomArray(arr){
        let rArr = [];
        do{
            let index = this.randomInt(0, arr.length-1);
            rArr.push(arr.splice(index,1).pop());
        }while(arr.length>0)
        return rArr;
    }
    
    setLeftRightRoll() {
    	let photos = [];
    	for (let i = 0; i < images.length; i++) {
    		photos.push(this.refs["photo-"+i]);
    	}
    	photos = this.randomArray(photos);
    	let photoLeft = photos.splice(Math.ceil(photos.length/2), Math.ceil(photos.length/2));
        let photoRight = photos;
        for (let i = 0; i < photoLeft.length; i++) {
        	let style = {
        		left: this.randomInt(this.state.range.left.x[0], this.state.range.left.x[1]),
        		top: this.randomInt(this.state.range.left.y[0], this.state.range.left.y[1]),
        		transform: 'rotate('+this.randomInt(-60, 60) + 'deg)',
        	};
        	photoLeft[i].setLeftRightRoll(style);
        }
        for (let i = 0; i < photoRight.length; i++) {
        	let style = {
        		left: this.randomInt(this.state.range.right.x[0], this.state.range.right.x[1]),
        		top: this.randomInt(this.state.range.right.y[0], this.state.range.right.y[1]),
        		transform: 'rotate('+this.randomInt(-60, 60) + 'deg)',
        	};
        	photoRight[i].setLeftRightRoll(style);
        }
    }

    handleNavIconClick(index) {
    	this.setLeftRightRoll();
    	this.setCenter(index);
    	for (let i = 0; i < images.length; i++) {
    		this.refs["navbar"].refs["nav-"+i].removeCurrent();
    	}
    	this.refs["navbar"].refs["nav-"+index].setCurrent();
    }

	// range() {
 //        let range = { left:{x:[], y:[]}, right:{x:[], y:[]}};

 //        let wrap = {
 //            width:document.getElementById("container").clientWidth,
 //            height:document.getElementById("container").clientHeight
 //        }; 
 //        let photo = {
 //            width:document.getElementsByClassName("photo")[0].clientWidth,
 //            height:document.getElementsByClassName("photo")[0].clientHeight
 //        };

 //        range.left.x.push(0-photo.width/2);
 //        range.left.x.push(wrap.width/2-photo.width);
 //        range.left.y.push(0-photo.height/2);
 //        range.left.y.push(wrap.height-photo.height/2);

 //        range.right.x.push(wrap.width/2+photo.width/2);
 //        range.right.x.push(wrap.width-photo.width/2);
 //        range.right.y.push(0-photo.height/2);
 //        range.right.y.push(wrap.height-photo.height/2);
 //        this.setState({
 //            range: range,
 //        });
 //    }

	getPhotos() {
		let photos = []
		images.forEach( function(image, index) {
			photos[index] = {
				img: images[index],
				title: "照片"+index,
				desc: ("照片"+index+"的描述").repeat(5),
			};
		});

        return (
        	<div className="photos">
        	{
        		photos.map(function(photo, index) {
        			return (
        				<GalleryPhoto key={"photo-"+index} id={"photo-"+index} handlePhotoClick={this.handleNavIconClick.bind(this)} ref={"photo-"+index} imgSrc={photo.img} imgTitle={photo.title} imgDesc={photo.desc}/>
        			);
        		}.bind(this))
        	}
           	</div>
        );
	}
	getNavbar() {
		return (
			<GalleryNavbar navLength={images.length} ref={"navbar"} handleNavIconClick={this.handleNavIconClick.bind(this)}/>
		);
	}

	componentDidMount() {
		//range()
		//console.log(this.state.range)
		this.setLeftRightRoll();
		this.setCenter(2);
	}

	render() {
		return (
			<div id="container">
				{this.getPhotos()}
				{this.getNavbar()}
			</div>
		);
	}
}