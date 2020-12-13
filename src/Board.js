import React from 'react';
import Square from './Square';
import {connect} from 'react-redux';
import {updateScore} from './action';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: new Array(9).fill(''),
            xIsNext: true,
            winner: '',
            gamerunning: true
        }
    }

    handleClick(i) {
        var squares = this.state.squares.slice();
        if (!this.state.gamerunning) {
            alert("Game ended");
            return false;
        }
        if (squares[i] == '') {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
            });

            var winner = checkWinner(squares);
            if (winner != '') {
                this.props.updateScore(winner);
                this.setState({
                    winner: winner,
                    gamerunning: false
                });
            } else {
                if (!squares.includes('')) {
                    this.props.updateScore('Draw');
                    this.setState({isDraw: true});
                }
            }
        } else {
            alert('Already selected');
        }
        
    }

    renderSquare(i) {
        return(
            <Square value={this.state.squares[i]} handleClick={() => this.handleClick(i)}/>
        );
    }
    restartGame() {
        this.setState({
            squares: new Array(9).fill(''),
            gamerunning: true,
            xIsNext: true,
            winner: '',
            isDraw: false
        });
    }
    render() {
        return(
            <div>
                <div className="cont">
                    <GameAction restartGameProp={() => this.restartGame()} winnerProp={this.state.winner} xIsNextProp={this.state.xIsNext} isDraw={this.state.isDraw} />
                    <div>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>

                    <div>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>

                    <div>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
                <div className="clearboth"></div>
                <GameScore scoreHistory={this.props.scoreHistory} />
            </div>
        )
    }
}

class GameAction extends React.Component {
    render() {
        return (
            <div>
                <div className="winner_msg font24">{this.props.winnerProp ? 'Congratulations!! Winner is: ' + this.props.winnerProp : ''}</div><br/>
                <div className="draw_msg font24">{this.props.isDraw ? 'Match Draw' : ''}</div><br/>
                <div>Next Player: {this.props.xIsNextProp ? 'X' : 'O'}</div><br/>
                <input type="button" className="restart_btn" onClick = {this.props.restartGameProp} value="Restart Game" /><br/><br/>
            </div>
        );
    }
}

class GameScore extends React.Component {
    render() {
        return (
            <div className="cont">
                <h3>Game Score</h3>
                {this.props.scoreHistory.map((data, index) => (
                    <p>{"Match "+ (index+1) + " winner is:"+data}</p>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

const Board = connect(mapStateToProps, {
    updateScore
})(BoardContainer);

export default Board;

function checkWinner(squares) {
    var lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (var i=0; i< lines.length; i++) {
        var[a,b,c] = lines[i];

        if (squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return '';
}