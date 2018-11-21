import React from 'react';
import './editorPage.scss';
import CondensedList from '../../common/condensedList';
import ImageItem from "./imageItem"
import SplitPane from "react-split-pane"

const path = require('path');

const images = ["https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
"https://i0.wp.com/sterlingathletics.com/wp-content/uploads/2015/10/Traditional-Hand-Sewn-Soccer-Ball.png",
"https://bloximages.newyork1.vip.townnews.com/pilotonline.com/content/tncms/assets/v3/editorial/c/d5/cd5dde92-1b18-5c2a-a624-a9752297ed3f/57467adbdc1dc.image.jpg",
"https://images-na.ssl-images-amazon.com/images/I/71%2ByQUGOR4L._SX355_.jpg"]

const items = images.map((image,index)=> {return{id:index,image: image}})

interface ExportpageProps {}
interface ExportpageState {
    currentImage: string
}

export default class EditorPage extends React.Component<ExportpageProps,ExportpageState> {
    constructor(props, context){
        super(props, context);

        this.state = {
            currentImage: images[0]
        };
    }

    changeImg = (img) => this.setState({ currentImage: img })

    render() {
        return (
            <div className="app-editor">
            <SplitPane split="vertical" minSize={100} defaultSize={200}>
                <div className="app-editor-files">
                    {/* <ul className="list-group">
                        {images.map((image,index)=>{
                            <CondensedList
                                title="Dir Name"
                                Component={ImageItem}
                                items={items} />
                            // return <li className="list-group-item" key={index}>
                            // <a href={"#link" + (index + 1)}>
                            //     <div className="card">
                            //         <img className="card-img-top" src={image} alt="Card image" onClick={() => this.setState({currentImage: image})}></img>
                            //         <div className="card-body">
                            //             <p className="card-title">Image 1</p>
                            //             <p className="card-text">Tags: 2</p>
                            //         </div>
                            //     </div>
                            // </a></li>
                                    // <ListGroup.Item>
                                    //     <Card>
                                    //         <Card.Img variant="top" src={image} />
                                    //         <Card.ImgOverlay>
                                    //             <Card.Title>Card title {index + 1}</Card.Title>
                                    //         </Card.ImgOverlay>
                                    //         <Card.Body>
                                    //             <Card.Text>Tags: 1</Card.Text>
                                    //         </Card.Body>
                                    //     </Card>
                                    // </ListGroup.Item>
                            })}
                        </ul>  */}
                        <CondensedList
                                    title="Dir Name"
                                    Component={ImageItem}
                                    items={items}
                                    onClick={this.changeImg} />
                    </div>
                    <div className="app-editor-canvas">
                        <img src={this.state.currentImage}></img>
                    </div>
            </SplitPane>
                    
                {/* <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                {images.map((image,index)=>{
                                    return <ListGroup.Item key={index} href={"#link" + (index + 1)}>
                                                <Card>
                                                    <Card.Img variant="top" src={image} />
                                                    <Card.ImgOverlay>
                                                        <Card.Title>Card title {index + 1}</Card.Title>
                                                    </Card.ImgOverlay>
                                                    <Card.Body>
                                                        <Card.Text>Tags: 1</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </ListGroup.Item>
                                })}
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                {images.map((image,index)=>{
                                    return <Tab.Pane key={index} eventKey={"#link" + (index + 1)}>
                                        <Image src={image}></Image>
                                    </Tab.Pane>
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container> */}
            </div>
        );
    }
}
