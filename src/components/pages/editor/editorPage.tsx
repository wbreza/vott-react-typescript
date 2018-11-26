import React from 'react';
import './editorPage.scss';
import CondensedList from '../../common/condensedList';
import ImageItem from "./imageItem"
import SplitPane from "react-split-pane"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IProjectActions, * as projectActions from '../../../actions/projectActions';
import ApplicationState, { IProject } from '../../../store/applicationState';

const path = require('path');

const images = ["https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
"https://i0.wp.com/sterlingathletics.com/wp-content/uploads/2015/10/Traditional-Hand-Sewn-Soccer-Ball.png",
"https://bloximages.newyork1.vip.townnews.com/pilotonline.com/content/tncms/assets/v3/editorial/c/d5/cd5dde92-1b18-5c2a-a624-a9752297ed3f/57467adbdc1dc.image.jpg",
"https://images-na.ssl-images-amazon.com/images/I/71%2ByQUGOR4L._SX355_.jpg"]

const items = images.map((image,index)=> {return{id: index, image: image}})

interface ExportpageProps {
    currentProejct: IProject;
}
interface ExportpageState {
    project: IProject
    currentImage: string
}

const imgListStyle = {
        overflow:'scroll'
    }

function mapStateToProps(state: ApplicationState) {
    return {
        currentProject: state.currentProject
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(projectActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)

export default class EditorPage extends React.Component<ExportpageProps,ExportpageState> {
    constructor(props, context){
        super(props, context);

        this.state = {
            project: this.props.currentProejct,
            currentImage: images[0]
        };
    }

    changeImg = (img) => this.setState({ currentImage: img })

    

    render() {
        return (
            <div className="app-editor">
            <SplitPane split="vertical" minSize={100} defaultSize={200} maxSize={500} pane1Style={imgListStyle}>
                <div className="app-editor-files">
                        {/* <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseImages" aria-expanded="true" aria-controls="collapseImages">
                            Hide images
                        </button> */}
                        {/* <CondensedList
                                title="Dir Name"
                                Component={ImageItem}
                                items={items}
                                onClick={this.changeImg} /> */}
                        <div>
                            <CondensedList
                                title="Dir Name"
                                Component={ImageItem}
                                items={items}
                                onClick={this.changeImg} />
                        </div>
                    </div>
                    <div className="app-editor-canvas">
                    <SplitPane split="horizontal" minSize={window.innerHeight * 0.4} defaultSize={window.innerHeight * 0.7} maxSize={window.innerHeight * 0.8}>
                        <div className="container-fluid">
                            <div className="container">
                                {/* <nav className="navbar navbar-light bg-light"> */}
                                    <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group mr-2" role="group" aria-label="First group">
                                        <button type="button" className="btn navbar-btn"><i className="fas fa-draw-polygon"></i></button>
                                        <button type="button" className="btn navbar-btn"><i className="far fa-hand-paper"></i></button>
                                        <button type="button" className="btn navbar-btn"><i className="fas fa-mouse-pointer"></i></button>
                                        <button type="button" className="btn navbar-btn"><i className="fas fa-search-plus"></i></button>
                                        <button type="button" className="btn navbar-btn"><i className="fas fa-search-minus"></i></button>
                                    </div>
                                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" id="dropdownMenu" type="button" data-toggle="dropdown">Filters
                                            <span className="caret"></span></button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                                                <li><a href="#">Contrast</a></li>
                                                <li><a href="#">Brightness</a></li>
                                                <li><a href="#">Invert</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                {/* </nav> */}
                            </div>
                            <img id="canvas" className="app-editor-canvas" src={this.state.currentImage}></img>
                        </div>
                        <div>Tags:</div>
                    </SplitPane>
                    </div>
            </SplitPane>
            </div>
        );
    }
}
