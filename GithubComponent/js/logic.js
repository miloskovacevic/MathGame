/**
 * Created by Milos on 11/19/2015.
 */
var Card = React.createClass({
    getInitialState: function(){
        return {

        };
    },

    componentDidMount: function(){
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            component.setState(data);
        });

    },

    render: function(){
        return (
            <div>
                <img src={this.state.avatar_url} width="80" />
                <h3>{this.state.login} </h3>
                <hr/>
            </div>
        );
    }
});

var Input = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var loginInput = React.findDOMNode(this.refs.loginText);
        this.props.roditeljskiKlikIvent(loginInput.value);
        loginInput.value = '';
    },
    render: function(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Unseite dev-a" type="text" ref="loginText" />
                <button className="btn btn-primary">Trazi</button>
            </form>
        );

    }
});

var Main = React.createClass({
    getInitialState: function(){
      return {
        logins: []
      };
    },

    addCard: function(vrijednost){
        this.setState({
            logins: this.state.logins.concat(vrijednost)
        });
    },

    render: function(){
        var cards = this.state.logins.map(function (login) {
            return (<Card login={login} />)
        });

        return (
            <div>
                <Input roditeljskiKlikIvent={this.addCard} />
                <hr/>
                {cards}

            </div>
        );
    }
});

React.render(
    <Main />,
    document.getElementById("root")

);