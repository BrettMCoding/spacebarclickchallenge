import React, { Component } from 'react'

export default class MyTimer extends Component {
    state = {
        clicks: 0,
        minutes: 0,
        seconds: 10,
        gameStarted: false,
        gameOver: false
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 32) {
            if (this.state.seconds === 0) {
                return;
            }
            if (!this.state.gameStarted) {
                this.setState(prevState => ({
                    gameStarted: true,
                    clicks: prevState.clicks + 1
                }))

                this.myInterval = setInterval(() => {
                    const { seconds, minutes } = this.state
    
                    if (seconds > 0) {
                        this.setState(({ seconds }) => ({
                            seconds: seconds - 1
                        }))
                    }
                    if (seconds === 0) {
                        if (minutes === 0) {
                            this.setState({gameOver: true})
                            clearInterval(this.myInterval)
                        } else {
                            this.setState(({ minutes }) => ({
                                minutes: minutes - 1,
                                seconds: 59
                            }))
                        }
                    } 
                }, 1000)

            } else {
                this.setState(prevState => ({
                    clicks: prevState.clicks + 1
                }))
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", e => this.handleKeyPress(e), false);

        // if (this.state.gameStarted) {
        //     this.myInterval = setInterval(() => {
        //         const { seconds, minutes } = this.state

        //         if (seconds > 0) {
        //             this.setState(({ seconds }) => ({
        //                 seconds: seconds - 1
        //             }))
        //         }
        //         if (seconds === 0) {
        //             if (minutes === 0) {
        //                 clearInterval(this.myInterval)
        //             } else {
        //                 this.setState(({ minutes }) => ({
        //                     minutes: minutes - 1,
        //                     seconds: 59
        //                 }))
        //             }
        //         } 
        //     }, 1000)
        // }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div>
                { this.state.gameStarted ? <div>
                        { minutes === 0 && seconds === 0
                            ? <h1>FINAL SCORE: {this.state.clicks}</h1>
                            : <div> <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>

                            <h1> Clicks: {this.state.clicks}</h1> </div>

                        }
                        </div>
                    :
                    <div> Press Spacebar to begin </div>   
                }
            </div>
        )
    }
}