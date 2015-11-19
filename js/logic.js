/**
 * Created by Milos on 11/19/2015.
 */
var Button = React.createClass({

    render: function(){
        return (
            <button className="btn btn-primary" onClick={this.props.lokalniKlikHandler} >+1</button>
        );
    }
});

var Result = React.createClass({
    render: function(){
        return (
            <div>xxxxxxx Neki rezultat</div>
        );
    }
});

var Main = React.createClass({
    getInitialState: function(){
        return {
            counter: 0
        }
    },

    povecajCounter: function(){
        this.setState({
            counter: this.state.counter + 1
        })
    },

    render: function(){
        return (
            <div>
                <Button lokalniKlikHendler={this.povecajCounter} />
                <Result />
            </div>
        );
    }
});

React.render(
    <Main />,
    document.getElementById("root")
);