import React from "react";
import ReactDOM from "react-dom";
var MagicMove = require('./components/react_magic_move');


const react_example_node = document.getElementById('example')

//-------------------------------------------- React testing -----------------------------------------------------------


if (react_example_node){

//-------------------------------------------- MAGIC MOVE -------------------------------------------------------------
var MagicApp = React.createClass({

      getInitialState: function() {
        return { order: 'alphabetical' };
      },

      sort: function(order) {
        if (order == 'alphabetical' && order == this.state.order)
          return;
        this.setState({order: order});
      },
    shuffled: function () {
      return this.shuffle(this.getStates());
    },

    alphabetical: function () {
      return this.sortBy(this.getStates(), 'name');
    },

    getStates: function () {
      return [
        { abbr: "AL", name: "Alabama"},
        { abbr: "AK", name: "Alaska"},
        { abbr: "AZ", name: "Arizona"},
        { abbr: "AR", name: "Arkansas"},
        { abbr: "CA", name: "California"},
        { abbr: "CO", name: "Colorado"},
        { abbr: "CT", name: "Connecticut"},
        { abbr: "DE", name: "Delaware"},
        { abbr: "FL", name: "Florida"},
        { abbr: "GA", name: "Georgia"},
        { abbr: "HI", name: "Hawaii"},
        { abbr: "ID", name: "Idaho"},
        { abbr: "IL", name: "Illinois"},
        { abbr: "IN", name: "Indiana"},
        { abbr: "IA", name: "Iowa"},
        { abbr: "KS", name: "Kansas"},
        { abbr: "KY", name: "Kentucky"},
        { abbr: "LA", name: "Louisiana"},
        { abbr: "ME", name: "Maine"},
        { abbr: "MD", name: "Maryland"},
        { abbr: "MA", name: "Massachusetts"},
        { abbr: "MI", name: "Michigan"},
        { abbr: "MN", name: "Minnesota"},
        { abbr: "MS", name: "Mississippi"},
        { abbr: "MO", name: "Missouri"},
        { abbr: "MT", name: "Montana"},
        { abbr: "NE", name: "Nebraska"},
        { abbr: "NV", name: "Nevada"},
        { abbr: "NH", name: "New Hampshire"},
        { abbr: "NJ", name: "New Jersey"},
        { abbr: "NM", name: "New Mexico"},
        { abbr: "NY", name: "New York"},
        { abbr: "NC", name: "North Carolina"},
        { abbr: "ND", name: "North Dakota"},
        { abbr: "OH", name: "Ohio"},
        { abbr: "OK", name: "Oklahoma"},
        { abbr: "OR", name: "Oregon"},
        { abbr: "PA", name: "Pennsylvania"},
        { abbr: "RI", name: "Rhode Island"},
        { abbr: "SC", name: "South Carolina"},
        { abbr: "SD", name: "South Dakota"},
        { abbr: "TN", name: "Tennessee"},
        { abbr: "TX", name: "Texas"},
        { abbr: "UT", name: "Utah"},
        { abbr: "VT", name: "Vermont"},
        { abbr: "VA", name: "Virginia"},
        { abbr: "WA", name: "Washington"},
        { abbr: "WV", name: "West Virginia"},
        { abbr: "WI", name: "Wisconsin"},
        { abbr: "WY", name: "Wyoming"}
      ];
    },

    underscore: function (str) {
      return str.toLowerCase().replace(/ /, '_');
    },

    stateImage: function (state) {
      return "http://www.50states.com/maps/"+this.underscore(state)+".gif";
    },

    sortBy: function (arr, prop) {
      return arr.slice(0).sort(function(a, b) {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
      });
    },

    shuffle: function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },
      renderStates: function() {
        var states = this.state.order === 'random' ? this.shuffled() : this.alphabetical();
        return states.map(function(state) {
          return <div className="State" key={state.abbr}>{state.abbr}</div>;
        });
      },

      render: function() {
        return (
          <div>
            <h1>Magic Move BASIC</h1>
            <div>
              <button onClick={this.sort.bind(this, 'random')}>Random</button>
              <button onClick={this.sort.bind(this, 'alphabetical')}>Alphabetical</button>
            </div>

            <MagicMove>
              {this.renderStates()}
            </MagicMove>
          </div>
        );
      }
});
//-------------------------------------------- Magic Move buddy list ---------------------------------------------------
var buddies = [
  { name: 'Ryan' },
  { name: 'Michael' },
  { name: 'Vjeux' },
  { name: 'Pete' },
  { name: 'David' }
];

var getBuddies = () => {
  return buddies.map((buddy) => {
    buddy.online = Math.random() > 0.5;
    return buddy;
  });
};

var MagicAppBuddy = React.createClass({
  getInitialState: function() {
    return { buddies: getBuddies() };
  },

  componentDidMount: function () {
    setInterval(() => {
      this.setState({ buddies: getBuddies() });
    }, 5000);
  },

  addBuddy (event) {
    event.preventDefault();
    var name = event.target.elements[0].value;
    buddies.push({ name, online: true });
    event.target.reset();
    this.setState({ buddies });
  },

  renderBuddy (buddy) {
    var status = buddy.online ? 'online' : 'offline';
    return (
      <div className="Buddy" key={buddy.name}>
        <span className={"status "+status}/>
        {buddy.name}
      </div>
    );
  },

  renderOnline () {
    return this.sortBy('name', this.state.buddies.filter((buddy) => {
      return buddy.online;
    })).map(this.renderBuddy);
  },

  renderOffline () {
    return this.sortBy('name', this.state.buddies.filter((buddy) => {
      return !buddy.online;
    })).map(this.renderBuddy);
  },
  sortBy: function (key, arr) {
  return arr.slice(0).sort((a, b) => {
    return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
  })
  },
  render: function () {
    return (
      <div>
        <h1>Magic Move</h1>
        <form onSubmit={this.addBuddy}>
          <label>Add Buddy: <input name="name" placeholder="name"/></label>{' '}
          <button type="submit">add</button>
        </form>
        <MagicMove>
          <h2 key="online">Online<hr/></h2>
          {this.renderOnline()}
          <h2 key="offline"><br/>Offline<hr/></h2>
          {this.renderOffline()}
        </MagicMove>
      </div>
    );
  }
});


//-------------------------------------------- Generic React -----------------------------------------------------------
var ReactApp = React.createClass({
    showMagicMoveBasic:function() {

        ReactDOM.render(<MagicApp/>, react_example_node);
    },
    showMagicMoveBuddy:function() {

        ReactDOM.render(<MagicAppBuddy/>, react_example_node);
    },
    render: function() {
        return (
            <div>
                <button className="btn btn-primary" onClick={ this.showMagicMoveBasic }>Basic-Magic-Move</button>
                <button className="btn btn-info" onClick={ this.showMagicMoveBuddy }>Basic-Magic-Move-Buddy</button>
            </div>
        )
    }
});

/*fires for the first time the page is loaded*/
console.log("react 1")
ReactDOM.render(<ReactApp/>, react_example_node);
console.log("react 2")


