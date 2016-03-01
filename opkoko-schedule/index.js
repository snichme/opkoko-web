import 'babel-polyfill'
import React from 'react'
import { render as renderToDom} from 'react-dom'
import when from 'when'
import rest from 'rest'
import mime from 'rest/interceptor/mime'
import ReactTabs from 'react-tabs'

import Schedule from './components/Schedule'
import Currently from './components/Currently'

import {nowAsTime, createPersonalSchedule, currentForDay} from './helpers'

const client = rest.wrap(mime);

var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


const getSchedule = (path) => {
  return client({ path: path }).then((response) => response.entity)
}

const lsTest = () => {
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch(e) {
    return false;
  }
}
const hasLocalStorage = lsTest();
const getFavourites = () => {
  if(hasLocalStorage) {
    var v = JSON.parse(localStorage.getItem('opkoko-favs'));
    if(Array.isArray(v)) {
      return v;
    }
  }
  return [];
}

const getActiveTab = () => {
  if(hasLocalStorage) {
    var v = localStorage.getItem('opkoko-tab');
    if(v) {
      return parseInt(v, 10);
    }
  }
  return 0;
}

const togglePresFavourited = (title) => {
  if(hasLocalStorage) {
    let favs = getFavourites();
    let index = favs.indexOf(title);
    if(index === -1) {
      favs.push(title);
    } else {
      favs.splice(index, 1);
    }
    localStorage.setItem('opkoko-favs', JSON.stringify(favs));
    run();
  }
}

const showInfoModal = (title) => {
  console.log("Should show more info about: " + title);
}

const handleSelect = (index) => {
  if(hasLocalStorage) {
    localStorage.setItem('opkoko-tab', index);
  }
}

const render = (program, currentDay, favs, activeTab) => {
  const now = nowAsTime();
  if(favs.length > 0) {
    let personal = createPersonalSchedule(program, favs);
    program  = program.concat(personal);
  }
  const currentRunning = currentForDay(program, currentDay, now);

  renderToDom(
    <div className="opkoko-program">
      <Tabs
          onSelect={handleSelect}
          selectedIndex={activeTab} >
        <TabList>
          <Tab>Just nu</Tab>
          {program.map((track, i) => (<Tab key={"tab" + i}>{track.title}</Tab>))}
        </TabList>

        <TabPanel>
          <Currently onPresSelected={showInfoModal} {...currentRunning} />
        </TabPanel>
        {program.map((item, i) => (
           <TabPanel key={"tabpanel" + i}>
             <Schedule onPresFavourited={togglePresFavourited} onPresSelected={showInfoModal} {...item} />
           </TabPanel>
         ))}
      </Tabs>
    </div>,
    document.getElementById('root')
  )
}

const run = () => {
  when.all([getSchedule('schedule.json'), getFavourites(), getActiveTab()]).then(function(res) {
    let [program, favs, tab] = res;
    render(program, 0, favs, tab);
  })
}
run();
