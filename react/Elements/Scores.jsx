import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router';

class Scores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestants: this.props.contestants
        }
        this.updateScore = this.updateScore.bind(this);
    }

    updateScore(key, diff) {
        return () => {
            console.log(this.state);
            this.setState((prevState) => {
                prevState.contestants[key].score += diff;
                return prevState;
            });
            this.props.services.games.updateScore(this.props.uid, key, diff);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contestants: nextProps.contestants });
    }

    render() {
        return (
            <table id='scores'>
                <tbody>
                    <tr>
                    {this.state.contestants.map((c, key) => (
                        <td key={key}>
                            <table className='scorecol'>
                                <tbody>
                                    <tr>
                                        <td style={{width:'15%'}} rowSpan={(this.props.value != null ? 1 : 2)}>
                                        {this.props.master &&
                                            <button className='scorebutton'
                                            style={{backgroundColor: 'red'}}
                                            onClick={this.updateScore(key, -this.props.multiplier)}>
                                                -
                                            </button>
                                        }
                                        </td>
                                        <td style={{width:'75%'}}>
                                            <span className='scorename'>{c.name}</span>
                                        </td>
                                        <td style={{width:'15%'}} rowSpan={(this.props.value != null ? 1 : 2)}>
                                        {this.props.master &&
                                            <button className='scorebutton'
                                            style={{backgroundColor: 'green'}}
                                            onClick={this.updateScore(key, this.props.multiplier)}>
                                                +
                                            </button>
                                        }
                                        </td>
                                    </tr>
                                    <tr>
                                        {this.props.value != null &&
                                            <td rowSpan={1}>
                                            {this.props.master &&
                                                <button className='scorebutton'
                                                style={{backgroundColor: 'red'}}
                                                onClick={this.updateScore(key, -this.props.value)}>
                                                    W
                                                </button>
                                            }
                                            </td>
                                        }
                                        <td>
                                            <span className='scorescore'>${c.score}</span>
                                        </td>
                                        {this.props.value != null &&
                                            <td rowSpan={1}>
                                            {this.props.master &&
                                                <button className='scorebutton'
                                                style={{backgroundColor: 'green'}}
                                                onClick={this.updateScore(key, this.props.value)}>
                                                    R
                                                </button>
                                            }
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    ))}
                    </tr>
                </tbody>
            </table>
        );
    }
};

export default withRouter(Scores);