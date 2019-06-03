/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';

import { IonApp, IonPage, IonSplitPane, IonRouterOutlet } from '@ionic/react';
import { BrowserRouter, Route } from 'react-router-dom';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './App.css';

// import Menu from './components/Menu';
import Start from './pages/Start';
import Main from './pages/Main';
// import Menu from './components/Menu';

// const App = () => {
//   return (
//     <IonApp>
//       <Start />
//     </IonApp>
//   );
// };


function App() {
  return (
    <BrowserRouter>
      <IonApp>
        <IonSplitPane contentId="main">
          <IonPage id="main">
            <IonRouterOutlet>
              <Route exact path="/" component={Start} />
              <Route path="/main" component={Main} />
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    </BrowserRouter>
  );
}

export default App;
