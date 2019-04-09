import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import HomeView from '../home/HomeView'
import LibraryView from '../library/LibraryView'
import EventView from '../event/EventView'
import Header from './header/Header'
import Footer from './footer/Footer'
import Search from './search/Search'
import EventCreationButton from './eventCreationButton/EventCreationButton'
import './mainView.css'
import './transitions.css'

class MainView extends Component {
  render() {
    return (
      <div className='MainView'>
        <Header />
        <Search />
        <EventCreationButton />
        <div className="wrapper background">
          <TransitionGroup className='transition-group'>
            <CSSTransition
              key={this.props.location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'slide'}
            >
              <Switch location={this.props.location}>
                <Route exact path='/' render={() => <HomeView />} />
                <Route exact path='/events' render={() => <LibraryView />} />
                <Route path='/events/:id' render={(props) => <EventView {...props} />} />
                <Route path='/create' render={(props) => <EventCreationView {...props} />} />

              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(MainView)
