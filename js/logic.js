
var StarsFrame = React.createClass({

    render: function(){

        var numberOfStars = this.props.brojZvijezda;

        var stars = [];
        for(var i = 0; i< numberOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }
        return (
          <div id="stars-frame">
            <div className="well">
                {stars}
            </div>
          </div>
        );
    }
});


var ButtonFrame = React.createClass({
    render: function(){

        var disabled;
        var button;
        var correct = this.props.correct;
        var acceptAnswer = this.props.acceptAnswer;
        var redrawCounter = this.props.redrawCounter;

        switch (correct){
            case true :

                button = (
                    <button className="btn btn-success btn-lg" onClick={acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:

                button = (
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default :

                disabled = this.props.selectedNumbers.length === 0 ? true : false;
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled}
                        onClick={this.props.checkAnswer} >=</button>
                );
        }

        return (
            <div id="button-frame">
                {button}
                <br />
                <br />
                <button className="btn btn-warning btn-xs" onClick={this.props.redraw}
                    disabled={redrawCounter === 0}
                    >
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                    {redrawCounter}
                </button>
            </div>
        );
    }
});

var AnswerFrame = React.createClass({

    render: function(){
        //var numbers = [];
        //
        //for(var i = 0; i < this.props.izabraniBrojevi.length; i++){
        //    numbers.push(
        //        <div className="number">{this.props.izabaraniBrojevi[i]}</div>
        //    );
        //}
        var props = this.props;
        var selectedNumbers = props.izabraniBrojevi.map(function (broj) {
            return (
                <span onClick={props.unselectNumber.bind(null, broj)}>{broj}</span>
            );
        });


        return (
            <div id="answer-frame">
                <div className="well">
                    <div className="number">{selectedNumbers}</div>
                </div>
            </div>
        );
    }
});

var NumbersFrame = React.createClass({

    render: function(){

        var numbers = [];
        var className;
        var selectedNumbers = this.props.izabraniBrojevi;
        var selectNumber = this.props.selectNumber; // ovo je funkcija koja je prop na komponenti
        var usedNumbers = this.props.usedNumbers;

        for(var i = 1; i <= 9; i++){
            className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
            className += " used-" + (usedNumbers.indexOf(i) >= 0);


            numbers.push(
                <div className={className} onClick={selectNumber.bind(null, i)}>{i}</div>
            );
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

var DoneFrame = React.createClass({
    render: function(){

        return (
            <div className = "well text-center">
                <h2>...</h2>
            </div>

        );
    }


});

var Game = React.createClass({

    getInitialState: function(){
        return {
            numberOfStars: this.randomNumber(),
            selectedNumbers: [],
            correct : null,
            usedNumbers: [],
            redrawCounter: 5,
            doneStatus: 'Game Over'
        };
    },

    randomNumber: function(){
        return Math.floor(Math.random() * 9) + 1
    },

    selectNumber: function(clickedNumber){
        if(this.state.selectedNumbers.indexOf(clickedNumber) < 0){
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                correct :  null
            });
        }
    },

    unselectNumber: function(clickedNumber){
        var selectedNumbers = this.state.selectedNumbers;
        var indexOfNumber = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(indexOfNumber, 1);

        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
    },

    sumOfSelectedNumbers: function(){
        //var sum = 0;
        //var selectedNumbers = this.state.selectedNumbers;
        //
        //for(var i = 0; i < selectedNumbers.length; i++){
        //    sum += selectedNumbers[i];
        //}
        //
        //return sum;
        return this.state.selectedNumbers.reduce(function (p, n) {
            return p + n;
        }, 0);

    },

    checkAnswer: function () {
      var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
      this.setState({
          correct : correct
      });
    },

    acceptAnswer: function () {
        //used numbers...
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers : [],
            usedNumbers : usedNumbers,
            correct : null,
            numberOfStars : this.randomNumber()
        });
    },

    redraw : function(){
        if(this.state.redrawCounter > 0)
        {
            this.setState({
                numberOfStars: this.randomNumber(),
                correct : null,
                selectedNumbers : [],
                redrawCounter: this.state.redrawCounter - 1
            });
        }
    },

    render: function(){
        var selectedNumbers = this.state.selectedNumbers;
        var numberOfStars = this.state.numberOfStars;
        var correct = this.state.correct;
        var usedNumbers = this.state.usedNumbers;
        var redrawCounter = this.state.redrawCounter;

        console.log(usedNumbers);

        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame brojZvijezda={numberOfStars} />
                    <ButtonFrame selectedNumbers ={selectedNumbers}
                                 correct = {correct}
                                 checkAnswer = {this.checkAnswer}
                                 acceptAnswer = {this.acceptAnswer}
                                 redraw={this.redraw}
                                 redrawCounter = {redrawCounter}   />
                    <AnswerFrame izabraniBrojevi={selectedNumbers}
                                 unselectNumber={this.unselectNumber} />
                </div>

                <NumbersFrame izabraniBrojevi={selectedNumbers}
                              selectNumber={this.selectNumber}
                              usedNumbers={usedNumbers}
                    />
                <DoneFrame />

            </div>
        );
    }
});

React.render(
    <Game />,
    document.getElementById("container")
);