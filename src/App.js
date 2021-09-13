import { Route, Switch } from "react-router-dom"
import Pokemon from "./Pokemon";
import Pokedex from "./Pokedex";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
);

export default App;
