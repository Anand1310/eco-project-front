import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'react-bootstrap';
import creatBlogImg from './creatBlog.png';
// import { createHashHistory } from 'history';

// const history = createHashHistory();

export default class CreateBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            heading: '',
            description: '',
            imgLink: '',
            citation: '',
            date: new Date(),
            users: [],
        };
    }
    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/users/`)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map((user) => user.username),
                        username: res.data[0].username,
                    });
                }
            })
            .catch((err) => console.log(`Error: ${err}`));
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onChangeDate = (date) => {
        this.setState({
            date,
        });
    };

    onSubmitHandler = (e) => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            heading: this.state.heading,
            description: this.state.description,
            imgLink: this.state.imgLink,
            citation: this.state.citation,
            date: this.state.date,
        };
        console.log(exercise);

        axios
            .post(`${process.env.REACT_APP_BASE_URL}/blogs/add`, exercise)
            .then(() => this.props.history.push('/blogs'))
            // .then(() => window.history.back())
            .catch((err) => console.log(`Error: ${err}`));
    };

    render() {
        return (
            <div>
                <h3>Create New Blog ;)</h3>
                <Row
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0',
                    }}
                >
                    <Col
                        md={7}
                        style={{
                            padding: '0%',
                            margin: '0%',
                        }}
                    >
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <label>Username: </label>
                                <select
                                    required
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeHandler}
                                >
                                    {this.state.users.map(function (user) {
                                        return (
                                            <option
                                                key={Math.random()}
                                                value={user}
                                            >
                                                {user}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Heading: </label>
                                <input
                                    type="text"
                                    required
                                    name="heading"
                                    className="form-control"
                                    value={this.state.heading}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                {/* <input/> */}
                                <textarea
                                    type="text"
                                    required
                                    name="description"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Image Link: </label>
                                <input
                                    type="text"
                                    name="imgLink"
                                    className="form-control"
                                    value={this.state.imgLink}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Citation Link: </label>
                                <input
                                    type="text"
                                    name="citation"
                                    className="form-control"
                                    value={this.state.citation}
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="submit"
                                    value="Create Blog"
                                    className="btn btn-primary"
                                />
                            </div>
                        </form>
                    </Col>
                    <Col md={5}>
                        <img
                            src={creatBlogImg}
                            alt="creatBlogImg"
                            style={{ width: '40vw' }}
                        ></img>
                    </Col>
                </Row>
            </div>
        );
    }
}
