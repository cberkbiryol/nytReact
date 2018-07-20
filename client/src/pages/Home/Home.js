import React, { Component } from "react";
import AppBtn from "../../components/AppBtn";
import API from "../../utils/API";
import NewsCard from "../../components/NewsCard";
import { Input, FormBtn, FormBox } from "../../components/Form";
import moment from 'moment';

const Dclosed = {
    display: 'none'
};

const Dopen = {
    display: 'block'
}

const sectionh = {
    fontFamily: 'Kanit'
};


class Home extends Component {
    state = {
        savednews: [],
        news: [],
        topic: "",
        byear: "",
        eyear: "",
        username: "",
        comment: ""
    };

    componentDidMount() {
        this.loadSaved();
    }

    loadNews = (res) => {
        this.setState({ news: res, topic: "", byear: "", eyear: "" })
    };

    loadSaved = () => {
        API.getSaved()
            .then(res => {
                res.data.map(e => e.open = false);
                //console.log(JSON.stringify(res.data, null, 2))
                this.setState({ savednews: res.data, topic: "", byear: "", eyear: "" })
            }
            )
            .catch(err => console.log(err));
    };

    deleteSaved = id => {
        API.deleteSaved(id)
            .then(res => this.loadSaved())
            .catch(err => console.log(err));
    };

    handleCommentSubmit = (id) => {
        const Data = {
            userName: this.state.username,
            comment: this.state.comment,
        }
        API.updateSaved(id,Data)
            .then(res => this.loadSaved())
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.topic && this.state.byear && this.state.eyear) {
            API.getNews({
                topic: this.state.topic,
                byear: this.state.byear,
                eyear: this.state.eyear
            })
                .then(res => this.loadNews(res.data.docs))
                .catch(err => console.log(err));
        }
    };

    saveNews = news => {
        const Data = {
            author: news.byline.original,
            title: news.headline.main,
            body: news.snippet,
            date: news.pub_date,
            link: news.web_url,
            image: news.image!=="#" ? `https://www.nytimes.com/${news.image}`:`#`
        }
        API.saveNews(Data)
            .then(res => this.loadSaved())
            .catch(err => console.log(err));
    }

    toggle(i) {
        const snews = this.state.savednews;
        snews.map((e, ii) => ii !== i ? e.open = false : e.open = !e.open);
        this.setState({
            savednews: snews
        });
    }

    render() {
        return (
            <div className="container my-5">
                <FormBox>
                    <Input
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="Search Term (required)"
                    />
                    <div className="d-flex flex-row flex-wrap justify-content-between">
                    <Input
                        value={this.state.byear}
                        onChange={this.handleInputChange}
                        name="byear"
                        placeholder="from year"
                    />
                    <Input
                        value={this.state.eyear}
                        onChange={this.handleInputChange}
                        name="eyear"
                        placeholder="to year"
                    />                    
                    <FormBtn
                        disabled={!(this.state.topic && this.state.byear && this.state.eyear)}
                        onClick={this.handleFormSubmit}
                    >
                        Submit
                    </FormBtn>
                    </div>
                </FormBox>
                <br />
                <div>
                    <h1 style={sectionh} className="text-center"> Search Results </h1>
                    {
                        this.state.news.length ? (
                            <div>
                                {this.state.news.map(news => (
                                    <NewsCard
                                        key={news.web_url}
                                        author={news.byline.original}
                                        title={news.headline.main}
                                        body={news.snippet}
                                        date={moment(news.pub_date).format("MMMM Do YYYY")}
                                        link={news.web_url}
                                        image={news.multimedia.length > 0 ? `https://www.nytimes.com/${news.multimedia[0].url}` : `#`}
                                    >
                                        <AppBtn
                                            type="save"
                                            btype="success"
                                            onClick={() => this.saveNews(news)}
                                        />
                                    </NewsCard>
                                ))}
                            </div>
                        ) : (
                                <h3 className="text-muted text-center">No Search Results to Display</h3>
                            )
                    }
                </div>
                <hr />
                <h1 style={sectionh} className="text-center"> Saved Results </h1>
                <div>
                    {
                        this.state.savednews.length ? (
                            <div>
                                {this.state.savednews.map((news, i) => {
                                    return (
                                        <div key={`div${news._id}`}>
                                            <NewsCard key={news.link}
                                                saved={true}
                                                author={news.author}
                                                title={news.title}
                                                body={news.body}
                                                date={moment(news.date).format("MMMM Do YYYY")}
                                                link={news.link}
                                                image={news.image!=="#" ? `https://www.nytimes.com/${news.image}`:`#`}
                                                comments={news.comments}
                                            >
                                                <AppBtn
                                                    type="delete"
                                                    btype="danger"
                                                    onClick={() => this.deleteSaved(news._id)}
                                                />
                                                <AppBtn
                                                    type="comment"
                                                    btype="primary"
                                                    //onClick={() => this.commentInput(news._id)}
                                                    onClick={() => this.toggle(i)}
                                                />
                                            </NewsCard>
                                            <FormBox style={!news.open ? Dclosed : Dopen} key={`form${news._id}`}>
                                                <Input
                                                    value={this.state.username}
                                                    onChange={this.handleInputChange}
                                                    name="username"
                                                    placeholder="User Name (required)"
                                                />
                                                <Input
                                                    value={this.state.comment}
                                                    onChange={this.handleInputChange}
                                                    name="comment"
                                                    placeholder="comments (required)"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.comment && this.state.username)}
                                                    onClick={()=>this.handleCommentSubmit(news._id)}
                                                >
                                                    Submit
                                                </FormBtn>
                                            </FormBox>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                                <h3 className="text-muted text-center">No Saved News to Display</h3>
                            )
                    }
                </div>
            </div>
        );
    }
}

export default Home;
